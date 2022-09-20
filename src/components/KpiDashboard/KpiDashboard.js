import React, { useEffect, useState } from "react";
import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import "./KpiDashboard.css";
import "../Activitity Tracker/ActivityCalender.css";
import { Row, Col } from "antd";
import { Button } from "antd";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Table, Tag, Space } from "antd";
import { Select } from "antd";
import { Column } from "@ant-design/charts";
import { stoageGetter } from "../../helpers";
import Tabs from "../../components/Tab/Tab";
import axiosRequest from '../../axios-request/request.methods'

import Self from "../Activitity Tracker/LeftSide-Activity/Self/Self";
import Team from "../Activitity Tracker/LeftSide-Activity/Team/Team";

import person_black from "../../assets/MaterialUiIcons/person_black_192x192.png";
import person_white from "../../assets/MaterialUiIcons/person_white_192x192.png";
import group_white from "../../assets/MaterialUiIcons/group_white_192x192.png";
import group_black from "../../assets/MaterialUiIcons/group_black_192x192.png";

const KpiDashboard = () => {

  const userId = useSelector(state => state.login.userId)
  const login_user_data = stoageGetter('user')
    

  const dispatch = useDispatch();
  useEffect(() => {
    const { id, channelCode } = stoageGetter("user");
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
  const [TeamSelf, setTeamSelf] = useState(true);
  const [category, setCategory] = useState();
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
            (item) => item.id == "final_score_last_six_month"
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


      // -- ----------

      
      const kpiBudget = employee_data
        ? employee_data.filter((item) => item.category == finalKpiDataDropdown )
        : [];
      let data = kpiBudget[0]?.data ? [...kpiBudget[0]?.data] : [];
      
      data = data.map((item) => ({
        ...item,
        ...item[finalKpiDataDropdown],
      }));
     
      const budgetConfigDat = [];
      data.forEach((item) => {
        budgetConfigDat.push({
          // name: "Budget",
          [budgetKeys[finalKpiDataDropdown][0]]: parseInt(item[budgetKeys[finalKpiDataDropdown][0]] || 0),
          [budgetKeys[finalKpiDataDropdown][1]]: parseInt(item[budgetKeys[finalKpiDataDropdown][1] || 0]),
          month: item.month,
        });
        // budgetConfigDat.push({
        //   name: "Actual",
        //   [budgetKeys[finalKpiDataDropdown][1]]: parseInt(item[budgetKeys[finalKpiDataDropdown][1] || 0]),
        //   month: item.month,
        // });
        // return budgetConfigDat
      });
      console.log("Budget--", budgetConfigDat);
      console.log("hjhj---", budgetKeys[finalKpiDataDropdown][1]);
      // console.log("finalBudgetData___________data-->>>>>>>>>>>",data);
     
      setFinalBudgetConfig({
        data: budgetConfigDat,
        isGroup: true,
        xField: "month",
        yField: "val",
        seriesField: "name",
        color: ["rgb(228, 106, 37)", "#00ACC1"],
        
      });
      // console.log("finalBudgetData-->>>>>>>>>>>",finalBudgetData);
      setFinalBudgetData(budgetConfigDat);
      
    });
  }, [employee_data]);



  useEffect(() => {
    category_data()
  }, [])

 
  const category_data = async ()=>{
    let _channelId = login_user_data.channelCode._id
    let data = await axiosRequest.get(`user/fetchKPIMaster/main_category?channel=${_channelId}&usertype=user&userId=${userId}`)
    console.log("mydatatatatat----",data);

    let _resp = data[0]
    let gpwDropDwnList = []
    
    for(let i = 0; i < _resp.length; i++){
      let data = {
          value: _resp[i].categoryName,
          label: _resp[i].categoryName
      }
      gpwDropDwnList.push(data) 
    }
    // let category = self.gpwDropDwnList[0].value
    // self.actualHeader = self.dataSelected = category == 'Branch Activation' ? '% Active Branches' : category
    // self.inLacSectn = category == 'Branch Activation' ? '' :  '(in ₹ Lac)'

    // self.gpwHead = self.gpwDropDwnList[0].value
    // self.gpwDrpdwn = self.gpwDropDwnList[0].value

    setCategory(gpwDropDwnList);
  }
  

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
      align: "center",
    },
    {
      title: "Final Score",
      dataIndex: "Final_Score",
      key: "Final_Score",
      align: "center",
    },
    {
      title: "% Change over last month",
      dataIndex: "change_in_percent",
      key: "change_in_percent",
      align: "center",
    },
  ];

  
  const columns1 = [
    {
      title: "Period",
      dataIndex: "month",
      key: "month",
      align: "center"
    },
    {
      title: `${finalKpiDataDropdown}(in ₹ Lac) Budget`,
      dataIndex: budgetKeys[finalKpiDataDropdown][0],
      key: budgetKeys[finalKpiDataDropdown][0],
      align: "center"
    },
    {
      title: `${finalKpiDataDropdown}(in ₹ Lac) Actual`,
      dataIndex: budgetKeys[finalKpiDataDropdown][1],
      key: budgetKeys[finalKpiDataDropdown][1],
      align: "center"
    },
    {
      title: "% Achievement",
      dataIndex: budgetKeys[finalKpiDataDropdown][2],
      key: budgetKeys[finalKpiDataDropdown][2],
      align: "center"
    },
  ];
  // console.warn('HEADER DATA',columns1)


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
  
    
  const dailyDataCards = () => {
    return dailyDataArray.map((item, index) => {
      return (
        <div key={index} style={{ width: "48%" }}>
          <div className="kpiDailyData">
            <div style={{ marginTop: 5, padding: 6 }}>
              <text style={{ fontSize: 12 }}>Update as on {item.date}</text>
            </div>
            <div style={{ backgroundColor: "#ccc", height: 1 }}></div>

            <div style={{ paddingLeft: 10, marginTop: 5 }}>
              <text
                style={{ color: "#00acc1", fontSize: 16, fontWeight: "bolder" }}
              >
                {item.gwpData}
              </text>
            </div>
            <div
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 10,
                marginTop: 5,
              }}
            >
              <text style={{ fontSize: 12, fontWeight: "bolder" }}>
                {item.title}
              </text>
            </div>
            <div style={{ backgroundColor: "#ccc", height: 1 }}></div>
            <Row style={{ padding: 6, justifyContent: "space-between" }}>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {/* <text style={{fontSize:12,fontWeight:'bolder'}}>{shortMonth(item.month)}</text> */}
                  <text style={{ fontSize: 12, fontWeight: "bolder" }}>
                    {item.type}
                  </text>
                </div>
                <div style={{ marginLeft: 5 }}>
                  <text
                    style={{
                      color: "#e46a25",
                      fontSize: 12,
                      fontWeight: "bolder",
                    }}
                  >
                    {"Actual"}
                  </text>
                </div>
              </div>
            </Row>
          </div>
        </div>
      );
    });
  };
  return (
    <>
      <Tabs tabMenu={[]} header="KPI Dashboard" activeKey="1" />

      <div className="mainTab">
         <Row className="tabs">
          <Col xs={12} sm={12} md={12} lg={2} xl={2}>
            
           <button
                style={{width: "80%"}}
                className={TeamSelf ? "active_tabs_button" : "tabs_button"}
                onClick={(e) => {
                  setTeamSelf(true);
                }}
              >
                <img
                style={{marginRight: "0px"}}
                  src={TeamSelf ? person_white : person_black}
                  className="person"
                  alt="person_png"
                />
                Self
              </button>
          </Col>
          <Col xs={12} sm={12} md={12} lg={2} xl={2}>
            <button
                style={{width: "80%"}}
                className={!TeamSelf ? "active_tabs_button" : "tabs_button"}
                onClick={(e) => {
                  setTeamSelf(false);
                }}
              >
                <img
                style={{marginRight: "0px"}}
                  src={TeamSelf ? group_black : group_white}
                  className="person"
                  alt="group_png"
                />
                Team
              </button>
          </Col>
        </Row>
        <hr style={{ marginBottom: "20px" }} />
        { TeamSelf ? 
        <div>
        {width > breakpoint && (
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={24} md={24} lg={2} xl={2} className="cardKpi">
              <Row className="centerProfile">
                <Col sm={24} md={12} lg={2} xl={24}>
                  <div className="profile">
                    <h3
                      style={{
                        color: "#fff",
                        textTransform: "uppercase",
                        fontWeight: "normal",
                      }}
                    >
                      {avatar}
                    </h3>
                  </div>
                </Col>
                <Col className="userDetails" sm={24} md={12} lg={2} xl={24}>
                  <h5>
                    {employee_data[0]?.data.first_name}{" "}
                    {employee_data[0]?.data.last_name}
                  </h5>
                  <p style={{ marginTop: "0px" }}>
                    {" "}
                    <span>ID :</span>{" "}
                    <span>{employee_data[0]?.data.employeeCode}</span>
                  </p>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={22} lg={22} xl={22}>
              <Row className="detailsCards" gutter={[20, 13]}>
                <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                  <Row gutter={[10, 13]}>
                    <Col span={24} className="detailsCard">
                      <Row className="padding_row">
                        <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                          <p className="updatetitle">
                            update as on {updatedDate}
                          </p>
                          <div
                            weex-type="div"
                            className="weex-div weex-ct kpi-hori-line"
                          ></div>
                          <p className="updatecount">
                            {employee_data[1]?.data?.GPW?.gpw_actual
                              ? employee_data[1]?.data?.GPW?.gpw_actual
                              : 0}
                          </p>
                          <p className="updatetotal">Total GWP in ₹ Lac</p>
                          <div
                            weex-type="div"
                            className="weex-div weex-ct kpi-hori-line"
                          ></div>
                        </Col>
                        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                          <div className="dispa">
                            <p className="sidehead">
                              MTD {month} {employee_data[1]?.data.year}
                            </p>
                            <p className="updatestatus">Actual</p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24} className="detailsCard">
                      <Row className="padding_row">
                        <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                          <p className="updatetitle">
                            update as on {updatedDate}
                          </p>
                          <div
                            weex-type="div"
                            className="weex-div weex-ct kpi-hori-line"
                          ></div>
                          <p className="updatecount">
                            {employee_data[1]?.data.parcentIssuance
                              ? employee_data[1]?.data.parcentIssuance
                              : 0}
                          </p>
                          <p className="updatetotal">% Issuance</p>
                          <div
                            weex-type="div"
                            className="weex-div weex-ct kpi-hori-line"
                          ></div>
                        </Col>
                        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                          <div className="dispa">
                            <p className="sidehead">
                              MTD {month} {employee_data[1]?.data.year}
                            </p>
                            <p className="updatestatus">Actual</p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                  <Row className="detailsCards" gutter={[10, 13]}>
                    <Col span={24} className="detailsCard">
                      <Row className="padding_row">
                        <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                          <p className="updatetitle">
                            update as on {updatedDate}
                          </p>
                          <div
                            weex-type="div"
                            className="weex-div weex-ct kpi-hori-line"
                          ></div>
                          <p className="updatecount">
                            %{employee_data[1]?.data["Branch Activation"]
                                ?.branch_activation_actual ? employee_data[1]?.data["Branch Activation"]
                                ?.branch_activation_actual : 0}
                            {/* {
                              employee_data[1]?.data["Branch Activation"]
                                ?.branch_activation_actual
                            } */}
                          </p>
                          <p className="updatetotal">Active Branches</p>
                          <div
                            weex-type="div"
                            className="weex-div weex-ct kpi-hori-line"
                          ></div>
                        </Col>
                        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                          <div className="dispa">
                            <p className="sidehead">
                              MTD {month} {employee_data[1]?.data.year}
                            </p>
                            <p className="updatestatus">Actual</p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24} className="detailsCard">
                      <Row className="padding_row">
                        <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                          <p className="updatetitle">
                            update as on {updatedDate}
                          </p>
                          <div
                            weex-type="div"
                            className="weex-div weex-ct kpi-hori-line"
                          ></div>
                          <p className="updatecount">
                            % {employee_data[1]?.data.parcentPendancy ? employee_data[1]?.data.parcentPendancy : 0}
                          </p>
                          <p className="updatetotal">
                            Pendancy(GWP Pendancy vs. GWP Ach)
                          </p>
                          <div
                            weex-type="div"
                            className="weex-div weex-ct kpi-hori-line"
                          ></div>
                        </Col>
                        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                          <div className="dispa">
                            <p
                              className="sidehead"
                              style={{ margin: "0", marginRight: "-10px" }}
                            >
                              MTD {month} {employee_data[1]?.data.year}
                            </p>
                            <p className="updatestatus">Actual</p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                  <Row className="detailsCards" gutter={[10, 13]}>
                    <Col span={24} className="detailsCard">
                      <Row className="padding_row">
                        <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                          <p className="updatetitle">
                            update as on {updatedDate}
                          </p>
                          <div
                            weex-type="div"
                            className="weex-div weex-ct kpi-hori-line"
                          ></div>
                          <p className="updatecount">
                            {employee_data[1]?.data["GWP Retention"]
                              ?.gwp_retention_actual
                              ? employee_data[1]?.data["GWP Retention"]
                                  ?.gwp_retention_actual
                              : 0}
                          </p>
                          <p className="updatetotal">
                            Total GWP Retention in ₹
                          </p>
                          <div
                            weex-type="div"
                            className="weex-div weex-ct kpi-hori-line"
                          ></div>
                        </Col>
                        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                          <div className="dispa">
                            <p className="sidehead">
                              MTD {month} {employee_data[1]?.data.year}
                            </p>
                            <p className="updatestatus">Actual</p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24} className="detailsCard">
                      <Row className="padding_row">
                        <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                          <p className="updatetitle">
                            update as on {updatedDate}
                          </p>
                          <div
                            weex-type="div"
                            className="weex-div weex-ct kpi-hori-line"
                          ></div>
                          <p className="updatecount">
                            {employee_data[1]?.data.parcentUnallocated
                              ? employee_data[1]?.data.parcentUnallocated
                              : 0}
                          </p>
                          <p className="updatetotal">GWP Unallocated in ₹</p>
                          <div
                            weex-type="div"
                            className="weex-div weex-ct kpi-hori-line"
                          ></div>
                        </Col>
                        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                          <div className="dispa">
                            <p className="sidehead">
                              MTD {month} {employee_data[1]?.data.year}
                            </p>
                            <p className="updatestatus">Actual</p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
        {width < breakpoint && (
          <div>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={2}
              xl={2}
              style={{ marginBottom: 10 }}
              className="cardKpi"
            >
              <Row className="centerProfile">
                <Col sm={24} md={12} lg={2} xl={24}>
                  <div className="profile">
                    <h3
                      style={{
                        color: "#fff",
                        textTransform: "uppercase",
                        fontWeight: "normal",
                      }}
                    >
                      {avatar}
                    </h3>
                  </div>
                </Col>
                <Col className="userDetails" sm={24} md={12} lg={2} xl={24}>
                  <h5>
                    {employee_data[0]?.data.first_name}{" "}
                    {employee_data[0]?.data.last_name}
                  </h5>
                  <p style={{ marginTop: "0px" }}>
                    {" "}
                    <span>ID :</span>{" "}
                    <span>{employee_data[0]?.data.employeeCode}</span>
                  </p>
                </Col>
              </Row>
            </Col>
            <Row justify="space-between" style={{ flexWrap: "wrap" }}>
              {dailyDataCards()}
            </Row>
          </div>
        )}
        <Row justify="space-around" style={{ marginTop: "10px" }} gutter={16}>
          <Col xs={24} sm={24} md={24} lg={7} xl={7} className="graph">
            <div className="kip_score myGraph">
              <h4>FINAL KPI SCORE %</h4>
              <hr />
            </div>
            <div className="budgeData">
              {finalKpiConfig && <Column {...finalKpiConfig} />}
            </div>
            {/* graph */}
            <Table
              pagination={false}
              columns={columns}
              key={columns.key}
              dataSource={finalKpiData}
              className="score_one"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} className="graph">
            <div className="kip_score myGraph">
              <h4>KPI (BUDGET VS ACHIEVEMENT)</h4>
              <hr />
              <Select
                showSearch
                className="budget"
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChangeKPIBudgetHandler}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                options={category}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                value={finalKpiDataDropdown}
              >
                {/* <Option value="GPW">GPW</Option>
                <Option value="Branch Activation">Branch Activation</Option>
                <Option value="NOP Retention">NOP Retention</Option>
                <Option value="GWP Retention">GWP Retention</Option>
                <Option value="Dummy">Dummy</Option> */}
              </Select>
              

              
            </div>
            {/* graph */}
            <div className="budgeData">
              {finalBudgetConfig && <Column {...finalBudgetConfig} />}
            </div>

            <Table
              pagination={false}
              columns={columns1}
              key={columns1.key}
              dataSource={finalBudgetData}
              className="score"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} className="graph">
            <div className="myGraph">
              <Row justify="space-between">
                <Col>
                  <div className="kip_score list_of">
                    <h4>LIST OF RMs</h4>
                  </div>
                </Col>
                <Col>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="Top 10">Top 10</Option>
                    <Option value="Bottom 10">Bottom 10</Option>
                  </Select>
                </Col>
              </Row>
            </div>

            <Table
              className="rms"
              pagination={false}
              columns={columns2}
              key={columns2.key}
            />
          </Col>
        </Row>
        </div>
         : 
         ''}
      </div>
    </>
  );
};

export default KpiDashboard;
