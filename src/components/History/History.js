import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Steps, Timeline, Divider, Image, Tabs, Card } from "antd";

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
import actionNoData from "../../assets/Actionnodata.png";

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
  // {
  //   id: 1,
  //   value: "Opportunity Details",
  // },
  {
    id: 1,
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
    id: 2,
    value: "History",
  },
];

const History = () => {
  const data = useSelector((state) => state?.newLead?.formData?._id);
  const leadId = useSelector((state) => state.newLead.leadId);
  const userId = useSelector((state) => state.newLead.userId);
  const leadArrObject = useSelector((state) => state.history.leadData);
  let storeFormData = useSelector((state) => state?.newLead?.formData);
  const appointmentArrObject = useSelector(
    (state) => state.history.appointmentData
  );
  const dispatch = useDispatch();

  console.log("data ===== ", data);

  const proposalArrObject = useSelector((state) => state.history.proposalData);
  const historyLeadData = useSelector((state) => state.history.leadData);
  const appointmentData = useSelector((state) => state.history.appointmentData);
  console.log("histrory data ---------------- ", historyLeadData);

  useEffect(() => {
    dispatch(actions.fetchHistory(leadId, userId));
  }, [dispatch]);

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

  const NoRecords = () => {
    return (
      <Col
        className="form-body ci-p20 mb-2"
        xs={24}
        sm={24}
        md={16}
        lg={15}
        xl={20}
        span={23}
      >
        <Card className="card" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img src={actionNoData} />
            <p
              style={{
                fontFamily: "roboto",
                fontWeight: 600,
                color: "#01b4bb",
                fontSize: "22px",
              }}
            >
              No Records Found!
            </p>
          </div>
        </Card>
      </Col>
    );
  };

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

        {historyLeadData &&
          historyLeadData?.map((res) => (
            <div className="notification_box ps-4 mb-3">
              <div className="notification_data_hist">
                <div className="py-4 px-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div style={{ fontWeight: "700" }}>{res?.title}</div>
                    <div className="text-secondary text-end">
                      {res?.userId?.first_name + " " + res?.userId?.last_name}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="text-secondary">{res?.description}</div>
                    <div className="text-end">
                      {new Date(res?.created_at).toLocaleString("en-US")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Col>
    </>
  );

  return (
    <>
      <TabsComp
        tabMenu={tabMenu}
        header={storeFormData && storeFormData._id ? "Update Lead" : "New Lead"}
        activeKey="2"
        statusLeadData={storeFormData}
      />

      <div className="form-container kdmStyle d-flex justify-content-center">
        {historyLeadData && historyLeadData.length > 0 ? (
          <Leads />
        ) : (
          <NoRecords />
        )}
      </div>
    </>
  );
};

export default History;
