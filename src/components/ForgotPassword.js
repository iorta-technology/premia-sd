import React from 'react';
import './ForgotPassword.css';
import { Card,Input,Button,Image} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
const ForgotPassword = () => {
    return (
        <div className="main-body">
            <div className="login-card">
                <Card>
                    <div className="logo">
                       <Image preview={false} height={30} width={130} src="https://sdrestdemo.iorta.in/assets/salesDrivelogo.png" alt="login-logo"/>
                    </div>
                    <hr className="horline"/>
                    <p className="forgotpasstext">Forgot Password</p>
                <Input size="large" placeholder="Enter UserName" prefix={<UserOutlined />} />
                <Link to="/login">
                    <p className="Logintext">Back To Login</p>
                </Link>
                <br/>
                <Button type="primary" className="sendlinkbtn" block>Send Link</Button>
                </Card>
            </div>
        </div>
    )
}
export default ForgotPassword;