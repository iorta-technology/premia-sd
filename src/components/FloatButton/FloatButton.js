import React, { useState } from "react";
import { Modal, Button, Form, Input, Radio } from "antd";
import {
  PlusCircleFilled,
  CalendarOutlined,
  AimOutlined,
  FileTextOutlined,
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

// const logindata = stoageGetter('user')
// let id = ''
// if(logindata){
// id = logindata.id

// }

const FloatButton = React.memo(() => {
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
      const formData = {
        // statusLeadData: {
        leadStatus: "",
        leadDisposition: "",
        leadsubDisposition: "",
        appointment_status: "",
        appointmentdisPosition: "",
        appointmentsubdisPosition: "",
        lead_Owner_Id: "",
        // user_id: id,
        lead_Id: "",
        lead_Creator_Id: "",
        start_date: "",
        start_time: "",
        remarksfromSource: "",
        remarksfromUser: "",
        teamMembers: "",
        productId: "",
        proposalId: "",
        leadSource: "",
        LeadType: "",
        Product: "",
        Insurance_Company: "",
        // },
        // personalLeadData: {
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        maritalStatus: "",
        childStatus: "",
        ChildInfo: [],
        // },
        // contactLeadData: {
        primaryMobile: "",
        state: "",
        city: "",
        email: "",
        address: {
          line1: "",
          line2: "",
          line3: "",
        },
        country: "",
        pincode: "",
        secondaryMobile: "",
        landlineNo: "",
        socialSecurityAdharNo: "",
        mailingAddressStatus: "",
        mailingAddressSecond: {
          mailingaddress: {
            line1: "",
            line2: "",
            line3: "",
          },
          state: "",
          city: "",
          country: "",
          pincode: "",
          // user_Id:id,
        },
        HaveLifeInsurance: {
          ExistHealthInsur: "",
          ExistInsur: "",
        },
        HaveLifeInsurance_details: [],
        Insurancedetails: [],
        //professional data
        education: "",
        professionType: "",
        incomeGroup: "",
      };
      dispatch(actions.storeLead(formData));
      history.push("/leadmasterpage/statuslead");
    }else{
      message.info('This feature is currently not accessible');
    }
  };
  
  const openCalendarPage = () => {
    // setIsModalVisible(true);
    showActivityTracker ? history.push("/calendar") : message.info('This feature is currently not accessible')
  };
  return (
    <>
      <Modal
        title="GOAL PLAINING"
        centered
        visible={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        className="GoalModal"
      >
        <div className="modal-body">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #dbdbdb",
              paddingBottom: "10px",
              marginBottom: "10px",
            }}
          >
            <CalendarOutlined
              style={{
                fontSize: "19px",
                color: "#00acc1",
              }}
            />{" "}
            <div>
              Activity Goals for{" "}
              <span
                style={{
                  color: "#00acc1",
                  fontWeight: "bolder",
                }}
              >
                {Moment().format("MMM DD YYYY")}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              fontWeight: "bolder",
            }}
          >
            <div>GWP</div>
            <div>
              {todayGoalCreated._id
                ? `Commitment : ${todayGoalCreated.am.gpwCommitment}`
                : ""}
            </div>
          </div>

          <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="gpwCommitment"
              rules={[
                {
                  required: true,
                  message: "The Field is Required",
                },
                {
                  pattern: new RegExp("^[0-9]*$"),
                  message: "The Fields Should be numbers",
                },
              ]}
            >
              <Input maxLength={6} />
            </Form.Item>
            {showAreYouSure && (
              <Form.Item
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#00acc0",
                }}
              >
                Are you sure
                <Radio.Group
                  style={{ marginLeft: "10px" }}
                  onChange={onChangeAreYouSure}
                  value={areYouSure}
                >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </Form.Item>
            )}
            <Form.Item
              style={{
                marginBottom: 0,
              }}
            >
              <Button
                style={{
                  margin: "0 auto",
                  padding: "8px 35px",
                  background: "#e46a25",
                  border: "1px solid #e46a25",
                  boxShadow: "0px 5px 7px #00000029",
                }}
                type="primary"
                htmlType="submit"
              >
                {todayGoalCreated._id ? "Update" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      <PlusCircleFilled className={styles.icon} onClick={floatButtonHandler} />
      <p
        className={`${styles.paragraph}  ${styles.eventpg} ${styles.pgpfr}`}
        style={isopen ? open : close}
      >
        Create an Event
      </p>
      {/* <Link to="/calendar"> */}
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<CalendarOutlined />}
          className={`${styles.eventicon} ${styles.iconpfr}`}
          style={isopen ? open : close}
          onClick={openCalendarPage}
        />
      {/* </Link> */}
      <p
        className={`${styles.paragraph}  ${styles.goalpg} ${styles.pgpfr}`}
        style={isopen ? open : close}
      >
        Add Daily Goals
      </p>
      <Button
        onClick={showModalGoal}
        type="primary"
        shape="circle"
        size="large"
        icon={<AimOutlined />}
        className={`${styles.goalicon} ${styles.iconpfr}`}
        style={isopen ? open : close}
      />

      <>
        <p
          className={`${styles.paragraph}  ${styles.leadpg} ${styles.pgpfr}`}
          style={isopen ? open : close}
        >
          New Lead Creation
        </p>
        {/* <Link to="/leadmasterpage/statuslead"> */}
          <Button
            onClick={addNewLead}
            type="primary"
            shape="circle"
            size="large"
            icon={<FileTextOutlined />}
            className={`${styles.leadicon} ${styles.iconpfr}`}
            style={isopen ? open : close}
          />
        {/* </Link> */}
      </>
      {/* <p className={`${styles.paragraph}  ${styles.recuirementpg} ${styles.pgpfr}`} style={isopen?open:close}>New Recruitment</p> */}
      {/* <Button onClick={showModal} type="primary" shape="circle" size="large" icon={<FileTextOutlined />} className={`${styles.newrecuirement} ${styles.iconpfr}`} style={isopen?open:close}/> */}

      {isModalVisible && <Recruitment hideModal={hideModal} />}

      <div className={isopen ? styles.open : styles.close}>
        <div className={styles.content}></div>
        <div className={styles.content}></div>
        <div className={styles.content}></div>
      </div>
    </>
  );
});

export default FloatButton;
