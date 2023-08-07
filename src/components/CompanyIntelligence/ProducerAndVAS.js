import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Radio, Tabs, Form, Input , Select, Button , Modal  } from 'antd';
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
    // console.log('(((((((((_StoreData___VASS)))))))))---->>>>',_StoreData)
    // console.log('(((((((((leadDetails)))))))))---->>>>',props.leadDetails)


    const [channelData, setChannelData] = useState(null);
    const [producerData, setProducerData] = useState(null);
    const [vasExecuted, setVasExecuted] = useState('No');
    const [showVasInput, setShowVasInput] = useState(false);
    const [vasInputData, setVasInputData] = useState(null);
    
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
        setChannelData( _StoreData?.channel_name || null)
        setProducerData( _StoreData?.producer || null)
        setVasExecuted( _StoreData?.VAS_executed || 'No')
        setShowVasInput( _StoreData?.VAS_executed === 'Yes' ? true : false)
        setVasInputData(_StoreData?.VAS_input || null)
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
        let formBody = {
            lead_id: _StoreData._id,
            producer_vas: {
                VAS_executed: vasExecuted,
                channel_name: channelData,
                VAS_input: vasInputData,
                producer: producerData
            }
        }
        // console.warn('formBody ------>>>>>',formBody)
        // dispatch(actions.fetchLeadUpdateBody(formBody))
        dispatch(actions.editLead(formBody, _StoreData._id))
        props.setShowVasModal(false)
    }

return (
    <>
        <Modal
            title="Producer and VAS"
            centered={true}
            visible={props.showVasModal}
            width={width < breakpoint ? 370 : 700}
            className="modalStyle"
            onCancel={() => props.setShowVasModal(false) }
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
                {/* <p className="form-title">Producer and VAS</p> */}
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
                                    style={{width:'100%'}}
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
                                    style={{width:'100%'}}
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
                    <Button size='large' onClick={()=> props.setShowVasModal(false)} style={{flex:1,borderRadius:5,border:'1px solid #3B371E',color:'#3B371E'}} >Cancel</Button>
                    <Button size='large' onClick={()=> updateProdVas()} style={{flex:1,borderRadius:5,backgroundColor:'#3b371e',color:'#fff',marginLeft:15}} >Update</Button>
                </div>
            </Col>
        </Modal>
    </>
)
}

export default ProducerAndVas

