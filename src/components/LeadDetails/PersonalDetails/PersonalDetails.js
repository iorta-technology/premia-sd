import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Typography, Radio, Button, Input, Select, Tabs, DatePicker, Table, Modal } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined,CloseCircleOutlined,FileTextOutlined } from '@ant-design/icons';
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
const personalRoute = "/leadmasterpage/leaddetails/personallead"
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

    const dispatch = useDispatch()
    const history = useHistory()

    let storeFormData = useSelector((state) => state.newLead.formData)
    const storeLeadId = useSelector((state) => state.newLead.leadId)
    let storeChildInfo = useSelector((state) => state.newLead.formData.ChildInfo)
    // const id = useSelector((state)=>state.newLead.leadId)
    // useEffect(() => {
    //     dispatch(actions.fetchLeadDetails(id))

    // }, [dispatch,id])

    const [form] = Form.useForm();
    const [width, setWidth] = useState(window.innerWidth);
    const [firstName, setFirstName] = useState(storeFormData.firstName);
    const [lastName, setLastName] = useState(storeFormData.lastName);
    const [dob, setDob] = useState(storeFormData.dob);
    const [isDobValid, setIsDobValid] = useState(false);
    const [dobErrorMessage, setDobErrorMessage] = useState();
    const [gender, setGender] = useState('');
    const [maritalStatus, setMaritalStatus] = useState();
    const [appendChildComponent, setappendChildComponent] = useState(false)
    const [haveChildren, sethaveChildren] = useState()
    const [childStatus, setChildStatus] = useState()
    const [childModel, setChildModel] = useState(false);
    const [childInfoObj, setChildInfoObj] = useState([])
    const [childName, setChildName] = useState()
    const [childAge, setChildAge] = useState()
    const [childGender, setChildGender] = useState()



    const breakpoint = 620;

    // const validateMessages = {
    //     // required: `${label} is required!`,
    //     types: {
    //       email: `Age should be between 18 to 55 years`,
    //       dob: dobErrorMessage
    //     },
    //     number: {
    //       range: 'Number must be 10 digits',
    //     },
    // };

    useEffect(() => {
        form.setFieldsValue({
            "firstname": firstName,
            "lastname": lastName,
            "gender": gender,
            "dob": dob,
            "maritalstatus": maritalStatus
        })
    }, [
        firstName,
        lastName,
        dob,
        maritalStatusOptions,
        form
    ])
    const onChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const onChangeLastName = (e) => {
        setLastName(e.target.value)
    }


    const onChangeDOB = (date, dateString) => {
        let minYear = moment().subtract(18, 'years')
        let maxYear = moment().subtract(55, 'years')
        let signal = moment(dateString).isBetween(maxYear, minYear);
        setIsDobValid(signal)
        // console.log(isDobValid)

        let msDate = moment(date).valueOf()
        //    isDobValid? setDob(msDate):setDobErrorMessage('Age should be between 18 and 55 years')
    }
    // console.log(isDobValid)
    // console.log('date', dob)
    // console.log(dobErrorMessage)

    const onChangeGender = (e) => {
        setGender(e.target.value)
        // console.log(gender)
    }

    const onChangeMaritalStatus = (value) => {
        setMaritalStatus(value)
        if (value === 'Married' || value === 'Divorced' || value === 'Widowed') {
            setappendChildComponent(true)
        } else {
            setappendChildComponent(false)
        }
        console.log(maritalStatus)
    }


    const haveChildrenHandler = (event) => {
        setChildStatus(event.target.value)
        sethaveChildren(!haveChildren)
    }

    const childNameHandler = (event)=>{
        const name = event.target.value
        setChildName(name)
    }
    const childGenderHandler = (e)=>{
        setChildGender(e.target.value)
    }
    const childDOBHandler = (date, dateString) => {
        setChildAge(moment(date).valueOf())

    }
    const randomId =()=>{
        let randomChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for ( let i = 0; i < 6; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }
    
    
    const handleChildModal = () => {
        setChildModel(!childModel)
    }
    const saveChildInfo = (event) => {
        event.preventDefault();

        storeChildInfo.push({
            id:"ch"+randomId(),
            childName: childName,
            childAge: childAge,
            childGender: childGender,
        })
        setChildInfoObj(storeChildInfo)
        const formData = {
            ...storeFormData,
            ChildInfo:[
                ...storeChildInfo
            ]
        }
        dispatch(actions.storeLead(formData))
        setChildModel(!childModel);
    }
    const childColumn = [
        {
            title: 'Name',
            dataIndex: 'childName',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'DateofBirth',
            render:(dobOfInsurer) => { return (<p>{moment(dobOfInsurer).format('DD-MM-YYYY')}</p>)}

        },
        {
            title: 'Gender',
            dataIndex: 'childGender',
        },
        {
            title: 'Action',
            render:()=><CloseCircleOutlined />
        },
    ]
    useEffect(() => {
    }, [storeChildInfo])
 
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

    const updateHandler = event => {
        event.preventDefault();
        dispatch(actions.editLead(formData,storeLeadId))
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
    }, []);

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
                    <LeadDetailsTab activeKey="1" />
                    <Col className="m0a" xs={22} sm={22} md={17} offset={2}>
                        <Col className="form-body p40" xs={24} sm={24} md={20} lg={20} xl={20} >
                            <p className="form-title">Personal Details</p>
                            <Form
                                layout="horizontal"
                                className="contact-detail-form"
                                form={form}
                                // validateMessages={validateMessages}
                                initialValues={{
                                    "name": firstName,
                                    "lastname": lastName
                                }}>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name='firstname'
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
                                    // validateStatus='error'
                                    // help='Age should be between 18 and 55 years'
                                    // hasFeedback
                                    // rules={[
                                    //     {
                                    //         type:dob,
                                    //         required: false,
                                    //         message: dobErrorMessage,
                                    //     },
                                    // ]}
                                    // style={{ marginBottom: '1rem' }}
                                    >
                                        <DatePicker
                                            value={dob}
                                            onChange={onChangeDOB}
                                            size="large"
                                            style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        name="gender"
                                        label="Gender"
                                        onChange={onChangeGender}
                                        rules={[{ required: true, message: 'Please pick gender' }]}
                                        value={gender}
                                    >
                                        <Radio.Group size="large">
                                            <Radio.Button value="Male">Male</Radio.Button>
                                            <Radio.Button value="Female">Female</Radio.Button>
                                            <Radio.Button value="Other">Other</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="maritalstatus"
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
                                            onChange={onChangeMaritalStatus}
                                            value={maritalStatus}
                                            defaultValue={maritalStatus}>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                {appendChildComponent &&
                                    <Col >
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Children"
                                            label="Children"
                                            onChange={haveChildrenHandler}
                                            value={childStatus}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Select Children',
                                                },
                                            ]}
                                        >
                                            <Radio.Group size='large'>
                                                <Radio.Button value="Yes">Yes</Radio.Button>
                                                <Radio.Button value="No">No</Radio.Button>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                }
                                {
                                    haveChildren &&
                                    <>
                                        <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{ marginTop: '1rem' }}>
                                            <Button shape="round" size="large" block onClick={handleChildModal}>Add Child</Button>
                                        </Col>
                                        <Table
                                            style={{marginTop:'1rem'}}
                                            dataSource={childInfoObj}
                                            columns={childColumn}
                                            scroll={{ x: 600 }}
                                        />
                                    </>
                                        
                                }
                                <>
                                    <Modal
                                        title="Insurance Details"
                                        centered={true}
                                        visible={childModel}
                                        onOk={handleChildModal}
                                        footer={[
                                            <Button key="cancel" onClick={handleChildModal}>
                                                Cancel
                                            </Button>,
                                            <Button
                                                key="save"
                                                type="primary"
                                                onClick={saveChildInfo}
                                            >
                                                Save</Button>
                                        ]}
                                        onCancel={handleChildModal}
                                        width={700}
                                    >
                                        <Row gutter={[12, 10]}>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <Form.Item
                                                    {...formItemLayout}
                                                    className="form-item-name label-color"
                                                    name='childname'
                                                    label="Child Name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        className="first-name input-box"
                                                        placeholder="Enter Child Name"
                                                    value={childName}
                                                    onChange={childNameHandler}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <Form.Item
                                                    {...formItemLayout}
                                                    className="form-item-name label-color"
                                                    name="dobOfChild"
                                                    label="Date of Birth"
                                                    rules={[{ required: true}]}

                                                >
                                                    <DatePicker
                                                        value={childAge}
                                                        onChange={childDOBHandler}
                                                        size="large"
                                                        style={{ width: "100%" }} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <Form.Item
                                                    {...formItemLayout}
                                                    name="gender"
                                                    label="Gender"
                                                    onChange={childGenderHandler}
                                                    rules={[{ required: true, message: 'Please pick gender' }]}
                                                    value={childGender}
                                                >
                                                    <Radio.Group size="large">
                                                        <Radio.Button value="Male">Male</Radio.Button>
                                                        <Radio.Button value="Female">Female</Radio.Button>
                                                        <Radio.Button value="Other">Other</Radio.Button>
                                                    </Radio.Group>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Modal>
                                </>
                            </Form>
                        </Col>
                        <Col className='form-body  p20' style={{ margin: "20px 0" }} xs={{ order: 5 }} sm={24} md={20} lg={20} xl={20} span={24} >
                            <Row>
                                <Col xs={11} sm={12} md={4} offset={ width > breakpoint ? 12 : 2} >
                                    <Button type="primary" shape="round" size="large" style={{ backgroundColor: 'rgb(0,172,193)', border: 'none' }} icon={<ArrowLeftOutlined />} >Previous</Button>
                                </Col>
                                <Col xs={11} sm={12} md={4} >
                                    <Button 
                                        type="primary" 
                                        shape="round" 
                                        size="large" 
                                        style={{ backgroundColor: 'rgb(0,172,193)', border: 'none' }} 
                                        icon={<FileTextOutlined />} htmlType="submit"
                                        // disabled={!formIsValid}
                                        onClick={updateHandler}
                                    >Update</Button>
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

