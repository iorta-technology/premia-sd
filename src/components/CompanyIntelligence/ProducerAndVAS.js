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

const ProducerAndVas = () => {
    
    // const storeLeadId = useSelector((state) => state.newLead.leadId)
    // const storeUserId = useSelector((state) => state.newLead.userId)
    // const dispatch = useDispatch()


    const [channelData, setChannelData] = useState("");
    const [producerData, setProducerData] = useState("");
    const [vasExecuted, setVasExecuted] = useState(1);

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

    const onChangeProducer = (e) => {
        // console.warn('FIRSTNAME',e)
        
        setProducerData(e.target.value);
    };

    const onChangeChannel = (e) => {
        setChannelData(e.target.value);
    };

    const onChangeVasExec = (e) => {
        console.log('radio checked', e.target.value);
        setVasExecuted(e.target.value);
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
            <p className="form-title">Producer and VAS</p>
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
                            options={kdmRoleArr}
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
                        name="kdmVasExec"
                        label="VAS Executed"
                        rules={[
                            // { required: true, message: "First Name is required",},
                            { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                        ]}
                        style={{ marginBottom: "1rem" }}
                    >
                        <Radio.Group onChange={onChangeVasExec  } value={vasExecuted}>
                            <Radio value={1}>Yes</Radio>
                            <Radio value={2}>No</Radio>
                        </Radio.Group>
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

export default ProducerAndVas

