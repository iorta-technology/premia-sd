import React from 'react';
import './Login.css';
import { Card,Input,Button,Image} from 'antd';
import { UserOutlined } from '@ant-design/icons';
const Login = () => {
    return (
        <div className="main-body">
            <div className="login-card">
                <Card>
                    <div className="logo">
                       <Image preview={false} width={350} src="https://sdtatadev.iorta.in/assets/loginlogo20years.png" alt="login-logo"/>
                    </div>
                    <br/><br/>
                <Input size="large" placeholder="Enter your NTID" prefix={<UserOutlined />} />
                <br/><br/>
                <Input.Password size="large" placeholder="Enter your Password" prefix={<UserOutlined />} />
                <br/><br/>
                <Button type="primary" block>Login</Button>
                </Card>
            </div>
        </div>
    )
}
export default Login;