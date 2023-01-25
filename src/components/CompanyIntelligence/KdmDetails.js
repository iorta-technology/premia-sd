import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Steps, Timeline, Divider, Image, Tabs, Form, Input , Select, Button , DatePicker  } from 'antd';
import '../StatusLead/StatusLead.css'
import * as actions from "../../store/actions/history";
import _ from "lodash";
import { dataFormatting } from '../../helpers'
import axiosRequest from '../../axios-request/request.methods'  
import { PlusOutlined } from '@ant-design/icons';


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

const KDMDetails = () => {
    
    // const storeLeadId = useSelector((state) => state.newLead.leadId)
    // const storeUserId = useSelector((state) => state.newLead.userId)
    // const dispatch = useDispatch()


    const [kdmName, setKdmName] = useState("");
    const [kdmRole, setKdmRole] = useState("");
    const [kdmDesigData, setKdmDesigData] = useState("");
    const [kdmPrimContData, setKdmPrimContData] = useState("");
    const [kdmAltContData, setKdmAltContData] = useState("");
    const [kdmEmailId, setKdmEmailId] = useState("");
    const [kdmDOBData, setKdmDOBData] = useState("");
    const [kdmStateData, setKdmStateData] = useState("");
    const [kdmCityData, setKdmCityData] = useState("");
    const [kdmBranchData, setKdmBranchData] = useState("");
    const [kdmDetCount, setKdmDetCount] = useState(2);
    const [showKdmBtn, setShowKdmBtn] = useState(true);
    const [kdmDetArr, setkdmDetArr] = useState([
        {
            kdmName:'',
            kdmRole:'',
            kdmDesignation:'',
            kdmPrimContact:'',
            kdmAltContact:'',
            kdmEmailId:'',
            kdmDOB:'',
            kdmState:'',
            kdmCity:'',
            kdmBranch:'',
            noOfKDM:''
        },
    ]);

    let { innerWidth: width, innerHeight: height } = window;
    // let kdmDetCount = 1
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

    const onChangeKdmName = (e) => {
        // console.warn('FIRSTNAME',e)
        setKdmName(e.target.value);
    };

    const onChangeKdmRole = (e) => {
        setKdmRole(e.target.value);
    };

    const onChangeKdmDOB = (date, dateString) => {
        setKdmDOBData(dateString);
    };

    const addKDM = (data) => {
        let _count = kdmDetCount
        setKdmDetCount(_count+1)
        if(kdmDetArr.length !== 4){
            let _data = {
                kdmName:'',
                kdmRole:'',
                kdmDesignation:'',
                kdmPrimContact:'',
                kdmAltContact:'',
                kdmEmailId:'',
                kdmDOB:'',
                kdmState:'',
                kdmCity:'',
                kdmBranch:'',
                noOfKDM:kdmDetCount + ' - '
            }
            setkdmDetArr([...kdmDetArr,_data])
            // kdmDetArr.forEach((el,index) =>{
            //     el.noOfKDM = (index+1) + ' - '
            //     return el
            // })
            // setkdmDetArr([...kdmDetArr,_data])

        }
        kdmDetArr.length === 3 ? setShowKdmBtn(false) : setShowKdmBtn(true)
        
    };

    const deleteKDM = (data,ind) => {
        console.warn('KDMMMM',data)
        let _kdmArr = kdmDetArr.filter(el => el.noOfKDM !== data.noOfKDM)

        if(_kdmArr.length === 2){
            _kdmArr[0].noOfKDM = ''
            _kdmArr[1].noOfKDM = '2 - '
        }else if(_kdmArr.length === 3){
            _kdmArr[0].noOfKDM = ''
            _kdmArr[1].noOfKDM = '2 - '
            _kdmArr[2].noOfKDM = '3 - '
        }else if(_kdmArr.length === 4){
            _kdmArr[0].noOfKDM = ''
            _kdmArr[1].noOfKDM = '2 - '
            _kdmArr[2].noOfKDM = '3 - '
            _kdmArr[3].noOfKDM = '4 - '
        }else{
            _kdmArr[0].noOfKDM = ''
        }
        // console.warn('KDMMMM_______kdmArr',_kdmArr)
        setkdmDetArr([..._kdmArr])
        
    };
    
    
    
   
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
            
            { kdmDetArr &&
                kdmDetArr.map((el,index) =>(
                <>
                    <Row style={{alignItems:'center'}} justify='space-between'>
                        <p className="form-title">{el.noOfKDM}Key Decison Makers ( KDM ) Details</p>
                        { el.noOfKDM !== '' &&
                            <p onClick={()=> deleteKDM(el,index)} style={{color:'indianred',fontSize:14,cursor: 'pointer'}}>DELETE</p>
                        }
                    </Row>
                    <Row gutter={16} className="statsLead kdmStyle" style={{marginBottom:40}}>
                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="kdmName"
                                label="Key Decison Maker Name"
                                rules={[
                                    // { required: true, message: "First Name is required",},
                                    { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                                ]}
                                style={{ marginBottom: "1rem" }}
                            >
                                <Input
                                    placeholder="Enter Key Decison Maker Name"
                                    value={el.kdmName}
                                    // defaultValue={kdmName}
                                    onChange={(item) => onChangeKdmName(item)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="kdmRole"
                                label="KDM Role"
                                style={{ marginBottom: "1rem" }}
                            >
                                <Select
                                    bordered={true}
                                    placeholder="Select KDM Role"
                                    options={el.kdmRole}
                                    value={kdmRole}
                                    // defaultValue={citiesOptions}
                                    onChange={(item) => onChangeKdmRole(item)}
                                ></Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="kdmDesig"
                                label="KDM Designation"
                                // rules={[
                                //     // { required: true, message: "First Name is required",},
                                //     { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                                // ]}
                                style={{ marginBottom: "1rem" }}
                            >
                                <Input
                                    placeholder="Enter KDM Designation"
                                    value={el.kdmDesignation}
                                    // defaultValue={kdmName}
                                    onChange={(item) => onChangeKdmName(item)}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="kdmPrimContact"
                                label="KDM Primary Contact"
                                // rules={[
                                //     // { required: true, message: "First Name is required",},
                                //     { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                                // ]}
                                style={{ marginBottom: "1rem" }}
                            >
                                <Input
                                    placeholder="Enter KDM Primary Contact"
                                    value={el.kdmPrimContact}
                                    // defaultValue={kdmName}
                                    onChange={(item) => onChangeKdmName(item)}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="kdmAltContact"
                                label="KDM Alternate Contact"
                                // rules={[
                                //     // { required: true, message: "First Name is required",},
                                //     { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                                // ]}
                                style={{ marginBottom: "1rem" }}
                            >
                                <Input
                                    placeholder="Enter KDM Alternate Contact"
                                    value={el.kdmAltContact}
                                    // defaultValue={kdmName}
                                    onChange={(item) => onChangeKdmName(item)}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="kdmEmail"
                                label="KDM Email ID"
                                // rules={[
                                //     // { required: true, message: "First Name is required",},
                                //     { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                                // ]}
                                style={{ marginBottom: "1rem" }}
                            >
                                <Input
                                    placeholder="Enter KDM Email ID"
                                    value={el.kdmEmailId}
                                    // defaultValue={kdmName}
                                    onChange={(item) => onChangeKdmName(item)}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="kdmDOB"
                                label="Date Of Birth"
                                style={{ marginBottom: "1rem" }}
                            >
                                <DatePicker 
                                    onChange={ onChangeKdmDOB } 
                                    value={el.kdmDOB}
                                    format="DD-MM-YYYY"
                                    style={{display:'flex',flex:1}}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="kdmState"
                                label="State"
                                style={{ marginBottom: "1rem" }}
                            >
                                <Select
                                    bordered={true}
                                    placeholder="Select State"
                                    options={kdmRoleArr}
                                    value={el.kdmState}
                                    // defaultValue={citiesOptions}
                                    onChange={(item) => onChangeKdmRole(item)}
                                ></Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="kdmCity"
                                label="City"
                                style={{ marginBottom: "1rem" }}
                            >
                                <Select
                                    bordered={true}
                                    placeholder="Select City"
                                    options={kdmRoleArr}
                                    value={el.kdmCity}
                                    // defaultValue={citiesOptions}
                                    onChange={(item) => onChangeKdmRole(item)}
                                ></Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                            <Form.Item
                                {...formItemLayout}
                                className="form-item-name label-color"
                                name="kdmBranch"
                                label="Branch (if applicable)"
                                // rules={[
                                //     // { required: true, message: "First Name is required",},
                                //     { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                                // ]}
                                style={{ marginBottom: "1rem" }}
                            >
                                <Input
                                    placeholder="Enter Branch"
                                    value={el.kdmBranch}
                                    // defaultValue={kdmName}
                                    onChange={(item) => onChangeKdmName(item)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
                ))
            }
            { showKdmBtn === true &&
                <div style={{display:'flex',flex:1,justifyContent:'center'}}>
                    <Button style={{display:'flex',alignItems:'center',borderRadius:5}} onClick={()=> addKDM()} size='large' icon={<PlusOutlined />}>Add KDM</Button>
                </div>
            }

            
            <div  style={{display:'flex',flex:1,justifyContent:'flex-end',marginTop:20}}>
                <Button style={{borderRadius:5,backgroundColor:'#3b371e',color:'#fff'}} >Save and Update</Button>
            </div>
        </Col>
    </>
)
}

export default KDMDetails

