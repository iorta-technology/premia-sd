import React, { useState } from 'react';
import './ForSelf.css';
import { Layout } from 'antd';
import { Card, Col, Row } from 'antd';
import { Button, Modal } from 'antd';
import { Divider } from 'antd';
import { Input } from 'antd';
const { Header, Footer, Content } = Layout;
const { Meta } = Card;
const contentStyle = {
    height: '310px',
    color: '#fff',
    lineHeight: '180px',
    textAlign: 'center',
    background: '#364d79',
};
const style = { background: '#fff', padding: '8px 0' };
const ForSelf = () => {
    const [testState, setTestState] = useState(true)
    let { innerWidth: width, innerHeight: height } = window;
    console.log(width)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleVerify = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    // const ex
    return <useState >
        {/* <div className="expense-item"> 
            <div>March 28 2021</div>
            <div className="expense-item__description">
                <h2>Car Insurance</h2>
                <div className="expense-item__price">$234.67</div>
            </div>
        </div> */}

        <div className="form-container">
            <Row gutter={[40, 24]} justify="center">
                <Col xs={{ order: 1 }} sm={12} md={12} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                    <Row gutter={['', 24]}>

                        <Col className="service-corner3" xs={22} sm={24} md={12} lg={24} xl={24} span={24} >
                            <div className="form-title">
                                <Row gutter={[40, 24]}>
                                    <Col>
                                        <h2 className="head2">Advisor ID:44479M</h2>
                                    </Col>
                                    <Col>
                                        <h3 className="head3">13272</h3>
                                    </Col>
                                    <Col>
                                        <h3 className="head3">Policy No.:38345</h3>
                                    </Col>
                                </Row>
                                <Divider />
                            </div>
                            <div className="card-1">
                                <Row gutter={[16, 16]}>
                                    <Col xs={12} sm={8} md={8} lg={4}>
                                        <Button className="Button" shape="circle" size="large" block={false} >SH</Button>
                                        <h1 className="head1">Close</h1>
                                    </Col>
                                    <Col xs={12} sm={8} md={8} lg={6}>
                                        <h3 className="head3">Profile</h3>
                                        <p className="paragraph">0012TRA111</p>
                                    </Col>
                                    <Col xs={12} sm={8} md={8} lg={6}>
                                        <p className="paragraph">Sub Type</p>
                                        <h3 className="head3">DOB Change</h3>
                                    </Col>
                                    <Col xs={12} sm={8} md={8} lg={6}>
                                        <p className="paragraph">Created On</p>
                                        <h3 className="head3">05/12/2019</h3>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    <Col xs={12} sm={8} md={8} lg={4}></Col>
                                    <Col xs={12} sm={8} md={8} lg={6}>
                                        <p className="paragraph">Last Updated On</p>
                                        <h3 className="head3">04/11/2019</h3>
                                    </Col>
                                    <Col xs={12} sm={8} md={8} lg={6}>
                                        <p className="paragraph">Remarks</p>
                                        <h4 className="head4">Address changed in the CRM</h4>
                                    </Col>
                                    <Col xs={12} sm={8} md={8} lg={6}>
                                        <Button className="service-btn" onClick={showModal}>Verify Now</Button>
                                        <Modal title="Verification" visible={isModalVisible} onVerify={handleVerify} onCancel={handleCancel} width={400}>
                                            <p>Enter OTP</p>
                                            <Input placeholder="Please Enter OTP" bordered={false} />
                                            <Divider />
                                            <Button type="link">Resend OTP</Button>
                                        </Modal>
                                    </Col>
                                </Row>
                            </div>

                        </Col>
                    </Row>
                </Col>
                <Col xs={{ order: 2 }} sm={12} md={12} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                    <Row gutter={['', 24]}>

                        <Col className="service-corner3" xs={22} sm={24} md={12} lg={24} xl={24} span={24} >
                            <div className="form-title">
                                <Row gutter={[40, 24]}>
                                    <Col>
                                        <h2 className="head2">Advisor ID:444710M</h2>
                                    </Col>
                                    <Col>
                                        <h3 className="head3">13287</h3>
                                    </Col>
                                    <Col>
                                        <h3 className="head3">Policy No.:38345</h3>
                                    </Col>
                                </Row>
                                <Divider />
                            </div>
                            <div className="card-1">
                                <Row gutter={[16, 16]}>
                                    <Col xs={12} sm={8} md={8} lg={4}>
                                        <Button className="Button" shape="circle" size="large" block={false} >SH</Button>
                                        <h1 className="head1">Close</h1>
                                    </Col>
                                    <Col xs={12} sm={8} md={8} lg={6}>
                                        <h3 className="head3">Profile</h3>
                                        <p className="paragraph">0012TRA145</p>
                                    </Col>
                                    <Col xs={12} sm={8} md={8} lg={6}>
                                        <p className="paragraph">Sub Type</p>
                                        <h3 className="head3">DOB Change</h3>
                                    </Col>
                                    <Col xs={12} sm={8} md={8} lg={6}>
                                        <p className="paragraph">Created On</p>
                                        <h3 className="head3">01/6/2015</h3>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    <Col xs={12} sm={8} md={8} lg={4}></Col>
                                    <Col xs={12} sm={8} md={8} lg={6}>
                                        <p className="paragraph">Last Updated On</p>
                                        <h3 className="head3">05/06/2015</h3>
                                    </Col>
                                    <Col xs={12} sm={8} md={8} lg={6}>
                                        <p className="paragraph">Remarks</p>
                                        <h4 className="head4">Address changed in the CRM</h4>
                                    </Col>
                                    <Col xs={12} sm={8} md={8} lg={6}>
                                        <Button className="service-btn" onClick={showModal}>Verify Now</Button>
                                        <Modal title="Verification" visible={isModalVisible} onVerify={handleVerify} onCancel={handleCancel} width={400}>
                                            <p>Enter OTP</p>
                                            <Input placeholder="Please Enter OTP" bordered={false} />
                                            <Divider />
                                            <Button type="link">Resend OTP</Button>
                                        </Modal>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </div>        <br />
    </useState>
}
export default ForSelf;






