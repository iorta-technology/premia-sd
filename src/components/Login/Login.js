import React,{ useState } from 'react';
import './Login.css';
import { Card, Input, Button, Image, Form ,message} from 'antd';
import { UserOutlined,KeyOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import * as actions from '../../store/actions/index';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import loginLogo from '../../images/ABIB_LOGO.jpg'
import axios from 'axios'; 

 const  Login =  () => {
    const [form] = Form.useForm();
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('')

    const agent_data = useSelector((state) => state.login.login_agent_data)
    // const userId =  useSelector((state) => state.login.user.id)

    const dispatch = useDispatch();
    const history = useHistory()
    const onLogin = () => { 
        // let _loginResp = dispatch(actions.login(email,password))
        // console.warn('(((((((((_loginResp)))))))))',_loginResp)
        // return
        // if(agent_data !== 'null' && agent_data !== 'undefined'  && agent_data !== "Email/password is incorrect"  ){
        //     setTimeout(() => {
        //         history.push('/home')
        //     }, 1000);
            
        // }
        axios.post(`https://abinsurancenode.salesdrive.app/sdx-api/auth/user/login`,{email,password}).then( res=>{
                // console.log("logged in data",res)
                console.warn('(((((((((_loginResp)))))))))',res)
          
            if (res === undefined || res === null || res === "") {
                return;
            }
            if (res.status === 200) {
                // if (!res.ok) {
                //     message.error('Please check your internet connections');
                // } else {
                try {
                    if (res.data.errCode === -1) {
                        dispatch(actions.loginSuccess(res.data.errMsg));
                        history.push('/home')
                    }else{
                        message.error(res.data.errMsg);
                    }
                }catch(err){

                }
                // }
            }
        }).catch(error=>{
            console.log(error)
        })
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