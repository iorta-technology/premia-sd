import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Input, Select, Space, DatePicker } from 'antd';
import { ArrowLeftOutlined, FileTextOutlined } from '@ant-design/icons';
import Tabs from '../Tab/Tab'
import LeadDetailsTab from './LeadDetailsTab';
import * as actions from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import _, { add } from "lodash";
import '../StatusLead/StatusLead.css'
import moment, { now } from 'moment';


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

const productTypeOptions = [
    { value: 'Relience Life', label: 'Relience Life' }, { value: 'HDFC Life', label: 'HDFC Life' },
    { value: 'Edwlweiss', label: 'Edwlweiss' },
]
const ProposedProduct = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    let storeFormData = useSelector((state) => state.newLead.formData)
    const storeLeadId = useSelector((state) => state.newLead.leadId)
    const channelCode = useSelector(state => state.login.channelCode)
    const productCategories = useSelector(state => state.product.productCategory)
    const planOptions = useSelector(state => state.product.planName)

    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 620;

    const [product, setProduct] = useState()
    const [planNameValue, setPlanNameValue] = useState()
    const [closureDate, setClosureDate] = useState()
    const [expectedMoney, setExpectedMoney] = useState()

    useEffect(() => {
        console.log(productCategories)
        dispatch(actions.fetchProduct(channelCode))
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [width]);

    const productHandler = (value, object) => {
        const { _id } = object
        dispatch(actions.fetchPlanName(_id))

        setProduct(value)
    }
    const planNameHandler = value => {
        setPlanNameValue(value)
    }
    const closureDateHandler = (date, dateString) => {
        setClosureDate(moment(date).valueOf())

    }
    const expectedMoneyHandler = (e) => {
        setExpectedMoney(e.target.value)
    }
    let productCategoryOptions = (productCategories && !_.isEmpty(productCategories)) ?
        productCategories.map(productCategory => {
            const { productCategoryName, _id,
                // channelCode:{channelCode}
            } = productCategory
            const label = productCategoryName
            const value = productCategoryName
            // const chCode = channelCode
            const newProductCategories = {
                // chCode,
                _id,
                label, value
            }
            return newProductCategories
        }) : null

    const formData = {
        ...storeFormData,

    };
    const submitHandler = event => {
        // event.preventDefault();

        dispatch(actions.editLead(formData, storeLeadId))
        alert('New Lead Updated Successfully')
        // history.replace('leadmasterpage/statuslead')
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
                <Form
                    layout="horizontal"
                    className="contact-detail-form"
                    onFinish={submitHandler}
                >
                    <Row gutter={['', 20]} justify="center">
                        <LeadDetailsTab activeKey="5" />
                        <Col className="form-body p40 m0a" sm={24} md={16} lg={15} xl={15} span={23} offset={2}>
                            <p className="form-title">Proposed Product</p>
                            <Row gutter={16} className="mb-2" >
                                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
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
                                        <Select
                                            value={product}
                                            options={productCategoryOptions}
                                            size="large"
                                            placeholder="Select Product"
                                            onChange={productHandler}
                                        >
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
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
                                        <Select
                                            value={planNameValue}
                                            options={planOptions}
                                            size="large"
                                            placeholder="Select"
                                            onChange={planNameHandler}
                                        >
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
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
                                        <DatePicker
                                            value={closureDate}
                                            onChange={closureDateHandler}
                                            size="large"
                                            style={{ width: "100%" }}
                                            placeholder="dd/mm/yyyy" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
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
                                        <Input
                                            value={expectedMoney}
                                            onChange={expectedMoneyHandler}
                                            className="first-name input-box"
                                            placeholder="Expected Premium Amount1">
                                        </Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>

                        <Col className='form-body  p20' style={{ marginBottom: "20px" }} sm={24} md={16} lg={15} xl={15} span={23} offset={width > breakpoint ? 6:0}>
                            <Row gutter={[8,8]}>
                                <Col xs={11} sm={12} md={4} offset={width > breakpoint ? 16 : 0} >
                                    <Button
                                        type="primary" 
                                        // shape="round" 
                                        size="large" style={{ backgroundColor: 'rgb(0,172,193)', border: 'none' }} icon={<ArrowLeftOutlined />} >Previous</Button>
                                </Col>
                                <Col xs={11} sm={12} md={4}>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            // shape="round"
                                            size="large"
                                            style={{ backgroundColor: 'rgb(228,106,37)', border: 'none' }}
                                            icon={<FileTextOutlined />}
                                            // onClick={submitHandler}
                                            htmlType="submit"
                                        >Submit</Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    )
}

export default ProposedProduct
