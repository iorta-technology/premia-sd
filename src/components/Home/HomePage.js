import React, { Fragment, useEffect, useState } from "react";
import "./HomePage.css";
import "../Scheduler/RightSide-Todo/Todo&Archive-Css/TodoCards.css";
import { Image, Button, Row, Col, Card, Select, Avatar } from "antd";
// import { Bar } from '@ant-design/charts';
import "antd/dist/antd.css";
import * as actions from "../../store/actions/index";
import * as leadActions from "../../store/actions/leads";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import moment from "moment";
import _ from "lodash";
import { Link, useHistory } from "react-router-dom";
import FloatButton from "../FloatButton/FloatButton";
import { Column } from "@ant-design/charts";
import axiosRequest from "../../axios-request/request.methods";
import { checkuserAccess, stoageGetter } from "../../helpers";
import {
  ConsoleSqlOutlined,
  FormOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import axios from 'axios'

// import image -----
import business_img from "../../assets/DashboardIconNew/Group3366.png";
import activity_img from "../../assets/DashboardIconNew/Group3371.png";
import contact_opportunity_img from "../../assets/DashboardIconNew/Group3367.png";
import opportunities_img from "../../assets/DashboardIconNew/Group3373.png";
import contact_opportunity_cake from "../../assets/DashboardNewIcon/Cake.png";
import contact_opportunity_alarm from "../../assets/DashboardNewIcon/Alarm.png";
import todo_img from "../../assets/DashboardIconNew/Group3375.png";
import sales_guide_img from "../../assets/resourceHeader.png";
import resourceVideo from "../../assets/resourceVideo.png";
import resourcePdf from "../../assets/resourcePdf.png";
import resourceArticles from "../../assets/resourceArticles.png";
import resourceInfographic from "../../assets/resourceInfographic.png";
// Group_427318679.png
import event_img from "../../assets/DashboardIconNew/Group127.png";
import application_img from "../../assets/DashboardIconNew/Group3373.png";
import action_data_img from "../../assets/Actionnodata.png";
import mapped_img from "../../assets/DashboardIconNew/Group3381.png";
import reward_img from "../../assets/DashboardIconNew/Group3379.png";
import contest_img from "../../assets/DashboardIconNew/Group3151.png";
import club_img from "../../assets/DashboardIconNew/Group3157.png";
import birthday_img from "../../assets/DashboardIconNew/Group3376.png";
import left_arrow from "../../assets/Subtraction10.png";
import right_arrow from "../../assets/Subtraction12.png";
import TodoClock from "../../assets/todoclock.png";
import hamburger from "../../assets/hamburger8@2x.png";
import checkboxoutline from "../../assets/checkboxoutline.png";
import truecheckbox from "../../assets/CalenderIcons/truecheckbox.png";
import product_icon from "../../assets/resorceico/Producticon.png";
import resource_icon from "../../assets/resorceico/resourcecenter.png";
import newLeadCreation from "../StatusLead/NewLeadCreation";

// import { PowerBIEmbed } from 'powerbi-client-react';
// import { models } from "powerbi-client";

// let CompanyListingResponse = 0;
// let renewal_Last_30 = 0;
// let count10 = 0;
// let count25 = 0;
// let count40 = 0;
// let kdm_name = 0;
// let birthdate = 0;

const HomePage = () => {
  const [activitydata, setActivityData] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const login_user_data = stoageGetter("user");

  if (login_user_data === null) history.push("/login");

  const agent_id = login_user_data.agentId;
  const logged_in_user =
    login_user_data.firstName + " " + login_user_data.lastName;
  const id = login_user_data.id;
  const userId = login_user_data.id;
  const channelCode = login_user_data.channelCode;
  let _storeData = useSelector((state) => state);
  console.log("_storeData--------------------->", _storeData);

  const _accessActivityTracker = checkuserAccess("myEvents", _storeData.login); //Activity Tracker
  const _accessOpportunities = checkuserAccess("myLeads", _storeData.login); // Opportunities
  const _accessTodo = checkuserAccess("todoTask", _storeData.login); // TODO
  const _accessSalesGuide = checkuserAccess("sales_guide", _storeData.login); // Sales Guide
  // console.warn('((((((((_storeData))))))))',_storeData)

  const [width, setWidth] = useState(window.innerWidth);
  const [goal, setGoal] = useState({});
  const [getTodoDataArray, setGetTodoDataArray] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const [showData, setShowData] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [CompanyListingResponse, setCompanyListingResponse] = useState(0);
  const [renewal_Last_30, setRenewal_Last_30] = useState(0);
  const [count10, setCount10] = useState(0);
  const [count25, setCount25] = useState(0);
  const [count40, setCount40] = useState(0);
  const [kdm_name, setKdm_name] = useState([]);
  const [birthdate, setBirthdate] = useState([]);
  const [prodCountData, setProdCountData] = useState({});
  const [ContactOpportunity, setContactOpportunity] = useState([]);

  const [timeList, setTimeList] = useState([
    {
      dispValue: "8:00 AM",
      value: "28800000",
    },
    {
      dispValue: "8:30 AM",
      value: "30600000",
    },
    {
      dispValue: "9:00 AM",
      value: "32400000",
    },
    {
      dispValue: "9:30 AM",
      value: "34200000",
    },
    {
      dispValue: "10:00 AM",
      value: "36000000",
    },
    {
      dispValue: "10:30 AM",
      value: "37800000",
    },
    {
      dispValue: "11:00 AM",
      value: "39600000",
    },
    {
      dispValue: "11:30 AM",
      value: "41400000",
    },
    {
      dispValue: "12:00 PM",
      value: "43200000",
    },
    {
      dispValue: "12:30 PM",
      value: "45000000",
    },
    {
      dispValue: "1:00 PM",
      value: "46800000",
    },
    {
      dispValue: "1:30 PM",
      value: "48600000",
    },
    {
      dispValue: "2:00 PM",
      value: "50400000",
    },
    {
      dispValue: "2:30 PM",
      value: "52200000",
    },
    {
      dispValue: "3:00 PM",
      value: "54000000",
    },
    {
      dispValue: "3:30 PM",
      value: "55800000",
    },
    {
      dispValue: "4:00 PM",
      value: "57600000",
    },
    {
      dispValue: "4:30 PM",
      value: "59400000",
    },
    {
      dispValue: "5:00 PM",
      value: "61200000",
    },
    {
      dispValue: "5:30 PM",
      value: "63000000",
    },
    {
      dispValue: "6:00 PM",
      value: "64800000",
    },
    {
      dispValue: "6:30 PM",
      value: "66600000",
    },
    {
      dispValue: "7:00 PM",
      value: "68400000",
    },
    {
      dispValue: "7:30 PM",
      value: "70200000",
    },
    {
      dispValue: "8:00 PM",
      value: "72000000",
    },
    {
      dispValue: "8:30 PM",
      value: "73800000",
    },
    {
      dispValue: "9:00 PM",
      value: "75600000",
    },
    {
      dispValue: "9:30 PM",
      value: "77400000",
    },
  ]);

  const [opportunities, setOpportunities] = useState([]);
  const [leadCountPeriod, setLeadCountPeriod] = useState("today");

  const [showOverlay, setShowOverlay] = useState(false);

  // Access Management
  const [showActivityTracker, setShowActivityTracker] = useState(
    _accessActivityTracker.props.read === true ? true : false
  );
  const [showOpportunities, setShowOpportunities] = useState(
    _accessOpportunities.props.read === true ? true : false
  );
  const [showTodo, setShowTodo] = useState(
    _accessTodo.props.read === true ? true : false
  );

  const [showSalesGuide, setShowSalesGuide] = useState(
    _accessSalesGuide.props.read === true ? true : false
  );

  const leadPeriodArr = [
    { label: "Today", value: "today" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
  ];

  useEffect(() => {
    if (id) dispatch(actions.activities(id, agent_id));
    // if (id) dispatch(actions.todoGetData(id));
    dispatch(actions.getUserTreeAPI(userId));
    dispatch(actions.headerName("Home"));
    // dispatch(actions.getBusinessCardAPI(userId,channelCode));

    dispatch(leadActions.updateTabOfDashboard("self"));
    // userId && dispatch(actions.fetchUserDetails(userId))
    channelCode && dispatch(actions.fetchHierarchy(userId, channelCode));
    // if (agent_id)
    dispatch(actions.home(userId, "today"));
    getTodoData(0);
    getOpportunities();
    getContactOpportunity();
    getCompanyListing();
    getProducerCount();

  }, []);

  let getProducerCount = async () => {
    try {
      let res = await axiosRequest.get(`user/getproducercount/${id}`, { secure: true, });
      // console.log('getproducercount------------>>>',res)
      // if (res.length > 0) {
      // const [prodCountData, setProdCountData] = useState({});
      setProdCountData(res)
      // }
    } catch (error) {
      console.log(error);
    }
  };

  let getCompanyListing = async () => {
    try {
      let res = await axiosRequest.get(`user/getrenewal/${id}`, { secure: true, });
      // console.log('getrenewal------------>>>',res)
      if (res.length > 0) {

        setCompanyListingResponse(res[0]["Renewals Next 30 days"])
        setRenewal_Last_30(res[0]["Renewals Last 30 days"])
        setCount10(res[0]["count10%"])
        setCount25(res[0]["count25%"])
        setCount40(res[0]["count40%"])
      } else {
        setCompanyListingResponse(0)
        setRenewal_Last_30(0)
        setCount10(0)
        setCount25(0)
        setCount40(0)
      }
    } catch (error) {
      console.log(error);
    }
  };

  let getContactOpportunity = async () => {
    // const count_10 = "count10%";
    try {
      let res = await axiosRequest.get(`user/company/contactOpportunity?userId=${userId}`, { secure: true, });
      console.log('birthday------------>>>', res)
      if (res.length > 0) {
        setContactOpportunity(res);
      } else {
        setContactOpportunity([]);
      }
      console.log(ContactOpportunity);
    } catch (error) {
      console.log(error);
    }
  };

  const home_data = useSelector((state) => state.home.home_obj);
  let activities_data = useSelector((state) => state.activities.activities_obj);

  function add3Dots(string, limit) {
    var dots = "...";
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
    return string;
  }

  let getOpportunities = async () => {
    try {
      let res = await axiosRequest.get(
        `user/leadFutureOverviewCount?fetchPastDaysCount=true&team=enable`,
        { secure: true }
      );
      if (res) {
        for (const key in res) {
          opportunities.push({
            value: res[key].ForToday,
            name: "For Today",
            month: moment(key).format("ddd"),
          });
          opportunities.push({
            value: res[key].Open,
            name: "New",
            month: moment(key).format("ddd"),
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  let getTodoData = async (skip) => {
    try {
      const { id } = stoageGetter("user");
      let arrData = [];
      let _resp = await axiosRequest.get(
        `user/fetch_todo_list?user_id=${id}&filter=all&skip=${skip}`,
        { secure: true }
      );
      let respData = _resp[0];

      for (let _data of respData) {
        let _icon = "";
        // let _remark = ''
        // let _enableRemark = null
        // let _disableSubmit = null
        let _textOverline = {};
        if (_data.taskOwner._id !== id) {
          _textOverline =
            _data?.owernersCollectionDetails[0]?.taskDone === false
              ? { textDecorationLine: "", opacity: "0" }
              : { textDecorationLine: "line-through", opacity: "0" };
          _icon =
            _data?.owernersCollectionDetails[0]?.taskDone === false
              ? checkboxoutline
              : truecheckbox;
        } else {
          _textOverline =
            _data?.taskDone === false
              ? { textDecorationLine: "", opacity: "0" }
              : { textDecorationLine: "line-through", opacity: "0" };
          _icon = _data?.taskDone === false ? checkboxoutline : truecheckbox;
        }

        // _data.owernersCollectionDetails.forEach(event => {
        //     if(event.remarkText !== ''){
        //         _enableRemark = false
        //         // _disableSubmit = true
        //         event.remarkData = event.remarkText
        //         event.disableSubmit = true
        //     }else{
        //         _enableRemark = true
        //         // _disableSubmit = false
        //         event.remarkData = event.remarkText
        //         event.disableSubmit = false
        //     }
        // })

        let objstrct = {
          content: _data?.description,
          removeBtn: _data?.taskDone,
          icon: _icon,
          createddate: _data?.createdDate,
          dateofreminder: moment(_data?.dateOfReminder).format("L"),
          timeofreminder: parseInt(_data?.timeOfReminder),
          todoid: _data?._id,
          stringtimeofreminder: _data?._stringVersionTimeOfReminder,
          ownername:
            _data?.taskOwner?.first_name + " " + _data?.taskOwner?.last_name,
          status: setTodoStatus(_data?.dateOfReminder, parseInt(_data?.timeOfReminder)),
          searchdata: _data?.owernersCollectionDetails,
          taskOwner_id: _data?.taskOwner?._id,
          taskPriority: _data?.taskPriority,
          priorityIndicatorColor: _data?.priorityIndicatorColor,
          showMemberRemark: false,
          showMemText: "Show More",
          sooncolor: "#E46A25",
          overduecolor: "#F44336",
          showarchiedpopup: false,
          textOverLine: _textOverline,
          wholeData: _data,
        };
        arrData.push(objstrct);
      }
      // console.log('arrData------->>>',arrData)
      setGetTodoDataArray(arrData);
      setShowData(true);
    } catch (err) { }
  };

  let setTodoStatus = (reminderDate, reminderTime) => {
    try {
      let reminderDay = reminderDate + reminderTime;
      let current_date = Date.now();

      let soon_time_ = reminderDay - 60000 * 60 * 24;
      let start_time = new Date(current_date).setHours(0, 0, 0, 0);
      let end_time = new Date(current_date).setHours(23, 59, 59, 999);

      if (current_date > reminderDay) {
        return "Overdue";
      } else if (start_time < soon_time_ && soon_time_ < end_time) {
        return "Soon";
      } else {
        return "";
      }
    } catch (err) {
      console.log(err, "837270dc-c0d0-4049-b3cf-0ba00b631b8b");
    }
  };

  const onLogout = () => {
    dispatch(actions.logout());
    history.push("/login");
  };
  if (activities_data !== undefined || activities_data !== null) {
    if (activities_data?.length != 0) {
      activities_data = activities_data?.filter((item) => {
        return item.statusType == "open";
      });
    }
  }

  const dateFun = (time) => {
    // var dt = new Date(time);
    // var hours = dt.getUTCHours() ; // gives the value in 24 hours format
    // var AmOrPm = hours >= 12 ? 'PM' : 'AM';
    // hours = (hours % 12) || 12;
    // var minutes = dt.getUTCMinutes() ;
    // var finalTime = hours + ":" + (minutes == 0 ?"00":"00")+ "  "+AmOrPm;
    let finalTimeobj = timeList.filter((item) => {
      return item.value == time;
    });
    let finalTime = finalTimeobj[0]?.dispValue;
    return finalTime;
  };

  const showModal = (event, ind) => {
    // setButtonName('Update')
    getTodoDataArray[ind].showarchiedpopup = false;
    setUpdateData(event);
    setIsModalVisible(true);
  };

  const archiveData = async (event) => {
    //   setIsModalVisible(true);
    const { id } = stoageGetter("user");
    try {
      let formData = {
        // userId:id,
        userId: id,
        taskOwner: event.taskOwner_id,
        taskId: event.todoid,
        archive: true,
      };
      let _resp = await axiosRequest.put(`user/update_task_status`, formData, {
        secure: true,
      });
      setGetTodoDataArray([]);
      getTodoData(0);
    } catch (err) {
      // console.log(err , 'ce7372e5-ba6c-4ce9-8bdf-c59899feddf5');
    }
  };

  const removListFromToDo = (data, rowIndex) => {
    const { id } = stoageGetter("user");
    // userId:id,

    let _teamMembers = [];
    let newData = getTodoDataArray;
    return getTodoDataArray.map((item, index) => {
      if (data.removeBtn === false) {
        newData[rowIndex].removeBtn = true;
        newData[rowIndex].icon = truecheckbox;
        newData[rowIndex].textOverLine.textDecorationLine = "line-through";
        setGetTodoDataArray(newData);

        if (newData[rowIndex].taskOwner_id !== id) {
          let object = {
            FullName: newData[rowIndex].searchdata[0].FullName,
            designation: newData[rowIndex].searchdata[0].designation,
            _Id: newData[rowIndex].searchdata[0]._Id,
            ShortId: newData[rowIndex].searchdata[0].ShortId,
            remarkText: newData[rowIndex].searchdata[0].remarkText,
            taskDone: true,
            inAppNotification:
              newData[rowIndex].searchdata[0].inAppNotification,
            remarkNotification:
              newData[rowIndex].searchdata[0].remarkNotification,
          };
          _teamMembers.push(object);

          let formdata = {
            userId: id,
            taskOwner: newData[rowIndex].taskOwner_id,
            taskId: newData[rowIndex].todoid,
            owernersCollectionDetails: _teamMembers,
          };
          updateTODOTaskApi(formdata);
        } else {
          let formdata = {
            userId: id,
            taskOwner: newData[rowIndex].taskOwner_id,
            taskId: data.todoid,
            taskDone: true,
          };
          updateTODOTaskApi(formdata);
        }
      } else {
        newData[rowIndex].removeBtn = false;
        newData[rowIndex].icon = checkboxoutline;
        newData[rowIndex].textOverLine.textDecorationLine = "";
        setGetTodoDataArray(newData);

        if (newData[rowIndex].taskOwner_id !== id) {
          let object = {
            FullName: newData[rowIndex].searchdata[0].FullName,
            designation: newData[rowIndex].searchdata[0].designation,
            _Id: newData[rowIndex].searchdata[0]._Id,
            ShortId: newData[rowIndex].searchdata[0].ShortId,
            remarkText: newData[rowIndex].searchdata[0].remarkText,
            taskDone: false,
            inAppNotification:
              newData[rowIndex].searchdata[0].inAppNotification,
            remarkNotification:
              newData[rowIndex].searchdata[0].remarkNotification,
          };
          _teamMembers.push(object);

          let formdata = {
            userId: id,
            taskOwner: newData[rowIndex].taskOwner_id,
            taskId: newData[rowIndex].todoid,
            owernersCollectionDetails: _teamMembers,
          };
          updateTODOTaskApi(formdata);
        } else {
          let formdata = {
            userId: id,
            taskOwner: newData[rowIndex].taskOwner_id,
            taskId: data.todoid,
            taskDone: false,
          };
          updateTODOTaskApi(formdata);
        }
      }
    });
  };
  const nameShorter = (str) => {
    try {
      if (str !== "") {
        str = str.toUpperCase();
        let arr = str.split(" ");
        if (arr.length === 1) {
          let fLatter = arr[0]?.charAt(0);
          str = fLatter;
        } else {
          let fLatter = arr[0]?.charAt(0);
          let sLatter = arr[1]?.charAt(0);
          str = fLatter + sLatter;
        }
      }
      return str;
    } catch (error) {
      console.log(error);
    }
  };

  const updateTODOTaskApi = async (data) => {
    setGetTodoDataArray([]);
    let _resp = await axiosRequest.put(`user/update_task_status`, data, {
      secure: true,
    });
    getTodoData(0);
  };

  const Showpopuptodo = (ind, data) => {
    let _data = getTodoDataArray.map((ev, index) => {
      ind === index
        ? (ev.showarchiedpopup = true)
        : (ev.showarchiedpopup = false);
      return ev;
    });
    setGetTodoDataArray(_data);
  };

  const changeOpprtunityPeriod = (event) => {
    setLeadCountPeriod(event);
    dispatch(actions.home(userId, event));
  };

  const breakpoint = 620;
  const config = {
    data: opportunities,
    width: width > breakpoint ? 356 : 333,
    height: 165,
    autoFit: false,
    isGroup: true,
    xField: "month",
    yField: "value",
    seriesField: "name",
    xAxis: {
      label: {
        style: {
          fill: "#fff",
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fill: "#fff",
        },
      },
    },
    legend: {
      itemName: {
        style: {
          fill: "#fff",
        },
      },
    },
    // label: {
    //   position: "middle",
    //   layout: [
    //     // { type: 'interval-adjust-position' },
    //     // { type: 'interval-hide-overlap' },
    //     { type: "adjust-color" },
    //   ],
    // },
    color: ["#ADD8E6", "#f1f1f1"],
  };
  return (
    <Fragment>
      <FloatButton />

      <Col className="cardHolder" justify="center">
        {/* home-ml10 */}
        <Row
          className="alignUserLabel"
          style={{
            backgroundColor: "#3b371e",
            zIndex: -1,
            height: 300,
            alignItems: "center",
          }}
        >
          <Col>
            <div className="dataCardLabel">
              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: 0,
                  color: "#fff",
                  fontSize: 18,
                }}
              >
                GOOD MORNING
              </p>
              <p
                style={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  fontSize: "24px",
                  marginBottom: "0px",
                  color: "#fff",
                }}
              >
                {logged_in_user}
              </p>
            </div>
          </Col>
          <Col>
            <div className="dataCardLabel"></div>
          </Col>
          <Col>
            <div className="dataCardLabel"></div>
          </Col>
        </Row>
        <Row
          style={{
            marginLeft: 0,
            marginRight: 0,
            zIndex: 1,
            position: "absolute",
            top: 200,
            width: "100%",
          }}
          gutter={[18, { xs: 18, sm: 10, md: 10, lg: 18 }]}
          justify="center"
        >
          {showActivityTracker && (
            <Col className="home_section">
              <div
                className="dataCard"
                bordered="false"
                style={{ backgroundColor: "#CEA0E1" }}
              >
                <div className="card-content">
                  <div className="activity-icon">
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={activity_img}
                      alt="Activities"
                    />
                  </div>
                  <div
                    onClick={() => history.push("/calendar")}
                    className="activities-text"
                  >
                    <div className="appointment_data">
                      <p className="ttile_name">Activities</p>
                      <p className="ttile_name">
                        {activities_data && activities_data?.length
                          ? activities_data?.length + " Activities"
                          : ""}
                      </p>
                    </div>
                    <div className="horizontalLine"></div>
                  </div>
                </div>

                {activities_data &&
                  !_.isEmpty(activities_data) &&
                  activities_data !== "No appointment " ? (
                  <div className="activity-block">
                    {activities_data?.map((item) => {
                      return (
                        <div
                          className="action-cards-content-activity"
                          key={item._id}
                        >
                          <div>
                            <p className="appoinment_date">
                              {Moment(item.start_date).format("D MMM YYYY")}{" "}
                            </p>
                            <div className="appointment_data">
                              <p>
                                {/* {Moment(item.start_time_MS).format("h:mm a")} */}
                                {dateFun(item.start_time)}
                              </p>
                              <p style={{ fontWeight: "bold" }}>
                                {item.event_name}
                              </p>
                              <p>
                                {/* {Moment(item.end_time_MS).format("h:mm a")} */}
                                {dateFun(item.end_time)}
                              </p>
                            </div>
                            <div id="truncateLongTexts">
                              <p>{add3Dots(item.event_description, 50)}</p>
                            </div>
                            {/* <table>
                              <tr>
                                <td style={{ width: '85px' }}>
                                  <Button type="primary" size='small' style={{ backgroundColor: item.reminder_prority_color, color: "#fff", borderRadius: '2px' }}>
                                    {item.set_reminder_prority}
                                  </Button>
                                </td>
                                <td>{item.event_description}</td>
                                <td>{item.leadId?.primaryMobile}</td>
                              </tr>
                            </table> */}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="events-body">
                    <Image
                      className="stars"
                      preview={false}
                      src={event_img}
                      alt="Events"
                    />
                    <p
                      style={{
                        color: "#CEA0E1",
                        fontSize: "20px",
                        width: "fit-content",
                        margin: "auto",
                      }}
                    >
                      No Events Exist
                    </p>
                    <Link to="/calendar">
                      <div
                        style={{
                          color: "#fff",
                          padding: "5px 20px",
                          backgroundColor: "#CEA0E1",
                          width: "40%",
                          width: "fit-content",
                          margin: "auto",
                          cursor: "pointer",
                        }}
                      >
                        Create an Event
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </Col>
          )}

          {showOpportunities && (
            <Col className="home_section">
              <div
                className="dataCard"
                bordered="false"
                style={{ backgroundColor: "rgb(94, 192, 173)" }}
              // style={{ backgroundColor: "#00acc1" }}

              >
                {/* <Link to="/leadMaster/all_leads"> */}
                <div className="card-content">
                  <div
                    className="activity-icon"
                    onClick={() => history.push("/leadMaster/all_leads")}
                  >
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={opportunities_img}
                      alt="Opportunities"
                    />
                  </div>
                  <div className="activities-text">
                    <Row>
                      <p
                        onClick={() => history.push("/leadMaster/all_leads")}
                        className="ttile_name"
                      >
                        Company Listing
                      </p>
                    </Row>
                    <div className="horizontalLine"></div>
                  </div>
                </div>
                {/* </Link> */}
                <div
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <div className="container-opp">
                    <div className="column-opp">
                      <div className="head-opp">Renewals In</div>
                      <div className="row-opp">
                        <div className="num-opp">{CompanyListingResponse}</div>

                        <div className="child1-opp-1">Next 30 Days</div>
                      </div>
                      <span className="hLine"></span>
                      <div className="row-opp">
                        <div className="num-opp">{renewal_Last_30}</div>

                        <div className="child1-opp-1">Last 30 Days</div>
                      </div>
                    </div>
                    <div className="vertical-line">
                      <div className="row-opp">
                        <div className="vLine"></div>
                      </div>
                    </div>
                    <div className="column-opp">
                      <div className="head-opp">TAGIC Presence</div>
                      <div className="row-opp-1">
                        <span className="child1-opp">{'<10%'}</span>

                        <span className="num-opp-1">{count10}</span>
                      </div>
                      {/* <div className="hLine-r1"></div> */}
                      <div className="row-opp-2">
                        <span className="child1-opp">{'<25%'}</span>
                        <span className="num-opp-1">{count25}</span> <br />
                        {/* <div className="hLine-r1"></div> */}
                      </div>
                      <div className="row-opp-3">
                        <span className="child1-opp">{'<40%'}</span>

                        <span className="num-opp-1">{count40}</span>
                        {/* <div className="hLine-r1"></div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          )}
          {showOpportunities && (
            <Col className="home_section">
              <div
                className="dataCard"
                bordered="false"
                style={{ backgroundColor: "#00ACC1" }}
              >
                <div className="card-content">
                  <div
                    className="activity-icon"
                    onClick={() => history.push("/brokerflow/all_leads")}
                  >
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={opportunities_img}
                      alt="Opportunities"
                    />
                  </div>
                  <div className="activities-text">
                    <Row>
                      <p
                        onClick={() => history.push("/brokerflow/all_leads")}
                        className="ttile_name"
                      >
                        Broker
                      </p>
                    </Row>
                    <div className="horizontalLine"></div>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <div className="container-opp" style={{ marginTop: "45px" }}>
                    <div className="column-opp">
                      <div className="row-opp">
                        <div className="child1-opp-1" style={{ fontSize: '18px' }}>Producer</div>
                        <i><p className="sales-content"
                          style={{ fontSize: 14, marginTop: '4px' }}>Total Count</p></i>
                        <div className="num-opp" style={{ fontSize: '45px' }}>{!prodCountData?.producerCount ? 0 : prodCountData?.producerCount}</div>
                      </div>
                    </div>
                    <div className="vertical-line" style={{ marginTop: '28px' }}>
                      <div className="verticalLine"></div>
                    </div>
                    <div className="column-opp">

                      <div className="row-opp">
                        <div className="child1-opp-1" style={{ fontSize: '18px' }}>Appointment</div>
                        <i><p className="sales-content"
                          style={{ fontSize: 14, marginTop: '4px' }}>Next 30 Days</p></i>
                        <div className="num-opp" style={{ fontSize: '45px' }}>{!prodCountData?.appointmentCount ? 0 : prodCountData?.appointmentCount}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          )}
          {showTodo && (
            <Col className="home_section">
              <div
                className="dataCard"
                bordered="false"
                style={{ backgroundColor: "#5ec0ad" }}
              >
                <Link to="/calendar">
                  <div className="card-content">
                    <div className="activity-icon">
                      <Image
                        preview={false}
                        width={55}
                        height={55}
                        src={todo_img}
                        alt="ToDo"
                      />
                    </div>
                    <div className="activities-text">
                      <p className="ttile_name">To Do</p>
                      {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '590%', margin: '-6px' }} /> */}
                      <div className="horizontalLine"></div>
                    </div>
                  </div>
                </Link>

                {getTodoDataArray &&
                  !_.isEmpty(getTodoDataArray) &&
                  getTodoDataArray !== "No appointment " ? (
                  <div className="activity-block">
                    {getTodoDataArray.map((element, index, item) => {
                      return (
                        <div
                          className="TodoCard-Container todo-home"
                          key={index}
                        >
                          <div
                            className="TodoCards-Top"
                            style={{ borderBottom: "1px solid #e6e9eb" }}
                          >
                            <div className="TodoCards-TimedateArchive">
                              <Col className="TodoCards-TopClock">
                                {/* <div className="todoCard-mr15">
                                  <img src={TodoClock} alt="alarm" />
                                </div> */}
                                <div>
                                  <h4
                                    style={{
                                      color:
                                        element.status === "Soon"
                                          ? element.sooncolor
                                          : element.status === "Overdue"
                                            ? element.overduecolor
                                            : "red",
                                      fontSize: 12,
                                      fontWeight: 700,
                                    }}
                                  >
                                    {element.status}{" "}
                                  </h4>
                                </div>
                                <div style={{ marginLeft: 5 }}>
                                  <text
                                    style={{
                                      color:
                                        element.status === "Soon"
                                          ? element.sooncolor
                                          : element.status === "Overdue"
                                            ? element.overduecolor
                                            : "#000",
                                    }}
                                  >
                                    {element.dateofreminder} : {element.stringtimeofreminder}
                                  </text>
                                </div>
                                <div className='priority'>
                                  <div style={{ backgroundColor: element.priorityIndicatorColor }} className="priority-circle"></div>
                                  <div style={{ textTransform: "capitalize", color: element.priorityIndicatorColor }}>{element.taskPriority}</div>
                                </div>
                              </Col>

                              <div style={{ paddingLeft: 10, paddingRight: 5 }}>
                                <img
                                  alt=""
                                  src={hamburger}
                                  style={{
                                    height: 15,
                                    width: 3,
                                    cursor: "pointer",
                                  }}
                                  onClick={(e) => {
                                    Showpopuptodo(index, element);
                                  }}
                                />
                              </div>

                              <div className="Hamburger-Edit">
                                {element.showarchiedpopup === true && (
                                  <div className="TodoCard-Container-Hamburger">
                                    <Card className="Hamburger-Card Hamburger-box">
                                      <p onClick={() => archiveData(element)} style={{ display: "flex", alignItems: "center", }}>
                                        <ShopOutlined style={{ marginRight: "10px", marginTop: 5 }} />{" "}Archive
                                      </p>
                                    </Card>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="TodoCards-Body" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="TodoCard-Body-CheckBox todoCard-mr15" onClick={() => removListFromToDo(element, index)}>
                              <img src={element.icon} className="archive-trueCheckBox" alt="trueCheckBox" />
                            </div>
                            <p style={{ textDecorationLine: element.textOverLine.textDecorationLine, }}>
                              {element.content}
                            </p>
                          </div>

                          <div className="TodoCards-Body flex-wrap py-1">
                            <p className="w-50 value">
                              {!element.companyName ? "-" : element.companyName}
                            </p>

                            <p className="w-50 term">Company Name</p>
                          </div>

                          <div className="Todo-Footer">
                            <p
                              style={{
                                textTransform: "capitalize",
                                fontWeight: "bolder",
                              }}
                            >
                              {element.ownername}
                            </p>
                            <button
                              style={{
                                textTransform: "capitalize",
                                backgroundColor: element.priorityIndicatorColor,
                              }}
                            >
                              {element.taskPriority}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ height: "75%" }} className="events-body">
                    <Image
                      className="stars1"
                      src={action_data_img}
                      preview={false}
                    ></Image>
                    <p
                      style={{
                        color: "#00ACC1",
                        fontSize: "18px",
                        fontWeight: "600",
                        margin: "0 auto",
                        width: "fit-content",
                      }}
                    >
                      No Active Task
                    </p>
                  </div>
                )}
              </div>
            </Col>
          )}

          {showSalesGuide && (
            <Col className="home_section">
              <div
                className=" dataCard"
                bordered="false"
                style={{ backgroundColor: "#86ACEC" }}
              >
                <div className="card-content">
                  <Link to="/resourcecenter">
                    <div className="activity-icon">
                      <Image
                        preview={false}
                        width={55}
                        height={55}
                        src={sales_guide_img}
                        alt="Sales Guide"
                      />
                    </div>
                    <div className="activities-text">
                      <p className="ttile_name">Resource Center</p>
                      {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '300%', margin: '-6px' }} /> */}
                      <div className="horizontalLine"></div>
                    </div>
                  </Link>
                  <div className="sales-guide-content">
                    <div className="b1-content">
                      <div
                        // style={{ marginLeft: 15 }}
                        onClick={() => history.push("/resourcecenter")}
                      >
                        <div className="salesGuideNewStyle">
                          <img
                            src={resourceVideo}
                            style={{ height: 55, width: 55, cursor: "pointer" }}
                          />
                        </div>
                        <div>
                          <p
                            className="sales-content"
                            style={{ fontSize: 14, marginTop: 10 }}
                          >
                            Video
                          </p>
                        </div>
                      </div>

                      <div className="verticalLine"></div>

                      <div
                        // style={{ marginLeft: 15 }}
                        onClick={() => history.push("/resourcecenter")}
                      >
                        <div className="salesGuideNewStyle">
                          <img
                            src={resourcePdf}
                            style={{ height: 55, width: 55, cursor: "pointer" }}
                          />
                        </div>
                        <div>
                          <p
                            className="sales-content"
                            style={{ fontSize: 14, marginTop: 10 }}
                          >
                            PDF
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="horizontalLine"></div>

                    <div className="b1-content" style={{ marginTop: 20 }}>
                      <div
                        // style={{ marginLeft: 15 }}
                        onClick={() => history.push("/resourcecenter")}
                      >
                        <div className="salesGuideNewStyle">
                          <img
                            src={resourceArticles}
                            style={{ height: 55, width: 55, cursor: "pointer" }}
                          />
                        </div>
                        <div>
                          <p
                            className="sales-content"
                            style={{ fontSize: 14, marginTop: 10 }}
                          >
                            Articles
                          </p>
                        </div>
                      </div>

                      <div className="verticalLine"></div>

                      <div
                        // style={{ marginLeft: 15 }}
                        onClick={() => history.push("/resourcecenter")}
                      >
                        <div className="salesGuideNewStyle">
                          <img
                            src={resourceInfographic}
                            style={{ height: 55, width: 55, cursor: "pointer" }}
                          />
                        </div>
                        <div>
                          <p
                            className="sales-content"
                            style={{ fontSize: 14, marginTop: 10 }}
                          >
                            Infographic
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          )}

          {
            <Col className="home_section">
              <div
                className="dataCard"
                bordered="false"
                style={{ backgroundColor: "#5EC0AD" }}
              >
                {/* <Link to="/leadMaster/all_leads"> */}
                <div className="card-content">
                  <div
                    className="activity-icon"
                    onClick={() => history.push("/leadMaster/all_leads")}
                  >
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={contact_opportunity_img}
                      alt="Opportunities"
                    />
                  </div>
                  <div className="activities-text">
                    <Row>
                      <p
                        onClick={() => history.push("/leadMaster/all_leads")}
                        className="ttile_name"
                      >
                        Contact Opportunities
                      </p>
                    </Row>
                    <div className="horizontalLine"></div>
                  </div>
                </div>
                {/* </Link> */}
                <div
                  style={{
                    marginTop: "30px",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <div className="activity-block-contact">
                    {/* <div className="action-cards-content-activity"> */}
                      {
                        ContactOpportunity.length>0?
                        ContactOpportunity.map((item)=>{
                       return <div className="nested-card">
                          <div className="avatar-and-status">
                            <Avatar
                              style={{
                                backgroundColor: "#d8d8d8",
                              }}
                              size={{ xl: 40 }}
                            >
                              <div className="avatar_font">{nameShorter(item.companyName)}</div>
                            </Avatar>
                            <div  className="action-cards-content-activity">
                              <p className="user-name-text capitalize">
                                {item.companyName}
                              </p>
                              <span className="user-id uppercase">company Name</span>
                            </div>
                          </div>
                          <p className="card-title">
                            <Image
                              preview={false}
                              width={24}
                              height={24}
                              src={contact_opportunity_alarm}
                              alt="Opportunities"
                            />
                            <div className={`contact-card-date ${birthdate ? '' : 'centered'}`}>
                            {Moment(item.Inception).format("D MMM YYYY")}{" "}
                            <span style={{color:'grey'}}>Renewal Due</span>
                            </div>
                            
                          </p>
                        </div>
                        })
                      :
                      <div className="events-body" style={{color:"#5EC0AD"}}>
                      <Image
                        // color="#5EC0AD"
                        className="stars"
                        preview={false}
                        src={action_data_img}
                        alt="Events"
                      />
                      <p
                        style={{
                          color: "#5EC0AD",
                          fontSize: "20px",
                          width: "fit-content",
                          margin: "auto",
                        }}
                      >
                        No Contact Opportunities Exist
                      </p>
                    </div>
                      }
                    </div>
                  </div>
                </div>
            </Col>
          }

          <Col className="dummy-home-card"></Col>
          <Col className="dummy-home-card"></Col>
        </Row>
      </Col>
    </Fragment>
  );
};
export default HomePage;
