import { useEffect, useState } from "react";
import LeadCard from "./LeadCard";
import "./LeadCards.css";
import _ from "lodash";
import { Row, Col, Avatar, Card, Select } from "antd";
import NoRecordsFound from "../NoRcordsFound/NoRecordsFound";
import { useDispatch, useSelector } from "react-redux";
import { AllocateModal } from "../Tab/Allocate";

import {
  getTeamMainTabApi,
  getFirstDropdownValueApi,
  getSecondDropdownValueApi,
  getFormByIdApi,
  getOpenTabApi,
  getFortodayTabApi,
  getFailedTabApi,
} from "../../components/actions/allleadAction";

import { fetchAllLeadsSuccess } from "../../store/actions/leads";

const LeadCards = (props) => {
  const leadsData = useSelector((state) => state.leads);
  const loginState = useSelector((state) => state.login);
  const { user } = loginState;
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  const [firsrDrop, setFirstDrop] = useState([]);
  const [openSecond, setOpenSecond] = useState(false);
  const [firstValue, setFirstValue] = useState("");
  const [secondDropData, setSecondDropData] = useState([]);
  const [secondValue, setSecondValue] = useState("");

  const [cards, setcard] = useState([]);

  useEffect(() => {
    if (leadsData?.globalTab?.toString() === "team") {
      getDataForFirstDropdownTeam();
    }
  }, [leadsData]);

  const getDataForFirstDropdownTeam = async () => {
    const response = await getFirstDropdownValueApi(user && user.id);
    if (response.status == 200) {
      if (response?.data?.errMsg?.reporting_hierarchies) {
        setFirstDrop(response?.data?.errMsg.reporting_hierarchies);
        setSecondDropData(response?.data?.errMsg.reporting_users);
      }
    } else {
      throw response?.data?.errMsg;
    }
  };

  // useEffect(() => {
  //   if(openSecond){
  //   getDataForSecondDropdownTeam()
  //   }
  // }, [openSecond])

  useEffect(() => {
    if (secondValue) {
      // getDataAfterFilterTeam()
      cardShow();
    }
  }, [secondValue, props]);

  useEffect(() => {
    // if (secondValue) {
    // getDataAfterFilterTeam()
    cardShow();
    // }
  }, []);

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

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  const cardShow = () => {
    if (secondValue) {
      let newCards = secondDropData.filter(
        (data) => data.reporting_manager === secondValue
      );

      if (_.isEmpty(newCards)) {
        return <NoRecordsFound />;
      }
      if (!_.isEmpty(newCards)) {
        let card = [];
        card = _.map(newCards, (lead, index) => {
          return (
            <>
              <Col sm={18} md={18} lg={11} xl={11}>
                <LeadCard
                  className="lead-agent-card"
                  key={lead._id}
                  id={lead._id}
                  lead_Id={""}
                  leadStatus={lead.leadStatus}
                  firstName={lead.first_name}
                  lastName={lead.last_name}
                  created_date={""}
                  allocatedDate={""}
                  primaryMobile={""}
                  allocatedBy={""}
                  allocatedTo={""}
                  appointmentOn={""}
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
  let card = [];
  if (_.isEmpty(props.leads)) {
    return <NoRecordsFound />;
  }
  if (!_.isEmpty(props.leads)) {
    card = _.map(props.leads, (lead, index) => {
      return (
        <>
          <Col sm={18} md={18} lg={11} xl={11}>
            <LeadCard
              className="lead-agent-card"
              key={lead._id}
              id={lead._id}
              lead_Id={lead.lead_Id}
              leadStatus={lead.leadStatus}
              firstName={lead.firstName}
              lastName={lead.lastName}
              created_date={lead.created_date}
              allocatedDate={lead.allocatedDate}
              primaryMobile={lead.primaryMobile}
              allocatedBy={
                lead.lead_allocated_by === null
                  ? ""
                  : lead.lead_allocated_by.first_name +
                    " " +
                    lead.lead_allocated_by.last_name
              }
              allocatedTo={
                lead.leadOwnerId === null
                  ? ""
                  : lead.leadOwnerId.first_name +
                    " " +
                    lead.leadOwnerId.last_name
              }
              appointmentOn={lead?.appointmentId?.start_date}
              loading={props.leadDataLoading}
            />
          </Col>
        </>
      );
    });
  }
  // )

  const handleFirstDropdown = (e) => {
    e.target.value ? setOpenSecond(true) : setOpenSecond(false);
    setFirstValue(e.target.value);
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

  return (
    <div className="cards-container">
      <div className="dropdown-container">
        {leadsData?.globalTab?.toString() === "team" && (
          <div>
            <p style={{ marginLeft: "3.8rem", marginBottom: "-10px" }}>
              Select Hierarchy
            </p>

            <select
              className="firstdropdown"
              name="firstValue"
              placeholder="Select Hierarchy"
              value={firstValue}
              style={{
                margin: "10px",
                marginLeft: "60px",
                width: "150px",
                height: "30px",
                outline: "none",
              }}
              onChange={handleFirstDropdown}
            >
              <option value="">All</option>
              {firsrDrop &&
                firsrDrop.length &&
                firsrDrop.map((data) => (
                  <option key={data.value} value={data.value}>
                    {data.dispValue}
                  </option>
                ))}
            </select>
          </div>
        )}
        {openSecond && leadsData?.globalTab?.toString() === "team" && (
          <div>
            <p style={{ marginLeft: "1.3rem", marginBottom: "-10px" }}>
              Select Team Member
            </p>

            <select
              className="seconddropdown"
              name="secondValue"
              value={secondValue}
              style={{
                margin: "10px",
                marginLeft: "20px",
                width: "150px",
                height: "30px",
                outline: "none",
              }}
              onChange={(e) => setSecondValue(e.target.value)}
            >
              <option value="">All</option>
              {secondDropData &&
                secondDropData.length &&
                secondDropData.map(
                  (data) =>
                    data.hierarchy_id === firstValue && (
                      <option key={data._id} value={data._id}>
                        {data.full_name}
                      </option>
                    )
                )}
            </select>
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
