import React, { useState, useEffect, createRef, useRef } from "react";
import "../../components/StatusLead/StatusLead.css";
// import "./rhs.css";
import "../../components/Tab/Tab.css"
// import page from "./icons/page.svg"
// import eye from "./icons/Eye.svg";
// import Trash from "./icons/Trash.svg";
// import "./CompIntelligence.css";
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Select,
  Modal,
  Avatar,
  Tabs,
  Card,
  Collapse,
  Tooltip,
  message,
  Badge,
} from "antd";
import {
  no_contactItems,
  leadStatusItems,
  appointmentTimeOptions,
  contactItems,
} from "../StatusLead/dataSet";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import TabsComp from "../../components/Tab/Tab";
import _ from "lodash";
import { doSentenceCase } from "../../helpers";
import moment from "moment";
import axiosRequest from "../../axios-request/request.methods";
import {
  FormOutlined,
  PlusCircleOutlined,
  UploadOutlined,
  CalendarOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import TodoTab from "../Scheduler/RightSide-Todo/TodoCreate-Tab/Todo-Tab";
// import TodoCards from "../Activitity Tracker/RightSide-Todo/Todo-Event-Cards/TodoCards";
import TodoCards from "../Scheduler/RightSide-Todo/Todo-Event-Cards/TodoCards";
import noDataIcon from "../../assets/NoDataFound.png";
import { timeList } from "../StatusLead/dataSet";
import PremiumCard from "./PremiumCard";

// import KDMDetails from "./KdmDetails";
// import ProducerVAS from "./ProducerAndVAS";
// import Expectation from "./Expectation";
// import RiskDetails from "./RiskDetails";
// import DocUpload from "./DocumentUpload";
// import RemarkComp from "./RemarksModal";
// import OpportunityStatus from "./OpportunityStatusModal";
import axios from "axios";
// import ShowPdf from "./ShowPdf";
import apiConfig from "../../config/api.config";
import Lapsed from "./Lapsed";
import Maturity from "./Maturity";
import { useParams } from "react-router-dom";
const { baseURL, auth, secure, NODE_ENV } = apiConfig;
// import { Document, Page } from 'react-pdf';

const minimumDate = moment().format("YYYY-MM-DD");
const { TabPane } = Tabs;
const { Option } = Select;
const { Panel } = Collapse;
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
    value: "Plan Details",
  },
  {
    id: 2,
    value: "Agent Details",
  },
  {
    id: 3,
    value: "Maturity Benefit",
  },
  {
    id: 4,
    value: "Plan Termination",
  },

  {
    id: 5,
    value: "Enhance Availment Benefit",
  },
  {
    id: 6,
    value: "Insurance Claims",
  },
  {
    id: 7,
    value: "Cash Loan",
  },
];
const PlanDetailsComponent = React.memo((props) => {
  const dispatch = useDispatch();
  const childRef = useRef(null);
  const { pol_id, sys_id } = useParams();
  console.log("policy_id_params=================", pol_id, sys_id);
  // const [form] = Form.useForm();
  // console.warn("COMPPP____PROPSS", props?.location?.state?.leadData);
  let storeFormData = useSelector(
    (state) => state?.login?.loginDetails?.userName
  );
  const loginId = useSelector((state) => state?.login?.user?.id);
  const loggedInUserToken = useSelector((state) => state?.login?.token);
  const userTreeData = useSelector((state) => state?.home?.user_tree);
  const _reportManager = useSelector((state) => state?.login?.reportingManager);

  // plandetails data start
  const allPlanDetailsInfo = useSelector(
    (state) => state?.planInfo?.planData?.planDetails?.P_LOP_PLAN_DTLS
  );
  console.log("line 126", allPlanDetailsInfo);

  // plandetails data end
  const [width, setWidth] = useState(window.innerWidth);
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [riskInd, setRiskInd] = useState(null);
  const [showVasModal, setShowVasModal] = useState(false);
  const [showExpectationModal, setShowExpectationModal] = useState(false);
  const [showKdmModal, setShowKdmModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [showDocumntModal, setShowDocumntModal] = useState(false);
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [showCollabortrModal, setShowCollabortrModal] = useState(false);
  const [showOpportunityModal, setShowOpportunityModal] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [updateLeadID, setUpdateLeadID] = useState("");
  const [kdmType, setKdmType] = useState("");
  const [riskType, setRiskType] = useState("");
  const [reamrkDataArr, setreamrkDataArr] = useState([]);
  const [teamDataArr, setTeamDataArr] = useState([]);

  const [companyDetails, setCompanyDetails] = useState({});
  const [opportunityDetails, setOpportunityDetails] = useState({});
  const [producerVasDetails, setProducerVasDetails] = useState({});
  const [expectationDetails, setExpectationDetails] = useState({});
  const [riskDetailsArr, setRiskDetailsArr] = useState([]);
  const [kdmDetailsArr, setKdmDetailsArr] = useState([]);
  const [kdmDataSet, setKdmDataSet] = useState({});
  const [riskDataSet, setriskDataSet] = useState({});
  const [activities_data, setActivities_data] = useState([]);
  const [fileData, setFileData] = useState([]);
  // const [showFile, setShowFile] = useState(false);
  const [leadDisposition, setleadDisposition] = useState("");
  const [subLeadDisposition, setsubLeadDisposition] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadId, setLeadId] = useState("");
  const [fileIndex, setFileIndex] = useState(0);
  const [fileUrl, setFileUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [PdfId, setPdfId] = useState("");

  // const [policy_list, setPolicy_list] = useState(false);

  let _teamMember = [];
  const callback = (data) => {
    // console.log(data, "this is the pdf data");
    setFileData(data);
  };

  // useEffect(() => {
  //   console.log(fileData)
  // }, [fileData]);
  const delDoc = (data, ind) => {
    let newArr = [...fileData];
    newArr.splice(ind, 1);
    setFileData([...newArr]);
    const headers = { Authorization: `Bearer ${loggedInUserToken}` };
    axios
      .delete(
        `${baseURL}secure/user/delete_documents?userId=${loginId}&docId=${data._id}`,
        { headers }
      )
      .then((res) => {
        // console.warn("(((( DELETEEEEE  )))) ====>>>",res)
        if (res.data.errCode === -1) {
          dispatch(actions.fetchLeadDetails(storeFormData._id));
          message.success("Document Deleted Successfully");
        }
      });
  };
  const showModal = () => {
    console.log("clicked on th eye");
    // setFileUrl(fileData[index].location || fileData[index].url);
    // console.log(fileData[index].---- || fileData[index].url);
    setIsModalOpen(!isModalOpen);
    console.log(isModalOpen);
  };
  // const [active, setActive] = useState(null)
  const [activeKdm, setActiveKdm] = useState(null);

  const breakpoint = 620;

  const panelStyle = {
    marginBottom: 10,
    background: "#f7f7f7",
    borderRadius: 5,
  };

  const eventCardStyle = {
    marginBottom: 10,
    background: "#cea0e1",
    borderRadius: 5,
    padding: 10,
    // border: '1px solid #ccc',
  };

  useEffect(() => {
    dispatch(actions.headerName("New Lead"));
    console.warn("storeFormData--------->>>>>", storeFormData);
    loadValuesToFields(storeFormData);
    // getAppointmentList(storeFormData._id);
    setLeadId(storeFormData._id);
    setPdfId(storeFormData?._id);
    // opprtunityStatusData()
  }, [storeFormData]);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  // const getAppointmentList = async (lead_id) => {
  //   // setUpdateLeadID(lead_id)
  //   let _result = await axiosRequest.get(
  //     `user/fetch_appointments/${loginId}?teamdata=0&category=all&lead_id=${lead_id}`,
  //     { secure: true }
  //   );
  //   // console.log('APPOINTMENT DATA---->>>', _result)
  //   setActivities_data(_result);
  // };

  useEffect(() => {
    console.log(reamrkDataArr, "this is the remarks");
  }, [storeFormData]);

  const loadValuesToFields = (leadData) => {
    try {
      console.warn("__++++++++++++++ leadData +++++++++++>>", leadData);
      setUpdateLeadID(leadData?._id);
      setCompanyDetails(leadData?.company_id);
      // Setting Company name header
      dispatch(
        actions.headerName(leadData?.company_id?.company_name.toUpperCase())
      );
      let _appntDate = "";
      let _appntTime = "";

      // Setting Opportunity data
      if (leadData?.appointmentDate) {
        let redable_date = new Date(leadData?.appointmentDate)
          .toLocaleString("en-US", { timeZone: "UTC" })
          .split(",");
        _appntDate = redable_date[0];
        let _appTime = redable_date[1].trim().split(":");
        let _appTimeAm = _appTime[2].split(" ");

        _appntTime = `${_appTime[0]}:${_appTime[1]} ${_appTimeAm[1]}`;
      }

      let _opportunity = {
        appointmentDate: leadData?.appointmentDate,
        appointmentDetails: leadData?.appointmentDetails,
        appointmentId: leadData?.appointmentId,
        appointmentTime: _appntTime,
        appoint_Date: _appntDate,
        leadStatus: leadData?.leadStatus,
        leadStatusLabel: opprtunityStatusData(leadData?.leadStatus),
        leadDisposition: leadData?.leadDisposition,
        leadDispositionLabel: opprtunityStatusData(leadData?.leadDisposition),
        leadsubDisposition: leadData?.leadsubDisposition,
        appointment_status: leadData?.appointment_status,
      };
      setleadDisposition(leadData?.leadDisposition);
      setsubLeadDisposition(leadData?.leadsubDisposition);
      console.warn("this is the opportunity details", _opportunity);
      setOpportunityDetails(_opportunity);

      // Setting PRODUCER & VAS data
      let _vas = {
        VAS_executed: leadData?.VAS_executed,
        VAS_input: leadData?.VAS_input,
        channel_name: leadData?.channel_name,
        producer: leadData?.producer,
      };
      setProducerVasDetails(_vas);

      // Setting EXPECTATION data
      let _expectation = {
        client_expectations: leadData?.client_expectations,
        red_flags: leadData?.red_flags,
        our_ask: leadData?.our_ask,
      };
      setExpectationDetails(_expectation);

      let total_entities = [];
      leadData?.risk_details?.map((item, index) => {
        if (item?.total_entities) {
          total_entities.push(item);
        }
      });
      setRiskDetailsArr(total_entities);

      let decisionMakerName = [];
      leadData?.company_id?.kdm_details?.map((item, index) => {
        if (item?.decision_maker_name) {
          decisionMakerName.push(item);
          item.kdmTabs = `KDM ${index + 1}`;
        }
      });
      console.log("decision maker name", decisionMakerName);
      setKdmDetailsArr(decisionMakerName);

      if (leadData?.company_id?.kdm_details?.length > 0)
        handleKdmTabs(leadData?.company_id?.kdm_details[0]);

      var newArr = leadData?.documents?.map((res) => ({
        ...res,
        recent: false,
      }));
      setFileData(newArr);

      setreamrkDataArr(leadData.remarks);
      // console.log('remarks data---------------------->',leadData.remarks);

      let _teamData = leadData?.teamMembers
        ? JSON.parse(leadData?.teamMembers)
        : [];
      // console.log('teamDataArr------------->>>',teamDataArr)
      // setTeamDataArr(_teamData);

      userTreeData.reporting_users.map((el) => {
        let sortarray = {
          FullName: el.full_name,
          ShortId: el.employeeCode,
          firstname: el.first_name,
          lastname: el.last_name,
          employecode: el.employeeCode,
          designation: el.hierarchyName,
          _Id: el._id,
          value:
            doSentenceCase(el.full_name) + " " + "(" + el.hierarchyName + ")",
        };
        _teamMember.push(sortarray);
        sortarray = {};
      });
      let _finalData = [..._teamMember, _reportManager];
      // console.log('_finalData------CIII------->>>',_finalData)
      let _data = _finalData.filter((el) =>
        _teamData.some((event) => el._Id === event.Id)
      );

      setTeamDataArr(_data);
      // console.log('_data------CIII------->>>',_data)
    } catch (err) {
      console.log("__++++++++++++++ err +++++++++++>>", err);
    }
  };

  const opprtunityStatusData = (event) => {
    let _dataObj = [...no_contactItems, ...leadStatusItems, ...contactItems];
    let _data = _dataObj.filter((el) => el.value === event);
    return _data[0]?.label;
  };

  const dateFun = (time) => {
    let finalTimeobj = timeList.filter((item) => {
      return item.value == time;
    });
    let finalTime = finalTimeobj[0]?.dispValue;
    return finalTime;
  };

  const add3Dots = (string, limit) => {
    var dots = "...";
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
    return string;
  };

  const openProdVasModal = () => {
    setShowVasModal(true);
  };
  const openKDMModal = (event) => {
    // if(event === 'create') setKdmDataSet({})
    // const [kdmType, setKdmType] = useState("");
    if (event === "create") {
      if (kdmDetailsArr?.length >= 4) {
        message.info("Only 4 KDM's can be Added");
      } else {
        setKdmType(event);
        setShowKdmModal(true);
      }
    } else {
      setKdmType(event);
      setShowKdmModal(true);
    }
  };
  const openExpectationModal = () => {
    setShowExpectationModal(true);
  };

  const openRiskModal = (event, data, index) => {
    if (riskDetailsArr?.length >= 10) {
      message.info("Only 10 Risk Details can be Added");
    } else {
      setShowRiskModal(true);
      setRiskType(event);
      setriskDataSet(data);
    }
  };

  const openRemarkModal = () => {
    setShowRemarkModal(true);
  };
  const openCollabModal = () => {
    setShowCollabortrModal(true);
  };

  const deleteRiskData = async (data, index) => {
    // console.log('loggedInUser DATA---->>>', loggedInUserToken)
    const headers = { Authorization: `Bearer ${loggedInUserToken}` };
    axios
      .delete(
        `${baseURL}secure/user/deleteRiskDetails?userId=${loginId}&lead_Id=${storeFormData.lead_Id}&riskId=${data?._id}`,
        { headers }
      )
      .then((res) => {
        // console.warn("(((( DELETEEEEE  )))) ====>>>",res)
        if (res.data.errCode === -1) {
          dispatch(actions.fetchLeadDetails(storeFormData._id));
          message.success("Risk Details Deleted Successfully");
        }
      });
  };

  const deleteKdmData = async (data, index) => {
    // console.log('data DATA---->>>', data)
    // secure/user/deletekdmDetails?userId=63dce7c80ae6868961079fe6&kdmId=64786ff0cac6fc279ab38cc6
    const headers = { Authorization: `Bearer ${loggedInUserToken}` };
    axios
      .delete(
        `${baseURL}secure/user/deletekdmDetails?userId=${loginId}&kdmId=${activeKdm}`,
        { headers }
      )
      .then((res) => {
        // console.warn("(((( DELETEEEEE  )))) ====>>>",res)
        if (res.data.errCode === -1) {
          dispatch(actions.fetchLeadDetails(storeFormData._id));
          message.success("KDM Details Deleted Successfully");
        }
      });
  };

  const openDocumentModal = () => {
    setShowDocumntModal(true);
  };

  const handleKdmTabs = (event) => {
    // console.log('handleKdmTabs -------->>>',event)
    setActiveKdm(event._id);
    // const [activeKdm, setActiveKdm] = useState(null)
    setKdmDataSet(event);
    // const [kdmDataSet, setKdmDataSet] = useState({});
  };

  const getTodo = () => {
    childRef.current.getTodoData(0);
    // getEventTodoCountAPI(res.formData._id);
  };

  const handleCollapse = (event, data, ind) => {
    setRiskInd(ind);
    // console.log('data--------->>>>',data)
    // console.log('ind--------->>>>',ind)
    // const [riskInd, setRiskInd] = useState(null);
    // const [showEditBtn, setShowEditBtn] = useState(false);
    !event ? setShowEditBtn(false) : setShowEditBtn(true);
  };

  const kdmTabSwitch = (activeKey) => {};

  const remarkCollabChange = (key) => {
    // console.log('remarkCollabChange',key);
  };

  const checkValidity = (data) => {
    if (data === "" || data === undefined || data === null) {
      return "-";
    } else {
      return data;
    }
  };

  return (
    <>
      {/* <Row gutter={16} style={{ margin: "0", padding: 0 }}>
        <Col> */}
      <TabsComp
        tabMenu={tabMenu}
        // header={storeFormData && storeFormData._id ? "Update Lead" : "New Lead"}
        // id={PdfId}
        header={companyDetails?.company_name?.toUpperCase()}
        activeKey="1"
        statusLeadData={storeFormData}
      />
      {/* </Col>
      </Row> */}
      <div className="plan_details_body mb-4" style={{ marginTop: 11 }}>
        <Row gutter={22} className="mb-5">
          {/* 1st Column */}
          <Col sm={24} md={18} lg={18} xlg={8} className="mb-5">
            {/* Company Details */}
            <p className="tab_title">Plan Details</p>
            {allPlanDetailsInfo?.length > 0 &&
              allPlanDetailsInfo?.map((item, index) => {
                return (
                  <>
                    <Card
                      key={item.index}
                      bordered={false}
                      className="app-card-head rounded mb-3"
                    >
                      <Col>
                        <Row
                          className="plan_details_card1"
                          style={{ marginBottom: 24 }}
                        >
                          <Col style={{ flex: 1 }}>
                            <div className="text-font mb-1">{item.POL_NO}</div>
                            <div className="label-font">Plan Number</div>
                          </Col>

                          <Col style={{ flex: 1 }}>
                            <div className="text-font mb-1">
                              {item.CUST_NAME}
                            </div>
                            <div className="label-font">Plan Holder</div>
                          </Col>
                        </Row>
                        <Row className="plan_details_card1">
                          <Col style={{ flex: 1 }}>
                            <div className="text-font mb-1">
                              {item.PROD_PORTAL_DESC}
                            </div>
                            <div className="label-font">Product</div>
                          </Col>

                          <Col style={{ flex: 1 }}>
                            <div
                              className="text-font mb-1 status-active"
                              style={{
                                color:
                                  // item.POL_ADDL_STATUS === "Active" ? "#01AB4F" :
                                  item.POL_ADDL_STATUS_DESC === "Matured"
                                    ? "#85e1ab"
                                    : item.POL_ADDL_STATUS_DESC ===
                                      "Lapsed - Cancelled"
                                    ? "#ed8181"
                                    : "#01AB4F",
                              }}
                            >
                              {item.POL_ADDL_STATUS_DESC}
                            </div>
                            <div className="label-font">Status</div>
                          </Col>
                        </Row>
                      </Col>
                    </Card>

                      <Card
                        bordered={false}
                        className="app-card-head rounded mb-3"
                      >
                        <Col>
                          <Row style={{ marginBottom: 24 }}>
                            <Col style={{ flex: 1 }}>
                              <div className="text-font mb-1">
                                {item.POL_LC_PRENEED_PRICE
                                  ? item.POL_LC_PRENEED_PRICE
                                  : "000"}
                              </div>
                              <div className="label-font">Contact Price</div>
                            </Col>

                          <Col style={{ flex: 1 }}>
                            <div className="text-font mb-1">
                              {item.POL_EFFECTIVE_DATE
                                ? moment(item.POL_EFFECTIVE_DATE).format(
                                    "MMM DD, YYYY"
                                  )
                                : "--"}
                            </div>
                            <div className="label-font">Effective date</div>
                          </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }}>
                          <Col style={{ flex: 1 }}>
                            <div className="text-font mb-1">
                              {item.POL_PREM_PAY_YRS} Years
                            </div>
                            <div className="label-font">Payment Term</div>
                          </Col>

                          <Col style={{ flex: 1 }}>
                            <div className="text-font mb-1">
                              {item.INST_AVAIL_DT
                                ? moment(item.INST_AVAIL_DT).format(
                                    "MMM DD, YYYY"
                                  )
                                : "--"}
                            </div>
                            <div className="label-font">
                              Initial Availment Date
                            </div>
                          </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }}>
                          <Col style={{ flex: 1 }}>
                            <div className="text-font mb-1">
                              {item.POL_PREM_PAY_YRS} Years
                            </div>
                            <div className="label-font">Payment Term</div>
                          </Col>

                          <Col style={{ flex: 1 }}>
                            <div className="text-font mb-1">
                              {item?.POL_MODE_OF_PYMT
                                ? item.POL_MODE_OF_PYMT
                                : "--"}
                            </div>
                            <div className="label-font">Payment Mode</div>
                          </Col>
                        </Row>
                        <Row>
                          <Col style={{ flex: 1 }}>
                            <div className="text-font mb-1">
                              {item.POL_PREM_PAY_YRS} Years
                            </div>
                            <div className="label-font">Package</div>
                          </Col>

                          <Col style={{ flex: 1 }}>
                            <div className="text-font mb-1">
                              {item?.POL_MATURED_DATE
                                ? moment(item.POL_MATURED_DATE).format(
                                    "MMM DD, YYY"
                                  )
                                : "--"}
                            </div>
                            <div className="label-font">
                              Full Availment / Maturity Date
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Card>

                      {/* end */}
                      {/* 3 card */}
                      <Card
                        bordered={false}
                        className="app-card-head rounded mb-4"
                      >
                        <Col>
                          <Row style={{ marginBottom: 24 }}>
                            <Col style={{ flex: 1 }}>
                              <div className="text-font mb-1">
                                {item?.POL_LC_SUM_ASSURED
                                  ? item.POL_LC_SUM_ASSURED
                                  : "--"}
                              </div>
                              <div className="label-font">
                                Total Installment Amount
                              </div>
                            </Col>

                          <Col style={{ flex: 1 }}>
                            <div className="text-font mb-1">
                              {" "}
                              {item?.POL_LC_PRENEED_PRICE
                                ? item.POL_LC_PRENEED_PRICE
                                : "--"}
                            </div>
                            <div className="label-font">Installment Amount</div>
                          </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }}>
                          <Col style={{ flex: 1 }}>
                            <div className="text-font mb-1">
                              {item?.VAT ? item.VAT : "--"}
                            </div>
                            <div className="label-font">Installment VAT</div>
                          </Col>

                          <Col style={{ flex: 1 }}>
                            <div className="text-font mb-1">
                              {item?.POL_DST ? item.POL_DST : "--"}
                            </div>
                            <div className="label-font">
                              Documentary Stamp Tax (DST)
                            </div>
                          </Col>
                        </Row>
                        <Row style={{ marginBottom: 24 }}>
                          <Col style={{ flex: 1 }}>
                            <div className="text-font mb-1">
                              {item.POL_PREM_PAY_YRS} Years
                            </div>
                            <div className="label-font">Payment Term</div>
                          </Col>

                          <Col style={{ flex: 1 }}>
                            <div className="text-font mb-1">
                              {item?.POL_MODE_OF_PYMT
                                ? item.POL_MODE_OF_PYMT
                                : "--"}
                            </div>
                            <div className="label-font">Payment Mode</div>
                          </Col>
                        </Row>
                        <Row>
                          <Col style={{ flex: 1 }}>
                            <div className="text-font mb-1">
                              {item?.POL_EXPIRY_DT
                                ? moment(item.POL_EXPIRY_DT).format(
                                    "MMM DD, YYYY"
                                  )
                                : "--"}
                            </div>
                            <div className="label-font">Last Payment Due</div>
                          </Col>

                          <Col style={{ flex: 1 }}>
                            <div className="text-font mb-1">
                              {item?.POL_LAST_PAYOUT_DT
                                ? moment(item.POL_LAST_PAYOUT_DT).format(
                                    "MMM DD, YYYY"
                                  )
                                : "--"}
                            </div>
                            <div className="label-font">Next Payment Due</div>
                          </Col>
                        </Row>
                      </Col>
                    </Card>
                    {/* 3 card end*/}
                  </>
                );
              })}
          </Col>
          {/* rhs html  */}
          <Col sm={24} md={6} lg={6} xlg={8}>
            {/* premium payment card */}
            {allPlanDetailsInfo?.length > 0 &&
              allPlanDetailsInfo.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {item.POL_ADDL_STATUS_DESC === "Matured" ? (
                      <Maturity />
                    ) : item.POL_ADDL_STATUS_DESC === "Lapsed - Cancelled" ? (
                      <Lapsed />
                    ) : (
                      <PremiumCard />
                    )}
                  </React.Fragment>
                );
              })}

            {/* premium payment card end */}
            <div className="rhs">
              <div className="contact-us">
                <div className="div">
                  <img
                    className="support-img-icon"
                    alt=""
                    src="/support-img@2x.png"
                  />
                </div>
                <div className="div1">
                  <div className="call-us-at">
                    Call us at (02) 8802-7202 on weekdays from 8:00AM to 5:00PM
                  </div>
                  <div className="secondary-button">
                    <div className="text">Get In Touch With US</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* <div className="footer_powered_by fixed-bottom">
        Powered by <strong>Salesdrive</strong>
        <sup>TM</sup>
      </div> */}
    </>
  );
});
export default PlanDetailsComponent;
