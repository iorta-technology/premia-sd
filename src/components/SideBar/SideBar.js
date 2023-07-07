import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import moment from "moment";
import "./SideBar.css";
import { IconContext } from "react-icons/lib";
import { BarChartOutlined } from "@ant-design/icons";
import { createBrowserHistory } from "history";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import { checkuserAccess, stoageGetter } from "../../helpers";
import axiosRequest from "../../axios-request/request.methods";
import mySocket from "../../Socket";
import * as actionType from "./../../store/actions/actionTypes";
import { message } from "antd";

// -- Import Image -- //
import sales_logo_img from "../../images/salesDrivelogo.png";
import switch_img from "../../assets/Group75902x.png";
import right_black_img from "../../assets/MaterialUiIcons/chevron_right_black_192x192.png";
import draftr_img from "../../assets/draftr.png";
import rapps_img from "../../assets/rapps.png";
import allrec_img from "../../assets/allrec.png";
import rdone_img from "../../assets/rdone.png";
import failed_img from "../../assets/failed.png";
import needhelp_img from "../../assets/needhelp.png";
import all_clear_img from "../../assets/MaterialUiIcons/notifications_grey_192x192.png";
import NewLead from '../StatusLead/NewLeadCreation'

const Nav = styled.div`
  background: #3b371e;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  column-gap: 20px;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
`;

const NavIcon = styled(Link)`
  font-size: 1.5rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #fff;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
// const history = createBrowserHistory()

// let currentRoute = history.location.pathname.replace('/', '')
// console.log("path name",currentRoute)
// const login_user_data = stoageGetter("user");
// console.warn("LOGIN USER", login_user_data);
// if (login_user_data === null) window.location.replace("/login");

function Modal1({ children, shown, close }) {
  return shown ? (
    <div className="modal-backdrop" onClick={() => close()}>
      <div
        className="modal-content"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  ) : null;
}

const Sidebar = () => {
  const state = useSelector((state) => state);
  // console.log("((((((((((STATEEEEEEE))))))))))",state)
  const login_user_data = state?.login?.user;
  const headerName = useSelector((state) => state?.login?.headerName);
  const userId = useSelector((state) => state.login.userId);
  const history = useHistory();
  // console.warn("_______STOREE_____", state);
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);
  const [modalShown, toggleModal] = useState(false);
  // const [clearBtn, setClearBtn] = useState(true);
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);

  let _storeData = useSelector((state) => state);

  const _accessOpportunities = checkuserAccess("myLeads", _storeData.login); // Opportunities

  const [showOpportunities, setShowOpportunities] = useState(
    _accessOpportunities.props.read === true ? true : false
  );

  const notificationIndicator = (flag) => {
    return {
      type: actionType.NOTIFICATION_STATUS,
      data: flag,
    };
  };

  const clearData = async () => {
    try {
      let data = await axiosRequest.put(`user/readAllNotification/${userId}`);
      console.log("notification", data);
      set_Notify([]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const [_notify, set_Notify] = useState([]);

  const toggleModalBox = () => {
    fetchData();
    toggleModal(!modalShown);
    dispatch(notificationIndicator(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    mySocket.on("notification", (data) => {
      dispatch(notificationIndicator(true));
      // console.log(",data-------- ========= ", data);
    });

    mySocket.on("message", (data) => {
      // console.log("notification received", data);
    });
    // console.log("state__Notification = ", state?.home?.notification);
    // console.log("mySocket =----->>>> ",mySocket);
  }, [mySocket]);

  const fetchData = async () => {
    try {
      let data = await axiosRequest.get(
        `user/getnotification/${userId}?notification_type=alerts&readStatus=0`
      );
      set_Notify(data[0]);
      // console.log("notification", data[0]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const showSidebar = () => setSidebar(!sidebar);

  // const logged_in_user = useSelector((state) => state.login.user_name)
  const logged_in_user =
    login_user_data.firstName + " " + login_user_data.lastName;
  let avatar = logged_in_user?.match(/\b(\w)/g);

  // const agent_id = useSelector((state) => state.login.agent_id)
  const agent_id = login_user_data.agentId;

  const onLogout = () => {
    window.localStorage.clear();
    dispatch(actions.logout());
    history.push("/login");
  };

  const switchChannel = () => {
    history.push("/multichannel");
    setSidebar(false);
  };
  const addBulkLead = () => {
    history.push("/leadmasterpage/LeadBulkUpload");
    setSidebar(false);
  };

  const addSingleLead = () => {
    // history.push("/leadmasterpage/statuslead");
    // setSidebar(false);

    if(showOpportunities){
      // dispatch(actions.fetchLeadUpdateBody({}))
      // dispatch(actions.fetchLeadDetailsSuccess({}))
      
      // // dispatch(actions.storeLead(leadUpdateFormdata));
      // history.push("/leadmasterpage/statuslead");
      setShowNewLeadModal(true)
      setSidebar(false);
    }else{
      message.info('This feature is currently not accessible');
    }
  };

  const openLeadList = () => {
    history.push("/leadMaster/all_leads");
    setSidebar(false);
  };

  const defaultChannel = () => {
    history.push("/defaultchannel");
    setSidebar(false);
  };

  const closeNotificPop = () => {
    history.push("/notifypage");
    setSidebar(false);
  };

  const routeBack = () => {
    // console.warn("history_____routeBack", history);
    history.goBack();
  };

  return (
    <>
      <NewLead showNewLeadModal={showNewLeadModal} setShowNewLeadModal={setShowNewLeadModal} />
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          {/* <div style={{ display: "flex", flex: 1 }}>
            <NavIcon to="#">
              {headerName !== "Home" && (
                <FaIcons.FaArrowLeft onClick={() => routeBack()} />
              )}
              <p
                style={{
                  marginBottom: 0,
                  marginLeft: 10,
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                {headerName}
              </p>
            </NavIcon>
          </div> */}
          <div>
            <img
              onClick={() => {
                history.push("/home");
              }}
              src={sales_logo_img}
              style={{
                width: "130px",
                marginRight: "auto",
                marginLeft: "auto",
                cursor: "pointer",
              }}
            />
          </div>
          {/* <h3 style={{color:'#fff',textTransform:'capitalize'}}>current route</h3> */}

          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <NavIcon style={{ marginRight: 15, position: "relative" }} to="#">
              <FaIcons.FaBell onClick={() => toggleModalBox()} />
              {/* <div className="dot"></div> */}
              {_notify?.length &&
              _notify?.length > 0 &&
              // clearBtn &&
              state?.home?.notification ? (
                <div className="dot"></div>
              ) : null}
            </NavIcon>
            <div
              style={{
                height: 40,
                width: 0.5,
                backgroundColor: "#ccc",
                marginTop: 19,
              }}
            ></div>
            <NavIcon style={{ marginLeft: 15 }} onClick={showSidebar} to="#">
              <FaIcons.FaUserCircle style={{ height: 30, width: 30 }} />
              <div style={{ marginLeft: 10 }}>
                <p style={{ marginBottom: 0, color: "#fff", fontSize: 14 }}>
                  {logged_in_user}
                </p>
                <p
                  style={{
                    marginBottom: 0,
                    marginTop: -4,
                    color: "#fff",
                    fontSize: 10,
                  }}
                >
                  Agent ID: {agent_id}
                </p>
              </div>
            </NavIcon>
          </div>
        </Nav>

        <Modal1 shown={sidebar} close={() => setSidebar(false)}>
          <div className="indicationArrowProfile"></div>
          <div className="sideMenu" >
            <div className="menuHeader">
              <div className="profileLogo">
                <p
                  style={{
                    textTransform: "uppercase",
                    color: "#fff",
                    fontSize: 22,
                  }}
                >
                  {avatar}
                </p>
              </div>
              <div className="profileData">
                <p style={{ textTransform: "capitalize", fontWeight: 600 }}>
                  {logged_in_user}
                </p>
                <p>
                  <b>{login_user_data?.designation?.designatioName}</b> ({" "}
                  <b>ID</b> {agent_id})
                </p>
                <p>
                  <FaIcons.FaMapMarker style={{ color: "#787878" }} /> |{" "}
                  {login_user_data.city} | {login_user_data.state}
                </p>
                <p>
                  <b>Channel : </b>
                  {login_user_data.channelCode.channelName}
                </p>
              </div>
            </div>
            <div className="menuBody">
              <div className="logoutContainer">
                <button onClick={onLogout}>Logout</button>
              </div>
              <div className="menuList">
                <ul>
                  <li
                    onClick={() => {
                      switchChannel();
                    }}
                  >
                    <div>
                      <img src={switch_img} /> &nbsp;<span>Switch Channel</span>
                    </div>{" "}
                    <img src={right_black_img} />
                  </li>
                  {/* <li
                    onClick={() => {
                      defaultChannel();
                    }}
                  >
                    <div>
                      <img src={switch_img} /> &nbsp;
                      <span>Channel Default</span>
                    </div>{" "}
                    <img src={right_black_img} />
                  </li> */}
                  {/* <li><div><img src='https://tataadv2dev.iorta.in/assets/Group75902x.png'/> &nbsp;<span>Ticketing Tool</span></div> <img src={right_black_img}/></li> */}
                  {/* <li><div><img src='https://tataadv2dev.iorta.in/assets/Group75912x.png'/> &nbsp;<span>Download FAQs</span></div> </li> */}
                </ul>
                {/* <h3>My Customers</h3>
              <ul>
                <li onClick={() => { history.push('/renewalMaster/allRenewals') }}><div><img src='https://tataadv2dev.iorta.in/assets/upr.png'/> &nbsp;<span>Upcomming renewals</span></div> <img src={right_black_img}/></li>
                <li><div><img src='https://tataadv2dev.iorta.in/assets/lp.png'/> &nbsp;<span>Lapsed Policy</span></div> <img src={right_black_img}/></li>
              </ul> */}
                {/* <h3>My Partners</h3>
              <ul>
                <li><div><img src={rapps_img}/> &nbsp;<span>All Partners</span></div> <img src={right_black_img}/></li>
              </ul> */}
                {showOpportunities && (
                  <>
                    <p>Leads</p>
                    <ul>
                      <li
                        onClick={() => {
                          addSingleLead();
                        }}
                      >
                        <div>
                          <img src={draftr_img} /> &nbsp;
                          <span>Add New Lead</span>
                        </div>{" "}
                        <img src={right_black_img} />
                      </li>
                      {/* <li
                        onClick={() => {
                          addBulkLead();
                        }}
                      >
                        <div>
                          <img src={rapps_img} /> &nbsp;
                          <span>Add Bulk Lead</span>
                        </div>{" "}
                        <img src={right_black_img} />
                      </li> */}
                      <li
                        onClick={() => {
                          openLeadList();
                        }}
                      >
                        <div>
                          <img src={draftr_img} /> &nbsp;
                          <span>Show Leads</span>
                        </div>{" "}
                        <img src={right_black_img} />
                      </li>
                    </ul>
                  </>
                )}

                {/* <p>Need Help?</p>
                <ul>
                  <li>
                    <div>
                      <img src={needhelp_img} /> &nbsp;
                      <span>Help &amp; FAQs</span>
                    </div>{" "}
                    <img src={right_black_img} />
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </Modal1>

        <Modal1
          shown={modalShown}
          close={() => {
            toggleModal(false);
          }}
        >
          <div className="indicationArrowNotif"></div>
          <div className="sideMenu1">
            <div className="activity-block1" style={{ height: "350px" }}>
              <div className="notificationHead">
                <p>Notification</p>
                {
                  // clearBtn &&
                  _notify?.length && _notify?.length > 0 ? (
                    <button onClick={clearData}>Clear All</button>
                  ) : (
                    ""
                  )
                }
              </div>
              <div className="menuBody1">
                {
                  // clearBtn &&
                  _notify?.length && _notify?.length > 0 ? (
                    _notify.map((desc_data, index) => {
                      return (
                        <div key={index}>
                          <div className="notification_data">
                            <div className="list_data">
                              <h4>{desc_data.title}</h4>
                              <p>{desc_data.body}</p>
                            </div>
                            <div className="date">
                              <p>
                                {moment(desc_data.created_date).format(
                                  "DD-MM-YYYY"
                                )}
                              </p>
                              <p style={{ marginTop: "-10px" }}>
                                {moment(desc_data.created_date).format("LT")}
                              </p>
                            </div>
                          </div>
                          <div className="notification_status">
                            {desc_data.priority ? (
                              <button
                                style={{
                                  backgroundColor:
                                    desc_data.priority === "high"
                                      ? "rgb(253 84 84)"
                                      : desc_data.priority === "medium"
                                      ? "#fb8c00"
                                      : desc_data.priority === "low"
                                      ? "#4caf50"
                                      : "",
                                }}
                                onClick={() => {
                                  history.push("/calendar");
                                }}
                              >
                                {desc_data.priority}
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                          <hr className="hr-line" />
                        </div>
                      );
                    })
                  ) : (
                    <div className="logoutContainer1">
                      <img src={all_clear_img} />
                      <p>All Catch Up!</p>
                    </div>
                  )
                }
              </div>
            </div>
            <div className="notification_footer view_button">
              <button onClick={() => closeNotificPop()}>View All</button>
            </div>
          </div>
        </Modal1>

        {/* <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#' style={{padding:'18px'}}>
              <AiIcons.AiOutlineClose onClick={showSidebar}  color="#000"/>
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav> */}
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
