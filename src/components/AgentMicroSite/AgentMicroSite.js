import React,{ useState } from 'react';
import './AgentMicroSite.css';
import mainLogo from '../../images/logo.png';
import whatsUp from '../../images/whats_app_FAB.png';
import LinkedIn from '../../images/LinkedIn_icon.svg';
import twitter from '../../images/twitter_icon.svg'
import facebook from '../../images/facebook_icon.svg'
import model from '../../images/model.jpeg'
import celebration_badge from '../../images/celebration_badge.svg'
import innovstion from '../../images/innovstion-badge.svg'
import best_performaer_badge from '../../images/best-performaer-badge.svg'
import low_premiums_iocn from '../../images/low_premiums_iocn.svg'
import quick_n_easy_icon from '../../images/quick_n_easy_icon.svg'
import hassel_free_icon from '../../images/hassel_free_icon.svg'
import Happy_family_Health_insurance from '../../images/Happy_family_Health_insurance.png'
import family_Health_insurance from '../../images/family_health_insurance_icon.svg'
import Travel_insurance_icon from '../../images/Travel_insurance_icon.svg'
import car_insurance_icon from '../../images/car_insurance_icon.svg'
import Personal_accident_insurance_icon from '../../images/Personal_accident_insurance_icon.svg'
import blog_one from '../../images/blog_one.png'
import blog_two from '../../images/blog_two.png'
import blog_three from '../../images/blog_three.png'
import { Modal, Button,Input,Select } from 'antd';
const { Option } = Select;
const AgentMicroService = ()=>{
    const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
    return(
        <>
        <div className="whatsapp">
            <img src={whatsUp} alt="whatsapp" />
        </div>
          <section className="main">
        <div className="header">
            <img src={mainLogo}/>
            <div className="options">
                <a href="#products">Products</a>
                <a href="#blog">Blog</a>
            </div>
            <div className="options2">
                <a href="https://d2cli.iorta.in/#/instantrenew" target="_blank">Instant Renewal</a>
                <a href="https://d2cli.iorta.in/#/policytype" target="_blank">Claims</a>
                <a href="https://d2cli.iorta.in/#/masterRaiseReq" target="_blank">Service</a>
                <button className="primary" onClick={showModal} style={{cursor:'pointer'}}>LETS CONNECT</button>
            </div>
        </div>
        <div className="profile">
            <div className="social">
                <br/>
                <br/>
                <div className="vr" style={{height: "140px"}}></div>
                <img src={LinkedIn} />
                <br/>
                <img src={twitter} />
                <br/>
                <img src={facebook} />
                <div style={{height: "150px",margin: "10px 0"}}>
                    <p>CONNECT WITH ME</p>
                </div>
                <div className="vr" style={{height: "50px"}}></div>
            </div>

            <div className="info">
                <h3><span>Hello i’m</span><br /> Himanshu Gupta,</h3>
                <p className="id">ADVISOR : AD36271</p>
                <div className="tagline">
                    <h1>
                        GET SOLUTION FOR HEALTH INSURANCE
                    </h1>
                </div>
                <h4>CHAKALA BRANCH </h4>
                <p>Chakala Industrial Estate (MIDC) Andheri East, Mumbai, 400093</p>
                <h4>BRANCH MANAGER </h4>
                <p>Vishy Ganeshan (BM197523)</p>
                <h4>SALES MANAGER </h4>
                <p>Amol Khedekar (SM197682)</p>
            </div>
            <div className="person">
                <img src={model}/>
                <img className="play" src={facebook} />
                <div className="badgetag">
                    <img src={celebration_badge} />
                    <div>
                        <h5>Celebrating 5 Years of Association</h5>
                        <p> With Tata Aig Life Insurance</p>
                    </div>

                </div>
            </div>
            <div className="achievements">
                <h2>My Achievements</h2>
                <p>Lorem ipsum dolor sit amet, consetetur sadi pscing elitr, sed diam nonumy eirmod tempor invidunt ut
                </p>
                <div className="badge-info">
                    <div>
                        <img src={innovstion} />
                        <p className="badge-title">INNOVATOR</p>
                    </div>
                    <div>
                        <img src={best_performaer_badge} />
                        <p className="badge-title">BEST PERFORMER</p>
                    </div>
                </div>
                <h2>Clients Testimonials</h2>
                <p>Himanshu is a great listener. He understands my needs very well. His knowledge of insurance is at par
                    with the best in the industry</p>
                <p className="by">- John Doe</p>
                <br />
                <br />
            </div>
        </div>
    </section>

    <section className="section2">
        <div style={{width:'48%'}}>
            <h4>WHY TATA AIG INSURANCE</h4>
            <h1>SIMPLER, SMARTER,<br /> MORE REWARDING HEALTH COVER</h1>
            <br />
            <p>Medical inflation is rising at an unprecedented rate. Something as simple as a regular medical exam could
                set you back a few thousand. This is precisely why having health insurance is so critical..</p>
            <br />
            <div className="planHold">
                <div>
                    <img src={low_premiums_iocn} />
                    <p>Incredibly low premiums</p>
                </div>
                <div>
                    <img src={quick_n_easy_icon} />
                    <p>Superquick and easy</p>
                </div>
                <div>
                    <img src={hassel_free_icon} />
                    <p>Hassle-free claims</p>
                </div>
            </div>
            <br />
            <br />
            <button style={{borderRadius: "8px",cursor:'pointer'}} className="primary" onClick={showModal}>LETS CONNECT</button>
        </div>
        <div style={{width:"50%"}}>
            <img className="family" src={Happy_family_Health_insurance} alt="" />
        </div>
    </section>

    <section className="section3" id="products"> 
        <div className="imagehld"></div>
        <div className="imgdata">
            <h4>OUR PRODUCTS</h4>
            <h1>SIMPLER, SMARTER, REWARDING COVER.</h1>
            <br/>
            <div>
                <div className="cont" style={{width: "45%"}}>
                    <div className="productoptions selectedproduct">
                        <img src={family_Health_insurance} />
                        <p>Family Health Insurance</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                          </svg>
                    </div>
                    <div className="productoptions">
                        <img src={Travel_insurance_icon} />
                        <p>Travel Insurance</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                          </svg>
                    </div>
                    <div className="productoptions">
                        <img src={car_insurance_icon} />
                        <p>Car Insurance</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                          </svg>
                    </div>
                    <div className="productoptions">
                        <img src={Personal_accident_insurance_icon} />
                        <p>Personal Accident Insurance</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                          </svg>
                    </div>
                </div>

                <div className="cont" style={{width: "50%",marginLeft: "10px"}}>
                    <p className="matter">
                        A family floater health insurance plan allows you to cover multiple family members under a single policy. All family members share the maximum sum insured amount. This is a great option for families where some members may require more cover than others. Typically, a family floater health insurance plan offers a higher cover limit.
                    </p>
                    <br/>
                    <br/>
                    <p className="matter"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      </svg></span>No Sub-Limit on Hospital Room Rent</p>
                    <p className="matter"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      </svg></span>Pre & Post Hospitalisation Cover </p>
                    <p className="matter"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      </svg></span>Cover For Pre-Existing Illnesses</p>

                      <br/>
                      <button style={{borderRadius: "8px",display: "inlineBlock",marginRight: "20px"}} className="primary">LEARN MORE</button><span style={{fontSize: '12px',color: '#0C5CAA'}}>DOWNLOAD BROCHURE</span>
                </div>
            </div>
        </div>
    </section>

    <section className="section4" id="blog">
        <h4>BLOG</h4>
        <h1>EVERYTHING ABOUT INSURANCE YOU NEED TO KNOW</h1>
        <div className="cardsHolder">
            <div className="card">
                <img src={blog_one} alt="blog1"/>
                <div className="cardCont">
                    <h4>5 Things You Did Not Know About Two Wheeler Insurance</h4>
                    <p>Tata AIG General Insurance Company Limited’s Home Secure Supreme Is A Flexible Insurance Plan</p>
                    <a href="#">READ NOW</a>
                </div>
            </div>
            <div className="card">
                <img src={blog_two} alt="blog2"/>
                <div className="cardCont">
                    <h4>Going For A Vacation. Here Are Five Reasons You Need Travel Insurance</h4>
                    <p>Tata AIG General Insurance Company Limited’s Home Secure Supreme Is A Flexible Travel Insurance Plan</p>
                    <a href="#">READ NOW</a>
                </div>
            </div>
            <div className="card">
                <img src={blog_three} alt="blog3" />
                <div className="cardCont">
                    <h4>Why every home need a Home Insurance?</h4>
                    <p>Tata AIG General Insurance Company Limited’s Home Secure Supreme Is A Flexible Home Insurance Plan</p>
                    <a href="#">READ NOW</a>
                </div>
            </div>
        </div>
    </section>

    <section className="section5">
        <div style={{width: "50%"}}>
            <h4>LETS CONNECT</h4>
            <h1>NOT SURE WHAT INSURANCE YOU NEED? WE CAN HELP.</h1>
            <form>
            <Input className="inputs" placeholder="First Name" />
       <Input className="inputs" placeholder="Last Name" />
       <Input className="inputs" placeholder="Mobile" />
       <Select  className="ant-select-selector" placeholder="Select Product" allowClear>
          <Option value="male">Health Insurance</Option>
          <Option value="female">Motor Insurance</Option>
          <Option value="other">Travel Insurance</Option>
          <Option value="other">Personal Accident Insurance</Option>
          <Option value="other">Others</Option>
        </Select>
       {/* <Input className="inputs" placeholder="Intrested In" /> */}
            </form>
            <br/>
            <button style={{borderRadius: "8px",cursor:'pointer'}} className="primary">LETS CONNECT</button>
        </div>
        <div className="imagehld" style={{width: '45%'}}>

        </div>
    </section>
    <footer>
        <div style={{fontWeight: '300'}} className="social" >
            &copy;2021 All Rights Reserved.
        </div>
        <div className="navigation social">
            <a href="https://sdrestdemo.iorta.in/#/loginview" target="_blank" style={{color:'#1CB3BC'}}>ADVISOR LOGIN</a>
            <a href="#">TERMS OF USE</a>
            <a href="#">PRIVACY POLICY</a>
            <a href="#">LEGAL</a>
        </div>
    </footer>
    <div className="ContactUS" >
    <Modal title="Lets connect" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       <Input className="inputs" placeholder="First Name" />
       <Input className="inputs" placeholder="Last Name" />
       <Input className="inputs" placeholder="Mobile" />
       <Select  className="ant-select-selector" placeholder="Select Product" allowClear>
          <Option value="male">Health Insurance</Option>
          <Option value="female">Motor Insurance</Option>
          <Option value="other">Travel Insurance</Option>
          <Option value="other">Personal Accident Insurance</Option>
          <Option value="other">Others</Option>
        </Select>
       {/* <Input className="inputs" placeholder="Intrested In" /> */}
      </Modal>        
    </div>
   
        </>
    )
}

export default AgentMicroService;