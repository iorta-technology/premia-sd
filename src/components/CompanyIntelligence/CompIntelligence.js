import React, { useState, useEffect, createRef, useRef } from "react";
import "../../components/StatusLead/StatusLead.css";
import page from "./icons/page.svg"
import eye from "./icons/Eye.svg";
import Trash from "./icons/Trash.svg";
import "./CompIntelligence.css";
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
  Badge
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
import { FormOutlined, PlusCircleOutlined, UploadOutlined, CalendarOutlined, DeleteOutlined , UserOutlined } from "@ant-design/icons";
import TodoTab from "../Scheduler/RightSide-Todo/TodoCreate-Tab/Todo-Tab";
// import TodoCards from "../Activitity Tracker/RightSide-Todo/Todo-Event-Cards/TodoCards";
import TodoCards from "../Scheduler/RightSide-Todo/Todo-Event-Cards/TodoCards";
import noDataIcon from "../../assets/NoDataFound.png";
import {
  timeList,
} from "../StatusLead/dataSet";

import KDMDetails from "./KdmDetails";
import ProducerVAS from "./ProducerAndVAS";
import Expectation from "./Expectation";
import RiskDetails from "./RiskDetails";
import DocUpload from "./DocumentUpload";
import RemarkComp from "./RemarksModal";
import CollaboratorComp from "./CollaboratorModal";
import OpportunityStatus from "./OpportunityStatusModal";
import axios from 'axios';
import ShowPdf from "./ShowPdf";
import apiConfig from "../../config/api.config";
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
    value: "Company Intelligence",
  },
  {
    id: 2,
    value: "History",
  },
];
const CompanyIntelligence = React.memo((props) => {
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fileIndex, setFileIndex] = useState(0);
  const [fileUrl, setFileUrl] = useState('');
  const [open, setOpen] = useState(false);
  let _teamMember = [];
  const callback = (data) => {
    // console.log(data, "this is the pdf data");
    setFileData(data);
  }
  // useEffect(() => {
  //   console.log(fileData)
  // }, [fileData]);
  const delDoc = (data,ind) => {
    let newArr = [...fileData];
    newArr.splice(ind, 1);
    setFileData([...newArr]);

    const headers = { 'Authorization': `Bearer ${loggedInUserToken}` };
    axios.delete(`${baseURL}secure/user/delete_documents?userId=${loginId}&docId=${data._id}`,{ headers }).then(res =>{
        // console.warn("(((( DELETEEEEE  )))) ====>>>",res)
        if(res.data.errCode === -1){
          dispatch(actions.fetchLeadDetails(storeFormData._id))
          message.success("Document Deleted Successfully");
        }
    })
  };
  const showModal = () => {
    console.log('clicked on th eye')
    // setFileUrl(fileData[index].location || fileData[index].url);
    // console.log(fileData[index].---- || fileData[index].url);
    setIsModalOpen(!isModalOpen);
    console.log(isModalOpen);
  }
  // const [active, setActive] = useState(null)
  const [activeKdm, setActiveKdm] = useState(null)

  const breakpoint = 620;

  const panelStyle = {
    marginBottom: 10,
    background: '#f7f7f7',
    borderRadius: 5,
  };


  const eventCardStyle = {
    marginBottom: 10,
    background: '#cea0e1',
    borderRadius: 5,
    padding: 10,
    // border: '1px solid #ccc',
  };

  useEffect(() => {
    dispatch(actions.headerName("New Lead"));
    // console.warn('storeFormData--------->>>>>',storeFormData)
    loadValuesToFields(storeFormData);
    getAppointmentList(storeFormData._id);
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

  const loadValuesToFields = (leadData) => {
    try {
      console.warn("__++++++++++++++ leadData +++++++++++>>", leadData);
      setUpdateLeadID(leadData?._id)
      setCompanyDetails(leadData?.company_id)
      // Setting Company name header
      dispatch(actions.headerName(leadData?.company_id?.company_name.toUpperCase()));
      let _appntDate = "";
      let _appntTime = "";

      // Setting Opportunity data
      if (leadData?.appointmentDate) {
        // _appntDate = moment(leadData?.appointmentDate).format("MM/DD/YYYY");
        // _appntTime = moment(leadData?.appointmentDate).format("LT");
        
        let redable_date = new Date(leadData?.appointmentDate).toLocaleString('en-US', { timeZone: 'UTC' }).split(',')
        _appntDate = redable_date[0]
        let _appTime = redable_date[1].trim().split(':')
        let _appTimeAm = _appTime[2].split(' ')

        _appntTime = `${_appTime[0]}:${_appTime[1]} ${_appTimeAm[1]}`
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
      }
      setOpportunityDetails(_opportunity)

      // Setting PRODUCER & VAS data
      let _vas = {
        VAS_executed: leadData?.VAS_executed,
        VAS_input: leadData?.VAS_input,
        channel_name: leadData?.channel_name,
        producer: leadData?.producer,
      }
      setProducerVasDetails(_vas)

      // Setting EXPECTATION data
      let _expectation = {
        client_expectations: leadData?.client_expectations,
        red_flags: leadData?.red_flags,
        our_ask: leadData?.our_ask,
      }
      setExpectationDetails(_expectation)

      setRiskDetailsArr(leadData?.risk_details)

      leadData?.company_id?.kdm_details.forEach((el, index) => {
        el.kdmTabs = `KDM ${index + 1}`
      })
      setKdmDetailsArr(leadData?.company_id?.kdm_details)
      if(leadData?.company_id?.kdm_details?.length > 0) handleKdmTabs(leadData?.company_id?.kdm_details[0])

      var newArr = leadData?.documents?.map((res) => ({ ...res, recent: false }));
      setFileData(newArr)
      
      setreamrkDataArr(leadData?.remarks)
      let _teamData = leadData?.teamMembers ? JSON.parse(leadData?.teamMembers) : [];
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
      let _data = _finalData.filter(el => _teamData.some(event => el._Id === event.Id));

      setTeamDataArr(_data);
      // console.log('_data------CIII------->>>',_data)

    } catch (err) {
      console.log("__++++++++++++++ err +++++++++++>>", err);
    }
  };

  const opprtunityStatusData = (event) =>{
    let _dataObj = [...no_contactItems ,...leadStatusItems,...contactItems]
    let _data = _dataObj.filter(el => el.value === event)
    return _data[0]?.label
  }

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
    setShowVasModal(true)
  };
  const openKDMModal = (event) => {
    // if(event === 'create') setKdmDataSet({})
    // const [kdmType, setKdmType] = useState("");
    if(event === 'create'){
      if(kdmDetailsArr?.length >= 4){
        message.info("Only 4 KDM's can be Added");
      }else{
        setKdmType(event)
        setShowKdmModal(true)
      }
    }else{
      setKdmType(event)
      setShowKdmModal(true)
    }
    
  };
  const openExpectationModal = () => {
    setShowExpectationModal(true)
  };

  const openRiskModal = (event, data, index) => {
    if(riskDetailsArr?.length >= 10){
      message.info("Only 10 Risk Details can be Added");
    }else{
      setShowRiskModal(true)
      setRiskType(event)
      setriskDataSet(data)
    }
    
  };

  const openRemarkModal = () => {
    setShowRemarkModal(true)
  };
  const openCollabModal = () => {
    setShowCollabortrModal(true)
  };

  const deleteRiskData = async (data, index) => {
    // console.log('loggedInUser DATA---->>>', loggedInUserToken)
    const headers = { 'Authorization': `Bearer ${loggedInUserToken}` };
    axios.delete(`${baseURL}secure/user/deleteRiskDetails?userId=${loginId}&lead_Id=${storeFormData.lead_Id}&riskId=${data?._id}`, { headers }).then(res => {
      // console.warn("(((( DELETEEEEE  )))) ====>>>",res)
      if (res.data.errCode === -1) {
        dispatch(actions.fetchLeadDetails(storeFormData._id))
        message.success("Risk Details Deleted Successfully");
      }
    })
  };

  const deleteKdmData = async (data, index) => {
    // console.log('data DATA---->>>', data)
    // secure/user/deletekdmDetails?userId=63dce7c80ae6868961079fe6&kdmId=64786ff0cac6fc279ab38cc6
    const headers = { 'Authorization': `Bearer ${loggedInUserToken}` };
    axios.delete(`${baseURL}secure/user/deletekdmDetails?userId=${loginId}&kdmId=${activeKdm}`,{ headers }).then(res =>{
        // console.warn("(((( DELETEEEEE  )))) ====>>>",res)
        if(res.data.errCode === -1){
          dispatch(actions.fetchLeadDetails(storeFormData._id))
          message.success("KDM Details Deleted Successfully");
        }
    })
  }

  const openDocumentModal = () => {
    setShowDocumntModal(true)
  };

  const handleKdmTabs = (event) => {
    // console.log('handleKdmTabs -------->>>',event)
    setActiveKdm(event._id)
    // const [activeKdm, setActiveKdm] = useState(null)
    setKdmDataSet(event)
    // const [kdmDataSet, setKdmDataSet] = useState({});
  };

  const getTodo = () => {
    childRef.current.getTodoData(0);
    // getEventTodoCountAPI(res.formData._id);
  };


  const handleCollapse = (event, data, ind) => {
    setRiskInd(ind)
    // console.log('data--------->>>>',data)
    // console.log('ind--------->>>>',ind)
    // const [riskInd, setRiskInd] = useState(null);
    // const [showEditBtn, setShowEditBtn] = useState(false);
    !event ? setShowEditBtn(false) : setShowEditBtn(true)
  };

  const kdmTabSwitch = (activeKey) => {

  }

  const remarkCollabChange = (key) => {
    // console.log('remarkCollabChange',key);
  };

  const checkValidity = (data) => {
    if (data === "" || data === undefined || data === null) {
      return "-";
    } else {
      return data;
    }
  }

  return (
    <>
      <TabsComp
        tabMenu={tabMenu}
        // header={storeFormData && storeFormData._id ? "Update Lead" : "New Lead"}
        header={companyDetails?.company_name?.toUpperCase()}
        activeKey="1"
        statusLeadData={storeFormData}
      />

      <div
        className={`form-container compIntStyle kdmStyle ${width > 768 ? "compIntContainer" : ""}`}
      >
        <Row gutter={16} style={{ margin: "0" }}>
          {/* 1st Column */}
          <Col sm={24} md={12} lg={8} xlg={8}>
            {/* Company Details */}
            <Card bordered={false} className="app-card-head">
              <Col style={{ alignItems: 'center', padding: 5 }} >
                <p className="app-font" style={{ color: '#444444', marginLeft: 10 }}>Company Details</p>
              </Col>
              <div style={{ height: 1, backgroundColor: '#D8D8D8' }}></div>
              <Col style={{ padding: 10 }}>
                <Row>
                  <Col style={{ flex: 1 }}>
                    <p className="text-font">{companyDetails?.raw_company_name}</p>
                    <p className="label-font">Company Name</p>
                  </Col>

                  <Col style={{flex:1}}>
                    <p className="text-font">{companyDetails?.raw_company_name}</p>
                    <p className="label-font">Parent Company</p>
                  </Col>

                  <Col style={{ flex: 1 }}>
                    {/* <p className="text-font">{companyDetails?.industry_name}</p> */}
                    <Tooltip placement="top" title={companyDetails?.industry_name}>
                      <p
                        className="text-font"
                        style={{
                          marginBottom: 0,
                          width: 120,
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {companyDetails?.industry_name}
                      </p>
                    </Tooltip>
                    <p className="label-font">Industry</p>
                  </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                  <Col style={{ flex: 1 }}>
                    <p className="text-font">{companyDetails?.client_location}</p>
                    <p className="label-font">Client Location</p>
                  </Col>

                  <Col style={{ flex: 1 }}>
                    <p className="text-font">{companyDetails?.zone}</p>
                    <p className="label-font">Zone</p>
                  </Col>
                  <Col style={{ flex: 1 }}>
                    <p className="text-font">{companyDetails?.tata_aig_empaneled}</p>
                    <p className="label-font">Tata AIG empaneled</p>
                  </Col>
                </Row>
              </Col>
            </Card>

            {/* Remarks and Collaborators */}
            <Card bordered={false} style={{ marginTop: 20 }} className="app-card-head remarkTab">
              <Tabs
                defaultActiveKey="1"
                // items={items} 
                centered
                onChange={remarkCollabChange}
              >
                  <TabPane tab="Remarks" key="1" >
                    <Row justify="space-between" style={{alignItems:'center',padding:'0px 15px 15px 15px'}} >
                      <p className="text-font" style={{color:'#444444'}}>Remarks</p>
                      <PlusCircleOutlined onClick={() => setShowRemarkModal(true)} style={{fontSize:18}} />
                    </Row>
                    <Col className="post w-100" id="chat_section"
                      style={{
                        fontSize: "smaller",
                        height: reamrkDataArr && reamrkDataArr?.length > 5 ? "311px" : "",
                        overflowY: "auto",
                      }}
                    >
                    { reamrkDataArr?.length > 0 ?
                      reamrkDataArr?.slice(0).reverse().map((res, index) => (
                        <div key={res.date} className={"mb-3 remarks_bg " + (loginId === res.userId._id ? "left" : "right")}>
                          <div className="d-flex justify-content-between w-100">
                            <div className="me-3">{res.userId.full_name}</div>
                            <div className="me-3">{moment(res.date).format("DD/MM/YYYY hh:mm:ss a")}</div>
                          </div>
                          <div>{res.description}</div>
                        </div>
                      ))
                      :
                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 40 }}>
                        <img src={noDataIcon} style={{ height: 100, width: 100 }} />
                        <div style={{ marginTop: 10 }}>
                          <text style={{ textAlign: "center", fontSize: 14,color:'#B1B1B1',fontWeight:500 }}>No Remarks available.  
                            <span onClick={() => openRemarkModal()} style={{ fontSize: 14,color:'#00ACC1',fontWeight:500,cursor:'pointer' }}>Add Remarks</span>
                          </text>
                        </div>
                      </div>
                    }
                  </Col>
                  </TabPane>
                  <TabPane tab="Collaborators" key="2" >
                    <Row justify="space-between" style={{alignItems:'center',padding:'0px 15px 15px 15px'}} >
                      <p className="text-font" style={{color:'#444444'}}>Collaborators</p>
                      <PlusCircleOutlined onClick={() => setShowCollabortrModal(true)} style={{fontSize:18}} />
                    </Row>
                    { teamDataArr?.length > 0 ? 
                        teamDataArr.map((res, index) => (
                          <Col style={{ padding:'0px 15px 10px 15px' }}>
                            <Row style={{ padding: 5,border:'1px solid #adb5bd',alignItems:'center' }}>
                              <Avatar icon={<UserOutlined />} />
                              <p style={{marginLeft:10,color:'#444444'}} className="text-font">{res?.FullName}</p>
                            </Row>
                          </Col>
                        ))
                        :
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 40 }}>
                          <img src={noDataIcon} style={{ height: 100, width: 100 }} />
                          <div style={{ marginTop: 10 }}>
                            <text style={{ textAlign: "center", fontSize: 14,color:'#B1B1B1',fontWeight:500 }}>No Collaborators available.  
                              <span onClick={() => openCollabModal()} style={{ fontSize: 14,color:'#00ACC1',fontWeight:500,cursor:'pointer' }}>Add Collaborators</span>
                            </text>
                          </div>
                        </div>

                    }
                  </TabPane>
              </Tabs>

            </Card>

            {/* Opportunity Status */}
            <Card bordered={false} style={{ marginTop: 20 }} className="app-card-head">
              <Row justify="space-between" style={{ alignItems: 'center', padding: '5px 10px 5px 10px' }} >
                <p className="app-font" style={{ color: '#444444' }}>Opportunity Status</p>
                <FormOutlined onClick={() => setShowOpportunityModal(true)} style={{ fontSize: 20 }} />
              </Row>
              <div style={{ height: 1, backgroundColor: '#D8D8D8' }}></div>
              <Col style={{ padding: 10 }}>
                <Row>
                  <Col style={{ flex: 1 }}>
                    <p className="text-font">{opportunityDetails?.leadStatusLabel}</p>
                    <p className="label-font">Status</p>
                  </Col>

                  <Col style={{ flex: 1 }}>
                    <p className="text-font">{checkValidity(opportunityDetails?.leadDispositionLabel)}</p>
                    <p className="label-font">Disposition</p>
                  </Col>

                  <Col style={{flex:1}}>
                    <Tooltip placement="top" title={checkValidity(opportunityDetails?.leadsubDisposition)}>
                      <p
                        className="text-font"
                        style={{
                          marginBottom: 0,
                          width: 120,
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {checkValidity(opportunityDetails.leadsubDisposition)}
                      </p>
                    </Tooltip>
                    <p className="label-font">Sub Disposition</p>
                  </Col>
                </Row>

                <Row style={{marginTop:10}}>
                  <Col style={{flex:1}}>
                    <p className="text-font">{opportunityDetails.appoint_Date}</p>
                    <p className="label-font">Appointment Date</p>
                  </Col>

                  <Col style={{ flex: 1 }}>
                    <p className="text-font">{checkValidity(opportunityDetails.appointmentTime)}</p>
                    <p className="label-font">Appointment TIme</p>
                  </Col>

                  <Col style={{ flex: 1 }}></Col>
                </Row>
              </Col>
            </Card>

            {/* Producer and VAS */}
            <Card bordered={false} style={{ marginTop: 20 }} className="app-card-head">
              <Row justify="space-between" style={{ alignItems: 'center', padding: '5px 10px 5px 10px' }} >
                <p className="app-font" style={{ color: '#444444' }}>Producer and VAS</p>
                <FormOutlined onClick={() => openProdVasModal()} style={{ fontSize: 20 }} />
              </Row>
              <div style={{ height: 1, backgroundColor: '#D8D8D8' }}></div>
              <Col style={{ padding: 10 }}>
                <Row>
                  <Col style={{ flex: 1 }}>
                    <p className="text-font">{checkValidity(producerVasDetails?.channel_name)}</p>
                    <p className="label-font">Channel Name</p>
                  </Col>

                  <Col style={{ flex: 1 }}>
                    <p className="text-font">{checkValidity(producerVasDetails?.producer)}</p>
                    <p className="label-font">Producer</p>
                  </Col>
                  <Col style={{ flex: 1 }}></Col>
                </Row>
              </Col>
            </Card>

            {/* Expectation */}
            <Card bordered={false} style={{ marginTop: 20 }} className="app-card-head">
              <Row justify="space-between" style={{ alignItems: 'center', padding: '5px 10px 5px 10px' }} >
                <p className="app-font" style={{ color: '#444444' }}>Expectation</p>
                <FormOutlined onClick={() => openExpectationModal()} style={{ fontSize: 20 }} />
              </Row>
              <div style={{ height: 1, backgroundColor: '#D8D8D8' }}></div>
              <Col style={{ padding: 10 }}>
                <Row>
                  <Col style={{ flex: 1 }}>
                    <p className="text-font">{checkValidity(expectationDetails?.client_expectations)}</p>
                    <p className="label-font">Client Expectation</p>
                  </Col>

                  <Col style={{ flex: 1 }}>
                    <p className="text-font">{checkValidity(expectationDetails?.red_flags)}</p>
                    <p className="label-font">Red Flag</p>
                  </Col>

                  <Col style={{ flex: 1 }}>
                    <p className="text-font">{checkValidity(expectationDetails?.our_ask)}</p>
                    <p className="label-font">Our Ask</p>
                  </Col>
                </Row>
              </Col>
            </Card>
          </Col>

          {/* 2nd Column */}
          <Col className="secnd-col-responsive" sm={24} md={14} lg={8} xlg={8}>
            {/* Risk Details */}
            <Card bordered={false} className="app-card-head">
              <Row justify="space-between" style={{ alignItems: 'center', padding: '5px 10px 5px 10px' }} >
                <Row>
                  <p className="app-font" style={{ color: '#444444' }}>Risk Details</p>
                  {/* <Badge count={riskDetailsArr?.length}  color="#faad14" /> */}
                  <Col style={{display:'flex',alignItems:'center',marginLeft:10}}>
                    <Badge count={riskDetailsArr?.length} style={{background:'#00ACC1'}}/>
                  </Col>
                  
                </Row>
                <PlusCircleOutlined onClick={() => openRiskModal('create')} style={{ fontSize: 20 }} />
              </Row>
              <div style={{ height: 1, backgroundColor: '#D8D8D8' }}></div>
              <Col style={{ padding: 10 }}>
                {riskDetailsArr?.length > 0 ?
                  riskDetailsArr?.map((el, index) =>
                    <Collapse accordion={true} onChange={(text) => handleCollapse(text, el, index)} expandIconPosition={'right'} style={panelStyle} defaultActiveKey={['1']}>
                      <Panel
                        header={el.total_entities}
                        key={el.key}
                        extra={
                          <Row style={{ marginTop: 3 }} onClick={e => e.stopPropagation()}>
                            <DeleteOutlined onClick={() => deleteRiskData(el, index)} style={{ fontSize: 18, marginRight: 10, color: '#737373' }} />
                            <FormOutlined onClick={() => openRiskModal('edit', el, index)} style={{ fontSize: 16, color: '#737373' }} />
                          </Row>
                        }
                      >
                        <Row>
                          <Col style={{ flex: 1 }}>
                            <p className="text-font">{el.inception_date}</p>
                            <p className="label-font">Inception Date</p>
                          </Col>

                          <Col style={{ flex: 1 }}>
                            <p className="text-font">{el.tagic_presence_percentage}</p>
                            <p className="label-font">TAGIC Presence</p>
                          </Col>

                          <Col style={{ flex: 1 }}>
                            <p className="text-font">{el.leader_share}</p>
                            <p className="label-font">Leader Share %</p>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: 10 }}>
                          <Col style={{ flex: 1 }}>
                            <p className="text-font">{el.total_entities}</p>
                            <p className="label-font">Name of Entities</p>
                          </Col>

                          <Col style={{ flex: 1 }}>
                            {/* <p className="text-font">{el.product_for_opportunity}</p> */}
                            <Tooltip placement="top" title={el.product_for_opportunity}>
                              <p
                                className="text-font"
                                style={{
                                  marginBottom: 0,
                                  width: 120,
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                }}
                              >
                                {el.product_for_opportunity}
                              </p>
                            </Tooltip>
                            <p className="label-font">Product Name</p>
                          </Col>

                          <Col style={{ flex: 1 }}>
                            <p className="text-font">{el.total_premium}</p>
                            <p className="label-font">Total Premium</p>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: 10 }}>
                          <Col style={{ flex: 1 }}>
                            <p className="text-font">{el.tagic_premium}</p>
                            <p className="label-font">TAGIC Premium</p>
                          </Col>

                          <Col style={{ flex: 1 }}>
                            <p className="text-font">{el.leader}</p>
                            <p className="label-font">Lead/Follower</p>
                          </Col>

                          <Col style={{ flex: 1 }}>
                            {/* <p className="text-font">{el.lead_insurer}</p> */}
                            <Tooltip placement="top" title={el.lead_insurer}>
                              <p
                                className="text-font"
                                style={{
                                  marginBottom: 0,
                                  width: 120,
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                }}
                              >
                                {el.lead_insurer}
                              </p>
                            </Tooltip>
                            <p className="label-font">Lead Insurer</p>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  )
                  :
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 40 }}>
                    <img src={noDataIcon} style={{ height: 100, width: 100 }} />
                    <div style={{ marginTop: 10 }}>
                      <text style={{ textAlign: "center", fontSize: 14, color: '#B1B1B1', fontWeight: 500 }}>No Risk details available.
                        <span onClick={() => openRiskModal('create')} style={{ fontSize: 14, color: '#00ACC1', fontWeight: 500, cursor: 'pointer' }}>Add Details</span>
                      </text>
                    </div>
                  </div>
                }
              </Col>
            </Card>

            {/* KDM Details */}
            <Card bordered={false} style={{ marginTop: 20 }} className="app-card-head">
              <Row justify="space-between" style={{ alignItems: 'center', padding: '5px 10px 5px 10px' }} >
                <p className="app-font" style={{ color: '#444444' }}>KDM Details</p>
                <Row>
                  <PlusCircleOutlined onClick={() => openKDMModal('create')} style={{ fontSize: 20 }} />
                  <FormOutlined onClick={() => openKDMModal('edit')} style={{ marginLeft: 15, fontSize: 20 }} />
                  <DeleteOutlined onClick={() => deleteKdmData()} style={{ fontSize: 20, marginLeft: 15}} />
                </Row>
              </Row>
              <div style={{ height: 1, backgroundColor: '#D8D8D8' }}></div>
              <Col style={{ padding: 10 }}>
                <Row>
                  {kdmDetailsArr &&
                    kdmDetailsArr?.map((el, index) =>
                      <Col onClick={() => handleKdmTabs(el)} className={`kdmTabs ${activeKdm === el._id && 'kdmTabsActive'}`}>
                        <p style={{ margin: 0, color: `${activeKdm === el._id ? '#fff' : '#737373'}`, fontWeight: 400, fontSize: 12 }}>{el.kdmTabs}</p>
                      </Col>
                    )
                  }
                </Row>
              </Col>

              {kdmDetailsArr?.length > 0 ?
                <Col style={{ padding: 10 }}>
                  <Row>
                    <Col style={{ flex: 1 }}>
                      <p className="text-font">{checkValidity(kdmDataSet?.decision_maker_name)}</p>
                      <p className="label-font">Name</p>
                    </Col>

                    <Col style={{ flex: 1 }}>
                      <p className="text-font">{checkValidity(kdmDataSet?.role)}</p>
                      <p className="label-font">Role</p>
                    </Col>

                    <Col style={{ flex: 1 }}>
                      <p className="text-font">{checkValidity(kdmDataSet?.designation)}</p>
                      <p className="label-font">Designition</p>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: 10 }}>
                    <Col style={{ flex: 1 }}>
                      <p className="text-font">{checkValidity(kdmDataSet?.primaryContact)}</p>
                      <p className="label-font">Phone Number</p>
                    </Col>

                    <Col style={{ flex: 1 }}>
                      <p className="text-font">{checkValidity(kdmDataSet?.emailAddress)}</p>
                      <p className="label-font">Email ID</p>
                    </Col>

                    <Col style={{ flex: 1 }}>
                      <p className="text-font">{checkValidity(kdmDataSet?.date_of_birth)}</p>
                      <p className="label-font">Date Of Birth</p>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: 10 }}>
                    <Col style={{ flex: 1 }}>
                      <p className="text-font">{checkValidity(kdmDataSet?.city)}</p>
                      <p className="label-font">City</p>
                    </Col>

                    <Col style={{ flex: 1 }}>
                      <p className="text-font">{checkValidity(kdmDataSet?.state)}</p>
                      <p className="label-font">State</p>
                    </Col>

                    <Col style={{ flex: 1 }}>
                      <p className="text-font">{checkValidity(kdmDataSet?.branch)}</p>
                      <p className="label-font">Branch</p>
                    </Col>
                  </Row>
                </Col>
                :
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 40 }}>
                  <img src={noDataIcon} style={{ height: 100, width: 100 }} />
                  <div style={{ marginTop: 10 }}>
                    <text style={{ textAlign: "center", fontSize: 14, color: '#B1B1B1', fontWeight: 500 }}>No KDM details available.
                      <span onClick={() => openKDMModal('create')} style={{ fontSize: 14, color: '#00ACC1', fontWeight: 500, cursor: 'pointer' }}>Add Details</span>
                    </text>
                  </div>
                </div>
              }
            </Card>
          </Col>

          {/* 3rd Column */}
          <Col sm={24} md={12} lg={8} xlg={8}>
            {/* Event Details & TODO */}
            <Card bordered={false} className="app-card-head remarkTab">
              <Tabs
                defaultActiveKey="1"
                centered
                onChange={remarkCollabChange}
              >
                <TabPane tab="Events" key="1" >
                  {/* <Row justify="space-between" style={{alignItems:'center',padding:'0px 15px 15px 15px'}} >
                      <p className="text-font" style={{color:'#444444'}}>Create Event</p>
                      <PlusCircleOutlined onClick={() => setShowRemarkModal(true)} style={{fontSize:18}} />
                    </Row> */}
                  <>
                    {activities_data &&
                      !_.isEmpty(activities_data) &&
                      activities_data !== "No appointment " ? (
                        <div className="lead-activity-block" style={{margin:'0px 10px 0px 10px'}}>
                          {activities_data?.map((item) => {
                            return (
                              <Col style={eventCardStyle}>
                                <Row style={{flex:1,alignItems:'baseline'}}>
                                  <CalendarOutlined style={{color:'#fff',marginRight:5,fontSize:15}} />
                                  <p className="text-font" style={{color:'#fff',textTransform:'capitalize'}}>{!item.stakeholder_name ? '-' : item.stakeholder_name}</p>
                                </Row>
                                <Row>
                                  <Col style={{flex:1,marginTop:5}}>
                                    <p className="label-font" style={{color:'#fff'}}>Date</p>
                                    <p className="text-font" style={{color:'#fff'}}>{moment(item.start_date).format("D MMM YYYY")}</p>
                                  </Col>

                                <Col style={{ flex: 1, marginTop: 5 }}>
                                  <p className="label-font" style={{ color: '#fff' }}>Time</p>
                                  <p className="text-font" style={{ color: '#fff' }}>{dateFun(item.start_time)} to {dateFun(item.end_time)}</p>
                                </Col>
                              </Row>
                              <Row>
                                <Col style={{ flex: 1, marginTop: 5 }}>
                                  <p className="label-font" style={{ color: '#fff' }}>Agenda</p>
                                  <p className="text-font" style={{ color: '#fff' }}>{add3Dots(item.event_description, 50)}</p>
                                </Col>
                              </Row>
                            </Col>
                          );
                        })}
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 40 }}>
                        <img src={noDataIcon} style={{ height: 100, width: 100 }} />
                        <div style={{ marginTop: 10 }}>
                          <text style={{ textAlign: "center", fontSize: 14, color: '#B1B1B1', fontWeight: 500 }}>No Events to show</text>
                        </div>
                      </div>
                    )}
                  </>
                </TabPane>
                <TabPane tab="To Do" key="2" >
                  <Row justify="space-between" style={{ alignItems: 'center', padding: '0px 15px 0px 15px' }} >
                    <p className="text-font" style={{ color: '#444444' }}>Create To Do</p>
                    <PlusCircleOutlined onClick={() => setShowTodoModal(true)} style={{ fontSize: 18 }} />
                  </Row>

                  <>
                    <div className="TodoCards" style={{ padding: 10 }}>
                      <TodoCards leadID={updateLeadID} ref={childRef} />
                    </div>
                  </>
                </TabPane>
              </Tabs>

            </Card>

            {/* Documents Uploaded */}
            <Card bordered={false} style={{ marginTop: 20 }} className="app-card-head">
              <Row justify="space-between" style={{ alignItems: 'center', padding: '5px 10px 5px 10px' }} >
                <p className="app-font" style={{ color: '#444444' }}>Document Uploaded</p>
                <UploadOutlined onClick={() => openDocumentModal()} style={{ fontSize: 20 }} />
              </Row>
              <div style={{ height: 1, backgroundColor: '#D8D8D8' }}></div>
              {/* <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal> */}
              <Col style={{ padding: 10 }}>
                <Row>
                  <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    {fileData?.length > 0 ? 
                      fileData?.map((item, index) => (
                        <Row style={{justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                          <div className="wrapper1">
                            <div className="page" ><img style={{ height: 15, width: 15 }}  src={page} /></div>

                            <div style={{width: 300,textOverflow: "ellipsis",whiteSpace: "nowrap",overflow: "hidden",}} >
                              <a href={item.url} download>
                                {item.originalname || item.file_name}
                              </a>
                            </div>
                          </div>
                          <div className="wrapper2">
                            {/* <div className="eye" onClick={() =>  handleShow(index) }><img  src={eye} /></div> */}
                            <div className="trash" onClick={() => delDoc(item,index)} style={{ cursor: "pointer" }}><img src={Trash} /></div>
                          </div>
                        </Row>
                      ))
                      :
                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 40 }}>
                        <img src={noDataIcon} style={{ height: 100, width: 100 }} />
                        <div style={{ marginTop: 10 }}>
                          <text style={{ textAlign: "center", fontSize: 14, color: '#B1B1B1', fontWeight: 500 }}>No Documents available.
                            <span onClick={() => openDocumentModal()} style={{ fontSize: 14, color: '#00ACC1', fontWeight: 500, cursor: 'pointer' }}>Add Documents</span>
                          </text>
                        </div>
                      </div>
                    }
                  </div>
                  <Col style={{ flex: 1 }}></Col>
                </Row>
              </Col>
            </Card>
          </Col>
        </Row>


        {/* MODAL COMPONENTS */}
        <TodoTab
          getTodoData={getTodo}
          button={"Create"}
          leadID={updateLeadID}
          companyID={companyDetails?._id}
          company_Name={companyDetails?.company_name}
          // opportunity_Name={formItem.opportunityName}
          isModalVisible={showTodoModal}
          setIsModalVisible={setShowTodoModal}
        />
        <>
          <KDMDetails kdmDataSet={kdmType === 'create' ? {} : kdmDataSet} showKdmModal={showKdmModal} setShowKdmModal={setShowKdmModal} />
        </>
        <>
          <ProducerVAS producerVasDetails={producerVasDetails} showVasModal={showVasModal} setShowVasModal={setShowVasModal} />
        </>
        <>
          <Expectation expectationDetails={expectationDetails} showExpectationModal={showExpectationModal} setShowExpectationModal={setShowExpectationModal} />
        </>
        <>
          <RiskDetails riskDataSet={riskType === 'create' ? {} : riskDataSet} showRiskModal={showRiskModal} setShowRiskModal={setShowRiskModal} />
        </>
        <>
          <DocUpload showDocumntModal={showDocumntModal} setShowDocumntModal={setShowDocumntModal} callback={callback} />
        </>
        <>
          <RemarkComp showRemarkModal={showRemarkModal} setShowRemarkModal={setShowRemarkModal} />
        </>
        <>
          <CollaboratorComp teamDataArr={teamDataArr} showCollabortrModal={showCollabortrModal} setShowCollabortrModal={setShowCollabortrModal} />
        </>

        <>
          <OpportunityStatus opportunityDetails={opportunityDetails} showOpportunityModal={showOpportunityModal} setShowOpportunityModal={setShowOpportunityModal} />
        </>
        <>
        <ShowPdf show={isModalOpen}/>
        </>
      </div>

    </>
  );
});
export default CompanyIntelligence;