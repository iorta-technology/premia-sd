import React, { useEffect, useState } from "react";
import "./Login.css";
import { Card, Input, Button, Image, Form, message } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import loginLogo from "../../images/philplanLogo.png";
import axios from "axios";
import { stoageSetter } from "../../helpers";
import apiConfig from "../../config/api.config";
const { baseURL, auth, secure, NODE_ENV } = apiConfig;

const Login = () => {
  const [form] = Form.useForm();
  const [userId, setUserId] = useState("Uatweng@1");
  const [otp,setOTP] = useState('');
  const [loginCreds,setLoginCreds] = useState('');
  const [securityCode,setSecurityCode] = useState('');
  const [showOTP,setShowOTP] = useState(true)
  const [password, setPassword] = useState("");
  const [emailValidation, setEmailValidation] = useState(null);

  const agent_data = useSelector((state) => state.login.login_agent_data);
  // const userId =  useSelector((state) => state.login.user.id)
  useEffect(() => {
    // Set the value of securityCode when it changes in state
    form.setFieldsValue({ securitycode: securityCode });
  }, [securityCode]);

  const dispatch = useDispatch();
  const history = useHistory();

  const getOTP = () => {
    const credentials = {
      // email: `${email}`, password
      userId: `${userId}`,
      otpFor: "LOGIN",
      value1: `${userId}`,
    };
    // const credentials = {email, password}
    axios
      .post(`${baseURL}auth/getOtp`, credentials)
      .then((res, error) => {
        console.warn("(((((((((_getOTP)))))))))", res);
        if (res === undefined || res === null || res === "") {
          return;
        }
        if (res.status === 200) {
          setOTP(res.data.errMsg.responseBody.OTP)
          setSecurityCode(res.data.errMsg.responseBody.securityCode)
          setShowOTP(false);

          // if (!res.ok) {
          //     message.error('Please check your internet connections');
          // } else {
          try {
            if (res.data.errCode === -1) {
              // let _loginData = [];
              // // actions.multiChannelData()
              // let _defaultChannel = res.data.errMsg[0].filter(
              //   (item, index) => item.setDefault === true
              // );
              // console.log('line 65',_defaultChannel)
              // // console.warn('(((((((((DEFAULTTTT_arrayOwner)))))))))',_defaultChannel)
              // _loginData.push(_defaultChannel, res.data.errMsg[1]);
              // stoageSetter("multi_channel", res.data.errMsg[0]);

              // // dispatch(actions.loginSuccess(_loginData));
              // dispatch(actions.multiChannelData(res.data.errMsg[0]));
              // // history.push("/plan-cards");
            } else {
              message.error(res.data.errMsg);
              console.error("Request failed with status:", res.data.errMsg);
            }
          } catch (err) {}
        }
      })
      .catch((error) => {
        // console.log('ERRROR',error.response)
        if (error.response?.status === 400) {
          if (error.response.data.errCode === 1)
            message.error("Please Enter Correct User Credentials");
        }
      });
  };

  const onLogin = () => {
    const credentials = {
      // email: `${email}`, password
      "userId": `${userId}`,
      "otpFor": "LOGIN",
      "otpValue": `${otp}`,
      "securityCode": `${securityCode}`
    };
    // const credentials = {email, password}
    axios
      .post(`${baseURL}auth/ValidateOtp`, credentials)
      .then((res, error) => {
        console.warn("(((((((((_onLogin)))))))))", res);
        if (res === undefined || res === null || res === "") {
          return;
        }
        if (res.status === 200) {
          let loginResponse = res.data.errMsg.responseBody;
          dispatch(actions.loginSuccess(loginResponse));
           setLoginCreds(res.data.errMsg.responseBody)
           history.push("/plan-cards");

          // setOTP(res.data.errMsg.responseBody.OTP)
          // setSecurityCode(res.data.errMsg.responseBody.securityCode)
          // if (!res.ok) {
          //     message.error('Please check your internet connections');
          // } else {
          try {
            if (res.data.errCode === -1) {
              let _loginData = [];
              // actions.multiChannelData()
              let _defaultChannel = res.data.errMsg[0].filter(
                (item, index) => item.setDefault === true
              );
              // console.warn('(((((((((DEFAULTTTT_arrayOwner)))))))))',_defaultChannel)
              _loginData.push(_defaultChannel, res.data.errMsg[1]);
              stoageSetter("multi_channel", res.data.errMsg[0]);
              
              // dispatch(actions.multiChannelData(res.data.errMsg[0]));
            } else {
              message.error(res.data.errMsg);
            }
          } catch (err) {}
        }
      })
      .catch((error) => {
        // console.log('ERRROR',error.response)
        if (error.response.status === 400) {
          if (error.response.data.errCode === 1)
            message.error("Please Enter Correct User Credentials");
        }
      });
  };

  return (
    <>
      <div className="main-body">
      { showOTP ?
        <Form
          layout="vertical"
          form={form}
          onFinish={getOTP}
        >
          <div className="login-card">
            <Card className="main-card">
              <div className="logo">
                <Image
                  preview={false}
                  width={126}
                  src={loginLogo}
                  alt="login-logo"
                />
              </div>
              {/* <br />
    <br /> */}
              <div className="login_heading">LOGIN</div>
              <Form.Item label="USER ID" name="email">
                <Input
                  className="form_imput"
                  size="large"
                  placeholder="Enter USERID"
                  prefix={<UserOutlined />}
                  defaultValue={userId}
                  // onChange={(e) => setUserId(e.target.value)}
                />
              </Form.Item>
              {/* <Link to="/forgotpassword" className="forgotpasswordtext">
      Forgot Username / Password
    </Link> */}
              <Button
                type="primary"
                htmlType="submit"
                className="loginbtn"
                block
              >
                Get Otp
              </Button>
            </Card>
          </div>
        </Form> :
        <Form layout="vertical" form={form} 
        onFinish={onLogin}
        >
        <div className="login-card">
          <Card className="main-card">
            <div className="logo">
              <Image
                preview={false}
                width={126}
                src={loginLogo}
                alt="login-logo" />
            </div>
            {/* <br />
    <br /> */}
            <div className="login_heading">OTP</div>
            <Form.Item
              label="OTP"
              name="otp"
            >
              {/* <Input size="large" placeholder="Enter PAN Number / Email" prefix={<UserOutlined />} onChange={(e)=>setEmail(e.target.value)} /> */}
              {/* onBlur={ () => setEmailValidation([])} */}
              <Input
                className="form_imput"
                size="large"
                placeholder="Enter OTP"
                // prefix={<UserOutlined />}
                defaultValue={otp}
                // onChange={(e) => setOTP(e.target.value)}
                 />
            </Form.Item>
            <Form.Item
            className="security_code"
              name="securitycode"
              label="SECURITY CODE"
              rules={[
                {
                  required: true,
                  message: "Security code is Required",
                },
                // {
                //   max: 20,
                //   min: 2,
                //   message: "password should be minium 6 characters",
                // },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Enter your Security Code"
                prefix={<KeyOutlined />}
                value={securityCode}
                onChange={(e)=> setSecurityCode(e.target.value)}
                className="form_imput" />
            </Form.Item>
            {/* <Link to="/forgotpassword" className="forgotpasswordtext">
      Forgot Username / Password
    </Link> */}
            <Button type="primary" htmlType="submit" className="loginbtn" block>
              Submit
            </Button>
           {/*<div className="register_btn text-center">
              <div className="register_description">Don’t have a Account?</div>
              <Link to="" className="register_btn_text">
                REGISTER
              </Link>
  </div> */}
          </Card>
        </div>
      </Form>
  }
      </div>
      <div className="footer_powered_by fixed-bottom">
        Powered by <strong>Salesdrive</strong>
        <sup>TM</sup>
      </div>
    </>
  );
};

export default Login;
