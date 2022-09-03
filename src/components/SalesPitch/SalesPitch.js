import { Tabs, Col, Form, Row, Carousel, Image, Typography, Divider, Descriptions } from 'antd';
import React, { useDebugValue, useState } from 'react';
import { Card } from 'antd';
import { Button } from 'antd';
import './SalesPitch.css';
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { Alert } from 'antd';
import video from './video.mp4';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import VideoPlayer from 'react-video-js-player';
import MainTabs from '../../components/MainTabs/MainTabs'
import MTabs from '../../components/Tab/Tab'

const tabMenu = [
    {
        id: 'customerpitch',
        value: "Customer Pitch",
    },
    {
        id: 'advisorpitch',
        value: "Advisor Pitch",
    },

]

const { Text } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',

};
const { Title } = Typography;
const SalesPitch = () => {

    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");
    const changeTabPosition = e => {
        setTabPosition(e.target.value);
    };
    const videoSrc = video;
    const poster = "video.mp4";
    return (
        <div>
            
            {width <= "375" ?
                <MTabs
                    tabMenu={tabMenu}
                    activeKey="customerpitch"
                    header="Presales Tools"
                /> :
                <div>
                    <MTabs
                        tabMenu={tabMenu}
                        activeKey="customerpitch"
                        header="Presales Tools"
                    />
                </div>
            }
            <div className="Salespitch-main">
                <div className="Salespitch-row-flex">
                    <Tabs tabPosition={tabPosition} tabBarGutter="2vw" 
                        className='SalesPitch-sider' >
                        <TabPane tab="Presentation" key="1" >
                            {/* <div className="Salespitch-data-flex"> */}
                            <div className="Salespitch-details-card-style ">
                                <div className="Salespitch-details-card-content-align">
                                    <Row gutter={[16, 24]} justify="center">
                                        <Col xs={{ order: 1 }} sm={16} md={16} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                            <Row gutter={['', 24]}>
                                                <Col className="Salespitch-img1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                    <div >
                                                        <Card>
                                                            <Carousel effect="fade">
                                                                <div className="c1">
                                                                    <Image src="../../img1.jpg"  />
                                                                </div>
                                                                <div className="c1">
                                                                    <Image src="../../img2.jpg"  />
                                                                </div>
                                                            </Carousel>
                                                        </Card>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={{ order: 2 }} sm={8} md={8} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                            <Row>
                                                <Col className="Salespitch-img2" xs={22} sm={24} md={24} lg={24} xl={24} span={24} >
                                                    <Card>
                                                        <div className="c2">
                                                            <Image src="../../img1.jpg" style={{borderRadius:'5px 0', width: '20vw', height: '29vh' }} />
                                                        </div>
                                                        <div className="c2">
                                                            <Image src="../../img2.jpg" style={{ width: '20vw', height: '29vh' }} />
                                                        </div>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                                            <Row gutter={['', 24]}>
                                                <Col className="presentation-img" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                    <h1 className="headingg">Mahindra Insurance Brokers</h1>
                                                    <p className="headingg">COMPANY PROFILE</p>
                                                    <p className="headingg1">Mahindra Insurance Brokers Ltd.(MIBL) is 80% subsidiary company of Mahindra & Mahindra Financial Services Ltd.</p>
                                                    <p className="headingg1">MIBL was granted a Direct Broker's License by the Insurance Regulatory and Development Authority (IRDA) in May 2004, for undertaking direct insurance broking in Life and Non-Life businesses. MIBL has empanelled itself with various public and private insurance companies to offer customized solutions to customers. In September 2011, MIBL was granted a Composite Broker licence by the IRDA, thus foraying into Reinsurance Broking business along with Direct Broking. As a Total Insurance Risk Solutions provider, MIBL plays an integral role in the Risk Management portfolio of customers.</p>
                                                    <p className="headingg1">MIBL is one of the few insurance broking companies in India to have been awarded the prestigious ISO 9001: 2015 Certification for Quality Management Systems.MIBL is committed to providing value to its customers by understanding their insurance needs and risk profile, and providing innovative, cost effective, customized solutions to ensure total customer satisfaction.Our role, in short, encompasses various activities right from risk profiling to claims administration for customers.Our aim is to play a predominant role in the insurance broking industry in India with a focus on giving more value to customers, innovative solutions, superior services, a professional team, and corporate social responsibility.
                                                    </p>
                                                    <p className="headingg1">The company provides direct insurance broking for Corporate and Retail customers and offers a range of products for the Non-Life and Life segments.In addition, MIBL also offers value-added services like Risk Management / Audit which include risk inspection and gap analysis, and portfolio management which includes claims handling.</p>
                                                    <p className="headingg1">The Life Insurance retail products cover Children's Plans, Endowment, Money Back, Retirement Plans, Term, Unit Linked Plans and Whole-Life Plans. The Group Policies include Credit Cover, Employees Term Cover, Gratuity and Superannuation. Under the Non-life Insurance category, Personal, Industrial, Commercial, Social and Liability products are available.</p>
                                                    <p className="headingg1">In addition to regular products, customized solutions are also developed for clients after consulting them.Group Credit Protection Plan is a customised, cost-effective life insurance solution offering Group Credit Term Cover to retail customers availing of auto and tractor loans from Mahindra Finance.</p>
                                                    <h2 className="headingg2">Uploaded By: Admin Khan </h2>
                                                    <h3 className="headingg3">Uploaded Date: 8/19/2021</h3>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col xs={{ order: 4 }} sm={24} md={24} lg={{ order: 4 }} xl={{ order: 4 }} span={22}>
                                            <Row gutter={[16, 16]}>
                                                <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                    <div >
                                                        <Card bordered={true} >
                                                            <div className="i1">
                                                                <Image src="../../img1.jpg" style={{ width: '100%', height: '26vh' }} />
                                                                {/* <Text className="text">Ant Design (mark)</Text> */}
                                                                <div className="demo-nav">
                                                                    <Link>Mahindra Insurance Brokers</Link>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </Col>
                                                <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                    <div >
                                                        <Card bordered={true} >
                                                            <div className="i1">
                                                                <Image src="../../i2.jpg" style={{ width: '100%', height: '26vh' }} />
                                                                <div className="demo-nav">
                                                                    <Link>Indostar - About Company</Link>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </Col>
                                                <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                    <div >
                                                        <Card bordered={true} >
                                                            <div className="i1">
                                                                <Image src="../../i3.JPG" style={{ width: '100%', height: '26vh' }} />
                                                                <div className="demo-nav">
                                                                    <Link>Orange Retail Finance</Link>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </Col>
                                                <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                    <div >
                                                        <Card bordered={true} >
                                                            <div className="i1">
                                                                <Image src="../../i4.JPG" style={{ width: '100%', height: '26vh' }} />
                                                                <div className="demo-nav">
                                                                    <Link>Tata AIG General Insurance Com...</Link>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </Col>
                                                <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                    <div >
                                                        <Card bordered={true} >
                                                            <div className="i1">
                                                                <Image src="../../i5.JPG" style={{ width: '100%', height: '26vh' }} />
                                                                <div className="demo-nav">
                                                                    <Link>Bajaj Capital Company Presenta...</Link>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </Col>
                                                <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                    <div ><Card bordered={true} >
                                                        <div className="i1">
                                                            <Image src="../../i6.png" style={{ width: '100%', height: '26vh' }} />
                                                            <div className="demo-nav">
                                                                <Link>About The Company</Link>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                    </div>
                                                </Col>
                                                <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                    <div ><Card bordered={true} >
                                                        <div className="i1">
                                                            <Image src="../../i7.jpg" style={{ width: '100%', height: '26vh' }} />
                                                            <div className="demo-nav">
                                                                <Link>Edelweiss Tokio Life Insurance...</Link>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                    </div>
                                                </Col>
                                                <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                    <div ><Card bordered={true} >
                                                        <div className="i1">
                                                            <Image src="../../i8.png" style={{ width: '100%', height: '26vh' }} />
                                                            <div className="demo-nav">
                                                                <Link>National Life Group</Link>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                    </div>
                                                </Col>
                                                <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                    <div ><Card bordered={true} >
                                                        <div className="i1">
                                                            <Image src="../../i9.JPG" style={{ width: '100%', height: '26vh' }} />
                                                            <div className="demo-nav">
                                                                <Link>THAI PATTANA INSURANCE PUBLIC ...</Link>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                    </div>
                                                </Col>
                                                <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                    <div ><Card bordered={true} >
                                                        <div className="i1" >
                                                            <Image src="../../i10.png" style={{ width: '100%', height: '26vh' }} />
                                                            <div className="demo-nav">
                                                                <Link>TATA AIG</Link>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Testimonials" key="2">
                            <div className='SalesGuide-Testimonials'>
                                <Row gutter={[40, 24]} justify="center">
                                    <div className='Testimonials-TopContent'>
                                        <Col xs={{ order: 1 }} sm={12} md={11} lg={{ order: 1 }} xl={{ order: 1 }} style={{padding:0}}>
                                            <Row gutter={['', 24]} style={{justifyContent : 'center'}}>
                                                <Col className="testimonial1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                    <VideoPlayer className="Testimonials-Video" src={videoSrc} poster={poster} playbackRates={[0.5, 1, 3.85, 16]} />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={{ order: 2 }} sm={12} 
                                            md={12} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                            <Row gutter={['', 24]} className='Testimonials-Text'>
                                                <Col xs={22} sm={24} md={24} lg={24} xl={24} span={24} className='Testimonials-TextData'>
                                                    <h1 className="headingg">
                                                        Mahindra Insurance Brokers Limited
                                                    </h1>
                                                    <p className="headingg1">
                                                        MIBL's aim is to play a predominant role 
                                                        in the insurance broking industry in India with a focus on value to customers, 
                                                        innovative solutions, superior services, professional manpower 
                                                        and Corporate Social Responsibility. To further strengthen its 
                                                        commitment to being a Customer Centric Company, MIBL is now proud to be one 
                                                        of the few insurance broking companies in India who have been awarded the prestigious
                                                        ISO 9001:2015 Certification for Quality Management Systems. Adopting Quality Management 
                                                        Systems ensures standardization of validated processes, measuring and monitoring of customer 
                                                        satisfaction levels for improvement, and setting and achieving quality objectives for excellence.
                                                    </p>
                                                    <h2 className="headingg2">Uploaded By: Admin Khan </h2>
                                                    <h3 className="headingg3" style={{fontWeight:"bold"}}>Uploaded Date: 8/19/2021</h3>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </div>
                                    <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                                        <Row gutter={[16, 16]}>
                                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                <div >
                                                    <Card bordered={true} >
                                                        <div className="i1">
                                                            <Image src="../../i11.jpg" style={{ width: '24vw', height: '26vh' }} />
                                                            <div className="demo-nav">
                                                                <Link>Mahindra Insurance Brokers</Link>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </Col>
                                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                <div >
                                                    <Card bordered={true} >
                                                        <div className="i1">
                                                            <Image src="../../i3.JPG" style={{ width: '24vw', height: '26vh' }} />
                                                            <div className="demo-nav">
                                                                <Link>Customer Video</Link>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </Col>
                                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                <div >
                                                    <Card bordered={true} >
                                                        <div className="i1">
                                                            <Image src="../../i5.JPG" style={{ width: '24vw', height: '26vh' }} />
                                                            <div className="demo-nav">
                                                                <Link>Bajaj Capital - Always Acting in Your Interest</Link>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </Col>
                                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                <div >
                                                    <Card bordered={true} >
                                                        <div className="i1">
                                                            <Image src="../../i12.JPG" style={{ width: '24vw', height: '26vh' }} />
                                                            <div className="demo-nav">
                                                                <Link>Customer Video</Link>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </Col>
                                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                <div >
                                                    <Card bordered={true} >
                                                        <div className="i1">
                                                            <Image src="../../i13.JPG" style={{ width: '24vw', height: '26vh' }} />
                                                            <div className="demo-nav">
                                                                <Link>Standard Life</Link>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </Col>
                                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                <div ><Card bordered={true} >
                                                    <div className="i1">
                                                        <Image src="../../i14.jpg" style={{ width: '24vw', height: '26vh' }} />
                                                        <div className="demo-nav">
                                                            <Link>Customer Stories</Link>
                                                        </div>
                                                    </div>
                                                </Card>
                                                </div>
                                            </Col>
                                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                <div ><Card bordered={true} >
                                                    <div className="i1">
                                                        <Image src="../../i15.png" style={{ width: '24vw', height: '26vh' }} />
                                                        <div className="demo-nav">
                                                            <Link>JIGAR ROHITBHAI MEHTA</Link>
                                                        </div>
                                                    </div>
                                                </Card>
                                                </div>
                                            </Col>
                                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                <div ><Card bordered={true} >
                                                    <div className="i1">
                                                        <Image src="../../i14.jpg" style={{ width: '24vw', height: '26vh' }} />
                                                        <div className="demo-nav">
                                                            <Link>Our Customer Stories</Link>
                                                        </div>
                                                    </div>
                                                </Card>
                                                </div>
                                            </Col>
                                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                                <div ><Card bordered={true} >
                                                    <div className="i1">
                                                        <Image src="../../i16.JPG" style={{ width: '24vw', height: '26vh' }} />
                                                        <div className="demo-nav">
                                                            <Link>Testimonial by Merlinda Teodoro, PhilPla...
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </Card>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                            </div>
                        </TabPane>
                        <TabPane tab="Products" key="3">
                            <div>
                            <Row gutter={[40, 24]} justify="center">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="success-story" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Title className="success-head">Mutual Fund</Title>
                                                <hr style={{opacity:".3"}}/>                                            <Form layout="horizontal" className="success-story-form">
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <h3 className="product-head3">Description</h3>
                                                        <p className="product-para">Mutual Funds are among the hottest favourites with all types of investors.Investing in mutual funds ranks among one of the preferred ways of creating wealth over the long term.In fact, mutual funds represent the hands-off approach to entering the equity market.There are a wide variety of mutual funds that are viable investment avenues to meet a wide variety of financial goals.This section explains the various aspects of Mutual Funds.</p>
                                                        
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <div style={{paddingTop:"10px"}}>
                                                            <Image src="../../MUTUAL_FUND.jpg" style={{ width: '100%', backgroundSize:"100% 100%"}} />
                                                        </div>
                                                    </Col>
                                                </Form>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24} className='Products-Footer'>
                                                    <Button type="link" block className='SalesPitch-ShowMore'>Show More</Button>
                                                    <Link to={{pathname: "/products",}}>
                                <div className='Product-showMoreContainer'>
                                                        <div style={{backgroundColor:'rgb(59, 55, 30)', textDecoration : 'none'}} className='Product-ShowMore'>
                                                            <img className='Product-ShowMorePng' src={'https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/White/Group_11252.png'}alt='png'/>
                                                            Show All Products
                                                        </div>
                                                    </div>
                                                    </Link>
                                                </Col>
                                            </Col>
                                            <Col className="success-story" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Title className="success-head">Mutual Funds India - NFO Latest</Title>
                                                {/* <img src='https://sdrestdemo.iorta.in/assets/zoom.png' alt=''/> */}
                                                <hr style={{opacity:".3"}}/>
                                                <Form layout="horizontal" className="success-story-form">
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <h3 className="product-head3">Description</h3>
                                                        <p className="product-para">New Fund Offer (NFO) gets announced when a fund company launches a new mutual fund.Every now and then the companies launch new NFO schemes to raise the capital for purchasing securities.In order to assure the performance of the NFOs, companies appoint fund manager or a team of fund managers, who devise plans and investment strategies for the scheme.</p>
                                                        <p className="product-para">An NFO is valid for limited days only, like 1 week or so as it is fixed by the fund company.During that validity time, one can apply for the scheme.One should always look at the pros and cons of that particular scheme before investing.</p>
                                                        <p className="product-para">As NFOs are newly launched funds so there are no past records to track the performance of the fund.Thus, the investors must closely analyse the past record and profile of the company that has launched the fund and also the profile of the fund manager/s involved.</p>
                                                        
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <div style={{paddingTop:"10px"}}>
                                                            <Image src="../../NFO.jpg" style={{ width: '100%', backgroundSize:"100% 100%"}} />
                                                        </div>
                                                    </Col>
                                                </Form>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24} className='Products-Footer'>
                                                    <Button type="link" block className='SalesPitch-ShowMore'>Show More</Button>
                                                    <Link to={{pathname: "/products",}}>
                                <div className='Product-showMoreContainer'>
                                                        <div style={{backgroundColor:'rgb(59, 55, 30)', textDecoration : 'none'}} className='Product-ShowMore'>
                                                            <img className='Product-ShowMorePng' src={'https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/White/Group_11252.png'}alt='png'/>
                                                            Show All Products
                                                        </div>
                                                    </div>
                                                    </Link>
                                                </Col>
                                            </Col>
                                            <Col className="success-story" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Title className="success-head">Fixed Deposite Scheme</Title>
                                                <hr style={{opacity:".3"}}/>
                                                <Form layout="horizontal" className="success-story-form">
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <h3 className="product-head3">Description</h3>
                                                        <p className="product-para">The deposits made by investors in companies that earn a fixed rate of return over a period of time are called Company Fixed Deposits.Along with manufacturing companies, financial institutions and Non-Banking Finance Companies (NBFCs) also accept these deposits.</p>
                                                        <p className="product-para">* Higher interest rate: The rate of interest is 2-4 percent high, as compared to the interest rate offered by banks on fixed deposits</p>
                                                        <p className="product-para">* Regular income: Depending on the scheme, investors have the option to receive interest at monthly/quarterly/half-yearly/yearly intervals</p>
                                                        <p className="product-para">* Lock-in period: The minimum lock-in period for most of the schemes is six months, i.e.investors can withdraw their money post six months, anytime</p>
                                                        <p className="product-para">* TDS: TDS is not applicable if interest earned is equals to or less than 5,000 for a year in a single company.</p>
                                                        
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <div style={{paddingTop:"10px"}}>
                                                            <Image src="../../fixed_deposit.jpg" style={{ width: '100%', backgroundSize:"100% 100%"}} />
                                                        </div>
                                                    </Col>
                                                </Form>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24} className='Products-Footer'>
                                                    <Button type="link" block className='SalesPitch-ShowMore'>Show More</Button>
                                                    <Link to={{pathname: "/products",}}> <div className='Product-showMoreContainer'>
                                                        <div style={{backgroundColor:'rgb(59, 55, 30)', textDecoration : 'none'}} className='Product-ShowMore'>
                                                            <img className='Product-ShowMorePng' src={'https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/White/Group_11252.png'}alt='png'/>
                                                            Show All Products
                                                        </div>
                                                    </div></Link>
                                                </Col>
                                            </Col>
                                            <Col className="success-story" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Title className="success-head">National Pension System</Title>
                                                <hr style={{opacity:".3"}} />
                                                <Form layout="horizontal" className="success-story-form">
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <h3 className="product-head3">Description</h3>
                                                        <p className="product-para">National Pension System (NPS), also referred to as National Pension Scheme, is an easily accessible, low cost, tax efficient, flexible and portable retirement savings account.NPS allows an employee/subscriber to contribute on fixed/irregular intervals and later, on retirement, receive the accumulated wealth depending on the contributions made and the income generated from them.</p>
                                                       
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <div style={{paddingTop:"10px"}}>
                                                            <Image src="../../National_Pension_System.jpg" style={{ width: '100%',backgroundSize:"100% 100%" }} />
                                                        </div>
                                                    </Col>
                                                </Form>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24} className='Products-Footer'>
                                                    <Button type="link" block className='SalesPitch-ShowMore'>Show More</Button>
                                                    <Link to={{pathname: "/products",}}><div className='Product-showMoreContainer'>
                                                        <div style={{backgroundColor:'rgb(59, 55, 30)', textDecoration : 'none'}} className='Product-ShowMore'>
                                                            <img className='Product-ShowMorePng' src={'https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/White/Group_11252.png'}alt='png'/>
                                                            Show All Products
                                                        </div>
                                                    </div></Link>
                                                </Col>
                                            </Col>
                                            <Col className="success-story" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Title className="success-head">BONDS</Title>
                                                <hr style={{opacity:".3"}}/>
                                                <Form layout="horizontal" className="success-story-form">
                                                    
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                            <h3 className="product-head3">Description</h3>
                                                            <p className="product-para">A bond is a debt security, in which the authorised issuer – company, financial institution, or Government, offers regular or fixed payment of interest in return for the money borrowed by the said issuer.It is for a certain period of time.</p>
                                                
                                                        </Col>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                            <div style={{paddingTop:"10px"}}>
                                                                <Image src="../../BOnds.jpg" style={{ width: '100%', backgroundSize:"100% 100%"}} />
                                                            </div>
                                                        </Col>
                                        
                                                </Form>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24} className='Products-Footer'>
                                                    <Button type="link" block className='SalesPitch-ShowMore'>Show More</Button>
                                                    <Link to={{pathname: "/products",}}><div className='Product-showMoreContainer'>
                                                        <div style={{backgroundColor:'rgb(59, 55, 30)', textDecoration : 'none'}} className='Product-ShowMore'>
                                                            <img className='Product-ShowMorePng' src={'https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/White/Group_11252.png'}alt='png'/>
                                                            Show All Products
                                                        </div>
                                                    </div></Link>
                                                </Col>
                                            </Col>
                                            <Col className="success-story" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Title className="success-head">Term Insurance Plans</Title>
                                                <hr style={{opacity:".3"}}/>
                                                <Form layout="horizontal" className="success-story-form">
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <h3 className="product-head3">Description</h3>
                                                        <p className="product-para">A Term Insurance Plan is the most comprehensive form of financial protection.It will help your family meet their financial needs from household expenses to rentals in your absence.When you consider buying a term plan, you have to make an educated choice about the life cover you select.There are some important things you need to keep in mind when deciding the term plan and life cover you opt for.The cover should help your family maintain their lifestyle, inflation should be kept in account and lastly, it should take care of your existing liabilities preventing the worries of EMI repayments.</p>
                                                        <p className="product-para">General Insurance comprises of insurance of property against fire, burglary etc, personal insurance such as Accident and Health Insurance.</p>
                                                        <p className="product-para">Life policies are legal contracts and the terms of the contract describe the limitations of the insured events.</p>
                                                        <p className="product-para">Policy covering fire and other perils can protect your business against a range of unforeseen events that may threaten your business.</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <div style={{paddingTop:"10px"}}>
                                                            <Image src="../../term-insurance-plans-mobile.jpg" style={{ width: '100%', backgroundSize:"100% 100%" }} />
                                                        </div>
                                                    </Col>
                                                </Form>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24} className='Products-Footer'>
                                                    <Button type="link" block className='SalesPitch-ShowMore'>Show More</Button>
                                                    <Link to={{pathname: "/products",}}><div className='Product-showMoreContainer'>
                                                        <div style={{backgroundColor:'rgb(59, 55, 30)', textDecoration : 'none'}} className='Product-ShowMore'>
                                                            <img className='Product-ShowMorePng' src={'https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/White/Group_11252.png'}alt='png'/>
                                                            Show All Products
                                                        </div>
                                                    </div></Link>
                                                </Col>
                                            </Col>
                                            <Col className="success-story" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Title className="success-head">Life Health Plans</Title>
                                                <hr style={{opacity:".3"}}/>
                                                <Form layout="horizontal" className="success-story-form">
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <h3 className="product-head3">Description</h3>
                                                        <p className="product-para">Leading a healthy lifestyle in the modern high-stress routines is challenging.Medical emergencies can arise without any intimation.At such times, treatment costs can put a huge financial burden on families.For example, cost of cancer treatment can cost around 20 lacs*.Such huge payments coupled with work-pay loss can cause imbalances in your family finances.ABC life Health Plans help you to be financially prepared for such situations by providing you coverage for your medical recovery.</p>
                                                        <p className="product-para">Health insurance plans are insurance products designed to cover your medical expenses in case of hospitalization or critical illness....A health insurance plan bought early on in life will provide sufficient financial coverage if such a situation arises.</p>
                                                        
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <div style={{paddingTop:"10px"}}>
                                                            <Image src="../../images.jpg" style={{ width: '100%', backgroundSize:"100% 100%" }} />
                                                        </div>
                                                    </Col>
                                                </Form>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24} className='Products-Footer'>
                                                    <Button type="link" block className='SalesPitch-ShowMore'>Show More</Button>
                                                    <Link to={{pathname: "/products",}}> <div className='Product-showMoreContainer'>
                                                        <div style={{backgroundColor:'rgb(59, 55, 30)', textDecoration : 'none'}} className='Product-ShowMore'>
                                                            <img className='Product-ShowMorePng' src={'https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/White/Group_11252.png'}alt='png'/>
                                                            Show All Products
                                                        </div>
                                                    </div></Link>
                                                </Col>
                                            </Col>
                                            <Col className="success-story" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Title className="success-head">Retirement Planning</Title>
                                                <hr style={{opacity:".3"}}/>
                                                <Form layout="horizontal" className="success-story-form">
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <h3 className="product-head3">Description</h3>
                                                        <p className="product-para">Retirement is like a long vacation.You get all the time in the world to travel, have long lunches and siestas and pursue your hobbies.As India does not offer one of the best environment for senior citizens* it is important to plan for your retirement in advance.India’s consistently high inflation is noted as one of the big concern.This is why, timely investment in retirement plans is very crucial.Retirement Planning can provide you a stable source of income even after you stop working.ABC life offers one of the best retirement plans in India that will help you meet your post-retirement financial needs.</p>
                                                        
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <div style={{paddingTop:"10px"}}>
                                                            <Image src="../../retirement-catpage-mob.jpg" style={{ width: '100%',backgroundSize:"100% 100%" }} />
                                                        </div>
                                                    </Col>
                                                </Form>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24} className='Products-Footer'>
                                                    <Button type="link" block className='SalesPitch-ShowMore'>Show More</Button>
                                                    <Link to={{pathname: "/products",}}> <div className='Product-showMoreContainer'>
                                                        <div style={{backgroundColor:'rgb(59, 55, 30)', textDecoration : 'none'}} className='Product-ShowMore'>
                                                            <img className='Product-ShowMorePng' src={'https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/White/Group_11252.png'}alt='png'/>
                                                            Show All Products
                                                        </div>
                                                    </div> </Link>
                                                </Col>
                                            </Col>
                                            <Col className="success-story" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Title className="success-head">Child's Education Planning</Title>
                                                <hr style={{opacity:".3"}}/>
                                                <Form layout="horizontal" className="success-story-form">
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <h3 className="product-head3">Description</h3>
                                                        <p className="product-para">As a parent, your kids are the most important part of your lives.Smallest of your happy moments depend on them.While trying to maintain a balance between emotions & practical life, managing spending and savings often becomes a tricky task.</p>
                                                        <p className="product-para">Child Plan is insurance cum investment plan that serves two purposes - Financially secure your child's future & finance the turning points in his/her life such as higher education and marriage. So, like a double-edged sword, the best child plan is designed to protect the future of your child in case of your unfortunate demise and at the same time, builds a corpus over a term to be utilized to finance prime moments in his/her life.</p>
                                                        
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <div style={{paddingTop:"10px"}}>
                                                            <Image src="../../Child_Plans_Mobile_Banner.jpg" style={{ width: '100%', backgroundSize:"100% 100%"}} />
                                                        </div>
                                                    </Col>
                                                </Form>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24} className='Products-Footer'>
                                                    <Button type="link" block className='SalesPitch-ShowMore'>Show More</Button>
                                                    <Link to={{pathname: "/products",}}> <div className='Product-showMoreContainer'>
                                                        <div style={{backgroundColor:'rgb(59, 55, 30)', textDecoration : 'none'}} className='Product-ShowMore'>
                                                            <img className='Product-ShowMorePng' src={'https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/White/Group_11252.png'}alt='png'/>
                                                            Show All Products
                                                        </div>
                                                    </div> </Link>
                                                </Col>
                                            </Col>
                                            <Col className="success-story" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Title className="success-head">Savings & Income Plans</Title>
                                                <hr style={{opacity:".3"}}/>
                                                <Form layout="horizontal" className="success-story-form">
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <h3 className="product-head3">Description</h3>
                                                        <p className="product-para">Our earliest memories of savings go back to collecting coins in the piggy bank.Even while growing up, we were always taught by our parents to save money for the rainy days.A constant theme that emerged was the importance of disciplined savings.Although we all know it, yet a lot of us fail to do that.ABC Life Savings & Income Plans can help you build a corpus, get a stable income, and secure the future of your loved ones, even in your absence.</p>
                                                        <p className="product-para">These plans can also be used by banks or financial institutions to deliver certain benefits to their members.Choose from the various ABC life Group Plans designed for employers/banks/financial institutions helping their members to get cost-effective policies and secure their future.</p>
                                                        
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                                        <div style={{paddingTop:"10px"}}>
                                                            <Image src="../../group-plans-mob-new.jpg" style={{ width: '100%', backgroundSize:"100% 100%" }} />
                                                        </div>
                                                    </Col>
                                                </Form>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24} className='Products-Footer'>
                                                    <Button type="link" block className='SalesPitch-ShowMore'>Show More</Button>
                                                    <Link to={{pathname: "/products",}}> <div className='Product-showMoreContainer'>
                                                        <div style={{backgroundColor:'rgb(59, 55, 30)', textDecoration : 'none'}} className='Product-ShowMore'>
                                                            <img className='Product-ShowMorePng' src={'https://sdrestdemo.iorta.in/assets/SalesDriveIcon/Tab_Icon/White/Group_11252.png'}alt='png'/>
                                                            Show All Products
                                                        </div>
                                                    </div> </Link>
                                                </Col>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>




                            <Row gutter={[40, 24]} justify="start" >
                            <Col className="product-main" xs={{ order: 1 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                <Row gutter={['', 24]}>
                                    <Col xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <h1 className="product-head">Mutual Fund</h1><Divider />
                                        <h3 className="product-head3">Description</h3>
                                        <p className="product-para">Mutual Funds are among the hottest favourites with all types of investors.Investing in mutual funds ranks among one of the preferred ways of creating wealth over the long term.In fact, mutual funds represent the hands-off approach to entering the equity market.There are a wide variety of mutual funds that are viable investment avenues to meet a wide variety of financial goals.This section explains the various aspects of Mutual Funds.</p>
                                        <Button type="link" block>
                                            Show More
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="product-main" xs={{ order: 2 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>

                                <Row gutter={['', 24]}>
                                    <Col className="testimonial1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <div>
                                            <Image src="MUTUAL_FUND.jpg" />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row gutter={[40, 24]} justify="start">
                            <Col className="product-main" xs={{ order: 1 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                <Row gutter={['', 24]}>
                                    <Col xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <h1 className="product-head">Mutual Funds India - NFO Latest</h1><Divider />
                                        <h3 className="product-head3">Description</h3>
                                        <p className="product-para">New Fund Offer (NFO) gets announced when a fund company launches a new mutual fund.Every now and then the companies launch new NFO schemes to raise the capital for purchasing securities.In order to assure the performance of the NFOs, companies appoint fund manager or a team of fund managers, who devise plans and investment strategies for the scheme.</p>
                                        <p className="product-para">An NFO is valid for limited days only, like 1 week or so as it is fixed by the fund company.During that validity time, one can apply for the scheme.One should always look at the pros and cons of that particular scheme before investing.</p>
                                        <p className="product-para">As NFOs are newly launched funds so there are no past records to track the performance of the fund.Thus, the investors must closely analyse the past record and profile of the company that has launched the fund and also the profile of the fund manager/s involved.</p>
                                        <Button type="link" block>
                                            Show More
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="product-main" xs={{ order: 2 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>

                                <Row gutter={['', 24]}>
                                    <Col className="testimonial1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <div>
                                            <Image src="NFO.jpg" />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row gutter={[40, 24]} justify="start">
                            <Col className="product-main" xs={{ order: 1 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                <Row gutter={['', 24]}>
                                    <Col xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <h1 className="product-head">Fixed Deposite Scheme</h1><Divider />
                                        <h3 className="product-head3">Description</h3>
                                        <p className="product-para">The deposits made by investors in companies that earn a fixed rate of return over a period of time are called Company Fixed Deposits.Along with manufacturing companies, financial institutions and Non-Banking Finance Companies (NBFCs) also accept these deposits.</p>
                                        <p className="product-para">* Higher interest rate: The rate of interest is 2-4 percent high, as compared to the interest rate offered by banks on fixed deposits</p>
                                        <p className="product-para">* Regular income: Depending on the scheme, investors have the option to receive interest at monthly/quarterly/half-yearly/yearly intervals</p>
                                        <p className="product-para">* Lock-in period: The minimum lock-in period for most of the schemes is six months, i.e.investors can withdraw their money post six months, anytime</p>
                                        <p className="product-para">* TDS: TDS is not applicable if interest earned is equals to or less than 5,000 for a year in a single company.</p>
                                        <Button className="Buttonn" type="link" block>
                                            Show More
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="product-main" xs={{ order: 2 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>

                                <Row gutter={['', 24]}>
                                    <Col className="testimonial1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <div>
                                            <Image src="fixed_deposit.jpg" />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row gutter={[40, 24]} justify="start">
                            <Col className="product-main" xs={{ order: 1 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                <Row gutter={['', 24]}>
                                    <Col xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <h1 className="product-head">National Pension System</h1><Divider />
                                        <h3 className="product-head3">Description</h3>
                                        <p className="product-para">National Pension System (NPS), also referred to as National Pension Scheme, is an easily accessible, low cost, tax efficient, flexible and portable retirement savings account.NPS allows an employee/subscriber to contribute on fixed/irregular intervals and later, on retirement, receive the accumulated wealth depending on the contributions made and the income generated from them.</p>
                                        <Button className="Buttonn" type="link" block>
                                            Show More
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="product-main" xs={{ order: 2 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>

                                <Row gutter={['', 24]}>
                                    <Col className="testimonial1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <div>
                                            <Image src="National_Pension_System.jpg" />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row gutter={[40, 24]} justify="start">
                            <Col className="product-main" xs={{ order: 1 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                <Row gutter={['', 24]}>
                                    <Col xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <h1 className="product-head">BONDS</h1><Divider />
                                        <h3 className="product-head3">Description</h3>
                                        <p className="product-para">A bond is a debt security, in which the authorised issuer – company, financial institution, or Government, offers regular or fixed payment of interest in return for the money borrowed by the said issuer.It is for a certain period of time.</p>
                                        <Button className="Buttonn" type="link" block>
                                            Show More
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="product-main" xs={{ order: 2 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>

                                <Row gutter={['', 24]}>
                                    <Col className="testimonial1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <div>
                                            <Image src="BOnds.jpg" />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row gutter={[40, 24]} justify="start">
                            <Col className="product-main" xs={{ order: 1 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                <Row gutter={['', 24]}>
                                    <Col xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <h1 className="product-head">Term Insurance Plans</h1><Divider />
                                        <h3 className="product-head3">Description</h3>
                                        <p className="product-para">A Term Insurance Plan is the most comprehensive form of financial protection.It will help your family meet their financial needs from household expenses to rentals in your absence.When you consider buying a term plan, you have to make an educated choice about the life cover you select.There are some important things you need to keep in mind when deciding the term plan and life cover you opt for.The cover should help your family maintain their lifestyle, inflation should be kept in account and lastly, it should take care of your existing liabilities preventing the worries of EMI repayments.</p>
                                        <p className="product-para">General Insurance comprises of insurance of property against fire, burglary etc, personal insurance such as Accident and Health Insurance.</p>
                                        <p className="product-para">Life policies are legal contracts and the terms of the contract describe the limitations of the insured events.</p>
                                        <p className="product-para">Policy covering fire and other perils can protect your business against a range of unforeseen events that may tDividereaten your business.</p>
                                        <Button className="Buttonn" type="link" block>
                                            Show More
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="product-main" xs={{ order: 2 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>

                                <Row gutter={['', 24]}>
                                    <Col className="testimonial1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <div>
                                            <Image src="term-insurance-plans-mobile.jpg" />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row gutter={[40, 24]} justify="start">
                            <Col className="product-main" xs={{ order: 1 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                <Row gutter={['', 24]}>
                                    <Col xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <h1 className="product-head">Life Health Plans</h1><Divider />
                                        <h3 className="product-head3">Description</h3>
                                        <p className="product-para">Leading a healthy lifestyle in the modern high-stress routines is challenging.Medical emergencies can arise without any intimation.At such times, treatment costs can put a huge financial burden on families.For example, cost of cancer treatment can cost around 20 lacs*.Such huge payments coupled with work-pay loss can cause imbalances in your family finances.ABC life Health Plans help you to be financially prepared for such situations by providing you coverage for your medical recovery.</p>
                                        <p className="product-para">Health insurance plans are insurance products designed to cover your medical expenses in case of hospitalization or critical illness....A health insurance plan bought early on in life will provide sufficient financial coverage if such a situation arises.</p>
                                        <Button className="Buttonn" type="link" block>
                                            Show More
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="product-main" xs={{ order: 2 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>

                                <Row gutter={['', 24]}>
                                    <Col className="testimonial1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <div>
                                            <Image src="images.jpg" />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row gutter={[40, 24]} justify="start">
                            <Col className="product-main" xs={{ order: 1 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                <Row gutter={['', 24]}>
                                    <Col xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <h1 className="product-head">Retirement Planning</h1><Divider />
                                        <h3 className="product-head3">Description</h3>
                                        <p className="product-para">Retirement is like a long vacation.You get all the time in the world to travel, have long lunches and siestas and pursue your hobbies.As India does not offer one of the best environment for senior citizens* it is important to plan for your retirement in advance.India’s consistently high inflation is noted as one of the big concern.This is why, timely investment in retirement plans is very crucial.Retirement Planning can provide you a stable source of income even after you stop working.ABC life offers one of the best retirement plans in India that will help you meet your post-retirement financial needs.</p>
                                        <Button className="Buttonn" type="link" block>
                                            Show More
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="product-main" xs={{ order: 2 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>

                                <Row gutter={['', 24]}>
                                    <Col className="testimonial1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <div>
                                            <Image src="retirement-catpage-mob.jpg" />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row gutter={[40, 24]} justify="start">
                            <Col className="product-main" xs={{ order: 1 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                <Row gutter={['', 24]}>
                                    <Col xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <h1 className="product-head">Child's Education Planning</h1><Divider />
                                        <h3 className="product-head3">Description</h3>
                                        <p className="product-para">As a parent, your kids are the most important part of your lives.Smallest of your happy moments depend on them.While trying to maintain a balance between emotions & practical life, managing spending and savings often becomes a tricky task.</p>
                                        <p className="product-para">Child Plan is insurance cum investment plan that serves two purposes - Financially secure your child's future & finance the turning points in his/her life such as higher education and marriage. So, like a double-edged sword, the best child plan is designed to protect the future of your child in case of your unfortunate demise and at the same time, builds a corpus over a term to be utilized to finance prime moments in his/her life.</p>
                                        <Button className="Buttonn" type="link" block>
                                            Show More
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="product-main" xs={{ order: 2 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>

                                <Row gutter={['', 24]}>
                                    <Col className="testimonial1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <div>
                                            <Image src="Child_Plans_Mobile_Banner.jpg" />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row gutter={[40, 24]} justify="start">
                            <Col className="product-main" xs={{ order: 1 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                <Row gutter={['', 24]}>
                                    <Col xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <h1 className="product-head">Savings & Income Plans</h1><Divider />
                                        <h3 className="product-head3">Description</h3>
                                        <p className="product-para">Our earliest memories of savings go back to collecting coins in the piggy bank.Even while growing up, we were always taught by our parents to save money for the rainy days.A constant theme that emerged was the importance of disciplined savings.Although we all know it, yet a lot of us fail to do that.ABC Life Savings & Income Plans can help you build a corpus, get a stable income, and secure the future of your loved ones, even in your absence.</p>
                                        <p className="product-para">These plans can also be used by banks or financial institutions to deliver certain benefits to their members.Choose from the various ABC life Group Plans designed for employers/banks/financial institutions helping their members to get cost-effective policies and secure their future.</p>
                                        <Button className="Buttonn" type="link" block>
                                            Show More
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="product-main" xs={{ order: 2 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>

                                <Row gutter={['', 24]}>
                                    <Col className="testimonial1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                        <div>
                                            <Image src="group-plans-mob-new.jpg" />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        </TabPane>
                        <TabPane tab="Calculator" key="4">
                            <Row gutter={[16, 16]} className='Calculator-Container' justify='center'>
                                <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24} className='Calculator-CardContainer-First' >
                                    <div className='calculator-main'>
                                        <Card >
                                            <img className='Calculator-HumanLifeImg' src={'https://sdrestdemo.iorta.in/assets/humanlife.png'} alt='png'/>
                                            <div className='Calculator-Body'>
                                                <div>
                                                <h1 className="Heading">Human Life Value</h1>
                                                <h1 className="Calculator-Heading">Calculator</h1>
                                                <p className="paragraph11">The Human Life Value (HLV) Calculator <br />helps you identify you life insurance <br />needs on basis of income, expenses...</p>
                                                </div>
                                                <Button className="btnn">Calculate</Button>
                                            </div>
                                        </Card>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24} className='Calculator-CardContainer-First'>
                                    <div className='calculator-main'>
                                        <Card >
                                        <img className='Calculator-HumanLifeImg' src={'https://sdrestdemo.iorta.in/assets/retirement.png'} alt='png'/>
                                            <div className='Calculator-Body'>
                                                <div>
                                                <h1 className="Heading">Retirement</h1>
                                                <h1 className="Calculator-Heading">Calculator</h1>
                                                <p className="paragraph11">The retirement calculator helps you to create a secure retirement plan.View retirement savings balance...</p>
                                                </div>
                                                <Button className="btnn">Calculate</Button>
                                            </div>
                                        </Card>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24} className='Calculator-CardContainer-First'>
                                    <div className='calculator-main'>
                                        <Card >
                                        <img className='Calculator-HumanLifeImg' src={'https://sdrestdemo.iorta.in/assets/childeducation.jpg'} alt='png'/>
                                            <div className='Calculator-Body'>
                                                <div>
                                                <h1 className="Heading">Human Life Value</h1>
                                                <h1 className="Calculator-Heading">Calculator</h1>
                                                <p className="paragraph11">The Human Life Value (HLV) Calculator helps you identify you life insurance needs on basis of income, expenses...</p>
                                                </div>
                                                <Button className="btnn">Calculate</Button>
                                            </div>
                                        </Card>
                                    </div>
                                </Col>
                            </Row>

                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
export default SalesPitch;