import React, { useState } from 'react'
import { Row, Col, Form, Typography, Switch, Button, Input, Select, Radio, Modal, Space, DatePicker } from 'antd';
const { Title } = Typography;

const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};


const setInsurerOptions = [
    { value: 'reliencelife', label: 'Relience Life' }, { value: 'hdfclife', label: 'HDFC Life' },
    { value: 'iciciprudential', label: 'ICICI Prudential' }, { value: 'lic', label: 'LIC' },
    { value: 'edelweisss', label: 'Edwlweiss' }, { value: 'religare', label: 'Religare' },
]

const setPolicyTypeOptions = [
    { value: 'endowmentplans', label: 'Endowment Plans' }, { value: 'wholelifepolicy', label: 'Whole Life Policy' },
    { value: 'moneybackpolicy', label: 'Money Back Policy' }, { value: 'termplan', label: 'Term Plan' },
    { value: 'individual/familyfloater', label: 'Individual/FamilyFloater' },
]

const setPolicyStatusOptions = [
    { value: 'inforce', label: 'Inforced' }, { value: 'applied', label: 'Applied' },
    { value: 'declined', label: 'Declined' },
]

const setRelationOptions = [
    { value: 'father', label: 'Father' }, { value: 'mother', label: 'Mother' },
    { value: 'brother', label: 'Brother' }, { value: 'sister', label: 'Sister' },
]

const setHealthTypeOfPlanOptions = [
    { value: 'individual', label: 'Individual' },
    { value: 'familyfloater', label: 'Family Floater' },
]
const ProfessionalDetails = () => {
    // toggle buttons handler

    const [haveLifeInsurece, sethaveLifeInsurece] = useState(false)

    const lifeInsuranceToggle = () => {
        sethaveLifeInsurece(!haveLifeInsurece)
    }
    const [haveHealthInsurece, sethaveHealthInsurece] = useState(false)

    const healthInsuranceToggle = () => {
        sethaveHealthInsurece(!haveHealthInsurece)
    }

    const [haveChronicDisease, sethaveChronicDisease] = useState(false)

    const haveChronicDiseaseToggle = () => {
        sethaveChronicDisease(!haveChronicDisease)
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
                                <Switch checkedChildren="No" unCheckedChildren="Yes" defaultChecked={false} onChange={lifeInsuranceToggle} />
                            </Form.Item>
                            {haveLifeInsurece ?
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Button shape="round" size="large" block onClick={showLifeInsurancerModal}>Add Insurance Details</Button>
                                </Col> : null
                            }
                        </Col>
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
                                            name="Select Insurer"
                                            label="Insurer"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Set Insurer',
                                                },
                                            ]}
                                        >
                                            <Select options={setInsurerOptions} placeholder="Set Insurer"></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Sum Assured"
                                            label="Sum Assured"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Set Reminder',
                                                },
                                            ]}
                                        >
                                            <Input className="first-name border-bottom" placeholder="Enter Sum Assured" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Select Policy Type"
                                            label="Select Policy Type"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Select Policy Type',
                                                },
                                            ]}
                                        >
                                            <Select options={setPolicyTypeOptions} placeholder="Select Policy Type"></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Select Policy Status"
                                            label="Select Policy Status"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Select Policy Status',
                                                },
                                            ]}
                                        >
                                            <Select options={setPolicyStatusOptions} placeholder="Select Policy Status"></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Policy Number"
                                            label="Policy Number"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Enter Policy Number',
                                                },
                                            ]}
                                        >
                                            <Input className="first-name border-bottom" placeholder="Enter Policy NUmber" />
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
                                <Switch checkedChildren="No" unCheckedChildren="Yes" defaultChecked={false} onChange={healthInsuranceToggle} />
                            </Form.Item>
                            {haveHealthInsurece ?
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Button shape="round" size="large" block onClick={showHealthInsuranceModal}>Add Insurance Details</Button>
                                </Col> : null
                            }
                        </Col>
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
                                            name="Select Relation"
                                            label="Select Relation"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Select Relation',
                                                },
                                            ]}
                                        >
                                            <Select options={setRelationOptions} placeholder="Select Relation"></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Name"
                                            label="Name"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Enter Name',
                                                },
                                            ]}
                                        >
                                            <Input className="first-name border-bottom" placeholder="Enter The Name "></Input>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Date of Birth"
                                            label="Date of Birth"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Select Date of Birth',
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
                                            name="Types of Plan "
                                            label="Types of Plan "
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Types of Plan ',
                                                },
                                            ]}
                                        >
                                            <Select options={setHealthTypeOfPlanOptions} placeholder="Select Types of Plan"></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Sum Assured"
                                            label="Sum Assured"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Sum Assured',
                                                },
                                            ]}
                                        >
                                            <Input className="first-name border-bottom" placeholder="Enter Amount" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            className="form-item-name label-color"
                                            name="Risk Commencement Date"
                                            label="Risk Commencement Date"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Select Date of Birth',
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
                                            className="form-item-name label-color"
                                            name={['user', 'name']}
                                            label="Is Insured suffering from any chronic disease "
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Switch checkedChildren="No" unCheckedChildren="Yes" defaultChecked={false} onChange={haveChronicDiseaseToggle} />
                                        </Form.Item>
                                    </Col>
                                    {!haveChronicDisease ?
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <Form.Item
                                                {...formItemLayout}
                                                className="form-item-name label-color"
                                                name="Enter Details"
                                                label="Enter Details"
                                                hasFeedback
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Enter Details',
                                                    },
                                                ]}
                                            >
                                                <Input className="first-name border-bottom" placeholder="Enter Description" />
                                            </Form.Item>
                                        </Col>
                                        :null
                                    }
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
