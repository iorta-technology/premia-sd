import React ,{useState} from 'react';
import './ForgotPassword.css';
import { Card, Input, Button, Image, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import axios from 'axios';

const ForgotPassword = () => {
    const [form] = Form.useForm();
    const [email,setEmail] = useState('');
    const onForgotPassword = () => { 
        let payload = {email}
        axios.post('https://sdrestnode.iorta.in/secure/sd/user/forgotPasscode',{payload}).then(resp=>{
            console.log("forgotpassword resp data",resp)
        }).catch(error=>{
            console.log(error)
        })
    }
    return (
        <div className="main-body">
            <Form form={form} onFinish={onForgotPassword}>
                <div className="login-card">
                    <Card>
                        <div className="logo">
                            <Image preview={false} height={30} width={130} src="https://sdrestdemo.iorta.in/assets/salesDrivelogo.png" alt="login-logo" />
                        </div>
                        <hr className="horline" />
                        <p className="forgotpasstext">Forgot Password</p>
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
                            <Input size="large" placeholder="Enter UserName" prefix={<UserOutlined />} onChange={(e)=>setEmail(e.target.value)} />
                        </Form.Item>
                        <Link to="/login">
                            <p className="Logintext">Back To Login</p>
                        </Link>
                        <Button type="primary" htmlType="submit" className="sendlinkbtn" block>Send Link</Button>
                    </Card>
                </div>
            </Form>
        </div>
    )
}
export default ForgotPassword;