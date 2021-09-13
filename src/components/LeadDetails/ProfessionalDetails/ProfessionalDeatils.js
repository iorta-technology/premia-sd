import React, { useState, useEffect } from 'react'
import { Row, Col, Form,  Button, Select } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

import Tabs from '../../Tab/Tab'
import LeadDetailsTab from '../LeadDetailsTab';

const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};

const educationOptions = [
    { value: '10', label: '10th std pass' },
    { value: '12', label: '12th std pass' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'postgraduate', label: 'Postgraduate' },
    { value: 'doctorate', label: 'Doctorate' },
    { value: 'below10', label: 'Below 10th std' },
    { value: 'illitrate', label: 'Illitrate/Uneducated' },
    { value: 'other', label: 'Other' },
]
const professionOptions = [
    { value: 'salaried-govt/psu', label: 'Salaried-Govt/PSU' },
    { value: 'salaried-other', label: 'salaried-Other' },
    { value: 'selfemployeedprofessional', label: 'Self Employeed Professional' },
    { value: 'agriculturist', label: 'Agriculturist/Farmer' },
    { value: 'parttimebussiness', label: 'Part time bussiness' },
    { value: 'retire', label: 'Retired' },
    { value: 'student', label: 'Student' },
    { value: 'housewife', label: 'Housewife' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'other', label: 'Other' },
]

const incomeGroupOptions = [
    { value: 'lessthan2.5lacs', label: 'Less than 2.5 Lacs' },
    { value: '2.5lacsto3.49lacs', label: '2.5 Lacs to 3.49 Lacs' },
    { value: '3.5lacsto4.49lacs', label: '3.5 Lacs to 4.99 Lacs' },
    { value: '5lacsto7.99lacs', label: '3.5 Lacs to 7.99 Lacs' },
    { value: '8lacsto9.99lacs', label: '8 Lacs to 9.99 Lacs' },
    { value: '10-14.99', label: 'More than 10 Lacs, Less than 14.99 Lacs' },
    { value: '15-20', label: 'More than 15 Lacs, Less than 20 Lacs' },
    { value: '20>', label: 'More than 20 Lacs' },
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
const ProfessionalDetails = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 620;

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [width]);
    return (
        <>
            <Tabs
                tabMenu={tabMenu}
                header="New Lead"
                detailsRouteTab={personalRoute}
                activeKey="2"

            />
            <div className="form-container">
                <Row gutter={[0, 20]} justify="center">
                    <Col xs={24} sm={22} md={4} offset={2}>
                        <LeadDetailsTab activeKey="3" />
                    </Col>
                    <Col className="m0a" xs={22} sm={22} md={17} >
                        <Col className="form-body p40" xs={24} sm={24} md={20} lg={20} xl={20} >
                            <p className="form-title">Professional Details</p>
                            <Form layout="horizontal" className="contact-detail-form">
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="Education"
                                        label="Education"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Select your Marital Status!',
                                            },
                                        ]}
                                    >
                                        <Select size="large" options={educationOptions} placeholder="Select "></Select>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="Profession Type"
                                        label="Profession Type"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Select your Marital Status!',
                                            },
                                        ]}
                                    >
                                        <Select size="large" options={professionOptions} placeholder="Select"></Select>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="Income Group"
                                        label="Income Group"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Select your Marital Status!',
                                            },
                                        ]}
                                    >
                                        <Select  options={incomeGroupOptions} placeholder="Select "></Select>
                                    </Form.Item>
                                </Col>
                            </Form>
                        </Col>
                        <Col className='form-body  p20' style={{margin:"20px 0"}} xs={{ order: 5 }} sm={24} md={20} lg={20} xl={20} span={24} >
                            <Row>
                                <Col xs={11} sm={12} md={4} offset={width > breakpoint ? 16 : 2} >
                                    <Button type="primary" shape="round" size="large" style={{ backgroundColor: 'rgb(0,172,193)', border: 'none' }} icon={<ArrowLeftOutlined />} >Previous</Button>
                                </Col>
                                <Col xs={11} sm={12} md={4}>
                                    <Button type="primary" shape="round" size="large" style={{ backgroundColor: 'rgb(228,106,37)', border: 'none' }} icon={<ArrowRightOutlined />}>Proceed</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ProfessionalDetails
