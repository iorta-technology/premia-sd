import React from 'react'

import { Row, Col, Form, Typography,Cascader, Button, Input, Select,Switch } from 'antd';
const { Title } = Typography;

const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };





const ContactDetails = React.memo(() => {


    return (
        <div className="form-container">
            <Row gutter={['', 24]}>
                <Col className="contact-details" xs={22} sm={24} md={15} lg={15} xl={15} >
                    <div className="form-title">
                        <Title level={4}>Mailing Address</Title>
                    </div>
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
                                <Input className="first-name border-bottom" placeholder="Enter Address line 1" />
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
                                <Input className="first-name border-bottom" placeholder="Enter Address line 2" />
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
                                <Input className="first-name border-bottom" placeholder="Enter Landmark" />
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
                                <Input className="first-name border-bottom" placeholder="Enter Pincode" />
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
                                <Input className="first-name border-bottom" placeholder="Enter Primary Mobile No" />
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
                                <Input className="first-name border-bottom" placeholder="Enter Alternate Mobile No" />
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
                                <Input className="first-name border-bottom" placeholder="Enter Landline No" />
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
                                <Input className="first-name border-bottom" placeholder="Enter Your Aadhaar No" />
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
                                <Input className="first-name border-bottom" placeholder="Enter Your Email Address" />
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
                            <Switch/>
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
                                <Input className="first-name border-bottom" placeholder="Enter Address line 1" />
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
                                <Input className="first-name border-bottom" placeholder="Enter Address line 2" />
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
                                <Input className="first-name border-bottom" placeholder="Enter Landmark" />
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
                                <Input className="first-name border-bottom" placeholder="Enter Pincode" />
                            </Form.Item>
                        </Col>
                    </Form>
                </Col>
                <Col className="contact-details" xs={22} sm={24} md={15} lg={15} xl={15} >
                    <Button shape="round" size="large" style={{marginRight:'auto'}}>Previous</Button>
                    <Button shape="round" type="primary" size="large" >Update</Button>
                    <Button shape="round" type="primary" size="large" style={{marginLeft:'auto'}}>Proceed</Button>
                </Col>
            </Row>
        </div>
    )
})

export default ContactDetails
