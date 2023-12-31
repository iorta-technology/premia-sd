import React, { useState } from "react";
import { Modal, Button, Form, Input, Radio,Popover,Row,Col } from "antd";
import {
  PlusCircleFilled,
  CalendarOutlined,
  AimOutlined,
  FileTextOutlined,
  PlusCircleOutlined
} from "@ant-design/icons";
import Moment from "moment";
import { Link, useHistory } from "react-router-dom";
import styles from "./FloatButton.module.css";
import Recruitment from "../Recuritment/Recuritment";
import { checkuserAccess, stoageGetter } from "../../helpers";
import * as actions from "../../store/actions/index";
import { useDispatch,useSelector } from "react-redux";
import axiosRequest from "../../axios-request/request.methods";
import "./FloatButton.css";
import { message } from "antd";
import lead_icon from '../../assets/Agreement_white_24dp.png';
import event_icon from '../../assets/Questinairee_white_24dp.png';
import goal_icon from '../../assets/MaterialUiIcons/gps_fixed_white_192x192.png';
import NewLead from '../StatusLead/NewLeadCreation';
import NewBroker from '../StatusLead/NewBroker';

// const logindata = stoageGetter('user')
// let id = ''
// if(logindata){
// id = logindata.id

// }

const FloatButton = React.memo(() => {
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [showBrokerModal, setShowBrokerModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isopen, setisopen] = useState(false);
  const { id, channelCode } = stoageGetter("user");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todayGoalCreated, setTodayGoalCreated] = useState({});
  const [showAreYouSure, setShowAreYouSure] = useState(false);
  const [areYouSure, setAreYouSure] = useState(false);
  const [form] = Form.useForm();
  let _storeData = useSelector((state) => state);

  const _accessActivityTracker = checkuserAccess("myEvents", _storeData.login); //Activity Tracker
  const _accessDailyBusiness = checkuserAccess("myBusiness", _storeData.login); // Daily Business
  const _accessOpportunities = checkuserAccess("myLeads", _storeData.login); // Opportunities

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

  const onChangeAreYouSure = (e) => {
    setAreYouSure(e.target.value);
  };

  const showModalGoal = async () => {
    try {
      if(showDailyBusiness){
        let res = await axiosRequest.get(
          `user/fetch_daily_activity/${id}?today_goal=true`,
          { secure: true }
        );
        setTodayGoalCreated(res);
        console.log("todayGoalCreated._id", todayGoalCreated);
      }else{
        message.info('This feature is currently not accessible');
      }
        
    } catch (error) {
      console.log(error);
    }

    setIsModalOpen(true);
  };

  const onFinish = async (values) => {
    if (showAreYouSure && areYouSure) {
      let payload = {};

      if (todayGoalCreated._id) {
        payload = {
          csmId: id,
          gpwAchived: values.gpwCommitment, // achieved
          goal_id: todayGoalCreated._id ? todayGoalCreated._id : "",
        };
      } else {
        payload = {
          csmId: id,
          gpwCommitment: values.gpwCommitment,
        };
      }

      try {
        todayGoalCreated._id
          ? await axiosRequest.put(`user/update_your_goal`, payload, {
              secure: true,
            })
          : await axiosRequest.post(`user/set_goal`, payload, { secure: true });
        setIsModalOpen(false);
        setisopen(false);
        form.resetFields();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    } else {
      setShowAreYouSure(true);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const addAGoal = () => {
    console.log("hello");
  };

  const floatButtonHandler = () => {
    setisopen(!isopen);
  };
  const open = {
    opacity: "0.8",
    transform: "scale(1)",
    transition: "all 0.1s ease-in-out",
    zIndex: "1000",
  };
  const close = {
    opacity: "0",
    transform: "scale(0)",
    transition: "all 0.1s ease-in-out",
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const addNewLead = () => {
    if(showOpportunities){

      dispatch(actions.fetchLeadUpdateBody({}))
      dispatch(actions.fetchLeadDetailsSuccess({}))
      
      // dispatch(actions.storeLead(leadUpdateFormdata));
      // history.push("/leadmasterpage/statuslead");
      history.push("/company-intelligence");
    }else{
      message.info('This feature is currently not accessible');
    }
  };
  
  const openCalendarPage = () => {
    // setIsModalVisible(true);
    showActivityTracker ? history.push("/calendar") : message.info('This feature is currently not accessible')
  };
  // const handleOpenChange = (newOpen) => {
  //   setisopen(newOpen);
  // };

  const onclick_float = () => {
    if(showOpportunities){
      setShowNewLeadModal(true)
      setisopen(false);
    }else{
      message.info('This feature is currently not accessible');
    }
    
  };

  const addNewBroker = () => {
      setShowBrokerModal(true)
      setisopen(false);
  };
  
  
  return (
    <div className={`${styles.floatBtn}`}>
      <NewLead showNewLeadModal={showNewLeadModal} setShowNewLeadModal={setShowNewLeadModal} />
      <NewBroker showBrokerModal={showBrokerModal} setShowBrokerModal={setShowBrokerModal} />
      {/* <PlusCircleFilled className={styles.icon} onClick={floatButtonHandler} /> */}
      {/* <p className={`${styles.paragraph}  ${styles.eventpg} ${styles.pgpfr}`} style={isopen ? open : close}>
        Create an Event
      </p>
      
        <div onClick={openCalendarPage} className={`${styles.floatBtn} ${styles.eventicon} ${styles.iconpfr} ${styles.floatBtnsStyle}`} style={isopen ? open : close}>
          <img src={event_icon} style={{height:25, width:25,cursor:"pointer"}}/>
        </div>
  
      <>
        <p onClick={onclick_float} className={`${styles.paragraph} ${styles.leadpg} ${styles.pgpfr}`} style={isopen ? open : close}>
          New Lead Creation
        </p>
       
        <div onClick={onclick_float} className={`${styles.floatBtn} ${styles.leadicon} ${styles.iconpfr} ${styles.floatBtnsStyle}`} style={isopen ? open : close}>
          <img src={lead_icon} style={{height:25, width:25,cursor:"pointer"}}/>
        </div>
      </> */}
     
      <div className={`${styles.floatBtn}`}>
        <Popover 
          overlayStyle={{position:'fixed'}}
          placement="topRight" 
          trigger="click"
          visible={isopen}
          content={
            <>
              <Row onClick={openCalendarPage} style={{alignItems:'center',marginBottom:10,cursor:'pointer'}}>
                <CalendarOutlined style={{fontSize:20,fontWeight:'bolder'}} />
                <Col>
                  <p style={{marginLeft:12,marginBottom:4,fontWeight:'200'}}>Create an Event</p>
                </Col>
              </Row>

              <Row onClick={onclick_float} style={{alignItems:'center',cursor:'pointer',marginBottom:10}}>
                <FileTextOutlined style={{fontSize:20,fontWeight:'bolder'}} />
                <Col>
                  <p style={{marginLeft:12,marginBottom:4,fontWeight:'200'}}>New Lead Creation</p>
                </Col>
              </Row>

              <Row onClick={addNewBroker} style={{alignItems:'center',cursor:'pointer'}}>
                <PlusCircleOutlined style={{fontSize:20,fontWeight:'bolder'}} />
                <Col>
                  <p style={{marginLeft:12,marginBottom:4,fontWeight:'200'}}>Add Producer</p>
                </Col>
              </Row>
            </>
          } 
          >
          <PlusCircleFilled className={styles.icon} onClick={floatButtonHandler} />
        </Popover>
      </div>

      {isModalVisible && <Recruitment hideModal={hideModal} />}

      <div className={isopen ? styles.open : styles.close}>
        <div className={styles.content}></div>
        <div className={styles.content}></div>
        <div className={styles.content}></div>
      </div>
    </div>
  );
});

export default FloatButton;
