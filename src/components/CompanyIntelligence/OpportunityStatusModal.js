import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Tabs, Form, Input , Select, Button , Modal ,DatePicker  } from 'antd';
import '../StatusLead/StatusLead.css'
import * as actions from "../../store/actions/index";
import _ from "lodash";
import { dataFormatting } from '../../helpers'
import axiosRequest from '../../axios-request/request.methods'  
import { PlusOutlined } from '@ant-design/icons';
import moment from "moment";
import {
    no_contactItems,
    leadStatusItems,
    appointmentTimeOptions,
    contactItems,
  } from "../StatusLead/dataSet";

const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
};




const OpportunityComp = (props) => {
    
    // const storeLeadId = useSelector((state) => state.newLead.leadId)
    // const storeUserId = useSelector((state) => state.newLead.userId)
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const _StoreData = useSelector((state) => state?.newLead?.formData);
    const user_id = useSelector((state) => state.login.user.id);
    // console.log('(((((((((_StoreData___VASS)))))))))---->>>>',_StoreData)
    // console.log('(((((((((leadDetails)))))))))---->>>>',props.leadDetails)
    

    const [dispoArr, setDispoArr] = useState([]);
    const [subdispoArr, setSubDispoArr] = useState([]);
    const [showLeadDisposition, setShowLeadDisposition] = useState(false);
    const [showLeadSubDisposition, setShowLeadSubDisposition] = useState(false);
    const [showAppointmentFields, setShowAppointmentFields] = useState(false);
    const [apptDateString, setApptDateString] = useState("");
    const [appointmentStatus, setAppointmentStatus] = useState();
    const [appointmentDisposition, setAppointmentDisposition] = useState();
    const [appointmentSubDisposition, setAppointmentSubDisposition] = useState();

    const [formItem, setFormItem] = useState({
        status: "newleadentry",
        disposition: "",
        subDisposition: "",
        appointmentDate: "",
        appointmentTime: "",
    });



    
    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");

    const breakpoint = 620;
    
    // console.log('(((((((((opportunityDetails)))))))))---->>>>',props.opportunityDetails)

    useEffect(() => {
        // Data from Store
        // console.log('((((((_props.opportunityDetails_)))))))',props)
        if(props?.opportunityDetails){
            // changeLeadStatus(props.opportunityDetails.leadStatus);

            let _appntDate = "";
            let _appntTime = "";
            let _apptDateFormat = "";
            let _collabotrs = [];

            changeLeadStatus(props?.opportunityDetails?.leadStatus);
            if (props?.opportunityDetails?.leadDisposition === "appointment" && props?.opportunityDetails?.leadStatus === "contact") {
              // console.log('((((((AM HEREE)))))))',props)
              setAppointmentStatus(props?.opportunityDetails?.appointment_status === "" ? "newappointment" : props?.opportunityDetails?.appointment_status);
              setAppointmentDisposition("newApptmnt");
              setAppointmentSubDisposition("Untouched / Not updated Appointment");

              if (props?.opportunityDetails?.appointmentDate) {
                _appntDate = moment(props?.opportunityDetails?.appointmentDate).format("MM/DD/YYYY");
                _appntTime = moment(props?.opportunityDetails?.appointmentDate).format("LT");
                setApptDateString(_appntDate);

                _apptDateFormat = moment(moment(props?.opportunityDetails?.appointmentDate).format("MM/DD/YYYY"),"MM/DD/YYYY");
              }

              setShowLeadSubDisposition(true);
              setShowLeadDisposition(true);
              setShowAppointmentFields(true);
            } else {
              if (props?.opportunityDetails?.leadDisposition === "callback" && props?.opportunityDetails?.leadStatus === "contact") {
                // if (props?.opportunityDetails?.appointmentDetails) {
                _appntDate = moment(props?.opportunityDetails?.appointmentDate).format("MM/DD/YYYY");
                _appntTime = moment(props?.opportunityDetails?.appointmentDate).format("LT");
                setApptDateString(_appntDate);

                _apptDateFormat = moment(moment(props?.opportunityDetails?.appointmentDate).format("MM/DD/YYYY"),"MM/DD/YYYY");
                // }
                setShowLeadSubDisposition(true);
                setShowLeadDisposition(true);
                setShowAppointmentFields(true);
              }
            }
            form.setFieldsValue({
              lead_status: props?.opportunityDetails?.leadStatus,
              lead_disposition: props?.opportunityDetails.hasOwnProperty("leadDisposition") ? props?.opportunityDetails.leadDisposition : "",
              sub_disposition: props?.opportunityDetails.hasOwnProperty("leadsubDisposition") ? props?.opportunityDetails.leadsubDisposition : "",
              appointment_date: _apptDateFormat,
              appointment_time: props?.opportunityDetails?.appointmentTime,
            });
            setFormItem((res) => ({...res,appointmentTime: props?.opportunityDetails?.appointmentTime }));
            console.log(formItem,"this is the form item");
        }
        
    }, [props]);

    const changeLeadStatus = (event) => {
      // console.log('((((((changeLeadStatus)))))))',event)
        setFormItem((res) => ({ ...res,status: event }));
        form.setFieldsValue({lead_disposition: "",});
        setShowLeadSubDisposition(false);
    
        if (event === "newleadentry") {
          setDispoArr([]);
          setShowLeadDisposition(false);
          setShowAppointmentFields(false)
          // setShowLeadSubDisposition(false)
        } else if (event === "contact") {
          setDispoArr(contactItems);
          setShowLeadDisposition(true);
          setShowAppointmentFields(false)
        } else if (event === "no_contact") {
          setDispoArr(no_contactItems);
          setShowLeadDisposition(true);
          setShowAppointmentFields(false)
        }
    
        // const [dispoArr, setDispoArr] = useState([]);
    };
    
    const changeDispoStatus = (event) => {
        setFormItem((res) => ({ ...res,disposition: event }));
    
        setShowLeadSubDisposition(true);
    
        if (event === "leadconverted") {
          setSubDispoArr([
            { label: "Application Started", value: "Application Started" },
            { label: "Application Submitted", value: "Application Submitted" },
          ]);
          setShowAppointmentFields(false);
          setFormItem((res) => ({ ...res, subDisposition: "Application Started" }));
          form.setFieldsValue({ sub_disposition: "Application Started" });
        } else if (event === "notinterested") {
          setSubDispoArr([
            { label: "Lost to Competition", value: "Lost to Competition" },
            { label: "High Price", value: "High Price" },
          ]);
          setShowAppointmentFields(false);
    
          setFormItem((res) => ({ ...res, subDisposition: "Lost to Competition" }));
          form.setFieldsValue({ sub_disposition: "Lost to Competition" });
        } else if (event === "noteligible") {
          setSubDispoArr([
            { label: "Risk not feasible", value: "Risk not feasible" },
          ]);
          setShowAppointmentFields(false);
    
          setFormItem((res) => ({ ...res, subDisposition: "Risk not feasible" }));
          form.setFieldsValue({ sub_disposition: "Risk not feasible" });
        } else if (event === "interested") {
          setSubDispoArr([
            { label: "Proposal in progress", value: "Proposal in progress" },
            { label: "Proposal Submitted", value: "Proposal Submitted" },
          ]);
          setShowAppointmentFields(false);
    
          setFormItem((res) => ({
            ...res,
            subDisposition: "Proposal in progress",
          }));
          form.setFieldsValue({ sub_disposition: "Proposal in progress" });
        } else if (event === "callback") {
          setSubDispoArr([
            { label: "Ask to call back later", value: "Ask to call back later" },
            {
              label: "Decision maker unavailable",
              value: "Decision maker unavailable",
            },
          ]);
          setShowAppointmentFields(true);
    
          setFormItem((res) => ({
            ...res,
            subDisposition: "Ask to call back later",
          }));
          form.setFieldsValue({ sub_disposition: "Ask to call back later" });
        } else if (event === "appointment") {
          setSubDispoArr([
            {
              label: "Client has given appointment",
              value: "Client has given appointment",
            },
          ]);
          setShowAppointmentFields(true);
    
          setFormItem((res) => ({
            ...res,
            subDisposition: "Client has given appointment",
          }));
          form.setFieldsValue({ sub_disposition: "Client has given appointment" });
        } else if (event === "invalid") {
          setSubDispoArr([
            { label: "Wrong/Invalid Number", value: "Wrong/Invalid Number" },
          ]);
          setShowAppointmentFields(false);
    
          setFormItem((res) => ({
            ...res,
            subDisposition: "Wrong/Invalid Number",
          }));
          form.setFieldsValue({ sub_disposition: "Wrong/Invalid Number" });
        } else if (event === "notreachable") {
          setSubDispoArr([{ label: "Not Reachable", value: "Not Reachable" }]);
          setShowAppointmentFields(false);
    
          setFormItem((res) => ({ ...res, subDisposition: "Not Reachable" }));
          form.setFieldsValue({ sub_disposition: "Not Reachable" });
        }
    
        // setShowLeadSubDisposition(true)
    };

    const onChangeAppointData = (date, dateString) => {
        // console.warn('APOOOOO__DATE___',date)
        // console.warn('APOOOOO__DATE',dateString)
        setFormItem((res) => ({...res,appointmentDate: date }));
        setApptDateString(dateString);
        // const [apptDateString, setApptDateString] = useState("");
    };

    const submitOpportunity = () =>{
      let formBody = {
          lead_id: _StoreData._id,
          opportunity_status: {
              leadStatus: formItem.status,
              leadDisposition: formItem.disposition,
              leadsubDisposition: formItem.subDisposition,
              start_date: !apptDateString ? null : apptDateString,
              start_time:!formItem.appointmentTime ? null : formItem.appointmentTime ,
          }
      }

      dispatch(actions.editLead(formBody, _StoreData._id))
      props.setShowOpportunityModal(false)
    }

return (
    <>
        <Modal
            title="Opportunity Status"
            centered={true}
            visible={props.showOpportunityModal}
            width={width < breakpoint ? 370 : 700}
            className="modalStyle"
            onCancel={() => props.setShowOpportunityModal(false) }
            footer={null}
        >
            <Col
                className="mb-2"
                xs={24}
                sm={24}
                md={16}
                lg={15}
                xl={24}
                span={23}
                >
                {/* <Col
                className="form-body  p50 mb-3"
                xs={{ order: 3 }}
                // sm={16}
                // md={16}
                // lg={14}
                // xl={14}
                span={23}
                offset={width > breakpoint ? 2 : 0}
              > */}
                {/* <p className="form-title">Opportunities Status</p> */}
                <Form form={form} >
                    <Row gutter={16} className="mb-2 statsLead">
                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                            {...formItemLayout}
                            className="form-item-name label-color"
                            name="lead_status"
                            label="Status"
                           
                            rules={[
                                {
                                required: false,
                                message: "Select",
                                },
                            ]}
                            style={{ marginBottom: "1rem"}}
                            >
                            <Select
                                placeholder="Select"
                                options={leadStatusItems}
                                value={formItem.status}
                                style={{width:'100%'}}
                                onChange={(val) => changeLeadStatus(val)}
                            ></Select>
                            </Form.Item>
                        </Col>

                        {showLeadDisposition && (
                            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                                <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="lead_disposition"
                                    label="Disposition"
                                    rules={[
                                    {
                                        required: false,
                                        message: "Select",
                                    },
                                    ]}
                                    style={{ marginBottom: "1rem" }}
                                >
                                    <Select
                                        placeholder="Select"
                                        options={dispoArr}
                                        value={formItem.disposition}
                                        style={{width:'100%'}}
                                        onChange={(val) => changeDispoStatus(val)}
                                    ></Select>
                                </Form.Item>
                            </Col>
                        )}

                        {showLeadSubDisposition && (
                            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                                <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="sub_disposition"
                                    label="Sub Disposition"
                                    rules={[
                                    {
                                        required: false,
                                        message: "Select",
                                    },
                                    ]}
                                    style={{ marginBottom: "1rem" }}
                                >
                                    <Select
                                    placeholder="Select"
                                    options={subdispoArr}
                                    value={formItem.subDisposition}
                                    style={{width:'100%'}}
                                    onChange={(val) =>
                                        setFormItem((res) => ({
                                        ...res,
                                        subDisposition: val,
                                        }))
                                    }
                                    ></Select>
                                </Form.Item>
                            </Col>
                        )}
                    </Row>
                    {showAppointmentFields && (
                        <Row gutter={16} className="mb-2 statsLead">
                            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                                <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="appointment_date"
                                    label="Appointment Date"
                                    rules={[
                                    {
                                        required: false,
                                        message: "Select",
                                    },
                                    ]}
                                    style={{ marginBottom: "1rem" }}
                                >
                                    <DatePicker
                                    onChange={onChangeAppointData}
                                    value={formItem.appointmentDate}
                                    format="MM/DD/YYYY"
                                    style={{ display: "flex", flex: 1 }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                                <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="appointment_time"
                                    label="Appointment Time"
                                    rules={[
                                    {
                                        required: false,
                                        message: "Select",
                                    },
                                    ]}
                                    style={{ marginBottom: "1rem" }}
                                >
                                    <Select
                                    placeholder="Select"
                                    style={{width:'100%'}}
                                    options={appointmentTimeOptions}
                                    value={formItem.appointmentTime}
                                    onChange={(val) =>
                                        setFormItem((res) => ({
                                        ...res,
                                        appointmentTime: val,
                                        }))
                                    }
                                    ></Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    )}
              {/* </Col> */}
                </Form>
               
                <div  style={{display:'flex',flex:1,justifyContent:'flex-end',marginTop:20}}>
                    <Button size='large' onClick={()=> props.setShowOpportunityModal(false)} style={{flex:1,borderRadius:5,border:'1px solid #3B371E',color:'#3B371E'}} >Cancel</Button>
                    <Button size='large' onClick={()=> submitOpportunity()} style={{flex:1,borderRadius:5,backgroundColor:'#3b371e',color:'#fff',marginLeft:15}} >Update</Button>
                </div>
            </Col>
        </Modal>
    </>
)
}

export default OpportunityComp

