import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Switch, Button, Input, Select, Modal, Space, DatePicker,Table } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined,CloseCircleOutlined,FileTextOutlined } from '@ant-design/icons';
import Tabs from '../Tab/Tab'
import LeadDetailsTab from './LeadDetailsTab';
import '../StatusLead/StatusLead.css'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import moment from 'moment';
import { random } from 'lodash';
const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};


const setInsurerOptions = [
    { value: 'Relience Life', label: 'Relience Life' }, { value: 'HDFC Life', label: 'HDFC Life' },
    { value: 'ICICI Prudential', label: 'ICICI Prudential' }, { value: 'LIC', label: 'LIC' },
    { value: 'Edwlweiss', label: 'Edwlweiss' }, { value: 'Religare', label: 'Religare' },
]

const setPolicyTypeOptions = [
    { value: 'Endowment Plans', label: 'Endowment Plans' }, { value: 'Whole Life Policy', label: 'Whole Life Policy' },
    { value: 'Money Back Policy', label: 'Money Back Policy' }, { value: 'Term Plan', label: 'Term Plan' },
    { value: 'Individual/FamilyFloater', label: 'Individual/FamilyFloater' },
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
    let lifeObjDisplay = useSelector((state) => state.newLead.HaveLifeInsurance_details)
    let healthObjDisplay = useSelector((state) => state.newLead.Insurancedetails)
    const storeLeadId = useSelector((state) => state.newLead.leadId)
    let storeLifeInsArr = useSelector((state) => state.newLead.HaveLifeInsurance_details)
    let storeHealthInsArr = useSelector((state) => state.newLead.Insurancedetails)

    const dispatch = useDispatch()
    const history = useHistory()
    const [form] = Form.useForm();
    const [width, setWidth] = useState(window.innerWidth);
    const [haveLifeInsurence, sethaveLifeInsurece] = useState(false)
    const [haveHealthInsurece, sethaveHealthInsurece] = useState(false)
    const [lifeInsuranceYes, setLifeInsuranceYes] = useState()
    const [healthInsuranceYes, setHealthInsuranceYes] = useState()
    const [visibleHealthInsuranceMOdel, setVisibleHealthInsuranceModel] = useState(false);
    const [healthInsuranceLoading, setHealthInsuranceLoading] = useState(false);
    const [visibleLifeInsuranceMOdel, setVisibleLifeInsuranceModel] = useState(false);
    const [lifeInsuranceLoading, setLifeInsuranceLoading] = useState(false);
    const [insurer, setInsurer] = useState('')
    const [lifeSumAssured, setLifeSumAssured] = useState('')
    const [policyType, setPolicyType] = useState('')
    const [policyStatus, setPolicyStatus] = useState('')
    const [policyStatusInforce, setpolicyStatusInforce] = useState(false)
    const [policyStatusApplied, setpolicyStatusApplied] = useState(false)
    const [policyStatusDeclined, setpolicyStatusDeclined] = useState(false)
    const [policyNumber, setPolicyNumber] = useState('')
    const [relation, setRelation] = useState('')
    const [insurername, setInsurerName] = useState('')
    const [dobOfInsurer, setDobOfInsurer] = useState('')
    const [commencementDate, setCommencementDate] = useState('')
    const [applicationDate, setApplicationDate] = useState('')
    const [typeOfPlan, setTypeOfPlan] = useState('')
    const [healthSumInsured, setHealthSumInsured] = useState('')
    const [healthRiskDate, setHealthRiskDate] = useState('')
    const [haveChronicDisease, sethaveChronicDisease] = useState(false)
    const [diseaseDescription, setDiseaseDescription] = useState('')
    const [lifeInsObj, setlifeInsObj] = useState()
    const [healthInsObj, setHealthInsObj] = useState()
    const breakpoint = 620;

    useEffect(() => {
        form.resetFields()
        form.setFieldsValue({
            // life ins
            "insurer":insurer,
            "lifeSumAssured":lifeSumAssured,
            "policyType":policyType,
            "policyStatus":policyStatus,
            "policyNumber":policyNumber,
            "lifeApplicationDate":applicationDate,
            "lifeRiskCommencementDate":commencementDate,

            // health Ins
            "relation":relation,
            "Name":insurername,
            "dateOfBirth":dobOfInsurer,
            "typeOfPlan":typeOfPlan,
            "sumAssured":healthSumInsured,
            "riskCommencementDate":healthRiskDate,
            "chronicDisease":haveChronicDisease,
            "diseaseDesc":diseaseDescription,
        })
        console.log(healthInsObj)
        console.log(lifeInsObj)
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [
        insurer,
        lifeSumAssured,
        width,
    ]);


    const lifeInsuranceToggle = () => {
        sethaveLifeInsurece(!haveLifeInsurence)
        if(haveHealthInsurece){
            setLifeInsuranceYes('Yes')
        }else{
            setLifeInsuranceYes('No')
        }
    }

    const healthInsuranceToggle = () => {
        sethaveHealthInsurece(!haveHealthInsurece)
        if(haveHealthInsurece){
            setHealthInsuranceYes('Yes')
        }else{
            setHealthInsuranceYes('No')
        }
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

    const updateHealthModalObject=(record)=>{
        const {
            SelectRelation,
            Name,
            DateofBirth,
            IsInsuredsufferingfromanychronicdisease,
            Description,
            planName,
            sumInsured,
            riskDate
        } = record
        form.setFieldsValue({
            "relation":relation,
            "Name":insurername,
            "dateOfBirth":dobOfInsurer,
            "typeOfPlan":typeOfPlan,
            "sumAssured":healthSumInsured,
            "riskCommencementDate":healthRiskDate,
            "chronicDisease":haveChronicDisease,
            "diseaseDesc":diseaseDescription,
        })
        setRelation(SelectRelation)
        setInsurerName(Name)
        setDobOfInsurer(DateofBirth)
        setTypeOfPlan(planName)
        setHealthSumInsured(sumInsured)
        setHealthRiskDate(riskDate)
        setDiseaseDescription(Description)
        sethaveChronicDisease(IsInsuredsufferingfromanychronicdisease)
        setVisibleHealthInsuranceModel(true)
    }
    const updateLifeModalObject=(record)=>{
        const {
            Insurer,
            sum_Assured,
            policy_Type,
            policy_Status,
            Comencedate,
            Appdate,
            policynumber,
        } = record
        form.setFieldsValue({
            "insurer":insurer,
            "lifeSumAssured":lifeSumAssured,
            "policyType":policyType,
            "policyStatus":policyStatus,
            "policyNumber":policyNumber,
            "lifeApplicationDate":applicationDate,
            "lifeRiskCommencementDate":commencementDate,
        })
        setInsurer(Insurer)
        setLifeSumAssured(sum_Assured)
        setPolicyType(policy_Type)
        setPolicyStatus(policy_Status)
        setCommencementDate(Comencedate)
        setApplicationDate(Appdate)
        setPolicyNumber(policynumber)
        setVisibleLifeInsuranceModel(true)
    }
    
    // console.log(relation)
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

    const randomId =()=>{
        let randomChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for ( let i = 0; i < 6; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    const formData = {

        ...storeFormData,
        HaveLifeInsurance_details: [
            
            {
                id: 'insu'+randomId(),
                Insurer: insurer,
                sum_Assured: lifeSumAssured,
                policy_Type: policyType,
                policy_Status: policyStatus,
                Comencedate: commencementDate,
                Appdate: applicationDate,
                policynumber: policyNumber
            },
        ],
        Insurancedetails:[
            {
                id:"insu"+randomId(),
                SelectRelation:relation,
                Name:insurername,
                DateofBirth:dobOfInsurer,
                IsInsuredsufferingfromanychronicdisease:healthInsuranceYes,
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

    const updateHandler = event => {
        event.preventDefault();
        
        dispatch(actions.storeLead(formData,storeLeadId))
        history.push('productlead')
    };
    const saveLifeInsurane = event => {
        event.preventDefault();

       storeLifeInsArr.push({
            id: 'insu'+ randomId(),
            Insurer: insurer,
            sum_Assured: lifeSumAssured,
            policy_Type: policyType,
            policy_Status: policyStatus,
            Comencedate: commencementDate,
            Appdate: applicationDate,
            policynumber: policyNumber
        })
        setlifeInsObj(storeLifeInsArr)
        const formData = {
            ...storeFormData,
            HaveLifeInsurance_details:[
                ...storeLifeInsArr
            ]
        }
        console.log(storeLifeInsArr)
        dispatch(actions.storeLead(formData))
        setVisibleLifeInsuranceModel(false);
    };
    useEffect(() => {
        console.log(lifeInsObj)
        console.log(storeLifeInsArr)
    }, [storeLifeInsArr,storeHealthInsArr,lifeInsObj])
    const lifeInsColumn = [
        {
            title: 'Insurer',
            dataIndex: 'Insurer',
        },
        {
            title: 'Sum Assured',
            dataIndex: 'sum_Assured',
        },
        {
            title: 'Policy Type',
            dataIndex: 'policy_Type',
        },
        {
            title: 'Policy Status',
            dataIndex: 'policy_Status',
        },
        {
            title: 'Risk',
            dataIndex: 'Comencedate',
            render:(Comencedate) => { return (<p>{moment(Comencedate).format('DD-MM-YYYY')}</p>)}
        },
        {
            title: 'Application Date',
            dataIndex: 'Appdate',
            render:(Appdate) => { return (<p>{moment(Appdate).format('DD-MM-YYYY')}</p>)}
        },
        {
            title: 'Policy Number',
            dataIndex: 'policynumber',
        },
        {
            title: 'Action',
            render:(record)=>{
                return <CloseCircleOutlined  onClick={()=>updateLifeModalObject(record)}/>   
            }
        },
    ]
    const saveHealthInsurance = event => {
        event.preventDefault();
        storeHealthInsArr.push({
            id: 'insu'+ randomId(),
            SelectRelation:relation,
            Name:insurername,
            DateofBirth:dobOfInsurer,
            IsInsuredsufferingfromanychronicdisease:healthInsuranceYes,
            Description:diseaseDescription,
            planName:typeOfPlan,
            sumInsured:healthSumInsured,
            riskDate:healthRiskDate
        })
        setHealthInsObj(storeHealthInsArr)
        const formData = {
            ...storeFormData,
            Insurancedetails:[
                ...storeHealthInsArr
            ]
        }
        dispatch(actions.storeLead(formData))
        setVisibleHealthInsuranceModel(false);
    };
    
    const healthInsColumn = [
        {
            title: 'Relation',
            dataIndex: 'SelectRelation',
        },
        {
            title: 'Name',
            dataIndex: 'Name',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'DateofBirth',
            render:(dobOfInsurer) => { return (<p>{moment(dobOfInsurer).format('DD-MM-YYYY')}</p>)}

        },
        {
            title: 'Plan Name',
            dataIndex: 'planName',
        },
        {
            title: 'Sum Insured',
            dataIndex: 'sumInsured',
        },
        {
            title: 'Risk Date',
            dataIndex: 'riskDate',
            render:(Appdate) => { return (<p>{moment(Appdate).format('DD-MM-YYYY')}</p>)}
        },
        {
            title: 'Any Chronic Disease',
            dataIndex: 'IsInsuredsufferingfromanychronicdisease',
        },
        {
            title: 'Action',
            render:(record)=>{
                return <CloseCircleOutlined  onClick={()=>updateHealthModalObject(record)}/>   
            }
        },
    ]

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
                        <LeadDetailsTab activeKey="4" />
                    <Col className="m0a" xs={22} sm={22} md={17} >
                        <Col className="form-body p40" xs={24} sm={24} md={20} lg={20} xl={20} >

                        <p className="form-title">Existing Insurance</p>
                        <Form 
                            layout="horizontal" 
                            initialValues={{
                                // life insurance
                                "insurer":insurer,
                                "lifeSumAssured":lifeSumAssured,
                                "policyType":policyType,
                                "policyStatus":policyStatus,
                                "policyNumber":policyNumber,
                                "lifeApplicationDate":applicationDate,
                                "lifeRiskCommencementDate":commencementDate,
                                // health insurance

                                "relation":relation,
                                "Name":insurername,
                                "dateOfBirth":dobOfInsurer,
                                "typeOfPlan":typeOfPlan,
                                "sumAssured":healthSumInsured,
                                "riskCommencementDate":healthRiskDate,
                                "chronicDisease":haveChronicDisease,
                                "diseaseDesc":diseaseDescription,
                            }}
                            >
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
                            <Table 
                                dataSource={lifeInsObj}
                                columns={lifeInsColumn}
                                rowKey={record => record.id}
                                scroll={{x:1500}}
                                />
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
                                        <Button 
                                            key="save" 
                                            type="primary" 
                                            onClick={saveLifeInsurane}
                                            >
                                            Save</Button>
                                    ]}
                                    onCancel={lifeInsurancerCancel}
                                    width={700}
                                >
                                    <Row gutter={[12, 10]}>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <Form.Item
                                                {...formItemLayout}
                                                className="form-item-name label-color"
                                                name="insurer"
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
                                                    value={insurer}
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
                                                name="lifeSumAssured"
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
                                                    value={lifeSumAssured}
                                                    className="first-name input-box"
                                                    placeholder="Enter Sum Assured"
                                                    onChange={LifeSumAssuredHandler} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <Form.Item
                                                {...formItemLayout}
                                                className="form-item-name label-color"
                                                name="policyType"
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
                                                    value={policyType}
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
                                                name="policyStatus"
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
                                                    value={policyStatus}
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
                                                name="policyNumber"
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
                                                    value={policyNumber}
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
                                                    name="lifeRiskCommencementDate"
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
                                                        value={commencementDate}
                                                        placeholder="dd/mm/yyyy"
                                                        size="large" 
                                                        style={{ width: "100%" }} 
                                                        onChange={commencementDateHandler}/>
                                                </Form.Item>
                                            </Col>
                                        }
                                        {(policyStatusApplied || policyStatusDeclined) &&
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <Form.Item
                                                    {...formItemLayout}
                                                    className="form-item-name label-color"
                                                    name="lifeApplicationDate"
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
                                                        value={applicationDate}
                                                        placeholder="dd/mm/yyyy" 
                                                        size="large" 
                                                        style={{ width: "100%" }}
                                                        onChange={applicationDateHandler}/>
                                                </Form.Item>
                                            </Col>
                                        }
                                    </Row>
                                </Modal>
                            </>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: '1rem' }}>
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
                            <Table 
                                dataSource={healthInsObj}
                                columns={healthInsColumn}
                                rowKey={record => record.id}
                                scroll={{x:1500}}
                                />
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
                                        <Button 
                                            key="save" 
                                            type="primary" 
                                            onClick={saveHealthInsurance}
                                            >Save</Button>
                                    ]}
                                    onCancel={healthInsuranceCancel}
                                    width={700}
                                >
                                    <Row gutter={[12, 10]}>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <Form.Item
                                                {...formItemLayout}
                                                className="form-item-name label-color"
                                                name="relation"
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
                                                    value={relation}
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
                                                    value={insurername}
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
                                                name="dateOfBirth"
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
                                                    value={dobOfInsurer}
                                                    placeholder="dd/mm/yyyy"
                                                    size="large" 
                                                    style={{ width: "100%" }} 
                                                    onChange={insurerDObHandler}/>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <Form.Item
                                                {...formItemLayout}
                                                className="form-item-name label-color"
                                                name="typeOfPlan"
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
                                                    value={typeOfPlan}
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
                                                name="sumAssured"
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
                                                    value={healthSumInsured}
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
                                                name="riskCommencementDate"
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
                                                    value={healthRiskDate} 
                                                    placeholder="dd/mm/yyyy"
                                                    size="large" 
                                                    style={{ width: "100%" }} 
                                                    onChange={healthRiskDateHandler}/>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                            <Form.Item
                                                className="form-item-name label-color"
                                                name='chronicDisease'
                                                label="Is Insured suffering from any chronic disease "
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'This field is required',

                                                    },
                                                ]}
                                            >
                                                <Switch value={haveChronicDisease} checkedChildren="No" unCheckedChildren="Yes" defaultChecked={false} onChange={haveChronicDiseaseToggle} />
                                            </Form.Item>
                                        </Col>
                                        {haveChronicDisease ?
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <Form.Item
                                                    {...formItemLayout}
                                                    className="form-item-name label-color"
                                                    name="diseaseDesc"
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
                                                        value={diseaseDescription}
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
                        </Col>
                        <Col className='form-body  p20' style={{ margin: "20px 0" }} xs={{ order: 5 }} sm={24} md={24} lg={20} xl={20} span={24} >
                            <Row>
                                <Col xs={11} sm={12} md={4} offset={width > breakpoint ? 12 : 2} >
                                    <Button 
                                        type="primary" 
                                        // shape="round" 
                                        size="large" style={{ backgroundColor: 'rgb(0,172,193)', border: 'none' }} icon={<ArrowLeftOutlined />} >Previous</Button>
                                </Col>
                                <Col xs={11} sm={12} md={4} >
                                    <Button 
                                        type="primary" 
                                        // shape="round" 
                                        size="large" 
                                        style={{ backgroundColor: 'rgb(0,172,193)', border: 'none' }} 
                                        icon={<FileTextOutlined />} htmlType="submit"
                                        // disabled={!formIsValid}
                                        onClick={updateHandler}
                                    >Update</Button>
                                </Col>
                                <Col xs={11} sm={12} md={4}>
                                    <Button
                                        type="primary"
                                        // shape="round"
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
