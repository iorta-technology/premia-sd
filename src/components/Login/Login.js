import React,{ useState } from 'react';
import './Login.css';
import { Card, Input, Button, Image, Form } from 'antd';
import { UserOutlined,KeyOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import * as actions from '../../store/actions/index';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import loginLogo from '../../images/loginlogo20years.png'

 const  Login =  () => {
    const [form] = Form.useForm();
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('')

    const agent_data = useSelector((state) => state.login.login_agent_data)
    // const userId =  useSelector((state) => state.login.user.id)

    const dispatch = useDispatch();
    const history = useHistory()
    const onLogin = () => { 
                dispatch(actions.login(email,password))
                if(agent_data !== 'null' && agent_data !== 'undefined'  && agent_data !== "Email/password is incorrect"  ){
                    setTimeout(() => {
                        history.push('/home')
                    }, 1000);
                    
                }
            }
       
    return (
        <div className="main-body">
            <Form form={form} onFinish={onLogin}>
                <div className="login-card">
                    <Card className="main-card">
                        <div className="logo">
                            <Image preview={false} width={350} src={loginLogo} alt="login-logo" />
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
                            <Input.Password size="large" placeholder="Enter your Password" prefix={<KeyOutlined />} onChange={(e)=>setPassword(e.target.value)}/>
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