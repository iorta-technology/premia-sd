import React from 'react';
import './ChangePassword.css';
import { Card, Input, Button, Image, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const ChangePassword = () => {
    return (
        <div className="main-body">
            <Form>
            <div className="login-card">
                <Card>
                    <div className="logo">
                        <Image preview={false} height={30} width={130} src="https://sdrestdemo.iorta.in/assets/salesDrivelogo.png" alt="login-logo" />
                    </div>
                    <hr className="horline" />
                    <p className="forgotpasstext">Change Password</p>
                    <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "New Password Required"
                        },
                        {
                            min:6,
                        }
                    ]}
                    >
                    <Input.Password size="large" placeholder="Enter New Password" prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item
                    name="confirmpwd"
                    dependencies={['password']}
                    
                    rules={[
                        {
                            required: true,
                            message:"Confirm Password Required"
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                
                              return Promise.reject(new Error('The Passwords that you entered do not match!'));
                            },
                          })
                    ]}
                    >
                    <Input.Password size="large" placeholder="Enter Confirm Password" prefix={<UserOutlined />} />
                    </Form.Item>
                    <p className="changepassnote">Note: Password length should be of minimum 6 characters</p>
                    <br />
                    <Button type="primary" className="sendlinkbtn" block>Submit</Button>
                </Card>
            </div>
            </Form>
        </div>
    )
}
export default ChangePassword;