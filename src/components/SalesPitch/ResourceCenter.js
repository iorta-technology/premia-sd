import { Tabs, Col, Form, Row, Carousel, Image, Typography, Divider, Descriptions } from 'antd';
import React, { useDebugValue, useState } from 'react';
import { Card,Select } from 'antd';
import { Button } from 'antd';
import './ResourceCenter.css'
// import './SalesPitch.css';
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { Alert } from 'antd';
import video from './video.mp4';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import VideoPlayer from 'react-video-js-player';
import MainTabs from '../../components/MainTabs/MainTabs'
import MTabs from '../../components/Tab/Tab'
import menu from '../../assets/menu-resource.png'
import resourcereset from '../../assets/resourcereset.png';
import content from '../../assets/contentback.png'
import mainimg from '../../assets/1a7da86d83ebe30862d8ea221384817848118054.jpg'
import rightarw from '../../assets/rightarrow.png'
import shareit from '../../assets/shareit.png'
import viewicon from '../../assets/viewicon.png'

const tabMenu = [
    {
        id: 'marketing',
        value: "Marketing",
    },
    {
        id: 'insurance',
        value: "Insurance",
    },
]
const { Option } = Select;
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
const ResourceCenter = () => {

    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");
    const [showmore, setShowMore] = useState(false)
    const [tabswitch, setTabSwitch] = useState(false)
    const [marketing, setMarketing] = useState(false)
    const [insurance, setInsurance] = useState(false)
    const [all, setAll] = useState(false)
    const [video, setVideo] = useState(false)
    const [pdf, setPdf] = useState(false)
    const [articles, setArticles] = useState(false)
    const [infographic, setInfographic] = useState(false)
    const [showmore8, setShowMore8] = useState(false)
    const [showmore9, setShowMore9] = useState(false)
    const [showmore10, setShowMore10] = useState(false)
    const changeTabPosition = e => {
        setTabPosition(e.target.value);
    };
    const videoSrc = video;
    const poster = "video.mp4";

    const marketingTab = () => {
        setMarketing(true)
        setInsurance(false)
    }

    const insuranceTab = () => {
        setInsurance(true)
        setMarketing(false)
    }

    const All = () => {
        setAll(true)
        setVideo(false)
        setPdf(false)
        setArticles(false)
        setInfographic(false)
    }

    const Video = () => {
        setAll(false)
        setVideo(true)
        setPdf(false)
        setArticles(false)
        setInfographic(false)
    }

    const Pdf = () => {
        setAll(false)
        setVideo(false)
        setPdf(true)
        setArticles(false)
        setInfographic(false)
    }

    const Articles = () => {
        setAll(false)
        setVideo(false)
        setPdf(false)
        setArticles(true)
        setInfographic(false)
    }

    const Infographic = () => {
        setAll(false)
        setVideo(false)
        setPdf(false)
        setArticles(false)
        setInfographic(true)
    }


    return (
        <div>

            {width <= "375" ?
                <MTabs
                    tabMenu={tabMenu}
                    activeKey="customerpitch"
                    header="Resource Center"
                /> :
                <div>
                    <MTabs
                        tabMenu={tabMenu}
                        activeKey="customerpitch"
                        header="Resource Center"
                    />
                </div>
            }
            <div>
                <Row>
                    <Col lg={7} md={24} sm={24} xs={24} style={{ backgroundColor: 'fff' }}>
                        <Card style={{ padding: 15, margin: 10, boxShadow: '2px 3px 6px rgb(0 0 0 / 9%)', border: '0.5px solid #e7edf5' }} className="sideBar">
                            <Row>
                                <Col span={22}>
                                    <p style={{ color: 'rgb(0, 172, 193)', fontSize: 12, fontWeight: 'bold', marginTop: 5 }}>#Tags</p>
                                </Col>
                                <Col span={2}>
                                    <img src={resourcereset} style={{ height: 25, width: 25 }} />
                                </Col>
                            </Row>
                            <hr style={{ marginTop: 5 }} />
                            <Row>
                                <div  >
                                    <button style={{ borderColor: '#C1C8CC', borderStyle: 'solid', borderWidth: 1, borderRadius: 5, padding: 3, }}
                                        className={marketing == true ? 'active' : 'inactive'}
                                        onClick={marketingTab}>
                                        Marketing</button>
                                </div>
                                <div  >
                                    <button style={{ borderColor: '#C1C8CC', borderStyle: 'solid', borderWidth: 1, borderRadius: 5, padding: 3, marginLeft: 10, }}
                                        className={insurance == true ? 'active' : 'inactive'}
                                        onClick={insuranceTab} >
                                        Insurance
                                    </button>
                                </div>
                            </Row>
                            <div style={{ marginTop: 30, marginBottom: 10, color: 'black' }}>
                                <p style={{ fontSize: 14, fontWeight: 'bold' }}>Content Type</p >
                            </div>

                            <div className='options'>
                                <Row>
                                    <button style={{ borderColor: 'black', borderStyle: 'solid', borderWidth: 0, borderRadius: 0, padding: 5, width: '100%', marginTop: 5, textAlign: 'left', paddingLeft: 10 }}
                                        className={all == true ? 'dropactive' : 'dropinactive'}
                                        onClick={All} >
                                        All
                                    </button>
                                </Row>
                                <Row>
                                    <button style={{ borderColor: 'black', borderStyle: 'solid', borderWidth: 0, borderRadius: 0, padding: 5, width: '100%', marginTop: 5, textAlign: 'left', paddingLeft: 10 }}
                                        className={video == true ? 'dropactive' : 'dropinactive'}
                                        onClick={Video} >
                                        Videos
                                    </button>
                                </Row>
                                <Row>
                                    <button style={{ borderColor: 'black', borderStyle: 'solid', borderWidth: 0, borderRadius: 0, padding: 5, width: '100%', marginTop: 5, textAlign: 'left', paddingLeft: 10 }}
                                        className={pdf == true ? 'dropactive' : 'dropinactive'}
                                        onClick={Pdf} >
                                        PDF
                                    </button>
                                </Row>
                                <Row>
                                    <button style={{ borderColor: 'black', borderStyle: 'solid', borderWidth: 0, borderRadius: 0, padding: 5, width: '100%', marginTop: 5, textAlign: 'left', paddingLeft: 10 }}
                                        className={articles == true ? 'dropactive' : 'dropinactive'}
                                        onClick={Articles} >
                                        Articles
                                    </button>
                                </Row>
                                <Row>
                                    <button style={{ borderColor: 'black', borderStyle: 'solid', borderWidth: 0, borderRadius: 0, padding: 5, width: '100%', marginTop: 5, textAlign: 'left', paddingLeft: 10 }}
                                        className={infographic == true ? 'dropactive' : 'dropinactive'}
                                        onClick={Infographic} >
                                        Infographic
                                    </button>
                                </Row>
                            </div>
                            <div className='dropdown'>
                                <Select defaultValue="all" style={{ width: '100% '}} >
                                    <Option value="all">All</Option>
                                    <Option value="videos">Videos</Option>
                                    <Option value="pdf">PDF</Option>
                                    <Option value="articles">Articles</Option>
                                    <Option value="infographic">Infographic</Option>

                                </Select>
                            </div>
                        </Card>
                    </Col>
                    <Col lg={17} md={24} sm={24} xs={24}>
                        <Card style={{ padding: 15, margin: 10, boxShadow: '2px 3px 6px rgb(0 0 0 / 9%)', border: '0.5px solid #e7edf5' }} className="contentMain">
                            <Row style={{
                                marginTop: 20, backgroundImage: `url(${content})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}>
                                <Col span={22}>
                                    <p style={{ color: 'rgb(0, 172, 193)', fontSize: 20, fontWeight: 'bold' }}>Marketing</p>
                                </Col>
                                <Col span={2}>
                                    <Row style={{ padding: 5, }}>
                                        <p style={{ fontSize: 14, fontWeight: 'bold' }}>All</p>
                                        <img src={menu} style={{ height: 15, width: 15, marginLeft: 5, marginTop: 5 }} />
                                    </Row>
                                </Col>
                            </Row>
                            <hr style={{ marginTop: -5, marginLeft: -25, marginRight: -25 }} />
                            <Row>
                                <Col lg={8} md={24} sm={24} xs={24} className="maincard">
                                    <Card className="card">
                                        <div style={{    height: '160px',width: '250px'}}>
                                        <div style={{
                                            backgroundImage: `url(${mainimg})`, backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', height: 160, margin: 'auto'
                                        }}>

                                            <img src={viewicon} style={{ height: 65, width: 65, marginTop: '20%', marginLeft: '35%' }} />

                                        </div>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
export default ResourceCenter;