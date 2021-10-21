import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Typography, Cascader, Button, Input, Switch, Select } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined,FileTextOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/index';
import _, { add } from "lodash";
import Tabs from '../../Tab/Tab'
import { Link, useHistory } from 'react-router-dom';
import LeadDetailsTab from '../LeadDetailsTab';
import '../../StatusLead/StatusLead.css'


const { Title } = Typography;

const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};


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



const ContactDetails = React.memo(() => {
    const states = useSelector((state) => state.address.states)
    const cities = useSelector((state) => state.address.cities)
    let storeFormData = useSelector((state) => state.newLead.formData)
    const storeLeadId = useSelector((state) => state.newLead.leadId)


    const [width, setWidth] = useState(window.innerWidth);
    const [addressLine1, setAddressLine1] = useState()
    const [addressLine2, setAddressLine2] = useState()
    const [addressLine3, setAddressLine3] = useState()
    const [stateProvince, setStateProvince] = useState()
    const [cityProvince, setCityProvince] = useState()
    const [pincode, setPinCode] = useState()
    const [isPincodeValid, setIsPinCodeValid] = useState()
    const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState(storeFormData.primaryMobile)
    const [secondaryMobile, setSecondaryMobile] = useState()
    const [landlineNo, setLandlineNo] = useState()
    const [aadharNo, setAadharNo] = useState()
    const [email, setEmailAddress] = useState(storeFormData.email)
    const [isSameAddress, setIsSameAddress] = useState(true)
    const [secaddressLine1, setSecAddressLine1] = useState()
    const [secaddressLine2, setSecAddressLine2] = useState()
    const [secaddressLine3, setSecAddressLine3] = useState()
    const [secstateProvince, setSecStateProvince] = useState()
    const [seccityProvince, setSecCityProvince] = useState()
    const [isSecPincodeValid, setIsSecPinCodeValid] = useState()
    const [secpinCode, setSecPinCode] = useState()
    const [isFormValid, setIsFormValid] = useState()
    const breakpoint = 620;

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(actions.fetchAllState())
    }, [dispatch]);

    let stateOptions = (states && !_.isEmpty(states)) ?
        states.map(state => {

            const label = state.region_data.name
            const value = state.region_data.name
            const newState = { ...state, label, value }
            // state.push(label)
            return newState
        }) : null

    let citiesOptions = (cities && !_.isEmpty(cities)) ?
        cities.map(city => {

            const label = city.name
            const value = city.name
            const newCities = { ...city, label, value }
            return newCities
        }) : null


    const addLine1Handler = (event) => {
        setAddressLine1(event.target.value)
    }
    const addLine2Handler = (event) => {
        setAddressLine2(event.target.value)
    }
    const addLine3Handler = (event) => {
        setAddressLine3(event.target.value)
    }
    const pincodeHandler = (event) => {
        let value = event.target.value
        if(value.trim() !== '' && value.length === 6){
            setIsPinCodeValid(true)
            setPinCode(event.target.value)
        }  
    }
    const primaryNoHandler = (event) => {
        setPrimaryPhoneNumber(event.target.value)
    }
    const secondaryNoHandler = (event) => {
        setSecondaryMobile(event.target.value)
    }
    const landlineNoHandler = (event) => {
        setLandlineNo(event.target.value)
    }
    const aadharNoHandler = (event) => {
        setAadharNo(event.target.value)
    }
    const emailAddressHandler = (event) => {
        setEmailAddress(event.target.value)
    }
    const stateSelectHandler = (value, key) => {
        dispatch(actions.fetchAllCities(key.region_data.adminCode1))
    }
    const stateChangedHandler = value => {
        setStateProvince(value)
    }

    const cityChangedHandler = value => {
        setCityProvince(value)
    }

    // Permanent Address Same as Mailing Address
    const CheckMailingAddSameAsPermanentAdd = () => {
        setIsSameAddress(!isSameAddress)
    }

    const secAddLine1Handler = (event) => {
        setSecAddressLine1(event.target.value)
    }
    const secAddLine2Handler = (event) => {
        setSecAddressLine2(event.target.value)
    }
    const secAddLine3Handler = (event) => {
        setSecAddressLine3(event.target.value)
    }
    const secPincodeHandler = (event) => {
        let value = event.target.value
        if (value.trim() !== '' && value.length === 6) {
            setIsSecPinCodeValid(true)
            setSecPinCode(value)
        }
    }

    const secStateSelectHandler = (value, key) => {
        dispatch(actions.fetchAllCities(key.region_data.adminCode1))
    }
    const secStateChangedHandler = value => {
        setSecStateProvince(value)
    }

    const secCityChangedHandler = value => {
        setSecCityProvince(value)
    }

    const formData = {
        ...storeFormData,
        line1: addressLine1,
        line2: addressLine2,
        line3: addressLine3,
        country: 'India',
        state: stateProvince,
        city: cityProvince,
        pincode: pincode,
        primaryMobile: primaryPhoneNumber,
        secondaryMobile: secondaryMobile,
        landlineNo: landlineNo,
        socialSecurityAdharNo: aadharNo,
        email: email,
        mailingAddressSecond: {
            mailingaddress: {
                line1: secaddressLine1,
                line2: secaddressLine2,
                line3: secaddressLine3
            },
            state: secstateProvince,
            city: seccityProvince,
            country: 'India',
            pincode: secpinCode
        }

    };
  let formIsValid = false;

    const proceedHandler = event => {
        event.preventDefault();

        if (isSameAddress) {

             formIsValid = isPincodeValid
            if (!formIsValid) {
                return;
            } else {
                dispatch(actions.storeLead(formData))
                history.push('professionallead')
            }
        } else {
            const formIsValid = isPincodeValid && isSecPincodeValid
            if (!formIsValid) {
                return;
            } else {
                dispatch(actions.storeLead(formData))
                history.push('professionallead')
            }
        }


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
        history.push('professionallead')

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
                <Row gutter={[0, 10]} justify="center">
                        <LeadDetailsTab activeKey="2" />
                    <Col className="m0a" xs={22} sm={22} md={17} >
                        <Col className="form-body p40" xs={24} sm={24} md={20} lg={20} xl={20} >
                            <p className="form-title">Contact Details</p>
                            <Form
                                layout="horizontal"
                                className="contact-detail-form"
                                initialValues={{
                                    "primaryNo": primaryPhoneNumber,
                                    "email": email
                                }}>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name='addline1'
                                        label="Address line 1"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="first-name input-box"
                                            placeholder="Enter Address line 1"
                                            onChange={addLine1Handler} />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name='addline2'
                                        label="Address line 2"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="first-name input-box"
                                            placeholder="Enter Address line 2"
                                            onChange={addLine2Handler} />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name='landmark'
                                        label="Landmark"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="first-name input-box"
                                            placeholder="Enter Landmark"
                                            onChange={addLine3Handler} />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="country"
                                        label="Country"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select your city!',
                                            },
                                        ]}
                                        style={{ marginBottom: '1rem' }}
                                    >
                                        <Select
                                            size="large"
                                            placeholder="India">
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="State"
                                        label="State"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Select your State!',
                                            },
                                        ]}
                                        style={{ marginBottom: '1rem' }}

                                    >
                                        <Select
                                            size="large"
                                            placeholder="Select Your State"
                                            options={stateOptions}
                                            onSelect={stateSelectHandler}
                                            onChange={stateChangedHandler}>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="City"
                                        label="City"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please select your city!',
                                            },
                                        ]}
                                        style={{ marginBottom: '1rem' }}

                                    >
                                        <Select
                                            size="large"
                                            placeholder="Select a city"
                                            options={citiesOptions}
                                            onChange={cityChangedHandler}>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name='pincode'
                                        label="Pincode"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                            {
                                                min: 6,
                                                max: 6,
                                                pattern: '^([-]?[1-9][0-9]*|0)$',
                                                message: 'Pincode must be of 6 characters'
                                            }
                                        ]}
                                    >
                                        <Input
                                            className="first-name input-box"
                                            placeholder="Enter Pincode"
                                            onChange={pincodeHandler} />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name='primaryNo'
                                        label="Primary Mobile No"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                            {
                                                min: 10,
                                                max: 10,
                                                pattern: '^([-]?[1-9][0-9]*|0)$',
                                                message: 'Mobile No must be of 10 characters'
                                            }
                                        ]}
                                    >
                                        <Input
                                            className="first-name input-box"
                                            placeholder="Enter Primary Mobile No"
                                            onChange={primaryNoHandler} />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name='secondaryNo'
                                        label="Alternate Mobile"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                            {
                                                min: 10,
                                                max: 10,
                                                pattern: '^([-]?[1-9][0-9]*|0)$',
                                                message: 'Mobile No must be of 10 characters'
                                            }
                                        ]}
                                    >
                                        <Input
                                            className="first-name input-box"
                                            placeholder="Enter Alternate Mobile No"
                                            onChange={secondaryNoHandler} />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name='landlineNo'
                                        label="Landline No"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="first-name input-box"
                                            placeholder="Enter Landline No"
                                            onChange={landlineNoHandler} />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name='aadharNo'
                                        label="Social Security (Aadhaar No.)"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                            {
                                                min: 12,
                                                max: 12,
                                                pattern: '^([-]?[1-9][0-9]*|0)$',
                                                message: 'Aadhar No must be of 12 characters'
                                            }
                                        ]}
                                    >
                                        <Input
                                            className="first-name input-box"
                                            placeholder="Enter Your Aadhaar No"
                                            onChange={aadharNoHandler} />
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name='email'
                                        label="Email Address"
                                        rules={[
                                            {
                                                type: email,
                                                required: false,
                                                message: 'Please provide valid email'
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="first-name input-box"
                                            placeholder="Enter Your Email Address"
                                            onChange={emailAddressHandler} />
                                    </Form.Item>
                                </Col>
                            </Form>
                            <div className="form-title">
                                <Title level={5} style={{ marginTop: '1rem' }}>Permanent Address</Title>
                            </div>
                            <Col >
                                <Form.Item
                                    className="form-item-name label-color"
                                    name={['user', 'name']}
                                    label="Is your permarent address same as mailing address?"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                    ]}
                                >
                                    <Switch
                                        size="large"
                                        checkedChildren="Yes"
                                        unCheckedChildren="NO"
                                        defaultChecked={true}
                                        onChange={CheckMailingAddSameAsPermanentAdd} />
                                </Form.Item>
                            </Col>
                            {!isSameAddress &&
                                <Form layout="horizontal" className="contact-detail-form">
                                    <Col >
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name={['user', 'name']}
                                            label="Address line 1"
                                            rules={[
                                                {
                                                    required: false,
                                                },
                                            ]}
                                        >
                                            <Input
                                                className="first-name input-box"
                                                placeholder="Enter Address line 1"
                                                onChange={secAddLine1Handler} />
                                        </Form.Item>
                                    </Col>
                                    <Col >
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name={['user', 'name']}
                                            label="Address line 2"
                                            rules={[
                                                {
                                                    required: false,
                                                },
                                            ]}
                                        >
                                            <Input
                                                className="first-name input-box"
                                                placeholder="Enter Address line 2"
                                                onChange={secAddLine2Handler} />
                                        </Form.Item>
                                    </Col>
                                    <Col >
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name={['user', 'name']}
                                            label="Landmark"
                                            rules={[
                                                {
                                                    required: false,
                                                },
                                            ]}
                                        >
                                            <Input
                                                className="first-name input-box"
                                                placeholder="Enter Landmark"
                                                onChange={secAddLine3Handler} />
                                        </Form.Item>
                                    </Col>
                                    <Col >
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="country"
                                            label="Country"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Please select your city!',
                                                },
                                            ]}
                                            style={{ marginBottom: '1rem' }}
                                        >
                                            <Select
                                                size="large"
                                                placeholder="India">
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col >
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="State"
                                            label="State"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Select your State!',
                                                },
                                            ]}
                                            style={{ marginBottom: '1rem' }}

                                        >
                                            <Select
                                                size="large"
                                                placeholder="Select Your State"
                                                options={stateOptions}
                                                onSelect={secStateSelectHandler}
                                                onChange={secStateChangedHandler}>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col >
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="City"
                                            label="City"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Please select your city!',
                                                },
                                            ]}
                                            style={{ marginBottom: '1rem' }}

                                        >
                                            <Select
                                                size="large"
                                                placeholder="Select a city"
                                                options={citiesOptions}
                                                onChange={secCityChangedHandler}>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col >
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name={['user', 'name']}
                                            label="Pincode"
                                            rules={[
                                                {
                                                    required: false,
                                                },
                                                {
                                                    min: 6,
                                                    max: 6,
                                                    pattern: '^([-]?[1-9][0-9]*|0)$',
                                                    message: 'Pincode must be 6 characters'
                                                }
                                            ]}
                                        >
                                            <Input
                                                className="first-name input-box"
                                                placeholder="Enter Pincode"
                                                onChange={secPincodeHandler} />
                                        </Form.Item>
                                    </Col>
                                </Form>}
                        </Col>
                        <Col className='form-body  p20' style={{ margin: "20px 0" }} xs={{ order: 5 }} sm={24} md={20} lg={20} xl={20} span={24} >
                            <Row>
                                <Col xs={11} sm={12} md={4} offset={width > breakpoint ? 12 : 2} >
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
})

export default ContactDetails
