import React, { Fragment, useEffect, useState } from "react";
import "./HomePage.css";
import "../Activitity Tracker/RightSide-Todo/Todo&Archive-Css/TodoCards.css";
import { Image, Button, Row, Col, Card, Select } from "antd";
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

// import image -----
import business_img from "../../assets/DashboardIconNew/Group3366.png";
import activity_img from "../../assets/DashboardIconNew/Group3371.png";
import opportunities_img from "../../assets/DashboardIconNew/Group3367.png";
import todo_img from "../../assets/DashboardIconNew/Group3375.png";
import sales_guide_img from "../../assets/DashboardIconNew/Group3369.png";
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

// import { PowerBIEmbed } from 'powerbi-client-react';
// import { models } from "powerbi-client";

const HomePage = () => {
  const [activitydata, setActivityData] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const getPercenTage = (x, y) => {
    let val = isNaN(y / x) * 100 ? 0 : checkValidity((y / x) * 100);
    return isFloat(val)
      ? parseInt(val).toPrecision(3)
      : parseInt(val).toPrecision(3);
  };

  const isFloat = (n) => {
    try {
      return Number(n) === n && n % 1 !== 0;
    } catch (err) {
      console.log(err, "72b52752-02a7-4b70-b910-69810435b32b");
    }
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

  const login_user_data = stoageGetter("user");

  if (login_user_data === null) history.push("/login");

  // const _token = useSelector((state) => state.login.token)
  const agent_id = login_user_data.agentId;
  // const logged_in_user = useSelector((state) => state.login.user_name)
  const logged_in_user =
    login_user_data.firstName + " " + login_user_data.lastName;
  // console.warn('((((((((logged_in_user_DATA))))))))',login_user_data)
  // const id = useSelector((state) => state.login.id)
  const id = login_user_data.id;
  // const userId = useSelector((state) => state.login?.user?.id)
  const userId = login_user_data.id;
  // const channelCode = useSelector((state) => state.login?.user?.channelCode)
  const channelCode = login_user_data.channelCode;
  let _storeData = useSelector((state) => state);
  // console.warn('((((((((_storeData))))))))',_storeData.login)

  const _accessActivityTracker = checkuserAccess("myEvents", _storeData.login); //Activity Tracker
  const _accessDailyBusiness = checkuserAccess("myBusiness", _storeData.login); // Daily Business
  const _accessOpportunities = checkuserAccess("myLeads", _storeData.login); // Opportunities
  const _accessKpi = checkuserAccess("businessDashboard", _storeData.login); // KPI Dashbord
  const _accessTodo = checkuserAccess("todoTask", _storeData.login); // TODO
  const _accessSalesGuide = checkuserAccess("sales_guide", _storeData.login); // Sales Guide
  // console.warn('((((((((_storeData))))))))',_storeData)

  const [width, setWidth] = useState(window.innerWidth);
  const [goal, setGoal] = useState({});
  const [getTodoDataArray, setGetTodoDataArray] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const [showData, setShowData] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
  const [showBusinessData, setShowBusinessData] = useState(false);

  const [businessDropdown, setBusinessDropdown] = useState("");
  const [businessDropArray, setBusinessDropArray] = useState([]);

  const [businessRetention, setBusinessRetention] = useState({});
  const [businessGWP, setBusinessGWP] = useState({});
  const [businessActivation, setBusinessActivation] = useState({});
  const [opportunities, setOpportunities] = useState([]);
  const [businessArrData, setBusinessArrData] = useState([]);

  // Access Management
  const [showActivityTracker, setShowActivityTracker] = useState(
    _accessActivityTracker.props.read === true ? true : false
  );
  const [showDailyBusiness, setShowDailyBusiness] = useState(
    _accessDailyBusiness.props.read === true ? true : false
  );
  const [showOpportunities, setShowOpportunities] = useState(
    _accessOpportunities.props.read === true ? true : false
  );
  const [showKpi, setShowKpi] = useState(
    _accessKpi.props.read === true ? true : false
  );
  const [showTodo, setShowTodo] = useState(
    _accessTodo.props.read === true ? true : false
  );
  const [showSalesGuide, setShowSalesGuide] = useState(
    _accessSalesGuide.props.read === true ? true : false
  );

  let _businessRetention = {};
  let _businessGWP = {};
  let _businessActivation = {};

  useEffect(() => {
    if (id) dispatch(actions.activities(id, agent_id));
    if (id) dispatch(actions.todoGetData(id));
    dispatch(actions.getUserTreeAPI(userId));
    dispatch(actions.headerName("Home"));
    // dispatch(actions.getBusinessCardAPI(userId,channelCode));

    dispatch(leadActions.updateTabOfDashboard("self"));
    // console.log('ROUTEEE___HISTORYYY',history)
    // userId && dispatch(actions.fetchUserDetails(userId))
    channelCode && dispatch(actions.fetchHierarchy(userId, channelCode));
    if (agent_id) dispatch(actions.home(agent_id, userId));
    getTodoData(0);
    getDailyBusiness();
    getOpportunities();
    getKpiData(userId, channelCode);
  }, []);

  const home_data = useSelector((state) => state.home.home_obj);
  let activities_data = useSelector((state) => state.activities.activities_obj);

  function add3Dots(string, limit) {
    var dots = "...";
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
    return string;
  }

  let getKpiData = async (userId, channelData) => {
    let _resp = await axiosRequest.get(
      `user/fetch_business_card_data?csmId=${userId}&channel=${channelData._id}`,
      { secure: true }
    );
    console.log("Business CARD", _resp);
    // dispatch(actions.businessCardData(_resp))
<<<<<<< HEAD
    let _businessCardResp = _resp[0].data;
    setBusinessArrData(_businessCardResp);

    let _bussDropArr = [];

    console.warn("((((((((_businessCardResp))))))))", _businessCardResp);
    // if (_businessCardResp.length > 0) {
    //   for (let _kpi of _businessCardResp) {
    //     let data = {
    //       label: _kpi.year_month,
    //       value: _kpi.year_month,
    //       // index: _kpi.id === "last_two_month" ? "1" : "2",
    //     };
    //     _bussDropArr.push(data);
    //     _bussDropArr = _.uniqBy(_bussDropArr, "value");
    //     // setBusinessDropArray([...businessDropArray,data]);
    //     setBusinessDropArray(_bussDropArr);
    //     setBusinessDropdown(_bussDropArr[0].value);
    //   }
    //   // console.warn("((((((((_bussDropArr))))))))", _bussDropArr);
    //   handleBusinessDropdown(_bussDropArr[0].value, _businessCardResp);
    // } else {
    //   handleBusinessDropdown("", _businessCardResp);
    // }
=======
    
    let _bussDropArr = [];

    
    if(_resp.length > 0){
      let _businessCardResp = _resp[0]?.data;
      setBusinessArrData(_businessCardResp)
      console.warn("((((((((_businessCardResp))))))))", _businessCardResp);

      if (_businessCardResp.length > 0) {
        for (let _kpi of _businessCardResp) {
          let data = {
            label: _kpi.year_month,
            value: _kpi.year_month,
            // index: _kpi.id === "last_two_month" ? "1" : "2",
          };
          _bussDropArr.push(data);
          _bussDropArr = _.uniqBy(_bussDropArr,'value'); 
          // setBusinessDropArray([...businessDropArray,data]);
          setBusinessDropArray(_bussDropArr);
          setBusinessDropdown(_bussDropArr[0].value);
        }
        // console.warn("((((((((_bussDropArr))))))))", _bussDropArr);
        handleBusinessDropdown(_bussDropArr[0].value, _businessCardResp);
      } else {
        handleBusinessDropdown("", _businessCardResp);
      }
    }else{
      handleBusinessDropdown("",null);
    }
>>>>>>> d406444fcb4d8007940d42dd89245748c0623c40
  };

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

      // console.log("opportunities =========== ", opportunities);
    } catch (error) {
      console.log(error);
    }
  };

  let getDailyBusiness = async () => {
    try {
      let res = await axiosRequest.get(
        `user/fetch_daily_activity/${id}?today_goal=true`,
        { secure: true }
      );
      setGoal(res);
      // console.log("res", goal.am.gpwCommitment);
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
      // console.log("TODO__GETTTT___RESPPPP", _resp);
      let respData = _resp[0];

      for (let _data of respData) {
        // console.log('DATATATATA',_data)
        let _icon = "";
        // let _remark = ''
        // let _enableRemark = null
        // let _disableSubmit = null
        let _textOverline = {};
        if (_data.taskOwner._id !== id) {
          _textOverline =
            _data.owernersCollectionDetails[0].taskDone === false
              ? { textDecorationLine: "", opacity: "0" }
              : { textDecorationLine: "line-through", opacity: "0" };
          _icon =
            _data.owernersCollectionDetails[0].taskDone === false
              ? checkboxoutline
              : truecheckbox;
        } else {
          _textOverline =
            _data.taskDone === false
              ? { textDecorationLine: "", opacity: "0" }
              : { textDecorationLine: "line-through", opacity: "0" };
          _icon = _data.taskDone === false ? checkboxoutline : truecheckbox;
        }

        // _data.owernersCollectionDetails.forEach(event => {
        //     // console.log("*********************** owernersCollectionDetails ****************",event.remarkText);
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
          content: _data.description,
          removeBtn: _data.taskDone,
          icon: _icon,
          createddate: _data.createdDate,
          dateofreminder: moment(_data.dateOfReminder).format("L"),
          timeofreminder: parseInt(_data.timeOfReminder),
          todoid: _data._id,
          stringtimeofreminder: _data._stringVersionTimeOfReminder,
          ownername:
            _data.taskOwner.first_name + " " + _data.taskOwner.last_name,
          status: setTodoStatus(
            _data.dateOfReminder,
            parseInt(_data.timeOfReminder)
          ),
          searchdata: _data.owernersCollectionDetails,
          taskOwner_id: _data.taskOwner._id,
          taskPriority: _data.taskPriority,
          priorityIndicatorColor: _data.priorityIndicatorColor,
          showMemberRemark: false,
          showMemText: "Show More",
          sooncolor: "#E46A25",
          overduecolor: "#F44336",
          showarchiedpopup: false,
          textOverLine: _textOverline,
          wholeData: _data,
        };
        // console.warn('objstrct',objstrct)
        arrData.push(objstrct);
      }
      setGetTodoDataArray(arrData);
      // console.warn("getTodoDataArray____DATAA", getTodoDataArray);
      setShowData(true);
    } catch (err) {}
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
  // console.log("Home-Data", home_data)
  // console.log("activities-data", activities_data);
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
    // console.warn( "obj time-------------->",finalTimeobj);
    let finalTime = finalTimeobj[0]?.dispValue;
    // console.log(finalTime, "val time---->");
    return finalTime;
  };

  const showModal = (event, ind) => {
    // console.log("TODO__CARDD___DATA__", event);
    // setButtonName('Update')
    getTodoDataArray[ind].showarchiedpopup = false;
    setUpdateData(event);
    setIsModalVisible(true);
  };

  const archiveData = async (event) => {
    // console.log('TODO__CARDD___DATA__',event)
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
      console.log("DATA Update:: Archived", _resp);
      setGetTodoDataArray([]);
      getTodoData(0);
    } catch (err) {
      // console.log(err , 'ce7372e5-ba6c-4ce9-8bdf-c59899feddf5');
    }
  };

  const removListFromToDo = (data, rowIndex) => {
    // console.log('Check box data',data);
    // console.log('Index::',rowIndex);
    // console.log("From if condition")
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

  const updateTODOTaskApi = async (data) => {
    setGetTodoDataArray([]);
    let _resp = await axiosRequest.put(`user/update_task_status`, data, {
      secure: true,
    });
    console.log("UPDATE___RESPPP__", _resp);
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

  const handleBusinessDropdown = (event, data) => {
    setBusinessDropdown(event);
<<<<<<< HEAD
    let _selectMonthData = [];
    if (data.length !== undefined) {
      _selectMonthData = data.filter((el) => event === el.year_month);
    } else {
      _selectMonthData = businessArrData.filter(
        (el) => event === el.year_month
      );
=======
    let _selectMonthData = []
    if(data !== null){
      if(data.length !== undefined){
        _selectMonthData = data.filter((el) => event === el.year_month);
      }else{
        _selectMonthData = businessArrData.filter((el) => event === el.year_month);
      }
>>>>>>> d406444fcb4d8007940d42dd89245748c0623c40
    }
    // console.warn('((((((((_selectMonthData))))))))',_selectMonthData)
    if (event !== "") {
      _businessRetention.target = handleFalseData(
        _selectMonthData[0]["GWP Retention"].gwp_retention_actual
      );
      _businessRetention.achieve = handleFalseData(
        _selectMonthData[0]["GWP Retention"].gwp_retention_budget
      );
      _businessRetention.per_achieve = handleFalseData(
        _selectMonthData[0]["GWP Retention"].gwp_retention_per_achievement
      );

      _businessGWP.target = handleFalseData(
        _selectMonthData[0]["GPW"].gpw_actual
      );
      _businessGWP.achieve = handleFalseData(
        _selectMonthData[0]["GPW"].gpw_budget
      );
      _businessGWP.per_achieve = handleFalseData(
        _selectMonthData[0]["GPW"].gpw_per_achievement
      );

      _businessActivation.target = handleFalseData(
        _selectMonthData[0]["Branch Activation"].branch_activation_actual
      );
      _businessActivation.achieve = handleFalseData(
        _selectMonthData[0]["Branch Activation"].branch_activation_budget
      );
      _businessActivation.per_achieve = handleFalseData(
        _selectMonthData[0]["Branch Activation"]
          .branch_activation_per_achievement
      );

      setBusinessRetention(_businessRetention);
      setBusinessGWP(_businessGWP);
      setBusinessActivation(_businessActivation);
    } else {
      _businessRetention.target = 0;
      _businessRetention.achieve = 0;
      _businessRetention.per_achieve = 0;

      _businessGWP.target = 0;
      _businessGWP.achieve = 0;
      _businessGWP.per_achieve = 0;

      _businessActivation.target = 0;
      _businessActivation.achieve = 0;
      _businessActivation.per_achieve = 0;

      setBusinessRetention(_businessRetention);
      setBusinessGWP(_businessGWP);
      setBusinessActivation(_businessActivation);
    }
    // setShowBusinessData(true)
  };

  const handleFalseData = (data) => {
    if (!data) {
      return 0;
    } else {
      return data;
    }
  };

  const data = [
    {
      name: "For Today",
      month: "Sun.",
      value: 7,
    },
    {
      name: "For Today",
      month: "Mon.",
      value: 3,
    },
    {
      name: "For Today",
      month: "Tue.",
      value: 4,
    },
    {
      name: "For Today",
      month: "Wed.",
      value: 2,
    },
    {
      name: "For Today",
      month: "Thr",
      value: 15,
    },
    {
      name: "For Today",
      month: "Fri.",
      value: 10,
    },
    {
      name: "For Today",
      month: "Sat.",
      value: 11,
    },
    {
      name: "Open",
      month: "Sun.",
      value: 6,
    },
    {
      name: "Open",
      month: "Mon.",
      value: 1,
    },
    {
      name: "Open",
      month: "Tue.",
      value: 5,
    },
    {
      name: "Open",
      month: "Wed.",
      value: 7,
    },
    {
      name: "Open",
      month: "Thr",
      value: 16,
    },
    {
      name: "Open",
      month: "Fri.",
      value: 18,
    },
    {
      name: "Open",
      month: "Sat.",
      value: 15,
    },
  ];
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
  // console.warn('========businessDropArray==========>>>>',businessDropArray)
  return (
    <Fragment>
      <FloatButton />

      <Col className="cardHolder" justify="center">
        {/* home-ml10 */}
        <Row className="alignUserLabel">
          <Col>
            <div className="dataCardLabel">
              <p
                style={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginBottom: "8px",
                }}
              >
                Hi {logged_in_user}, Welcome to Salesdrive
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
        <Row gutter={[18, { xs: 18, sm: 10, md: 10, lg: 18 }]} justify="center">
          {showActivityTracker && (
            <Col>
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
            <Col>
              <div
                className=" dataCard"
                bordered="false"
                style={{ backgroundColor: "#86ACEC" }}
              >
                <Link to="/leadMaster/all_leads">
                  <div className="card-content">
                    <div className="activity-icon">
                      <Image
                        preview={false}
                        width={55}
                        height={55}
                        src={opportunities_img}
                        alt="Opportunities"
                      />
                    </div>
                    <div className="activities-text">
                      <p className="ttile_name">Opportunities</p>
                      <div className="horizontalLine"></div>
                    </div>
                  </div>
                </Link>
                <div style={{ marginTop: "30px" }}>
                  <Column {...config} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{
                      padding: "0 30px",
                      borderRight: "1px solid #fff",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    <p>For Today</p>
                    <span style={{ color: "#fff", fontSize: "50px" }}>
                      {home_data?.today ? home_data.today : "00"}
                    </span>
                  </div>
                  <div
                    style={{
                      padding: "0 30px",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    <p>Open</p>
                    <span style={{ color: "#fff", fontSize: "50px" }}>
                      {home_data?.open_lead ? home_data.open_lead : "00"}
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          )}

          <Col style={{ display: "none" }}>
            <div
              className=" dataCard"
              bordered="false"
              style={{ backgroundColor: "#00ACC1" }}
            >
              <div className="card-content">
                <Link to={"/applications"}>
                  <div className="activity-icon">
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={application_img}
                      alt="Opportunities"
                    />
                  </div>
                  <div className="activities-text">
                    <p className="ttile_name">Applications</p>
                    {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '300%', margin: '-6px' }} /> */}
                    <div className="horizontalLine"></div>
                  </div>
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "40px",
                  marginRight: "36px",
                }}
              >
                <div
                  style={{
                    padding: "0px 60px 20px 20px",
                    borderRight: "1px solid #fff ",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  <p>Login</p>
                  <span style={{ color: "#fff", fontSize: "50px" }}>00</span>
                </div>
                <div
                  style={{
                    padding: "0px 0px 20px 45px",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  <p>CFR</p>
                  <span style={{ color: "#fff", fontSize: "50px" }}>
                    {home_data?.cfr_count_team
                      ? home_data.cfr_count_team
                      : "23"}
                  </span>
                </div>
              </div>

              <hr
                style={{
                  border: "none",
                  borderBottom: "2px solid #fff",
                  opacity: "0.5",
                  width: "240px",
                  margin: "10px 0px 0px 60px",
                }}
              />
              {/* <hr style={{ border: "none", borderBottom: "1px solid #fff", width: "200px"}} /> */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    padding: "2px 60px 20px 0px",
                    borderRight: "1px solid #fff",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  <p>Draft</p>
                  <span style={{ color: "#fff", fontSize: "50px" }}>00</span>
                </div>
                <div
                  style={{
                    padding: "0px 0px 20px 40px",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  <p>Recruitment</p>
                  <span style={{ color: "#fff", fontSize: "50px" }}>00</span>
                </div>
              </div>
            </div>
          </Col>

          {showKpi && (
            <Col>
              <div
                className=" dataCard"
                bordered="false"
                style={{ backgroundColor: "#5EC0AD" }}
              >
                {/* <Link to="/kpi-dashboard"> */}
                <div className="card-content">
                  <div
                    className="activity-icon"
                    onClick={() => history.push("/kpi-dashboard")}
                  >
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={business_img}
                      alt="Business"
                    />
                  </div>
                  <div className="activities-text businessCardStyle">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                      }}
                    >
                      <p
                        onClick={() => history.push("/kpi-dashboard")}
                        className="ttile_name"
                      >
                        Business
                      </p>
                      <Select
                        value={businessDropdown}
                        options={businessDropArray}
                        onChange={(event, data) =>
                          handleBusinessDropdown(event, data)
                        }
                        style={{ width: "50%" }}
                      ></Select>
                    </div>
                    <div className="horizontalLine"></div>
                  </div>
                </div>
                {/* </Link> */}
                {/* {showBusinessData && ( */}
                <div style={{ marginTop: "50px" }}>
                  <div
                    style={{
                      backgroundColor: "#fff",
                      marginBottom: "10px",
                      borderRadius: "3px",
                      color: "#3C3D3D",
                      fontSize: "11px",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "750",
                        padding: "5px 10px",
                        borderBottom: "1px solid #c1c8cc",
                        marginBottom: 0,
                      }}
                    >
                      Retention
                    </p>
                    <div
                      style={{
                        display: "flex",
                        color: "#fff",
                        lineHeight: "5px",
                        color: "black",
                      }}
                    >
                      <div style={{ width: "120px", padding: "8px 10px" }}>
                        <p>Target</p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#3c3d3d",
                            marginBottom: 5,
                          }}
                        >
                          {businessRetention.target}
                        </p>
                      </div>
                      <div
                        style={{
                          width: "120px",
                          padding: "8px 10px",
                          borderRight: "1px solid #c2c8cc",
                          borderLeft: "1px solid #c2c8cc",
                        }}
                      >
                        <p>Achievement</p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#3c3d3d",
                            marginBottom: 5,
                          }}
                        >
                          {businessRetention.achieve}
                        </p>
                      </div>
                      <div style={{ width: "120px", padding: "8px 10px" }}>
                        <p>%Achievement</p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#3c3d3d",
                            marginBottom: 5,
                          }}
                        >
                          {businessRetention.per_achieve}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#fff",
                      marginBottom: "10px",
                      borderRadius: "3px",
                      color: "#3C3D3D",
                      fontSize: "11px",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "750",
                        padding: "5px 10px",
                        borderBottom: "1px solid #c1c8cc",
                        marginBottom: 0,
                      }}
                    >
                      GWP
                    </p>
                    <div
                      style={{
                        display: "flex",
                        color: "#fff",
                        lineHeight: "5px",
                        color: "black",
                      }}
                    >
                      <div style={{ width: "120px", padding: "8px 10px" }}>
                        <p>Target</p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#3c3d3d",
                            marginBottom: 5,
                          }}
                        >
                          {businessGWP.target}
                        </p>
                      </div>

                      <div
                        style={{
                          width: "120px",
                          padding: "8px 10px",
                          borderRight: "1px solid #c2c8cc",
                          borderLeft: "1px solid #c2c8cc",
                        }}
                      >
                        <p>Achievement</p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#3c3d3d",
                            marginBottom: 5,
                          }}
                        >
                          {businessGWP.achieve}
                        </p>
                      </div>
                      <div style={{ width: "120px", padding: "8px 10px" }}>
                        <p>%Achievement</p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#3c3d3d",
                            marginBottom: 5,
                          }}
                        >
                          {businessGWP.per_achieve}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#fff",
                      marginBottom: "10px",
                      borderRadius: "3px",
                      color: "#3C3D3D",
                      fontSize: "11px",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "750",
                        padding: "5px 10px",
                        borderBottom: "1px solid #c1c8cc",
                        marginBottom: 0,
                      }}
                    >
                      Activation
                    </p>
                    <div
                      style={{
                        display: "flex",
                        color: "#fff",
                        lineHeight: "5px",
                        color: "black",
                      }}
                    >
                      <div style={{ width: "120px", padding: "8px 10px" }}>
                        <p>Target</p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#3c3d3d",
                            marginBottom: 5,
                          }}
                        >
                          {businessActivation.target}
                        </p>
                      </div>
                      <div
                        style={{
                          width: "120px",
                          padding: "8px 10px",
                          borderRight: "1px solid #c2c8cc",
                          borderLeft: "1px solid #c2c8cc",
                        }}
                      >
                        <p>Achievement</p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#3c3d3d",
                            marginBottom: 5,
                          }}
                        >
                          {businessActivation.achieve}
                        </p>
                      </div>

                      <div style={{ width: "120px", padding: "8px 10px" }}>
                        <p>%Achievement</p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#3c3d3d",
                            marginBottom: 5,
                          }}
                        >
                          {businessActivation.per_achieve}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* )} */}
              </div>
            </Col>
          )}

          {showDailyBusiness && (
            <Col>
              <div
                className=" dataCard"
                bordered="false"
                style={{ backgroundColor: "rgb(134, 172, 236)" }}
              >
                <Link to="/daily-bussienss">
                  <div className="card-content">
                    <div className="activity-icon">
                      <Image
                        preview={false}
                        width={55}
                        height={55}
                        src={opportunities_img}
                        alt="Business"
                      />
                    </div>
                    <div className="activities-text">
                      <p className="ttile_name">Daily Business</p>
                      {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '420%', margin: '-6px' }} /> */}
                      <div className="horizontalLine"></div>
                    </div>
                  </div>
                </Link>
                <div style={{ marginTop: "50px" }}>
                  <div
                    style={{
                      backgroundColor: "#fff",
                      marginBottom: "10px",
                      borderRadius: "3px",
                      color: "#3C3D3D",
                      fontSize: "11px",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "750",
                        padding: "5px 10px",
                        borderBottom: "1px solid #c1c8cc",
                        marginBottom: 0,
                      }}
                    >
                      GWP / {moment().format("MMMM / YYYY")}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        color: "#fff",
                        lineHeight: "5px",
                        color: "black",
                      }}
                    >
                      <div style={{ width: "120px", padding: "8px 10px" }}>
                        <p>Target</p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#3c3d3d",
                            marginBottom: 5,
                          }}
                        >
                          {goal?.am?.gpwCommitment ? goal.am.gpwCommitment : 0}
                        </p>
                      </div>
                      <div
                        style={{
                          width: "120px",
                          padding: "8px 10px",
                          borderRight: "1px solid #c2c8cc",
                          borderLeft: "1px solid #c2c8cc",
                        }}
                      >
                        <p>Achievement</p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#3c3d3d",
                            marginBottom: 5,
                          }}
                        >
                          {goal?.pm?.gpwAchived ? goal.pm.gpwAchived : 0}
                        </p>
                      </div>
                      <div style={{ width: "120px", padding: "8px 10px" }}>
                        <p>Achievement</p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#3c3d3d",
                            marginBottom: 5,
                          }}
                        >
                          {getPercenTage(
                            checkValidity(goal?.am?.gpwCommitment),
                            checkValidity(goal?.pm?.gpwAchived)
                          )}
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          )}

          <Col style={{ display: "none" }}>
            <div
              className=" dataCard"
              bordered="false"
              style={{ backgroundColor: "#00ACC1", overflow: "hidden" }}
            >
              <div className="card-content">
                <div className="activity-icon">
                  <Image
                    preview={false}
                    width={55}
                    height={55}
                    src={todo_img}
                    alt="Actions"
                  />
                </div>
                <div className="activities-text">
                  <p className="ttile_name">Actions</p>
                  {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '480%', margin: '-6px' }} /> */}
                  <div className="horizontalLine"></div>
                </div>
                <div className="action-cards-content">
                  <div style={{ width: "100%", padding: "10px" }}>
                    <p style={{ width: "100%", margin: "0" }}>
                      New Leads{" "}
                      <span
                        style={{
                          float: "right",
                          color: "#00ACC1",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Dismiss
                      </span>
                    </p>
                    <h1 style={{ marginTop: "-10px" }}>
                      <b style={{ color: "#00ACC1" }}>10</b>{" "}
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          fontFamily: "robotoregular",
                        }}
                      >
                        Unallocated leads in the list
                      </span>
                    </h1>
                  </div>
                  <div style={{ width: "100%", padding: "10px" }}>
                    <p style={{ width: "100%", margin: "0" }}>
                      New Leads{" "}
                      <span
                        style={{
                          float: "right",
                          color: "#00ACC1",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Dismiss
                      </span>
                    </p>
                    <h1 style={{ marginTop: "-10px" }}>
                      <b style={{ color: "#00ACC1" }}>10</b>{" "}
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          fontFamily: "robotoregular",
                        }}
                      >
                        Unallocated leads in the list
                      </span>
                    </h1>
                  </div>
                  <div style={{ width: "100%", padding: "10px" }}>
                    <p style={{ width: "100%", margin: "0" }}>
                      New Leads{" "}
                      <span
                        style={{
                          float: "right",
                          color: "#00ACC1",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Dismiss
                      </span>
                    </p>
                    <h1 style={{ marginTop: "-10px" }}>
                      <b style={{ color: "#00ACC1" }}>10</b>{" "}
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          fontFamily: "robotoregular",
                        }}
                      >
                        Unallocated leads in the list
                      </span>
                    </h1>
                  </div>
                  <div style={{ width: "100%", padding: "10px" }}>
                    <p style={{ width: "100%", margin: "0" }}>
                      New Leads{" "}
                      <span
                        style={{
                          float: "right",
                          color: "#00ACC1",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Dismiss
                      </span>
                    </p>
                    <h1 style={{ marginTop: "-10px" }}>
                      <b style={{ color: "#00ACC1" }}>10</b>{" "}
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          fontFamily: "robotoregular",
                        }}
                      >
                        Unallocated leads in the list
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {showTodo && (
            <Col>
              <div
                className=" dataCard"
                bordered="false"
                style={{ backgroundColor: "#00ACC1" }}
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
                      // console.log('DATATATATA____',element)
                      return (
                        <div
                          className="TodoCard-Container todo-home"
                          key={index}
                        >
                          <div className="TodoCards-Top">
                            <div className="TodoCards-TimedateArchive">
                              <Col className="TodoCards-TopClock">
                                <div className="todoCard-mr15">
                                  <img src={TodoClock} alt="alarm" />
                                </div>
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
                                    }}
                                  >
                                    {element.status}{" "}
                                  </h4>
                                </div>
                                <div style={{ marginLeft: 5 }}>
                                  <h4
                                    style={{
                                      color:
                                        element.status === "Soon"
                                          ? element.sooncolor
                                          : element.status === "Overdue"
                                          ? element.overduecolor
                                          : "red",
                                      fontSize: 12,
                                    }}
                                  >
                                    {element.stringtimeofreminder} :{" "}
                                    {element.dateofreminder}
                                  </h4>
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
                                      <hr
                                        style={{
                                          color: "#e6e9eb",
                                          opacity: "0.3",
                                        }}
                                      />
                                      <p
                                        onClick={() => archiveData(element)}
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <ShopOutlined
                                          style={{ marginRight: "10px" }}
                                        />{" "}
                                        Archive
                                      </p>
                                    </Card>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="TodoCards-Body">
                            <div
                              className="TodoCard-Body-CheckBox todoCard-mr15"
                              onClick={() => removListFromToDo(element, index)}
                            >
                              <img
                                src={element.icon}
                                className="archive-trueCheckBox"
                                alt="trueCheckBox"
                              />
                            </div>
                            <p
                              style={{
                                textDecorationLine:
                                  element.textOverLine.textDecorationLine,
                              }}
                            >
                              {element.content}
                            </p>
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

          <Col style={{ display: "none" }}>
            <div
              className=" dataCard"
              bordered="false"
              style={{ backgroundColor: "#5EC0AD" }}
            >
              <Link to="/renewalMaster/allRenewals">
                <div className="card-content">
                  <div className="activity-icon">
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={mapped_img}
                      alt="Customers"
                    />
                  </div>
                  <div className="activities-text">
                    <p className="ttile_name">Renewals</p>
                    {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '350%', margin: '-6px' }} /> */}
                    <div className="horizontalLine"></div>
                  </div>
                </div>
              </Link>
              <div className="rewardscorner-text">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <div
                    style={{
                      padding: "0 50px",
                      borderRight: "1px solid #fff",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    <p>Renewals</p>
                    <h1 style={{ color: "#fff", fontSize: "50px" }}>
                      {home_data?.Renewal_count_team
                        ? home_data.Renewal_count_team
                        : "00"}
                    </h1>
                    <p>
                      <b>New</b>
                    </p>
                  </div>
                  <div
                    style={{
                      padding: "0 50px",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    <p>Customers</p>
                    <h1 style={{ color: "#fff", fontSize: "50px" }}>
                      {home_data?.customer_count_team
                        ? home_data.customer_count_team
                        : "00"}
                    </h1>
                    <p>
                      <b>New</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col style={{ display: "none" }}>
            <div
              className=" dataCard"
              bordered="false"
              style={{ backgroundColor: "#00ACC1" }}
            >
              <div className="card-content">
                <Link to="/rewardscorner/contests/allcontest">
                  <div className="activity-icon">
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={reward_img}
                      alt="Rewards Corner"
                    />
                  </div>
                  <div className="activities-text">
                    <p className="ttile_name">Rewards Corner</p>
                    {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '240%', margin: '-6px' }} /> */}
                    <div className="horizontalLine"></div>
                  </div>
                </Link>
                <div className="rewardscorner-text">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <Link to="/rewardscorner/contests/allcontest">
                      <div
                        style={{
                          padding: "0 50px",
                          cursor: "pointer",
                          borderRight: "1px solid #fff",
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        <Image
                          preview={false}
                          width={90}
                          height={90}
                          src={contest_img}
                          alt="contests"
                          hspace="20"
                        />
                        <p>Contests</p>
                      </div>
                    </Link>
                    <Link to="/clubsmaster">
                      <div
                        style={{
                          padding: "0 50px",
                          cursor: "pointer",
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        <Image
                          preview={false}
                          width={90}
                          height={90}
                          src={club_img}
                          alt="clubs"
                        />
                        <p>Clubs</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col style={{ display: "none" }}>
            <div
              className=" dataCard"
              bordered="false"
              style={{ backgroundColor: "#86ACEC" }}
            >
              <div className="card-content">
                <div className="activity-icon">
                  <Image
                    preview={false}
                    width={55}
                    height={55}
                    src={sales_guide_img}
                    alt="Sales Guide"
                  />
                </div>
                <Link to="/servicecorner/all">
                  <div className="activities-text">
                    <p className="ttile_name">Service Corner</p>
                    {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '300%', margin: '-6px' }} /> */}
                    <div className="horizontalLine"></div>
                  </div>
                </Link>
                <div className="salesGuideCont">
                  <div>
                    <p>WIP</p>
                    <h1>00</h1>
                  </div>
                  <div>
                    <p>Closed</p>
                    <h1>00</h1>
                  </div>
                  <div>
                    <p>Claim</p>
                    <h1>00</h1>
                  </div>
                </div>
                <div style={{ marginTop: "30px", textAlign: "center" }}>
                  <p
                    className="sales-content"
                    style={{
                      height: 35,
                      width: "fit-content",
                      padding: "5px 15px",
                      display: "inline-block",
                    }}
                  >
                    Downloads
                  </p>
                  <p
                    className="sales-content"
                    style={{
                      height: 35,
                      width: "fit-content",
                      padding: "5px 15px",
                      display: "inline-block",
                      marginLeft: "10px",
                    }}
                  >
                    FAQ's
                  </p>
                </div>
              </div>
            </div>
          </Col>

          {showSalesGuide && (
            <Col>
              <div
                className=" dataCard"
                bordered="false"
                style={{ backgroundColor: "#CEA0E1" }}
              >
                <div className="card-content">
                  <Link to="/products">
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
                      <p className="ttile_name">Sales Guide</p>
                      {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '300%', margin: '-6px' }} /> */}
                      <div className="horizontalLine"></div>
                    </div>
                  </Link>
                  <div className="sales-guide-content">
                    <div className="b1-content">
                      <div
                        onClick={() =>
                          history.push(
                            "/masterpresales/customerdetails/salespitch"
                          )
                        }
                      >
                        <div className="salesGuideNewStyle">
                          <img
                            src={product_icon}
                            style={{ height: 55, width: 55, cursor: "pointer" }}
                          />
                        </div>
                        <div>
                          <p className="sales-content" style={{ fontSize: 14 }}>
                            Sales Pitch
                          </p>
                        </div>
                      </div>

                      <div
                        style={{ marginLeft: 15 }}
                        onClick={() => history.push("/resourcecenter")}
                      >
                        <div className="salesGuideNewStyle">
                          <img
                            src={resource_icon}
                            style={{ height: 55, width: 55, cursor: "pointer" }}
                          />
                        </div>
                        {/* <p className="sales-content" style={{ fontSize: 14 }}>Resource Center</p> */}
                        <div>
                          <p className="sales-content" style={{ fontSize: 14 }}>
                            Resource Center
                          </p>
                        </div>
                      </div>

                      <div onClick={() => history.push("/products")}>
                        <div className="salesGuideNewStyle">
                          <img
                            src={product_icon}
                            style={{ height: 55, width: 55, cursor: "pointer" }}
                          />
                        </div>
                        {/* <p className="sales-content" style={{ fontSize: 14 }}>Product</p> */}
                        <div>
                          <p className="sales-content" style={{ fontSize: 14 }}>
                            Product
                          </p>
                        </div>
                      </div>
                      {/* <div onClick={() => history.push("/resourcecenter")}>
                        <p
                          className="sales-content"
                          style={{ height: 35, width: 130, fontSize: 14 }}
                        >
                          Resource Center
                        </p>
                      </div> */}
                    </div>
                    {/* <div className="b1-content">
                      <div onClick={() => history.push("/products")}>
                        <p
                          className="sales-content"
                          style={{ height: 35, width: 100 }}
                        >
                          Product
                        </p>
                      </div>
                      <p
                        className="sales-content"
                        style={{ height: 35, width: 130, fontSize: 14 }}
                      >
                        Need Analysis
                      </p>
                    </div>
                    <div className="b1-content">
                      <div onClick={() => history.push("/advisorpitch")}>
                        <p
                          className="sales-content"
                          style={{ height: 35, width: 200, fontSize: 14 }}
                        >
                          Advisor OnBoarding
                        </p>
                      </div>
                    </div>
                    <div className="b1-content">
                      <div onClick={() => history.push("/advisorpitch")}>
                        <p
                          className="sales-content"
                          style={{ height: 35, width: 200, fontSize: 14 }}
                        >
                          Recruitment Presentation
                        </p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </Col>
          )}

          <Col style={{ display: "none" }}>
            <div
              className=" dataCard"
              bordered="false"
              style={{ backgroundColor: "#CEA0E1" }}
            >
              <div className="card-content">
                <Link to="/birthday">
                  <div className="activity-icon">
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={birthday_img}
                      alt="Birthday"
                    />
                  </div>
                  <div className="activities-text">
                    <p className="ttile_name">Birthday</p>
                    {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '420%', margin: '-6px' }} /> */}
                    <div className="horizontalLine"></div>
                  </div>
                </Link>
                <div className="birthday-slides">
                  <Image
                    preview={false}
                    width={32}
                    height={32}
                    src={left_arrow}
                    alt="left arrow"
                  />
                  <Image
                    preview={false}
                    width={32}
                    height={32}
                    src={right_arrow}
                    alt="right arrow"
                  />
                </div>
              </div>
            </div>
          </Col>

          {/* <Col>
          <div className=" dataCard" bordered="false" style={{ backgroundColor: '#5EC0AD' }}>
            <Link to="/mappedbranches">
              <div className="card-content">
                <div className="activity-icon">
                  <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3381.png" alt="Customers" />
                </div>
                <div className="activities-text">
                  <p className='ttile_name'>Mapped Branches</p>
                  <hr style={{ backgroundColor: '#fff', height: '1px', width: '200%', margin: '-6px' }} />
                </div>
              </div>
            </Link>
            <div className="events-body">
              <Image className="stars" preview={false} src="https://pocbanca.iorta.in/assets/Actionnodata.png" alt="Events" />
              <p style={{ color: '#00ACC1', fontSize: '18px', fontWeight: "600", margin: "0 auto", width: "fit-content", paddingTop: "50%" }}>No Branches Found</p>
              <p style={{ color: '#CEA0E1', fontSize: '20px', width: "fit-content", margin: "auto" }}>No Events Exist</p>
            </div>
          </div>
        </Col> */}

          <Col style={{ display: "none" }}>
            <div
              className=" dataCard"
              bordered="false"
              style={{ backgroundColor: "#5EC0AD" }}
            >
              <Link to="/mappedbranches">
                <div className="card-content">
                  <div className="activity-icon">
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={mapped_img}
                      alt="Customers"
                    />
                  </div>
                  <div className="activities-text">
                    <p className="ttile_name">Mapped Branches</p>
                    {/* <hr style={{ backgroundColor: '#ececec', height: '1px', width: '200%', margin: '-6px' }} /> */}
                    <div className="horizontalLine"></div>
                  </div>
                </div>
              </Link>
              <div className="events-body">
                <Image
                  className="stars"
                  preview={false}
                  src={action_data_img}
                  alt="Events"
                />
                <p
                  style={{
                    color: "#00ACC1",
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "0 auto",
                    width: "fit-content",
                  }}
                >
                  No Branches Found
                </p>
              </div>
            </div>
          </Col>

          <Col style={{ display: "none" }}>
            <div
              className=" dataCard"
              bordered="false"
              style={{ backgroundColor: "#5EC0AD" }}
            >
              <Link to="/existingpartner">
                <div className="card-content">
                  <div className="activity-icon">
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={mapped_img}
                      alt="Customers"
                    />
                  </div>
                  <div className="activities-text">
                    <p className="ttile_name">Existing Partner</p>
                    {/* <hr style={{ backgroundColor: '#fff', height: '1px', width: '200%', margin: '-6px' }} /> */}
                    <div className="horizontalLine"></div>
                  </div>
                </div>
              </Link>
              <div style={{ height: "75%" }} className="events-body">
                <p
                  style={{
                    color: "#00ACC1",
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "0 auto",
                    width: "fit-content",
                    paddingTop: "50%",
                  }}
                >
                  No Branches Found
                </p>
              </div>
            </div>
          </Col>

          {/* <Col>
          <div className=" dataCard" bordered="false" style={{ backgroundColor: '#00ACC1' }}>
            <div className="card-content">
              <div className="activity-icon">
                <Image preview={false} width={55} height={55} src="https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group3375.png" alt="ToDo" />
              </div>
              <div className="activities-text">
                <p className='ttile_name'>To Do</p>
                <hr style={{ backgroundColor: '#ececec', height: '1px', width: '590%', margin: '-6px' }} />
              </div>
            </div>
            <div style={{ height: "75%" }} className="events-body">
              <p style={{ color: '#00ACC1', fontSize: '18px', fontWeight: "600", margin: "0 auto", width: "fit-content", paddingTop: "50%" }}>No Active Task</p>
            </div>
          </div>
        </Col> */}

          {/* <Col className="dummy-home-card"></Col> */}

          <Col style={{ display: "none" }}>
            <div
              className=" dataCard"
              bordered="false"
              style={{ backgroundColor: "#00ACC1" }}
            >
              <div className="card-content">
                <Link to="/renewalreport">
                  <div className="activity-icon">
                    <Image
                      preview={false}
                      width={55}
                      height={55}
                      src={reward_img}
                      alt="dashboards"
                    />
                  </div>
                  <div className="activities-text">
                    <p className="ttile_name">Dashboards</p>
                    <hr className="horizontalLine" />
                  </div>
                </Link>
                <div className="rewardscorner-text">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <Link to="/renewalreport">
                      <div
                        style={{
                          padding: "0 50px",
                          cursor: "pointer",
                          borderRight: "1px solid #fff",
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        <Image
                          preview={false}
                          width={90}
                          height={90}
                          src={contest_img}
                          alt="contests"
                          hspace="20"
                        />
                        <p>Renewal Report</p>
                      </div>
                    </Link>
                    <Link to="/salespendency">
                      <div
                        style={{
                          padding: "0 50px",
                          cursor: "pointer",
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        <Image
                          preview={false}
                          width={90}
                          height={90}
                          src={club_img}
                          alt="clubs"
                        />
                        <p>Sales Pendency</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col className="dummy-home-card"></Col>
          <Col className="dummy-home-card"></Col>
        </Row>
      </Col>
    </Fragment>
  );
};
export default HomePage;
