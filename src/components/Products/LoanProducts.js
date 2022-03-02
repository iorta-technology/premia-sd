import React, { useState, useEffect } from 'react'
import './LoanProducts.css'
import { Row, Col, Button, Card, Carousel, Modal, Form, Input } from 'antd'
import { ShareAltOutlined, DownloadOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import axios from '../../axios-common';
import { map } from 'lodash';
import moment from 'moment';
import Brocher from '../../images/brochrewhite.png'
import {
    BrowserRouter as Router,
    Link, useLocation, useHistory
} from "react-router-dom";
const LoanProducts = () => {
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        // background:'#fff',
        // color:'black'
    }
    const [productData, SetProductData] = useState();
    const [productTabs, SetProductTabs] = useState([]);
    const [activeId, SetActiveId] = useState(null);



    useEffect(() => {
        axios.get(`admin/getprodCategory?filter=23&channel=5dbfdfa8e51cd5522249ba70`).then(resp => {
            const productData = resp?.data?.errMsg;
            SetProductData(productData)
            topBtnClickHandler(productData[0])
            SetActiveId(productData[0]?._id)
            console.log("response", resp)
        }, []).catch(error => {
            console.log(error)
        })
        axios.get("https://sdrestnode.iorta.in/secure/sd/user/getLead/5df77d17009e273b39cae811?leadfilter=all")
            .then((res) => {
                console.log(res.data.errMsg)
                setBenefitIllustratorArr(
                    res.data.errMsg
                );
            });



    }, [])
    const { TabPane } = Tabs;
    const [isModalVisible, setIsModalVisible] = useState(false);

    // const showModal = () => {
    //     setIsModalVisible(true);
    // };

    // const handleOk = () => {
    //     setIsModalVisible(false);
    // };

    // const handleCancel = () => {
    //     setIsModalVisible(false);
    // };
    const [benefitIllustratorArr, setBenefitIllustratorArr] = useState([]);
    const topBtnClickHandler = (item) => {
        console.log(item)
        SetActiveId(item._id)
        axios.get(`user/getproduct/?productType=${item._id}&roleCode=SM1`).then(resp => {
            const productTabs = resp?.data?.errMsg;
            SetProductTabs(productTabs)
        }, []).catch(error => {
            console.log(error)
        })
    }
    const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);
    const [isDisplayVisible, setIsDisplayModalVisible] = useState(false);
    const [isPassingData, setIsPassingData] = useState();
    const [benefitillArr, setBIArr] = useState();
    const [buttonValue, setButtonValue] = useState();

    const showModal = () => {
        setIsJoinModalVisible(true);
    };
    const SelectedButtonFunc = (value) => {
        setBIArr(value)
        console.log(value)
    }
    const handleOk = () => {
        setIsJoinModalVisible(false);
    };
    const handleCancel = () => {
        setIsJoinModalVisible(false);
    };
    let { innerWidth: width, innerHeight: height } = window;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");
    return (
        <>
            {/* <div className='product-content'> */}
            <div className="header">
                <Row >
                    <Col><h1 className="product-title">Products</h1></Col>
                </Row>
                <div>
                    <Row className="tabs" gutter={[16, 24]}>
                        {productData?.map(item =>
                            <Col span={6}><Button className={`primaryBtn ${item._id === activeId && 'top-tab-header-active'}`}

                                onClick={topBtnClickHandler.bind(this, item)}>{item.productCategoryName}</Button></Col>
                        )}

                    </Row>
                </div>
            </div>
            {/* <div className='product-content'> */}
                <div className="loan-product-tabs">
                    <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 24 }}>
                        <Tabs tabPosition={tabPosition}>
                            {productTabs.map((item) => {
                                return <TabPane tab={item.productName} key={item._id} className="MainContent">
                                    <Col className="gutter-row first-card" xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <div>
                                            <div className="main-card2" bordered={false} >
                                                <div className="benefit-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
                                                    <h1 style={{ color: '#5EA5C0' }} className="benefit-head">{item.productName}</h1>
                                                    <Button className="benefit-btn" style={{ backgroundColor: 'transparent', border: '1px solid #5EA5C0', borderRadius: '10px' }} onClick={showModal}>Benefit Illustration</Button>
                                                    <Modal
                                                        className="Clubsmaster-modal-style"
                                                        title="Select the proposer" visible={isJoinModalVisible} onOk={handleOk}

                                                        footer={[
                                                            <Button type="primary" className="bi-cancelbtn" onClick={handleCancel}>Cancel</Button>,
                                                            <Link to={{
                                                                pathname: "/master/benefitillustrator",
                                                                state: { recorddata: benefitIllustratorArr },


                                                            }} className="link-btn">Proceed</Link>
                                                        ]}
                                                        width="50%"
                                                        bodyStyle={{
                                                            height: "auto",
                                                        }}
                                                    >
                                                        <Form.Item
                                                            name="username"
                                                            rules={[{ required: false, message: 'Please input your username!' }]}
                                                        >
                                                            <Input type="text" placeholder="Search Here" />
                                                        </Form.Item>

                                                        <table >
                                                            <tr>
                                                                <th className='table-heading1'>Action</th>
                                                                <th className='table-heading2'>Lead ID</th>
                                                                <th className='table-heading2'>Name</th>
                                                                <th className='table-heading2'>Mobile</th>
                                                                <th className='table-heading2'>Created Date</th>
                                                            </tr>
                                                            {benefitIllustratorArr.map((item) => {
                                                                return (
                                                                    <tr>
                                                                        <td><Button className='select-btn' onClick={() => SelectedButtonFunc(item)}>Select</Button></td>
                                                                        <td className='table-subdata'>{item.lead_Id}</td>
                                                                        <td className='table-subdata'>{item.firstName + " " + item.lastName}</td>
                                                                        <td className='table-subdata'>{item.primaryMobile}</td>
                                                                        <td className='table-subdata'>{moment(item.created_date).format("DD-MM-YYYY")}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </table>
                                                        {/* </div> */}
                                                        {/* <Table
                        columns={columns}
                        dataSource={benefitIllustratorArr}
                        pagination={{ pageSize: 50 }}
                        scroll={{ x: '150vw' }}
                    /> */}

                                                    </Modal>
                                                </div>
                                                <p className="product-para">{item.productDescription}</p>
                                                <h1 style={{ color: '#5EA5C0' }} className="product_heading">5 Reasons to buy:</h1>
                                                <p><span className="slNo circle-point">1</span>
                                                    <span className="bullet-points">
                                                        {item.productReasons.reason1}
                                                    </span>
                                                </p>
                                                <p><span className="slNo circle-point">2</span>
                                                    <span className="bullet-points">
                                                        {item.productReasons.reason2}
                                                    </span>
                                                </p>
                                                <p><span className="slNo circle-point">3</span>
                                                    <span className="bullet-points">
                                                        {item.productReasons.reason3}
                                                    </span>
                                                </p>
                                                <p><span className="slNo circle-point">4</span>
                                                    <span className="bullet-points">
                                                        {item.productReasons.reason4}
                                                    </span>
                                                </p>
                                                <p><span className="slNo circle-point">5</span>
                                                    <span className="bullet-points">
                                                        {item.productReasons.reason5}
                                                    </span>
                                                </p>
                                            </div>

                                        </div>
                                    </Col>
                                    <Col className="gutter-row  first-card" xs={12} sm={12} md={12} lg={12} xl={12}>

                                        <div className="main-card3" bordered={false} >
                                            <h4 style={{ textAlign: 'center' }}>{item.imageTitle}</h4>
                                            {/* <span onClick={showModal} style={{ margin: '150px 150px 0px 0px', borderRadius: '50px', padding: '8px', color: '#00ACC1', cursor: 'pointer' }}><ShareAltOutlined /></span> */}
                                            <Carousel autoplay={true}>

                                                {item.productImages.map(item => {
                                                    return (
                                                        <div style={contentStyle}>
                                                            <img src={item.location}
                                                                style={{ margin: 'auto' }}
                                                                height="190px" width="145px" />
                                                        </div>

                                                    )
                                                })}
                                            </Carousel>
                                            <div className="product-brochure">
                                                {item.productBrochure.map(item => {
                                                    return (
                                                        <div>
                                                            <h4>{item.fileCategory}</h4>
                                                            <img src={Brocher} height="100px" width="90px"></img>
                                                            <Button size="small" style={{ backgroundColor: '#5EA5C0', color: '#fff', border: '1px solid #5EA5C0', borderRadius: '10px' }}>
                                                                <a href={item.location} download><DownloadOutlined />
                                                                    English</a>
                                                            </Button>

                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                    </Col>
                                </TabPane>
                            })}
                        </Tabs>
                    </Row>


                </div>
                <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>Do you wish to send payment link to the customer?</p>
                </Modal>
                {/* </div> */}
            </>
            )

}

            export default LoanProducts