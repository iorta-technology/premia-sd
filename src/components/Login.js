import React from 'react';
import './Login.css';
import { Card, Input, Button, Image, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
const Login = () => {
    const [form] = Form.useForm();
    const onLogin = () => { }
    return (
        <div className="main-body">
            <Form form={form} onFinish={onLogin}>
                <div className="login-card">
                    <Card>
                        <div className="logo">
                            <Image preview={false} width={350} src="https://sdtatadev.iorta.in/assets/loginlogo20years.png" alt="login-logo" />
                        </div>
                        <br /><br />
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: "email",
                                    message: "Please Enter Valid Email"
                                },
                                {
                                    required: true,
                                    message: "Email is Required"
                                }
                            ]}>
                            <Input size="large" placeholder="Enter your NTID" prefix={<UserOutlined />} />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Password is Required',
                                },
                                {
                                    max: 20,
                                    min: 6,
                                    message: "password should be minium 6 characters"
                                }
                            ]}
                        >
                            <Input.Password size="large" placeholder="Enter your Password" prefix={<UserOutlined />} />
                        </Form.Item>
                        <Link to="/forgotpassword">
                            <p className="forgotpasswordtext">Forgot Password</p>
                        </Link>
                        <Button type="primary" className="loginbtn" block>Login</Button>
                    </Card>
                </div>
            </Form>
        </div>
    )
}
export default Login;