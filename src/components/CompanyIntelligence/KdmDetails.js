import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Steps, Timeline, Divider, Image, Tabs, Form, Input , Select, Button , DatePicker  } from 'antd';
import '../StatusLead/StatusLead.css'
// import * as actions from "../../store/actions/history";
import * as actions from "../../store/actions/index";
import _ from "lodash";
import { dataFormatting } from '../../helpers'
import axiosRequest from '../../axios-request/request.methods'  
import { PlusOutlined } from '@ant-design/icons';
import moment from "moment";


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

const kdmRolesArr = [
    {label:'EBI',value:'EBI'},
    {label:'TBI',value:'TBI'},
    {label:'UBI',value:'UBI'},
    {label:'Coach',value:'Coach'},
]

const KDMDetails = (props) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    
    // const storeLeadId = useSelector((state) => state.newLead.leadId)
    // const storeUserId = useSelector((state) => state.newLead.userId)
    const _StoreData = useSelector((state) => state?.newLead?.formData);
    const user_id = useSelector((state) => state.login.user.id);
    const states = useSelector((state) => state.address.states);
    console.log('(((((((((_StoreData)))))))))---->>>>',_StoreData)
    // console.log('(((((((((updateFormData)))))))))---->>>>',props.updateFormData)
    

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

    useEffect(() => {
        let _dataArr = []
        if(_StoreData?.company_id?.kdm_details.length > 0){
            _StoreData?.company_id?.kdm_details.map(el =>{
                // kdmDetArr.forEach(el =>{
                let _data = {
                    kdmName:el.decision_maker_name,
                    kdmRole:el.role,
                    kdmDesignation:el.designation,
                    kdmPrimContact:el.primaryContact,
                    kdmAltContact:el.alternateContact,
                    kdmEmailId:el.emailAddress,
                    kdmDOB: moment(el.date_of_birt, "MM/DD/YYYY"),
                    kdmState:el.state,
                    kdmCity:el.city,
                    kdmBranch:el.branch,
                    noOfKDM:''
                }
                _dataArr.push(_data)

                // form.setFieldsValue({
                //     kdmName:el.decision_maker_name,
                //     kdmRole:el.role,
                //     kdmDesig:el.designation,
                //     kdmPrimContact:el.primaryContact,
                //     kdmAltContact:el.alternateContact,
                //     kdmEmail:el.emailAddress,
                //     kdmDOB:el.date_of_birth,
                //     kdmState:el.state,
                //     kdmCity:el.state,
                //     kdmBranch:el.branch,
                // });
                    
                    // setkdmDetArr([...kdmDetArr,_data])
                // })
            })
            console.log('_dataArr========>>>>',_dataArr)
            setkdmDetArr(_dataArr)
        }

        dispatch(actions.fetchAllState(user_id));

    }, []);

    let stateOptions =
    states && !_.isEmpty(states)
      ? states.map((state) => {
          const label = state?.region_data?.name;
          const value = state?.region_data?.name;
          const newState = { ...state, label, value };
          // state.push(label)
          return newState;
        })
      : null;
  // stateOptions.unshift(_selectObj)
  // console.warn('stateOptions---------->>',stateOptions)

  const cities = useSelector((state) => state.address.cities);
  let citiesOptions =
    cities && !_.isEmpty(cities)
      ? cities.map((city) => {
          const label = city.name;
          const value = city.name;
          const newCities = { ...city, label, value };
          return newCities;
        })
      : null;

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

    const onChangeKdmName = (e,ind) => {
        // console.warn('FIRSTNAME',kdmDetArr)
        // console.warn('ind',ind)
        kdmDetArr[ind].kdmName = e.target.value
    };

    const onChangeKdmRole = (e,ind) => {
        kdmDetArr[ind].kdmRole = e
    };

    const onChangeKdmDesig = (e,ind) => {
        kdmDetArr[ind].kdmDesignation = e.target.value
    };

    const onChangeKdmPrimMob = (e,ind) => {
        kdmDetArr[ind].kdmPrimContact = e.target.value
    };

    const onChangeKdmAltMob = (e,ind) => {
        kdmDetArr[ind].kdmAltContact = e.target.value
    };

    const onChangeKdmEmail = (e,ind) => {
        kdmDetArr[ind].kdmEmailId = e.target.value
    };

    const onChangeKdmState = (e,ind) => {
        kdmDetArr[ind].kdmState = e
        kdmDetArr[ind].kdmCity = ''

        // if(cityProvince !== ''){
        //     setCityProvince("");
        //     form.setFieldsValue({ city: "" });
        // }
    };
    const stateSelectHandler = (value, key) => {
        // setCityProvince("");
        value !== "Select" &&
          dispatch(actions.fetchAllCities(key.region_data.adminCode1));
      };

    const onChangeKdmCity = (e,ind) => {
        kdmDetArr[ind].kdmCity = e
    };

    const onChangeKdmBranch = (e,ind) => {
        kdmDetArr[ind].kdmBranch = e.target.value
    };
    
    const onChangeKdmDOB = (date, kdmDOB,ind) => {
        // setKdmDOBData(kdmDOB);
        kdmDetArr[ind].kdmDOB = kdmDOB
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
        // console.warn('KDMMMM_______kdmArr',_kdmArr)
        setkdmDetArr([..._kdmArr])
        
    };

    const updateKDMDetails = async() =>{

        let _kdmDetailsData = []
        kdmDetArr.map(el =>{
            let _data = {
                decision_maker_name: el.kdmName,
                role: el.kdmRole,
                designation: el.kdmDesignation,
                primaryContact: el.kdmPrimContact,
                alternateContact: el.kdmAltContact,
                emailAddress: el.kdmEmailId,
                date_of_birth: el.kdmDOB,
                city: el.kdmCity,
                state: el.kdmState,
                branch: el.kdmBranch,
            }
            _kdmDetailsData.push(_data)
        })
        console.warn('_kdmDetailsData ------>>>>>',_kdmDetailsData)

        // let formBody = {
        //     ...props.updateFormData,
        //     kdm_details: _kdmDetailsData,
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
            client_expectations: _StoreData?.client_expectations,
            red_flags: _StoreData?.red_flags,
            our_ask: _StoreData?.our_ask,
            channel_name: _StoreData?.channel_name,
            producer: _StoreData?.producer,
            VAS_executed: _StoreData?.VAS_executed,
            kdm_details: _kdmDetailsData,
            risk_details: _StoreData?.company_id?.risk_details
        }

        console.warn('formBody ------>>>>>',formBody)
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
            
            { kdmDetArr &&
                kdmDetArr.map((el,index) =>(
                <>
                    <Form form={form} >
                        <Row style={{alignItems:'center'}} justify='space-between'>
                            <p className="form-title">{index + 1} - Key Decison Makers ( KDM ) Details</p>
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
                                        onChange={(item) => onChangeKdmName(item,index)}
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
                                        options={kdmRolesArr}
                                        value={el.kdmRole}
                                        
                                        // defaultValue={citiesOptions}
                                        onChange={(item) => onChangeKdmRole(item,index)}
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
                                        onChange={(item) => onChangeKdmDesig(item,index)}
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                                <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="kdmPrimContact"
                                    label="KDM Primary Contact"
                                    rules={[
                                        {
                                        required: false,
                                        message: "KDM Primary Contact is required",
                                        },
                                        {
                                        message: "Number must be 10 digits",
                                        pattern: new RegExp("^[6-9][0-9]{9}$"),
                                        },
                                        { message: "Only Numbers are Allowed",pattern: new RegExp(/^[0-9 ]+$/)},
                
                                    ]}
                                    style={{ marginBottom: "1rem" }}
                                >
                                    <Input
                                        placeholder="Enter KDM Primary Contact"
                                        value={el.kdmPrimContact}
                                        maxLength="10"
                                        // defaultValue={kdmName}
                                        onChange={(item) => onChangeKdmPrimMob(item,index)}
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                                <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="kdmAltContact"
                                    label="KDM Alternate Contact"
                                    rules={[
                                        {
                                        required: false,
                                        message: "KDM Alternate Contact is required",
                                        },
                                        {
                                        message: "Number must be 10 digits",
                                        pattern: new RegExp("^[6-9][0-9]{9}$"),
                                        },
                                        { message: "Only Numbers are Allowed",pattern: new RegExp(/^[0-9 ]+$/),},
                                    ]}
                                    style={{ marginBottom: "1rem" }}
                                >
                                    <Input
                                        placeholder="Enter KDM Alternate Contact"
                                        value={el.kdmAltContact}
                                        maxLength="10"
                                        // defaultValue={kdmName}
                                        onChange={(item) => onChangeKdmAltMob(item,index)}
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
                                        onChange={(item) => onChangeKdmEmail(item,index)}
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
                                        onChange={ (date,dateString) => onChangeKdmDOB(date,dateString,index) } 
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
                                        options={stateOptions}
                                        value={el.kdmState}
                                        onSelect={stateSelectHandler}
                                        // defaultValue={citiesOptions}
                                        onChange={(item) => onChangeKdmState(item,index)}
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
                                        options={citiesOptions}
                                        value={el.kdmCity}
                                        // defaultValue={citiesOptions}
                                        onChange={(item) => onChangeKdmCity(item,index)}
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
                                        onChange={(item) => onChangeKdmBranch(item,index)}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </>
                ))
            }
            { showKdmBtn === true &&
                <div style={{display:'flex',flex:1,justifyContent:'center'}}>
                    <Button style={{display:'flex',alignItems:'center',borderRadius:5}} onClick={()=> addKDM()} size='large' icon={<PlusOutlined />}>Add KDM</Button>
                </div>
            }

            
            <div  style={{display:'flex',flex:1,justifyContent:'flex-end',marginTop:20}}>
                <Button onClick={()=> updateKDMDetails()} style={{borderRadius:5,backgroundColor:'#3b371e',color:'#fff'}} >Save and Update</Button>
            </div>
        </Col>
    </>
)
}

export default KDMDetails

