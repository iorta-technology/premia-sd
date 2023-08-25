import { useEffect, useState } from "react";
import LeadCard from "./LeadCard";
import "./LeadCards.css";
import _ from "lodash";
import { Row, Col, Avatar, Card, Select, Button, message, DatePicker, Modal,Table } from "antd";
import NoRecordsFound from "../NoRcordsFound/NoRecordsFound";
import { useDispatch, useSelector } from "react-redux";
import { AllocateModal } from "../Tab/Allocate";
import { checkAgent, stoageSetter, stoageGetter } from "../../helpers";
import * as actions from "../../store/actions/leads";
import { DownloadOutlined } from "@ant-design/icons";
import axiosRequest from "../../axios-request/request.methods";
import person_black from "./../Activitity Tracker/icons/person_black.png";
import person_white from "./../Activitity Tracker/icons/person_white.png";
import group_white from "./../Activitity Tracker/icons/group_white.png";
import group_black from "./../Activitity Tracker/icons/group_black.png";
import { lobOpportunityItems, months } from "../StatusLead/dataSet";
import noDataIcon from "../../assets/NoDataFound.png";
// stoageSetter('user', user);

import {
  // getTeamMainTabApi,
  getFirstDropdownValueApi,
  getSecondDropdownValueApi,
  getFormByIdApi,
  getOpenTabApi,
  getFortodayTabApi,
  getFailedTabApi,
} from "../actions/allleadAction";

import { fetchAllLeadsSuccess } from "../../store/actions/leads_broker";
import { login } from "../../store/actions";

const { Option } = Select;
let _currentTab = "self";

const LeadCards = (props) => {
  const leadsData = useSelector((state) => state.leads);
  const loginState = useSelector((state) => state.login);
  const userTreeData = useSelector((state) => state?.home?.user_tree);
  const { user } = loginState;
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;
  const [isModalopen, setIsmodalopen] = useState(false);
  const [firsrDrop, setFirstDrop] = useState([]);
  const [openSecond, setOpenSecond] = useState(false);
  const [firstValue, setFirstValue] = useState("Select");
  const [secondDropData, setSecondDropData] = useState([]);
  const [secondValue, setSecondValue] = useState("Select");
  const [TeamSelf, setTeamSelf] = useState(true);
  const [lobOpportData, setLobOpportData] = useState("");
  const [fromDateFilter, setFromDateFilter] = useState("");
  const [fromDateString, setFromDateString] = useState("");
  const [toDateString, setToDateString] = useState("");
  const [toDateFilter, setToDateFilter] = useState("");
  const [cards, setcard] = useState([]);
  const [viewLob, setViewLob] = useState(false);
  const [Month, setMonth] = useState('');
  const [Year, setYear] = useState('');
  const [companyArray, setCompanyArray] = useState([]);
  const [Producer, setProducer] = useState('');
  const [hierarchy_lob, setHierarchy_lob] = useState([]);
  const [TeamMember_lob, setTeamMember_lob] = useState([]);
  const [dataSource, setdataSource] = useState([]);


  useEffect(() => {
    setFirstValue("Select");
    setSecondValue("Select");
    setOpenSecond(false);
  }, [leadsData.globalTab]);

  useEffect(() => {
    if (leadsData?.globalTab === "team") getDataForFirstDropdownTeam();
  }, [leadsData]);
  useEffect(() => {
    getCompanyDetails();
  }, []);
  const getCompanyDetails = async (lead_id) => {
    let result = await axiosRequest.get(`user/getproducerdropdown`, {
      secure: true,
    });
    let _compArr = [];
    result.map((el) => {
      let _data = { label: el.producer_name, value: el.producer_name };
      _compArr.push(_data);
    });
    // console.log(_compArr,"thjdjfjfhf");
    setCompanyArray(_compArr);

    userTreeData.reporting_hierarchies.forEach((el) => {
      el.label = el.dispValue;
    });
    // reporting_hierarchies.forEach(el =>{ el.label = el.dispValue })
    userTreeData.reporting_users.forEach((el) => {
      // reporting_users.forEach(el =>{
      el.label = el.full_name;
      el.value = el._id;
    });
    // setFirstDrop(userTreeData.reporting_hierarchies);
    setHierarchy_lob(userTreeData.reporting_hierarchies);
  };






  const getDataForFirstDropdownTeam = () => {
    userTreeData.reporting_hierarchies.forEach((el) => {
      el.label = el.dispValue;
    });
    // reporting_hierarchies.forEach(el =>{ el.label = el.dispValue })
    userTreeData.reporting_users.forEach((el) => {
      // reporting_users.forEach(el =>{
      el.label = el.full_name;
      el.value = el._id;
    });
    setFirstDrop(userTreeData.reporting_hierarchies);
    setHierarchy_lob(userTreeData.reporting_hierarchies);
    // setFirstDrop(reporting_hierarchies)
    // console.warn('firstDrop((((((((((===>>>>>>>>>>', firsrDrop)
    // }
  };

  // useEffect(() => {
  // if (secondValue) {
  // getDataAfterFilterTeam()
  // cardShow();
  // }
  // }, [leadsData.allLeads]);

  const handleFirstDropdown = (event) => {
    console.warn('event___HIERARCHYYY((((((((((===>>>>>>>>>>', event)
    event ? setOpenSecond(true) : setOpenSecond(false);
    setFirstValue(event);
    setSecondValue("");
    userTreeData.reporting_users.forEach((el) => {
      el.label = toCapitalize(el.full_name);
      el.value = el._id;
    });
    let _teamData = userTreeData.reporting_users.filter(
      (el) => el.hierarchy_id === event
    );

    setSecondDropData(_teamData);
  };
  let toCapitalize = (strText) => {
    try {
      if (strText !== "" && strText !== null && typeof strText !== undefined) {
        var _str = strText.toLowerCase();
        var collection = _str.split(" ");
        var modifyStrigs = [];
        _str = "";
        for (var i = 0; i < collection.length; i++) {
          modifyStrigs[i] =
            collection[i].charAt(0).toUpperCase() + collection[i].slice(1);
          _str = _str + modifyStrigs[i] + " ";
        }
        return _str;
      } else {
        return "";
      }
    } catch (err) { }
  };
  const handleSecondDropdown = (event) => {
    // console.warn('event___TEAMM MEMBER((((((((((===>>>>>>>>>>', event)
    setSecondValue(event);
    stoageSetter("teamMemberId", event);
    dispatch(actions.fetchAllLeads_broker(event, "all", 1));
  };

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  const handleChangeTab = (currentTab) => {
    // console.log("good bye ",currentTab)
    // currentTab === "self" ? setTeamSelf(true) : setTeamSelf(false);
    _currentTab = currentTab;
    if (currentTab === "self") {
      setTeamSelf(true)
      getDataForOpen("all");
    } else {
      setTeamSelf(false);
    }
    // console.log("good bye currentActiveTab", currentTab);

    // setCurrentActiveTab(currentTab);
    dispatch(actions.updateTabOfDashboard(currentTab));

    setToDateFilter('');
    setToDateString('');
    setFromDateFilter('');
    setFromDateString('');
    setLobOpportData('');

    // if (currentTab === "team") getDataForOpen();
    // currentTab !== currentActiveTab &&
    // dispatch(actions.updateAllocateOfOpportunities(false));
  };

  const getDataForOpen = async (leadInc) => {
    // setLeadTabFilter(leadInc)
    const { id } = stoageGetter("user");
    // let _pageNo = current === undefined || current === null ? 1 : current
    let _pageNo = 1;
    if (_currentTab === "self") {
      dispatch(actions.fetchAllLeads_broker(id, leadInc, _pageNo));
    } else {
      const teamId = stoageGetter("teamMemberId");
      // console.warn("teamId______===========>>>", teamId);
      dispatch(
        actions.fetchAllLeads_broker(
          teamId === null || teamId === undefined ? id : teamId,
          leadInc,
          _pageNo
        )
      );
    }
  };

  const getDataAfterFilterTeam = async () => {
    const response = await getFormByIdApi({ id: secondValue });
    if (response.status == 200) {
      if (response?.data?.errMsg) {
        dispatch(
          fetchAllLeadsSuccess(
            response?.data?.errMsg[0],
            response?.data?.errMsg[1][0]?.count
          )
        );
      }
    } else {
      throw response?.data?.errMsg;
    }
  };

  const exportReport = async (type) => {
    // let _isTeam = leadsData?.globalTab === "self" ? "no" : "yes";
    // if (lobOpportData === "" || fromDateFilter === "" || toDateFilter === "") {
    //   message.warning("Please Select the required fields");
    //   return;
    // }
    let data = await axiosRequest.get(
      `user/getteamReport?userId=${user.id}`
    ).then((res) => {
    })
  };

  const handleLobOpprtunity = (event) => {
    // console.log("-------loboportunity-------", event);
    setLobOpportData(event);
  };
  const handleLOB = () => {
    setIsmodalopen(true);
  }

  const onChangeFromDate = (date, dateString) => {
    // console.warn('APOOOOO__DATE___',date)
    // console.warn('APOOOOO__DATE',dateString)

    const isValidDateRange = validateDateRange(dateString, toDateFilter);
    // console.log('FROMM___isValidDateRange------->>>',isValidDateRange)
    if (!isValidDateRange) {
      message.warning("From Date cannot be greater than To date");
      setFromDateFilter('');
      setFromDateString('');
    } else {
      setFromDateFilter(date);
      setFromDateString(dateString);
    }
  };
  const onChangeToDate = (date, dateString) => {
    // console.warn('APOOOOO__DATE___',date)
    // console.warn('APOOOOO__DATE',dateString)

    const isValidDateRange = validateDateRange(fromDateFilter, dateString);
    // console.log('Too___isValidDateRange------->>>',isValidDateRange)
    if (!isValidDateRange) {
      message.warning("To Date cannot be greater than From date");
      setToDateFilter('');
      setToDateString('');
    } else {
      setToDateFilter(date);
      setToDateString(dateString);
    }
  };
  const handleCancel = () => {
    setIsmodalopen(false);
    setProducer('');
    setMonth('');
  };

  const validateDateRange = (startDateStr, endDateStr) => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    if (startDate > endDate) {
      return false;
    }
    return true;
  };
  const handleMonthChange = (val) => {
    setMonth(val);
  };
  const handleProducerChange = (val) => {
    console.log(val);
    setProducer(val);
  };
  const getSecondDropdownValue = (event) => {
    userTreeData.reporting_users.forEach((el) => {
      el.label = toCapitalize(el.full_name);
      el.value = el._id;
    });
    let _teamData = userTreeData.reporting_users.filter(
      (el) => el.hierarchy_id === event
    );
    setTeamMember_lob(_teamData);
  }
  // const dataSource = [
  //   {
  //     key: '1',
  //     name: 'Mike',
  //     age: 32,
  //   },
  //   {
  //     key: '2',
  //     name: 'John',
  //     age: 42,
  //   },
  // ];
  
  const columns = [
    {
      title: 'LOB',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Number of LOBs',
      dataIndex: 'age',
      key: 'age',
    },
  ];
  const handleViewLob=()=>{
    let result=axiosRequest.get(`user/get-team-lob-count/63dce7c80ae6868961079fe6?month=${Month}&year=${Year}&producer_name=${Producer}`,{
      secure:true
    })
    let res=result?.errMsg?.map((item)=>{
        let obj={}
        obj['key']=item._id;
        obj['name']=item.lob_for_opportunity;
        obj['age']=item.wallet_share;
        return obj;
    })
    setdataSource(res);
  }
  const handleDateChange=(val,dateString)=>{
    setYear(dateString);
  }

  return (
    <div className="cards-container cards_data">
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginTop: '20px' }}>
        <div className="dropdown-container">
          <div className="round-card-main-Tab" >
            <>
              <div
                className="CardBodySelf lead-ml60"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 25,
                }}
              >
                {checkAgent() === false && (
                  <button
                    style={{
                      width: 95,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className={TeamSelf ? "activateSelf" : " "}
                    onClick={() => handleChangeTab("self")}
                  >
                    <img
                      src={TeamSelf ? person_white : person_black}
                      className="personSelf"
                      alt="person_png"
                    />
                    Self
                  </button>
                )}
                {checkAgent() === false && (
                  <button
                    style={{
                      width: 95,
                      display: "flex",
                      marginLeft: 15,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className={!TeamSelf ? "activateSelf" : ""}
                    onClick={() => handleChangeTab("team")}
                  >
                    <img
                      src={TeamSelf ? group_black : group_white}
                      className="personSelf"
                      alt="group_png"
                    />
                    Team
                  </button>
                )}


              </div>
              {
                isModalopen &&
                <Modal
                  title="View LOB"
                  className="todo-popup-container-width todo-header-style"
                  centered
                  width={400}
                  onCancel={handleCancel}
                  visible={isModalopen}
                >
                  <Row style={{ marginBottom: 10 }}>
                    <Col style={{ flex: 1, margin: '4px' }}>
                      <p style={{ marginBottom: 2 }}> Heirarchy </p>
                      <Select
                        placeholder="Hierarchy"
                        style={{ width: '100%' }}
                        options={hierarchy_lob}
                        onChange={getSecondDropdownValue}
                      >
                      </Select>
                    </Col>
                    <Col style={{ flex: 1, margin: '4px' }}>
                      <p style={{ marginBottom: 2 }}> Team Member </p>
                      <Select
                        placeholder="team member"
                        style={{ width: '100%' }}
                        options={TeamMember_lob}
                      >
                      </Select>
                    </Col>
                    <Col style={{ flex: 1, margin: '4px' }}>
                      <p style={{ marginBottom: 2 }}> Producer </p>
                      <Select
                        placeholder="producer"
                        options={companyArray}
                        onChange={handleProducerChange}
                        value={Producer}
                        style={{ width: '100%' }}
                      >
                      </Select>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: 10 }}>
                    <Col style={{ flex: 1, margin: '4px' }}>
                      <p style={{ marginBottom: 2 }}> Month </p>
                      <Select
                        placeholder="Month"
                        value={Month}
                        options={months}
                        onChange={handleMonthChange}
                        style={{ width: '100%' }}
                      >
                      </Select>
                    </Col>
                    <Col style={{ flex: 1, margin: '4px' }}>
                      <p style={{ marginBottom: 2 }}> Year </p>
                      <DatePicker picker="year" style={{ width: '100%' }} onChange={handleDateChange}/>
                    </Col>
                    <Col style={{ flex: 1, margin: '4px', width: '100%' }}>
                      <Button style={{ marginTop: '22px', background: '#3b371e', color: '#fff' }} onClick={handleViewLob}>View Lob</Button>
                    </Col>
                  </Row>
                  {
                    (dataSource?.length===0 || dataSource===undefined)?
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 40 }}>
                      <img src={noDataIcon} style={{ height: 100, width: 100 }} />
                      <div style={{ marginTop: 10 }}>
                        <text style={{ textAlign: "center", fontSize: 14, color: '#B1B1B1', fontWeight: 500 }}>No LOB details available.
                        </text>
                      </div>
                    </div>:
                    <Table dataSource={dataSource} columns={columns} />
                  }

                </Modal>
              }
            </>
            {/* )} */}
          </div>

          {leadsData?.globalTab === "team" && (
            <div
              className="lead-ml15"
              style={{ position: "relative", bottom: 26 }}
            >
              <p style={{ marginBottom: "5px" }}>Hierarchy</p>
              <Select
                // className="firstdropdown"
                value={firstValue}
                style={{ width: 200 }}
                onChange={handleFirstDropdown}
                placeholder="Select Hierarchy"
                options={firsrDrop}
              ></Select>
            </div>
          )}
          {openSecond && leadsData?.globalTab === "team" && (
            <div
              className="lead-ml15"
              style={{ position: "relative", bottom: 26 }}
            >
              <p style={{ marginBottom: "5px" }}>Team Member</p>
              <Select
                value={secondValue}
                style={{ width: 200 }}
                onChange={(item) => handleSecondDropdown(item)}
                placeholder="Select Team Member"
                options={secondDropData}
              ></Select>
            </div>
          )}
          {openSecond && leadsData?.globalTab === "team" && secondValue && (
            <div
              className="lead-ml15"
              style={{ position: "relative", bottom: 26 }}
            >

            </div>
          )}
        </div>

        <div style={{ marginRight: '65px', display: 'flex' }}>
          <div style={{ marginRight: '20px' }}>
            <Button style={{ backgroundColor: '#00ACC1', color: '#fff' }} onClick={handleLOB}>
              View LOB
            </Button>
          </div>
          <div>
            <Button
              onClick={exportReport}
              style={{
                backgroundColor: "#3c3d3d",
                color: "#fff",
                borderRadius: 2,
                padding: '15px'
              }}
              className="d-flex align-items-center justify-content-center"
            >
              <DownloadOutlined /> Export
            </Button>
          </div>
        </div>
      </div>



      {/* <div className="dropdown-container lead-ml60">
        <div
          style={{ position: "relative", bottom: 26 }}
          className="expt-heading"
        >
          <p style={{ marginBottom: "5px" }}>LOB Opportunity Name</p>
          <Select
            value={lobOpportData || undefined}
            style={{ width: 200 }}
            onChange={handleLobOpprtunity}
            placeholder="Select Hierarchy"
            options={lobOpportunityItems}
            className="expt-picker"
          ></Select>
        </div>

        <div className="lead-ml15" style={{ position: "relative", bottom: 26 }}>
          <p style={{ marginBottom: "5px" }}>From</p>
          <DatePicker
            onChange={onChangeFromDate}
            value={fromDateFilter}
            format="MM/DD/YYYY"
            style={{ width: 200 }}
            className="expt-picker"
          />
        </div>

        <div className="lead-ml15" style={{ position: "relative", bottom: 26 }}>
          <p style={{ marginBottom: "5px" }}>To</p>
          <DatePicker
            onChange={onChangeToDate}
            value={toDateFilter}
            format="MM/DD/YYYY"
            style={{ width: 200 }}
            className="expt-picker"
          />
        </div>

        <div style={{ marginLeft: 15 }} className="expt-btn">
          <Button
            onClick={() => exportReport("self")}
            style={{ backgroundColor: "#3c3d3d", color: "#fff" }}
            className="d-flex justify-content-center align-items-center w-100"
          >
            <DownloadOutlined /> Export
          </Button>
        </div>
      </div> */}

      <Row
        justify="center"
        gutter={[18, { xs: 8, sm: 10, md: 10, lg: 18 }]}
        className="row-lead"
      >
        {!_.isEmpty(leadsData.allLeads) ? (
          _.map(leadsData.allLeads, (lead, index) => {
            return (
              <>
                {console.log(lead, "this is the lead")}
                <Col sm={18} md={18} lg={11} xl={11}>
                  <LeadCard
                    className="lead-agent-card"
                    key_broker={lead._id}
                    // id={lead._id}
                    // viewLob={viewLob}
                    appointment_on={lead.appointment_on}
                    Owner_name={lead.name}
                    wallet_size={lead.wallet_size}
                    producer_name={lead.producer_name}
                    city={lead.city}
                    raw_producer_name={lead.raw_producer_name}
                    lob={lead.lob}
                    utilization={lead.utilization}
                    brokerID={lead.brokerId}
                  // lead_Id={lead.lead_Id}
                  // companyName={lead.companyName}
                  // opportunityName={lead.opportunityName}
                  // industryName={lead.industryName}
                  // KDM_Name={lead.KDM_Name}
                  // mobileNo={lead.mobileNo}
                  // branch_Name={lead.branch_Name}
                  // appointDate={lead.appointDate}
                  // location={lead.location}
                  // loading={props.leadDataLoading}
                  // owner_name={lead.userId}
                  // weightage={lead.weightage}
                  // lob={lead.lob_for_opportunity}
                  // tagic_premium={lead.tagic_premium}
                  // total_premium={lead.total_premium}
                  // inception_date={lead.inception_date}
                  />
                </Col>
              </>
            );
          })
        ) : (
          <Col sm={18} md={18} lg={22} xl={22}>
            <NoRecordsFound />
          </Col>
        )}
        {/* {!secondValue ? card : cards} */}
        {/* this is just a presentational card  */}
        {!_.isEmpty(leadsData.allLeads) && (
          <Col
            sm={18}
            md={18}
            lg={11}
            xl={11}
            className={
              width < breakpoint ? "dummy-card-mobile" : "dummy-card-desktop"
            }
          >
            <>
              <Card className="lead-card-desktop" hoverable={true}></Card>
            </>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default LeadCards;
