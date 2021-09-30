import React, { useState, useEffect } from 'react'
import { Row, Col, Form,  Button, Select } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Tabs from '../../Tab/Tab'
import LeadDetailsTab from '../LeadDetailsTab';
import '../../StatusLead/StatusLead.css'

const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};

const educationOptions = [
    { value: '10thstdpass', label: '10th std pass' },
    { value: '12thstdpass', label: '12th std pass' },
    { value: 'Graduate', label: 'Graduate' },
    { value: 'Postgraduate', label: 'Postgraduate' },
    { value: 'Doctorate', label: 'Doctorate' },
    { value: 'below 10th std', label: 'Below 10th std' },
    { value: 'Illiterate / uneducated', label: 'Illitrate/Uneducated' },
    { value: 'Others', label: 'Others' },
]
const professionOptions = [
    { value: 'Salaried-Govt / PSU', label: 'Salaried-Govt/PSU' },
    { value: 'Salaried-Other', label: 'salaried-Other' },
    { value: 'Self Employeed professional', label: 'Self Employeed Professional' },
    { value: 'Agriculturist / Farmer', label: 'Agriculturist/Farmer' },
    { value: 'Part time business', label: 'Part time bussiness' },
    { value: 'Retired', label: 'Retired' },
    { value: 'Student', label: 'Student' },
    { value: 'Housewife', label: 'Housewife' },
    { value: 'Unemployed', label: 'Unemployed' },
    { value: 'Others', label: 'Others' },
]

const incomeGroupOptions = [
    { value: 'Less than 2.5 Lacs', label: 'Less than 2.5 Lacs' },
    { value: '2.5 Lacs to 3.49 Lacs', label: '2.5 Lacs to 3.49 Lacs' },
    { value: '3.5 Lacs to 4.99 Lacs', label: '3.5 Lacs to 4.99 Lacs' },
    { value: '5 Lacs to 7.99 Lacs', label: '3.5 Lacs to 7.99 Lacs' },
    { value: '8 Lacs to 9.99 Lacs', label: '8 Lacs to 9.99 Lacs' },
    { value: 'More than 10 Lacs', label: 'More than 10 Lacs, Less than 14.99 Lacs' },
    { value: 'More than 15 Lacs', label: 'More than 15 Lacs, Less than 20 Lacs' },
    { value: 'More than 20 Lacs', label: 'More than 20 Lacs' },
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
    const dispatch = useDispatch()
    const history = useHistory()
    let storeFormData = useSelector((state) => state.newLead.formData)
    const [width, setWidth] = useState(window.innerWidth);
    const [educationDetails, setEducationDetails] = useState()
    const [professionType, setProfessionType] = useState()
    const [incomeGroup, setIncomeGroup] = useState()
    const breakpoint = 620;

    const educationDetailsHandler = value => {
        setEducationDetails(value)
    }
    const professionTypeHandler = value => {
        setProfessionType(value)
    }
    const incomeGroupHandler = value => {
        setIncomeGroup(value)
    }
    const formData = {
        ...storeFormData,
        education:educationDetails,
        professionType:professionType,
        incomeGroup:incomeGroup

    };
    
    const proceedHandler = event => {
        event.preventDefault();
                dispatch(actions.storeLead(formData))
                history.push('existingLead')
    };
    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [width]);
    return (
        <>
            <Tabs
                tabMenu={tabMenu}
                header="New Lead"
                detailsRouteTab={personalRoute}
                activeKey="2"

            />
            <div className="form-container">
                <Row gutter={[0, 20]} justify="center">
                    <Col xs={24} sm={22} md={4} offset={2}>
                        <LeadDetailsTab activeKey="3" />
                    </Col>
                    <Col className="m0a" xs={22} sm={22} md={17} >
                        <Col className="form-body p40" xs={24} sm={24} md={20} lg={20} xl={20} >
                            <p className="form-title">Professional Details</p>
                            <Form layout="horizontal" className="contact-detail-form">
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="Education"
                                        label="Education"
                                        hasFeedback
                                    >
                                        <Select 
                                            size="large" 
                                            options={educationOptions} 
                                            placeholder="Select"
                                            onChange={educationDetailsHandler}>
                                        </Select>
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
                                        <Select 
                                            size="large" 
                                            options={professionOptions} 
                                            placeholder="Select"
                                            onChange={professionTypeHandler}>
                                        </Select>
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
                                        <Select 
                                            size="large" 
                                            options={incomeGroupOptions} 
                                            placeholder="Select "
                                            onChange={incomeGroupHandler}>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Form>
                        </Col>
                        <Col className='form-body  p20' style={{margin:"20px 0"}} xs={{ order: 5 }} sm={24} md={20} lg={20} xl={20} span={24} >
                            <Row>
                                <Col xs={11} sm={12} md={4} offset={width > breakpoint ? 16 : 2} >
                                    <Button type="primary" shape="round" size="large" style={{ backgroundColor: 'rgb(0,172,193)', border: 'none' }} icon={<ArrowLeftOutlined />} >Previous</Button>
                                </Col>
                                <Col xs={11} sm={12} md={4}>
                                    <Button 
                                        type="primary" 
                                        shape="round" 
                                        size="large" 
                                        style={{ backgroundColor: 'rgb(228,106,37)', border: 'none' }} 
                                        icon={<ArrowRightOutlined />}
                                        onClick={proceedHandler}>Proceed</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ProfessionalDetails
