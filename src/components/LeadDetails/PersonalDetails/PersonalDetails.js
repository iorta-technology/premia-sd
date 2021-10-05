import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Typography, Radio, Button, Input, Select, Tabs,DatePicker } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import TabsMain from '../../Tab/Tab'
import LeadDetailsTab from '../LeadDetailsTab';
import '../../StatusLead/StatusLead.css'
import * as actions from '../../../store/actions/index';
import { useHistory } from 'react-router-dom';
import moment, { now } from 'moment';

const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};

const maritalStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'Married', label: 'Married' },
    { value: 'Divorced', label: 'Divorced' },
    { value: 'Widowed', label: 'Widowed' }
]
const  personalRoute = "/leadmasterpage/leaddetails/personallead"
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



const PersonalDetails = () => {

    let storeFormData = useSelector((state)=>state.newLead.formData)

    const dispatch = useDispatch()
    const history = useHistory()
    const [width, setWidth] = useState(window.innerWidth);
    const [firstName, setFirstName] = useState(storeFormData.firstName);
    const [lastName, setLastName] = useState(storeFormData.lastName);
    const [dob, setDob] = useState();
    const [isDobValid, setIsDobValid] = useState(false);
    const [dobErrorMessage, setDobErrorMessage] = useState();
    const [gender, setGender] = useState('');
    const [maritalStatus, setMaritalStatus] = useState();
    const breakpoint = 620;

    const validateMessages = {
        // required: `${label} is required!`,
        types: {
          email: `Age should be between 18 to 55 years`,
          dob: dobErrorMessage
        },
        number: {
          range: 'Number must be 10 digits',
        },
      };
    const onChangeFirstName = (e)=>{
        setFirstName(e.target.value)
    }

    const onChangeLastName = (e)=>{
        setLastName(e.target.value)
    }

    
    const onChangeDOB = (date,dateString)=>{
        let minYear =  moment().subtract(18, 'years')
        let maxYear =  moment().subtract(55, 'years')
        let signal =  moment(dateString).isBetween(maxYear, minYear);
        setIsDobValid(signal)
    // console.log(isDobValid)

        let msDate = moment(date).valueOf()
       isDobValid? setDob(msDate):setDobErrorMessage('Age should be between 18 and 55 years')
    }
    console.log(isDobValid)
    console.log('date',dob)
    console.log(dobErrorMessage)

    const onChangeGender = (e)=>{
        setGender(e.target.value)
        console.log(gender)
    }

    const onChangeMaritalStatus = (value)=>{
        setMaritalStatus(value)
        console.log(maritalStatus)
    }

    

    const formData = {
        ...storeFormData,
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        gender: gender,
        maritalStatus: maritalStatus,
    };
    const proceedHandler = event => {
        event.preventDefault();
        dispatch(actions.storeLead(formData))
        history.push('contactlead')
    
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
    },[]);

    return (
        <>
            <TabsMain
                tabMenu={tabMenu}
                header="New Lead"
                detailsRouteTab={personalRoute}
                activeKey="2"
            />
            <div className="form-container">
                <Row className="m0a" gutter={[0, 30]} justify="center">
                    <Col  xs={24} sm={22} md={4} offset={2}>
                        <LeadDetailsTab activeKey="1" />
                    </Col>
                    <Col className="m0a" xs={22} sm={22} md={17} offset={2}>
                        <Col className="form-body p40" xs={24} sm={24} md={20} lg={20} xl={20} >
                            <p className="form-title">Personal Details</p>
                            <Form 
                                layout="horizontal" 
                                className="contact-detail-form"
                                validateMessages={validateMessages}
                                initialValues={{
                                    "name":firstName,
                                    "lastname":lastName
                                }}>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name='name'
                                        label="First Name"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input 
                                            className="first-name input-box" 
                                            placeholder="Enter First Name" 
                                            // defaultValue={firstName}
                                            // value={storeFormData.firstName}
                                            onChange={onChangeFirstName}
                                        />
                                    </Form.Item>
                                </Col>
                                
                                <Col>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name='lastname'
                                        label="Last Name"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input 
                                            className="first-name input-box" 
                                            placeholder="Enter Last Name" 
                                            value={lastName}
                                            onChange={onChangeLastName}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="dob"
                                        label="Date of Birth"
                                        validateStatus='error'
                                        help='Age should be between 18 and 55 years'
                                        hasFeedback
                                        rules={[
                                            {
                                                type:dob,
                                                required: false,
                                                message: dobErrorMessage,
                                            },
                                        ]}
                                        // style={{ marginBottom: '1rem' }}
                                    >
                                    <DatePicker 
                                        value={dob}
                                        onChange={onChangeDOB} 
                                        size="large" 
                                        style={{ width: "100%" }}/>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        name="gender"
                                        label="Gender"
                                        onChange={onChangeGender}
                                        rules={[{ required: true, message: 'Please pick gender' }]}
                                    >
                                        <Radio.Group>
                                            <Radio.Button  value="Male">Male</Radio.Button>
                                            <Radio.Button value="Female">Female</Radio.Button>
                                            <Radio.Button value="Other">Other</Radio.Button>
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
                                        <Select 
                                            size="large" 
                                            options={maritalStatusOptions} 
                                            placeholder="Select Your State"
                                            onChange={onChangeMaritalStatus}>
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
                                        size="large" style={{ backgroundColor: 'rgb(228,106,37)', border: 'none' }} 
                                        icon={<ArrowRightOutlined />}
                                        onClick={proceedHandler}
                                        >Proceed</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default PersonalDetails

