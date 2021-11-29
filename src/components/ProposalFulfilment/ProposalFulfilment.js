import React, { useState } from 'react';
import { Row, Col, Form, Menu, Tabs, Typography, Button, Input, Radio, Select, Cascader, DatePicker, Space, Modal, Checkbox } from 'antd';
import { Divider, Image, Card, Table } from 'antd';
import {
    ArrowRightOutlined
} from '@ant-design/icons';
import './ProposalFulfilment.css';
const { Title } = Typography;
function onChange(date, dateString) {
    console.log(date, dateString);
}
const { Option } = Select;
const contentStyle = {
    height: '100px',
    color: '#fff',
    // lineHeight: '180px',
    // textAlign: 'center',
    // background: '#364d79',
};
const columns = [
    {
        title: 'Insurer',
        dataIndex: 'image',
        key: 'name',

    },
    {
        title: 'Sum Assured',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Policy Type',
        dataIndex: 'address',
        key: 'address',
    },

    {
        title: 'Policy Status',
        key: 'Policy Status',

    },
    {
        title: 'Risk Commencement....',
        dataIndex: 'Risk Commencement ',
        key: 'Risk Commencement ',
    },
    {
        title: 'Application Date',
        dataIndex: 'Application Date',
        key: 'Application Date',
    },
    {
        title: 'Action',
        dataIndex: 'Action',
        key: 'Action',
    },
];
const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};
const setStateOptions = [

    { value: "Mr", label: "Mr" },
    { value: "Mrs", label: "Mrs" },
    { value: "Dr", label: "Dr" },
    { value: "Prof", label: "Prof" }
]
const ProposalFulfilment = () => {
    const [value, setValue] = React.useState(1);
    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");

    return (
        <>
            <div className="proposal-main">
                <div className="proposalfulfilment-row-flex">
                    <Tabs tabPosition={tabPosition} tabBarGutter="5vw" style={{ marginLeft: '1vw', marginRight: '1vw', marginTop: '1vw', backgroundColor: 'white', fontWeight: 'bolder' }}>
                        <TabPane tab="Personal" key="1" >
                            <div className="proposalfulfilment-details-card-style ">
                                <div className="proposalfulfilment-details-card-content-align">
                                    <Row gutter={[40, 24]} justify="start">
                                        <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                            <Row gutter={['', 24]}>
                                                <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                    <Form >
                                                        <Col>
                                                            <span className="proposal-label">Is Proposer and Life to be Assured the same?</span><br />
                                                            <div>
                                                                <Radio.Group onChange={onChange} value={value}>
                                                                    <Radio value={1}>Yes</Radio>
                                                                    <Radio value={2}>No</Radio>
                                                                </Radio.Group>
                                                            </div>
                                                        </Col>
                                                    </Form>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                            <Row gutter={['', 24]}>
                                                <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                    <h3 className="proposal-head3">Life To Be Assured</h3>
                                                    <h4 className="proposal-head4">Aadhar Card Details</h4>
                                                    <Form layout="horizontal" className="contact-detail-form">
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="City"
                                                                label="Aadhar Card Number"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Please enter aadhar card number',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input className="first-name border-bottom" placeholder="Enter Aadhar Card Number" />
                                                            </Form.Item>
                                                        </Col>
                                                    </Form>
                                                    <Col>
                                                        <h2 className="proposal-head2">Consent For Aadhar Authentication</h2>
                                                        <p className="proposal-paragraph">
                                                            I, the holder of Aadhar number xxxxxxxx, hereby give my consent to ABC Nippon Life Insurance to obtain my Aadhar Number,Name and Fingerprints/Iris details for authentication with UIDAI.ABC Nippon Life Insurance has informed me that my identity information would only be used for life insurance proposal and also informed that my biometrics will not be stored/shared and will be submitted to CIDR only for the purpose of authentication.
                                                        </p>
                                                    </Col><br />
                                                    <Col>
                                                        <Checkbox className="proposal-checkbox">I agree with the consent mentioned above</Checkbox>
                                                    </Col><br />
                                                    <Col>
                                                        <Button className="proposal-btn">Submit</Button>
                                                    </Col><br />
                                                    <Col>
                                                        <Form layout="horizontal" className="contact-detail-form">
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Title"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter title',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Select options={setStateOptions} placeholder="Select" style={{ width: '28vw' }}></Select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Full Name"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter full name',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input className="first-name border-bottom" placeholder="Enter Full Name" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Fathers Full Name"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter fathers full name',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input className="first-name border-bottom" placeholder="Enter Fathers Full Name" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Gender"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select Nominee gender',
                                                                        },
                                                                    ]}
                                                                >

                                                                    <Radio.Group defaultValue="a" buttonStyle="solid">
                                                                        <Radio.Button value="a" className="radio">Male</Radio.Button>
                                                                        <Radio.Button value="b" className="radio">Female</Radio.Button>
                                                                        <Radio.Button value="c" className="radio">Other</Radio.Button>
                                                                    </Radio.Group>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Martial Status"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select martial status',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Select placeholder="Select a martial status">
                                                                        <Option value="Select">Select</Option>
                                                                        <Option value="Single">Single</Option>
                                                                        <Option value="Married">Married</Option>
                                                                        <Option value="Divorced">Divorced</Option>
                                                                        <Option value="Widowed">Widowed</Option>
                                                                    </Select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Date Of Birth Of Life Assured"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select date of birth of life assured',
                                                                        },
                                                                    ]}
                                                                >    <DatePicker onChange={onChange} />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Nationality"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select nationality',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input className="first-name border-bottom" placeholder="Enter Nationality" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Education"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter education',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input className="first-name border-bottom" placeholder="Enter Education" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Source Of Income"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter source of income',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input className="first-name border-bottom" placeholder="Enter Source Of Income" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Annual Income"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter annual income',
                                                                        },
                                                                    ]}
                                                                ><Input className="first-name border-bottom" placeholder="Enter Annual Income" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Purpose Of Insurance"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select purpose of income',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Select placeholder="Select purpose of insurance">
                                                                        <Option value="Select">Select</Option>
                                                                        <Option value="Investment">Investment</Option>
                                                                        <Option value="Protection">Protection</Option>
                                                                    </Select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Occupation"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select occupation',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Select placeholder="Select occupation">
                                                                        <Option value="Select">Select</Option>
                                                                        <Option value="Agriculture">Agriculture</Option>
                                                                        <Option value="AntiqueDealer">AntiqueDealer</Option>
                                                                        <Option value="Armed Forces">Armed Forces</Option>
                                                                        <Option value="Business">Business</Option>
                                                                        <Option value="Diamond Trader">Diamond Trader</Option>
                                                                        <Option value="Farmer">Farmer</Option>
                                                                        <Option value="House Wife">House Wife</Option>
                                                                        <Option value="House Wife with High Income">House Wife with High Income</Option>
                                                                        <Option value="Jewellery Dealer">Jewellery Dealer</Option>
                                                                        <Option value="Labour">Labour</Option>
                                                                        <Option value="Machine Operator">Machine Operator</Option>
                                                                        <Option value="Politically Exposed Person">Politically Exposed Person</Option>
                                                                        <Option value="Professionals">Professionals</Option>
                                                                        <Option value="Retired">Retired</Option>
                                                                        <Option value="Salaried">Salaried</Option>
                                                                        <Option value="Unemployed">Unemployed</Option>
                                                                        <Option value="Working in Coal Mines">Working in Coal Mines</Option>
                                                                    </Select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Job Description"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter job description',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input className="email border-bottom" type="number" placeholder="Enter Job Description" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Nature Of Duties"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter nature of duties',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input className="email border-bottom" type="number" placeholder="Enter Nature Of Duties" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Are you ABC Group employee"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select ABC group employee',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Radio.Group onChange={onChange} value={value}>
                                                                        <Radio value={1}>Yes</Radio>
                                                                        <Radio value={2}>No</Radio>
                                                                    </Radio.Group>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col></Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Opting for ECS?"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select opting for ECS',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Radio.Group onChange={onChange} value={value}>
                                                                        <Radio value={1}>Yes</Radio>
                                                                        <Radio value={2}>No</Radio>
                                                                    </Radio.Group>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col></Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="PAN Card"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter pan card number',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input className="email border-bottom" type="number" placeholder="Enter PAN card No." />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col></Col>
                                                            <Col>
                                                                <h3 className="proposal-head3">Bank Details</h3>
                                                                <p className="proposal-paragraph">(Manadatory only in case if premium is &gt;= 25000)</p>
                                                            </Col>
                                                            <Col></Col>

                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Bank Account No"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter bank account no',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input className="email border-bottom" type="number" placeholder="Enter Bank Account No" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="IFSC Code"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter IFSC Code',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input className="email border-bottom" type="number" placeholder="Enter IFSC Code" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Bank Name"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter bank name',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input className="email border-bottom" type="text" placeholder="Bank Name" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Bank Branch"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter bank branch',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input className="email border-bottom" type="text" placeholder="Enter Bank Branch" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Bank Account Proof"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select bank account proof',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Select placeholder="Select">
                                                                        <Option value="Select">Select</Option>
                                                                        <Option value="Life Annunity">Cancelled Cheque</Option>
                                                                        <Option value="Life Annunity with ROP">Passbook Copy</Option>

                                                                    </Select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col></Col>
                                                            <Col>
                                                                <h3 className="proposal-head3">Mailing Address</h3>
                                                            </Col>
                                                            <Col></Col>

                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Address Line 1"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter address line 1',
                                                                        },
                                                                    ]}
                                                                ><Input className="email border-bottom" type="text" placeholder="Enter Address Line 1" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Address Line 2"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select address line 2',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input className="email border-bottom" type="text" placeholder="Enter Address Line 2" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="State"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select State',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Select placeholder="Select">
                                                                        <Option value="Select">Select</Option>
                                                                        <Option value="Life Annunity">Life Annunity</Option>
                                                                        <Option value="Life Annunity with ROP">Life Annunity with ROP</Option>

                                                                    </Select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="City"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select City',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Select placeholder="Select">
                                                                        <Option value="Select">Select</Option>
                                                                        <Option value="Life Annunity">Tura</Option>
                                                                        <Option value="Life Annunity with ROP">Shillong</Option>
                                                                        <Option>Nongstoin</Option>
                                                                        <Option>Nongpoh</Option>
                                                                        <Option>Mankachar</Option>
                                                                        <Option>Mairang</Option>
                                                                        <Option>Cherrapunji</Option>
                                                                    </Select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Pin Code"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter pin code',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input className="email border-bottom" type="text" placeholder="Enter Pin Code" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Email ID"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter email id',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input className="email border-bottom" type="text" placeholder="Enter Email ID" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Mobile No"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter mobile no',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input className="email border-bottom" type="text" placeholder="Enter Mobile No" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Landline No"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter landline no',
                                                                        },
                                                                    ]}
                                                                ><Input className="email border-bottom" type="text" placeholder="Enter Landline No" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <h3 className="proposal-head3">Permanent Address</h3>
                                                            </Col>
                                                            <Col></Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Is Your Permanent address same as Mailing address?"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select permanent address same as mailing address ',
                                                                        },
                                                                    ]}
                                                                ><Radio.Group onChange={onChange} value={value}>
                                                                        <Radio value={1}>Yes</Radio>
                                                                        <Radio value={2}>No</Radio>
                                                                    </Radio.Group>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col></Col>

                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Address Line 1"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter address line 1',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input className="email border-bottom" type="text" placeholder="Enter Address Line 1" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Address Line 2"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter address line 2 ',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input className="email border-bottom" type="text" placeholder="Enter Address Line 2" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="State"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select state',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Select placeholder="Select">
                                                                        <Option value="Select">Select</Option>
                                                                        <Option value="Life Annunity">Life Annunity</Option>
                                                                        <Option value="Life Annunity with ROP">Life Annunity with ROP</Option>

                                                                    </Select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="City"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please select city',
                                                                        },
                                                                    ]}
                                                                ><Select placeholder="Select">
                                                                        <Option value="Select">Select</Option>
                                                                        <Option value="Life Annunity">Tura</Option>
                                                                        <Option value="Life Annunity with ROP">Shillong</Option>
                                                                        <Option>Nongstoin</Option>
                                                                        <Option>Nongpoh</Option>
                                                                        <Option>Mankachar</Option>
                                                                        <Option>Mairang</Option>
                                                                        <Option>Cherrapunji</Option>
                                                                    </Select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col >
                                                                <Form.Item
                                                                    {...formItemLayout}
                                                                    className="form-item-name label-color"
                                                                    name="City"
                                                                    label="Pin Code"
                                                                    hasFeedback
                                                                    rules={[
                                                                        {
                                                                            required: false,
                                                                            message: 'Please enter pin code',
                                                                        },
                                                                    ]}
                                                                ><Input className="email border-bottom" type="text" placeholder="Enter Pin Code" />
                                                                </Form.Item>
                                                            </Col>
                                                        </Form>
                                                    </Col>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                                            <Row justify="space-around" gutter={['', 24]}>
                                                <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                    <Form >
                                                        <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                            <Col  >
                                                                <Button className="proposal-btn1">Previous</Button>
                                                            </Col>
                                                            <Col >
                                                                <Button className="proposal-btn">Proceed
                                                                    <ArrowRightOutlined
                                                                        style={{
                                                                            marginTop: "7px"
                                                                        }}
                                                                    />
                                                                </Button><br />
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Nominee" key="2" >
                            <Row gutter={[40, 24]} justify="center">
                                <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                    <Row gutter={['', 24]}>
                                        <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <h3 className="proposal-head3">Nominee Details</h3>
                                            <h4 className="proposal-head4">Nominee 1</h4>
                                            <Form layout="horizontal" className="contact-detail-form">
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="Gender"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee gender',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue="a">
                                                            <Radio.Button value="a" className="radio">Male</Radio.Button>
                                                            <Radio.Button value="b" className="radio">Female</Radio.Button>
                                                            <Radio.Button value="c" className="radio">Other</Radio.Button>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="Title"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee title!',
                                                            },
                                                        ]}
                                                    >
                                                        <Select placeholder="Select a title">
                                                            <Option value="Select">Select</Option>
                                                            <Option value="Mr">Mr</Option>
                                                            <Option value="Mrs">Mrs</Option>
                                                            <Option value="Dr">Dr</Option>
                                                            <Option value="Prof">Prof</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="Nominee Name"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee name!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input type="text" className="first-name border-bottom" placeholder="Enter Nominee Name" />
                                                    </Form.Item>

                                                </Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="Date Of Birth"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select date of birth!',
                                                            },
                                                        ]}
                                                    >
                                                        <DatePicker onChange={onChange} />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="Relationship of nominee with LA"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Relationship of nominee with LA!',
                                                            },
                                                        ]}
                                                    >
                                                        <Select placeholder="Select Relationship of nominee with LA">
                                                            <Option value="Select">Select</Option>
                                                            <Option value="5">Financier</Option>
                                                            <Option value="10">Brother-in-law</Option>
                                                            <Option value="15">Daughter</Option>
                                                            <Option value="20">Daughter-in-law</Option>
                                                            <Option value="25">Father</Option>
                                                            <Option>Father-in-law</Option>
                                                            <Option>Grand Daughter</Option>
                                                            <Option>Grand Father</Option>
                                                            <Option>Grand Mother</Option>
                                                            <Option>Grand Son</Option>
                                                            <Option>Husband</Option>
                                                            <Option>Mother</Option>
                                                            <Option>Mother-in-law</Option>
                                                            <Option>Others</Option>
                                                            <Option>Son</Option>
                                                            <Option>Spouse</Option>
                                                            <Option>Sister</Option>
                                                            <Option>Sister-in-law</Option>
                                                            <Option>Wife</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="Mobile No"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select mobile no!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input className="email border-bottom" type="text" placeholder="Enter Mobile No" />
                                                    </Form.Item>

                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="Email ID"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select email id!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input className="email border-bottom" type="text" placeholder="Enter Email ID" />
                                                    </Form.Item>
                                                </Col>
                                                <Col></Col>
                                                <Col>
                                                    <h4 className="proposal-head4">Nominee 1 Address Details</h4>
                                                </Col>
                                                <Col></Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="Is the Nominee address same as LA?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Is the Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </Col>
                                                <Col></Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="Do you want to add another nomiee??"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Do you want to add another nomiee?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </Col>
                                                <Col></Col>
                                                <Col>
                                                    <h3 className="proposal-head3">Appointment Details</h3>
                                                    <h4 className="proposal-head4">Appointee 1</h4>
                                                </Col>
                                                <Col></Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="Gender"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select gender!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group defaultValue="a" buttonStyle="solid">
                                                            <Radio.Button value="a" className="radio">Male</Radio.Button>
                                                            <Radio.Button value="b" className="radio">Female</Radio.Button>
                                                            <Radio.Button value="c" className="radio">Other</Radio.Button>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </Col>
                                                <Col></Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="Title"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select title!',
                                                            },
                                                        ]}
                                                    >
                                                        <Select placeholder="Select a title">
                                                            <Option value="Select">Select</Option>
                                                            <Option value="Mr">Mr</Option>
                                                            <Option value="Mrs">Mrs</Option>
                                                            <Option value="Dr">Dr</Option>
                                                            <Option value="Prof">Prof</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="Nominee Name"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee Name!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input type="text" className="first-name border-bottom" placeholder="Enter Nominee Name" />
                                                    </Form.Item>
                                                </Col>
                                                <Col >
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="Date Of Birth"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Date Of Birth!',
                                                            },
                                                        ]}
                                                    >
                                                        <DatePicker onChange={onChange} />

                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="Relationship of nominee with LA"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Is the Nominee address same as LA?Relationship of nominee with LA!',
                                                            },
                                                        ]}
                                                    >
                                                        <Select placeholder="Select Relationship of nominee with LA">
                                                            <Option value="Select">Select</Option>
                                                            <Option value="5">Financier</Option>
                                                            <Option value="10">Brother-in-law</Option>
                                                            <Option value="15">Daughter</Option>
                                                            <Option value="20">Daughter-in-law</Option>
                                                            <Option value="25">Father</Option>
                                                            <Option>Father-in-law</Option>
                                                            <Option>Grand Daughter</Option>
                                                            <Option>Grand Father</Option>
                                                            <Option>Grand Mother</Option>
                                                            <Option>Grand Son</Option>
                                                            <Option>Husband</Option>
                                                            <Option>Mother</Option>
                                                            <Option>Mother-in-law</Option>
                                                            <Option>Others</Option>
                                                            <Option>Son</Option>
                                                            <Option>Spouse</Option>
                                                            <Option>Sister</Option>
                                                            <Option>Sister-in-law</Option>
                                                            <Option>Wife</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>

                                                <Col>
                                                    <h4 className="proposal-head4">Appointee 1 Address Details</h4>
                                                </Col>
                                                <Col></Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="Is the Appointee address same as Nominee"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Is the Nominee address same as LA?Is the Appointee address same as Nominee!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </Col>
                                                <Col></Col>
                                                <Col>
                                                    <Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="Do you want to add another Appointee"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Do you want to add another Appointee!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </Col>
                                                <Col></Col>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                    <Row justify="space-around" gutter={['', 24]}>
                                        <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <Form >
                                                <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                    <Col  >
                                                        <Button className="proposal-btn1">Previous</Button>
                                                    </Col>
                                                    <Col >
                                                        <Button className="proposal-btn">Proceed
                                                            <ArrowRightOutlined
                                                                style={{
                                                                    marginTop: "7px"
                                                                }}
                                                            />
                                                        </Button><br />
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Family" key="3" >
                            <div>
                                <Row gutter={[40, 24]} justify="center">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form>
                                                    <Col>
                                                        <h3 className="proposal-head3">Family History Details</h3>
                                                    </Col>
                                                    <Col></Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="Have either of your parents or any brother or sister suffered from or died under the age of 60 due to the following conditions: Heart problem, diabetes, stroke, hypertension, raised cholestrol, cancer or any hereditary disease?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Button className="proposal-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="proposal-btn">Proceed
                                                                <ArrowRightOutlined
                                                                    style={{
                                                                        marginTop: "7px"
                                                                    }}
                                                                />
                                                            </Button><br />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </TabPane>
                        <TabPane tab="Insurance" key="4" >
                            <div>
                                <Row gutter={[40, 24]} justify="center">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form>
                                                    <Col>
                                                        <h3 className="proposal-head3">Life Insurance Details</h3>
                                                    </Col>
                                                    <Col></Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="Are you currently insured or applying for Life insurance cover, Critical illness cover, Accident benefit cover, not covered above?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col>
                                                        <Button>Add Policy</Button>
                                                    </Col>
                                                    <Table
                                                        columns={columns}
                                                        pagination={{ pageSize: 50 }}
                                                        scroll={{ x: '150vw' }}
                                                        style={{ marginTop: '2vw' }}
                                                    />
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Button className="proposal-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="proposal-btn">Proceed
                                                                <ArrowRightOutlined
                                                                    style={{
                                                                        marginTop: "7px"
                                                                    }}
                                                                />
                                                            </Button><br />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </TabPane>
                        <TabPane tab="Medical" key="5" >
                            <div>
                                <Row gutter={[40, 24]} justify="center">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form>
                                                    <Col>
                                                        <h3 className="proposal-head3">Life Style and Medical</h3>
                                                    </Col>
                                                    <Col></Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="1) Are you currently or do you intend engaging in any hazardous occupation or hobbies, eg. Working at heights, undergroundor offshore, using explosives, flying other than as fare-paying passenger,diving,mountaineering or any other dangerous activity?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="2) Are you currently or do you intend to live or travel outside of India for more than 6 months?If yes, please provide full details of countries to be visited and purpose of visit and duration"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="3) Habits: Do you smoke or have you smoked more than 5 cigarettes / E-Cigarettes or beedis or 3 Pouches of Gutka or Chewable Tobacco per day."
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="4) Do you consume or have you consumed any form of alcohol / liquor exceeding 90ml or 3 Pegs of Hard Liquor or 2 glasses of beer / wine per week."
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                </Form>
                                                <Form layout="horizontal" className="contact-detail-form">
                                                    <Col >
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name="City"
                                                            label="Height in Feet"
                                                            hasFeedback
                                                            rules={[
                                                                {
                                                                    required: false,
                                                                    message: 'Please select title!',
                                                                },
                                                            ]}
                                                        >
                                                            <Select placeholder="Select Height in Feet ">
                                                                <Option value="Select">Select</Option>
                                                                <Option value="1">1</Option>
                                                                <Option value="2">2</Option>
                                                                <Option value="3">3</Option>
                                                                <Option value="4">4</Option>
                                                                <Option value="5">5</Option>
                                                                <Option value="6">6</Option>
                                                                <Option value="7">7</Option>
                                                                <Option value="8">8</Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col >
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name="City"
                                                            label="Height in Inches"
                                                            hasFeedback
                                                            rules={[
                                                                {
                                                                    required: false,
                                                                    message: 'Please select title!',
                                                                },
                                                            ]}
                                                        >
                                                            <Select placeholder="Select Height in Inches ">
                                                                <Option value="Select">Select</Option>
                                                                <Option value="1">1</Option>
                                                                <Option value="2">2</Option>
                                                                <Option value="3">3</Option>
                                                                <Option value="4">4</Option>
                                                                <Option value="5">5</Option>
                                                                <Option value="6">6</Option>
                                                                <Option value="7">7</Option>
                                                                <Option value="8">8</Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col>
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name={['user', 'name']}
                                                            label="Weight in kgs"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                },
                                                            ]}
                                                        >
                                                            <Input className="email border-bottom" type="number" placeholder="Enter Weight in kgs" />
                                                        </Form.Item>
                                                    </Col>
                                                </Form>
                                                <Form >
                                                    <Col>
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name="City"
                                                            label="6) Are you currently taking any medication or drugs, other than minor conditions, (e.g. colds and flu), either prescribed by doctor, or have you suffered from any illness, disorder, disability or injury during the past 5 years which has required any form of medical or specialized examinations(including chest x-rays, gynecological inestigations, pap smear, or blood tests), consultaion,hospitalization or surgery?"
                                                            hasFeedback
                                                            rules={[
                                                                {
                                                                    required: false,
                                                                    message: 'Please select Nominee address same as LA?!',
                                                                },
                                                            ]}
                                                        ><br />
                                                            <Radio.Group onChange={onChange} value={value}>
                                                                <Radio value={1}>Yes</Radio>
                                                                <Radio value={2}>No</Radio>
                                                            </Radio.Group>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="7) Do you have : congenital / birth defects, pain or problems in the back, spine, muscles or joint,arthritis,gout, severe injury or other physical disability and have you been incapable of working /attending the school during the last 2 years for more than 5 days or are you currently incapable of working / attending school?
                                                "
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="8) Do you suffer from any medical ailments e.g: diabetes, high blood pressure, cancer, respiratory disease (including asthma),kidney, liver disease, stroke, any blood disorder, heart problems,hepatitisB, tuberculosis, psychiatric disorder, depression, HIV AIDS or a related infection?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="9) Is any surgery planned or are you currently aware or have been advised, that you may need to seek medical advice within the near future? (Other than for medical examinations that may arise from this application)"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="10) Have you ever suffered from drug or alcohol addiction or been advised by a doctor to reduce your alcohol / drug intake?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="11) Whether the Life Assured / Proposer / Nominee(s) is/are Politically Exposed Person(s)."
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Button className="proposal-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="proposal-btn">Proceed
                                                                <ArrowRightOutlined
                                                                    style={{
                                                                        marginTop: "7px"
                                                                    }}
                                                                />
                                                            </Button><br />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>                            </div>
                        </TabPane>
                        <TabPane tab="Vernacular" key="6" >
                            <div>
                                <Row gutter={[40, 24]} justify="center">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form>
                                                    <Col>
                                                        <h3 className="proposal-head3">Vernacular Details</h3>
                                                    </Col>
                                                    <Col></Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="ABC Life Insurance Company Limited requires that this proposal is completed by the Proposer. (If the Proposer does not read , write, or speak English, then this proposal may be completed by another person as per item 2 in guidelines of page 1 of this proposal. As such person need to complete this declaration.) I have explained the contents of this proposal to the Proposer and endeavoured to ensure that the contents have been fully understood. I have accurately recorded the responses to the information sought by the proposal form and I have read the responses back to the Proposer and confirmed that they are correct."
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h3 className="proposal-head3">Details Of Witness</h3>
                                                <Col>
                                                    <Form layout="horizontal" className="contact-detail-form">
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['user', 'name']}
                                                                label="Name"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Input className="email border-bottom" type="text" placeholder="Enter Name" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['user', 'name']}
                                                                label="Mobile No"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Input className="email border-bottom" type="text" placeholder="Enter Mobile No" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="Insurance Company"
                                                                label="Date of Birth"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Date of Birth',
                                                                    },
                                                                ]}
                                                            >
                                                                <div>
                                                                    <DatePicker onChange={onChange} />

                                                                </div>,
                                                            </Form.Item>
                                                        </Col>
                                                        <Col></Col>
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['user', 'name']}
                                                                label="Address Line 1"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Input className="email border-bottom" type="text" placeholder="Enter Address Line 1" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['user', 'name']}
                                                                label="Address Line 2"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Input className="email border-bottom" type="text" placeholder="Enter Address Line 2" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="City"
                                                                label="State"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Please select State!',
                                                                    },
                                                                ]}
                                                            >
                                                                <Select placeholder="Select">
                                                                    <Option value="Select">Select</Option>
                                                                    <Option value="Andra Pradesh">Andra Pradesh</Option>
                                                                    <Option value="Himachal Pradesh">Himachal Pradesh</Option>
                                                                    <Option value="Karnataka">Karnataka</Option>
                                                                    <Option value="Kerala">Kerala</Option>
                                                                    <Option value="Madhya Pradesh">Madhya Pradesh</Option>
                                                                    <Option value="Maharashtra">Maharashtra</Option>
                                                                    <Option value="Manipur">Manipur</Option>
                                                                    <Option value="Odisa">Odisa</Option>
                                                                    <Option value="Rajasthan">Rajasthan</Option>

                                                                </Select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="City"
                                                                label="City"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Please select city!',
                                                                    },
                                                                ]}
                                                            >
                                                                <Select placeholder="Select">
                                                                    <Option value="Select">Select</Option>
                                                                    <Option value="Life Annunity">Tura</Option>
                                                                    <Option value="Life Annunity with ROP">Shillong</Option>
                                                                    <Option>Nongstoin</Option>
                                                                    <Option>Nongpoh</Option>
                                                                    <Option>Mankachar</Option>
                                                                    <Option>Mairang</Option>
                                                                    <Option>Cherrapunji</Option>
                                                                </Select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['user', 'name']}
                                                                label="Pin Code"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Input className="email border-bottom" type="text" placeholder="Enter Pin Code" />
                                                            </Form.Item>
                                                        </Col>
                                                    </Form>
                                                </Col>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Button className="proposal-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="proposal-btn">Proceed
                                                                <ArrowRightOutlined
                                                                    style={{
                                                                        marginTop: "7px"
                                                                    }}
                                                                />
                                                            </Button><br />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>                            </div>
                        </TabPane>
                        <TabPane tab="Declaration" key="7" >
                            <div>
                                <Row gutter={[40, 24]} justify="center">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h3 className="proposal-head3">Declaration by Life to be Assured / Proposer</h3>
                                                <p className="proposal-paragraph">I understand and agree that the statements in this proposal form shall be the basis of the contract between me and ABC Life Insurance Company Limited ('the Company'). I agree that I will inform the Company if between the date of this proposal and the date of issuance of the policy about any change in my general health, occupation,financial position or if any other proposal or application to any other Insurance Company on my life is declined / postponed or accepted other than the standard terms so that the Company may consider the terms of acceptance.I understand that if I fail to disclose the information sought by the Company, then the Company may voidthe contract at its sole discretion without giving any further explanation and the consequence thereof shall follow. I agree that the Insurance protection shall only be provided effective from the date of acceptance of risk by the Company. I further declare that the statements in this proposal are true and I have disclosed all information which might be material to the Company while issuing the policy contract. I declare that I have read the sales literature of the proposed plan and understood the terms and conditions of the plan along with the associated risks and benefits which I propose to take. I declare that the premiums paid have  not been generated from the proceeds of any criminal activities/offences and I shall abide by and conform to the Prevention of Money Laundering Act, 2002 or any other applicable laws. I declare that the Company has disclosed and explained all the information related to this product and riders to me and I declare thatI have understood the same before signing this proposal form. In case of fraud the policy contract shall be cancelled immediately by forfeiture of all premiums paid or in case of misrepresentation the policy contractshall be cancelled immediately by refund of all premiums paid, subject to the fraud or misrepresentation being established by the insurer in accordance with Section 45 of the Insurance Act, 1938 as ammended from time to time.
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h3 className="proposal-head3">Authorization by Life to be Assured / Proposer</h3>
                                                <p className="proposal-paragraph">I hereby authorize the Company to charge any occupation / residential / age extra or reduce the sum assured on my proposal based on the information provided by me and the supporting documents submitted with this proposalform. I hereby authorize the Company to conduct screening/confirmation/ reconfirmation of overall status of the Life to be Assured including the health status through medical examinations, if required, which mayinclude Laboratory tests, Cardiac, Radiological investigations and other medical tests including blood tests to detect bacterial / viral / fungal infections. I hereby give my consent to undergo HIV1 /2 test by ELISA method. I am aware that this test is only for screening purposes and not confirmatory for HIV/AIDS. In order to enable the Company to assess the risk under this proposal and any time thereafter, I hereby, authorize the past and present employer(s)/business associates / medical practitioner / hospital and medical source/any life and non-life insurance Company / organization or Life Insurance Association to release to the Company the records of employment / business or other details as may be considered relevant for acceptance or otherwise of this proposal form. I agree that to underwrite the policy effectively, ABC Life Insurance Company may need to share my personnel information with a specialist service provider, who would keep the said information in secure and confidential manner. Payments will be made to the provided bank a/c, unless the bank a/c particulars are changed/modified by my written communication to RLIC. I also hereby agree and authorized the Company to access my data maintained by the Unique Identificatio Authority of India (UIDA) for KYC verification purpose.
                                                </p>
                                                <Col><Form.Item
                                                    {...formItemLayout}
                                                    className="form-item-name label-color"
                                                    name="City"
                                                    label="In Order to support ABC Life Insurance Company in its 'Go-Green' initiative, I agree to recieve policy documents by electronic mail instead of physical form"
                                                    hasFeedback
                                                    rules={[
                                                        {
                                                            required: false,
                                                            message: 'Please select Nominee address same as LA?!',
                                                        },
                                                    ]}
                                                >
                                                    <Radio.Group onChange={onChange} value={value}>
                                                        <Radio value={1}>Yes</Radio>
                                                        <Radio value={2}>No</Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                                </Col>
                                                <Col><Form.Item
                                                    {...formItemLayout}
                                                    className="form-item-name label-color"
                                                    name="City"
                                                    label="I am aware that in order to enable the company to assess the risk, I need to undergo medicals as per ABC Life Insurace Comapny Ltd. requirements and the same has been explained to may be the Adviser / Sales MAnager"
                                                    hasFeedback
                                                    rules={[
                                                        {
                                                            required: false,
                                                            message: 'Please select Nominee address same as LA?!',
                                                        },
                                                    ]}
                                                >
                                                    <Radio.Group onChange={onChange} value={value}>
                                                        <Radio value={1}>Yes</Radio>
                                                        <Radio value={2}>No</Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                                </Col>

                                                <Col><Form.Item
                                                    {...formItemLayout}
                                                    className="form-item-name label-color"
                                                    name="City"
                                                    label="I authorize ABC Life Insurance Comapany Limited and/or its representative to call us/me for all policy service related calls."
                                                    hasFeedback
                                                    rules={[
                                                        {
                                                            required: false,
                                                            message: 'Please select Nominee address same as LA?!',
                                                        },
                                                    ]}
                                                >
                                                    <Radio.Group onChange={onChange} value={value}>
                                                        <Radio value={1}>Yes</Radio>
                                                        <Radio value={2}>No</Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                                </Col>
                                                <Checkbox>I agree</Checkbox>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h3 className="proposal-head3">Prohibitation of rebate</h3>
                                                <p className="proposal-paragraph">1.No person shall allow or offer to allow, either directly on indirectly , as an inducement to any person to take or renew or continue an insurance in respect of any kinds of risk relating to lives or property in india,any rebate of the whole or part of the commission payable or any rebate of the premium shown on the policy,nor shall any person taking out or renewing or continuing a Policy accept any rebate, except such rebate as may be allowed in accordance with the published prospectuses or tabes of the insurer.
                                                </p>
                                                <p className="proposal-paragraph">2.Any person making the default in complying with the provisions of this section shall be liable for a prohibitionrebate which may extend to ten lakh rupees.Please refer to our website or contact our office for the details under the above mentioned Sectioned 41.</p>

                                                <Checkbox>I agree</Checkbox>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 4 }} sm={24} md={24} lg={{ order: 4 }} xl={{ order: 4 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h3 className="proposal-head3">Policy not be called in question after 3 years</h3>
                                                <p className="proposal-paragraph">1) No policy of life insurance shalle be called in question on any ground whatsoever after the expiry of three years from the date of the policy i.e., from the date of insurance of the policy or the date of commencement of risk or the date of revival of the policy or the date of the rider to the policy, whichever is later.</p>
                                                <p className="proposal-paragraph">2) A policy of life insurance may be called in question at anytime within three years from the date of insurance of the policy or the date of commencement of risk or the date of revival of the policy or the date of the rider to the policy, whichever is later, on the ground of fraud : provided that the insurer shall have to communicate in writing to the insure or the legal representatives or nominees or assigners of the insured the grounds and materials on which such decisions is based.</p>
                                                <p className="proposal-paragraph">3) Notwithstanding anything contained in subsection(2), No insurer shall repudiate a life insurance policy on the ground of fraud if the insured can prove that the mis-statement of supression of material fact was true to the best of his knowledge and belief or that there was no deliberate intention to supress the fact or that such mis-statement of supression of the material fact or within the knowledge of the insurer-provided that in case of fraud, the onus of disproving lies upon the beneficiaries, in case the policy holder is not alive.</p>
                                                <p className="proposal-paragraph">4) A policy of life insurance may be called in question at any time within three years from the date of insurance of the policy or the date of commencement of risk or the date of revival of the policy or the date of the rider to the policy ,whichever is later, on the ground that any statement or supression of the fact material to the expectancy of the life of the insured was incorrectly made in the proposal or other document on the basis of which the policy was issued or revived or rider issued; Provided that the insurer shall have to communicate in writing to the insured the grounds and materials on which such decision to repudiate the policy of life insurance is based; Provided further that in case of repudation of the policy on the ground of misstatement or supression of material fact, and not on the ground of fraud, the premiums collected on the policy till the date of repudation shall be paid to the insured or legal representatives or nominees or assignees of the insured within a period of ninety days from the, whichever is later, on the ground that any statement or supression of the fact material to the expectancy of the life of the insured was incorrectly made in the proposal or other document on the basis of which the policy was issued or revived or rider issued; Provided that the insurer shall have to communicate in writing to the insured the grounds and materials on which such decision to repudiate the policy of life insurance is based; Provided further that in case of repudation of the policy on the ground of misstatement or supression of material fact, and not on the ground of fraud,the premiums collected on the policy till the date of repudation shall be paid to the insured or legal representatives or nominees or assignees of the insured within a period of ninety days from the date of such repudation.Mis-statement or supression of shall not be considered material unless it has a direct bearing on the risk undertaken by the insurer. the onus is on the insurer to show that had the insurer been aware of the said fact no life insurance policy would have been issued to the insured. Nothing in this section shall prevent the insurer from calling for proof of age at any time if if entitled to do so, and no policy shall be deemed to be called in question merely because the term of the policy are adjusted on subsequent proof that the age of the life insured was incorrectly stated in the proposal.</p>

                                                <Checkbox>I agree</Checkbox>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 5 }} sm={24} md={24} lg={{ order: 5 }} xl={{ order: 5 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Button className="proposal-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="proposal-btn">Proceed
                                                                <ArrowRightOutlined
                                                                    style={{
                                                                        marginTop: "7px"
                                                                    }}
                                                                />
                                                            </Button><br />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>                            </div>
                        </TabPane>
                        <TabPane tab="Report" key="8" >
                            <div>
                                <Row gutter={[40, 24]} justify="center">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h3 className="proposal-head3">Confidential Report</h3>
                                                <Form>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="1) Have you met the Proposer & the Life to be Assured?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="2) Are you (Advisor / SM) related to the Life to be Assured? If Yes, to whom and what is the relationship?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="3) Do you notice any disability, mental or physical deformity for Life to be Assured?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="4) Are you personally satisfied with the financial standing of the Proposer & Life to be Assured in relation to the proposed insurance? Please estimate the income of the Proposer."
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col >
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name={['user', 'name']}
                                                            label="Income of the Proposer"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                },
                                                            ]}
                                                        >
                                                            <Input className="email border-bottom" type="number" placeholder="Enter Income of the Proposer" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="5) Is the income proof verified by you? What is the type of income proof verified"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col >
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name="City"
                                                            label="Type Of Income proof"
                                                            hasFeedback
                                                            rules={[
                                                                {
                                                                    required: false,
                                                                    message: 'Please select Type Of Income proof!',
                                                                },
                                                            ]}
                                                        >
                                                            <Select placeholder="Select Type Of Income proof ">
                                                                <Option value="Select">Select</Option>
                                                                <Option value="1">1</Option>
                                                                <Option value="2">2</Option>
                                                                <Option value="3">3</Option>
                                                                <Option value="4">4</Option>
                                                                <Option value="5">5</Option>
                                                                <Option value="6">6</Option>
                                                                <Option value="7">7</Option>
                                                                <Option value="8">8</Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="6) Is the age proof verified by you for all Life to be Assured?"
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col><Form.Item
                                                        {...formItemLayout}
                                                        className="form-item-name label-color"
                                                        name="City"
                                                        label="7) Is the Life to be Assured, presently, in good health? if no, give details."
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select Nominee address same as LA?!',
                                                            },
                                                        ]}
                                                    >
                                                        <Radio.Group onChange={onChange} value={value}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col>
                                                        <p>8) How long have you konwn the Life to be assured?</p>
                                                    </Col>
                                                </Form>
                                                <Form layout="horizontal" className="contact-detail-form">
                                                    <Col >
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name={['user', 'name']}
                                                            label="Years"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                },
                                                            ]}
                                                        >
                                                            <Input className="email border-bottom" type="number" placeholder="Enter Years" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col >
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name={['user', 'name']}
                                                            label="Months"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                },
                                                            ]}
                                                        >
                                                            <Input className="email border-bottom" type="number" placeholder="Enter Months" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col >
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            className="form-item-name label-color"
                                                            name={['user', 'name']}
                                                            label="Mobile No"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                },
                                                            ]}
                                                        >
                                                            <Input className="email border-bottom" type="text" placeholder="Enter Mobile No" />
                                                        </Form.Item>
                                                    </Col>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="proposal-personal1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Button className="proposal-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="proposal-btn">Proceed
                                                                <ArrowRightOutlined
                                                                    style={{
                                                                        marginTop: "7px"
                                                                    }}
                                                                />
                                                            </Button><br />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
export default ProposalFulfilment;