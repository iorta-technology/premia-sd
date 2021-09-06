import React, { useState } from 'react'
import { Row, Col, Form, Button, Input, Select, Space, DatePicker } from 'antd';
import Tabs from '../Tab/Tab'
import LeadDetailsTab from './LeadDetailsTab';

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
const ProposedProduct = () => {
    return (
        <>
            <Tabs
                tabMenu={tabMenu}
                header="New Lead"
                detailsRouteTab={personalRoute}
                activeKey="2"

            />
            <div className="form-container">
                <Row gutter={['', 24]} justify="center">
                    <Col xs={22} sm={22} md={4} >
                        <Row gutter={['', 24]} justify="center">
                            <LeadDetailsTab activeKey="5" />
                        </Row>
                    </Col>
                    <Col xs={22} sm={22} md={18} >
                        <Row gutter={['', 24]} justify="center">
                            <Col className="form-body" xs={22} sm={24} md={20} lg={20} xl={20} >
                                <p className="form-title">Proposed Product</p>
                                <Form layout="horizontal" className="contact-detail-form">
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Product Category"
                                            label="Product Category"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Select product category',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Select"></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Plan Name"
                                            label="Plan Name"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Select plan name',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Select"></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Expected Closure Date"
                                            label="Expected Closure Date"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Select Closure Date',
                                                },
                                            ]}
                                        >
                                            <Space direction="vertical" size={24}>
                                                <DatePicker placeholder="dd/mm/yyyy" />
                                            </Space>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Expected Premium"
                                            label="Expected Premium"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Select plan name',
                                                },
                                            ]}
                                        >
                                            <Input className="first-name border-bottom" placeholder="Expected Premium Amount1"></Input>
                                        </Form.Item>
                                    </Col>
                                </Form>
                            </Col>
                            <Col className="form-btn-container" style={{ marginBottom: '20px' }} xs={22} sm={24} md={20} lg={20} xl={20} >
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

export default ProposedProduct
