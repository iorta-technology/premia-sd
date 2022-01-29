import React, { useState } from 'react';
import './UploadDocuments.css';
import { Row, Col, Form, Menu, Tabs, Typography, Button, Input, Radio, Select, Cascader, DatePicker, Space, Modal, Checkbox } from 'antd';
import { Divider, Image, Card } from 'antd';
import { Upload, message } from 'antd';
import { Table, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import MainTabs from '../../components/MainTabs/MainTabs'

const tabMenu = [
    {
      id: 'benefitillustrator',
      value: "Benefit Illustrator",
    },
    {
      id: 'proposalfulfilment',
      value: "Proposal Fulfilment"
    },
    {
      id: 'prepaymentreview',
      value: "Pre-payment Review"
    },
    {
      id: 'paymentoptions',
      value: "Payment Options"
    },
    {
        id: 'uploaddocuments',
        value: "Upload Documents"
    },
    {
        id: 'proposalhistory',
        value: "Proposal History"
    },
  
  ]
const { Title } = Typography;
function onChange(date, dateString) {
    console.log(date, dateString);
}
const columns = [
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'name',

    },
    {
        title: 'Category & Type',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Document Status',
        dataIndex: 'address',
        key: 'address',
    },

    {
        title: 'Action',
        key: 'action',

    },
];
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
const { Option } = Select;
const contentStyle = {
    height: '100px',
    color: '#fff',
};
const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};
const setStateOptions = [

    { value: "Mr", label: "Passport" },
    { value: "Mrs", label: "Pan Card" },
    { value: "Ration Card", label: "Ration Card" },
    { value: "Dr", label: "Voter's Identity Card" },
    { value: "Prof", label: "Driving License" },
    { value: "", label: "Photo identity proof of Central or State government" },
    { value: "", label: "Letter from a recognized public authority or public servant" },
    { value: "", label: "Bank Pass Book bearing photograph" },
    { value: "", label: "Electricity Bill" },
    { value: "", label: "Telephone bill including mobile" },
    { value: "", label: "landline" },
    { value: "", label: "Bank Account Statement" },
    { value: "", label: "Consumer Gas connection card or Gas Bill" },
    { value: "", label: "Letter from any recognized public authority or public servant" },
    { value: "", label: "Credit Card Statement" }
]
const UploadDocuments = () => {
    const [value, setValue] = React.useState(1);
    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");
    return (
        <div className="addressproof">
            <MainTabs
                tabMenu={tabMenu}
                // header="New Lead"
                activeKey="uploaddocuments"
            />
            <div className="addressProof-row-flex">
                <Tabs tabPosition={tabPosition} tabBarGutter="5vw" style={{ marginLeft: '1vw', marginRight: '1vw', marginTop: '1vw', backgroundColor: 'white', fontWeight: 'bolder' }}>
                    <TabPane tab="Address Proof" key="1" >
                        <div className="uploaddocuments-details-card-style ">
                            <div className="uploaddocuments-details-card-content-align">
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <h3 className="addressproof-head3">Upload Address Proof</h3>
                                                <p className="addressproof-paragraph">Please select the document type you would like to upload for your Address Proof</p>
                                                <Col>
                                                    <Form layout="horizontal" className="contact-detail-form">
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="Select Document Type"
                                                                label="Select Document Type"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Select Document Type!',
                                                                    },
                                                                ]}
                                                            >
                                                                <Select options={setStateOptions} placeholder="Passport"></Select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['full', 'name']}
                                                                label="You can add multiple images for a document"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Upload {...props}>
                                                                    <Button className="addressproof-btn" >Upload</Button>
                                                                </Upload>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <div class="box">Please ensure that that image you upload is clear and verifiable.</div>
                                                        </Col>
                                                    </Form>
                                                </Col>

                                                <Table
                                                    columns={columns}
                                                    pagination={{ pageSize: 50 }}
                                                    scroll={{ x: '150vw' }}
                                                    style={{ marginTop: '2vw' }}
                                                />

                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col  >
                                                            <Button className="addressproof-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="addressproof-btn">Save</Button><br />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Photo Id" key="2" >
                        <div className="uploaddocuments-details-card-style ">
                            <div className="uploaddocuments-details-card-content-align">
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <h3 className="addressproof-head3">Upload Photo ID</h3>
                                                <p className="addressproof-paragraph">Please select the document type you would like to upload for your Address Proof</p>
                                                <Col>
                                                    <Form layout="horizontal" className="contact-detail-form">
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="Select Document Type"
                                                                label="Select Document Type"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Select Document Type!',
                                                                    },
                                                                ]}
                                                            >
                                                                <Select options={setStateOptions} placeholder="Passport"></Select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['full', 'name']}
                                                                label="You can add multiple images for a document"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Upload {...props}>
                                                                    <Button className="addressproof-btn" >Upload</Button>
                                                                </Upload>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <div class="box">Please ensure that that image you upload is clear and verifiable.</div>
                                                        </Col>
                                                    </Form>
                                                </Col>
                                                <Table
                                                    columns={columns}
                                                    pagination={{ pageSize: 50 }}
                                                    scroll={{ x: '150vw' }}
                                                    style={{ marginTop: '2vw' }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                    <Col  >
                                                            <Button className="addressproof-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="addressproof-btn">Save</Button><br />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="ID Proof" key="3" >
                        <div className="uploaddocuments-details-card-style ">
                            <div className="uploaddocuments-details-card-content-align">
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <h3 className="addressproof-head3">Upload ID Proof</h3>
                                                <p className="addressproof-paragraph">Please select the document type you would like to upload for your ID Proof</p>
                                                <Col>
                                                    <Form layout="horizontal" className="contact-detail-form">
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="Select Document Type"
                                                                label="Select Document Type"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Select Document Type!',
                                                                    },
                                                                ]}
                                                            >
                                                                <Select options={setStateOptions} placeholder="Passport"></Select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['full', 'name']}
                                                                label="You can add multiple images for a document"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Upload {...props}>
                                                                    <Button className="addressproof-btn" >Upload</Button>
                                                                </Upload>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <div class="box">Please ensure that that image you upload is clear and verifiable.</div>
                                                        </Col>
                                                    </Form>
                                                </Col>
                                                <Table
                                                    columns={columns}
                                                    pagination={{ pageSize: 50 }}
                                                    scroll={{ x: '150vw' }}
                                                    style={{ marginTop: '2vw' }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                    <Col  >
                                                            <Button className="addressproof-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="addressproof-btn">Save</Button><br />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Income Proof" key="4" >
                        <div className="uploaddocuments-details-card-style ">
                            <div className="uploaddocuments-details-card-content-align">
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <h3 className="addressproof-head3">Upload Income Proof</h3>
                                                <p className="addressproof-paragraph">Please select the document type you would like to upload for your Income Proof</p>
                                                <Col>
                                                    <Form layout="horizontal" className="contact-detail-form">
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="Select Document Type"
                                                                label="Select Document Type"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Select Document Type!',
                                                                    },
                                                                ]}
                                                            >
                                                                <Select options={setStateOptions} placeholder="Passport"></Select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['full', 'name']}
                                                                label="You can add multiple images for a document"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Upload {...props}>
                                                                    <Button className="addressproof-btn" >Upload</Button>
                                                                </Upload>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <div class="box">Please ensure that that image you upload is clear and verifiable.</div>
                                                        </Col>
                                                    </Form>
                                                </Col>
                                                <Table
                                                    columns={columns}
                                                    pagination={{ pageSize: 50 }}
                                                    scroll={{ x: '150vw' }}
                                                    style={{ marginTop: '2vw' }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                    <Col  >
                                                            <Button className="addressproof-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="addressproof-btn">Save</Button><br />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Age Proof" key="5" >
                        <div className="uploaddocuments-details-card-style ">
                            <div className="uploaddocuments-details-card-content-align">
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <h3 className="addressproof-head3">Upload Age Proof</h3>
                                                <p className="addressproof-paragraph">Please select the document type you would like to upload for your Age Proof</p>
                                                <Col>
                                                    <Form layout="horizontal" className="contact-detail-form">
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="Select Document Type"
                                                                label="Select Document Type"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Select Document Type!',
                                                                    },
                                                                ]}
                                                            >
                                                                <Select options={setStateOptions} placeholder="Passport"></Select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['full', 'name']}
                                                                label="You can add multiple images for a document"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Upload {...props}>
                                                                    <Button className="addressproof-btn" >Upload</Button>
                                                                </Upload>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <div class="box">Please ensure that that image you upload is clear and verifiable.</div>
                                                        </Col>
                                                    </Form>
                                                </Col>
                                                <Table
                                                    columns={columns}
                                                    pagination={{ pageSize: 50 }}
                                                    scroll={{ x: '150vw' }}
                                                    style={{ marginTop: '2vw' }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                    <Col  >
                                                            <Button className="addressproof-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="addressproof-btn">Save</Button><br />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Customer Declaration" key="6" >
                        <div className="uploaddocuments-details-card-style ">
                            <div className="uploaddocuments-details-card-content-align">
                                <Row gutter={[40, 24]} justify="start">
                                    <Col xs={{ order: 1 }} sm={24} md={24} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                                        <Row gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                            <h3 className="addressproof-head3">Customer Declaration Capture</h3>
                                                <p className="addressproof-paragraph">Please select the document type you would like to upload for your Address Proof</p>
                                                <Col>
                                                    <Form layout="horizontal" className="contact-detail-form">
                                                        <Col >
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name="Select Document Type"
                                                                label="Select Document Type"
                                                                hasFeedback
                                                                rules={[
                                                                    {
                                                                        required: false,
                                                                        message: 'Select Document Type!',
                                                                    },
                                                                ]}
                                                            >
                                                                <Select options={setStateOptions} placeholder="Passport"></Select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <Form.Item
                                                                {...formItemLayout}
                                                                className="form-item-name label-color"
                                                                name={['full', 'name']}
                                                                label="You can add multiple images for a document"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Upload {...props}>
                                                                    <Button className="addressproof-btn" >Upload</Button>
                                                                </Upload>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col>
                                                            <div class="box">Please ensure that that image you upload is clear and verifiable.</div>
                                                        </Col>
                                                    </Form>
                                                </Col>
                                                <Table
                                                    columns={columns}
                                                    pagination={{ pageSize: 50 }}
                                                    scroll={{ x: '150vw' }}
                                                    style={{ marginTop: '2vw' }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={{ order: 2 }} sm={24} md={24} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                                        <Row justify="space-around" gutter={['', 24]}>
                                            <Col className="addressproof-card" xs={22} sm={24} md={24} lg={24} xl={24} span={24}>
                                                <Form >
                                                    <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                    <Col  >
                                                            <Button className="addressproof-btn1">Previous</Button>
                                                        </Col>
                                                        <Col >
                                                            <Button className="addressproof-btnn">Save & Submit</Button><br />
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </TabPane>

                </Tabs>
            </div>
        </div>
    )
}
export default UploadDocuments;