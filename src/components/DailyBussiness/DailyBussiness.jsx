import React, { useEffect, useState } from "react";
import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import "./DailyBussiness.css";
import { Row, Col, Typography } from "antd";
import { Button } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  AimOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Table, Tag, Space } from "antd";
import { Select } from "antd";
import { Column } from "@ant-design/charts";
import { stoageGetter } from "../../helpers";
import Tabs from "../../components/Tab/Tab";
import { Avatar } from "antd";
import { fontWeight } from "@mui/system";

const DailyBussiness = () => {
  const { Text, Link } = Typography;
  const dispatch = useDispatch();
  useEffect(() => {
    const { id, channelCode } = stoageGetter("user");
    // console.log('channelCode a___________',channelCode)
    // console.log('channelCode a______id_____',id)
    dispatch(actions.kpiDashboard(finalKpiDataDropdown, id, channelCode._id));
  }, [dispatch]);

  const [finalKpiDataDropdown, setFinalKpiDataDropdown] = useState(["GPW"]);

  const kpi_data = useSelector((state) => state.kpiDashboard.kpi_data);
  const employee_data = kpi_data;
  let avatar =
    employee_data[0]?.data.first_name.match(/\b(\w)/g) +
    employee_data[0]?.data.last_name.match(/\b(\w)/g);
  let updatedDate = Moment(employee_data[1]?.data.uploadedDate).format(
    "MM/DD/yyyy"
  );
  let month = Moment(employee_data[1]?.data.uploadedDate).format("MMM");
  const [finalKpiData, setFinalKpiData] = useState([]);
  const [finalKpiConfig, setFinalKpiConfig] = useState(null);

  const [finalBudgetData, setFinalBudgetData] = useState([]);
  const [finalBudgetConfig, setFinalBudgetConfig] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  const budgetKeys = {
    "Branch Activation": [
      "branch_activation_budget",
      "branch_activation_actual",
      "branch_activation_achievement",
    ],
    GPW: ["gpw_budget", "gpw_actual", "gpw_achievement"],
    "NOP Retention": [
      "nop_retention_budget",
      "nop_retention_actual",
      "nop_retention_achievement",
    ],
    "GWP Retention": [
      "gwp_retention_budget",
      "gwp_retention_actual",
      "gwp_retention_achievement",
    ],
    Dummy: ["dummy_budget", "dummy_actual", "dummy_achievement"],
  };

  useEffect(() => {
    setTimeout(() => {
      const kpiDataObj = employee_data
        ? employee_data.filter(
            (item) => item.id == "final_score_last_two_month"
          )
        : [];
      let kpiData = kpiDataObj[0]?.data ? [...kpiDataObj[0]?.data] : [];
      kpiData = kpiData.map((item) => ({
        ...item,
        finalScore: parseInt(item.Final_Score || 0),
      }));
      setFinalKpiConfig({
        data: kpiData,
        xField: "month",
        yField: "finalScore",
        point: {
          size: 5,
          shape: "diamond",
        },
        color: "#00ACC1",
      });
      setFinalKpiData(kpiData);

      const kpiBudget = employee_data
        ? employee_data.filter((item) => item.category == finalKpiDataDropdown)
        : [];
      let data = kpiBudget[0]?.data ? [...kpiBudget[0]?.data] : [];

      data = data.map((item) => ({
        ...item,
        ...item[finalKpiDataDropdown],
      }));
      console.log(data);
      const budgetConfigDat = [];
      data.forEach((item) => {
        budgetConfigDat.push({
          name: "Budget",
          val: parseInt(item[budgetKeys[finalKpiDataDropdown][0]] || 0),
          month: item.month,
        });
        budgetConfigDat.push({
          name: "Actual",
          val: parseInt(item[budgetKeys[finalKpiDataDropdown][1] || 0]),
          month: item.month,
        });
      });
      console.log(budgetConfigDat);
      setFinalBudgetConfig({
        data: budgetConfigDat,
        isGroup: true,
        xField: "month",
        yField: "val",
        seriesField: "name",

        color: ["rgb(228, 106, 37)", "#00ACC1"],
      });
      setFinalBudgetData(data);
    });
  }, [employee_data]);

  const { Option } = Select;
  function onChange(value) {
    setFinalKpiDataDropdown(value);
    dispatch(actions.kpiDashboard(value));
    console.log(`selected ${value}`);
  }
  const onChangeKPIBudgetHandler = (value) => {
    console.log(value);
    setFinalKpiDataDropdown(value);
    dispatch(actions.kpiDashboard(value));
  };

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  const columns = [
    {
      title: "Period",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Final Score",
      dataIndex: "Final_Score",
      key: "Final_Score",
    },
    {
      title: "% Change over last month",
      dataIndex: "change_in_percent",
      key: "change_in_percent",
    },
  ];
  const columns1 = [
    {
      title: "Period",
      dataIndex: "month",
      key: "month",
    },
    {
      title: `${finalKpiDataDropdown}(in ₹ Lac) Budget`,
      dataIndex: budgetKeys[finalKpiDataDropdown][0],
      key: budgetKeys[finalKpiDataDropdown][0],
    },
    {
      title: `${finalKpiDataDropdown}(in ₹ Lac) Actual`,
      dataIndex: budgetKeys[finalKpiDataDropdown][1],
      key: budgetKeys[finalKpiDataDropdown][1],
    },
    {
      title: "% Achievement",
      dataIndex: budgetKeys[finalKpiDataDropdown][2],
      key: budgetKeys[finalKpiDataDropdown][2],
    },
  ];
  const columns2 = [
    {
      title: "CSM Name",
      dataIndex: "csmName",
      key: "csmName",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Final KPI Score %",
      dataIndex: "value",
      key: "value",
    },
  ];

  const data2 = [{ csmName: "Calvin Robert", city: "Mumbai", value: 56 }];

  const dailyDataArray = [
    {
      month: "January",
      type: "MTD",
      date: "1/09/2022",
      gwpData: "200",
      title: "Total GWP in ₹ Lac",
    },
    {
      month: "January",
      type: "MTD",
      date: "1/09/2022",
      gwpData: "200",
      title: "Active Branches",
    },
    {
      month: "January",
      type: "MTD",
      date: "1/09/2022",
      gwpData: "200",
      title: "Total GWP Retention in ₹",
    },
    {
      month: "January",
      type: "MTD",
      date: "1/09/2022",
      gwpData: "200",
      title: "% Issuance",
    },
    {
      month: "January",
      type: "MTD",
      date: "1/09/2022",
      gwpData: "200",
      title: "Pendancy(GWP Pendancy vs. GWP Ach)",
    },
    {
      month: "January",
      type: "MTD",
      date: "1/09/2022",
      gwpData: "200",
      title: "GWP Unallocated in ₹",
    },
  ];
  const shortMonth = (text) => {
    try {
      text = text.slice(0, 3);
      let _text = text !== undefined ? text.toUpperCase() : text;
      return _text;
    } catch (err) {
      // console.log(err)
    }
  };

  return (
    <>
      <Tabs tabMenu={[]} header="Daily Bussiness" activeKey="1" />
      <div style={{ padding: "0 3%", paddingBottom: "30px" }}>
        <Row className="tabs">
          <Col xs={12} sm={12} md={12} lg={2} xl={2}>
            <Button className="primaryBtn" icon={<UserOutlined />}>
              Self
            </Button>
          </Col>
          <Col xs={12} sm={12} md={12} lg={2} xl={2}>
            <Button className="secondaryBtn" icon={<TeamOutlined />}>
              Team
            </Button>
          </Col>
        </Row>
        <hr style={{ marginBottom: "20px" }} />

        <Row
          justify="space-around graph"
          style={{ marginTop: "10px" }}
          gutter={16}
        >
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
            className=""
            style={{ padding: "14px" }}
          >
            <Row justify="start">
              <Avatar
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#00ACC1",
                  verticalAlign: "middle",
                }}
                size="large"
                gap={1}
              >
                OJ
              </Avatar>
              <Row style={{ flexDirection: "column", marginLeft: "10px" }}>
                <Text strong>Otter</Text>
                <Row>
                  <Text strong type="secondary">
                    CSM ID
                  </Text>
                  <Text style={{ marginLeft: "10px" }} type="secondary">
                    {" "}
                    AG5hcd9y
                  </Text>
                </Row>
              </Row>
            </Row>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
            style={{ padding: "14px" }}
          >
            <Row
              style={{
                justifyContent: width <= breakpoint ? "space-between" : "end",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Text strong className="dateRange">
                Date range :
              </Text>
              <div
                className="goalCalendar"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CalendarOutlined
                  style={{ fontSize: "23px", color: "gray", margin: "0 5px" }}
                />
                <Select
                  defaultValue="Select"
                  size="large"
                  style={{ width: "100%" }}
                >
                  <Option value="last 7 Days">Last 7 Days</Option>
                  <Option value="last 30 Days">Last 30 Days</Option>
                </Select>
              </div>
              <Button
                className="goalButton"
                type="primary"
                size="large"
                icon={<AimOutlined style={{ fontSize: "17px" }} />}
              >
                Add Daily Goal
              </Button>
            </Row>
          </Col>
        </Row>

        <Row
          justify="space-around graph"
          style={{ marginTop: "10px" }}
          gutter={16}
        >
          <Col
            style={{
              border: "1px solid lightgray",
              padding: 0,
            }}
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
          >
            <Row>
              <Col
                span={24}
                style={{
                  border: "1px solid lightgray",
                  padding: "14px",
                  color: "#3c3d3d",
                  fontWeight: "bold",
                }}
              >
                GWP (COMMITMENT VS. ACHIEVED)
              </Col>
            </Row>
          </Col>
          <Col style={{ padding: 0 }} xs={24} sm={24} md={12} lg={12} xl={12}>
            <Row>
              <Col
                span={7}
                style={{
                  border: "1px solid lightgray",
                  padding: "14px",
                  textAlign: "center",
                  color: "#3c3d3d",
                  fontWeight: "bold",
                }}
              >
                DATE
              </Col>
              <Col
                span={17}
                style={{
                  border: "1px solid lightgray",
                  padding: "14px",
                  textAlign: "center",
                  color: "#3c3d3d",
                  fontWeight: "bold",
                }}
              >
                GWP (in ₹)
              </Col>
            </Row>

            <Row className="GWP_div">
              <Col span={6}></Col>
              <Col span={11} style={{ color: "#007f8f" }}>
                COMMITMENT
              </Col>
              <Col span={7} style={{ color: "#5eb3bd" }}>
                ACHIEVED
              </Col>
            </Row>

            <Row className="GWP_div">
              <Col span={6}>9/13/2022</Col>
              <Col span={11} style={{ color: "#007f8f" }}>
                ₹ 0
              </Col>
              <Col span={7} style={{ color: "#5eb3bd" }}>
                ₹ 0(0%)
              </Col>
            </Row>

            <Row className="GWP_div">
              <Col span={6}>9/13/2022</Col>
              <Col span={11} style={{ color: "#007f8f" }}>
                ₹ 0
              </Col>
              <Col span={7} style={{ color: "#5eb3bd" }}>
                ₹ 0(0%)
              </Col>
            </Row>

            <Row className="GWP_div">
              <Col span={6}>9/13/2022</Col>
              <Col span={11} style={{ color: "#007f8f" }}>
                ₹ 0
              </Col>
              <Col span={7} style={{ color: "#5eb3bd" }}>
                ₹ 0(0%)
              </Col>
            </Row>

            <Row className="GWP_div">
              <Col span={6}>9/13/2022</Col>
              <Col span={11} style={{ color: "#007f8f" }}>
                ₹ 0
              </Col>
              <Col span={7} style={{ color: "#5eb3bd" }}>
                ₹ 0(0%)
              </Col>
            </Row>

            <Row className="GWP_div">
              <Col span={6}>9/13/2022</Col>
              <Col span={11} style={{ color: "#007f8f" }}>
                ₹ 0
              </Col>
              <Col span={7} style={{ color: "#5eb3bd" }}>
                ₹ 0(0%)
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DailyBussiness;
