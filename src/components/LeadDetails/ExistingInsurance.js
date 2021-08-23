import { Row, Col, Form, Typography,Switch, Button, Input, Select } from 'antd';
const { Title } = Typography;



const ProfessionalDetails = () => {

    return (
        <div className="form-container">
            <Row gutter={['', 24]}>
                <Col className="contact-details" xs={22} sm={24} md={15} lg={15} xl={15} >
                    <div className="form-title">
                        <Title level={4}>Existing Insurance</Title>
                    </div>
                    <Form layout="horizontal" className="contact-detail-form">
                        <Col >
                            <Form.Item
                                className="form-item-name label-color"
                                name={['user', 'name']}
                                label="Have life Insurance?"
                                rules={[
                                {
                                    required: false,
                                },
                                ]}
                            >
                                <Switch/>
                            </Form.Item>
                        </Col>
                        <Col >
                            <Form.Item
                                className="form-item-name label-color"
                                name={['user', 'name']}
                                label="Have health Insurance?"
                                rules={[
                                {
                                    required: false,
                                },
                                ]}
                            >
                                <Switch/>
                            </Form.Item>
                        </Col>
                    </Form>
                </Col>
                <Col className="contact-details" xs={22} sm={24} md={15} lg={15} xl={15} >
                    <Button shape="round" size="large" style={{marginRight:'auto'}}>Previous</Button>
                    <Button shape="round" size="large" style={{marginLeft:'auto'}}>Proceed</Button>
                </Col>
            </Row>
        </div>
    )
}

export default ProfessionalDetails
