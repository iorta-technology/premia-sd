import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Switch, Button, Input, Select, Modal, Space, DatePicker } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Tabs from '../Tab/Tab'
import LeadDetailsTab from './LeadDetailsTab';
import '../StatusLead/StatusLead.css'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import moment from 'moment';
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
    { value: 'Inforce', label: 'Inforced' }, { value: 'Applied', label: 'Applied' },
    { value: 'Declined', label: 'Declined' },
]

const setRelationOptions = [
    { value: 'Father', label: 'Father' }, { value: 'Mother', label: 'Mother' },
    { value: 'Brother', label: 'Brother' }, { value: 'Sister', label: 'Sister' },
]

const setHealthTypeOfPlanOptions = [
    { value: 'Individual', label: 'Individual' },
    { value: 'Family Floater', label: 'Family Floater' },
]

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

const ExistingInsurenceDetails = () => {
    let storeFormData = useSelector((state) => state.newLead.formData)

    const dispatch = useDispatch()
    const history = useHistory()
    const [width, setWidth] = useState(window.innerWidth);
    const [haveLifeInsurence, sethaveLifeInsurece] = useState(false)
    const [haveHealthInsurece, sethaveHealthInsurece] = useState(false)
    const [lifeInsuranceYes, setLifeInsuranceYes] = useState()
    const [healthInsurance, setHealthInsuranceYes] = useState()
    const [visibleHealthInsuranceMOdel, setVisibleHealthInsuranceModel] = useState(false);
    const [healthInsuranceLoading, setHealthInsuranceLoading] = useState(false);
    const [visibleLifeInsuranceMOdel, setVisibleLifeInsuranceModel] = useState(false);
    const [lifeInsuranceLoading, setLifeInsuranceLoading] = useState(false);
    const [insurer, setInsurer] = useState()
    const [lifeSumAssured, setLifeSumAssured] = useState()
    const [policyType, setPolicyType] = useState()
    const [policyStatus, setPolicyStatus] = useState()
    const [policyStatusInforce, setpolicyStatusInforce] = useState(false)
    const [policyStatusApplied, setpolicyStatusApplied] = useState(false)
    const [policyStatusDeclined, setpolicyStatusDeclined] = useState(false)
    const [policyNumber, setPolicyNumber] = useState()
    const [relation, setRelation] = useState()
    const [insurername, setInsurerName] = useState()
    const [dobOfInsurer, setDobOfInsurer] = useState()
    const [commencementDate, setCommencementDate] = useState()
    const [applicationDate, setApplicationDate] = useState()
    const [typeOfPlan, setTypeOfPlan] = useState()
    const [healthSumInsured, setHealthSumInsured] = useState()
    const [healthRiskDate, setHealthRiskDate] = useState()
    const [haveChronicDisease, sethaveChronicDisease] = useState(false)
    const [diseaseDescription, setDiseaseDescription] = useState()
    const breakpoint = 620;

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [width]);
    // toggle buttons handler


    const lifeInsuranceToggle = () => {
        sethaveLifeInsurece(!haveLifeInsurence)
        setLifeInsuranceYes('Yes')
    }

    const healthInsuranceToggle = () => {
        sethaveHealthInsurece(!haveHealthInsurece)
        setHealthInsuranceYes('Yes')
    }



    // Life Insurance handlers modal
    const insurerHandler = (value) => {
        setInsurer(value)
    }
    const LifeSumAssuredHandler = e => {
        setLifeSumAssured(e.target.value)
    }
    const policyTypeHandler = (value) => {
        setPolicyType(value)
    }
    const policyStatusHandler = (value) => {
        setPolicyStatus(value)
        if (value === 'Inforce') {
            setpolicyStatusInforce(true)
            setpolicyStatusApplied(false)
            setpolicyStatusDeclined(false)
        } else {
            setpolicyStatusInforce(false)
            setpolicyStatusApplied(true)
            setpolicyStatusDeclined(true)
        }
    }

    const policyNumberHandler = e => {
        setPolicyNumber(e.target.value)
    }

    const commencementDateHandler = (date, dateString) => {
        setCommencementDate(moment(date).valueOf())

    }
    const applicationDateHandler = (date, dateString) => {
        setApplicationDate(moment(date).valueOf())

    }
    const healthRiskDateHandler = (date, dateString) => {
        setHealthRiskDate(moment(date).valueOf())

    }

    const insurerDObHandler = (date, dateString) => {
        setDobOfInsurer(moment(date).valueOf())

    }


    // Health Insurance handlers modal

    const relationshipHandler = (value) => {
        setRelation(value)
    }

    const nameHandler = e => {
        setInsurerName(e.target.value)
    }
    const typeOfPlanHandler = (value) => {
        setTypeOfPlan(value)
    }

    const healthSumInsuredHandler = e => {
        setHealthSumInsured(e.target.value)
    }
    const descriptionHandler = e => {
        setDiseaseDescription(e.target.value)
    }

    const formData = {
        ...storeFormData,
        HaveLifeInsurance_details: [
            {
                id: 'insuzkypwg',
                Insurer: insurer,
                sum_Assured: lifeSumAssured,
                policy_Type: policyType,
                policy_Status: policyStatus,
                Comencedate: commencementDate,
                Appdate: applicationDate,
                policynumber: policyNumber
            }
        ],
        Insurancedetails:[
            {
                id:"insu0xivso",
                SelectRelation:relation,
                Name:insurername,
                DateofBirth:dobOfInsurer,
                IsInsuredsufferingfromanychronicdisease:"Yes",
                Description:diseaseDescription,
                planName:typeOfPlan,
                sumInsured:healthSumInsured,
                riskDate:healthRiskDate
            }
        ]

    };

    const proceedHandler = event => {
        event.preventDefault();
        dispatch(actions.storeLead(formData))
        history.push('productlead')
    };



    const haveChronicDiseaseToggle = () => {
        sethaveChronicDisease(!haveChronicDisease)
    }
    // life Insurance handler
    const showLifeInsurancerModal = () => {
        setVisibleLifeInsuranceModel(true);
    };
    const lifeInsurancerCancel = () => {
        setVisibleLifeInsuranceModel(false);
    };
    const handleLifeInsurance = () => {
        // setModalText('Updating changes ');
        setLifeInsuranceLoading(true);
        setTimeout(() => {
            setVisibleLifeInsuranceModel(false);
            setLifeInsuranceLoading(false);
        }, 2000);
    };

    // health insurance handlers
    const showHealthInsuranceModal = () => {
        setVisibleHealthInsuranceModel(true);
    };
    const healthInsuranceCancel = () => {
        setVisibleHealthInsuranceModel(false);
    };
    const handleHealthInsurance = () => {
        // setModalText('Updating changes ');
        setHealthInsuranceLoading(true);
        setTimeout(() => {
            setVisibleHealthInsuranceModel(false);
            setHealthInsuranceLoading(false);
        }, 2000);
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
                <Row gutter={[0, 20]} justify="center">
                    <Col xs={24} sm={22} md={4} offset={2}>
                        <LeadDetailsTab activeKey="4" />
                    </Col>
                    <Col className="m0a" xs={22} sm={22} md={17} >
                        <p className="form-title">Existing Insurance</p>
                        <Form layout="horizontal" className="form-body p40">
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '1rem' }}>
                                <Form.Item
                                    className="form-item-name label-color"
                                    name={['yes', 'no']}
                                    label="Have life Insurance?"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'This field is required',

                                        },
                                    ]}
                                >
                                    <Switch
                                        checkedChildren="No"
                                        unCheckedChildren="Yes"
                                        defaultChecked={false}
                                        onChange={lifeInsuranceToggle} />
                                </Form.Item>
                                {haveLifeInsurence ?
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
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
                                                        message: 'This field is required',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    size="large"
                                                    options={setInsurerOptions}
                                                    placeholder="Set Insurer"
                                                    onChange={insurerHandler}
                                                >
                                                </Select>
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
                                                        message: 'This field is required',

                                                    },
                                                ]}
                                            >
                                                <Input
                                                    className="first-name input-box"
                                                    placeholder="Enter Sum Assured"
                                                    onChange={LifeSumAssuredHandler} />
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
                                                        message: 'This field is required',

                                                    },
                                                ]}
                                            >
                                                <Select
                                                    size="large"
                                                    options={setPolicyTypeOptions}
                                                    placeholder="Select Policy Type"
                                                    onChange={policyTypeHandler}>
                                                </Select>
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
                                                <Select
                                                    size="large"
                                                    options={setPolicyStatusOptions}
                                                    placeholder="Select Policy Status"
                                                    onChange={policyStatusHandler}>
                                                </Select>
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
                                                <Input
                                                    className="first-name input-box"
                                                    placeholder="Enter Policy NUmber"
                                                    onChange={policyNumberHandler} />
                                            </Form.Item>
                                        </Col>
                                        {policyStatusInforce &&
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <Form.Item
                                                    {...formItemLayout}
                                                    className="form-item-name label-color datepicker"
                                                    name="Risk Commencement Date"
                                                    label="Risk Commencement Date"
                                                    hasFeedback
                                                    rules={[
                                                        {
                                                            required: false,
                                                            message: 'Risk Commencement Date',
                                                        },
                                                    ]}
                                                >
                                                    <DatePicker 
                                                        placeholder="dd/mm/yyyy"
                                                        size="large" 
                                                        style={{ width: "100%" }} />
                                                </Form.Item>
                                            </Col>
                                        }
                                        {(policyStatusApplied || policyStatusDeclined) &&
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <Form.Item
                                                    {...formItemLayout}
                                                    className="form-item-name label-color"
                                                    name="Application Date"
                                                    label="Application Date"
                                                    hasFeedback
                                                    rules={[
                                                        {
                                                            required: false,
                                                            message: 'Application Date',
                                                        },
                                                    ]}
                                                >
                                                    <DatePicker 
                                                        placeholder="dd/mm/yyyy" 
                                                        size="large" 
                                                        style={{ width: "100%" }}/>
                                                </Form.Item>
                                            </Col>
                                        }
                                    </Row>
                                </Modal>
                            </>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                <Form.Item
                                    className="form-item-name label-color"
                                    name={['yes', 'no']}
                                    label="Have health Insurance?"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'This field is required',

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
                                                <Select
                                                    size="large"
                                                    options={setRelationOptions}
                                                    placeholder="Select Relation"
                                                    onChange={relationshipHandler}>
                                                </Select>
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
                                                <Input
                                                    className="first-name input-box"
                                                    placeholder="Enter The Name "
                                                    onChange={nameHandler}>
                                                </Input>
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
                                                <DatePicker 
                                                    placeholder="dd/mm/yyyy"
                                                    size="large" 
                                                    style={{ width: "100%" }} />
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
                                                <Select
                                                    size="large"
                                                    options={setHealthTypeOfPlanOptions}
                                                    placeholder="Select Types of Plan"
                                                    onChange={typeOfPlanHandler}>
                                                </Select>
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
                                                        message: 'This field is required',

                                                    },
                                                ]}
                                            >
                                                <Input
                                                    className="first-name input-box"
                                                    placeholder="Enter Amount"
                                                    onChange={healthSumInsuredHandler}
                                                />
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
                                                <DatePicker 
                                                    placeholder="dd/mm/yyyy"
                                                    size="large" 
                                                    style={{ width: "100%" }} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                            <Form.Item
                                                className="form-item-name label-color"
                                                name={['yes', 'no']}
                                                label="Is Insured suffering from any chronic disease "
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'This field is required',

                                                    },
                                                ]}
                                            >
                                                <Switch checkedChildren="No" unCheckedChildren="Yes" defaultChecked={false} onChange={haveChronicDiseaseToggle} />
                                            </Form.Item>
                                        </Col>
                                        {haveChronicDisease ?
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
                                                            message: 'This field is required',

                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        className="first-name input-box"
                                                        placeholder="Enter Description"
                                                        onChange={descriptionHandler} />
                                                </Form.Item>
                                            </Col>
                                            : null
                                        }
                                    </Row>
                                </Modal>
                            </>
                        </Form>
                        <Col className='form-body  p20' style={{ margin: "20px 0" }} xs={{ order: 5 }} sm={24} md={20} lg={20} xl={20} span={24} >
                            <Row>
                                <Col xs={11} sm={12} md={4} offset={width > breakpoint ? 16 : 2} >
                                    <Button type="primary" shape="round" size="large" style={{ backgroundColor: 'rgb(0,172,193)', border: 'none' }} icon={<ArrowLeftOutlined />} >Previous</Button>
                                </Col>
                                <Col xs={11} sm={12} md={4}>
                                    <Button
                                        type="primary"
                                        shape="round"
                                        size="large"
                                        style={{ backgroundColor: 'rgb(228,106,37)', border: 'none' }}
                                        icon={<ArrowRightOutlined />}
                                        onClick={proceedHandler}>Proceed</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ExistingInsurenceDetails
