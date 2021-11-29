import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Typography, Radio, Button, Input, Select, Tabs, DatePicker, Table, Modal } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, CloseCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import TabsMain from '../../Tab/Tab'
import LeadDetailsTab from '../LeadDetailsTab';
import '../../StatusLead/StatusLead.css'
import * as actions from '../../../store/actions/index';
import { useHistory } from 'react-router-dom';
import moment, { now } from 'moment';
import { isElement, isEmpty } from 'lodash';
import { msToDateString } from '../../../helpers';
import _ from 'lodash'
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
const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];
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
    if(storeChildInfo==='' || storeChildInfo==='[]' || storeChildInfo===undefined){
        storeChildInfo = []
    }
    
    let childTableArr = useSelector((state) => state.newLead.childParsedData)
    // const id = useSelector((state)=>state.newLead.leadId)
    // useEffect(() => {
    //     dispatch(actions.fetchLeadDetails(id))

    // }, [dispatch,id])
    // if(!_.isEmpty(storeChildInfo)){
    //         // console.log('child details',storeChildInfo,childStatus,maritalStatus)
    //         // console.log('child details',JSON.parse(...storeChildInfo))
    //         console.log('not empty')

    //         // return storeChildInfo
    //     }else{
    //         return []
    //     }
    // if(!_.isEmpty(storeChildInfo)){
    //     return storeChildInfo
    // }else{
    //     return []
    // }
    console.log('store',storeChildInfo)
    // console.log('dob',storeFormData.dob)

    const [form] = Form.useForm();
    const [width, setWidth] = useState(window.innerWidth);
    const [firstName, setFirstName] = useState(storeFormData.firstName);
    const [lastName, setLastName] = useState(storeFormData.lastName);
    const [dob, setDob] = useState(()=>storeFormData.dob!=='' && moment(storeFormData.dob));
    const [dobPost, setDobPost] = useState();
    const [isDobValid, setIsDobValid] = useState(()=>storeFormData.dob!=='' && true);
    const [dobErrorMessage, setDobErrorMessage] = useState();
    const [gender, setGender] = useState(storeFormData.gender);
    const [maritalStatus, setMaritalStatus] = useState(storeFormData.maritalStatus);
    const [appendChildComponent, setappendChildComponent] = useState(()=>{
        if (maritalStatus === 'Married' || maritalStatus === 'Divorced' || maritalStatus === 'Widowed') {
            return true
        } else {
            return false
        }
    })
    const [childStatus, setChildStatus] = useState(storeFormData.childStatus)
    const [haveChildren, sethaveChildren] = useState(()=>{
        if (childStatus === 'Yes') {
            console.log('have children')
            return true
        } else {
            return false
        }
    })

    const [childModel, setChildModel] = useState();
    const [childInfoObj, setChildInfoObj] = useState(
        ()=>{
        if(!_.isEmpty(storeChildInfo)){
            // console.log('child details',storeChildInfo,childStatus,maritalStatus)
            // console.log('child details',JSON.parse(...storeChildInfo))
            console.log('not empty')

            return JSON.parse(storeChildInfo)
        }else{
            return []
        }
    })
    const [childParsedArr, setChildParsedArr] = useState(childTableArr)
    const [childName, setChildName] = useState()
    const [childAge, setChildAge] = useState()
    const [childAgePost, setChildAgePost] = useState()
    const [childGender, setChildGender] = useState()
    const [isNewLead, setIsNewLead] = useState(true)

    const config = {
        rules: [
          {
            type: 'object',
            required: true,
            message: 'Please select time!',
          },
        ],
      };

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
        // console.log(gender)
        if (storeLeadId !== '') {
            setIsNewLead(false)
        }
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
        
        let msDate = moment(date).valueOf()
        isDobValid? setDob(msDate):setDobErrorMessage('Age should be between 18 and 55 years')
    }
    const dobHandler = (date,dateString)=>{
        
        let minYear = moment().subtract(18, 'years')
        let maxYear = moment().subtract(55, 'years')
        let signal = moment(dateString).isBetween(maxYear, minYear);
        // console.log(signal)
        setIsDobValid(signal)
        // console.log(isDobValid)
        setDob(date)
        setDobPost(dateString)
        // console.log('date', dateString)
    }
    // console.log(isDobValid)
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
    console.log(childStatus)
    const childNameHandler = (event) => {
        const name = event.target.value
        setChildName(name)
    }
    const childGenderHandler = (e) => {
        setChildGender(e.target.value)
    }
    const childDOBHandler = (date, dateString) => {
        setChildAge(date)
        setChildAgePost(dateString)
        // console.log('date', dateString)


    }
    const randomId = () => {
        let randomChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
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
            id: "ch" + randomId(),
            childName: childName,
            childAge: childAgePost,
            childGender: childGender,
        })

        setChildInfoObj(storeChildInfo)

        console.log(childInfoObj)
        const formData = {
            ...storeFormData,
            ChildInfo: [
                ...storeChildInfo
            ]
        }

        dispatch(actions.storeLead(formData))

        setChildModel(false);
    }
    // console.log(childModel)
    const childColumn = [
        {
            title: 'Name',
            dataIndex: 'childName',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'childAge',
            // render: (dobOfInsurer) => { return (<p>{moment(dobOfInsurer).format('DD-MM-YYYY')}</p>) }

        },
        {
            title: 'Gender',
            dataIndex: 'childGender',
        },
        {
            title: 'Action',
            render: () => <CloseCircleOutlined />
        },
    ]
    useEffect(() => {
        // console.log(childModel)
    }, [storeChildInfo])

    const formData = {
        ...storeFormData,
        firstName: firstName,
        lastName: lastName,
        dob: dobPost,
        gender: gender,
        maritalStatus: maritalStatus,
        childStatus:childStatus,
        ChildInfo:JSON.stringify(storeChildInfo)
    };
    const submitHandler = event => {
        if(!storeLeadId){

            dispatch(actions.storeLead(formData))

            // alert('New Lead Updated Successfully')
            // history.push('contactlead')
            
            setIsNewLead(false)
        }else{
      
            dispatch(actions.editLead(formData, storeLeadId))
            // alert(' Lead Updated Successfully')
            // history.push('contactlead')
            
        }
    };

    const updateHandler = event => {
        event.preventDefault();
        dispatch(actions.editLead(formData, storeLeadId))
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

        console.log(appendChildComponent)
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    const dateFormat = 'YYYY/MM/DD'
    return (
        <>
            <TabsMain
                tabMenu={tabMenu}
                header="New Lead"
                detailsRouteTab={personalRoute}
                activeKey="2"
            />
            <div className="form-container">
                <Form
                    layout="horizontal"
                    className="contact-detail-form"
                    form={form}
                    // validateMessages={validateMessages}
                    initialValues={{
                        "name": firstName,
                        "lastname": lastName,
                        "gender": gender,
                        "dob": dob,
                        "maritalstatus": maritalStatus,
                        "Children":childStatus,
                    }}
                    onFinish={submitHandler}

                    >
                    <Row className="m0a" gutter={[0, 30]} justify="center">
                        <LeadDetailsTab activeKey="1" />
                        <Col className="form-body p40 m0a" sm={24} md={16} lg={15} xl={15} span={23} offset={2}>
                            <p className="form-title">Personal Details</p>
                            <Row gutter={16} className="mb-2">
                                {/* <Col className="form-body p40" xs={24} sm={24} md={20} lg={20} xl={20} > */}
                                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
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
                                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
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
                                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="dob"
                                        label="Date of Birth"
                                        rules={[
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                  console.log(value)
                                                  if (!isDobValid) {
                                                    return Promise.reject(new Error("Age should be between 18 and 55 years"))
                                                  }
                                                  return Promise.resolve();
                                                }
                                              }),
                                        ]}
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
                                                // value={dob}
                                                {...config}
                                                onChange={dobHandler}
                                                size="large"
                                                style={{ width: "100%" }}
                                                // selected={(dob !== "")? moment(dob, 'YYYY-MM-DD'):moment()}
                                                // value={(dob !== "")? moment(dob, 'YYYY-MM-DD'):""}
                                                format="YYYY-MM-DD"
                                                // defaultValue={'2015/01/01'}
                                                // defaultValue={moment('01/01/2015',dateFormat)}
                                                // format={dateFormat}
                                                // format={ 'DD/MM/YYYY'}
                                                />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                                    <Form.Item
                                        {...formItemLayout}
                                        name="gender"
                                        label="Gender"
                                        onChange={onChangeGender}
                                        rules={[{ required: true, message: 'Please pick gender' }]}
                                        value={gender}
                                    >
                                        <Radio.Group size="large" options={genderOptions} value={gender} optionType="button">
                                            {/* <Radio.Button value="Male">Male</Radio.Button>
                                            <Radio.Button value="Female">Female</Radio.Button>
                                            <Radio.Button value="Other">Other</Radio.Button> */}
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
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
                                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Children"
                                            label="Children"
                                            onChange={haveChildrenHandler}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Select Children',
                                                },
                                            ]}
                                        >
                                            <Radio.Group 
                                                size='large' 
                                                value={childStatus}
                                            >
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
                                            <Button primary size="large" block onClick={handleChildModal}>Add Child</Button>
                                        </Col>

                                        <Table
                                            style={{ marginTop: '1rem' }}
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
                                                    rules={[{ required: true }]}
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
                                {/* </Col> */}
                            </Row>
                        </Col>

                        <Col className='form-body  p20' style={{ marginBottom: "20px" }} xs={{ order: 5 }} sm={24} md={16} lg={15} xl={15} span={23} offset={width > breakpoint ? 6 : 0}>
                            <Row gutter={[8, 8]}>
                                <Col xs={10} sm={12} md={4} offset={width > breakpoint ? 12 : 0} >
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            // shape="round"
                                            size="large"
                                            style={{ backgroundColor: 'rgb(0,172,193)', border: 'none' }}
                                            icon={<ArrowLeftOutlined />}
                                        >Previous</Button>
                                    </Form.Item>
                                </Col>
                                <Col xs={10} sm={12} md={4} >
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            // shape="round"
                                            size="large"
                                            style={{ backgroundColor: 'rgb(0,172,193)', border: 'none' }}
                                            icon={<FileTextOutlined />} htmlType="submit"
                                            // disabled={!formIsValid}
                                            // onClick={updateHandler}
                                        >Update</Button>
                                    </Form.Item>
                                </Col>
                                <Col xs={10} sm={12} md={4}>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            // shape="round"
                                            size="large" style={{ backgroundColor: 'rgb(228,106,37)', border: 'none' }}
                                            icon={<ArrowRightOutlined />}
                                            htmlType="submit"
                                            // onClick={proceedHandler}
                                        >Proceed</Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </div >
        </>
    )
}

export default PersonalDetails

