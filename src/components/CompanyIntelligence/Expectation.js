import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Radio, Tabs, Form, Input , Select, Button  } from 'antd';
import '../StatusLead/StatusLead.css'
import * as actions from "../../store/actions/index";
import _ from "lodash";


const tabMenu = [
    {
    id: 1,
    value: "Opportunity Details",
    },
    {
    id: 2,
    value: "Company Intelligence"
    },
    {
    id: 3,
    value: "History",
    },

]

const Expectation = (props) => {
    
    // const storeLeadId = useSelector((state) => state.newLead.leadId)
    // const storeUserId = useSelector((state) => state.newLead.userId)
    const dispatch = useDispatch()

    const _StoreData = useSelector((state) => state?.newLead?.formData);
    const user_id = useSelector((state) => state.login.user.id);
    // console.log('(((((((((_StoreData)))))))))---->>>>',_StoreData)
    // console.log('(((((((((leadDetails)))))))))---->>>>',props.leadDetails)


    const [ourAskData, setOurAskData] = useState("");
    const [redFlagData, setRedFlagData] = useState('');
    const [clientExpectationData, setClientExpectationData] = useState('');


    useEffect(() => {
        setOurAskData(!_StoreData.ourAskData ? '-' : _StoreData?.ourAskData)
        setRedFlagData(!_StoreData.redFlagData ? '-' : _StoreData?.redFlagData)
        setClientExpectationData(!_StoreData.clientExpectationData ? '-' : _StoreData?.clientExpectationData)
    }, []);
    
    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");

    const breakpoint = 620;
    const formItemLayout = {
        labelCol: {
            span: 24,
        },
        wrapperCol: {
            span: 24,
        },
    };

    const kdmRoleArr = [
        {label:'TBI',value:'TBI'}
    ]

    const onChangeOurAsk = (e) => {
        // console.warn('FIRSTNAME',e)
        
        setOurAskData(e.target.value);
    };

    const onChangeClientExpect = (e) => {
        setClientExpectationData(e.target.value);
    };

    const onChangeRedFlag = (e) => {
        setRedFlagData(e.target.value);
    };

    const updateExpectation = (event) =>{
        // let formBody = {
        //     ...props.updateFormData,
        //     client_expectations: clientExpectationData,
        //     red_flags: redFlagData,
        //     our_ask: ourAskData,
        // }

        let formBody = {
            company_details: {
              company_name: _StoreData?.company_id?.company_name,
              parent_company: _StoreData?.company_id?.parent_company,
              industry_name: _StoreData?.company_id?.industry_name,
              tata_aig_empaneled:_StoreData?.company_id?.tata_aig_empaneled === true ? 'Yes' : 'No',
              client_location: _StoreData?.company_id?.client_location,
            },
            leadStatus: _StoreData?.leadStatus,
            leadDisposition: _StoreData?.leadDisposition,
            leadsubDisposition: _StoreData?.leadsubDisposition,
            opportunity_name: _StoreData?.opportunity_name,
            tender_driven: _StoreData?.tender_driven === true ? 'Yes' : 'No',
            LOB_opportunity: _StoreData?.lob_for_opportunity,
            product_for_opportunity: _StoreData?.product_for_opportunity,
            remarks: _StoreData?.remarks,
            teamMembers : "[]",
            lead_Owner_Id: user_id,
            lead_Creator_Id: user_id,
            user_id: user_id,
            company_id: _StoreData?.company_id?._id,
            start_date: _StoreData?.start_date,
            start_time:_StoreData?.start_time,
            client_expectations: clientExpectationData,
            red_flags: redFlagData,
            our_ask: ourAskData,
            channel_name: _StoreData?.channel_name,
            producer: _StoreData?.producer,
            VAS_executed: _StoreData?.VAS_executed,
            kdm_details: _StoreData?.company_id?.kdm_details,
            risk_details: _StoreData?.company_id?.risk_details,
        }
        // console.warn('formBody ------>>>>>',formBody)
        dispatch(actions.fetchLeadUpdateBody(formBody))
        dispatch(actions.editLead(formBody, props.leadDetails.leadID))
    }

return (
    <>
        <Col
            className="form-body ci-p20 mb-2"
            xs={24}
            sm={24}
            md={16}
            lg={15}
            xl={20}
            span={23}
            >
            <p className="form-title">Expectation</p>
            <Row gutter={16} className="mb-2 statsLead kdmStyle">

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="kdmClientExpectation"
                        label="Client Expectation"
                        rules={[
                            // { required: true, message: "First Name is required",},
                            { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                        ]}
                        style={{ marginBottom: "1rem" }}
                    >
                        <Input
                            placeholder="Enter Client Expectation"
                            value={clientExpectationData}
                            // defaultValue={kdmName}
                            onChange={(item) => onChangeClientExpect(item)}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="kdmRedFlag"
                        label="Red Flags"
                        rules={[
                            // { required: true, message: "First Name is required",},
                            { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                        ]}
                        style={{ marginBottom: "1rem" }}
                    >
                        <Input
                            placeholder="Enter Red Flags"
                            value={redFlagData}
                            // defaultValue={kdmName}
                            onChange={(item) => onChangeRedFlag(item)}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="kdmOurAsk"
                        label="Our Ask"
                        rules={[
                            // { required: true, message: "First Name is required",},
                            { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                        ]}
                        style={{ marginBottom: "1rem" }}
                    >
                        <Input
                            placeholder="Enter Our Ask"
                            value={ourAskData}
                            // defaultValue={kdmName}
                            onChange={(item) => onChangeOurAsk(item)}
                        />
                    </Form.Item>
                </Col>


                
            </Row>
            <div  style={{display:'flex',flex:1,justifyContent:'flex-end',marginTop:20}}>
                <Button onClick={()=> updateExpectation()} style={{borderRadius:5,backgroundColor:'#3b371e',color:'#fff'}} >Save and Update</Button>
            </div>
        </Col>
    </>
)
}

export default Expectation

