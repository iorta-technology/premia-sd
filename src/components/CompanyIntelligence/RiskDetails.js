import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Radio, Tabs, Form, Input , Select, Button,Divider,Typography,Modal  } from 'antd';
import '../StatusLead/StatusLead.css'
import * as actions from "../../store/actions/history";
import _ from "lodash";
import { dataFormatting } from '../../helpers'
import axiosRequest from '../../axios-request/request.methods'  
import { PlusOutlined,PlusCircleOutlined , DeleteOutlined ,HomeFilled , EditOutlined } from '@ant-design/icons';

const { Text } = Typography;
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

const RiskDetails = () => {
    
    // const storeLeadId = useSelector((state) => state.newLead.leadId)
    // const storeUserId = useSelector((state) => state.newLead.userId)
    // const dispatch = useDispatch()
    const [noOfEntities, setNoOfEntities] = useState("");
    const [productNameData, setProductNameData] = useState("");
    const [totalPremData, setTotalPremData] = useState("");
    const [tagicPresence, setTagicPresence] = useState("");
    const [tagicPremium, setTagicPremium] = useState("");
    const [leadrFollowerData, setLeadrFollowerData] = useState("");
    const [leadInsurerData, setLeadInsurerData] = useState("");
    const [leaderShareData, setLeaderShareData] = useState("");
    

    const [showRiskDetailsPopup, setShowRiskDetailsPopup] = useState(false);
    
    
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

   
// useEffect(() => {
    
// }, []);

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
            <p className="form-title">Risk Details</p>
            <Row gutter={16} className="mb-2 statsLead kdmStyle" justify='space-between'>
                <div className='risk-card-det'>
                    <Row style={{padding:20,alignItems:'center'}} justify='space-between'>
                        <Row style={{alignItems:'center'}}>
                            <div className='risk-profile' style={{}}>
                                <HomeFilled style={{fontSize:25,color:'#00acc1'}}/>
                            </div>
                            <div style={{marginLeft:10}}>
                                <p className="risk-profile-name" style={{marginBottom:0}}>JSW Steels</p>
                                <p className="form-title" style={{marginBottom:0,color:'darkslategrey'}}>Risk 1</p>
                            </div>
                        </Row>
                        <div>
                            <DeleteOutlined style={{fontSize:25,color:'indianred'}}/>
                        </div>
                    </Row>
                    <Divider style={{marginTop:0,marginBottom:0}} />
                    <div style={{padding:15}}>
                        <Row style={{alignItems:'center'}} justify='space-between'>
                            <div style={{flex:1}}>
                                <p className="form-title" style={{marginBottom:0,color:'darkslategrey'}}>Total Premium</p>
                                <p className="form-title" style={{marginBottom:0,color:'grey'}}>100</p>
                            </div>
                            <div style={{flex:1}}>
                                <p className="form-title" style={{marginBottom:0,color:'darkslategrey'}}>Tagic Presence %</p>
                                <p className="form-title" style={{marginBottom:0,color:'grey'}}>0</p>
                            </div>
                        </Row>
                        <Row style={{alignItems:'center',marginTop:20}} justify='space-between'>
                            <div style={{flex:1}}>
                                <p className="form-title" style={{marginBottom:0,color:'darkslategrey'}}>Lead Insurer</p>
                                <p className="form-title" style={{marginBottom:0,color:'grey'}}>ICICI</p>
                            </div>
                            <div style={{flex:1}}>
                                <p className="form-title" style={{marginBottom:0,color:'darkslategrey'}}>Leader Share %</p>
                                <p className="form-title" style={{marginBottom:0,color:'grey'}}>40%</p>
                            </div>
                        </Row>
                    </div>
                    <Divider style={{marginTop:0,marginBottom:0}} />
                    <Row style={{alignItems:'center',padding:10,cursor:'pointer'}} justify='center'>
                        <EditOutlined style={{fontSize:16,color:'darkslategrey'}} />
                        <Text style={{marginLeft:5,color:'darkslategrey'}}>Edit</Text>
                    </Row>
                </div>

                <div className='risk-add' onClick={ ()=> setShowRiskDetailsPopup(true) }>
                    <PlusCircleOutlined style={{fontSize:40}} />
                    <p className="form-title" style={{color:'black',marginBottom:0,marginTop:10}}>ADD RISK DETAILS</p>
                </div>
            </Row>
            {/* <div  style={{display:'flex',flex:1,justifyContent:'flex-end',marginTop:20}}>
                <Button style={{borderRadius:5,backgroundColor:'#3b371e',color:'#fff'}} >Save and Update</Button>
            </div> */}
        </Col>
        
        <Modal 
            title="Risk Details" 
            centered={true} 
            visible={showRiskDetailsPopup}
            width={700}
            className="modalStyle"
            onCancel={()=> setShowRiskDetailsPopup(false)}
            footer={null}
            >

                <Col
                    className="mb-2"
                    xs={24}
                    sm={24}
                    md={16}
                    lg={15}
                    xl={24}
                    span={23}
                    >
                    <Row gutter={16} className="mb-2 statsLead kdmStyle">
                    
                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="entities"
                                label="No. of Entities"
                                style={{ marginBottom: "1rem" }}
                            >
                                <Input
                                    placeholder="Enter No. of Entities"
                                    value={noOfEntities}
                                    onChange={(item) => setNoOfEntities(item.target.value)}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="productName"
                                label="Product Name"
                                style={{ marginBottom: "1rem" }}
                            >
                                <Input
                                    placeholder="Enter Product Name"
                                    value={productNameData}
                                    onChange={(item) => setProductNameData(item.target.value)}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="totPrem"
                                label="Total Premium"
                                style={{ marginBottom: "1rem" }}
                            >
                                <Input
                                    placeholder="Enter Total Premium"
                                    value={totalPremData}
                                    onChange={(item) => setTotalPremData(item.target.value)}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="tagicPresence"
                                label="TAGIC Presence %"
                                style={{ marginBottom: "1rem" }}
                            >
                                <Input
                                    placeholder="Enter TAGIC Presence %"
                                    value={tagicPresence}
                                    onChange={(item) => setTagicPresence(item.target.value)}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="tagicPremium"
                                label="TAGIC Premium"
                                style={{ marginBottom: "1rem" }}
                            >
                                <Input
                                    placeholder="Enter TAGIC Premium"
                                    value={tagicPremium}
                                    onChange={(item) => setTagicPremium(item.target.value)}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="leadrFollowr"
                                label="Leader/Follower"
                                style={{ marginBottom: "1rem" }}
                            >
                                <Select
                                    bordered={true}
                                    placeholder="Select Leader/Follower"
                                    options={kdmRoleArr}
                                    value={leadrFollowerData}
                                    // defaultValue={citiesOptions}
                                    onChange={(item) => setLeadrFollowerData(item.target.value)}
                                ></Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="leadeInsurer"
                                label="Lead Insurer"
                                style={{ marginBottom: "1rem" }}
                            >
                                <Select
                                    bordered={true}
                                    placeholder="Select Lead Insurer"
                                    options={kdmRoleArr}
                                    value={leadInsurerData}
                                    // defaultValue={citiesOptions}
                                    onChange={(item) => setLeadInsurerData(item.target.value)}
                                ></Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="leaderShare"
                                label="Leader Share %"
                                style={{ marginBottom: "1rem" }}
                            >
                                <Input
                                    placeholder="Enter Leader Share %"
                                    value={leaderShareData}
                                    onChange={(item) => setLeaderShareData(item.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        
                        <div style={{display:'flex',flex:1,justifyContent:'center',marginTop:15}}>
                            <Button className='cancelBtn' onClick={()=> setShowRiskDetailsPopup(false)} size='large' >Cancel</Button>
                            <Button className='submitBtn' onClick={()=> setShowRiskDetailsPopup(false)} size='large'>Submit</Button>
                        </div>
                    </Row>
                    {/* <div  style={{display:'flex',flex:1,justifyContent:'flex-end',marginTop:20}}>
                        <Button style={{borderRadius:5,backgroundColor:'#3b371e',color:'#fff'}} >Save and Update</Button>
                    </div> */}
                </Col>
            
        </Modal>
    </>
)
}

export default RiskDetails

