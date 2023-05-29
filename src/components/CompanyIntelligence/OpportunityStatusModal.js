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

    const [formItem, setFormItem] = useState({
        status: "newleadentery",
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
    

    useEffect(() => {
        // Data from Store
        if(props.opportunityDetails){
            changeLeadStatus(props.opportunityDetails.leadStatus);
        }
        
    }, []);

    const changeLeadStatus = (event) => {
        setFormItem((res) => ({ ...res,status: event }));
        form.setFieldsValue({lead_disposition: "",});
        setShowLeadSubDisposition(false);
    
        if (event === "newleadentery") {
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
    


    const updateRemark = (event) =>{

        // let _appntDate = ''
        // let _appntTime = ''
        // let _apptDateFormat = ''

        // if (_StoreData.appointmentDate) {
        //     _appntDate = moment(_StoreData.appointmentDate).format("MM/DD/YYYY");
        //     _appntTime = moment(_StoreData.appointmentDate).format("LT");
        // }

        // let formBody = {
        //     company_details: {
        //       company_name: _StoreData?.company_id?.company_name,
        //       parent_company: _StoreData?.company_id?.parent_company,
        //       industry_name: _StoreData?.company_id?.industry_name,
        //       tata_aig_empaneled:_StoreData?.company_id?.tata_aig_empaneled === true ? 'Yes' : 'No',
        //       client_location: _StoreData?.company_id?.client_location,
        //       zone:_StoreData?.company_id?.zone
        //     },
        //     leadStatus: _StoreData?.leadStatus,
        //     leadDisposition: _StoreData?.leadDisposition,
        //     leadsubDisposition: _StoreData?.leadsubDisposition,
        //     opportunity_name: _StoreData?.opportunity_name,
        //     // tender_driven: _StoreData?.tender_driven === true ? 'Yes' : 'No',
        //     // LOB_opportunity: _StoreData?.lob_for_opportunity,
        //     // product_for_opportunity: _StoreData?.product_for_opportunity,
        //     // remarks: _StoreData?.remarks,
        //     teamMembers : "[]",
        //     lead_Owner_Id: user_id,
        //     lead_Creator_Id: user_id,
        //     user_id: user_id,
        //     company_id: _StoreData?.company_id?._id,
        //     // start_date: _UpdateFormBody?.start_date,
        //     // start_time:_UpdateFormBody?.start_time,
        //     start_date: _appntDate,
        //     start_time: _appntTime,
        //     client_expectations: _StoreData?.client_expectations,
        //     red_flags: _StoreData?.red_flags,
        //     our_ask: _StoreData?.our_ask,
        //     channel_name: channelData,
        //     producer: producerData,
        //     VAS_executed: vasExecuted,
        //     VAS_input: vasInputData,
        //     // VAS_input: _StoreData?.VAS_input,
        //     kdm_details: _StoreData?.company_id?.kdm_details,
        //     risk_details: _StoreData?.company_id?.risk_details,
        // }
        // console.warn('formBody ------>>>>>',formBody)
        // dispatch(actions.fetchLeadUpdateBody(formBody))
        // dispatch(actions.editLead(formBody, props.leadDetails))
        props.setShowOpportunityModal(false)
    }

return (
    <>
        <Modal
            title="Opportunity Status"
            centered={true}
            visible={props.showOpportunityModal}
            width={700}
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
                            style={{ marginBottom: "1rem" }}
                            >
                            <Select
                                placeholder="Select"
                                options={leadStatusItems}
                                value={formItem.status}
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
                    <Button size='large' onClick={()=> updateRemark()} style={{flex:1,borderRadius:5,backgroundColor:'#3b371e',color:'#fff',marginLeft:15}} >Update</Button>
                </div>
            </Col>
        </Modal>
    </>
)
}

export default OpportunityComp

