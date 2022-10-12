import { Tabs, Col, Form, Row, Carousel, Image, Typography, Divider, Descriptions } from 'antd';
import React, { useDebugValue, useState } from 'react';
import { Card, Select } from 'antd';
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
import actionNoData from '../../assets/Actionnodata.png'
import axiosRequest from '../../axios-request/request.methods'
import { useSelector } from 'react-redux';
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
    let _store = useSelector((state) => state.login.user);
    console.log("_store",_store.channelCode.channelCode)
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
    const [type, setType] = useState("ALL")
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

    const All = async () => {
        setType('ALL')
        try {
            let res = await axiosRequest.get(
                `admin/fetch_resource_category?filter=1&userId=${_store.id}&channel_code=${_store.channelCode.channelCode}&role_code=${_store.roleCode}`,
                { secure: true }
            );
            console.log("abc", res)
        } catch (error) {
            console.log(error);
        }
    };

    const Video = async () => {
        setType('VIDEO')
        try {
            let res = await axiosRequest.get(
                'admin/fetch_resources?channel_code=CH1&role_code=ZSM03&filter=1&filter_by=5d8f12d819a6cb5e86c6f994&filterByMediaCategory=video&skip=0',
                { secure: true }
            );

        } catch (error) {
            console.log(error);
        }
    }

    const Pdf = async () => {
        setType('PDF')
        try {
            let res = await axiosRequest.get(
                'admin/fetch_resources?channel_code=CH1&role_code=ZSM03&filter=1&filter_by=5d8f12d819a6cb5e86c6f994&filterByMediaCategory=pdf&skip=0',

                { secure: true }
            );
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }

    const Articles = async () => {
        setType('ARTICLE')
        try {
            let res = await axiosRequest.get(
                'admin/fetch_resources?channel_code=CH1&role_code=ZSM03&filter=1&filter_by=5d8f12d819a6cb5e86c6f994&filterByMediaCategory=articles&skip=0',
                { secure: true }
            );
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }

    const Infographic = async () => {
        setType('INFOGRAPHIC')
        try {
            let res = await axiosRequest.get(
                'admin/fetch_resources?channel_code=CH1&role_code=ZSM03&filter=1&filter_by=5d8f12d819a6cb5e86c6f994&filterByMediaCategory=infographic&skip=0',
                { secure: true }
            );
            console.log(res)
        } catch (error) {
            console.log(error);
        }

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
                                        onClick={(e) => {
                                            console.log("All Clicked!");
                                            All();
                                        }}
                                    >
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
                                <Select defaultValue="ALL" onChange={(e) => {
                                    console.log("Change event called!", e)
                                    setType(e)
                                }} style={{ width: '100% ' }} >
                                    <Option value="ALL">All</Option>
                                    <Option value="VIDEO" >Videos</Option>
                                    <Option value="PDF" >PDF</Option>
                                    <Option value="ARTICLE" >Articles</Option>
                                    <Option value="INFOGRAPHIC" >Infographic</Option>

                                </Select>
                            </div>
                        </Card>
                    </Col>
                    <Col lg={17} md={24} sm={24} xs={24}>
                        <Card style={{ margin: 10, boxShadow: '2px 3px 6px rgb(0 0 0 / 9%)', border: '0.5px solid #e7edf5' }} className="contentMain">
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
                                {["ALL", "INFOGRAPHIC"].includes(type) ?
                                    <Col lg={8} md={24} sm={24} xs={24} className="maincard">
                                        <Card className="card">
                                            <div style={{ height: '170px', width: '300px' }}>
                                                <div style={{
                                                    backgroundImage: `url(${mainimg})`, backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', height: 170, margin: 'auto'
                                                }}>

                                                    <img src={viewicon} style={{ height: 65, width: 65, marginTop: '20%', marginLeft: '35%' }} />

                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                    :
                                    <Card className="card" style={{ width: '100%' }}>
                                        <div style={{
                                            display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"
                                        }}>
                                            <img src={actionNoData} />
                                            <p style={{
                                                fontFamily: "roboto",
                                                fontWeight: 600,
                                                color: "#01b4bb",
                                                fontSize: "22px",
                                            }}>No Records Found!</p>
                                        </div>
                                    </Card>}
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
export default ResourceCenter;