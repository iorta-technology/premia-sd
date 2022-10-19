import React, { useEffect, useState } from "react";
import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import "./DailyBussiness.css";
import { Row, Col, Typography, Input, Radio } from "antd";
import person_black from "./../Activitity Tracker/icons/person_black.png";
import person_white from "./../Activitity Tracker/icons/person_white.png";
import axiosRequest from "../../axios-request/request.methods";
import group_white from "../../assets/MaterialUiIcons/group_white_192x192.png";
import group_black from "../../assets/MaterialUiIcons/group_black_192x192.png";
import { Button, Modal, Form } from "antd";
import { message } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  AimOutlined,
  CalendarOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons";
import { Table, Tag, Space } from "antd";
import { Select } from "antd";
import { Column } from "@ant-design/charts";
import { checkAgent, stoageGetter } from "../../helpers";
import Tabs from "../../components/Tab/Tab";
import { Avatar } from "antd";
import { fontWeight } from "@mui/system";
import { useSyncExternalStore } from "react";

const DailyBussiness = () => {
  let data = [];
  const { id, channelCode } = stoageGetter("user");
  const [form] = Form.useForm();
  const [GWPData, SetGWPData] = useState([]);
  const [GWPGraph, SetGWPGraph] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todayGoalCreated, setTodayGoalCreated] = useState({});
  const [currentIDTeam, setCurrentIDTeam] = useState(id);
  const [selectDays, setSelectDays] = useState({
    value: "7",
    label: "Last 7 Days",
  });

  const showModal = async () => {
    try {
      let res = await axiosRequest.get(
        `user/fetch_daily_activity/${currentIDTeam}?today_goal=true`,
        { secure: true }
      );
      setTodayGoalCreated(res);
    } catch (error) {
      console.log(error);
    }

    setIsModalOpen(true);
  };

  const getUserData = async () => {
    try {
      let res = await axiosRequest.get(
        `user/fetch_goals/${currentIDTeam}?team=enable`,
        {
          secure: true,
        }
      );
      setUser(res);
    } catch (error) {
      console.log("error API " + error);
    }
  };

  const changeDays = async (value) => {
    if (value == 7) setSelectDays({ value: "7", label: "Last 7 Days" });
    else setSelectDays({ value: "30", label: "Last 30 Days" });

    try {
      let res = await axiosRequest.get(
        `user/fetch_daily_activity/${currentIDTeam}?option=${value}`,
        { secure: true }
      );
      if (res[0]) {
        SetGWPData(res[0]);
      }
    } catch (error) {
      console.log("error API " + error);
    }
  };

  const GetGraph = async () => {
    try {
      let res = await axiosRequest.get(`user/fetch_goals/${currentIDTeam}`, {
        secure: true,
      });
      if (res.graph_data) {
        let responseArray = [...res.graph_data];
        SetGWPGraph([...responseArray]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isFloat = (n) => {
    try {
      return Number(n) === n && n % 1 !== 0;
    } catch (err) {
      console.log(err, "72b52752-02a7-4b70-b910-69810435b32b");
    }
  };

  const kFormatter = (num) => {
    try {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
      }
      return num;
    } catch (err) {
      console.log(err, "b059f7b4-161d-4c63-bdc7-be0966f811d8");
    }
  };

  const getPercenTage = (x, y) => {
    let val = isNaN(y / x) * 100 ? 0 : checkValidity((y / x) * 100);
    return isFloat(val) ? parseInt(val).toPrecision(3) : parseInt(val);
  };

  const checkValidity = (data) => {
    try {
      if (
        data === "" ||
        data === null ||
        data === undefined ||
        data === "undefined" ||
        data === "-" ||
        data === Infinity
      ) {
        return 0;
      } else {
        return data;
      }
    } catch (err) {}
  };

  const onFinish = async (values) => {
    if (showAreYouSure && areYouSure) {
      let payload = {};

      if (todayGoalCreated._id) {
        payload = {
          csmId: currentIDTeam,
          gpwAchived: values.gpwCommitment, // achieved
          goal_id: todayGoalCreated._id ? todayGoalCreated._id : "",
        };
      } else {
        payload = {
          csmId: currentIDTeam,
          gpwCommitment: values.gpwCommitment,
        };
      }

      try {
        todayGoalCreated._id
          ? await axiosRequest.put(`user/update_your_goal`, payload, {
              secure: true,
            })
          : await axiosRequest.post(`user/set_goal`, payload, { secure: true });
        GetGraph();
        setIsModalOpen(false);
        changeDays(7);
        getUserData();
        form.resetFields();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    } else {
      setShowAreYouSure(true);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [reporting_hierarchies, setReporting_hierarchies] = useState([]);
  const [reporting_users, setReporting_users] = useState([]);
  const [showAreYouSure, setShowAreYouSure] = useState(false);
  const [areYouSure, setAreYouSure] = useState(false);
  const [user, setUser] = useState("");
  const onChangeAreYouSure = (e) => {
    setAreYouSure(e.target.value);
  };
  const userTreeData = useSelector((state) => state?.home?.user_tree);

  const { Text, Link } = Typography;
  const dispatch = useDispatch();
  useEffect(() => {
    const { id, channelCode } = stoageGetter("user");
    getUserDataParams(id);
    changeDays(7);
    GetGraph();
    setReporting_hierarchies(userTreeData.reporting_hierarchies);
  }, []);

  const [finalKpiDataDropdown, setFinalKpiDataDropdown] = useState(["GPW"]);
  const [currentTabValue, SetCurrentTabValue] = useState("Self");

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

  const changeTab = () => {
    currentTabValue === "Self"
      ? SetCurrentTabValue("Team")
      : SetCurrentTabValue("Self");
    if (currentTabValue === "Team") {
      gethirarchyData(id);
      setCurrentIDTeam(id);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // const kpiDataObj = employee_data
      //   ? employee_data.filter(
      //       (item) => item.id == "final_score_last_two_month"
      //     )
      //   : [];
      // let kpiData = kpiDataObj[0]?.data ? [...kpiDataObj[0]?.data] : [];
      // kpiData = kpiData.map((item) => ({
      //   ...item,
      //   finalScore: parseInt(item.Final_Score || 0),
      // }));
      // setFinalKpiConfig({
      //   data: kpiData,
      //   xField: "month",
      //   yField: "finalScore",
      //   point: {
      //     size: 5,
      //     shape: "diamond",
      //   },
      //   color: "#00ACC1",
      // });
      // setFinalKpiData(kpiData);

      // const kpiBudget = employee_data
      //   ? employee_data.filter((item) => item.category == finalKpiDataDropdown)
      //   : [];
      // let data = kpiBudget[0]?.data ? [...kpiBudget[0]?.data] : [];
      const budgetConfigDat = [];

      GWPGraph?.forEach((item, index) => {
        if (item.name == "GWP Commitment (in ₹)") {
          budgetConfigDat.push({
            name: "Commitment",
            val: parseInt(item.amount),
            day: item.month,
          });
        } else {
          budgetConfigDat.push({
            name: "Achieved",
            val: parseInt(item.amount),
            day: item.month,
          });
        }
      });

      setFinalBudgetConfig({
        data: budgetConfigDat,
        isGroup: true,
        xField: "day",
        yField: "val",
        seriesField: "name",
        color: ["#007f8f", "#5eb3bd"],
      });
      setFinalBudgetData(data);
    });
  }, [GWPGraph]);

  const { Option } = Select;
  function onChange(value) {
    setFinalKpiDataDropdown(value);
    dispatch(actions.kpiDashboard(value));
  }
  const onChangeKPIBudgetHandler = (value) => {
    setFinalKpiDataDropdown(value);
    dispatch(actions.kpiDashboard(value));
  };

  const getReportingUsers = (e) => {
    setReporting_users(
      userTreeData.reporting_users.filter((el) => el.hierarchy_id === e)
    );
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

  const changeDaysParams = async (value, currentId) => {
    if (value == 7) setSelectDays({ value: "7", label: "Last 7 Days" });
    else setSelectDays({ value: "30", label: "Last 30 Days" });

    try {
      let res = await axiosRequest.get(
        `user/fetch_daily_activity/${currentId}?option=${value}`,
        { secure: true }
      );
      if (res[0]) {
        SetGWPData(res[0]);
      }
    } catch (error) {
      console.log("error API " + error);
    }
  };

  const getUserDataParams = async (currrentID) => {
    try {
      let res = await axiosRequest.get(
        `user/fetch_goals/${currrentID}?team=enable`,
        {
          secure: true,
        }
      );
      setUser(res);
    } catch (error) {
      console.log("error API " + error);
    }
  };

  const GetGraphParams = async (currentId) => {
    try {
      let res = await axiosRequest.get(`user/fetch_goals/${currentId}`, {
        secure: true,
      });
      if (res.graph_data) {
        let responseArray = [...res.graph_data];
        SetGWPGraph([...responseArray]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const gethirarchyData = (currentId) => {
    getUserDataParams(currentId);
    setCurrentIDTeam(currentId);
    changeDaysParams(7, currentId);
    GetGraphParams(currentId);
  };

  return (
    <>
      <Modal
        title="GOAL PLANNING"
        centered
        visible={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        className="GoalModal"
      >
        <div className="modal-body">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #dbdbdb",
              paddingBottom: "10px",
              marginBottom: "10px",
            }}
          >
            <CalendarOutlined
              style={{
                fontSize: "19px",
                color: "#00acc1",
              }}
            />{" "}
            <div>
              Activity Goals for{" "}
              <span
                style={{
                  color: "#00acc1",
                  fontWeight: "bolder",
                }}
              >
                {Moment().format("MMM DD YYYY")}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              fontWeight: "bolder",
            }}
          >
            <div>GWP</div>
            <div>
              {todayGoalCreated._id
                ? `Commitment : ${todayGoalCreated.am.gpwCommitment}`
                : ""}
            </div>
          </div>

          <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="gpwCommitment"
              rules={[
                {
                  required: true,
                  message: "The Field is Required",
                },
                {
                  pattern: new RegExp("^[0-9]*$"),
                  message: "The Fields Should be numbers",
                },
              ]}
            >
              <Input maxLength={6} />
            </Form.Item>
            {showAreYouSure && (
              <Form.Item
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#00acc0",
                }}
              >
                Are you sure
                <Radio.Group
                  style={{ marginLeft: "10px" }}
                  onChange={onChangeAreYouSure}
                  value={areYouSure}
                >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </Form.Item>
            )}
            <Form.Item
              style={{
                marginBottom: 0,
              }}
            >
              <Button
                style={{
                  margin: "0 auto",
                  padding: "8px 35px",
                  background: "#e46a25",
                  border: "1px solid #e46a25",
                  boxShadow: "0px 5px 7px #00000029",
                }}
                type="primary"
                htmlType="submit"
              >
                {todayGoalCreated._id ? "Update" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      <Tabs tabMenu={[]} header="Daily Business" activeKey="1" />
      <div style={{ padding: "0 3%", paddingBottom: "30px" }}>
        <Row className="tabs">
          {checkAgent() === false && (
            <>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={2}
                xl={2}
                style={{ marginTop: "10px", padding: "0 5px" }}
              >
                <Button
                  className={
                    currentTabValue === "Self" ? "primaryBtn" : "secondaryBtn"
                  }
                  onClick={changeTab}
                >
                  <img
                    src={
                      currentTabValue === "Self" ? person_white : person_black
                    }
                    className="person person_icon"
                    alt="person_png"
                  />
                  {"   "}
                  Self
                </Button>
              </Col>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={2}
                xl={2}
                style={{ marginTop: "10px", padding: "0 5px" }}
              >
                <Button
                  className={
                    currentTabValue === "Team" ? "primaryBtn" : "secondaryBtn"
                  }
                  onClick={changeTab}
                >
                  <img
                    src={currentTabValue === "Team" ? group_white : group_black}
                    className="person person_icon"
                    alt="person_png"
                  />
                  {"   "}
                  Team
                </Button>
              </Col>
            </>
          )}
          {currentTabValue === "Team" && (
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={3}
              xl={3}
              className="selectionPeroson"
              style={{ marginTop: "10px", padding: "0 5px" }}
            >
              <Select
                defaultValue={{ value: "", label: "Select " }}
                size="medium"
                style={{
                  width: "100%",

                  border: "1px solid rgba(0,0,0,0.2)",
                }}
                onChange={getReportingUsers}
              >
                {reporting_hierarchies.map((res, index) => (
                  <Option key={index} value={res.value}>
                    {res.dispValue}
                  </Option>
                ))}
              </Select>
            </Col>
          )}
          {currentTabValue === "Team" && reporting_users.length > 0 && (
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={2}
              xl={2}
              className="selectionPeroson"
              style={{ marginTop: "10px", padding: "0 5px" }}
            >
              <Select
                defaultValue={{ value: "", label: "Select " }}
                size="medium"
                onChange={(e) => gethirarchyData(e)}
                style={{
                  width: "100%",
                  border: "1px solid rgba(0,0,0,0.2)",
                }}
              >
                {/* <Select
                  value={teamData}
                  options={teamMemberList}
                  onChange={(event) => handleTeamListData(event)}
                  placeholder="Select Team Member"
                ></Select> */}

                {reporting_users?.map((res, index) => (
                  <Option key={index} value={res._id}>
                    {res.first_name} {res.last_name}
                  </Option>
                ))}
              </Select>
            </Col>
          )}
        </Row>
        {checkAgent() === false && <hr style={{ marginBottom: "20px" }} />}
        {currentTabValue === "Self" ? (
          <div>
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
                style={{ padding: "14px", textTransform: "capitalize" }}
              >
                <Row justify="start">
                  <Avatar
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      backgroundColor: "#00ACC1",
                      verticalAlign: "middle",
                      textTransform: "uppercase",
                    }}
                    size="large"
                    gap={1}
                  >
                    {user?.csm_details?.first_name?.charAt(0)}
                    {user?.csm_details?.last_name?.charAt(0)}
                  </Avatar>
                  <Row style={{ flexDirection: "column", marginLeft: "10px" }}>
                    <Text strong>
                      {user?.csm_details?.first_name}{" "}
                      {user?.csm_details?.last_name}
                    </Text>
                    <Row>
                      <Text strong type="secondary">
                        CSM ID
                      </Text>
                      <Text style={{ marginLeft: "10px" }} type="secondary">
                        {" "}
                        {user?.csm_details?.agent_id}
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
                    justifyContent:
                      width <= breakpoint ? "space-between" : "end",
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
                      style={{
                        fontSize: "23px",
                        color: "gray",
                        margin: "0 5px",
                      }}
                    />
                    <Select
                      defaultValue={{ value: "7", label: "Last 7 Days" }}
                      size="large"
                      style={{ width: "100%" }}
                      onChange={changeDays}
                      value={selectDays}
                    >
                      <Option value="7">Last 7 Days</Option>
                      <Option value="30">Last 30 Days</Option>
                    </Select>
                  </div>
                  <Button
                    className="goalButton"
                    type="primary"
                    size="large"
                    onClick={showModal}
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

                {/* code */}
                <div className="budgeData_bussiness">
                  {finalBudgetConfig && <Column {...finalBudgetConfig} />}
                </div>
                {/* code */}
              </Col>
              <Col
                style={{ padding: 0 }}
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
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
                <div className="GWP_data_columns">
                  {GWPData?.map((res, index) => (
                    <Row key={index} className="GWP_div">
                      <Col span={6}>
                        {Moment(res.goal_date).format("DD/MM/YYYY")}
                      </Col>
                      <Col span={11} style={{ color: "#007f8f" }}>
                        ₹ {checkValidity(res.am.gpwCommitment)}
                      </Col>
                      <Col span={7} style={{ color: "#5eb3bd" }}>
                        ₹ {checkValidity(res.pm.gpwAchived)}(
                        {getPercenTage(
                          checkValidity(res.am.gpwCommitment),
                          checkValidity(res.pm.gpwAchived)
                        )}
                        %)
                      </Col>
                    </Row>
                  ))}
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <div>
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
                style={{ padding: "14px", textTransform: "capitalize" }}
              >
                <Row justify="start">
                  <Avatar
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      backgroundColor: "#00ACC1",
                      verticalAlign: "middle",
                      textTransform: "uppercase",
                    }}
                    size="large"
                    gap={1}
                  >
                    {user?.csm_details?.first_name?.charAt(0)}
                    {user?.csm_details?.last_name?.charAt(0)}
                  </Avatar>
                  <Row style={{ flexDirection: "column", marginLeft: "10px" }}>
                    <Text strong>
                      {user?.csm_details?.first_name}{" "}
                      {user?.csm_details?.last_name}
                    </Text>
                    <Row>
                      <Text strong type="secondary">
                        CSM ID
                      </Text>
                      <Text style={{ marginLeft: "10px" }} type="secondary">
                        {" "}
                        {user?.csm_details?.agent_id}
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
                    justifyContent:
                      width <= breakpoint ? "space-between" : "end",
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
                      style={{
                        fontSize: "23px",
                        color: "gray",
                        margin: "0 5px",
                      }}
                    />
                    <Select
                      defaultValue={{ value: "7", label: "Last 7 Days" }}
                      size="large"
                      style={{ width: "100%" }}
                      onChange={changeDays}
                      value={selectDays}
                    >
                      <Option value="7">Last 7 Days</Option>
                      <Option value="30">Last 30 Days</Option>
                    </Select>
                  </div>
                  <Button
                    className="goalButton"
                    type="primary"
                    size="large"
                    onClick={showModal}
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

                {/* code */}
                <div className="budgeData_bussiness">
                  {finalBudgetConfig && <Column {...finalBudgetConfig} />}
                </div>
                {/* code */}
              </Col>
              <Col
                style={{ padding: 0 }}
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
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
                <div className="GWP_data_columns">
                  {GWPData?.map((res, index) => (
                    <Row key={index} className="GWP_div">
                      <Col span={6}>
                        {Moment(res.goal_date).format("DD/MM/YYYY")}
                      </Col>
                      <Col span={11} style={{ color: "#007f8f" }}>
                        ₹ {checkValidity(res.am.gpwCommitment)}
                      </Col>
                      <Col span={7} style={{ color: "#5eb3bd" }}>
                        ₹ {checkValidity(res.pm.gpwAchived)}(
                        {getPercenTage(
                          checkValidity(res.am.gpwCommitment),
                          checkValidity(res.pm.gpwAchived)
                        )}
                        %)
                      </Col>
                    </Row>
                  ))}
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
};

export default DailyBussiness;

// jeevan - 62fcdbfc5fb1dc8913ab59fd
// pooja  - 62fcdbfc5fb1dc8913ab59ef
