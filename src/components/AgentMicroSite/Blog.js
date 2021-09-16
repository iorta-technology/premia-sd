import React,{useState} from 'react';
import './Blog.css';
import mainLogo from '../../images/logo_reverse.svg';
import blogImage from '../../images/single_blog_image@2x.png'
import whatsUp from '../../images/whats_app_FAB.png';
import LinkedIn from '../../images/LinkedIn_icon.svg';
import twitter from '../../images/twitter_icon.svg';
import facebook from '../../images/facebook_icon.svg';
import mail from '../../images/mail_outline_icon.svg';
import copy from '../../images/copy_link_icon.svg';
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
    const [isModalVisible, setIsModalVisible] = useState(false);
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
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        console.log(firstName,lastName,mobile,product)
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
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return(
        <>
        <div className="whatsapp">
                <a href="https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat/?lang=kk" target="_blank">
                <img src={whatsUp} alt="whatsapp" />
                </a>
            </div>
        <div className="container">
        <section className="maincon">
                <div className="head">
                    <img src={mainLogo} />
                    <div className="options2">
                        <a href="https://d2cli.iorta.in/#/instantrenew" target="_blank">Instant Renewal</a>
                        <a href="https://d2cli.iorta.in/#/policytype" target="_blank">Claims</a>
                        <a href="https://d2cli.iorta.in/#/masterRaiseReq" target="_blank">Service</a>
                        <button className="primary" onClick={showModal} style={{ cursor: 'pointer' }}>LETS CONNECT</button>
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
                        <span style={{color:'#3E3E3E'}}>SHARE</span>
                        <br/>
                        <img src={LinkedIn} />
                        <br />
                        <img src={twitter} />
                        <br />
                        <img src={facebook} />
                        <br/>
                        <img src={mail} />
                        <br/>
                        <img src={copy} />
                    </div>
            <div className="blogcont">
                <h3 style={{color:'#0C5CAA'}}>Going For A Vacation. Here Are Five Reasons You Need Travel Insurance</h3>
                <p style={{marginBottom:'30px'}}>
                Imagine this scenario: <span>You have left behind the office stress and are finally setting off on the perfect vacation. The weather is fine and your flight is on time. But then your baggage goes missing. Worse still, all your travellers' cheques were in your suitcase.</span> 
                </p>
                <span>
                Here are reasons you need travel insurance:
                </span>
                <p style={{marginBottom:'30px'}}>
                Loss of passport, baggage, or documents: This is probably the worst situation you can imagine while travelling. But if you have a travel insurance, you have help at hand. In case of a lost passport, your insurance will reimburse the cost of acquiring a duplicate or a new one. In case of missing belongings, you will be compensated for your loss up to an approved sum; while if your baggage gets delayed, you will be reimbursed for the personal effects that you might have to buy for the meanwhile. This can be a huge help as you wait for your baggage to turn up.
                </p>
                <p style={{marginBottom:'30px'}}>
                Health problems:<span>
                No one wants to fall ill while on vacation. But medical complications or a serious bodily injury could arise at any time. That is why travel insurance is important. It will ensure you get the necessary medical attention in case of an emergency be it to take you to an hospital or have a close family member flown to you if you are a student. This also includes dental treatment because it’s quite understand that when you’re in a new place, stopping yourself from going on the sweets can be a little difficult. Your travel insurance will take care of other related expenses as well. You may also avail cashless hospitalisation with travel insurance.
                </span>
                </p>
                <p style={{marginBottom:'30px'}}>   
                TATA AIG offers travel insurance with medical cover upto 5,00,000$ with AIG assist in 190+ nations. Apply Now!
                </p>
                <p style={{marginBottom:'30px'}}>
                Flight cancellation or delay:<span>This is a common glitch nowadays. It could be airline’s fault, a natural hazard, or a personal problem. In all the cases, you will be either reimbursed or refunded a certain amount as per the policy schedule. In case illness at the eleventh hour or a sudden death in the family can affect your plans. Suppose you need to cancel your travel plans. What happens to the money you spent on the air ticket and hotel bookings? It does not get wasted. Your insurance will reimburse you the unused hotel cost and travel tickets. In case of a delayed flight, your travel policy will cover additional expenses. This may include an unplanned night stay at a hotel and food, among other things.</span>
                </p>
                <p style={{marginBottom:'30px'}}>
                Emergency medical evacuation:<span>If a medical condition requires you to be transported from the scene of incidence to the nearest hospital, you don’t have to worry about the expenses. If you are already admitted in a hospital and need to be taken back to your country for further medical help or to be with your loved ones, your travel insurance will take care of that too.</span>
                </p>
                <p>
                Fraudulent charges:<span>Imagine losing your credit/debit card while you are on a vacation and you start getting texts that someone is using it. Scary, right? Not only are you losing your money but you are losing money in a place where you might not even find help easily. But with travel insurance, that would not be a problem. Your policy will refund you for the money lost through stolen payment cards for up to 12 hours prior to your first reporting of the incident.</span>
                </p>
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
                            <a>READ NOW</a>
                        </div>
                    </div>
                    <div className="card">
                        <img src={blog_two} alt="blog2" />
                        <div className="cardCont">
                            <h4>Going For A Vacation. Here Are Five Reasons You Need Travel Insurance</h4>
                            <p>Tata AIG General Insurance Company Limited’s Home Secure Supreme Is A Flexible Travel Insurance Plan</p>
                            <a>READ NOW</a>
                        </div>
                    </div>
                    <div className="card">
                        <img src={blog_three} alt="blog3" />
                        <div className="cardCont">
                            <h4>Why every home need a Home Insurance?</h4>
                            <p>Tata AIG General Insurance Company Limited’s Home Secure Supreme Is A Flexible Home Insurance Plan</p>
                            <a>READ NOW</a>
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
            <div className="ContactUS" >
                <Modal visible={isModalVisible} onOk={handleOk}  onCancel={handleCancel} footer={null}
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}>
            <div>
                <h2 style={{color:'#0C5CAA',marginTop: '-12px', marginBottom: '10px !important'}}>Lets connect</h2>
            </div>
                <Form form={form} onFinish={handleOk} style={{marginTop: '15px'}}>  
                <Form.Item
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: "First Name is Required"
                            }
                        ]}>
                        <Input className="inputs" placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)} />
                </Form.Item>
                <Form.Item
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: "Last Name is Required"
                            }
                        ]}>
                        <Input className="inputs" placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)} />
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
                        <Input className="inputs" placeholder="Mobile" onChange={(e)=>setMobile(e.target.value)} />
                </Form.Item>
                <Form.Item 
                        name="product"
                        rules={[
                            {
                                required: true,
                                message: "Product is Required"
                            }
                        ]}>
                        <Select className="ant-select-selector inputs" placeholder="Select Product" onChange={setProduct} allowClear>
                            <Option value="Health Insurance">Health Insurance</Option>
                            <Option value="Motor Insurance">Motor Insurance</Option>
                            <Option value="Travel Insurance">Travel Insurance</Option>
                            <Option value="Personal Accident Insurance">Personal Accident Insurance</Option>
                            <Option value="Other">Others</Option>
                        </Select>
                </Form.Item>
                <Button type="primary" style={{backgroundColor:'#1CB3BC', border:'none',borderRadius:'5px'}} htmlType="submit" size={'large'}>SUBMIT</Button>
                </Form>  
                    {/* <Input className="inputs" placeholder="Intrested In" /> */}
                </Modal>
            </div>
        </>
    )
}
export default Blog;