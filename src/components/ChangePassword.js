import React from 'react';
import './ChangePassword.css';
import { Card,Input,Button,Image} from 'antd';
import { UserOutlined } from '@ant-design/icons';
const ChangePassword = () => {
    return (
        <div className="main-body">
            <div className="login-card">
                <Card>
                    <div className="logo">
                       <Image preview={false} height={30} width={130} src="https://sdrestdemo.iorta.in/assets/salesDrivelogo.png" alt="login-logo"/>
                    </div>
                    <hr className="horline"/>
                    <p className="forgotpasstext">Change Password</p>
                <Input size="large" placeholder="Enter UserName" prefix={<UserOutlined />} />
                <br/><br/>
                <Input.Password size="large" placeholder="Enter your Password" prefix={<UserOutlined />} />
                <p className="changepassnote">Note: Password length should be of minimum 6 characters</p>
                <br/>
                <Button type="primary" className="sendlinkbtn" block>Submit</Button>
                </Card>
            </div>
        </div>
    )
}
export default ChangePassword;