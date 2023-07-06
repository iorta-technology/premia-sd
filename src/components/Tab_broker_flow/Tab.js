import React, { useState, useEffect, useContext } from "react";
import { Card, Radio, Tabs, Modal, Form, Select, Input } from "antd";
import { Option } from "antd/lib/mentions";
import "./Tab.css";
import _ from "lodash";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/leads_broker";
// import * as actions from "../../store/actions/leads";
import { checkAgent, stoageGetter } from "../../helpers";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import LeadCard from "../LeadCards/LeadCard";
import GlobalFilters from "./Filter";
import AllocateModalShow from "./Allocate";
import person_black from "./../Activitity Tracker/icons/person_black.png";
import person_white from "./../Activitity Tracker/icons/person_white.png";
import group_white from "./../Activitity Tracker/icons/group_white.png";
import group_black from "./../Activitity Tracker/icons/group_black.png";
import { useLocation } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
// import 'bootstrap/dist/css/bootstrap.min.css';

// api's
import {
  getTeamMainTabApi,
  getFirstDropdownValueApi,
  getSecondDropdownValueApi,
  getFormByIdApi,
  getOpenTabApi,
  getFortodayTabApi,
  getFailedTabApi,
} from "../actions/allleadAction";
import { flexibleCompare } from "fullcalendar";
import { Column } from "@antv/g2plot";

const { TabPane } = Tabs;

const Tab = ({
  tabMenu,
  header,
  detailsRouteTab,
  activeKey,
  activeRenewalkey,
  current,
  filterdata,
  resetDataFields,
  openTodoPopup,
  routeLeadData,
  updateFormData,
  statusLeadData,
}) => {
  const currentLocation = useLocation();
  const dispatch = useDispatch();
  const { leadType } = useParams();
  const { masterType } = useParams();
  const [activeTab, setactiveTab] = useState();
  const [showTab, setShowTab] = useState();
  const [showModal, setShowModal] = useState(false);
  const [leadTabFilter, setLeadTabFilter] = useState("all");
  const [TeamSelf, setTeamSelf] = useState(true);
  let storeFormData = useSelector((state) => state?.newLead?.formData);

  let history = useHistory();
  let _currentTab = "self";
  // const [activeKey, setActiveKey] = useState("self")
  const [currentActiveTab, setCurrentActiveTab] = useState("self");

  useEffect(() => {
    console.log("************************ header ___*(*(*((**)))) *********************===========>>>",header);
    // console.log('************************ leadTabFilter leadTabFilter *********************===========>>>',leadTabFilter)
    // getDataForOpen(leadTabFilter);
    if (header === "Lead") getDataForOpen(leadTabFilter);
  }, [current]);

  // ************************Api *********************

  const getDataForOpen = async (leadInc) => {
    setLeadTabFilter(leadInc);
    const { id } = stoageGetter("user");
    // console.log('************************ current ___*(*(*((**)))) *********************===========>>>',current)
    let _pageNo = current === undefined || current === null ? 1 : current;
    if (_currentTab === "self") {
      dispatch(actions.fetchAllLeads(id, leadInc, _pageNo));
    } else {
      const teamId = stoageGetter("teamMemberId");
      // console.warn("teamId______===========>>>", teamId);
      dispatch(
        actions.fetchAllLeads(
          teamId === null || teamId === undefined ? id : teamId,
          leadInc,
          _pageNo
        )
      );
    }
  };
  const getBrokerData = async (leadInc) => {
    setLeadTabFilter(leadInc);
    const { id } = stoageGetter("user");
    // console.log('************************ current ___*(*(*((**)))) *********************===========>>>',current)
    let _pageNo = current === undefined || current === null ? 1 : current;
    if (_currentTab === "self") {
      dispatch(actions.fetchAllLeads(id, leadInc, _pageNo));
    } else {
      const teamId = stoageGetter("teamMemberId");
      // console.warn("teamId______===========>>>", teamId);
      dispatch(
        actions.fetchAllLeads(
          teamId === null || teamId === undefined ? id : teamId,
          leadInc,
          _pageNo
        )
      );
    }
  };
  const handler = (activeKey) => {
    // console.log("activeKey------------->>>>>>>>", activeKey);
    setactiveTab(activeKey);
    // dispatch(actions.fetchAllLeads(activeTab,current))

    // setactiveKey(key)
    if (activeKey) {
      switch (activeKey) {
        case "all": {
          getDataForOpen("all");
          return history.push("/brokerflow/all_leads");
        }
        case "open": {
          getDataForOpen("open");
          return history.push("/leadMaster/openlead");
        }
        case "converted": {
          getDataForOpen("converted");
          return history.push("/leadMaster/convertedleads");
        }
        case "failed": {
          getDataForOpen("failed");
          return history.push("/leadMaster/pendingproposal");
        }
        case "all_broker": {
          getBrokerData("all");
          return history.push("/brokerflow/all_leads");
        }
        case "fortoday_broker": {
          getBrokerData("fortoday");
          return history.push("/brokerflow/fortoday");
        }
        case "1":
          return history.push("/company-intelligence", {
            leadData: routeLeadData,
            updateFormData: updateFormData,
          });
        case "2":
          return history.push("/leadmasterpage/leadhistory");

        case "calendar":
          return history.push("/calendar");

        case "todo":
          return history.push("/todo");

        default:
          return history.push("/home");
      }
    }
  };

  let tabPane = [];
  if (tabMenu && !_.isEmpty(tabMenu)) {
    tabPane = _.map(tabMenu, (value, id) => {
      return <TabPane key={value.id} tab={value.value}></TabPane>;
    });
    // console.warn("tabPane", tabPane)
  }

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  const handleChangeTab = (currentTab) => {
    // console.log("good bye ",currentTab)
    currentTab === "self" ? setTeamSelf(true) : setTeamSelf(false);
    console.log("good bye currentActiveTab", currentActiveTab);
    _currentTab = currentTab;
    setCurrentActiveTab(currentTab);
    getDataForOpen("all");
    dispatch(actions.updateTabOfDashboard(currentTab));

    // if (currentTab === "team") getDataForOpen();
    currentTab !== currentActiveTab &&
      dispatch(actions.updateAllocateOfOpportunities(false));
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addNewOpportunity = () => {
    resetDataFields();
  };

  const openCreateTodoPop = () => {
    openTodoPopup();
  };

  return (
    <>
      {width > breakpoint ? (
        <div className={"header-img-tabs tabsStyle"} style={{alignItems: header === "Lead" ? 'center' : 'none'}}>
          <div>
            <div>
              <p className="header-title-tab">{header}</p>
            </div>
            <div>
              <Tabs
                tabBarGutter={20}
                centered={false}
                type="card"
                onTabClick={handler}
                size="small"
                activeKey={activeKey}
                className="main-lead-tabs"
                style={{ marginLeft: "40px" }}
              >
                {tabPane}
              </Tabs>
            </div>
          </div>

          { header === "Lead" &&
            <GlobalFilters
              show={show}
              onHide={handleClose}
              handleShow={handleShow}
              setShow={setShow}
              tabFilter={leadTabFilter}
            />
          }
          {/* {(header !== "Lead" && header !== "Notification" ) &&
            activeKey === "1" &&
            storeFormData &&
            storeFormData._id && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  marginBottom: 15,
                }}
              >
                <Button
                  onClick={() => openCreateTodoPop()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 5,
                    backgroundColor: "#00ACC1",
                    border: "transparent",
                    color: "#fff",
                    marginLeft: "40px",
                  }}
                  size="large"
                >
                  <PlusOutlined style={{ fontSize: 16, marginRight: 10 }} /> Add
                  Create To Do
                </Button>
                <Button
                  onClick={() => addNewOpportunity()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 5,
                    backgroundColor: "#00ACC1",
                    border: "transparent",
                    color: "#fff",
                    marginLeft: "10px",
                  }}
                  size="large"
                >
                  <PlusOutlined style={{ sfontSize: 16, marginRight: 10 }} />
                  Add new Opportunity
                </Button>
              </div>
            )} */}
          {/* header === "Lead" */}
          {/* <div >
            {tabPane.key === activeKey ? (
              <div className="round-card-main-Tab">
                {checkAgent() === false && (
                  <>
                    <div className="CardBodySelf" style={{ marginLeft: "-10px",display:'flex',flexDirection:'row' }}>
                      <button
                        style={{ width:95,display:'flex',alignItems:'center',justifyContent:'center' }}
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
                      <button
                        style={{ width: 95,display:'flex',alignItems:'center',justifyContent:'center' }}
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
                    </div>
                  </>
                )}
              
              </div>
            ) : null}
          </div> */}
        </div>
      ) : (
        // </div>

        // FOR MOBILE WEB
        <div
          className="tabsStyle tabsStyleMob"
          style={{
            display: "flex",
            flexDirection: "Column",
            marginTop: 5,
          }}
        >
          <div>
            <Tabs
              tabBarGutter={20}
              centered={false}
              onTabClick={handler}
              size="small"
              activeKey={activeKey}
              style={{
                // backgroundColor: "red",
                boxShadow: "0px 1px 10px 0px #0000003d",
              }}
            >
              {tabPane}
            </Tabs>
          </div>
          {/* {header === "Lead" && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px",
              }}
            >
              {checkAgent() === false && (
                <>
                  <button
                    onClick={() => handleChangeTab("self")}
                    key={"self"}
                    className={
                      currentActiveTab === "self"
                        ? "active_tabs_button"
                        : "tabs_button"
                    }
                  >
                    <img
                      src={
                        currentActiveTab === "self"
                          ? person_black
                          : person_white
                      }
                      className="person"
                      alt="person_png"
                    />{" "}
                    Self
                  </button>
                  <button
                    onClick={() => handleChangeTab("team")}
                    key={"team"}
                    className={
                      currentActiveTab === "team"
                        ? "active_tabs_button"
                        : "tabs_button"
                    }
                  >
                    <img
                      src={
                        currentActiveTab === "team" ? group_white : group_black
                      }
                      className="group"
                      alt="person_png"
                    />{" "}
                    Team
                  </button>
                </>
              )}
              <AllocateModalShow tabSelected={leadTabFilter} />
              <GlobalFilters
                show={show}
                onHide={handleClose}
                handleShow={handleShow}
                setShow={setShow}
                tabFilter={leadTabFilter}
              />
            </div>
          )} */}
        </div>
      )}
    </>
  );
};

export default Tab;
