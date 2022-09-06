import React,{ useState } from 'react';
import './ChangePassword.css';
import { Card, Input, Button, Image, Form } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import axios from 'axios';
// --- Import Image --- //
import salesDrivelogo_img from '../../assets/salesDrivelogo.png'
const ChangePassword = () => {
    const [form] = Form.useForm();
    const [newpassword,setnewPassword]= useState('')
    const onNewPassword = ()=>{
        console.log("newpassword",newpassword)
        axios.post('https://sdrestnode.iorta.in/secure/sd/user/changePasscode',{newpassword:newpassword}).then(resp=>{
            console.log("changepassword resp data",resp)
        }).catch(error=>{
            console.log(error)
        })
    }
    return (
        <div className="main-body">
            <Form form={form} onFinish={onNewPassword}>
            <div className="login-card">
                <Card className="main-card">
                    <div className="logo">
                        <Image preview={false} height={30} width={130} src={salesDrivelogo_img} alt="login-logo" />
                    </div>
                    <hr className="horline" />
                    <p className="forgotpasstext" style={{margin:20}}>Change Password</p>
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
                    <Input.Password size="large" placeholder="Enter New Password" prefix={<KeyOutlined />} onChange={(e)=>setnewPassword(e.target.value)} />
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
                    <Input.Password size="large" placeholder="Enter Confirm Password" prefix={<KeyOutlined />} />
                    </Form.Item>
                    <p className="changepassnote">Note: Password length should be of minimum 6 characters</p>
                    <br />
                    <Button type="primary" htmlType="submit" className="sendlinkbtn" block>Submit</Button>
                </Card>
            </div>
            </Form>
        </div>
    )
}
export default ChangePassword;