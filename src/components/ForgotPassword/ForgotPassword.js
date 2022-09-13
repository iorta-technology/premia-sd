import React ,{useState} from 'react';
import './ForgotPassword.css';
import { Card, Input, Button, Image, Form,message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import axios from 'axios';

// Import Image --- //
import sales_logo_img from '../../images/salesDrivelogo.png'

const ForgotPassword = () => {
    const [form] = Form.useForm();
    const [email,setEmail] = useState('');
    const onForgotPassword = () => { 
        // https://abinsurancenode.salesdrive.app/sdx-api/secure/user/forgotPasscode
        // https://sdrestnode.iorta.in/secure/sd/user/forgotPasscode
        axios.post('https://abinsurancenode.salesdrive.app/sdx-api/secure/user/forgotPasscode',{email:email}).then(resp=>{
            console.log("forgotpassword resp data",resp)
            if(resp?.data?.errCode === -1){
                message.success(resp?.data?.errMsg?.msg)
            }
            else if (resp?.data?.errCode === -10){
                message.error(resp?.data?.errMsg)
            }
        }).catch(error=>{
            console.log(error)
        })
    }
    return (
        <div className="main-body">
            <Form form={form} onFinish={onForgotPassword}>
                <div className="login-card">
                    <Card className="main-card">
                        <div className="logo">
                            <Image preview={false} width={130} src={sales_logo_img} alt="login-logo" />
                        </div>
                        <hr className="horline" />
                        <p style={{margin:20,fontSize:"28px",textAlign:'center',color: "#1FB3AB"}}>Forgot Password</p>
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
                            <p className="Logintext" style={{color: '#fff', textDecoration: 'underline'}}>Back To Login</p>
                        </Link>
                        <Button type="primary" htmlType="submit" className="sendlinkbtn" block>Send Link</Button>
                    </Card>
                </div>
            </Form>
        </div>
    )
}
export default ForgotPassword;