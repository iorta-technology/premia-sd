import { Row, Col, Form, Typography,Radio, Button, Input, Select } from 'antd';
const { Title } = Typography;

const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

const maritalStatusOptions= [
    {value: 'single',label: 'Single'},
    {value: 'married',label: 'Married'},
    {value: 'divorced',label: 'Divorced'},
    {value: 'widowed',label: 'Widowed'}
]



const PersonalDetails = () => {


    return (
        <div className="form-container">
            <Row gutter={['', 24]}>
                <Col className="contact-details" xs={22} sm={24} md={15} lg={15} xl={15} >
                    <div className="form-title">
                        <Title level={4}>Personal Details</Title>
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
                                    required: false,
                                },
                                ]}
                            >
                                <Input className="first-name border-bottom" placeholder="Enter First Name" />
                            </Form.Item>
                        </Col>
                        <Col >
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name={['user', 'name']}
                                label="First Name"
                                rules={[
                                {
                                    required: false,
                                },
                                ]}
                            >
                                <Input className="first-name border-bottom" placeholder="Enter First Name" />
                            </Form.Item>
                        </Col>
                        <Col >
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name={['user', 'name']}
                                label="First Name"
                                rules={[
                                {
                                    required: false,
                                },
                                ]}
                            >
                                <Input className="first-name border-bottom" placeholder="Enter First Name" />
                            </Form.Item>
                        </Col>
                        <Col >
                            <Form.Item
                                name="Gender"
                                label="Gender"
                                rules={[{ required: true, message: 'Please pick gender' }]}
                            >
                                <Radio.Group>
                                    <Radio.Button value="male">Male</Radio.Button>
                                    <Radio.Button value="female">Female</Radio.Button>
                                    <Radio.Button value="other">Other</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col >
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="Marital Status"
                                label="Marital Status"
                                hasFeedback
                                rules={[
                                {
                                    required: false,
                                    message: 'Select your Marital Status!',
                                },
                                ]}
                            >
                                <Select options={maritalStatusOptions} placeholder="Select Your State"></Select>
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
}

export default PersonalDetails
