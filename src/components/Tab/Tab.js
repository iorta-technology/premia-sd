import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Radio,
  Tabs,
  Modal,
  Form,
  Select,
  Input,
  message,
  Dropdown,
  Space,
  Typography,
  Menu,
} from "antd";
import { Option } from "antd/lib/mentions";
import "./Tab.css";
import _ from "lodash";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/leads";
import * as FaIcons from "react-icons/fa";
import { checkAgent, stoageGetter } from "../../helpers";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import LeadCard from "../LeadCards/LeadCard";
import GlobalFilters from "./Filter";
import BrokerFilters from "./Filter_Broker";
import AllocateModalShow from "./Allocate";
import person_black from "./../Activitity Tracker/icons/person_black.png";
import person_white from "./../Activitity Tracker/icons/person_white.png";
import group_white from "./../Activitity Tracker/icons/group_white.png";
import group_black from "./../Activitity Tracker/icons/group_black.png";
import { useLocation } from "react-router-dom";
import {
  PlusOutlined,
  FilePdfOutlined,
  DownOutlined,
  SmileOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import axiosRequest from "../../axios-request/request.methods";

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
import LeadCards from "../LeadCards_broker_flow/LeadCards";
import LeadCards_Company from "../LeadCards/LeadCards";

const { TabPane } = Tabs;

const Tab = ({
  id,
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
  const [brokerTabFilter, setBrokerTabFilter] = useState("all");
  const [TeamSelf, setTeamSelf] = useState(true);
  const [showBrokerFilt, setShowBrokerFilt] = useState(false);
  const [leadcards, setLeadcards] = useState(false);
  let storeFormData = useSelector((state) => state?.newLead?.formData);
  const { pol_id, sys_id } = useParams();
  let history = useHistory();
  let _currentTab = "self";
  // const [activeKey, setActiveKey] = useState("self")
  const [currentActiveTab, setCurrentActiveTab] = useState("self");

  useEffect(() => {
    console.log(
      "************************ header ___*(*(*((**)))) *********************===========>>>",
      header
    );
    // console.log('************************ leadTabFilter leadTabFilter *********************===========>>>',leadTabFilter)
    // getDataForOpen(leadTabFilter);
    if (header === "Lead") getDataForOpen(leadTabFilter);
    if (header === "Broker Listing") getBrokerData(brokerTabFilter);
  }, [current]);

  // ************************Api *********************
  const getBrokerData = async (leadInc) => {
    setBrokerTabFilter(leadInc);
    const { id } = stoageGetter("user");
    // console.log('************************ current ___*(*(*((**)))) *********************===========>>>',current)
    let _pageNo = current === undefined || current === null ? 1 : current;
    if (_currentTab === "self") {
      dispatch(actions.fetchAllLeads_broker(id, leadInc, _pageNo));
    } else {
      const teamId = stoageGetter("teamMemberId");
      // console.warn("teamId______===========>>>", teamId);
      dispatch(
        actions.fetchAllLeads_broker(!teamId ? id : teamId, leadInc, _pageNo)
      );
    }
  };
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

  const handler = (activeKey) => {
    // console.log("activeKey------------->>>>>>>>", activeKey);
    setactiveTab(activeKey);
    // dispatch(actions.fetchAllLeads(activeTab,current))

    // setactiveKey(key)
    if (activeKey) {
      switch (activeKey) {
        case "all": {
          getDataForOpen("all");
          return history.push("/leadMaster/all_leads");
        }
        case "fortoday": {
          getDataForOpen("fortoday");
          return history.push("/leadMaster/fortoday");
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
          getBrokerData("today");
          return history.push("/brokerflow/today");
        }

        // case "1":
        //  return history.push("plan-cards");
        case "1":
          return history.push("/plan-details", {
            leadData: routeLeadData,
            updateFormData: updateFormData,
          });
        case "2":
          return history.push("agent-details");

        case "3":
          return history.push("maturity-benefit");
        case "4":
          return history.push("plan-termination");
        case "5":
          return history.push("enhance-availment");
        case "6":
          return history.push("insurance-claim");
        case "7":
          return history.push("cash-loan");
        case "broker_intel":
          return history.push("/company-intelligence_broker", {
            leadData: routeLeadData,
            updateFormData: updateFormData,
          });
        case "activity_log":
          return history.push("/broker-activity");
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
  const handlePdfClick_company = async () => {
    message.warn("Your Download is in progress");
    let result = await axiosRequest.get(
      `admin/company/company-intelligence-pdf/${id}`,
      {
        secure: true,
      }
    );
    window.open(result[0].link);
  };
  const handlePdfClick_Broker = async () => {
    message.warn("Your Download is in progress");
    let result = await axiosRequest.get(`user/get-broker-pdf/${id}`, {
      secure: true,
    });
    window.open(result[0].link);
  };
  // DROPDOWN tabs header

  const planDetailsListing = useSelector(
    (state) => state?.login?.planListing.P_LOP_DTLS
  );
  const [selectedPolicy, setSelectedPolicy] = useState({
    key: "",
    dropdown_label: "",
    policy_id: "",
  });
  useEffect(() => {
    const selectData = planDetailsListing.find((el) => el.POL_NO === pol_id);
    if (selectData) {
      console.log("selecte================", selectData);
      setSelectedPolicy({
        key: selectData.key,
        dropdown_label: selectData.PROD_PORTAL_DESC.toLowerCase(),
        policy_id: selectData.POL_NO,
      });
    }
  }, [planDetailsListing, pol_id]);

  const handleMenuItemClick = (item) => {
    console.log("item-----------", item);
    setSelectedPolicy({
      key: item.key,
      dropdown_label: item.PROD_PORTAL_DESC.toLowerCase(),
      policy_id: item.POL_NO,
    });
  };

  return (
    <>
      {width > breakpoint ? (
        <div
          className={"header-img-tabs tabsStyle"}
          style={{ alignItems: header === "Lead" ? "center" : "none" }}
        >
          <div className="header_tabs">
            {/* <p className="header-title-tab">{header}</p> */}

            <div style={{ width: 230 }}>
              <Dropdown
                overlay={
                  <Menu
                    style={{ width: "230px" }}
                    // selectedKeys={selectedPolicy}
                    defaultSelectedKeys={selectedPolicy}
                    value={selectedPolicy}
                  >
                    {planDetailsListing.slice(0, 3).map((item, index) => (
                      <Menu.Item
                        key={item.key}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          padding: "10px",
                          borderBottom: "1px solid rgba(67, 76, 85, 0.16)",
                          background: "none",
                        }}
                        onClick={() => handleMenuItemClick(item)}
                      >
                        <div className="dropdown_inner_item">
                          <div>
                            <div className="dropdown_option_head">
                              {item.PROD_PORTAL_DESC.toLowerCase()}
                            </div>
                            <div className="dropdown_option_des">
                              {item.POL_NO}
                            </div>
                          </div>
                          {selectedPolicy.policy_id === item.POL_NO && (
                            <FaIcons.FaCheckCircle className="check-icon" />
                          )}
                        </div>
                      </Menu.Item>
                    ))}
                    <li className="dropsown_view_all">
                      <a href="/plan-cards">view all</a>
                    </li>
                  </Menu>
                }
                trigger={["click"]}
              >
                <Typography.Link>
                  <Space className="policy_dropdown" style={{ width: 230 }}>
                    <div>
                      <div className="dropdown_header_item">
                        {selectedPolicy.dropdown_label}
                      </div>
                      <p className="dropdown_item_des mb-0 pb-0">
                        {selectedPolicy.policy_id}
                      </p>
                    </div>
                    <DownOutlined />
                  </Space>
                </Typography.Link>
              </Dropdown>
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
              >
                {tabPane}
              </Tabs>
            </div>
          </div>
          {header === "Lead" && (
            <GlobalFilters
              show={show}
              onHide={handleClose}
              handleShow={handleShow}
              setShow={setShow}
              tabFilter={leadTabFilter}
            />
          )}
          {/* {header=='Broker Listing' && <>
          <LeadCards leadTabFilter={leadTabFilter}/>
          </>}
          {
            header=='Lead' && <>
            <LeadCards_Company leadTabFilter={leadTabFilter}/>
            </>
          } */}
          {header === "Broker Listing" && (
            <BrokerFilters
              style={{ marginTop: "100px" }}
              showBrokerFilt={showBrokerFilt}
              onHide={() => setShowBrokerFilt(false)}
              handleShow={() => setShowBrokerFilt(true)}
              setShowBrokerFilt={setShowBrokerFilt}
              tabFilter={brokerTabFilter}
            />
          )}
          {/* <AllocateModalShow tabSelected={leadTabFilter} /> */}
          {/* {header !== "Lead" &&
            header !== "Broker Listing" &&
            activeKey == "1" && (
              <div className="download_btn" onClick={handlePdfClick_company}>
                <FilePdfOutlined
                  size={40}
                  style={{ color: "#00ACC1", marginRight: "3px" }}
                />
                <span style={{ color: "#00ACC1" }}>Download PDF</span>
              </div>
            )}
          {header !== "Lead" &&
            header !== "Broker Listing" &&
            activeKey == "broker_intel" && (
              <div className="download_btn" onClick={handlePdfClick_Broker}>
                <FilePdfOutlined
                  size={40}
                  style={{ color: "#00ACC1", marginRight: "3px" }}
                />
                <span style={{ color: "#00ACC1" }}>Download PDF</span>
              </div>
            )} */}

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
            // marginTop: 5,
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
