import React, { useEffect, useState } from "react";
import "./Login.css";
import { Card, Input, Button, Image, Form, message } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import loginLogo from "../../images/ABIB_LOGO.jpg";
import axios from "axios";

const Login = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidation, setEmailValidation] = useState(null);

  const agent_data = useSelector((state) => state.login.login_agent_data);
  // const userId =  useSelector((state) => state.login.user.id)

  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = () => {
    axios
      .post(`https://abinsurancenode.salesdrive.app/sdx-api/auth/user/login`, {
        email,
        password,
      })
      .then((res, error) => {
        console.warn('(((((((((_loginResp)))))))))',res)
        if (res === undefined || res === null || res === "") {
          return;
        }
        if (res.status === 200) {
          // if (!res.ok) {
          //     message.error('Please check your internet connections');
          // } else {
          try {
            if (res.data.errCode === -1) {
                let _loginData = []
                // actions.multiChannelData()
                let _defaultChannel = res.data.errMsg[0].filter((item,index) => item.setDefault === true)
                // console.warn('(((((((((DEFAULTTTT_arrayOwner)))))))))',_defaultChannel)
                _loginData.push(_defaultChannel,res.data.errMsg[1])
                console.warn('(((((((((_loginData)))))))))',_loginData)
                dispatch(actions.loginSuccess(_loginData));
                console.warn('(((((((((HERE)))))))))')
                dispatch(actions.multiChannelData(res.data.errMsg[0]));
                console.warn('(((((((((HERE ALSO)))))))))')
                // return
                history.push("/home");
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
    <div className="main-body">
      <Form form={form} onFinish={onLogin}>
        <div className="login-card">
          <Card className="main-card">
            <div className="logo">
              <Image
                preview={false}
                width={350}
                src={loginLogo}
                alt="login-logo"
              />
            </div>
            <br />
            <br />
            <Form.Item
              name="email"
              // rules={emailValidation}
              // rules={[
              // {
              //     type: "email",
              //     message: "Please Enter Valid Email"
              // },
              // {
              //     required: true,
              //     message: "PAN No is Required"
              //     // message: "Email is Required"
              // },
              // {
              //     message: 'Enter a valid PAN No format',
              //     pattern: new RegExp(/(^([a-zA-Z]{5})([0-9]{4})([a-zA-Z]{1})$)/)
              // }
              // ]}
            >
              {/* <Input size="large" placeholder="Enter PAN Number / Email" prefix={<UserOutlined />} onChange={(e)=>setEmail(e.target.value)} /> */}
              {/* onBlur={ () => setEmailValidation([])} */}
              <Input
                size="large"
                placeholder="Enter PAN Number / Email"
                prefix={<UserOutlined />}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password is Required",
                },
                {
                  max: 20,
                  min: 2,
                  message: "password should be minium 6 characters",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Enter your Password"
                prefix={<KeyOutlined />}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Link to="/forgotpassword">
              <p className="forgotpasswordtext">Forgot Password</p>
            </Link>
            <Button type="primary" htmlType="submit" className="loginbtn" block>
              Login
            </Button>
          </Card>
        </div>
      </Form>
    </div>
  );
};

export default Login;
