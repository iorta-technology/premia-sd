import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Typography, Cascader, Button, Input, Switch } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Tabs from '../../Tab/Tab'

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



const ContactDetails = React.memo(() => {
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
                <Row gutter={[0, 10]} justify="center">
                    <Col xs={24} sm={22} md={4} offset={2}>
                        <LeadDetailsTab activeKey="2" />
                    </Col>
                    <Col  className="m0a" xs={22} sm={22} md={17} >
                        <Col className="form-body p40" xs={24} sm={24} md={20} lg={20} xl={20} >
                            <p className="form-title">Contact Details</p>
                            <Form layout="horizontal" className="contact-detail-form">
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name={['user', 'name']}
                                        label="Address line 1"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <Input className="first-name input-box" placeholder="Enter Address line 1" />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name={['user', 'name']}
                                        label="Address line 2"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <Input className="first-name input-box" placeholder="Enter Address line 2" />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name={['user', 'name']}
                                        label="Landmark"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <Input className="first-name input-box" placeholder="Enter Landmark" />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="Country /State /City"
                                        label="Country /State /City"
                                    >
                                        <Cascader
                                            // options={options}
                                            placeholder="Please Select Country /State /City"
                                            size="medium"
                                            popupClassName="popup-size"
                                        // onChange={Append}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name={['user', 'name']}
                                        label="Pincode"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <Input className="first-name input-box" placeholder="Enter Pincode" />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name={['user', 'name']}
                                        label="Primary Mobile No"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <Input className="first-name input-box" placeholder="Enter Primary Mobile No" />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name={['user', 'name']}
                                        label="Alternate Mobile"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <Input className="first-name input-box" placeholder="Enter Alternate Mobile No" />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name={['user', 'name']}
                                        label="Landline No"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <Input className="first-name input-box" placeholder="Enter Landline No" />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name={['user', 'name']}
                                        label="Social Security (Aadhaar No.)"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <Input className="first-name input-box" placeholder="Enter Your Aadhaar No" />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name={['user', 'name']}
                                        label="Email Address"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <Input className="first-name input-box" placeholder="Enter Your Email Address" />
                                    </Form.Item>
                                </Col>
                            </Form>
                            <div className="form-title">
                                <Title level={5}>Permanent Address</Title>
                            </div>
                            <Col >
                                <Form.Item
                                    className="form-item-name label-color"
                                    name={['user', 'name']}
                                    label="Is your permarent address same as mailing address?"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                    ]}
                                >
                                    <Switch />
                                </Form.Item>
                            </Col>
                            <Form layout="horizontal" className="contact-detail-form">
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name={['user', 'name']}
                                        label="Address line 1"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <Input className="first-name input-box" placeholder="Enter Address line 1" />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name={['user', 'name']}
                                        label="Address line 2"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <Input className="first-name input-box" placeholder="Enter Address line 2" />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name={['user', 'name']}
                                        label="Landmark"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <Input className="first-name input-box" placeholder="Enter Landmark" />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="Country /State /City"
                                        label="Country /State /City"
                                    >
                                        <Cascader
                                            // options={options}
                                            placeholder="Please Select Country /State /City"
                                            size="medium"
                                            popupClassName="popup-size"
                                        // onChange={Append}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name={['user', 'name']}
                                        label="Pincode"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <Input className="first-name input-box" placeholder="Enter Pincode" />
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
})

export default ContactDetails
