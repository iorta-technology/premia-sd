import React from 'react'
import './NewLead.css'
import { Row, Col,Form,Typography,Button,Input,Select} from 'antd';
const { Title } = Typography;

const { Option } = Select;
const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
const NewLead = () => {

    return (
        <div className="form-container">
            <Row gutter={[40,24]} justify="center">
                <Col xs={{order:2}} sm={14} md={14} lg={{order:1}} xl={{order:1}}  span={22}>
                    <Row gutter={['',24]}>
                        <Col className="contact-details" xs={22} sm={24} md={24} lg={24} xl={24}  span={24}>
                            <div className="form-title">
                                <Title level={4}>Contact Details</Title>
                            </div>
                            <Form layout="horizontal" className="contact-detail-form">
                                <Col >
                                    <Form.Item
                                        className="form-item-name"
                                        {...formItemLayout}
                                        name={['user', 'name']}
                                        label="First Name"
                                        rules={[
                                        {
                                            required: true,
                                        },
                                        ]}
                                    >
                                        <Input className="first-name border-bottom" placeholder="Enter First Name"/>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        name={['user', 'name']}
                                        label="Surname"
                                        rules={[
                                        {
                                            required: true,
                                        },
                                        ]}
                                    >
                                        <Input className="last-name border-bottom"  placeholder="Enter Surname"/>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        name={['user', 'name']}
                                        label="Email Address "
                                        rules={[
                                        {
                                            required: false,
                                        },
                                        ]}
                                    >
                                        <Input className="email border-bottom" placeholder="Enter Email Address"/>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                    {...formItemLayout}
                                    name={['user', 'name']}
                                    label="Primary Mobile"
                                    rules={[
                                    {
                                        required: true,
                                    },
                                    ]}
                                    >
                                        <Input className="phone-no border-bottom" placeholder="Enter Primary Mobile"/>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        name="State"
                                        label="State"
                                        hasFeedback
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Select your State!',
                                        },
                                        ]}
                                    >
                                        <Select placeholder="Select a country">
                                        <Option value="china">China</Option>
                                        <Option value="usa">U.S.A</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        name="City"
                                        label="City"
                                        hasFeedback
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please select your city!',
                                        },
                                        ]}
                                    >
                                        <Select placeholder="Select a city">
                                        <Option value="china">China</Option>
                                        <Option value="usa">U.S.A</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        name="Lead Type"
                                        label="Lead Type"
                                        hasFeedback
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Select Lead Type',
                                        },
                                        ]}
                                        >
                                        <Select placeholder="New Bussiness">
                                        <Option value="china">China</Option>
                                        <Option value="usa">U.S.A</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                    {...formItemLayout}
                                    name="Product"
                                    label="Product"
                                    hasFeedback
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Select Product',
                                    },
                                    ]}
                                    >
                                        <Select placeholder="Select Product">
                                        <Option value="china">China</Option>
                                        <Option value="usa">U.S.A</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        name="Insurance Company"
                                        label="Insurance Company"
                                        hasFeedback
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Insurance Company',
                                        },
                                        ]}
                                    >
                                        <Select placeholder="Insurance">
                                        <Option value="china">China</Option>
                                        <Option value="usa">U.S.A</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Form>
                        </Col>
                        <Col className="status" xs={22} sm={24} md={24} lg={24} xl={24}  span={24}>
                            <div className="form-title">
                                <Title level={4}>Status</Title>
                                <Form >
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={{order:1}} sm={6} md={6} lg={{order:2}} xl={{order:2}}  span={22}>
                    <Row>
                        <Col className="summary" xs={22} sm={24} md={24} lg={24} xl={24}  span={24} >
                            <div className="form-title">
                                <Title level={4}>Summary</Title>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={{order:3}} sm={20} md={20} lg={{order:3}} xl={{order:3}}  span={22}>
                    <Row>
                        <Col className="btn-container" xs={22} sm={24} md={24} lg={24} xl={24}  span={24}>
                            <Button>Proceed</Button>
                            <Button>Submit</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
        </div>
    )
}

export default NewLead
