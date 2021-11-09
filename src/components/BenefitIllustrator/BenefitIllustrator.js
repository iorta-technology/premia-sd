import React, { useState } from 'react'
import './BenefitIllustrator.css';
import { Row, Col, Form, Typography, Button, Input, Radio, Select, Cascader, DatePicker, Space, Modal } from 'antd';
import { Divider, Card } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
function onChange(date, dateString) {
    console.log(date, dateString);
}
const { Option } = Select;
const contentStyle = {
    height: '100px',
    color: '#fff',
};
const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};

const setStateOptions = [

    { value: "Select Type", label: "Select Type" },
    { value: "Sum Assured to Premium", label: "Sum Assured to Premium" },
    { value: "Premium to Sum Assured", label: "Premium to Sum Assured" },
]
const BenefitIllustrator = () => {
    const [value, setValue] = React.useState(1);
    return (
        <div className="form-container">
            <Row gutter={[40, 24]} justify="center">
                <Col xs={{ order: 1 }} sm={16} md={16} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                    <Row gutter={['', 24]}>
                        <Col className="benefitillustrator1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                            <Title className="bi-heading">Enter Details</Title><br />
                            <Form layout="horizontal" className="contact-detail-form">
                                <Col >
                                    <span className="labels">Advisor Name</span>
                                    <p className="para">ashraf khan</p><hr />
                                </Col>
                                <Col >
                                    <span className="labels">Advisor Name</span>
                                    <p className="para">AGQFLXYR</p><hr />
                                </Col><br />
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Select Calculator Type"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select calculator type',
                                            },
                                        ]}
                                    >
                                        <Select options={setStateOptions} placeholder="Select Type" style={{ width: '28vw' }}></Select>
                                    </Form.Item>
                                </Col>
                                <Col >
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Name Of Life  Assured"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please enter name of life assured',
                                            },
                                        ]}
                                    >
                                        <Input className="first-name border-bottom" placeholder="Test User" />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Gender Of Life Assured"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select gender of life assured',
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
                                        label="Date of Birth Of Life Assured"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select date of birth of life assured',
                                            },
                                        ]}
                                    >
                                        <DatePicker onChange={onChange} style={{ width: '28vw' }} />
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
                                        <Select placeholder="Select Martial Status" style={{ width: '28vw' }}>
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
                                        label="Policy Term"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select policy term',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Select Policy Term" style={{ width: '28vw' }}>
                                            <Option value="Select">Select</Option>
                                            <Option value="5">5</Option>
                                            <Option value="10">10</Option>
                                            <Option value="15">15</Option>
                                            <Option value="20">20</Option>
                                            <Option value="25">25</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Premium Paying Term"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select premium paying term',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Select Premium Paying Term" style={{ width: '28vw' }}>
                                            <Option value="Select">Select</Option>
                                            <Option value="5">5</Option>
                                            <Option value="10">10</Option>
                                            <Option value="15">15</Option>
                                            <Option value="20">20</Option>
                                            <Option value="25">25</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Premium Mode"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select premium mode',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Yearly" style={{ width: '28vw' }}>
                                            <Option value="Select">Select</Option>
                                            <Option value="Yearly">Yearly</Option>
                                            <Option value="Half-Yearly">Half-Yearly</Option>
                                            <Option value="Quarterly">Quarterly</Option>
                                            <Option value="Monthly">Monthly</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Premium Type"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select premium type',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Regular" style={{ width: '28vw' }}>
                                            <Option value="Single">Single</Option>
                                            <Option value="Limited">Limited</Option>
                                            <Option value="Regular">Regular</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Sum Assured"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please enter sum assured',
                                            },
                                        ]}
                                    >
                                        <Input className="email border-bottom" type="number" placeholder="Enter SumAssured" />
                                    </Form.Item>
                                </Col>
                                <Col >
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Death Benefit Option"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select death benefit option',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Yearly" style={{ width: '28vw' }}>
                                            <Option value="Select">Select</Option>
                                            <Option value="Option1">Option 1</Option>
                                            <Option value="Option2">Option 2</Option>

                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Age Proof"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select age proof',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Regular" style={{ width: '28vw' }}>
                                            <Option value="Select">Select</Option>
                                            <Option value="Standard">Standard</Option>
                                            <Option value="Non-Standard">Non-Standard</Option>

                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Annuity Frequency"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select annuity frequency',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Yearly" style={{ width: '28vw' }}>
                                            <Option value="Select">Select</Option>
                                            <Option value="Yearly">Yearly</Option>
                                            <Option value="Half-Yearly">Half-Yearly</Option>
                                            <Option value="Quarterly">Quarterly</Option>
                                            <Option value="Monthly">Monthly</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Annuity Option"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select annuity option',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Regular" style={{ width: '28vw' }}>
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
                                        label="Do you want to add riders to this plan"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select riders plan',
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
                        <Col className="benefitillustrator2" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                            <Form >
                                <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                    <Col  >
                                        <Button className="bi-btn1">Generate BI</Button>
                                    </Col>
                                    <Col >
                                        <Button className="btn2">Generate BI</Button><br />
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ order: 2 }} sm={8} md={8} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                    <Row>
                        <Col className="benefitillustrator3" xs={22} sm={24} md={24} lg={24} xl={24} span={24} >
                            <Title className="bi-heading">Summary</Title><br />
                            <span className="labels">Plan Option</span>
                            <h2 className="head2">Home Loan</h2>
                            <Divider />
                            <span className="labels">Policy Term</span>
                            <h2 className="head2">years</h2>
                            <Divider />
                            <span className="labels">Premium Paying Term</span>
                            <h2 className="head2">years</h2>
                            <Divider />
                            <span className="labels">Annualised Premium</span>
                            <h2 className="head2">₹ 0</h2>
                            <Divider />
                            <span className="labels">Sum Assured</span>
                            <h2 className="head2">₹ </h2>
                            <Divider />
                            <span className="labels">Payout at Maturity</span>
                            <h2 className="head2">₹ 0</h2>
                            <Divider />
                            <span className="labels">Minimum Payout on Death</span>
                            <h2 className="head2">₹ 0</h2><Divider />
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                    <Row gutter={['', 24]}>
                        <Col className="benefitillustrator1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                            <Title className="bi-heading">Benefit Illustration</Title>
                            <Form layout="horizontal" className="contact-detail-form">
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name={['user', 'name']}
                                        label="Gender of Life Assured"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Radio.Group defaultValue="a">
                                            <Radio.Button value="a" className="radio">Maturity</Radio.Button>
                                            <Radio.Button value="b" className="radio">Events</Radio.Button>
                                            <Radio.Button value="c" className="radio">BI</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Form>
                            <Col>
                                <Card className="img" cover={<img alt="example" src="base-plan.jpg" />}>
                                </Card>
                            </Col>
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ order: 4 }} sm={24} md={24} lg={{ order: 4 }} xl={{ order: 4 }} span={22}>
                    <Row gutter={['', 24]}>
                        <Col className="benefitillustrator1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                            <Button className="btn3" >Proceed
                                <ArrowRightOutlined
                                    style={{
                                        marginTop: "7px"
                                    }}
                                />
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </div >
    );
}

export default BenefitIllustrator;