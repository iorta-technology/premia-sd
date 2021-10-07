import React, { Fragment } from 'react';
import './ClubsMaster.css';
import { Layout } from 'antd';
import { Carousel } from 'antd';
import { Card, Col, Row } from 'antd';
import { Button } from 'antd';
import { Divider } from 'antd';
import { Descriptions } from 'antd';
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
const ClubsMaster = () => {
    return <Fragment >
        <div className="Main-content">
            <div className="club-container">
                <h1 className="Head-tag1" >International Clubs</h1>
                <Row type="flex" gutter={[40, 24]}>
                    <Col xs={{ order: 1 }} sm={8} md={8} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                        <Row type="flex" gutter={['', 24]}>
                            <Col className="card1" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                <div className="Card">
                                    <Carousel autoplay>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card1.jpg" class="responsive" />}>
                                            </Card>
                                        </div>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card2.jpg" class="responsive" />}>
                                            </Card>
                                        </div>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card3.jpg" class="responsive" />}>
                                            </Card>
                                        </div>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card4.jpg" class="responsive" />}>
                                            </Card>
                                        </div>
                                    </Carousel>
                                    <Descriptions layout="vertical" bordered>
                                        <Descriptions.Item label="TOP OF TABLE CLUB (TOT)" span={3}>
                                            <p className="Paragraph">Qualifying condition for 2016 on WRP* (Rs.)</p>
                                            <h2 className="Head-tag2">₹ 2,09,76,000/-</h2><Divider />
                                            <p className="Paragraph">Qualifying condition for 2016 on Commission (Rs.)</p>
                                            <h2 className="Head-tag2">₹ 52,44,000/-</h2><Divider />
                                            <p className="Paragraph">Rewards</p>
                                            <h2 className="Head-tag2">MDRT Conference for 1</h2>
                                            <h2 className="Head-tag2">MDRT Registration</h2>
                                            <h2 className="Head-tag2">Reimbursement of 1.5 Lac</h2>
                                            <Divider />
                                            <Button className="button">Join Club</Button>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </div>
                            </Col>
                            <Col className="card2" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                <div className="Card">
                                    <Carousel autoplay>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card1.jpg" />}>
                                            </Card>
                                        </div>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card2.jpg" />}>
                                            </Card>
                                        </div>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card3.jpg" />}>
                                            </Card>
                                        </div>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card4.jpg" />}>
                                            </Card>
                                        </div>
                                    </Carousel>
                                    <Descriptions layout="vertical" bordered>
                                        <Descriptions.Item label="PLATINUM PREMIER" span={3}>
                                            <Row justify="space-around" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                <Col>
                                                    <p className="Paragraph">NOP</p>
                                                    <h2 className="Head-tag2">55</h2><Divider />
                                                    <p className="Paragraph">WRP</p>
                                                    <h2 className="Head-tag2">50</h2><Divider />
                                                    <p className="Paragraph">13th Month Persistency</p>
                                                    <h2 className="Head-tag2">75%</h2><Divider />
                                                    <p className="Paragraph">25th Month Persistency</p>
                                                    <h2 className="Head-tag2">65%</h2><Divider />
                                                </Col>
                                                <Col>
                                                    <p className="Paragraph">Vintage</p>
                                                    <h2 className="Head-tag2">44</h2><Divider />
                                                    <p className="Paragraph">FY 16 NOP</p>
                                                    <h2 className="Head-tag2">35</h2><Divider />
                                                    <p className="Paragraph">FY 15 NOP</p>
                                                    <h2 className="Head-tag2">20</h2><Divider />
                                                </Col>
                                            </Row>
                                            <Button className="button">Join Club</Button>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={{ order: 2 }} sm={8} md={8} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                        <Row gutter={['', 24]}>
                            <Col className="card3" xs={22} sm={24} md={24} lg={24} xl={24} span={24} >
                                <div className="Card">
                                    <Carousel autoplay>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card1.jpg" />}>
                                            </Card>
                                        </div>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card2.jpg" />}>
                                            </Card>
                                        </div>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card3.jpg" />}>
                                            </Card>
                                        </div>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card4.jpg" />}>
                                            </Card>
                                        </div>
                                    </Carousel>
                                    <Descriptions layout="vertical" bordered>
                                        <Descriptions.Item label="TOP OF TABLE CLUB (TOT)" span={3}>
                                            <p className="Paragraph">Qualifying condition for 2016 on WRP* (Rs.)</p>
                                            <h2 className="Head-tag2">₹ 1,04,88,000/-</h2><Divider />
                                            <p className="Paragraph">Qualifying condition for 2016 on Commission (Rs.)</p>
                                            <h2 className="Head-tag2">₹ 26,22,000/-</h2><Divider />
                                            <p className="Paragraph">Rewards</p>
                                            <h2 className="Head-tag2">MDRT Experience for 1</h2>
                                            <h2 className="Head-tag2">Reimbursement of 1.5 La</h2>
                                            <br />
                                            <Divider />
                                            <Button className="button">Join Club</Button>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </div>
                            </Col>
                            <Col className="card2" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                <div className="Card">
                                    <Carousel autoplay>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card1.jpg" />}>
                                            </Card>
                                        </div>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card2.jpg" />}>
                                            </Card>
                                        </div>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card3.jpg" />}>
                                            </Card>
                                        </div>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card4.jpg" />}>
                                            </Card>
                                        </div>
                                    </Carousel>
                                    <Descriptions layout="vertical" bordered>
                                        <Descriptions.Item label="PLATINUM PREMIER" span={3}>
                                            <Row justify="space-around" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                <Col>
                                                    <p className="Paragraph">NOP</p>
                                                    <h2 className="Head-tag2">55</h2><Divider />
                                                    <p className="Paragraph">WRP</p>
                                                    <h2 className="Head-tag2">50</h2><Divider />
                                                    <p className="Paragraph">13th Month Persistency</p>
                                                    <h2 className="Head-tag2">75%</h2><Divider />
                                                    <p className="Paragraph">25th Month Persistency</p>
                                                    <h2 className="Head-tag2">65%</h2><Divider />
                                                </Col>
                                                <Col>
                                                    <p className="Paragraph">Vintage</p>
                                                    <h2 className="Head-tag2">44</h2><Divider />
                                                    <p className="Paragraph">FY 16 NOP</p>
                                                    <h2 className="Head-tag2">35</h2><Divider />
                                                    <p className="Paragraph">FY 15 NOP</p>
                                                    <h2 className="Head-tag2">20</h2><Divider />
                                                </Col>
                                            </Row>
                                            <Button className="button">Join Club</Button>
                                        </Descriptions.Item>
                                    </Descriptions>

                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={{ order: 3 }} sm={8} md={8} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                        <Row gutter={['', 24]}>
                            <Col className="card3" xs={22} sm={24} md={24} lg={24} xl={24} span={24} >
                                <div className="Card">
                                    <Carousel autoplay>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card1.jpg" />}>
                                            </Card>
                                        </div>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card2.jpg" />}>
                                            </Card>
                                        </div>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card3.jpg" />}>
                                            </Card>
                                        </div>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card4.jpg" />}>
                                            </Card>
                                        </div>
                                    </Carousel>
                                    <Descriptions layout="vertical" bordered>
                                        <Descriptions.Item label="TOP OF TABLE CLUB (TOT)" span={3}>
                                            <p className="Paragraph">Qualifying condition for 2016 on WRP* (Rs.)</p>
                                            <h2 className="Head-tag2">₹ 34,96,000/-</h2><Divider />
                                            <p className="Paragraph">Qualifying condition for 2016 on Commission (Rs.)</p>
                                            <h2 className="Head-tag2">₹ 8,74,000/-</h2><Divider />
                                            <p className="Paragraph">Rewards</p>
                                            <h2 className="Head-tag2">MDRT Experince</h2>
                                            <br />
                                            <br />
                                            <Divider />
                                            <Button className="button">Join Club</Button>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </div>
                            </Col>
                            <Col className="card3" xs={22} sm={24} md={24} lg={24} xl={24} span={24} >
                                <div className="Card">
                                    <Carousel autoplay>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card1.jpg" />}>
                                            </Card>
                                        </div>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card2.jpg" />}>
                                            </Card>
                                        </div>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card3.jpg" />}>
                                            </Card>
                                        </div>
                                        <div className="Image">
                                            <Card style={contentStyle} cover={<img alt="example" src="card4.jpg" />}>
                                            </Card>
                                        </div>
                                    </Carousel>
                                    <Descriptions layout="vertical" bordered>
                                        <Descriptions.Item label="PLATINUM PREMIER" span={3}>
                                            <Row justify="space-around" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                <Col>
                                                    <p className="Paragraph">NOP</p>
                                                    <h2 className="Head-tag2">55</h2><Divider />
                                                    <p className="Paragraph">WRP</p>
                                                    <h2 className="Head-tag2">50</h2><Divider />
                                                    <p className="Paragraph">13th Month Persistency</p>
                                                    <h2 className="Head-tag2">75%</h2><Divider />
                                                    <p className="Paragraph">25th Month Persistency</p>
                                                    <h2 className="Head-tag2">65%</h2><Divider />
                                                </Col>
                                                <Col>
                                                    <p className="Paragraph">Vintage</p>
                                                    <h2 className="Head-tag2">44</h2><Divider />
                                                    <p className="Paragraph">FY 16 NOP</p>
                                                    <h2 className="Head-tag2">35</h2><Divider />
                                                    <p className="Paragraph">FY 15 NOP</p>
                                                    <h2 className="Head-tag2">20</h2><Divider />
                                                </Col>
                                            </Row>
                                            <Button className="button">Join Club</Button>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
        <br />
    </Fragment >
}
export default ClubsMaster;
