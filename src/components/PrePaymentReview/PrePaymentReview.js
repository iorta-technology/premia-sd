import React, { useState } from 'react';
import { Row, Col, Card, Button, Form } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import './PrePaymentReview.css';
const PrePaymentReview = () => {
    return (
        <div className="prepayment-main">
            <div className="prepayment-body">
                <Row gutter={[16, 16]} justify="start">
                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                <div class="div1">
                                    <p className="prepayment-title">Life Assured Details</p>
                                </div>
                                <div class="div2">
                                    <Row justify="center" gutter={[40, 12]}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Name : </text>
                                            <text className="prepayment-text"> Chevkjw Kjn.dwjves.</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">DOB : </text>
                                            <text className="prepayment-text">6/22/1999</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Gender : </text>
                                            <text className="prepayment-text">Female</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Mobile No : </text>
                                            <text className="prepayment-text">8796541230</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Email Id : </text>
                                            <text className="prepayment-text"></text>
                                        </Col>
                                    </Row>
                                </div>
                            </Col >
                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                <div class="div1">
                                    <p className="prepayment-title">Proposer Details</p>
                                </div>
                                <div class="div2">
                                    <Row justify="center" gutter={[40, 12]}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Name : </text>
                                            <text className="prepayment-text"> Chevkjw Kjn.dwjves.</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">DOB : </text>
                                            <text className="prepayment-text"></text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Gender : </text>
                                            <text className="prepayment-text"></text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Employee No : </text>
                                            <text className="prepayment-text"></text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Mobile No : </text>
                                            <text className="prepayment-text">8796541230</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Email Id : </text>
                                            <text className="prepayment-text"></text>
                                        </Col>
                                    </Row>
                                </div>
                            </Col >
                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                <div class="div1">
                                    <p className="prepayment-title">Appointee/Nominee Details</p>
                                </div>
                                <div class="div2">
                                    <Row justify="center" gutter={[40, 12]}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">DOB : </text>
                                            <text className="prepayment-text"></text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Gender : </text>
                                            <text className="prepayment-text"></text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Mobile No : </text>
                                            <text className="prepayment-text"></text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Email Id : </text>
                                            <text className="prepayment-text"></text>
                                        </Col>
                                    </Row>
                                </div>
                            </Col >
                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                <div class="div1">
                                    <p className="prepayment-title">Plan Details</p>
                                </div>
                                <div class="div2">
                                    <Row justify="center" gutter={[40, 12]}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Plan Name : </text>
                                            <text className="prepayment-text"> Home Loan</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Plan Code Category : </text>
                                            <text className="prepayment-text">Loan Products</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Policy Term : </text>
                                            <text className="prepayment-text">5</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Premium Paying Term : </text>
                                            <text className="prepayment-text">5</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Sum Assured : </text>
                                            <text className="prepayment-text">1.00</text>
                                        </Col>
                                    </Row>
                                </div>
                            </Col >
                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                <div class="div1">
                                    <p className="prepayment-title">Premium Details</p>
                                </div>
                                <div class="div2">
                                    <Row justify="center" gutter={[40, 12]}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Premium Type : </text>
                                            <text className="prepayment-text"> Single</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Installment Premium : </text>
                                            <text className="prepayment-text"></text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Annualized Premium : </text>
                                            <text className="prepayment-text">0.05</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">ECS/Direct/Debit : </text>
                                            <text className="prepayment-text"></text>
                                        </Col>
                                    </Row>
                                </div>
                            </Col >
                            <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24}>
                                <div class="div1">
                                    <p className="prepayment-title">Other Details</p>
                                </div>
                                <div class="div2">
                                    <Row justify="center" gutter={[40, 12]}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Name : </text>
                                            <text className="prepayment-text"> ashraf khan</text>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <text className="prepayment-text">Code   : </text>
                                            <text className="prepayment-text">6/22/1999AGQFLXYR</text>
                                        </Col>
                                    </Row>
                                </div>
                            </Col >
                        </Row >
                    </Col>
                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                        <Row justify="space-around" gutter={['', 24]}>
                            <Col className="prepayment-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                <Form >
                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                        <Col>
                                            <Button className="prepaymentreview-btn1">Previous</Button>
                                        </Col>
                                        <Col >
                                            <Button className="prepaymentreview-btn">Proceed
                                                <ArrowRightOutlined
                                                    style={{
                                                        marginTop: "7px"
                                                    }}
                                                />
                                            </Button><br />
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

        </div >
    )
}
export default PrePaymentReview;