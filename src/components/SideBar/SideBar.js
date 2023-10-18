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
import { BiBell } from "react-icons/fa";

// -- Import Image -- //
// import sales_logo_img from "../../images/salesDrivelogo.png";
import philplanLogo from "../../images/philplanLogo.png";
import switch_img from "../../assets/Group75902x.png";
import right_black_img from "../../assets/MaterialUiIcons/chevron_right_black_192x192.png";
import draftr_img from "../../assets/draftr.png";
import rapps_img from "../../assets/rapps.png";
import allrec_img from "../../assets/allrec.png";
import rdone_img from "../../assets/rdone.png";
import failed_img from "../../assets/failed.png";
import needhelp_img from "../../assets/needhelp.png";
import all_clear_img from "../../assets/MaterialUiIcons/notifications_grey_192x192.png";
import NewLead from "../StatusLead/NewLeadCreation";
import PhipPlanSideBar from "./PhipPlanSideBar";

const Nav = styled.div`
  background: #fff;
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
  color: #000;
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
  const login_user_data = state?.login;
  console.log("line 105", login_user_data);
  const custCode = useSelector((state) => state?.login?.loginDetails?.custCode);
  const userId = useSelector((state) => state.login.userId);
  const history = useHistory();
  // console.warn("_______STOREE_____", state);
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);
  const [modalShown, toggleModal] = useState(false);
  // const [clearBtn, setClearBtn] = useState(true);
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);

  let _storeData = useSelector((state) => state);
  console.log("state", _storeData);
  // const _accessOpportunities = checkuserAccess("myLeads", _storeData?.login?.loginDetails); // Opportunities
  // console.log('line 118', _accessOpportunities )
  // const [showOpportunities, setShowOpportunities] = useState(
  //   _accessOpportunities.props.read === true ? true : false
  // );

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
    // fetchData();
    toggleModal(!modalShown);
    dispatch(notificationIndicator(false));
  };

  useEffect(() => {
    // fetchData();
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

  // const fetchData = async () => {
  //   try {
  //     let data = await axiosRequest.get(
  //       `user/getnotification/${userId}?notification_type=alerts&readStatus=0`
  //     );
  //     set_Notify(data[0]);
  //     // console.log("notification", data[0]);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const showSidebar = () => setSidebar(!sidebar);

  const logged_in_user = useSelector(
    (state) => state.login.loginDetails?.userName
  );

  // const agent_id = useSelector((state) => state.login.agent_id)
  console.log(login_user_data);

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
    // if (showOpportunities) {
    //   // dispatch(actions.fetchLeadUpdateBody({}))
    //   // dispatch(actions.fetchLeadDetailsSuccess({}))
    //   // // dispatch(actions.storeLead(leadUpdateFormdata));
    //   // history.push("/leadmasterpage/statuslead");
    //   setShowNewLeadModal(true);
    //   setSidebar(false);
    // } else {
    //   message.info("This feature is currently not accessible");
    // }
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

  const [open, setOpen] = useState(false);
  // const [placement, setPlacement] = useState("left");

  const showDrawer = () => {
    setOpen(!open);
  };

  // const onClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
      <PhipPlanSideBar open={open} setOpen={setOpen} />
      <NewLead
        showNewLeadModal={showNewLeadModal}
        setShowNewLeadModal={setShowNewLeadModal}
      />
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
          <div className="d-inline-flex align-items-center gap-2 ">
            <FaIcons.FaBars onClick={showDrawer} className="header_hamburger" />
            <img
              className="brand_logo"
              onClick={() => {
                history.push("/home");
              }}
              src={philplanLogo}
              // style={{
              //   width: "130px",
              //   marginRight: "auto",
              //   marginLeft: "auto",
              //   cursor: "pointer",
              // }}
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
            <NavIcon
              className="me-md-3"
              style={{ position: "relative" }}
              to="#"
            >
              <FaIcons.FaRegBell
                className="me-3"
                // onClick={() => toggleModalBox()}
                style={{ color: "#000" }}
              />
              {/* <div className="dot"></div> */}
              {_notify?.length &&
              _notify?.length > 0 &&
              // clearBtn &&
              state?.home?.notification ? (
                <div className="dot"></div>
              ) : null}
            </NavIcon>
            <div
              className="nav-divider-div d-md-block d-none"
              style={{
                height: 40,
                width: 0.5,
                backgroundColor: "#ccc",
                marginTop: 19,
              }}
            ></div>
            <NavIcon className="ms-md-3" onClick={showSidebar} to="#">
              <FaIcons.FaUserCircle
                style={{ height: 30, width: 30, color: "#000" }}
              />
              <div className="d-none d-md-block" style={{ marginLeft: 10 }}>
                <p style={{ marginBottom: 0, color: "#000", fontSize: 14 }}>
                  {logged_in_user}
                </p>
                <p
                  style={{
                    marginBottom: 0,
                    marginTop: -4,
                    color: "#000",
                    fontSize: 10,
                  }}
                >
                  Customer ID: {custCode}
                </p>
              </div>
            </NavIcon>
          </div>
        </Nav>

        {/* <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#" style={{ padding: "18px" }}>
              <AiIcons.AiOutlineClose onClick={showSidebar} color="#000" />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav> */}
      </IconContext.Provider>
      <div className="footer_powered_by fixed-bottom">
        Powered by <strong>Salesdrive</strong>
        <sup>TM</sup>
      </div>
    </>
  );
};

export default Sidebar;
