import React, { useState, useEffect, createRef, useRef } from "react";
// import "../../components/StatusLead/StatusLead.css";
import "./rhs.css";
import "./MaturityBenefit.css";
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
  Table,
  Typography,
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
// import {
//   FormOutlined,
//   PlusCircleOutlined,
//   UploadOutlined,
//   CalendarOutlined,
//   DeleteOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import TodoTab from "../Scheduler/RightSide-Todo/TodoCreate-Tab/Todo-Tab";
// import TodoCards from "../Activitity Tracker/RightSide-Todo/Todo-Event-Cards/TodoCards";
// import TodoCards from "../Scheduler/RightSide-Todo/Todo-Event-Cards/TodoCards";
// import noDataIcon from "../../assets/NoDataFound.png";
import { timeList } from "../StatusLead/dataSet";

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
// import { render } from "node-sass";
const { baseURL, auth, secure, NODE_ENV } = apiConfig;
// import { Document, Page } from 'react-pdf';

const minimumDate = moment().format("YYYY-MM-DD");
const { TabPane } = Tabs;
const { Option } = Select;
const { Panel } = Collapse;
const { Text } = Typography;

// const data = [
//   {
//     key: "1",
//     name: "April, 13, 2022",
//     benefitammount: "P57,245.00",
//     type: "Installment",
//     status: "Not Available",
//     action: "button",
//   },
//   {
//     key: "2",
//     name: "April, 13, 2022",
//     benefitammount: "P57,245.00",
//     type: "Installment",
//     status: "Not Available",
//     action: "button",
//   },
//   {
//     key: "3",
//     name: "April, 13, 2022",
//     benefitammount: "P57,245.00",
//     type: "Installment",
//     status: "Not Available",
//     action: "button",
//   },
// ];

const columns = [
  {
    title: "Availment Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Benefit Amount",
    dataIndex: "amount",
    key: "amount",
  },
  //   {
  //     title: "Type",
  //     dataIndex: "type",
  //     key: "type",
  //   },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text, record) => (
      <span>
        {record.status === "Not Available" ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <g clip-path="url(#clip0_104_2009)">
                <path
                  d="M12.6001 2.5C7.0801 2.5 2.6001 6.98 2.6001 12.5C2.6001 18.02 7.0801 22.5 12.6001 22.5C18.1201 22.5 22.6001 18.02 22.6001 12.5C22.6001 6.98 18.1201 2.5 12.6001 2.5ZM12.6001 20.5C8.1801 20.5 4.6001 16.92 4.6001 12.5C4.6001 10.65 5.2301 8.95 6.2901 7.6L17.5001 18.81C16.1501 19.87 14.4501 20.5 12.6001 20.5ZM18.9101 17.4L7.7001 6.19C9.0501 5.13 10.7501 4.5 12.6001 4.5C17.0201 4.5 20.6001 8.08 20.6001 12.5C20.6001 14.35 19.9701 16.05 18.9101 17.4Z"
                  fill="#434C55"
                  fill-opacity="0.4"
                />
              </g>
              <defs>
                <clipPath id="clip0_104_2009">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.600098 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span className="Not_Available"> Not Available </span>
          </>
        ) : record.status === "Availed" ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <g clip-path="url(#clip0_104_2026)">
                <path
                  d="M9.60025 16.6701L5.43025 12.5001L4.01025 13.9101L9.60025 19.5001L21.6003 7.50009L20.1903 6.09009L9.60025 16.6701Z"
                  fill="#01AB4F"
                />
              </g>
              <defs>
                <clipPath id="clip0_104_2026">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.600098 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span className="Availed"> Availed </span>
          </>
        ) : (
          ""
        )}
      </span>
    ),
  },
  //   {
  //     title: "Action",
  //     dataIndex: "",
  //     key: "action",
  //     render: () => <Button className="applyNow_btn">Apply Now</Button>,
  //   },
];
const data = [
  {
    key: 1,
    date: "April, 30, 2022",
    amount: "P57,245.00",
    // type: "Installment",
    status: "Not Available",
  },
  //   {
  //     key: 2,
  //     date: "April, 13, 2022",
  //     amount: "P50,000.00",
  //     type: "Installment",
  //     status: "Availed",
  //   },
  //   {
  //     key: 3,
  //     date: "April, 13, 2022",
  //     amount: "P50,000.00",
  //     type: "Installment",
  //     status: "Not Available",
  //   },
];
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

const PlanTerminationComponent = React.memo((props) => {
  const dispatch = useDispatch();
  const childRef = useRef(null);
  // const [form] = Form.useForm();
  // console.warn("COMPPP____PROPSS", props?.location?.state?.leadData);

  let storeFormData = useSelector((state) => state?.newLead?.formData);
  const loginId = useSelector((state) => state?.login?.user?.id);
  const loggedInUserToken = useSelector((state) => state?.login?.token);
  const userTreeData = useSelector((state) => state?.home?.user_tree);
  const _reportManager = useSelector((state) => state?.login?.reportingManager);

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

  const [policy_list, setPolicy_list] = useState(false);

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
    getAppointmentList(storeFormData._id);
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

  const getAppointmentList = async (lead_id) => {
    // setUpdateLeadID(lead_id)
    let _result = await axiosRequest.get(
      `user/fetch_appointments/${loginId}?teamdata=0&category=all&lead_id=${lead_id}`,
      { secure: true }
    );
    // console.log('APPOINTMENT DATA---->>>', _result)
    setActivities_data(_result);
  };

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
      <TabsComp
        tabMenu={tabMenu}
        // header={storeFormData && storeFormData._id ? "Update Lead" : "New Lead"}
        // id={PdfId}
        header={companyDetails?.company_name?.toUpperCase()}
        activeKey="4"
        statusLeadData={storeFormData}
      />

      <div className="plan_details_body" style={{ marginTop: 11 }}>
        <Row gutter={22} style={{ margin: "0", padding: 0 }}>
          <Col sm={24} md={18} lg={18} xlg={8}>
            <p className="tab_title">Plan Termination</p>
            <table>
              <thead>
                <tr>
                  <th scope="col">Availment Date</th>
                  <th scope="col">Benefit Amount</th>
                  <th scope="col">Status</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="date">April, 30, 2022</td>
                  <td data-label="amount">P57,245.00</td>
                  <td data-label="status" className="not_available">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_104_2009)">
                        <path
                          d="M12.6001 2.5C7.0801 2.5 2.6001 6.98 2.6001 12.5C2.6001 18.02 7.0801 22.5 12.6001 22.5C18.1201 22.5 22.6001 18.02 22.6001 12.5C22.6001 6.98 18.1201 2.5 12.6001 2.5ZM12.6001 20.5C8.1801 20.5 4.6001 16.92 4.6001 12.5C4.6001 10.65 5.2301 8.95 6.2901 7.6L17.5001 18.81C16.1501 19.87 14.4501 20.5 12.6001 20.5ZM18.9101 17.4L7.7001 6.19C9.0501 5.13 10.7501 4.5 12.6001 4.5C17.0201 4.5 20.6001 8.08 20.6001 12.5C20.6001 14.35 19.9701 16.05 18.9101 17.4Z"
                          fill="#434C55"
                          fill-opacity="0.4"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_104_2009">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0.600098 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <span>Not Available</span>{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col sm={24} md={6} lg={6} xlg={8}>
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
          {/* <Col>
            <p className="tab_title">Maturity Benefits</p>
          </Col> */}
        </Row>
        {/* <Row gutter={22}>
          <Col sm={24} md={18} lg={18} xlg={8}>
            <Table
              className="table_container"
              columns={columns}
              dataSource={data}
              pagination={false}
            />
          </Col>
          <Col sm={24} md={6} lg={6} xlg={8}>
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
        </Row> */}
        <div className="footer_powered_by fixed-bottom">
        Powered by <strong>Salesdrive</strong>
        <sup>TM</sup>
      </div>
      </div>
    </>
  );
});
export default PlanTerminationComponent;
