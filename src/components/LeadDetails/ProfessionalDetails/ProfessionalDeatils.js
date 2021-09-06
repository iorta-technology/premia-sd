import { Row, Col, Form, Typography, Button, Select } from 'antd';
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

const educationOptions = [
    { value: '10', label: '10th std pass' },
    { value: '12', label: '12th std pass' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'postgraduate', label: 'Postgraduate' },
    { value: 'doctorate', label: 'Doctorate' },
    { value: 'below10', label: 'Below 10th std' },
    { value: 'illitrate', label: 'Illitrate/Uneducated' },
    { value: 'other', label: 'Other' },
]
const professionOptions = [
    { value: 'salaried-govt/psu', label: 'Salaried-Govt/PSU' },
    { value: 'salaried-other', label: 'salaried-Other' },
    { value: 'selfemployeedprofessional', label: 'Self Employeed Professional' },
    { value: 'agriculturist', label: 'Agriculturist/Farmer' },
    { value: 'parttimebussiness', label: 'Part time bussiness' },
    { value: 'retire', label: 'Retired' },
    { value: 'student', label: 'Student' },
    { value: 'housewife', label: 'Housewife' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'other', label: 'Other' },
]

const incomeGroupOptions = [
    { value: 'lessthan2.5lacs', label: 'Less than 2.5 Lacs' },
    { value: '2.5lacsto3.49lacs', label: '2.5 Lacs to 3.49 Lacs' },
    { value: '3.5lacsto4.49lacs', label: '3.5 Lacs to 4.99 Lacs' },
    { value: '5lacsto7.99lacs', label: '3.5 Lacs to 7.99 Lacs' },
    { value: '8lacsto9.99lacs', label: '8 Lacs to 9.99 Lacs' },
    { value: '10-14.99', label: 'More than 10 Lacs, Less than 14.99 Lacs' },
    { value: '15-20', label: 'More than 15 Lacs, Less than 20 Lacs' },
    { value: '20>', label: 'More than 20 Lacs' },
]


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
const ProfessionalDetails = () => {

    return (
        <>
            <Tabs
                tabMenu={tabMenu}
                header="New Lead"
                detailsRouteTab={personalRoute}
                activeKey="2"

            />
            <div className="form-container">
                <Row gutter={[40, 24]} justify="center">
                    <Col xs={22} sm={22} md={4} >
                        <Row gutter={['', 24]} justify="center">
                            <LeadDetailsTab activeKey="3" />
                        </Row>
                    </Col>
                    <Col xs={22} sm={22} md={18} >

                        <Row gutter={['', 24]} justify="center">
                            <Col className="form-body" xs={22} sm={24} md={24} lg={24} xl={24} >
                                <p className="form-title">Professional Details</p>
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
                            <Col className="form-btn-container" xs={22} sm={24} md={24} lg={24} xl={24} >
                                <Button shape="round" size="large" style={{ marginRight: 'auto' }}>Previous</Button>
                                {/* <Button shape="round" type="primary" size="large" >Update</Button> */}
                                <Button shape="round" type="primary" size="large" style={{ marginLeft: 'auto' }}>Proceed</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ProfessionalDetails
