import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Input, Select, Space, DatePicker } from 'antd';
import { ArrowLeftOutlined, FileTextOutlined } from '@ant-design/icons';
import Tabs from '../Tab/Tab'
import LeadDetailsTab from './LeadDetailsTab';
import * as actions from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';


const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};

let personalRoute = "/leadmasterpage/leaddetails/personallead"
const tabMenu = [
    {
        id: 1,
        value: "Status",
    },
    {
        id: 2,
        value: "Lead Details"
    },
    {
        id: 3,
        value: "Proposal Details"
    },
    {
        id: 4,
        value: "Documents Upload"
    },
    {
        id: 5,
        value: "History"
    },

]
const ProposedProduct = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    let storeFormData = useSelector((state) => state.newLead.formData)
    const storeLeadId = useSelector((state) => state.newLead.leadId)


    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 620;

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [width]);
    const formData = {
        ...storeFormData,
        // education:educationDetails,
        // professionType:professionType,
        // incomeGroup:incomeGroup

    };
    const submitHandler = event => {
        event.preventDefault();
        
        dispatch(actions.storeLead(formData,storeLeadId))
        history.replace('statuslead')
    };
    return (
        <>
            <Tabs
                tabMenu={tabMenu}
                header="New Lead"
                detailsRouteTab={personalRoute}
                activeKey="2"

            />
            <div className="form-container">
                <Row gutter={['', 20]} justify="center">
                        <LeadDetailsTab activeKey="5" />
                    <Col className="m0a" xs={22} sm={22} md={17} >
                        <Col className="form-body p40" xs={24} sm={24} md={20} lg={20} xl={20} >
                            <p className="form-title">Proposed Product</p>
                            <Form layout="horizontal" className="contact-detail-form">
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="Product Category"
                                        label="Product Category"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Select product category',
                                            },
                                        ]}
                                    >
                                        <Select size="large" placeholder="Select"></Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="Plan Name"
                                        label="Plan Name"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Select plan name',
                                            },
                                        ]}
                                    >
                                        <Select size="large" placeholder="Select"></Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="Expected Closure Date"
                                        label="Expected Closure Date"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Select Closure Date',
                                            },
                                        ]}
                                    >
                                        <Space direction="vertical" size={24}>
                                            <DatePicker placeholder="dd/mm/yyyy" />
                                        </Space>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        {...formItemLayout}
                                        className="form-item-name label-color"
                                        name="Expected Premium"
                                        label="Expected Premium"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Select plan name',
                                            },
                                        ]}
                                    >
                                        <Input className="first-name input-box" placeholder="Expected Premium Amount1"></Input>
                                    </Form.Item>
                                </Col>
                            </Form>
                        </Col>
                        <Col className='form-body  p20' style={{ margin: "20px 0" }} xs={24} sm={24} md={16} lg={20} xl={20} span={24} offset={1}>
                            <Row>
                                <Col xs={11} sm={12} md={4} offset={width > breakpoint ? 16 : 2} >
                                    <Button 
                                        type="primary" shape="round" size="large" style={{ backgroundColor: 'rgb(0,172,193)', border: 'none' }} icon={<ArrowLeftOutlined />} >Previous</Button>
                                </Col>
                                <Col xs={11} sm={12} md={4}>
                                    <Button 
                                        type="primary" 
                                        shape="round" 
                                        size="large" 
                                        style={{ backgroundColor: 'rgb(228,106,37)', border: 'none' }} 
                                        icon={<FileTextOutlined />}
                                        onClick={submitHandler}
                                        >Submit</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ProposedProduct
