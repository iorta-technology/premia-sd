import React, { useState } from 'react'
import { Row, Col, Form, Typography, Switch, Button, Input, Select, Radio, Modal } from 'antd';
const { Title } = Typography;

const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};

const ProfessionalDetails = () => {
    // toggle buttons handler

    const [haveLifeInsurece, sethaveLifeInsurece] = useState(false)

    const lifeInsuranceToggle = () => {
        sethaveLifeInsurece(!haveLifeInsurece)
        console.log(haveLifeInsurece)
    }
    const [haveHealthInsurece, sethaveHealthInsurece] = useState(false)

    const healthInsuranceToggle = () => {
        sethaveHealthInsurece(!haveHealthInsurece)
        console.log(haveHealthInsurece)
    }

    // life Insurance handler

    const [visibleLifeInsuranceMOdel, setVisibleLifeInsuranceMOdel] = useState(false);
    const [lifeInsuranceLoading, setLifeInsuranceLoading] = useState(false);
    const showLifeInsurancerModal = () => {
        setVisibleLifeInsuranceMOdel(true);
    };
    const lifeInsurancerCancel = () => {
        setVisibleLifeInsuranceMOdel(false);
    };
    const handleLifeInsurance = () => {
        // setModalText('Updating changes ');
        setLifeInsuranceLoading(true);
        setTimeout(() => {
            setVisibleLifeInsuranceMOdel(false);
            setLifeInsuranceLoading(false);
        }, 2000);
    };

    // health insurance handlers
    const [visibleHealthInsuranceMOdel, setVisibleHealthInsuranceMOdel] = useState(false);
    const [healthInsuranceLoading, setHealthInsuranceLoading] = useState(false);
    const showHealthInsuranceModal = () => {
        setVisibleHealthInsuranceMOdel(true);
    };
    const healthInsuranceCancel = () => {
        setVisibleHealthInsuranceMOdel(false);
    };
    const handleHealthInsurance = () => {
        // setModalText('Updating changes ');
        setHealthInsuranceLoading(true);
        setTimeout(() => {
            setVisibleHealthInsuranceMOdel(false);
            setHealthInsuranceLoading(false);
        }, 2000);
    };
    return (
        <div className="form-container">
            <Row gutter={[10, 24]}>
                <Col className="contact-details" xs={22} sm={24} md={15} lg={15} xl={15} >
                    <div className="form-title">
                        <Title level={4}>Existing Insurance</Title>
                    </div>
                    <Form layout="horizontal" className="contact-detail-form">
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item
                                className="form-item-name label-color"
                                name={['yes', 'no']}
                                label="Have life Insurance?"
                                rules={[
                                    {
                                        required: true,

                                    },
                                ]}
                            >
                                <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked={false} onChange={lifeInsuranceToggle} />
                            </Form.Item>
                        </Col>
                            {haveLifeInsurece ?
                                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                    <Button shape="round" size="large" block onClick={showLifeInsurancerModal}>Add Insurance Details</Button>
                                </Col>: null
                            }
                        <>
                            <Modal
                                title="Insurance Details"
                                centered={true}
                                visible={visibleLifeInsuranceMOdel}
                                onOk={handleLifeInsurance}
                                confirmLoading={lifeInsuranceLoading}
                                footer={[
                                    <Button key="cancel" onClick={lifeInsurancerCancel}>
                                        Cancel
                                    </Button>,
                                    <Button key="save" type="primary" >
                                        Save
                                    </Button>
                                ]}
                                onCancel={lifeInsurancerCancel}
                                width={700}
                            >
                                <Row gutter={[12, 10]}>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Select Designation"
                                            label="Select Designation"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Set Designation',
                                                },
                                            ]}
                                        >
                                            <Select  placeholder="Set Designation"></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Select Team Member"
                                            label="Select Team Member"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Set Reminder',
                                                },
                                            ]}
                                        >
                                            <Select  placeholder="Set Team Member"></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Select Designation"
                                            label="Select Designation"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Set Designation',
                                                },
                                            ]}
                                        >
                                            <Select  placeholder="Set Designation"></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Select Designation"
                                            label="Select Designation"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Set Designation',
                                                },
                                            ]}
                                        >
                                            <Select  placeholder="Set Designation"></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Select Designation"
                                            label="Select Designation"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Set Designation',
                                                },
                                            ]}
                                        >
                                            <Select  placeholder="Set Designation"></Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Modal>
                        </>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item
                                className="form-item-name label-color"
                                name={['user', 'name']}
                                label="Have health Insurance?"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked={false} onChange={healthInsuranceToggle} />
                            </Form.Item>
                        </Col>
                            {haveHealthInsurece ?
                                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                    <Button shape="round" size="large" block onClick={showHealthInsuranceModal}>Add Insurance Details</Button>
                                </Col>: null
                            }
                        <>
                            <Modal
                                title="Insurance Details"
                                centered={true}
                                visible={visibleHealthInsuranceMOdel}
                                onOk={handleHealthInsurance}
                                confirmLoading={healthInsuranceLoading}
                                footer={[
                                    <Button key="cancel" onClick={healthInsuranceCancel}>
                                        Cancel
                                    </Button>,
                                    <Button key="save" type="primary" >
                                        Save
                                    </Button>
                                ]}
                                onCancel={healthInsuranceCancel}
                                width={700}
                            >
                                <Row gutter={[12, 10]}>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Select Designation"
                                            label="Select Designation"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Set Designation',
                                                },
                                            ]}
                                        >
                                            <Select  placeholder="Set Designation"></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Select Designation"
                                            label="Select Designation"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Set Designation',
                                                },
                                            ]}
                                        >
                                            <Select  placeholder="Set Designation"></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Select Designation"
                                            label="Select Designation"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Set Designation',
                                                },
                                            ]}
                                        >
                                            <Select  placeholder="Set Designation"></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Select Designation"
                                            label="Select Designation"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Set Designation',
                                                },
                                            ]}
                                        >
                                            <Select  placeholder="Set Designation"></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Select Team Member"
                                            label="Select Team Member"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Set Reminder',
                                                },
                                            ]}
                                        >
                                            <Select  placeholder="Set Team Member"></Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Modal>
                        </>
                    </Form>
                </Col>
                <Col className="contact-details" xs={22} sm={24} md={15} lg={15} xl={15} >
                    <Button shape="round" size="large" style={{ marginRight: 'auto' }}>Previous</Button>
                    <Button shape="round" type="primary" size="large">Update</Button>
                    <Button shape="round" type="primary" size="large" style={{ marginLeft: 'auto' }}>Proceed</Button>
                </Col>
            </Row>
        </div>
    )
}

export default ProfessionalDetails
