import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Typography,
  Cascader,
  Button,
  Input,
  Switch,
  Select,
} from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions/index";
import _, { add } from "lodash";
import Tabs from "../../Tab/Tab";
import { Link, useHistory } from "react-router-dom";
import LeadDetailsTab from "../LeadDetailsTab";
import "../../StatusLead/StatusLead.css";

const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

let personalRoute = "/leadmasterpage/leaddetails/personallead";
const tabMenu = [
  {
    id: 1,
    value: "Status",
  },
  // {
  //     id: 2,
  //     value: "Lead Details"
  // },
  // {
  //     id: 3,
  //     value: "Proposal Details"
  // },
  // {
  //     id: 4,
  //     value: "Documents Upload"
  // },
  // {
  //     id: 2,
  //     value: "History"
  // },
];

const ContactDetails = React.memo(() => {
  const storeFormData = useSelector((state) => state.newLead.formData);

  const states = useSelector((state) => state.address.states);
  const cities = useSelector((state) => state.address.cities);
  const storeSecondaryMobile = useSelector(
    (state) => state.newLead.formData.secondaryMobile
  );
  const storeLandLine = useSelector(
    (state) => state.newLead.formData.landlineNo
  );
  const storeAadharNo = useSelector(
    (state) => state.newLead.formData.socialSecurityAdharNo
  );
  const storeMailingAddressStatus = useSelector(
    (state) => state.newLead.formData.mailingAddressStatus
  );

  const { line1, line2, line3 } = useSelector((state) => state.newLead.address);
  const {
    mailingaddress: { secAddline1, secAddline2, secAddline3 },
  } = useSelector((state) => state.newLead.mailingAddressSecond);
  const storeLeadId = useSelector((state) => state.newLead.leadId);

  const [form] = Form.useForm();
  const [width, setWidth] = useState(window.innerWidth);
  const [addressLine1, setAddressLine1] = useState(line1);
  const [addressLine2, setAddressLine2] = useState(line2);
  const [addressLine3, setAddressLine3] = useState(line3);
  const [stateProvince, setStateProvince] = useState();
  const [cityProvince, setCityProvince] = useState();
  const [pincode, setPinCode] = useState();
  const [isPincodeValid, setIsPinCodeValid] = useState();
  const [primaryMobile, setPrimaryMobile] = useState(
    storeFormData.primaryMobile
  );
  const [secondaryMobile, setSecondaryMobile] = useState(storeSecondaryMobile);
  const [landlineNo, setLandlineNo] = useState(storeLandLine);
  const [aadharNo, setAadharNo] = useState(storeAadharNo);
  const [email, setEmailAddress] = useState(storeFormData.email);
  const [isSameAddress, setIsSameAddress] = useState(storeMailingAddressStatus);
  const [secaddressLine1, setSecAddressLine1] = useState(secAddline1);
  const [secaddressLine2, setSecAddressLine2] = useState(secAddline2);
  const [secaddressLine3, setSecAddressLine3] = useState(secAddline3);
  const [secstateProvince, setSecStateProvince] = useState();
  const [seccityProvince, setSecCityProvince] = useState();
  const [isSecPincodeValid, setIsSecPinCodeValid] = useState();
  const [secpinCode, setSecPinCode] = useState();
  const [isFormValid, setIsFormValid] = useState();
  const [isNewLead, setIsNewLead] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  const breakpoint = 620;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (storeLeadId !== "") {
      setIsNewLead(false);
    }
    // console.log(line1,line2,line3)
    // console.log(storeFormData)
    dispatch(actions.fetchAllState());
  }, [dispatch]);

  useEffect(() => {
    // console.log(storeMailingAddress)
    // console.log(storeMailingAddress.mailingaddress.line1)

    form.setFieldsValue({
      addline1: addressLine1,
      addline2: addressLine2,
      addline3: addressLine3,
      country: "India",
      state: stateProvince,
      city: cityProvince,
      pincode: pincode,
      primaryNo: primaryMobile,
      secondaryNo: secondaryMobile,
      landlineNo: landlineNo,
      aadharNo: aadharNo,
      email: email,
      addStatus: isSameAddress,
      secAddLine1: secaddressLine1,
      secAddLine2: secaddressLine2,
      secAddLine3: secaddressLine3,
      secAddCountry: "India",
      secAddState: secstateProvince,
      secAddCity: seccityProvince,
      secAddPin: secpinCode,
    });
  }, [
    addressLine1,
    addressLine2,
    addressLine3,
    "India",
    stateProvince,
    cityProvince,
    pincode,
    primaryMobile,
    secondaryMobile,
    landlineNo,
    aadharNo,
    email,
    isSameAddress,
    secaddressLine1,
    secaddressLine2,
    secaddressLine3,
    "India",
    secstateProvince,
    seccityProvince,
    secpinCode,
    form,
  ]);

  let stateOptions =
    states && !_.isEmpty(states)
      ? states.map((state) => {
          const label = state.region_data.name;
          const value = state.region_data.name;
          const newState = { ...state, label, value };
          // state.push(label)
          return newState;
        })
      : null;

  let citiesOptions =
    cities && !_.isEmpty(cities)
      ? cities.map((city) => {
          const label = city.name;
          const value = city.name;
          const newCities = { ...city, label, value };
          return newCities;
        })
      : null;

  const addLine1Handler = (event) => {
    setAddressLine1(event.target.value);
  };
  const addLine2Handler = (event) => {
    setAddressLine2(event.target.value);
  };
  const addLine3Handler = (event) => {
    setAddressLine3(event.target.value);
  };
  const pincodeHandler = (event) => {
    let value = event.target.value;
    if (value.trim() !== "" && value.length === 6) {
      setIsPinCodeValid(true);
      setPinCode(event.target.value);
    }
  };
  const primaryNoHandler = (event) => {
    setPrimaryMobile(event.target.value);
  };
  const secondaryNoHandler = (event) => {
    setSecondaryMobile(event.target.value);
  };
  const landlineNoHandler = (event) => {
    setLandlineNo(event.target.value);
  };
  const aadharNoHandler = (event) => {
    setAadharNo(event.target.value);
  };
  const emailAddressHandler = (event) => {
    setEmailAddress(event.target.value);
  };
  const stateSelectHandler = (value, key) => {
    dispatch(actions.fetchAllCities(key.region_data.adminCode1));
  };
  const stateChangedHandler = (value) => {
    setStateProvince(value);
  };

  const cityChangedHandler = (value) => {
    setCityProvince(value);
  };

  // Permanent Address Same as Mailing Address
  const CheckMailingAddSameAsPermanentAdd = () => {
    setIsSameAddress(!isSameAddress);
  };

  const secAddLine1Handler = (event) => {
    setSecAddressLine1(event.target.value);
  };
  const secAddLine2Handler = (event) => {
    setSecAddressLine2(event.target.value);
  };
  const secAddLine3Handler = (event) => {
    setSecAddressLine3(event.target.value);
  };
  const secPincodeHandler = (event) => {
    let value = event.target.value;
    if (value.trim() !== "" && value.length === 6) {
      setIsSecPinCodeValid(true);
      setSecPinCode(value);
    }
  };

  const secStateSelectHandler = (value, key) => {
    dispatch(actions.fetchAllCities(key.region_data.adminCode1));
  };
  const secStateChangedHandler = (value) => {
    setSecStateProvince(value);
  };

  const secCityChangedHandler = (value) => {
    setSecCityProvince(value);
  };

  const formData = {
    ...storeFormData,
    line1: addressLine1,
    line2: addressLine2,
    line3: addressLine3,
    country: "India",
    state: stateProvince,
    city: cityProvince,
    pincode: pincode,
    primaryMobile: primaryMobile,
    secondaryMobile: secondaryMobile,
    landlineNo: landlineNo,
    socialSecurityAdharNo: aadharNo,
    email: email,
    mailingAddressSecond: {
      mailingaddress: {
        line1: secaddressLine1,
        line2: secaddressLine2,
        line3: secaddressLine3,
      },
      state: secstateProvince,
      city: seccityProvince,
      country: "India",
      pincode: secpinCode,
    },
  };
  let formIsValid = false;
  const failedHandler = (error) => {
    alert(error);
    console.log(error);
  };
  const submitHandler = (event) => {
    if (!storeLeadId) {
      dispatch(actions.storeLead(formData));
    } else {
      dispatch(actions.editLead(formData, storeLeadId)).then((res) => {
        if (res.type === "EDIT_LEAD_SUCCESS") {
          console.log("success:", res);
          setErrorMessage();
          setIsNewLead(false);
        } else if (res.type === "EDIT_LEAD_FAIL") {
          console.log("failed:", res);

          failedHandler(res.error);
          console.log(res);
        }
      });
      // alert(' Lead Updated Successfully')
      // history.push('professionallead')
    }
    // if (isSameAddress) {

    //     // formIsValid = isPincodeValid
    //     if (!formIsValid) {
    //         return;
    //     } else {
    //         // dispatch(actions.storeLead(formData))
    //         // history.push('professionallead')
    //     }
    // }
    // else {
    //     // const formIsValid = isPincodeValid && isSecPincodeValid
    //     if (!formIsValid) {
    //         return;
    //     } else {
    //         if(isNewLead){
    //             dispatch(actions.storeLead(formData))

    //             alert('New Lead Updated Successfully')
    //             history.push('professionallead')

    //             setIsNewLead(false)
    //         }else{

    //             dispatch(actions.editLead(formData, storeLeadId))
    //             alert(' Lead Updated Successfully')
    //             history.push('professionallead')

    //         }
    //         // dispatch(actions.storeLead(formData))
    //         // history.push('professionallead')
    //     }
    // }
  };
  // const submitHandler = event => {
  //     event.preventDefault();

  // setErrorMessage('Form submitted successfully')
  // setIsNewLead(false)
  // setErrorMessage( res.data.errMsg)

  // resetFirstName();
  // resetLastName();
  // resetEmail();
  // };
  const updateHandler = (event) => {
    event.preventDefault();
    dispatch(actions.editLead(formData, storeLeadId));
    history.push("professionallead");

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
    const handleWindowResize = () => setWidth(window.innerWidth);
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
            addline1: addressLine1,
            addline2: addressLine2,
            addline3: addressLine3,
            country: "India",
            state: stateProvince,
            city: cityProvince,
            pincode: pincode,
            primaryNo: primaryMobile,
            secondaryNo: secondaryMobile,
            landlineNo: landlineNo,
            aadharNo: aadharNo,
            email: email,
            addStatus: isSameAddress,
            secAddLine1: secaddressLine1,
            secAddLine2: secaddressLine2,
            secAddLine3: secaddressLine3,
            secAddCountry: "India",
            secAddState: secstateProvince,
            secAddCity: seccityProvince,
            secAddPin: secpinCode,
          }}
          onFinish={submitHandler}
          onFinishFailed={failedHandler}
        >
          <div className="form-container2">
            <LeadDetailsTab activeKey="2" />
            <Row className="m0a" gutter={[0, 30]} justify="center">
              <Col
                className=" form-body p40 "
                sm={24}
                md={16}
                lg={15}
                xl={15}
                span={23}
                offset={2}
              >
                <p className="form-title">Contact Details</p>
                <Row gutter={16} className="mb2">
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="addline1"
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
                        onChange={addLine1Handler}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="addline2"
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
                        onChange={addLine2Handler}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="addline3"
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
                        onChange={addLine3Handler}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="country"
                      label="Country"
                      hasFeedback
                      rules={[
                        {
                          required: false,
                          message: "Please select your city!",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Select
                        bordered={false}
                        style={{ marginTop: "-10px" }}
                        className="select-box"
                        size="large"
                        placeholder="India"
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="state"
                      label="State"
                      hasFeedback
                      rules={[
                        {
                          required: false,
                          message: "Select your State!",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Select
                        style={{ marginTop: "-10px" }}
                        bordered={false}
                        className="select-box"
                        size="large"
                        placeholder="Select Your State"
                        options={stateOptions}
                        onSelect={stateSelectHandler}
                        onChange={stateChangedHandler}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="city"
                      label="City"
                      hasFeedback
                      rules={[
                        {
                          required: false,
                          message: "Please select your city!",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Select
                        style={{ marginTop: "-10px" }}
                        bordered={false}
                        className="select-box"
                        size="large"
                        placeholder="Select a city"
                        options={citiesOptions}
                        onChange={cityChangedHandler}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="pincode"
                      label="Pincode"
                      rules={[
                        {
                          required: false,
                        },
                        {
                          min: 6,
                          max: 6,
                          pattern: "^([-]?[1-9][0-9]*|0)$",
                          message: "Pincode must be of 6 characters",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Input
                        className="first-name input-box"
                        placeholder="Enter Pincode"
                        onChange={pincodeHandler}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="primaryNo"
                      label="Primary Mobile No"
                      rules={[
                        {
                          required: false,
                        },
                        {
                          min: 10,
                          max: 10,
                          pattern: "^([-]?[1-9][0-9]*|0)$",
                          message: "Mobile No must be of 10 characters",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Input
                        className="first-name input-box"
                        placeholder="Enter Primary Mobile No"
                        onChange={primaryNoHandler}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="secondaryNo"
                      label="Alternate Mobile"
                      rules={[
                        {
                          required: false,
                        },
                        {
                          min: 10,
                          max: 10,
                          pattern: "^([-]?[1-9][0-9]*|0)$",
                          message: "Mobile No must be of 10 characters",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Input
                        className="first-name input-box"
                        placeholder="Enter Alternate Mobile No"
                        onChange={secondaryNoHandler}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="landlineNo"
                      label="Landline No"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Input
                        className="first-name input-box"
                        placeholder="Enter Landline No"
                        onChange={landlineNoHandler}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="aadharNo"
                      label="Social Security (Aadhaar No.)"
                      rules={[
                        {
                          required: false,
                        },
                        {
                          min: 12,
                          max: 12,
                          pattern: "^([-]?[1-9][0-9]*|0)$",
                          message: "Aadhar No must be of 12 characters",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Input
                        className="first-name input-box"
                        placeholder="Enter Your Aadhaar No"
                        onChange={aadharNoHandler}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="email"
                      label="Email Address"
                      rules={[
                        {
                          type: email,
                          required: false,
                          message: "Please provide valid email",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Input
                        className="first-name input-box"
                        placeholder="Enter Your Email Address"
                        onChange={emailAddressHandler}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      className="form-item-name label-color"
                      name="addStatus"
                      label="Is your permarent address same as mailing address?"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Switch
                        size="large"
                        checkedChildren="No"
                        unCheckedChildren="Yes"
                        // defaultChecked={true}
                        onChange={CheckMailingAddSameAsPermanentAdd}
                      />
                    </Form.Item>
                  </Col>
                  {!isSameAddress && (
                    // <Form layout="horizontal" className="contact-detail-form">
                    <>
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        xl={24}
                        className="form-title"
                      >
                        <Title level={5} style={{ marginTop: "1rem" }}>
                          Permanent Address
                        </Title>
                      </Col>
                      <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name label-color"
                          name="secAddLine1"
                          label="Address line 1"
                          rules={[
                            {
                              required: false,
                            },
                          ]}
                          style={{ marginBottom: "1rem" }}
                        >
                          <Input
                            className="first-name input-box"
                            placeholder="Enter Address line 1"
                            onChange={secAddLine1Handler}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name label-color"
                          name="secAddLine2"
                          label="Address line 2"
                          rules={[
                            {
                              required: false,
                            },
                          ]}
                          style={{ marginBottom: "1rem" }}
                        >
                          <Input
                            className="first-name input-box"
                            placeholder="Enter Address line 2"
                            onChange={secAddLine2Handler}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name label-color"
                          name="secAddLine3"
                          label="Landmark"
                          rules={[
                            {
                              required: false,
                            },
                          ]}
                          style={{ marginBottom: "1rem" }}
                        >
                          <Input
                            className="first-name input-box"
                            placeholder="Enter Landmark"
                            onChange={secAddLine3Handler}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name label-color"
                          name="secAddCountry"
                          label="Country"
                          hasFeedback
                          rules={[
                            {
                              required: false,
                              message: "Please select your city!",
                            },
                          ]}
                          style={{ marginBottom: "1rem" }}
                        >
                          <Select
                            bordered={false}
                            style={{
                              width: "100%",
                              boxShadow: "none",
                              borderBottom: "rgb(153, 153, 153) 1px solid",
                              height: "2.5rem",
                              marginTop: "-10px",
                            }}
                            size="large"
                            placeholder="Select Your Country"
                          ></Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name label-color"
                          name="secAddState"
                          label="State"
                          hasFeedback
                          rules={[
                            {
                              required: false,
                              message: "Select your State!",
                            },
                          ]}
                          style={{ marginBottom: "1rem" }}
                        >
                          <Select
                            style={{ marginTop: "-10px" }}
                            bordered={false}
                            className="select-box"
                            size="large"
                            placeholder="Select Your State"
                            options={stateOptions}
                            onSelect={secStateSelectHandler}
                            onChange={secStateChangedHandler}
                          ></Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name label-color"
                          name="secAddCity"
                          label="City"
                          hasFeedback
                          rules={[
                            {
                              required: false,
                              message: "Please select your city!",
                            },
                          ]}
                          style={{ marginBottom: "1rem" }}
                        >
                          <Select
                            style={{ marginTop: "-10px" }}
                            bordered={false}
                            className="select-box"
                            size="large"
                            placeholder="Select a city"
                            options={citiesOptions}
                            onChange={secCityChangedHandler}
                          ></Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name label-color"
                          name="secAddPin"
                          label="Pincode"
                          rules={[
                            {
                              required: false,
                            },
                            {
                              min: 6,
                              max: 6,
                              pattern: "^([-]?[1-9][0-9]*|0)$",
                              message: "Pincode must be 6 characters",
                            },
                          ]}
                          style={{ marginBottom: "1rem" }}
                        >
                          <Input
                            className="first-name input-box"
                            placeholder="Enter Pincode"
                            onChange={secPincodeHandler}
                          />
                        </Form.Item>
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
              <Col
                className="form-body  p20"
                style={{ marginBottom: "20px" }}
                xs={{ order: 5 }}
                sm={24}
                md={16}
                lg={15}
                xl={15}
                span={23}
                offset={width > breakpoint ? 6 : 0}
              >
                <Row gutter={[8, 8]}>
                  <Col
                    xs={11}
                    sm={12}
                    md={4}
                    offset={width > breakpoint ? 12 : 0}
                  >
                    <Button
                      className="last-btn-1"
                      type="primary"
                      // shape="round"
                      size="large"
                      style={{
                        backgroundColor: "rgb(59, 55, 30)",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                      icon={<ArrowLeftOutlined />}
                    >
                      Previous
                    </Button>
                  </Col>
                  <Col xs={11} sm={12} md={4}>
                    <Form.Item>
                      <Button
                        className="last-ss-btn-2"
                        type="primary"
                        // shape="round"
                        size="large"
                        style={{
                          backgroundColor: "rgb(59, 55, 30)",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                        }}
                        icon={<FileTextOutlined />}
                        htmlType="submit"
                        // disabled={!formIsValid}
                        // onClick={updateHandler}
                      >
                        Update
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col xs={11} sm={12} md={4}>
                    <Form.Item>
                      <Button
                        className="last-btn-3"
                        type="primary"
                        // shape="round"
                        size="large"
                        style={{
                          backgroundColor: "rgb(59, 55, 30)",
                          border: "none",
                        }}
                        icon={<ArrowRightOutlined />}
                        htmlType="submit"
                        // onClick={proceedHandler}
                      >
                        Proceed
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </>
  );
});

export default ContactDetails;
