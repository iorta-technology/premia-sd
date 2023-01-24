import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Radio, Tabs, Form, Input , Select, Button  } from 'antd';
import '../StatusLead/StatusLead.css'
import * as actions from "../../store/actions/history";
import _ from "lodash";
import { dataFormatting } from '../../helpers'
import axiosRequest from '../../axios-request/request.methods'  
import { PlusOutlined } from '@ant-design/icons';


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

const DocUpload = () => {
    
    // const storeLeadId = useSelector((state) => state.newLead.leadId)
    // const storeUserId = useSelector((state) => state.newLead.userId)
    // const dispatch = useDispatch()


    const [ourAskData, setOurAskData] = useState("");
    const [redFlagData, setRedFlagData] = useState('');
    const [clientExpectationData, setClientExpectationData] = useState('');
    
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

   
// useEffect(() => {
    
// }, []);

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
            <p className="form-title">Document Upload</p>
            <Row gutter={16} className="mb-2 statsLead kdmStyle">

                <Col xs={24} sm={12} md={24} lg={12} xl={8}>
                    <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="kdmClientExpectation"
                        label="Document Type"
                        rules={[
                            // { required: true, message: "First Name is required",},
                            { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                        ]}
                        style={{ marginBottom: "1rem" }}
                    >
                        <Input
                            placeholder="Enter Document Type"
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
                        rules={[
                            // { required: true, message: "First Name is required",},
                            { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                        ]}
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
                        rules={[
                            // { required: true, message: "First Name is required",},
                            { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                        ]}
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
            <div  style={{display:'flex',flex:1,justifyContent:'flex-end',marginTop:20}}>
                <Button style={{borderRadius:5,backgroundColor:'#3b371e',color:'#fff'}} >Save and Update</Button>
            </div>
        </Col>
    </>
)
}

export default DocUpload

