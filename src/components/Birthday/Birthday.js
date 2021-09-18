import React, { Fragment, useEffect } from 'react';
import './Birthday.css';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import Title from 'antd/lib/typography/Title';
const Birthday = () => {


return <Fragment >
        {/* <div className="main-container">
            <Row gutter={[40, 24]} justify="center">
                <Col xs={{ order: 2 }} sm={14} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                    <Row gutter={['', 24]}>
                        <Col className="contact-details" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                            <div className="form-title">
                                <Title level={6}>Birthday</Title>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div> */}
        <div className="main-container">
            
            <Row gutter={[40, 24]} >
                <Col span={24}>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={2}>
                            <Button className="btn" shape="round" size="large" block={false} >Upcoming</Button>
                        </Col>
                        <Col span={2}>
                            <Button className="btn" shape="round" size="large" block={false} >Recent</Button>
                        </Col>
                        <Col span={2}>
                            <Button className="btn" shape="round" size="large" block={false} >Later</Button>
                        </Col>
                    </Row>



                </Col>
            </Row>





            {/* </div> */}
        </div>
    </Fragment>
}
export default Birthday;