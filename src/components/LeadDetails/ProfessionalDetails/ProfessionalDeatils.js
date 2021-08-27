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

const educationOptions= [
    {value: '10',label: '10th std pass'},
    {value: '12',label: '12th std pass'},
    {value: 'graduate',label: 'Graduate'},
    {value: 'postgraduate',label: 'Postgraduate'},
    {value: 'doctorate',label: 'Doctorate'},
    {value: 'below10',label: 'Below 10th std'},
    {value: 'illitrate',label: 'Illitrate/Uneducated'},
    {value: 'other',label: 'Other'},
]
const professionOptions= [
    {value: 'salaried-govt/psu',label: 'Salaried-Govt/PSU'},
    {value: 'salaried-other',label: 'salaried-Other'},
    {value: 'selfemployeedprofessional',label: 'Self Employeed Professional'},
    {value: 'agriculturist',label: 'Agriculturist/Farmer'},
    {value: 'parttimebussiness',label: 'Part time bussiness'},
    {value: 'retire',label: 'Retired'},
    {value: 'student',label: 'Student'},
    {value: 'housewife',label: 'Housewife'},
    {value: 'unemployed',label: 'Unemployed'},
    {value: 'other',label: 'Other'},
]

const incomeGroupOptions= [
    {value: 'lessthan2.5lacs',label: 'Less than 2.5 Lacs'},
    {value: '2.5lacsto3.49lacs',label: '2.5 Lacs to 3.49 Lacs'},
    {value: '3.5lacsto4.49lacs',label: '3.5 Lacs to 4.99 Lacs'},
    {value: '5lacsto7.99lacs',label: '3.5 Lacs to 7.99 Lacs'},
    {value: '8lacsto9.99lacs',label: '8 Lacs to 9.99 Lacs'},
    {value: '10-14.99',label: 'More than 10 Lacs, Less than 14.99 Lacs'},
    {value: '15-20',label: 'More than 15 Lacs, Less than 20 Lacs'},
    {value: '20>',label: 'More than 20 Lacs'},
]

const ProfessionalDetails = () => {

    return (
        <div className="form-container">
            <Row gutter={['', 24]}>
                <Col className="contact-details" xs={22} sm={24} md={15} lg={15} xl={15} >
                    <div className="form-title">
                        <Title level={4}>Professional Details</Title>
                    </div>
                    <Form layout="horizontal" className="contact-detail-form">
                        <Col >
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="Education"
                                label="Education"
                                hasFeedback
                                rules={[
                                {
                                    required: false,
                                    message: 'Select your Marital Status!',
                                },
                                ]}
                            >
                                <Select options={educationOptions} placeholder="Select "></Select>
                            </Form.Item>
                        </Col>
                        <Col >
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="Profession Type"
                                label="Profession Type"
                                hasFeedback
                                rules={[
                                {
                                    required: false,
                                    message: 'Select your Marital Status!',
                                },
                                ]}
                            >
                                <Select options={professionOptions} placeholder="Select"></Select>
                            </Form.Item>
                        </Col>
                        <Col >
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="Income Group"
                                label="Income Group"
                                hasFeedback
                                rules={[
                                {
                                    required: false,
                                    message: 'Select your Marital Status!',
                                },
                                ]}
                            >
                                <Select options={incomeGroupOptions} placeholder="Select "></Select>
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

export default ProfessionalDetails
