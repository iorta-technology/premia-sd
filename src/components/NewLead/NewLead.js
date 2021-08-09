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
const NewLead = React.memo(() => {

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
                                        {...formItemLayout}
                                        className="form-item-name label-color"
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
                                        className="form-item-name label-color"
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
                                        className="form-item-name label-color"
                                        name={['email', 'address']}
                                        label="Email Address"
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
                                    className="form-item-name label-color"
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
                                        className="form-item-name label-color"
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
                                        className="form-item-name label-color"
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
                                        className="form-item-name label-color"
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
                                        className="form-item-name label-color"
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
                                        className="form-item-name label-color"
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
                                    <Row gutter={16}>
                                        <Col xs={24} sm={12} md={24} lg={12} xl={12} >
                                            <Form.Item
                                                {...formItemLayout}
                                                className="form-item-name label-color"
                                                name="Lead Status"
                                                label="Lead Status"
                                                hasFeedback
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Lead Status',
                                                },
                                                ]}
                                            >
                                                <Select placeholder="New Lead Entry">
                                                    <Option value="china">China</Option>
                                                    <Option value="usa">U.S.A</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12} md={24} lg={12} xl={12} >
                                            <Form.Item
                                                {...formItemLayout}
                                                className="form-item-name label-color"
                                                name={['user', 'name']}
                                                label="Remark From Source "
                                                rules={[
                                                {
                                                    required: false,
                                                },
                                                ]}
                                            >
                                                <Input className="email border-bottom" placeholder="Enter Some Remark"/>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12} md={24} lg={12} xl={12} >
                                            <Form.Item
                                                {...formItemLayout}
                                                className="form-item-name label-color"
                                                name={['user', 'name']}
                                                label="Remark From Source "
                                                rules={[
                                                {
                                                    required: false,
                                                },
                                                ]}
                                            >
                                                <Input className="email border-bottom" placeholder="Enter Some Remark"/>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12} >
                                            <p>Select the team members you want to involve for this lead</p>
                                            {window.innerWidth >620 ? 
                                            <Button shape="round" size="large" block={false} >Add Team Member</Button>
                                            :<Button shape="round" size="large" block>Add Team Member</Button>
                                            }
                                        </Col>
                                    </Row>
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
                                <p>Fresh Lead</p>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={{order:3}} sm={20} md={20} lg={{order:3}} xl={{order:3}}  span={22}>
                    {window.innerWidth >620 ?
                    <Row>
                        <Col className="btn-container" xs={22} sm={24} md={24} lg={24} xl={24}  span={24}>
                            <Button shape="round" size="large">Proceed</Button>
                            <Button shape="round" size="large">Submit</Button>
                        </Col>
                    </Row>
                        :
                    <Row gutter={['',{xs:16}]}>
                    
                            <Col xs={20}  className="btn-center">
                                <Button className="cta-btn btn-color" shape="round" size="large" block>Proceed</Button>
                                <Button className="cta-btn btn-color" shape="round" size="large" block>Submit</Button>
                            </Col>
                        {/* <Col className="btn-container" xs={22} sm={24} md={24} lg={24} xl={24}  span={24}>
                        </Col>
                        <Col className="btn-container" xs={22} sm={24} md={24} lg={24} xl={24}  span={24}>
                        </Col> */}
                    </Row>
                    
                        }
                </Col>
            </Row>
            
        </div>
    )
})

export default NewLead
