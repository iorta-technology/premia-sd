import React, { useState, useEffect, createRef, useRef } from "react";
import "../../components/StatusLead/StatusLead.css";
import page from "./icons/page.svg"
import eye from "./icons/Eye.svg";
import Trash from "./icons/Trash.svg";
// import Tab from '../Tab_broker_flow/Tab'
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
import TabsComp from "../../components/Tab_broker_flow/Tab";
import _ from "lodash";
import { doSentenceCase } from "../../helpers";
import moment from "moment";
import axiosRequest from "../../axios-request/request.methods";
import { FormOutlined, PlusCircleOutlined, UploadOutlined, CalendarOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
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
    value: "Broker Intelligence",
  },
  {
    id: 2,
    value: "Activity Log",
  },
];
const CompanyIntelligence = React.memo((props) => {
  const dispatch = useDispatch();
  const childRef = useRef(null);
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

  const [producerDetails, setProducerDetails] = useState({});
  const [opportunityDetails, setOpportunityDetails] = useState({});
  const [producerVasDetails, setProducerVasDetails] = useState({});
  const [expectationDetails, setExpectationDetails] = useState({});
  const [walletDetails, setWalletDetails] = useState([]);
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
    setFileData(data);
  }
  // useEffect(() => {
  //   console.log(fileData)
  // }, [fileData]);
  const delDoc = (data, ind) => {
    let newArr = [...fileData];
    newArr.splice(ind, 1);
    setFileData([...newArr]);

    const headers = { 'Authorization': `Bearer ${loggedInUserToken}` };
    axios.delete(`${baseURL}secure/user/delete_documents?userId=${loginId}&docId=${data._id}`, { headers }).then(res => {
      // console.warn("(((( DELETEEEEE  )))) ====>>>",res)
      if (res.data.errCode === -1) {
        dispatch(actions.fetchLeadDetails(storeFormData._id));
        message.success("Document Deleted Successfully");
      }
    })
  };

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
    console.log('storeFormData--------->>>>>', storeFormData);
    loadValuesToFields(storeFormData);
    getAppointmentList(storeFormData._id);
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

      console.warn("__++++++++++++++ leadData +++++++++++>> comapny intelligence", leadData);
     setUpdateLeadID(leadData?._id);

      setProducerDetails(leadData?.producerdetails);

      leadData?.producerdetails?.kdm_details.forEach((el, index) => {
        el.kdmTabs = `KDM ${index + 1}`
      })
      //setting the kdm details
      setKdmDetailsArr(leadData?.producerdetails?.kdm_details);
      console.log("this is the kdm details", leadData?.producerdetails?.kdm_details);
      if (leadData?.producerdetails?.kdm_details?.length > 0) handleKdmTabs(leadData?.producerdetails?.kdm_details[0]);

      //setting the opportunity details
      let _opportunity = {
        appointmentDate: leadData?.appointmentDate == null ? '-' : leadData?.appointmentDate,
        appointmentTime: leadData?.appointmentTime == null ? '-' : leadData?.appointmentTime,
        leadStatus: '-',
        leadsubDisposition: '-',
        leadDiposition: '-'

      }
      setOpportunityDetails(_opportunity)

      //setting wallet details
      setWalletDetails(leadData?.wallet_details)
      
      setreamrkDataArr(leadData?.remarks)
     

    } catch (err) {
      console.log("__++++++++++++++ err +++++++++++>>", err);
    }
  };

  const opprtunityStatusData = (event) => {
    let _dataObj = [...no_contactItems, ...leadStatusItems, ...contactItems]
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
    if (event === 'create') {
      if (kdmDetailsArr?.length >= 4) {
        message.info("Only 4 KDM's can be Added");
      } else {
        setKdmType(event)
        setShowKdmModal(true)
      }
    } else {
      setKdmType(event)
      setShowKdmModal(true)
    }

  };
  const openExpectationModal = () => {
    setShowExpectationModal(true)
  };

  const openWalletModal = (event, data, index) => {
    console.log('data------------->',data);
    setShowRiskModal(true);
    setRiskType(event);
    setriskDataSet(data);
  };

  const openRemarkModal = () => {
    setShowRemarkModal(true)
  };
  const openCollabModal = () => {
    setShowCollabortrModal(true)
  };

  const deleteWalletDetails = async (data, index) => {
    // console.log('loggedInUser DATA---->>>', loggedInUserToken)
    const headers = { 'Authorization': `Bearer ${loggedInUserToken}` };
    axios.delete(`${baseURL}secure/user/deletewallet?userId=${loginId}&walletId=${data._id}`, { headers }).then(res => {
      // console.warn("(((( DELETEEEEE  )))) ====>>>",res)
      if (res.data.errCode === -1) {
        dispatch(actions.fetchLeadDetails_broker(storeFormData._id));
        message.success("Wallet Details Deleted Successfully");
      }
    })
  };

  const deleteKdmData = async (data, index) => {
    // console.log('data DATA---->>>', data)
    // secure/user/deletekdmDetails?userId=63dce7c80ae6868961079fe6&kdmId=64786ff0cac6fc279ab38cc6
    const headers = { 'Authorization': `Bearer ${loggedInUserToken}` };
    axios.delete(`${baseURL}secure/user/deletekdm?userId=${loginId}&kdmId=${activeKdm}`, { headers }).then(res => {
      // console.warn("(((( DELETEEEEE  )))) ====>>>",res)
      if (res.data.errCode === -1) {
        dispatch(actions.fetchLeadDetails_broker(storeFormData._id));
        message.success("KDM Details Deleted Successfully");
      }
    })
  }

  const openDocumentModal = () => {
    setShowDocumntModal(true)
  };
  const handleKdmTabs = (event) => {
    console.log('handleKdmTabs -------->>>', event)
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
        // header={companyDetails?.company_name?.toUpperCase()}
        activeKey="1"
        statusLeadData={storeFormData}
        header={storeFormData?.producerdetails?.raw_producer_name}
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
                <p className="app-font" style={{ color: '#444444', marginLeft: 10 }}>Producer Details</p>
              </Col>
              <div style={{ height: 1, backgroundColor: '#D8D8D8' }}></div>
              <Col style={{ padding: 10 }}>
                <Row>
                  <Col style={{ flex: 1 }}>
                    <p className="text-font">{producerDetails?.producer_name}</p>
                    <p className="label-font">Producer Name</p>
                  </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                  <Col style={{ flex: 1 }}>
                    <p className="text-font">{producerDetails?.city}</p>
                    <p className="label-font">City</p>
                  </Col>
                  <Col style={{ flex: 1 }}>
                    <p className="text-font">{producerDetails?.wallet_size}</p>
                    <p className="label-font">Wallet</p>
                  </Col>
                </Row>
              </Col>
            </Card>
            <Card bordered={false} style={{ marginTop: 20 }} className="app-card-head">
              <Row justify="space-between" style={{ alignItems: 'center', padding: '5px 10px 5px 10px' }} >
                <p className="app-font" style={{ color: '#444444' }}>KDM Details</p>
                <Row>
                  <PlusCircleOutlined onClick={() => openKDMModal('create')} style={{ fontSize: 20 }} />
                  <FormOutlined onClick={() => openKDMModal('edit')} style={{ marginLeft: 15, fontSize: 20 }} />
                  <DeleteOutlined onClick={() => deleteKdmData()} style={{ fontSize: 20, marginLeft: 15 }} />
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

            {/* Remarks and Collaborators */}
            <Card bordered={false} style={{ marginTop: 20 }} className="app-card-head remarkTab">
              <Tabs
                defaultActiveKey="1"
                // items={items} 
                centered
                onChange={remarkCollabChange}
              >
                <TabPane tab="Remarks" key="1" >
                  <Row justify="space-between" style={{ alignItems: 'center', padding: '0px 15px 15px 15px' }} >
                    <p className="text-font" style={{ color: '#444444' }}>Remarks</p>
                    <PlusCircleOutlined onClick={() => setShowRemarkModal(true)} style={{ fontSize: 18 }} />
                  </Row>
                  <Col className="post w-100" id="chat_section"
                    style={{
                      fontSize: "smaller",
                      height: reamrkDataArr && reamrkDataArr?.length > 5 ? "311px" : "",
                      overflowY: "auto",
                    }}
                  >
                    {reamrkDataArr?.length > 0 ?
                      reamrkDataArr?.slice(0).reverse().map((res, index) => (
                        <div key={res.date} className={"mb-3 remarks_bg " + (loginId === res.userId._id ? "left" : "right")}>
                          <div className="d-flex justify-content-between w-100">
                            <div className="me-3">-</div>
                            <div className="me-3">{moment(res.date).format("DD/MM/YYYY hh:mm:ss a")}</div>
                          </div>
                          <div>{res.description}</div>
                        </div>
                      ))
                      :
                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 40 }}>
                        <img src={noDataIcon} style={{ height: 100, width: 100 }} />
                        <div style={{ marginTop: 10 }}>
                          <text style={{ textAlign: "center", fontSize: 14, color: '#B1B1B1', fontWeight: 500 }}>No Remarks available.
                            <span onClick={() => openRemarkModal()} style={{ fontSize: 14, color: '#00ACC1', fontWeight: 500, cursor: 'pointer' }}>Add Remarks</span>
                          </text>
                        </div>
                      </div>
                    }
                  </Col>
                </TabPane>
                <TabPane tab="Collaborators" key="2" >
                  <Row justify="space-between" style={{ alignItems: 'center', padding: '0px 15px 15px 15px' }} >
                    <p className="text-font" style={{ color: '#444444' }}>Collaborators</p>
                    <PlusCircleOutlined onClick={() => setShowCollabortrModal(true)} style={{ fontSize: 18 }} />
                  </Row>
                  {teamDataArr?.length > 0 ?
                    teamDataArr.map((res, index) => (
                      <Col style={{ padding: '0px 15px 10px 15px' }}>
                        <Row style={{ padding: 5, border: '1px solid #adb5bd', alignItems: 'center' }}>
                          <Avatar icon={<UserOutlined />} />
                          <p style={{ marginLeft: 10, color: '#444444' }} className="text-font">-</p>
                        </Row>
                      </Col>
                    ))
                    :
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 40 }}>
                      <img src={noDataIcon} style={{ height: 100, width: 100 }} />
                      <div style={{ marginTop: 10 }}>
                        <text style={{ textAlign: "center", fontSize: 14, color: '#B1B1B1', fontWeight: 500 }}>No Collaborators available.
                          <span onClick={() => openCollabModal()} style={{ fontSize: 14, color: '#00ACC1', fontWeight: 500, cursor: 'pointer' }}>Add Collaborators</span>
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
                    <p className="text-font">{opportunityDetails?.leadStatus}</p>
                    <p className="label-font">Status</p>
                  </Col>

                  <Col style={{ flex: 1 }}>
                    <p className="text-font">{opportunityDetails?.appointmentDate}</p>
                    <p className="label-font">Appointment Date</p>
                  </Col>

                  <Col style={{ flex: 1 }}>
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
                        {opportunityDetails?.appointmentTime}
                      </p>
                    </Tooltip>
                    <p className="label-font">Appointment Time</p>
                  </Col>
                </Row>

                <Row style={{ marginTop: 10 }}>
                  <Col style={{ flex: 1 }}>
                    <p className="text-font">{opportunityDetails?.leadDiposition}</p>
                    <p className="label-font">Disposition</p>
                  </Col>

                  <Col style={{ flex: 1 }}>
                    <p className="text-font">{opportunityDetails?.leadsubDisposition}</p>
                    <p className="label-font">Sub Disposition</p>
                  </Col>

                  <Col style={{ flex: 1 }}></Col>
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
                  <p className="app-font" style={{ color: '#444444' }}>Wallet Details</p>
                  {/* <Badge count={riskDetailsArr.length}  color="#faad14" /> */}
                  <Col style={{ display: 'flex', alignItems: 'center', marginLeft: 10 }}>
                    {/* <Badge count={riskDetailsArr.length} style={{background:'#00ACC1'}}/> */}
                  </Col>
                </Row>
                <PlusCircleOutlined onClick={() => openWalletModal('create')} style={{ fontSize: 20 }} />
              </Row>
              <div style={{ height: 1, backgroundColor: '#D8D8D8' }}></div>
              <Col style={{ padding: 10 }}>
                <Row>LOB wise Wallet Utilisation</Row>
                {
                  walletDetails?.length > 0 ? walletDetails.map((element, index) => {
                    return <Card className="app-card-head" style={{marginTop:"10px"}}>
                      <Row justify="space-between" style={{ alignItems: 'center', padding: '5px 10px 5px 10px' }}>
                        <p className="app-font" style={{ color: '#444444' }}>{element.lob_for_opportunity}</p>
                        <Row>
                          <DeleteOutlined  onClick={() => deleteWalletDetails(element, index)} style={{  fontSize: 16,color:'grey' }} />
                          <FormOutlined  onClick={() => openWalletModal('edit', element, index)} style={{ marginLeft: 15,fontSize: 16,color:'grey' }} />
                        </Row>
                      </Row>
                      <Row justify="space-between" style={{ alignItems: 'center', padding: '0px 60px 10px 10px' }}>
                        <Row>
                          {/* <Col><p className="app-font" style={{ color: '#444444' }}>{element.wallet_share}</p></Col> */}
                          <Col style={{flex:1}}>
                            <p className="text-font">{checkValidity(element.wallet_share)}</p>
                            <p className="label-font">Wallet Share</p>
                          </Col>
                        </Row>
                        <Row>
                          {/* <Col><p className="app-font" style={{ color: '#444444' }}>0</p></Col>
                          <Col><p >Actual Utilisation</p></Col> */}
                          <Col style={{flex:1}}>
                            <p className="text-font">0</p>
                            <p className="label-font">Actual Utilisation</p>
                          </Col>
                        </Row>
                      </Row>
                    </Card>
                  }) :  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 40 }}>
                  <img src={noDataIcon} style={{ height: 100, width: 100 }} />
                  <div style={{ marginTop: 10 }}>
                    <text style={{ textAlign: "center", fontSize: 14, color: '#B1B1B1', fontWeight: 500 }}>No Wallet details Available.
                      <span onClick={() =>openWalletModal('create')} style={{ fontSize: 14, color: '#00ACC1', fontWeight: 500, cursor: 'pointer' }}>Add Details</span>
                    </text>
                  </div>
                </div>
                }
               
              </Col>
            </Card>

            {/* KDM Details */}

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
                  <Row justify="space-between" style={{ alignItems: 'center', padding: '0px 15px 15px 15px' }} >
                    <p className="text-font" style={{ color: '#444444' }}>Event List</p>
                    {/* <PlusCircleOutlined onClick={() => setShowRemarkModal(true)} style={{ fontSize: 18 }} /> */}
                  </Row>
                  <>
                    {activities_data &&
                      !_.isEmpty(activities_data) &&
                      activities_data !== "No appointment " ? (
                      <div className="lead-activity-block" style={{ margin: '0px 10px 0px 10px' }}>
                        {activities_data?.map((item) => {
                          return (
                            <Col style={eventCardStyle}>
                              <Row style={{ flex: 1, alignItems: 'baseline' }}>
                                <CalendarOutlined style={{ color: '#fff', marginRight: 5, fontSize: 15 }} />
                                <p className="text-font" style={{ color: '#fff', textTransform: 'capitalize' }}>-</p>
                              </Row>
                              <Row>
                                <Col style={{ flex: 1, marginTop: 5 }}>
                                  <p className="label-font" style={{ color: '#fff' }}>Date</p>
                                  <p className="text-font" style={{ color: '#fff' }}>{moment(item.start_date).format("D MMM YYYY")}</p>
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

           
          </Col>
        </Row>


        {/* MODAL COMPONENTS */}
        <TodoTab
          getTodoData={getTodo}
          button={"Create"}
          leadID={updateLeadID}
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
          <ShowPdf show={isModalOpen} />
        </>
        <>
        {/* <Tab heading={storeFormData.producerdetails.raw_producer_name}/> */}
        </>
      </div>

    </>
  );
});
export default CompanyIntelligence;