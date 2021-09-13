import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Typography, Radio, Button, Input, Select, Tabs } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
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
            <TabsMain
                tabMenu={tabMenu}
                header="New Lead"
                detailsRouteTab={personalRoute}
                activeKey="2"
            />
            <div className="form-container">
                <Row className="m0a" gutter={[0, 30]} justify="center">
                    <Col  xs={24} sm={22} md={4} offset={2}>
                        <LeadDetailsTab activeKey="1" />
                    </Col>
                    <Col className="m0a" xs={22} sm={22} md={17} offset={2}>
                        <Col className="form-body p40" xs={24} sm={24} md={20} lg={20} xl={20} >
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
                                        <Input className="first-name input-box" placeholder="Enter First Name" />
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
                                        <Input className="first-name input-box" placeholder="Enter Middle Name" />
                                    </Form.Item>
                                </Col>
                                <Col>
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
                                        <Input className="first-name input-box" placeholder="Enter Last Name" />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        name="Gender"
                                        label="Gender"
                                        rules={[{ required: true, message: 'Please pick gender' }]}
                                    >
                                        <Radio.Group>
                                            <Radio.Button  value="male">Male</Radio.Button>
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
                                        <Select size="large" options={maritalStatusOptions} placeholder="Select Your State"></Select>
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

export default PersonalDetails
