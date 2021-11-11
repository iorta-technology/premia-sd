import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Select } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, FileTextOutlined } from '@ant-design/icons';
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
    const [form] = Form.useForm();
    let storeFormData = useSelector((state) => state.newLead.formData)
    let storeEducation = useSelector((state) => state.newLead.formData.education)
    let storeProfessionType = useSelector((state) => state.newLead.formData.professionType)
    let storeIncomeGroup = useSelector((state) => state.newLead.formData.incomeGroup)
    const storeLeadId = useSelector((state) => state.newLead.leadId)
    const [isNewLead, setIsNewLead] = useState(true)


    const [width, setWidth] = useState(window.innerWidth);
    const [educationDetails, setEducationDetails] = useState(storeEducation)
    const [professionType, setProfessionType] = useState(storeProfessionType)
    const [incomeGroup, setIncomeGroup] = useState(storeIncomeGroup)
    const breakpoint = 620;

    useEffect(() => {
        // console.log(storeMailingAddress)
        // console.log(storeMailingAddress.mailingaddress.line1)
        if (storeLeadId !== '') {
            setIsNewLead(false)
        }
        form.setFieldsValue({
            "education": educationDetails,
            "professionType": professionType,
            "incomeGroup": incomeGroup,
        })
    }, [
        educationDetails,
        professionType,
        incomeGroup,
        form
    ])

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
        education: educationDetails,
        professionType: professionType,
        incomeGroup: incomeGroup

    };

    const submitHandler = event => {
        if(isNewLead){
            dispatch(actions.storeLead(formData))

            alert('New Lead Updated Successfully')
            history.push('existingLead')
            
            setIsNewLead(false)
        }else{
      
            dispatch(actions.editLead(formData, storeLeadId))
            alert(' Lead Updated Successfully')
            history.push('existingLead')
            
        }
    };
    const proceedHandler = event => {
        event.preventDefault();
        dispatch(actions.storeLead(formData))
        history.push('existingLead')
    };
    const updateHandler = event => {
        event.preventDefault();
        dispatch(actions.editLead(formData, storeLeadId))
        history.push('existingLead')

        // if (!formIsValid) {
        //   return;
        // }else{
        // }

        // setErrorMessage('Form submitted successfully')
        // setIsNewLead(false)
        // setErrorMessage( res.data.errMsg)



        // resetFirstName();
        // resetLastName();
        // resetEmail();
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
                <Form
                    layout="horizontal"
                    className="contact-detail-form"
                    initialValues={{
                        "education": educationDetails,
                        "professionType": professionType,
                        "incomeGroup": incomeGroup,
                    }}
                    onFinish={submitHandler}

                >
                    <Row gutter={[0, 20]} justify="center">
                        <LeadDetailsTab activeKey="3" />
                        <Col className="form-body p40 m0a" sm={24} md={16} lg={15} xl={15} span={23} offset={2}>
                            <p className="form-title">Professional Details</p>
                            <Row gutter={16} className="mb-2">
                                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="education"
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
                                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="professionType"
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
                                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="incomeGroup"
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
                            </Row>
                        </Col>

                        <Col className='form-body  p20' style={{ marginBottom: "20px" }} xs={{ order: 5 }} sm={24} md={16} lg={15} xl={15} span={23} offset={width > breakpoint ? 6 : 0} >
                            <Row gutter={[8, 8]}>
                                <Col xs={12} sm={12} md={4} offset={width > breakpoint ? 12 : 0} >
                                    <Button type="primary" shape="round" size="large" style={{ backgroundColor: 'rgb(0,172,193)', border: 'none' }} icon={<ArrowLeftOutlined />} >Previous</Button>
                                </Col>
                                <Col xs={12} sm={12} md={4} >
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            shape="round"
                                            size="large"
                                            style={{ backgroundColor: 'rgb(0,172,193)', border: 'none' }}
                                            icon={<FileTextOutlined />} htmlType="submit"
                                            // disabled={!formIsValid}
                                            // onClick={updateHandler}
                                        >Update</Button>
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={4}>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            shape="round"
                                            size="large"
                                            style={{ backgroundColor: 'rgb(228,106,37)', border: 'none' }}
                                            icon={<ArrowRightOutlined />}
                                            // onClick={proceedHandler}
                                            >Proceed</Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    )
}

export default ProfessionalDetails
