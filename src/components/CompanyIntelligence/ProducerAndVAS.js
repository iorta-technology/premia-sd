import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Radio, Tabs, Form, Input , Select, Button  } from 'antd';
import '../StatusLead/StatusLead.css'
import * as actions from "../../store/actions/index";
import _ from "lodash";
import { dataFormatting } from '../../helpers'
import axiosRequest from '../../axios-request/request.methods'  
import { PlusOutlined } from '@ant-design/icons';
import moment from "moment";


const tabMenu = [
    {
    id: 1,
    value: "Opportunity Details",
    },
    {
    id: 2,
    value: "Company Intelligence"
    },
    {
    id: 3,
    value: "History",
    },

]

const ProducerAndVas = (props) => {
    
    // const storeLeadId = useSelector((state) => state.newLead.leadId)
    // const storeUserId = useSelector((state) => state.newLead.userId)
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const _StoreData = useSelector((state) => state?.newLead?.formData);
    const _UpdateFormBody = useSelector((state) => state?.newLead?.leadUpdateFormdata);
    const user_id = useSelector((state) => state.login.user.id);
    console.log('(((((((((_StoreData___VASS)))))))))---->>>>',_StoreData)
    // console.log('(((((((((leadDetails)))))))))---->>>>',props.leadDetails)


    const [channelData, setChannelData] = useState("");
    const [producerData, setProducerData] = useState("");
    const [vasExecuted, setVasExecuted] = useState('No');
    const [showVasInput, setShowVasInput] = useState(false);
    const [vasInputData, setVasInputData] = useState('');
    
    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");

    const breakpoint = 620;
    const formItemLayout = {
        labelCol: {
            span: 24,
        },
        wrapperCol: {
            span: 24,
        },
    };

    useEffect(() => {
        setChannelData( _StoreData?.channel_name)
        setProducerData( _StoreData?.producer)
        setVasExecuted( _StoreData?.VAS_executed)
        setShowVasInput(_StoreData?.VAS_executed === 'Yes' ? true : false)
        setVasInputData(_StoreData?.VAS_input)
        form.setFieldsValue({
            kdmChannel:_StoreData?.channel_name,
            kdmProducer:_StoreData?.producer,
            vasInput:_StoreData?.VAS_input,
        });
    }, []);

    const channelDataArr = [
        {label:'Agency',value:'Agency'},
        {label:'Direct',value:'Direct'},
        {label:'MAP',value:'MAP'},
        {label:'Broker - A',value:'Broker - A'},
        {label:'Broker - B&C',value:'Broker - B&C'},
        {label:'Banca',value:'Banca'},
        {label:'HOM',value:'HOM'},
    ]

    const onChangeProducer = (e) => {
        // console.warn('FIRSTNAME',e)
        
        setProducerData(e.target.value);
    };

    const onChangeVasInput = (e) => {
        // console.warn('FIRSTNAME',e)
        
        setVasInputData(e.target.value);
    };
    

    const onChangeChannel = (e) => {
        setChannelData(e);
    };

    const onChangeVasExec = (e) => {
        console.log('radio checked', e.target.value);
        setVasExecuted(e.target.value);
        e.target.value === 'Yes' ? setShowVasInput(true) : setShowVasInput(false)
    };

    const updateProdVas = (event) =>{

        // let formBody = {
        //     ...props.updateFormData,
        //     channel_name: channelData,
        //     producer: producerData,
        //     VAS_executed: vasExecuted,
        // }
        let _appntDate = ''
        let _appntTime = ''
        let _apptDateFormat = ''

        if (_StoreData.appointmentDate) {
            _appntDate = moment(_StoreData.appointmentDate).format("MM/DD/YYYY");
            _appntTime = moment(_StoreData.appointmentDate).format("LT");
        }

        let formBody = {
            company_details: {
              company_name: _StoreData?.company_id?.company_name,
              parent_company: _StoreData?.company_id?.parent_company,
              industry_name: _StoreData?.company_id?.industry_name,
              tata_aig_empaneled:_StoreData?.company_id?.tata_aig_empaneled === true ? 'Yes' : 'No',
              client_location: _StoreData?.company_id?.client_location,
            },
            leadStatus: _StoreData?.leadStatus,
            leadDisposition: _StoreData?.leadDisposition,
            leadsubDisposition: _StoreData?.leadsubDisposition,
            opportunity_name: _StoreData?.opportunity_name,
            tender_driven: _StoreData?.tender_driven === true ? 'Yes' : 'No',
            LOB_opportunity: _StoreData?.lob_for_opportunity,
            product_for_opportunity: _StoreData?.product_for_opportunity,
            // remarks: _StoreData?.remarks,
            teamMembers : "[]",
            lead_Owner_Id: user_id,
            lead_Creator_Id: user_id,
            user_id: user_id,
            company_id: _StoreData?.company_id?._id,
            // start_date: _UpdateFormBody?.start_date,
            // start_time:_UpdateFormBody?.start_time,
            start_date: _appntDate,
            start_time: _appntTime,
            client_expectations: _StoreData?.client_expectations,
            red_flags: _StoreData?.red_flags,
            our_ask: _StoreData?.our_ask,
            channel_name: channelData,
            producer: producerData,
            VAS_executed: vasExecuted,
            VAS_input: vasInputData,
            // VAS_input: _StoreData?.VAS_input,
            kdm_details: _StoreData?.company_id?.kdm_details,
            risk_details: _StoreData?.company_id?.risk_details,
        }
        console.warn('formBody ------>>>>>',formBody)
        dispatch(actions.fetchLeadUpdateBody(formBody))
        dispatch(actions.editLead(formBody, props.leadDetails))
    }

return (
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
            <p className="form-title">Producer and VAS</p>
            <Form form={form} >
                <Row gutter={16} className="mb-2 statsLead kdmStyle">
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                        <Form.Item
                            {...formItemLayout}
                            className="form-item-name label-color"
                            name="kdmChannel"
                            label="Channel"
                            style={{ marginBottom: "1rem" }}
                        >
                            <Select
                                bordered={true}
                                placeholder="Select Channel"
                                options={channelDataArr}
                                value={channelData}
                                // defaultValue={citiesOptions}
                                onChange={(item) => onChangeChannel(item)}
                            ></Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                        <Form.Item
                            {...formItemLayout}
                            className="form-item-name label-color"
                            name="kdmProducer"
                            label="Producer"
                            rules={[
                                // { required: true, message: "First Name is required",},
                                { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                            ]}
                            style={{ marginBottom: "1rem" }}
                        >
                            <Input
                                placeholder="Enter Producer"
                                value={producerData}
                                // defaultValue={kdmName}
                                onChange={(item) => onChangeProducer(item)}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                        <Form.Item
                            {...formItemLayout}
                            className="form-item-name label-color"
                            label="VAS Executed"
                            style={{ marginBottom: "1rem" }}
                        >
                            <Radio.Group name="radiogroup" onChange={onChangeVasExec  } value={vasExecuted}>
                                <Radio value={'Yes'}>Yes</Radio>
                                <Radio value={'No'}>No</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    
                    { showVasInput &&
                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="vasInput"
                                label="VAS"
                                // rules={[
                                //     // { required: true, message: "First Name is required",},
                                //     { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                                // ]}
                                style={{ marginBottom: "1rem" }}
                            >
                                <Input
                                    placeholder="Enter VAS"
                                    value={vasInputData}
                                    // defaultValue={kdmName}
                                    onChange={(item) => onChangeVasInput(item)}
                                />
                            </Form.Item>
                        </Col>
                    }
                    
                </Row>
            </Form>
            <div  style={{display:'flex',flex:1,justifyContent:'flex-end',marginTop:20}}>
                <Button onClick={()=> updateProdVas()} style={{borderRadius:5,backgroundColor:'#3b371e',color:'#fff'}} >Save and Update</Button>
            </div>
        </Col>
    </>
)
}

export default ProducerAndVas

