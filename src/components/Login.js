import React,{ useState } from 'react';
import './Login.css';
import { Card, Input, Button, Image, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import * as actions from '../store/actions/index';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

 const Login = () => {
    const [form] = Form.useForm();
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('')

    const dispatch = useDispatch();
    const history = useHistory()
    const onLogin = () => { 
                dispatch(actions.login(email,password))
                history.push('/home')
            }
       
    return (
        <div className="main-body">
            <Form form={form} onFinish={onLogin}>
                <div className="login-card">
                    <Card className="main-card">
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
                            <Input size="large" placeholder="Enter your NTID" prefix={<UserOutlined />} onChange={(e)=>setEmail(e.target.value)} />
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
                                    min: 2,
                                    message: "password should be minium 6 characters"
                                }
                            ]}
                        >
                            <Input.Password size="large" placeholder="Enter your Password" prefix={<UserOutlined />} onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Item>
                        <Link to="/forgotpassword">
                            <p className="forgotpasswordtext">Forgot Password</p>
                        </Link>
                        <Button type="primary" htmlType="submit" className="loginbtn" block>Login</Button>
                    </Card>
                </div>
            </Form>
        </div>
    )
}

export default  Login;