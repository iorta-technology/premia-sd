import React, { useState, useEffect } from 'react'
import './Dashboard.css';
import { Row, Col, Form, Typography, Tooltip, Button, Input, Radio, Select, Cascader, DatePicker, Space, Modal } from 'antd';
import { Progress } from 'antd';
import axios from 'axios';
const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};
function onChange(date, dateString) {
    console.log(date, dateString);
}
const Dashboard = () => {
    const [progressChartArr, setProgressChartArr] = useState([]);
    useEffect(() => {
        axios.get("https://sdrestnode.iorta.in/secure/sd/user/leads-dashboard-ratio/5df77e6a2b5ffa6c72ae1a0e?fromDate=01/01/2021&toDate=01/01/2022")
            .then((res) => {
                console.log(res.data, 'response here')
                setProgressChartArr(
                    res.data.errMsg
                );
            });
    }, []);
    console.log(progressChartArr);
    return (
        <Row gutter={[10,]} justify="center">
            <Col xs={{ order: 1 }} sm={22} md={22} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                <Row gutter={['', 10]}>
                    <Col className="dashboard-main" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                        <Form layout="horizontal" className="contact-detail-form">
                            <Col>
                                <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="City"
                                    label="From"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please select date',
                                        },
                                    ]}
                                >
                                    <DatePicker onChange={onChange} style={{ width: '25vw' }} placeholder="dd/mm/yyyy" />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="City"
                                    label="To"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please select date',
                                        },
                                    ]}
                                >
                                    <DatePicker onChange={onChange} style={{ width: '25vw' }} placeholder="dd/mm/yyyy" />
                                </Form.Item>
                            </Col>
                            <div >
                                <Button className='export-btn'>Export To Excel</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Col>
            <Col xs={{ order: 2 }} sm={22} md={22} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                <Row gutter={['', 10]}>
                    <Col className="dashboard-main" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                        <h4 className='dashboard-head4'>LEAD</h4>
                        <Form layout="horizontal" className="contact-detail-form">
                            <Col>
                                <Tooltip >
                                    <Progress percent={60} success={{ percent: 20 }} danger={{ percent: 10 }} type="circle" />
                                </Tooltip>
                            </Col>
                            <Col>
                                <Tooltip >
                                    <Progress percent={60} success={{ percent: 20 }} danger={{ percent: 10 }} type="circle" />
                                </Tooltip>
                            </Col>
                            <Col>
                                <Tooltip >
                                    <Progress percent={60} success={{ percent: 20 }} percent={20} type="circle" />
                                </Tooltip>
                            </Col>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>

    )

}

export default Dashboard;