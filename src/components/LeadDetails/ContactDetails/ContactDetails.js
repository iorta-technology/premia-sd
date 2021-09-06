import React from 'react'
import { Row, Col, Form, Typography, Cascader, Button, Input, Switch } from 'antd';
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
                    <Col xs={22} sm={22} md={4} >
                        <Row gutter={['', 24]} justify="center">
                            <LeadDetailsTab activeKey="2" />
                        </Row>
                    </Col>
                    <Col xs={22} sm={22} md={18} >
                        <Row gutter={['', 24]} justify="center">
                            <Col className="form-body" xs={22} sm={24} md={20} lg={20} xl={20} >
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
                            <Col className="form-btn-container" xs={22} sm={24} md={20} lg={20} xl={20} >
                                <Button shape="round" size="large" style={{ marginRight: 'auto' }}>Previous</Button>
                                <Button shape="round" type="primary" size="large" style={{ marginLeft: 'auto' }}>Proceed</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>   

            </div>
        </>
    )                                        
})

export default ContactDetails
