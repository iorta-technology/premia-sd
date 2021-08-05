import React from 'react'
import './NewLead.css'
import { Row, Col,Form,Typography,Button} from 'antd';
const { Title } = Typography;
const NewLead = () => {
    return (
        <div className="form-container">
            <Row gutter={[40,24]} justify="center">
                <Col xs={{order:2}} sm={14} md={14} lg={{order:1}} xl={{order:1}}  span={22}>
                    <Row gutter={['',24]}>
                        <Col className="contact-details" xs={22} sm={24} md={24} lg={24} xl={24}  span={24}>
                            <div className="form-title">
                                <Title level={4}>Contact Details</Title>
                                <Form >
                                </Form>
                            </div>
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
