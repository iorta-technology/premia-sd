import { useEffect, useState } from "react";
import LeadCard from "./LeadCard";
import "./LeadCards.css";
import _ from "lodash";
import { Row, Col, Avatar, Card, Select } from "antd";
import NoRecordsFound from "../NoRcordsFound/NoRecordsFound";
import { useDispatch, useSelector } from "react-redux";
import { AllocateModal } from "../Tab/Allocate";
import { stoageSetter } from "../../helpers";
import * as actions from "../../store/actions/leads";
// stoageSetter('user', user);

import {
  // getTeamMainTabApi,
  getFirstDropdownValueApi,
  getSecondDropdownValueApi,
  getFormByIdApi,
  getOpenTabApi,
  getFortodayTabApi,
  getFailedTabApi,
} from "../../components/actions/allleadAction";

import { fetchAllLeadsSuccess } from "../../store/actions/leads";

const { Option } = Select;

const LeadCards = (props) => {
  const leadsData = useSelector((state) => state.leads);
  const loginState = useSelector((state) => state.login);
  const userTreeData = useSelector((state) => state?.home?.user_tree);
  // console.warn('userTreeData==========>>>>>>>',userTreeData)
  const { user } = loginState;
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  const [firsrDrop, setFirstDrop] = useState([]);
  const [openSecond, setOpenSecond] = useState(false);
  const [firstValue, setFirstValue] = useState("Select");
  const [secondDropData, setSecondDropData] = useState([]);
  const [secondValue, setSecondValue] = useState("Select");
  // const [hierarAgentList ,setHierarAgentList]=useState([])

  const [cards, setcard] = useState([]);

  useEffect(() => {
    setFirstValue("Select");
    setSecondValue("Select");
    setOpenSecond(false);
  }, [leadsData.globalTab]);

  useEffect(() => {
    if (leadsData?.globalTab === "team") getDataForFirstDropdownTeam();
  }, [leadsData]);

  const getDataForFirstDropdownTeam = () => {
    // const response = await getFirstDropdownValueApi(user && user.id);
    // if (response.status == 200) {
    //   if (response?.data?.errMsg?.reporting_hierarchies) {
    //     setFirstDrop(response?.data?.errMsg.reporting_hierarchies);
    //     setSecondDropData(response?.data?.errMsg.reporting_users);
    //   }
    // } else {
    //   throw response?.data?.errMsg;
    // }

    // if(userTreeData.length > 0){
    // if(userTreeData.length == 0){
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
    // setFirstDrop(reporting_hierarchies)
    // console.warn('firstDrop((((((((((===>>>>>>>>>>', firsrDrop)
    // }
  };

  useEffect(() => {
    // if (secondValue) {
    // getDataAfterFilterTeam()
    cardShow();
    // }
  }, [leadsData.allLeads]);

  // useEffect(() => {
  //   // if (secondValue) {
  //   // getDataAfterFilterTeam()
  //   cardShow();
  //   // }
  // }, []);

  // const getDataForSecondDropdownTeam = async () => {
  //   const response = await getSecondDropdownValueApi()
  //   if (response.status == 200) {
  //     if (response?.data?.errMsg) {
  //       const filterValue = []
  //       const dropDownData = []
  //       _.map(response.data.errMsg, function (layar) {
  //         return _.map(layar, function (layarTwo) {
  //           filterValue.push(layarTwo[0])
  //         })
  //       })
  //       filterValue &&
  //         _.map(filterValue, function (layar) {
  //           _.map(layar.subCategories, function (data) {
  //             dropDownData.push(data)
  //           })
  //         })
  //       setSecondDropData(dropDownData)
  //     }
  //   } else {
  //     throw response?.data?.errMsg
  //   }
  // }
  const handleFirstDropdown = (event) => {
    // console.warn('event___HIERARCHYYY((((((((((===>>>>>>>>>>', event)
    event ? setOpenSecond(true) : setOpenSecond(false);
    setFirstValue(event);
    setSecondValue("");
    // stoageSetter('teamMemberId', event);
    userTreeData.reporting_users.forEach((el) => {
      el.label = toCapitalize(el.full_name);
      el.value = el._id;
    });
    // let _teamData = reporting_users.filter(el => el.hierarchy_id === event)
    let _teamData = userTreeData.reporting_users.filter(
      (el) => el.designation === event
    );
    // console.warn('_teamData((((((((((===>>>>>>>>>>', _teamData)
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
    } catch (err) {}
  };
  const handleSecondDropdown = (event) => {
    // console.warn('event___TEAMM MEMBER((((((((((===>>>>>>>>>>', event)
    setSecondValue(event);
    stoageSetter("teamMemberId", event);
    dispatch(actions.fetchAllLeads(event, "all", 1));
  };

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  const cardShow = () => {
    if (secondValue) {
      let newCards = leadsData.allLeads;
      // .filter((data) =>
      //   data.reporting_manager === secondValue
      // );
      // console.warn('leAD___CARDSSSSSS',newCards)

      if (_.isEmpty(newCards)) {
        return (
          <>
            <div className="dropdown-container">
              {leadsData?.globalTab === "team" && (
                <div>
                  <p style={{ marginLeft: "3.8rem", marginBottom: "5px" }}>
                    Select Hierarchy
                  </p>
                  <Select
                    className="firstdropdown"
                    value={firstValue}
                    style={{ width: 150, marginLeft: "60px", marginBottom: 15 }}
                    onChange={handleFirstDropdown}
                    placeholder="Select Hierarchy"
                    options={firsrDrop}
                  ></Select>
                </div>
              )}
              {openSecond && leadsData?.globalTab === "team" && (
                <div>
                  <p style={{ marginLeft: "1.3rem", marginBottom: "5px" }}>
                    Select Team Member
                  </p>
                  <Select
                    className="seconddropdown"
                    value={secondValue}
                    style={{ width: 150, marginLeft: "20px", marginBottom: 15 }}
                    onChange={(item) => handleSecondDropdown(item)}
                    placeholder="Select Team Member"
                    options={secondDropData}
                  ></Select>
                </div>
              )}
            </div>

            <NoRecordsFound />
          </>
        );
      }
      if (!_.isEmpty(newCards)) {
        let card = [];
        card = _.map(newCards, (lead, index) => {
          // console.warn('leAD___CARDSSSSSS',lead)
          return (
            <>
              <Col sm={18} md={18} lg={11} xl={11}>
                <LeadCard
                  className="lead-agent-card"
                  key={lead.id}
                  id={lead.id}
                  lead_Id={lead.lead_Id}
                  leadStatus={lead.status}
                  leadName={lead.personName}
                  // firstName={lead.first_name}
                  // lastName={lead.last_name}
                  created_date={lead.allocationDate}
                  allocatedDate={lead.allocationDate}
                  primaryMobile={lead.mobileNo}
                  allocatedBy={lead.allocBy}
                  allocatedTo={lead.allocTo}
                  appointmentOn={lead.appointDate}
                  loading={props.leadDataLoading}
                />
              </Col>
            </>
          );
        });
        setcard(card);
      }
    }
    //  else {

    //   let card = [];
    //   if (_.isEmpty(props.leads)) { return <NoRecordsFound /> }
    //   if (!_.isEmpty(props.leads)) {
    //     card = _.map(props.leads, (lead, index) => {
    //       return (
    //         <>
    //           <Col sm={18} md={18} lg={11} xl={11} >
    //             <LeadCard className='lead-agent-card'
    //               key={lead._id}
    //               id={lead._id}
    //               lead_Id={lead.lead_Id}
    //               leadStatus={lead.leadStatus}
    //               firstName={lead.firstName}
    //               lastName={lead.lastName}
    //               created_date={lead.created_date}
    //               allocatedDate={lead.allocatedDate}
    //               primaryMobile={lead.primaryMobile}
    //               allocatedBy={lead.lead_allocated_by === null ? '' : lead.lead_allocated_by.first_name + ' ' + lead.lead_allocated_by.last_name}
    //               allocatedTo={lead.leadOwnerId === null ? '' : lead.leadOwnerId.first_name + ' ' + lead.leadOwnerId.last_name}
    //               appointmentOn={lead?.appointmentId?.start_date}
    //               loading={props.leadDataLoading}
    //             />
    //           </Col>
    //         </>
    //       )
    //     })
    //     setcard(card)
    //   }
    // }
  };

  // secondValue ?
  // "hi"
  // :
  // (
  // console.warn('leAD___CARDSSSSSS',props.leads)
  // return
  let card = [];
  if (_.isEmpty(props.leads)) {
    return (
      <>
        <div className="dropdown-container">
          {leadsData?.globalTab === "team" && (
            <div>
              <p style={{ marginLeft: "3.8rem", marginBottom: "5px" }}>
                Select Hierarchy
              </p>
              <Select
                className="firstdropdown"
                value={firstValue}
                style={{ width: 150, marginLeft: "60px", marginBottom: 15 }}
                onChange={handleFirstDropdown}
                placeholder="Select Hierarchy"
                options={firsrDrop}
              ></Select>
            </div>
          )}
          {openSecond && leadsData?.globalTab === "team" && (
            <div>
              <p style={{ marginLeft: "1.3rem", marginBottom: "5px" }}>
                Select Team Member
              </p>
              <Select
                className="seconddropdown"
                value={secondValue}
                style={{ width: 150, marginLeft: "20px", marginBottom: 15 }}
                onChange={(item) => handleSecondDropdown(item)}
                placeholder="Select Team Member"
                options={secondDropData}
              ></Select>
            </div>
          )}
        </div>
        <NoRecordsFound />
      </>
    );
  }
  if (!_.isEmpty(props.leads)) {
    card = _.map(props.leads, (lead, index) => {
      // console.warn('leAD___CARDSSSSSS__HEREEE',lead)
      return (
        <>
          <Col sm={18} md={18} lg={11} xl={11}>
            <LeadCard
              className="lead-agent-card"
              key={lead.id}
              id={lead.id}
              lead_Id={lead.lead_Id}
              leadStatus={lead.status}
              leadName={lead.personName}
              // firstName={lead.firstName}
              // lastName={lead.lastName}
              created_date={lead.allocationDate}
              allocatedDate={lead.allocationDate}
              primaryMobile={lead.mobileNo}
              allocatedBy={lead.allocBy}
              allocatedTo={lead.allocTo}
              appointmentOn={lead.appointDate}
              loading={props.leadDataLoading}
            />
          </Col>
        </>
      );
    });
  }
  // )

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

  return (
    <div className="cards-container">
      <div className="dropdown-container">
        {leadsData?.globalTab === "team" && (
          <div>
            <p style={{ marginLeft: "3.8rem", marginBottom: "5px" }}>
              Select Hierarchy
            </p>
            <Select
              className="firstdropdown"
              value={firstValue}
              style={{ width: 150, marginLeft: "60px", marginBottom: 15 }}
              onChange={handleFirstDropdown}
              placeholder="Select Hierarchy"
              options={firsrDrop}
            ></Select>
          </div>
        )}
        {openSecond && leadsData?.globalTab === "team" && (
          <div>
            <p style={{ marginLeft: "1.3rem", marginBottom: "5px" }}>
              Select Team Member
            </p>
            <Select
              className="seconddropdown"
              value={secondValue}
              style={{ width: 150, marginLeft: "20px", marginBottom: 15 }}
              onChange={(item) => handleSecondDropdown(item)}
              placeholder="Select Team Member"
              options={secondDropData}
            ></Select>
          </div>
        )}
      </div>
      <Row justify="center" gutter={[18, { xs: 8, sm: 10, md: 10, lg: 18 }]}>
        {!secondValue ? card : cards}
        {/* this is just a presentational card  */}
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
            <Card
              // key={id}
              // loading={props.loading}
              className="lead-card-desktop"
              hoverable={true}
            >
              <div className="avatar-and-status">
                <Avatar size={{ xl: 50 }}></Avatar>
              </div>
              <div className="content">
                <div className="content-header">
                  <p className="user-name-text capitalize">
                    <span className="user-id uppercase"></span>
                  </p>
                </div>
                <div className="content-body">
                  <Card.Grid hoverable={false} className="grid-style">
                    <p className="text-type">Created on</p>
                    <p className="text-content"></p>
                  </Card.Grid>
                  <Card.Grid hoverable={false} className="grid-style">
                    <p className="text-type">Created on</p>
                    <p className="text-content"></p>
                  </Card.Grid>
                  <Card.Grid hoverable={false} className="grid-style">
                    <p className="text-type">Appointment on</p>
                    <p className="text-content">-</p>
                  </Card.Grid>
                  <Card.Grid hoverable={false} className="grid-style">
                    <p className="text-type">Mobile No.</p>
                    <p className="text-content"></p>
                  </Card.Grid>
                  <Card.Grid hoverable={false} className="grid-style">
                    <p className="text-type">Allocated by</p>
                    <p className="text-content capitalize"></p>
                  </Card.Grid>
                  <Card.Grid hoverable={false} className="grid-style">
                    <p className="text-type">Allocated to</p>
                    <p className="text-content capitalize"></p>
                  </Card.Grid>
                </div>
              </div>
              <button className="update-btn">Update</button>
            </Card>
          </>
        </Col>
      </Row>
    </div>
  );
};

export default LeadCards;
