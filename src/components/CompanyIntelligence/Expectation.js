import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Radio, Tabs, Form, Input , Select, Button , Modal  } from 'antd';
import '../StatusLead/StatusLead.css'
import * as actions from "../../store/actions/index";
import _ from "lodash";
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

const Expectation = (props) => {
    
    // const storeLeadId = useSelector((state) => state.newLead.leadId)
    // const storeUserId = useSelector((state) => state.newLead.userId)
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const _StoreData = useSelector((state) => state?.newLead?.formData);
    const _UpdateFormBody = useSelector((state) => state?.newLead?.leadUpdateFormdata);
    const user_id = useSelector((state) => state.login.user.id);
    // console.log('(((((((((_StoreData___EXPECT)))))))))---->>>>',_StoreData)
    // console.log('(((((((((leadDetails)))))))))---->>>>',props.leadDetails)


    const [ourAskData, setOurAskData] = useState("");
    const [redFlagData, setRedFlagData] = useState('');
    const [clientExpectationData, setClientExpectationData] = useState('');


    useEffect(() => {
        setOurAskData(_StoreData?.our_ask)
        setRedFlagData( _StoreData?.red_flags)
        setClientExpectationData(_StoreData?.client_expectations)

        form.setFieldsValue({
            kdmClientExpectation:_StoreData?.client_expectations,
            kdmRedFlag:_StoreData?.red_flags,
            kdmOurAsk:_StoreData?.our_ask,
        });
    }, [props]);
    
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

    const kdmRoleArr = [
        {label:'TBI',value:'TBI'}
    ]

    const onChangeOurAsk = (e) => {
        // console.warn('FIRSTNAME',e)
        
        setOurAskData(e.target.value);
    };

    const onChangeClientExpect = (e) => {
        setClientExpectationData(e.target.value);
    };

    const onChangeRedFlag = (e) => {
        setRedFlagData(e.target.value);
    };

    const updateExpectation = (event) =>{

        let formBody = {
            lead_id: _StoreData._id,
            expectation: {
                client_expectations: clientExpectationData,
                red_flags: redFlagData,
                our_ask: ourAskData
            },
        
        }
        // console.warn('formBody ------>>>>>',formBody)
        // dispatch(actions.fetchLeadUpdateBody(formBody))
        dispatch(actions.editLead(formBody, _StoreData._id))
        props.setShowExpectationModal(false)
    }

return (
    <>
        <Modal
            title="Expectation"
            centered={true}
            visible={props.showExpectationModal}
            width={width < breakpoint ? 370 : 700}
            className="modalStyle"
            onCancel={() => props.setShowExpectationModal(false) }
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
                {/* <p className="form-title">Expectation</p> */}
                <Form form={form} >
                    <Row gutter={16} className="mb-2 statsLead kdmStyle">

                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="kdmClientExpectation"
                                label="Client Expectation"
                                // rules={[
                                //     // { required: true, message: "First Name is required",},
                                //     { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                                // ]}
                                style={{ marginBottom: "1rem" }}
                            >
                                <Input
                                    placeholder="Enter Client Expectation"
                                    value={clientExpectationData}
                                    // defaultValue={kdmName}
                                    onChange={(item) => onChangeClientExpect(item)}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="kdmRedFlag"
                                label="Red Flags"
                                // rules={[
                                //     // { required: true, message: "First Name is required",},
                                //     { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                                // ]}
                                style={{ marginBottom: "1rem" }}
                            >
                                <Input
                                    placeholder="Enter Red Flags"
                                    value={redFlagData}
                                    // defaultValue={kdmName}
                                    onChange={(item) => onChangeRedFlag(item)}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="kdmOurAsk"
                                label="Our Ask"
                                // rules={[
                                //     // { required: true, message: "First Name is required",},
                                //     { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                                // ]}
                                style={{ marginBottom: "1rem" }}
                            >
                                <Input
                                    placeholder="Enter Our Ask"
                                    value={ourAskData}
                                    // defaultValue={kdmName}
                                    onChange={(item) => onChangeOurAsk(item)}
                                />
                            </Form.Item>
                        </Col>


                        
                    </Row>
                </Form>
                <div  style={{display:'flex',flex:1,justifyContent:'flex-end',marginTop:20}}>
                    <Button size='large' onClick={()=> props.setShowExpectationModal(false)} style={{flex:1,borderRadius:5,border:'1px solid #3B371E',color:'#3B371E'}} >Cancel</Button>
                    <Button size='large' onClick={()=> updateExpectation()} style={{flex:1,borderRadius:5,backgroundColor:'#3b371e',color:'#fff',marginLeft:15}} >Update</Button>
                </div>
            </Col>
        </Modal>
    </>
)
}

export default Expectation

