import React, { useState } from 'react'
import { Row, Col, Form, Button, Input, Select, Space, DatePicker } from 'antd';

const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};
const ProposedProduct = () => {
    return (
        <div className="form-container">
            <Row gutter={['', 24]}>
                <Col className="contact-details" xs={22} sm={24} md={15} lg={15} xl={15} >
                    <div className="form-title">
                        <h4 level={4}>Professional Product</h4>
                    </div>
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
                                <Select  placeholder="Select"></Select>
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
                                <Select  placeholder="Select"></Select>
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
                <Col className="contact-details" xs={22} sm={24} md={15} lg={15} xl={15} >
                    <Button shape="round" size="large" style={{ marginRight: 'auto' }}>Previous</Button>
                    <Button shape="round" type="primary" size="large" >Update</Button>
                    <Button shape="round" type="primary" size="large" style={{ marginLeft: 'auto' }}>Proceed</Button>
                </Col>
            </Row>

        </div>
    )
}

export default ProposedProduct
