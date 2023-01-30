import React, { useState, useEffect, createRef } from "react";
import useInput from "../hooks/use-input";
import "../../components/StatusLead/StatusLead.css";
import "./CompIntelligence.css";
// components/CompanyIntelligence/CompanyIntelligence.css
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Select,
  Cascader,
  DatePicker,
  Space,
  Modal,
  Table,
  TimePicker,
  Spin,
  Tabs,
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import TabsComp from "../../components/Tab/Tab";
import FloatButton from "../FloatButton/FloatButton";
import { msToDateString } from "../../helpers";
import _ from "lodash";
import { checkAgent, milToDateString } from "../../helpers";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import axiosRequest from "../../axios-request/request.methods";

import KDMDetails from "./KdmDetails";
import ProducerVAS from "./ProducerAndVAS";
import Expectation from "./Expectation";
import RiskDetails from "./RiskDetails";
import DocUpload from "./DocumentUpload";

const minimumDate = moment().format("YYYY-MM-DD");
const { TabPane } = Tabs;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const tabMenu = [
  {
    id: 1,
    value: "Opportunity Details",
  },
  {
    id: 2,
    value: "Company Intelligence",
  },
  {
    id: 3,
    value: "History",
  },
];
const CompanyIntelligence = React.memo((props) => {
  const dispatch = useDispatch();
  // const history = useHistory()
  const [form] = Form.useForm();

  // store form data
  let storeFormData = useSelector((state) => state?.newLead?.formData);
  const userTreeData = useSelector((state) => state?.home?.user_tree);

  let leadDataLoading = useSelector((state) => state.newLead.leadDataloading);
  // let payloadFormData = useSelector((state) => state.newLead.payloadFormData)
  let storeLeadId = useSelector((state) => state.newLead.leadId);

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  useEffect(() => {
    // if(userTreeData.length > 0){
    userTreeData.reporting_hierarchies.forEach((el) => {
      el.label = el.dispValue;
    });
    userTreeData.reporting_users.forEach((el) => {
      el.label = el.full_name;
      el.value = el._id;
    });
  }, []);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  const checkValidity = (data) => {
    if (data === "" || data === undefined || data === null) {
      return "";
    } else {
      return data;
    }
  };

  const tabClick = (key) => {};

  const tabStyle = {
    color: "#000",
    background: "#fff",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#f0f0f0",
    height: 220,
    width: 320,
  };

  return (
    <>
      <TabsComp tabMenu={tabMenu} header="New Lead" activeKey="2" />

      <div className="form-container ml10rem kdmStyle ">
        <Tabs
          tabBarGutter={0}
          tabPosition={width > breakpoint ? "left" : "top"}
          size={width > breakpoint ? "large" : "small"}
          tabBarStyle={tabStyle}
          onTabClick={tabClick}
          defaultActiveKey={1}
        >
          <TabPane key="1" tab="Key Decison Makers ( KDM ) Details">
            <KDMDetails />
          </TabPane>
          <TabPane key="2" tab="Risk Details">
            <RiskDetails />
          </TabPane>
          <TabPane key="3" tab="Producer and VAS">
            <ProducerVAS />
          </TabPane>
          <TabPane key="4" tab="Expectation">
            <Expectation />
          </TabPane>
          <TabPane key="5" tab="Document Upload">
            <DocUpload />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
});

export default CompanyIntelligence;
