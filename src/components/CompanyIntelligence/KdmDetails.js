import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Steps, Timeline, Divider, Image, Tabs, Form, Input , Select, Button  } from 'antd';
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

const KDMDetails = () => {
    
    // const storeLeadId = useSelector((state) => state.newLead.leadId)
    // const storeUserId = useSelector((state) => state.newLead.userId)
    // const dispatch = useDispatch()


    const [kdmName, setKdmName] = useState("");
    const [kdmRole, setKdmRole] = useState("");
    const [kdmDesigData, setKdmDesigData] = useState("");
    const [kdmPrimContData, setKdmPrimContData] = useState("");
    const [kdmAltContData, setKdmAltContData] = useState("");
    const [kdmEmailId, setKdmEmailId] = useState("");
    const [kdmDOBData, setKdmDOBData] = useState("");
    const [kdmStateData, setKdmStateData] = useState("");
    const [kdmCityData, setKdmCityData] = useState("");
    const [kdmBranchData, setKdmBranchData] = useState("");

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

    const onChangeKdmName = (e) => {
        // console.warn('FIRSTNAME',e)
        setKdmName(e.target.value);
    };

    const onChangeKdmRole = (e) => {
        setKdmRole(e.target.value);
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
            <p className="form-title">Key Decison Makers ( KDM ) Details</p>
            <Row gutter={16} className="mb-2 statsLead kdmStyle">
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="kdmName"
                        label="Key Decison Maker Name"
                        rules={[
                            // { required: true, message: "First Name is required",},
                            { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                        ]}
                        style={{ marginBottom: "1rem" }}
                    >
                        <Input
                            placeholder="Enter Key Decison Maker Name"
                            value={kdmName}
                            // defaultValue={kdmName}
                            onChange={(item) => onChangeKdmName(item)}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="kdmRole"
                        label="KDM Role"
                        style={{ marginBottom: "1rem" }}
                    >
                        <Select
                            bordered={true}
                            placeholder="Select KDM Role"
                            options={kdmRoleArr}
                            value={kdmRole}
                            // defaultValue={citiesOptions}
                            onChange={(item) => onChangeKdmRole(item)}
                        ></Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="kdmDesig"
                        label="KDM Designation"
                        // rules={[
                        //     // { required: true, message: "First Name is required",},
                        //     { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                        // ]}
                        style={{ marginBottom: "1rem" }}
                    >
                        <Input
                            placeholder="Enter KDM Designation"
                            value={kdmDesigData}
                            // defaultValue={kdmName}
                            onChange={(item) => onChangeKdmName(item)}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="kdmPrimContact"
                        label="KDM Primary Contact"
                        // rules={[
                        //     // { required: true, message: "First Name is required",},
                        //     { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                        // ]}
                        style={{ marginBottom: "1rem" }}
                    >
                        <Input
                            placeholder="Enter KDM Primary Contact"
                            value={kdmPrimContData}
                            // defaultValue={kdmName}
                            onChange={(item) => onChangeKdmName(item)}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="kdmAltContact"
                        label="KDM Alternate Contact"
                        // rules={[
                        //     // { required: true, message: "First Name is required",},
                        //     { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                        // ]}
                        style={{ marginBottom: "1rem" }}
                    >
                        <Input
                            placeholder="Enter KDM Alternate Contact"
                            value={kdmAltContData}
                            // defaultValue={kdmName}
                            onChange={(item) => onChangeKdmName(item)}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="kdmEmail"
                        label="KDM Email ID"
                        // rules={[
                        //     // { required: true, message: "First Name is required",},
                        //     { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                        // ]}
                        style={{ marginBottom: "1rem" }}
                    >
                        <Input
                            placeholder="Enter KDM Email ID"
                            value={kdmEmailId}
                            // defaultValue={kdmName}
                            onChange={(item) => onChangeKdmName(item)}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="kdmDOB"
                        label="Date Of Birth"
                        style={{ marginBottom: "1rem" }}
                    >
                        <Select
                            bordered={true}
                            placeholder="Select Date Of Birth"
                            options={kdmRoleArr}
                            value={kdmDOBData}
                            // defaultValue={citiesOptions}
                            onChange={(item) => onChangeKdmRole(item)}
                        ></Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="kdmState"
                        label="State"
                        style={{ marginBottom: "1rem" }}
                    >
                        <Select
                            bordered={true}
                            placeholder="Select State"
                            options={kdmRoleArr}
                            value={kdmStateData}
                            // defaultValue={citiesOptions}
                            onChange={(item) => onChangeKdmRole(item)}
                        ></Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="kdmCity"
                        label="City"
                        style={{ marginBottom: "1rem" }}
                    >
                        <Select
                            bordered={true}
                            placeholder="Select City"
                            options={kdmRoleArr}
                            value={kdmCityData}
                            // defaultValue={citiesOptions}
                            onChange={(item) => onChangeKdmRole(item)}
                        ></Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="kdmBranch"
                        label="Branch (if applicable)"
                        // rules={[
                        //     // { required: true, message: "First Name is required",},
                        //     { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                        // ]}
                        style={{ marginBottom: "1rem" }}
                    >
                        <Input
                            placeholder="Enter Branch"
                            value={kdmBranchData}
                            // defaultValue={kdmName}
                            onChange={(item) => onChangeKdmName(item)}
                        />
                    </Form.Item>
                </Col>

                <div style={{display:'flex',flex:1,justifyContent:'center',marginTop:15}}>
                    <Button style={{display:'flex',alignItems:'center',borderRadius:5}} size='large' icon={<PlusOutlined />}>Add KDM</Button>
                </div>
            </Row>
            <div  style={{display:'flex',flex:1,justifyContent:'flex-end',marginTop:20}}>
                <Button style={{borderRadius:5,backgroundColor:'#3b371e',color:'#fff'}} >Save and Update</Button>
            </div>
        </Col>
    </>
)
}

export default KDMDetails

