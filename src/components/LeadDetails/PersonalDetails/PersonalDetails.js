import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Typography, Radio, Button, Input, Select, Tabs } from 'antd';
import TabsMain from '../../Tab/Tab'
import LeadDetailsTab from '../LeadDetailsTab';
const { Title } = Typography;

const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};

const maritalStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' }
]

let personalRoute = "/leadmasterpage/leaddetails/personallead"
const tabMenu = [
    {
        id: 1,
        value: "Status",
    },
    {
        id: 2,
        value: "Lead Details"
    },
    {
        id: 3,
        value: "Proposal Details"
    },
    {
        id: 4,
        value: "Documents Upload"
    },
    {
        id: 5,
        value: "History"
    },

]



const PersonalDetails = () => {

    return (
        <>
            <TabsMain
                tabMenu={tabMenu}
                header="New Lead"
                detailsRouteTab={personalRoute}
                activeKey="2"
            />
            <div className="form-container">
                <Row gutter={[0, 10]} justify="center">
                    <Col xs={22} sm={22} md={4} >
                        <Row gutter={['', 24]} justify="center">
                            <LeadDetailsTab activeKey="1" />
                        </Row>
                    </Col>
                    <Col xs={22} sm={22} md={18} >
                        <Row gutter={['', 24]} justify="center">
                            <Col className="form-body" xs={22} sm={24} md={20} lg={20} xl={20} >
                                <p className="form-title">Personal Details</p>
                                <Form layout="horizontal" className="contact-detail-form">
                                    <Col >
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name={['user', 'name']}
                                            label="First Name"
                                            rules={[
                                                {
                                                    required: false,
                                                },
                                            ]}
                                        >
                                            <Input className="first-name border-bottom" placeholder="Enter First Name" />
                                        </Form.Item>
                                    </Col>
                                    <Col >
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name={['user', 'name']}
                                            label="Middle Name"
                                            rules={[
                                                {
                                                    required: false,
                                                },
                                            ]}
                                        >
                                            <Input className="first-name border-bottom" placeholder="Enter Middle Name" />
                                        </Form.Item>
                                    </Col>
                                    <Col >
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name={['user', 'name']}
                                            label="Last Name"
                                            rules={[
                                                {
                                                    required: false,
                                                },
                                            ]}
                                        >
                                            <Input className="first-name border-bottom" placeholder="Enter Last Name" />
                                        </Form.Item>
                                    </Col>
                                    <Col >
                                        <Form.Item
                                            name="Gender"
                                            label="Gender"
                                            rules={[{ required: true, message: 'Please pick gender' }]}
                                        >
                                            <Radio.Group>
                                                <Radio.Button value="male">Male</Radio.Button>
                                                <Radio.Button value="female">Female</Radio.Button>
                                                <Radio.Button value="other">Other</Radio.Button>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col >
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Marital Status"
                                            label="Marital Status"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Select your Marital Status!',
                                                },
                                            ]}
                                        >
                                            <Select options={maritalStatusOptions} placeholder="Select Your State"></Select>
                                        </Form.Item>
                                    </Col>
                                </Form>
                            </Col>
                            <Col className="form-body" xs={22} sm={24} md={20} lg={20} xl={20} >
                                <Button shape="round" size="large" style={{ marginRight: 'auto' }}>Previous</Button>
                                <Button shape="round" type="primary" size="large" style={{ marginLeft: 'auto' }}>Proceed</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default PersonalDetails
