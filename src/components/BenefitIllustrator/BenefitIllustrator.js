import React, { useState } from 'react'
import './BenefitIllustrator.css';
import { Row, Col, Form, Typography, Button, Input, Radio, Select, Cascader, DatePicker, Space, Modal } from 'antd';
import { Divider, Card } from 'antd';
import { Descriptions } from 'antd';
const { Title } = Typography;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

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
    // const [leadSelect, setLeadSelect] = useState()
    const [value, setValue] = React.useState(1);
    return (
        <div className="form-container">
            <Row gutter={[40, 24]} justify="center">
                <Col xs={{ order: 1 }} sm={16} md={16} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                    <Row gutter={['', 24]}>
                        <Col className="benefitillustrator1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                            {/* <div className="form-title"> */}
                            <Title className="heading">Enter Details</Title>
                            {/* </div> */}
                            <Form layout="horizontal" className="contact-detail-form">
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name={['user', 'name']}
                                        label="Advisor Name"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <p className="para">ashraf khan</p><hr />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name={['user', 'name']}
                                        label="Advisor Code"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <p className="para">AGQFLXYR</p><hr />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="State"
                                        label="Select Calculator Type"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Select Calculator Type!',
                                            },
                                        ]}
                                    >
                                        <Select options={setStateOptions} placeholder="Select Type"></Select>
                                    </Form.Item>
                                </Col>
                                <Col >
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name={['user', 'name']}
                                        label="Name of Life Assured"
                                        rules={[
                                            {
                                                required: true,
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
                                        name={['user', 'name']}
                                        label="Gender of Life Assured"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <div>
                                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                                <Radio.Button value="a" className="radio">Male</Radio.Button>
                                                <Radio.Button value="b" className="radio">Female</Radio.Button>
                                                <Radio.Button value="c" className="radio">Other</Radio.Button>
                                            </Radio.Group>
                                        </div>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="Insurance Company"
                                        label="Date of Birth of Life Assured"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Date of Birth of Life Assured',
                                            },
                                        ]}
                                    >
                                        <div>
                                            <DatePicker onChange={onChange} />

                                        </div>,
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="Martial benefitillustrator2"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please martial benefitillustrator2!',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Select a martial benefitillustrator2">
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
                                                message: 'Please select policy term!',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Select a policy term">
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
                                                message: 'Please martial benefitillustrator2!',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Select a martial benefitillustrator2">
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
                                        name="Insurance Company"
                                        label="Premium Mode"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Date of Birth of Life Assured',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Yearly">
                                            <Option value="Select">Select</Option>
                                            <Option value="Yearly">Yearly</Option>
                                            <Option value="Half-Yearly">Half-Yearly</Option>
                                            <Option value="Quarterly">Quarterly</Option>
                                            <Option value="Monthly">Monthly</Option>
                                            {/* <Option value="25">25</Option> */}
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
                                                message: 'Please martial benefitillustrator2!',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Regular">
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
                                        name={['user', 'name']}
                                        label="Sum Assured"
                                        rules={[
                                            {
                                                required: true,
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
                                        name="Insurance Company"
                                        label="Death Benefit Option"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Date of Birth of Life Assured',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Yearly">
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
                                                message: 'Please martial benefitillustrator2!',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Regular">
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
                                        name="Insurance Company"
                                        label="Annuity Frequency"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Date of Birth of Life Assured',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Yearly">
                                            <Option value="Select">Select</Option>
                                            <Option value="Yearly">Yearly</Option>
                                            <Option value="Half-Yearly">Half-Yearly</Option>
                                            <Option value="Quarterly">Quarterly</Option>
                                            <Option value="Monthly">Monthly</Option>
                                            {/* <Option value="25">25</Option> */}
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
                                                message: 'Please martial benefitillustrator2!',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Regular">
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
                                                message: 'Please martial benefitillustrator2!',
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
                                        <Button className="btn2">Generate BI</Button>
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
                            {/* <div className="form-title"> */}
                            <Title className="heading">Summary</Title><br/>
                            {/* </div> */}
                            <p>Plan Option</p>
                            <h2>Home Loan</h2>
                            <Divider />
                            <p>Policy Term</p>
                            <h2>years</h2>
                            <Divider />
                            <p>Premium Paying Term</p>
                            <h2>years</h2>
                            <Divider />
                            <p>Annualised Premium</p>
                            <h2>₹ 0</h2>
                            <Divider />
                            <p>Sum Assured</p>
                            <h2>₹ </h2>
                            <Divider />
                            <p>Payout at Maturity</p>
                            <h2>₹ 0</h2>
                            <Divider />
                            <p>Minimum Payout on Death</p>
                            <h2>₹ 0</h2><Divider />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                    <Row gutter={['', 24]}>
                        <Col className="benefitillustrator1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                            {/* <div className="form-title"> */}
                            <Title className="heading">Benefit Illustration</Title>
                            {/* </div> */}
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
                                        <div>
                                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                                <Radio.Button value="a" className="radio">Maturity</Radio.Button>
                                                <Radio.Button value="b" className="radio">Events</Radio.Button>
                                                <Radio.Button value="c" className="radio">BI</Radio.Button>
                                            </Radio.Group>
                                        </div>
                                    </Form.Item>
                                </Col>
                            </Form>
                            <Col>
                                {/* <div className="Image"> */}
                                <Card className="img" cover={<img alt="example" src="base-plan.jpg" />}>
                                </Card>
                                {/* </div> */}
                            </Col>
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ order: 4 }} sm={24} md={24} lg={{ order: 4 }} xl={{ order: 4 }} span={22}>
                    <Row gutter={['', 24]}>
                        <Col className="benefitillustrator1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                            <Button className="btn3">Proceed</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </div >
    );
}

export default BenefitIllustrator;