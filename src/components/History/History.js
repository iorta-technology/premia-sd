import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Steps, Timeline, Divider, Image, Tabs } from "antd";

import "./History.css";
import "../StatusLead/StatusLead.css";
import TabsComp from "../../components/Tab/Tab";
// import '../LeadDetails/LeadDetailsTab.css'
import MTabs from "../../components/Tab/Tab";
import HistoryTabs from "./HistoryTabs";
// import * as actions from '../../store/actions/index';
import * as actions from "../../store/actions/history";
import _ from "lodash";
import { dataFormatting } from "../../helpers";
import axiosRequest from "../../axios-request/request.methods";

const { Step } = Steps;
const breakpoint = 620;
const tabStyle = {
  color: "#000",
  background: "#fff",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "#f0f0f0",
  width: 320,
};

let historyRoute = "/leadmasterpage/leadhistorymaster/leadhistory";
const tabMenu = [
  {
    id: 1,
    value: "Opportunity Details",
  },
  {
    id: 2,
    value: "Company Intelligence",
  },
  // {
  //   id: 3,
  //   value: "Proposal Details"
  // },
  // {
  //   id: 4,
  //   value: "Documents Upload"
  // },
  {
    id: 3,
    value: "History",
  },
];

const History = () => {
  const storeLeadId = useSelector((state) => state.newLead.leadId);
  const storeUserId = useSelector((state) => state.newLead.userId);
  const leadArrObject = useSelector((state) => state.history.leadData);
  const appointmentArrObject = useSelector(
    (state) => state.history.appointmentData
  );
  const proposalArrObject = useSelector((state) => state.history.proposalData);

  const hist = useSelector((state) => state.history);
  console.log("histrory datta--- ", hist);

  const [leadId, setleadId] = useState(storeLeadId);
  const [userId, setuserId] = useState(storeUserId);
  const dispatch = useDispatch();

  let { innerWidth: width, innerHeight: height } = window;
  const { TabPane } = Tabs;
  const [tabPosition, setTabPosition] = useState(
    width <= "374"
      ? "top"
      : width <= "424"
      ? "top"
      : width <= "767"
      ? "top"
      : width <= "1023"
      ? "top"
      : "left"
  );

  const Leads = () => (
    <>
      <Col
        className="form-body ci-p20 mb-2"
        xs={24}
        sm={24}
        md={16}
        lg={15}
        xl={20}
        span={23}
      >
        <h1 class="form-title mb-4">Lead Data</h1>
        <div className="notification_box ps-4 mb-3">
          <div className="notification_data">
            <div className="py-4 px-3">
              <div className="d-flex justify-content-between align-items-center">
                <div style={{ fontWeight: "700" }}>New Lead Created</div>
                <div className="text-secondary text-end">Sachin</div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="text-secondary">K k 989344506</div>
                <div className="text-end">1/02/2021, 5:03:35 PM</div>
              </div>
            </div>
          </div>
        </div>
        <div className="notification_box ps-4 mb-3">
          <div className="notification_data">
            <div className="py-4 px-3">
              <div className="d-flex justify-content-between align-items-center">
                <div style={{ fontWeight: "700" }}>New Lead Created</div>
                <div className="text-secondary text-end">Sachin</div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="text-secondary">K k 989344506</div>
                <div className="text-end">1/02/2021, 5:03:35 PM</div>
              </div>
            </div>
          </div>
        </div>
        <div className="notification_box ps-4 mb-3">
          <div className="notification_data">
            <div className="py-4 px-3">
              <div className="d-flex justify-content-between align-items-center">
                <div style={{ fontWeight: "700" }}>New Lead Created</div>
                <div className="text-secondary text-end">Sachin</div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="text-secondary">K k 989344506</div>
                <div className="text-end">1/02/2021, 5:03:35 PM</div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </>
  );

  useEffect(() => {
    dispatch(actions.fetchHistory(leadId, userId));
  }, [dispatch]);

  return (
    <>
      <TabsComp tabMenu={tabMenu} header="New Lead" activeKey="1" />

      <div className="form-container ml10rem kdmStyle ">
        <Tabs
          tabBarGutter={0}
          tabPosition={width > breakpoint ? "left" : "top"}
          size={width > breakpoint ? "large" : "small"}
          tabBarStyle={tabStyle}
          defaultActiveKey={1}
        >
          <TabPane key="1" tab="Lead">
            <Leads />
          </TabPane>
          <TabPane key="2" tab="Appointment">
            <Leads />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default History;

//   <Row gutter={["", 20]} justify="center">
//     <Col className="form-body" xs={22} sm={24} md={16} lg={16} xl={16}>
//       <div className="proposal">
//         <div className="bg-norecord"></div>
//         <p className="norecord-title">No Records Found 123</p>
//       </div>
//     </Col>
//   </Row>
