import React,{useState} from 'react';
import './Blog.css';
import mainLogo from '../../images/logo_reverse.svg';
import blogImage from '../../images/single_blog_image@2x.png'
import LinkedIn from '../../images/LinkedIn_icon.svg';
import twitter from '../../images/twitter_icon.svg';
import facebook from '../../images/facebook_icon.svg';
import { Modal,message, Button, Input, Select,Form } from 'antd';
import blog_one from '../../images/blog_one.png';
import blog_two from '../../images/blog_two.png';
import blog_three from '../../images/blog_three.png';
import letsConect from '../../images/lets_connect@2x.png';
import axios from '../../axios-common';
import {LeftOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router';
const { Option } = Select;
const Blog = () => {
    const [form] = Form.useForm();
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName]= useState('')
    const [mobile,setMobile]= useState('')
    const [product,setProduct]= useState('')
    const payload={
        user_id: "5df77d17009e273b39cae811",
        Product: product,
        firstName: firstName,
        lastName: lastName,
        primaryMobile: mobile,
        leadStatus: "newleadentery",
        lead_allocated_by: "5df77d17009e273b39cae811",
        lead_Owner_Id: "5df77d17009e273b39cae811",
        lead_Creator_Id: "5df77d17009e273b39cae811"
    }
    const onLetsConnect =()=>{
        axios.post(`user/addlead`,payload).then(resp=>{
            console.log("lets connect resp",resp)
            if(resp?.data?.errCode === 9){
                message.error(resp.data.errMsg);
            }
            else if(resp?.data?.errCode === -1){
                message.success('Thanks for providing us the details. We will connect with you shortly.');
                form.resetFields();
            }
            
        }).catch(err=>{
            console.log("lets connect error",err)
        })
    }
    const history = useHistory()
    const backToLanding=()=>{
        history.push('/himanshu')
    }
    return(
        <>
        <div className="container">
        <section className="maincon">
                <div className="head">
                    <img src={mainLogo} />
                    <div className="options2">
                        <a href="https://d2cli.iorta.in/#/instantrenew" target="_blank">Instant Renewal</a>
                        <a href="https://d2cli.iorta.in/#/policytype" target="_blank">Claims</a>
                        <a href="https://d2cli.iorta.in/#/masterRaiseReq" target="_blank">Service</a>
                        <button className="primary" style={{ cursor: 'pointer' }}>LETS CONNECT</button>
                    </div>
                </div>
                <div className="profile">
                    <div className="titlecontent">
                        <p style={{marginBottom:"40px", cursor:'pointer'}} onClick={backToLanding}><LeftOutlined /> &nbsp;BACK TO HOME</p>
                        <p style={{marginBottom:"10px"}}>ARTICLE</p>
                        <h3>Going For A Vacation. Here Are Five<br/> Reasons You Need Travel Insurance</h3>
                        <p>Monday, 29 March 2021 &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 5 min read</p>
                    </div>   
                </div>
            </section>
           
        </div>
        <div className="content">
            <img src={blogImage} style={{width:'100%',height:'auto'}}/>
        <div className="social sideSocial">
                        <img src={LinkedIn} />
                        <br />
                        <img src={twitter} />
                        <br />
                        <img src={facebook} />
                    </div>
        </div>
        <section className="section4" id="blog">
                <h4>SIMILAR BLOG</h4>
                <div className="cardsHolder">
                    <div className="card">
                        <img src={blog_one} alt="blog1" />
                        <div className="cardCont">
                            <h4>5 Things You Did Not Know About Two Wheeler Insurance</h4>
                            <p>Tata AIG General Insurance Company Limited’s Home Secure Supreme Is A Flexible Insurance Plan</p>
                            <a href="/blog" target="_blank">READ NOW</a>
                        </div>
                    </div>
                    <div className="card">
                        <img src={blog_two} alt="blog2" />
                        <div className="cardCont">
                            <h4>Going For A Vacation. Here Are Five Reasons You Need Travel Insurance</h4>
                            <p>Tata AIG General Insurance Company Limited’s Home Secure Supreme Is A Flexible Travel Insurance Plan</p>
                            <a href="/blog" target="_blank">READ NOW</a>
                        </div>
                    </div>
                    <div className="card">
                        <img src={blog_three} alt="blog3" />
                        <div className="cardCont">
                            <h4>Why every home need a Home Insurance?</h4>
                            <p>Tata AIG General Insurance Company Limited’s Home Secure Supreme Is A Flexible Home Insurance Plan</p>
                            <a href="/blog" target="_blank">READ NOW</a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section5">
                <div style={{ width: "40%" ,marginTop: '-10px'}}>
                    <h4>LETS CONNECT</h4>
                    <h1>NOT SURE WHAT INSURANCE YOU NEED? WE CAN HELP.</h1>
                    <br/>
                    <Form form={form} onFinish={onLetsConnect}>
                    <Form.Item
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: "First Name is Required"
                            }
                        ]}>
                        <Input className="inputs" placeholder="Enter First Name" onChange={(e)=>setFirstName(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                         name="lastName"
                         rules={[
                             {
                                 required: true,
                                 message: "Last Name is Required"
                             }
                         ]}>
                        <Input className="inputs" placeholder="Enter Last Name" onChange={(e)=>setLastName(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                         name="mobile"
                         rules={[
                             {
                                 required: true,
                                 message: "Mobile is Required"
                             },
                             {
                                min:10,
                                max:10,
                                pattern: '^([-]?[1-9][0-9]*|0)$',
                                message: "Enter a Valid Mobile Number"
                              }
                         ]}>
                        <Input className="inputs" placeholder="Enter Mobile" onChange={(e)=>setMobile(e.target.value)} />
                    </Form.Item>
                    <Form.Item name="product" rules={[{ required: true,message: "Please select product" }]}>
                        <Select className="ant-select-selector inputs" placeholder="Select Product" onChange={setProduct} allowClear>
                            <Option value="Health Insurance">Health Insurance</Option>
                            <Option value="Motor Insurance">Motor Insurance</Option>
                            <Option value="Travel Insurance">Travel Insurance</Option>
                            <Option value="Personal Accident Insurance">Personal Accident Insurance</Option>
                            <Option value="Other">Others</Option>
                        </Select>
                    </Form.Item>
                        {/* <Input className="inputs" placeholder="Intrested In" /> */}
                    
                    <button style={{ borderRadius: "8px", cursor: 'pointer' }} 
                    className="primary" htmlType="submit">LETS CONNECT</button>
                    </Form>
                </div>
                <div className="imagehld">
                                <img src={letsConect} width="100%" height="504px" style={{float:"right",objectFit:"contain"}} />
                </div>
            </section>
            <footer>
                <div style={{ fontWeight: '300' }} className="social" >
                    &copy;2021 All Rights Reserved.
                </div>
                <div className="navigation social">
                    <a href="https://sdrestdemo.iorta.in/#/loginview" target="_blank" style={{ color: '#1CB3BC' }}>ADVISOR LOGIN</a>
                    <a href="#">TERMS OF USE</a>
                    <a href="#">PRIVACY POLICY</a>
                    <a href="#">LEGAL</a>
                </div>
            </footer>
        </>
    )
}
export default Blog;