import React, { Fragment } from 'react';
import './ClubsMaster.css';
import { Layout } from 'antd';
import { Image } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Carousel } from 'antd';
import { Card, Col, Row } from 'antd';
import { Button } from 'antd';
import { Divider } from 'antd';
const { Header, Footer, Content } = Layout;
const { Meta } = Card;
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const style = { background: '#fff', padding: '8px 0' };
const ClubsMaster = () => {
    return <Fragment >
        {/* <div className="container"> */}
            <Header className="header">
                <Row>
                    <Col span={8}>
                        <Title className="header-name">Club</Title>
                    </Col>
                    <Col span={8}>
                        <Image style={{ paddingLeft: '120px', paddingTop: '15px' }} width={270} src="logo.png" />
                    </Col>
                    <Col span={4}>
                        <Image style={{ paddingTop: '15px' }} width={50} src="img2.png" />
                    </Col>
                </Row>
            </Header>
        {/* </div> */}
        {/* <div className="Header-main"></div> */}
        <div className="Main-content">
            <div className="Main-sub-content">
                <h1 className="Head-tag1" >International Clubs</h1>
                <div className="Main-card">
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <div className="Card">
                            {/* <Card cover={<img alt="example" src="card1.jpg" />}> */}
                            <Carousel autoplay>
                                <div>
                                    <Card style={contentStyle} cover={<img alt="example" src="card1.jpg" />}>
                                    </Card> {/* <h3 style={contentStyle}>1</h3> */}
                                </div>
                                <div>
                                    <Card style={contentStyle} cover={<img alt="example" src="card2.jpg" />}>
                                    </Card>
                                </div>
                                <div>
                                    <Card style={contentStyle} cover={<img alt="example" src="card3.jpg" />}>
                                    </Card>
                                </div>
                                <div>
                                    <Card style={contentStyle} cover={<img alt="example" src="card4.jpg" />}>
                                    </Card>
                                </div>
                            </Carousel>
                            <Meta title="TOP OF TABLE CLUB (TOT)" /><Divider />
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
                            {/* </Card> */}
                        </div>
                        <div className="Card">
                            <Card cover={<img alt="example" src="card1.jpg" />}>
                                <Meta title="TOP OF TABLE CLUB (TOT)" /><Divider />
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
                            </Card>
                        </div>
                        <div className="Card">
                            <Card cover={<img alt="example" src="card1.jpg" />}>
                                <Meta title="TOP OF TABLE CLUB (TOT)" /><Divider />
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
                            </Card>
                        </div>
                    </Row>
                </div>
            </div>
            <div className="Main-content">
                <div className="Main-sub-content">
                    <br />
                    {/* <h1 className="Head-tag1" >International Clubs</h1> */}
                    <div className="Main-card">
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <div className="Card">
                                <Card cover={<img alt="example" src="card1.jpg" />}>
                                    <Meta title="TOP OF TABLE CLUB (TOT)" /><Divider />
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
                                </Card>
                            </div>
                            <div className="Card">
                                <Card cover={<img alt="example" src="card1.jpg" />}>
                                    <Meta title="TOP OF TABLE CLUB (TOT)" /><Divider />
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
                                </Card>
                            </div>
                            <div className="Card">
                                <Card cover={<img alt="example" src="card1.jpg" />}>
                                    <Meta title="TOP OF TABLE CLUB (TOT)" /><Divider />
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
                                </Card>
                            </div>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        {/* <Layout>
            <div className="container">
                <Header className="header">
                    <Row>
                        <Col span={8}>
                            <Title className="header-name">Club</Title>
                        </Col>
                        <Col span={8}>
                            <Image style={{ paddingLeft: '120px', paddingTop: '15px' }} width={270} src="logo.png" />
                        </Col>
                        <Col span={4}>
                            <Image style={{ paddingTop: '15px' }} width={50} src="img2.png" />
                        </Col>
                    </Row>
                </Header>
            </div>
        </Layout> */}
        {/* <Col className="gutter-row" span={8}>
                            <div style={style}>
                                <Card cover={<img alt="example" src="card1.jpg" />}>
                                    <Meta title="TOP OF TABLE CLUB (TOT)" /><Divider />
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
                                </Card>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <div style={style}>
                                <Card cover={<img alt="example" src="card1.jpg" />}>
                                    <Meta title="TOP OF TABLE CLUB (TOT)" /><Divider />
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
                                </Card>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <div style={style}><Card cover={<img alt="example" src="card1.jpg" />}>
                                <Meta title="TOP OF TABLE CLUB (TOT)" /><Divider />
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
                            </Card></div>
                        </Col> */}
        <Footer></Footer>
    </Fragment >
}
export default ClubsMaster;
