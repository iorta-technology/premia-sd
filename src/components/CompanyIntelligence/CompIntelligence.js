import React, { useState, useEffect, createRef ,useRef } from "react";
import "../../components/StatusLead/StatusLead.css";
import "./CompIntelligence.css";
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Select,
  Modal,
  Table,
  Tabs,
  Card,
  Collapse,
  Tooltip
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import TabsComp from "../../components/Tab/Tab";
import { msToDateString } from "../../helpers";
import _ from "lodash";
import { checkAgent, milToDateString } from "../../helpers";
import moment from "moment";
import axiosRequest from "../../axios-request/request.methods";
import { FormOutlined , PlusCircleOutlined ,UploadOutlined,CalendarOutlined , DeleteOutlined } from "@ant-design/icons";
import TodoTab from "../Activitity Tracker/RightSide-Todo/TodoCreate-Tab/Todo-Tab";
// import TodoCards from "../Activitity Tracker/RightSide-Todo/Todo-Event-Cards/TodoCards";
import TodoCards from "../Scheduler/RightSide-Todo/Todo-Event-Cards/TodoCards";
import noDataIcon from "../../assets/078e54aa9d@2x.png";
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
  // {
  //   id: 1,
  //   value: "Opportunity Details",
  // },
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

  const [companyDetails, setCompanyDetails] = useState({});
  const [opportunityDetails, setOpportunityDetails] = useState({});
  const [producerVasDetails, setProducerVasDetails] = useState({});
  const [expectationDetails, setExpectationDetails] = useState({});
  const [riskDetailsArr, setRiskDetailsArr] = useState([]);
  const [kdmDetailsArr, setKdmDetailsArr] = useState([]);
  const [kdmDataSet, setKdmDataSet] = useState({});
  const [riskDataSet, setriskDataSet] = useState({});
  const [activities_data, setActivities_data] = useState([]);

  const [active, setActive] = useState(null)
  const breakpoint = 620;

  const panelStyle = {
    marginBottom: 10,
    background: '#f7f7f7',
    borderRadius: 5,
    // border: '1px solid #ccc',
  };

  const eventCardStyle = {
    marginBottom: 10,
    background: '#cea0e1',
    borderRadius: 5,
    padding:10,
    // border: '1px solid #ccc',
  };

  const riskDataArr = [
    {
      riskName:'Tata Chemical',
      inceptionDate:'14th March,23',
      tagicPresence:'10',
      leaderShare:'10',
      entityName:'Tata Chemical',
      productName:'Metal',
      totalPremium:'80000',
      tagicPremium:'80000',
      leadFollower:'0',
      leadInsurer:'Lead',
      key:'1',
    },
    {
      riskName:'Tata Motors',
      inceptionDate:'14th March,23',
      tagicPresence:'10',
      leaderShare:'10',
      entityName:'Tata Chemical',
      productName:'Metal',
      totalPremium:'80000',
      tagicPremium:'80000',
      leadFollower:'0',
      leadInsurer:'Lead',
      key:'2',
    },
    {
      riskName:'Tata Steel',
      inceptionDate:'14th March,23',
      tagicPresence:'10',
      leaderShare:'10',
      entityName:'Tata Chemical',
      productName:'Metal',
      totalPremium:'80000',
      tagicPremium:'80000',
      leadFollower:'0',
      leadInsurer:'Lead',
      key:'3',
    },
  ]

  const eventDataArr = [
    {
      eventName:'Tata Chemical',
      eventDate:'14th March,23',
      eventTime:'10:00 AM to 11:00 AM',
      eventAgenda:'DONENENENENNE EJHEHJjhdjas dasjdhjhjdahjd dabdjhajhjd',
    },
    {
      eventName:'Tata Chemical',
      eventDate:'14th March,23',
      eventTime:'10:00 AM to 11:00 AM',
      eventAgenda:'DONENENENENNE EJHEHJjhdjas dasjdhjhjdahjd dabdjhajhjd',
    },
    {
      eventName:'Tata Chemical',
      eventDate:'14th March,23',
      eventTime:'10:00 AM to 11:00 AM',
      eventAgenda:'DONENENENENNE EJHEHJjhdjas dasjdhjhjdahjd dabdjhajhjd',
    },
  ]

  let kdmTabsArr = [
    {id:1,value:'KDM 1'},
    {id:2,value:'KDM 2'},
    {id:3,value:'KDM 3'},
    {id:4,value:'KDM 4'},
  ]

  let remarkTabs = [
    {id:'1',label:'Remarks'},
    {id:'2',label:'Collaborators'},
  ]

 
  // let tabPane = [];
  // if (kdmTabsArr && !_.isEmpty(kdmTabsArr)) {
  //   tabPane = _.map(kdmTabsArr, (value, id) => {
  //     return <TabPane key={value.id} tab={value.value}></TabPane>;
  //   });
  // }
  useEffect(() => {
    // console.warn('LEAD__ID__FROM___ROUTE___',props.location.state)
    // console.warn('LEAD__ID__FROM___ROUTE__.leadID_',props.location.state.leadID)
    dispatch(actions.headerName("New Lead"));
    if (props?.location?.state !== undefined) {
      let _leadID = !props.location.state.leadID
        ? props?.location?.state?._leadData?._id
        : props.location.state.leadID;
      getLeadDetails(_leadID);
      getAppointmentList(_leadID)
      // getAppointmentList(_leadID);
      // setUpdateLeadID(_leadID);
      // getEventTodoCountAPI(_leadID);
      // setIsNewLead(false);

      // if (props.location.state.hasOwnProperty("_leadData")) {
      //   loadValuesToFields(storeFormData);
      // }
    } else {
      // setIsNewLead(true);
      // setActivities_data([]);
      // setMobileDisable(false);
      // form.setFieldsValue({
      //   lead_status: "newleadentery",
      // });
    }
  }, [dispatch]);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  useEffect(() => {
    
  }, []);

  const getAppointmentList = async (lead_id) => {
    // setUpdateLeadID(lead_id)
    let _result = await axiosRequest.get(
      `user/fetch_appointments/${loginId}?teamdata=0&category=all&lead_id=${lead_id}`,
      { secure: true }
    );
    console.log('APPOINTMENT DATA---->>>',_result)
    setActivities_data(_result);
  };

  const getLeadDetails = async (lead_id) => {
    try {
      let result = await axiosRequest.get(`user/getlead_details/${lead_id}`, {
        secure: true,
      });
      if (result.length > 0) {
        dispatch(actions.fetchLeadDetailsSuccess(result[0]));
        if (result.length > 1) {
          let combined = {
            ...result[0],
            // appointmentDetails: {
            //   ...result[1],
            // },
          };
          loadValuesToFields(combined);
        } else {
          loadValuesToFields({ ...result[0], appointmentDetails: null });
        }
      }
    } catch (err) {}
  };

  const loadValuesToFields = (leadData) => {
    try {
      console.warn("__++++++++++++++ leadData +++++++++++>>", leadData);
      setUpdateLeadID(leadData?._id)
      setCompanyDetails(leadData?.company_id)
      // Setting Company name header
      dispatch(actions.headerName(leadData?.company_id?.company_name.toUpperCase()));

      // Setting Opportunity data
      let _opportunity = {
        appointmentDate : leadData?.appointmentDate,
        appointmentDetails : leadData?.appointmentDetails,
        appointmentId : leadData?.appointmentId,
        appointmentTime : leadData?.appointmentTime,
        leadStatus:leadData?.leadStatus,
        leadDisposition:leadData?.leadDisposition,
        leadsubDisposition:leadData?.leadsubDisposition,
        appointment_status:leadData?.appointment_status,
      }
      setOpportunityDetails(_opportunity)

      // Setting PRODUCER & VAS data
      let _vas = {
        VAS_executed:leadData?.VAS_executed,
        VAS_input:leadData?.VAS_input,
        channel_name:leadData?.channel_name,
        producer:leadData?.producer,
      }
      setProducerVasDetails(_vas)

      // Setting EXPECTATION data
      let _expectation = {
        client_expectations:leadData?.client_expectations,
        red_flags:leadData?.red_flags,
        our_ask:leadData?.our_ask,
      }
      setExpectationDetails(_expectation)

      setRiskDetailsArr(leadData?.company_id?.risk_details)

      leadData?.company_id?.kdm_details.forEach((el,index) =>{
        el.kdmTabs = `KDM ${index + 1}`
      })
      setKdmDetailsArr(leadData?.company_id?.kdm_details)
      handleKdmTabs(leadData?.company_id?.kdm_details[0])

      // console.warn("__++++++++++++++ KDM +++++++++++>>", leadData?.company_id?.kdm_details);


      // const [riskDetails, setRiskDetails] = useState({});
  // const [kdmDetailsArr, setKdmDetails] = useState({});

    } catch (err) {
      console.log("__++++++++++++++ err +++++++++++>>", err);
    }
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
  

  const tabClick = (key) => {};

  const openProdVasModal = () => {
    setShowVasModal(true)
  };
  const openKDMModal = (event) => {
    // if(event === 'create') setKdmDataSet({})
    // const [kdmType, setKdmType] = useState("");
    setKdmType(event)
    setShowKdmModal(true)
  };
  const openExpectationModal = () => {
    setShowExpectationModal(true)
  };

  const openRiskModal = (event,data,index) => {
    setShowRiskModal(true)
    setRiskType(event)
    setriskDataSet(data)
  };

  const openDocumentModal = () => {
    setShowDocumntModal(true)
  };

  const handleKdmTabs = (event) => {
    // console.log('handleKdmTabs -------->>>',event)
    setActive(event._id)

    setKdmDataSet(event)
    // const [kdmDataSet, setKdmDataSet] = useState({});
  };

  const getTodo = () => {
    childRef.current.getTodoData(0);
    // getEventTodoCountAPI(res.formData._id);
  };

  

  
  
  

  const handleCollapse = (event,data, ind) => {
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

  const checkValidity = (data) =>{
    if (data === "" || data === undefined || data === null) {
      return "-";
    } else {
      return data;
    }
  }
  
  const tabStyle = {
    color: "#000",
    background: "#fff",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#f0f0f0",
    height: width > 1090 ? 220 : "",
    width: width > 1090 ? 320 : width > 767 ? "66.33%" : "100%",
  };

  const genExtra = (ind) => {
    // riskInd === ind &&
    // showEditBtn ?
    // <FormOutlined
    //   onClick={(event) => {
    //     console.log('EDIT BTN CLICK',event)
    //     // If you don't want click extra trigger collapse, you can prevent this:
    //     event.stopPropagation();
    //   }}
    // />
    // : null
    // console.log('Collapse.isActive------',Collapse)
  };

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
              <Col style={{alignItems:'center',padding:5}} >
                <p className="app-font" style={{color:'#444444',marginLeft:10}}>Company Details</p>
              </Col>
              <div style={{height:1,backgroundColor:'#D8D8D8'}}></div>
              <Col style={{padding:10}}>
                <Row>
                  <Col style={{flex:1}}>
                    <p className="text-font">{companyDetails?.company_name}</p>
                    <p className="label-font">Name</p>
                  </Col>

                  <Col style={{flex:1}}>
                    <p className="text-font">{'-'}</p>
                    <p className="label-font">LOB</p>
                  </Col>
                  <Col style={{flex:1}}>
                    <p className="text-font">{companyDetails?.client_location}</p>
                    <p className="label-font">Location</p>
                  </Col>
                </Row>
                <Row style={{marginTop:10}}>
                  <Col style={{flex:1}}>
                    <p className="text-font">{companyDetails?.industry_name}</p>
                    <p className="label-font">Industry</p>
                  </Col>
                </Row>
              </Col>
            </Card>

            {/* Remarks and Collaborators */}
            <Card bordered={false} style={{marginTop:20}} className="app-card-head remarkTab">
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
                  </TabPane>
                  <TabPane tab="Collaborators" key="2" >
                    <Row justify="space-between" style={{alignItems:'center',padding:'0px 15px 15px 15px'}} >
                      <p className="text-font" style={{color:'#444444'}}>Collaborators</p>
                      <PlusCircleOutlined onClick={() => setShowCollabortrModal(true)} style={{fontSize:18}} />
                    </Row>
                  </TabPane>
              </Tabs>

            </Card>

            {/* Opportunity Status */}
            <Card bordered={false} style={{marginTop:20}} className="app-card-head">
              <Row justify="space-between" style={{alignItems:'center',padding:'5px 10px 5px 10px'}} >
                <p className="app-font" style={{color:'#444444'}}>Opportunity Status</p>
                <FormOutlined onClick={() => setShowOpportunityModal(true)} style={{fontSize:20}} />
              </Row>
              <div style={{height:1,backgroundColor:'#D8D8D8'}}></div>
              <Col style={{padding:10}}>
                <Row>
                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(opportunityDetails.leadStatus)}</p>
                    <p className="label-font">Status</p>
                  </Col>

                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(opportunityDetails.leadDisposition)}</p>
                    <p className="label-font">Disposition</p>
                  </Col>

                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(opportunityDetails.leadsubDisposition)}</p>
                    <p className="label-font">Sub Disposition</p>
                  </Col>
                </Row>

                <Row style={{marginTop:10}}>
                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(moment(opportunityDetails.appointmentDate).format("MM/DD/YYYY") )}</p>
                    <p className="label-font">Appointment Date</p>
                  </Col>

                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(opportunityDetails.appointmentTime)}</p>
                    <p className="label-font">Appointment TIme</p>
                  </Col>

                  <Col style={{flex:1}}></Col>
                </Row>
              </Col>
            </Card>

            {/* Producer and VAS */}
            <Card bordered={false} style={{marginTop:20}} className="app-card-head">
              <Row justify="space-between" style={{alignItems:'center',padding:'5px 10px 5px 10px'}} >
                <p className="app-font" style={{color:'#444444'}}>Producer and VAS</p>
                <FormOutlined onClick={() => openProdVasModal()} style={{fontSize:20}}/>
              </Row>
              <div style={{height:1,backgroundColor:'#D8D8D8'}}></div>
              <Col style={{padding:10}}>
                <Row>
                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(producerVasDetails?.channel_name)}</p>
                    <p className="label-font">Channel Name</p>
                  </Col>

                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(producerVasDetails?.producer)}</p>
                    <p className="label-font">Producer</p>
                  </Col>
                  <Col style={{flex:1}}></Col>
                </Row>
              </Col>
            </Card>

            {/* Expectation */}
            <Card bordered={false} style={{marginTop:20}} className="app-card-head">
              <Row justify="space-between" style={{alignItems:'center',padding:'5px 10px 5px 10px'}} >
                <p className="app-font" style={{color:'#444444'}}>Expectation</p>
                <FormOutlined onClick={() => openExpectationModal()} style={{fontSize:20}}/>
              </Row>
              <div style={{height:1,backgroundColor:'#D8D8D8'}}></div>
              <Col style={{padding:10}}>
                <Row>
                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(expectationDetails?.client_expectations)}</p>
                    <p className="label-font">Client Expectation</p>
                  </Col>

                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(expectationDetails?.red_flags)}</p>
                    <p className="label-font">Red Flag</p>
                  </Col>

                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(expectationDetails?.our_ask)}</p>
                    <p className="label-font">Our Ask</p>
                  </Col>
                </Row>
              </Col>
            </Card>
          </Col>

          {/* 2nd Column */}
          <Col sm={24} md={12} lg={8} xlg={8}>
            {/* Risk Details */}
            <Card bordered={false} className="app-card-head">
              <Row justify="space-between" style={{alignItems:'center',padding:'5px 10px 5px 10px'}} >
                <p className="app-font" style={{color:'#444444'}}>Risk Details</p>
                <PlusCircleOutlined onClick={() => openRiskModal('create')} style={{fontSize:20}} />
              </Row>
              <div style={{height:1,backgroundColor:'#D8D8D8'}}></div>
              <Col style={{padding:10}}>
              {riskDetailsArr &&
                riskDetailsArr.map((el,index) =>
                  <Collapse accordion={true} onChange={(text)=> handleCollapse(text,el,index)} expandIconPosition={'right'} style={panelStyle} defaultActiveKey={['1']}>
                    <Panel 
                      header={el.total_entities} 
                      key={el.key} 
                      extra={
                        <Row style={{marginTop:3}} onClick={e => e.stopPropagation()}>
                          <DeleteOutlined style={{fontSize:18,marginRight:10,color:'#737373'}} onClick={genExtra}/>
                          <FormOutlined onClick={() => openRiskModal('edit',el,index)} style={{fontSize:16,color:'#737373'}} />
                        </Row>
                      }
                      >
                      <Row>
                        <Col style={{flex:1}}>
                          <p className="text-font">{el.inception_date}</p>
                          <p className="label-font">Inception Date</p>
                        </Col>

                        <Col style={{flex:1}}>
                          <p className="text-font">{el.tagic_presence_percentage}</p>
                          <p className="label-font">TAGIC Presence</p>
                        </Col>

                        <Col style={{flex:1}}>
                          <p className="text-font">{el.leader_share}</p>
                          <p className="label-font">Leader Share %</p>
                        </Col>
                      </Row>

                      <Row style={{marginTop:10}}>
                        <Col style={{flex:1}}>
                          <p className="text-font">{el.total_entities}</p>
                          <p className="label-font">Name of Entities</p>
                        </Col>

                        <Col style={{flex:1}}>
                          {/* <p className="text-font">{el.product_for_opportunity}</p> */}
                          <Tooltip placement="top" title={el.product_for_opportunity}>
                              <p
                                className="form-title"
                                style={{
                                  marginBottom: 0,
                                  color: "grey",
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

                        <Col style={{flex:1}}>
                          <p className="text-font">{el.total_premium}</p>
                          <p className="label-font">Total Premium</p>
                        </Col>
                      </Row>

                      <Row style={{marginTop:10}}>
                        <Col style={{flex:1}}>
                          <p className="text-font">{el.tagic_premium}</p>
                          <p className="label-font">TAGIC Premium</p>
                        </Col>

                        <Col style={{flex:1}}>
                          <p className="text-font">{el.leader}</p>
                          <p className="label-font">Lead/Follower</p>
                        </Col>

                        <Col style={{flex:1}}>
                          {/* <p className="text-font">{el.lead_insurer}</p> */}
                          <Tooltip placement="top" title={el.lead_insurer}>
                              <p
                                className="form-title"
                                style={{
                                  marginBottom: 0,
                                  color: "grey",
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
              }
              </Col>
            </Card>

             {/* KDM Details */}
             <Card bordered={false} style={{marginTop:20}} className="app-card-head">
              <Row justify="space-between" style={{alignItems:'center',padding:'5px 10px 5px 10px'}} >
                <p className="app-font" style={{color:'#444444'}}>KDM Details</p>
                <Row>
                  <PlusCircleOutlined onClick={() => openKDMModal('create')} style={{fontSize:20}}/>
                  <FormOutlined onClick={() => openKDMModal('edit')} style={{marginLeft:15,fontSize:20}} />
                </Row>
              </Row>
              <div style={{height:1,backgroundColor:'#D8D8D8'}}></div>
              <Col style={{padding:10}}>
                <Row>
                  { kdmDetailsArr && 
                    kdmDetailsArr.map((el,index) => 
                      <Col onClick={() => handleKdmTabs(el)} className={`kdmTabs ${active === el._id && 'kdmTabsActive'}`}>
                        <p style={{margin:0,color:`${active === el._id ? '#fff' : '#737373'}`,fontWeight:400, fontSize:12}}>{el.kdmTabs}</p>
                      </Col>
                    )
                  }
                </Row>
              </Col>

              <Col style={{padding:10}}>
                <Row>
                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(kdmDataSet?.decision_maker_name)}</p>
                    <p className="label-font">Name</p>
                  </Col>

                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(kdmDataSet?.role)}</p>
                    <p className="label-font">Role</p>
                  </Col>

                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(kdmDataSet?.designation)}</p>
                    <p className="label-font">Designition</p>
                  </Col>
                </Row>

                <Row style={{marginTop:10}}>
                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(kdmDataSet?.primaryContact)}</p>
                    <p className="label-font">Phone Number</p>
                  </Col>

                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(kdmDataSet?.emailAddress)}</p>
                    <p className="label-font">Email ID</p>
                  </Col>

                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(kdmDataSet?.date_of_birth)}</p>
                    <p className="label-font">Date Of Birth</p>
                  </Col>
                </Row>

                <Row style={{marginTop:10}}>
                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(kdmDataSet?.city)}</p>
                    <p className="label-font">City</p>
                  </Col>

                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(kdmDataSet?.state)}</p>
                    <p className="label-font">State</p>
                  </Col>

                  <Col style={{flex:1}}>
                    <p className="text-font">{checkValidity(kdmDataSet?.branch)}</p>
                    <p className="label-font">Branch</p>
                  </Col>
                </Row>
              </Col>
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
                                  <p className="text-font" style={{color:'#fff',textTransform:'capitalize'}}>{item.stakeholder_name}</p>
                                </Row>
                                <Row>
                                  <Col style={{flex:1,marginTop:5}}>
                                    <p className="label-font" style={{color:'#fff'}}>Date</p>
                                    <p className="text-font" style={{color:'#fff'}}>{moment(item.start_date).format("D MMM YYYY")}</p>
                                  </Col>

                                  <Col style={{flex:1,marginTop:5}}>
                                    <p className="label-font" style={{color:'#fff'}}>Time</p>
                                    <p className="text-font" style={{color:'#fff'}}>{dateFun(item.start_time)} to {dateFun(item.end_time)}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col style={{flex:1,marginTop:5}}>
                                    <p className="label-font" style={{color:'#fff'}}>Agenda</p>
                                    <p className="text-font" style={{color:'#fff'}}>{add3Dots(item.event_description, 50)}</p>
                                  </Col>
                                </Row>
                            </Col>
                            );
                          })}
                        </div>
                      ) : (
                        <div style={{display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center",padding: 50}}>
                          <img src={noDataIcon} style={{ height: 150, width: 100 }} />
                          <div style={{ marginTop: 10 }}>
                            <text style={{ textAlign: "center", fontSize: 14 }}>{" "}No records found{" "}</text>
                          </div>
                        </div>
                      )}
                    </>
                  </TabPane>
                  <TabPane tab="To Do" key="2" >
                    <Row justify="space-between" style={{alignItems:'center',padding:'0px 15px 0px 15px'}} >
                      <p className="text-font" style={{color:'#444444'}}>Create To Do</p>
                      <PlusCircleOutlined onClick={() => setShowTodoModal(true)} style={{fontSize:18}} />
                    </Row>

                    <>
                      <div className="TodoCards" style={{padding:10}}>
                        <TodoCards leadID={updateLeadID} ref={childRef} />
                      </div>
                    </>
                  </TabPane>
              </Tabs>
             
            </Card>

            {/* Documents Uploaded */}
            <Card bordered={false} style={{marginTop:20}} className="app-card-head">
              <Row justify="space-between" style={{alignItems:'center',padding:'5px 10px 5px 10px'}} >
                <p className="app-font" style={{color:'#444444'}}>Documents Uploaded</p>
                <UploadOutlined onClick={() => openDocumentModal()} style={{fontSize:20}}/>
              </Row>
              <div style={{height:1,backgroundColor:'#D8D8D8'}}></div>
              <Col style={{padding:10}}>
                <Row>
                  <Col style={{flex:1}}>
                    <p className="text-font">Direct</p>
                    <p className="label-font">Channel Name</p>
                  </Col>

                  <Col style={{flex:1}}>
                    <p className="text-font">Rahul</p>
                    <p className="label-font">Producer</p>
                  </Col>
                  <Col style={{flex:1}}></Col>
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
          <KDMDetails kdmDataSet={ kdmType ==='create' ? {} : kdmDataSet} showKdmModal={showKdmModal} setShowKdmModal={setShowKdmModal} />
        </>
        <>
          <ProducerVAS producerVasDetails={producerVasDetails} showVasModal={showVasModal} setShowVasModal={setShowVasModal} />
        </>
        <>
          <Expectation expectationDetails={expectationDetails} showExpectationModal={showExpectationModal} setShowExpectationModal={setShowExpectationModal} />
        </>
        <>
          <RiskDetails riskDataSet={riskType ==='create' ? {} : riskDataSet} showRiskModal={showRiskModal} setShowRiskModal={setShowRiskModal} />
        </>
        <>
          <DocUpload showDocumntModal={showDocumntModal} setShowDocumntModal={setShowDocumntModal} />
        </>
        <>
          <RemarkComp showRemarkModal={showRemarkModal} setShowRemarkModal={setShowRemarkModal} />
        </>
        <>
          <CollaboratorComp showCollabortrModal={showCollabortrModal} setShowCollabortrModal={setShowCollabortrModal} />
        </>

        <>
          <OpportunityStatus showOpportunityModal={showOpportunityModal} setShowOpportunityModal={setShowOpportunityModal} opportunityDetails={opportunityDetails} />
        </>

        
      </div>
    </>
  );
});

export default CompanyIntelligence;
