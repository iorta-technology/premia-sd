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
    // const [form] = Form.useForm();
    
    // const storeLeadId = useSelector((state) => state.newLead.leadId)
    // const storeUserId = useSelector((state) => state.newLead.userId)
    const _StoreData = useSelector((state) => state?.newLead?.formData);
    const _UpdateFormBody = useSelector((state) => state?.newLead?.leadUpdateFormdata);
    const user_id = useSelector((state) => state.login.user.id);
    const states = useSelector((state) => state.address.states);
    console.log('(((((((((_StoreData)))))))))---->>>>',_StoreData)
    console.log('(((((((((leadDetails)))))))))---->>>>',props.leadDetails)
    

    const [kdmDetCount, setKdmDetCount] = useState(2);
    const [showKdmBtn, setShowKdmBtn] = useState(true);
    const [showKdmNameErr, setShowKdmNameErr] = useState(false);
    const [Name, setName] = useState('');
    const [kdmNameBorder, setKdmNameBorder] = useState('');
    const [showDesigErr, setShowDesigErr] = useState(false);
    const [desigBorder, setDesigBorder] = useState('');
    const [showPrimContactErr, setShowPrimContactErr] = useState(false);
    const [primContactBorder, setPrimContactBorder] = useState('');
    const [showAltContactErr, setShowAltContactErr] = useState(false);
    const [altContactBorder, setAltContactBorder] = useState('');
    const [showKdmBranchErr, setShowKdmBranchErr] = useState(false);
    const [branchBorder, setBranchBorder] = useState('');                                 
                                    
                                    
    const [kdmDetArr, setkdmDetArr] = useState([
        {
            kdmName:null,
            kdmRole:'',
            kdmDesignation:'',
            kdmPrimContact:'',
            kdmAltContact:'',
            kdmEmailId:'',
            kdmDOB:'',
            kdmDOBString:'',
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
                    kdmDOB: moment(el.date_of_birth, "MM/DD/YYYY"),
                    kdmDOBString:el.date_of_birth,
                    kdmState:el.state,
                    kdmCity:el.city,
                    kdmBranch:el.branch,
                    noOfKDM:'2'
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

    const onChangeKdmName = (e,ind) => {
        // console.warn('FIRSTNAME',kdmDetArr)
        // console.warn('ind',ind)
        kdmDetArr[ind].kdmName = e.target.value
        setkdmDetArr([...kdmDetArr])
    };

    const onChangeKdmRole = (e,ind) => {
        // console.warn('onChangeKdmRole=========>>>>',e)
        kdmDetArr[ind].kdmRole = e
        setkdmDetArr([...kdmDetArr])
    };

    const onChangeKdmDesig = (e,ind) => {
        kdmDetArr[ind].kdmDesignation = e.target.value
        setkdmDetArr([...kdmDetArr])
    };

    const onChangeKdmPrimMob = (e,ind) => {
        kdmDetArr[ind].kdmPrimContact = e.target.value
        setkdmDetArr([...kdmDetArr])
    };

    const onChangeKdmAltMob = (e,ind) => {
        kdmDetArr[ind].kdmAltContact = e.target.value
        setkdmDetArr([...kdmDetArr])
    };

    const onChangeKdmEmail = (e,ind) => {
        kdmDetArr[ind].kdmEmailId = e.target.value
        setkdmDetArr([...kdmDetArr])
    };

    const onChangeKdmState = (e,ind) => {
        kdmDetArr[ind].kdmState = e
        kdmDetArr[ind].kdmCity = ''
        setkdmDetArr([...kdmDetArr])

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
        setkdmDetArr([...kdmDetArr])
    };

    const onChangeKdmBranch = (e,ind) => {
        kdmDetArr[ind].kdmBranch = e.target.value
        setkdmDetArr([...kdmDetArr])
    };
    
    const onChangeKdmDOB = (date, kdmDOB,ind) => {
        // setKdmDOBData(kdmDOB);
        console.warn('date--------->>>>>',date)
        console.warn('kdmDOB--------->>>>>',kdmDOB)
        kdmDetArr[ind].kdmDOB = date
        kdmDetArr[ind].kdmDOBString = kdmDOB
        setkdmDetArr([...kdmDetArr])
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
                kdmDOBString:'',
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
        // console.warn('kdmDetArr--------->>>>>',kdmDetArr)
        
    };

    const deleteKDM = (data,ind) => {
        console.warn('KDMMMM',data)
        let _kdmArr = kdmDetArr.filter(el => el.kdmName !== data.kdmName)
        // console.warn('KDMMMM_______kdmArr',_kdmArr)
        setkdmDetArr([..._kdmArr])
        
    };

    const updateKDMDetails = async() =>{

        let _kdmDetailsData = []
        kdmDetArr.map(el =>{
            console.log('el-------KDM---->>',el)
            let _data = {
                decision_maker_name: el.kdmName,
                role: el.kdmRole,
                designation: el.kdmDesignation,
                primaryContact: el.kdmPrimContact,
                alternateContact: el.kdmAltContact,
                emailAddress: el.kdmEmailId,
                date_of_birth: el.kdmDOBString,
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
            // remarks: _StoreData?.remarks,
            teamMembers : "[]",
            lead_Owner_Id: user_id,
            lead_Creator_Id: user_id,
            user_id: user_id,
            company_id: _StoreData?.company_id?._id,
            start_date: _UpdateFormBody?.start_date,
            start_time:_UpdateFormBody?.start_time,
            client_expectations: _StoreData?.client_expectations,
            red_flags: _StoreData?.red_flags,
            our_ask: _StoreData?.our_ask,
            channel_name: _StoreData?.channel_name,
            producer: _StoreData?.producer,
            VAS_executed: !_StoreData?.VAS_executed ? 'Yes' : _StoreData?.VAS_executed,
            VAS_input: _StoreData?.VAS_input,
            kdm_details: _kdmDetailsData,
            risk_details: _StoreData?.company_id?.risk_details
        }

        console.warn('formBody ------>>>>>',formBody)
        dispatch(actions.fetchLeadUpdateBody(formBody))
        dispatch(actions.editLead(formBody, props.leadDetails))
        
    }

    const fieldValidation = (event,fieldName) =>{
        // console.warn('event ------>>>>>',event)
        // console.warn('type ------>>>>>',fieldName)
        let nameRegex =/^[A-Za-z ]+$/;
        // let nameRegex =/^[A-Za-z0-9 ]+$/;
        let numRegex =/^[0-9 ]+$/;

        if(fieldName === 'kdmName'){
            if(event.target.value.match(nameRegex)){
                setShowKdmNameErr(false)
                setKdmNameBorder('#d9d9d9')
            }else{
                if(event.target.value === ''){
                    setShowKdmNameErr(false)
                    setKdmNameBorder('#d9d9d9')
                }else{
                    setShowKdmNameErr(true)
                    setKdmNameBorder('#ff4d4f')
                }
            }
        }else if(fieldName === 'designation'){
            if(event.target.value.match(nameRegex)){
                setShowDesigErr(false)
                setDesigBorder('#d9d9d9')
            }else{
                if(event.target.value === ''){
                    setShowDesigErr(false)
                    setDesigBorder('#d9d9d9')
                }else{
                    setShowDesigErr(true)
                    setDesigBorder('#ff4d4f')
                }
            }
        } else if(fieldName === 'primContact'){
            if(event.target.value.match(numRegex)){
                setShowPrimContactErr(false)
                setPrimContactBorder('#d9d9d9')
            }else{
                if(event.target.value === ''){
                    setShowPrimContactErr(false)
                    setPrimContactBorder('#d9d9d9')
                }else{
                    setShowPrimContactErr(true)
                    setPrimContactBorder('#ff4d4f')
                }
            }
        } else if(fieldName === 'altContact'){
            if(event.target.value.match(numRegex)){
                setShowAltContactErr(false)
                setAltContactBorder('#d9d9d9')
            }else{
                if(event.target.value === ''){
                    setShowAltContactErr(false)
                    setAltContactBorder('#d9d9d9')
                }else{
                    setShowAltContactErr(true)
                    setAltContactBorder('#ff4d4f')
                }
            }
        } else if(fieldName === 'kdmBranch'){
            if(event.target.value.match(nameRegex)){
                setShowKdmBranchErr(false)
                setBranchBorder('#d9d9d9')
            }else{
                if(event.target.value === ''){
                    setShowKdmBranchErr(false)
                    setBranchBorder('#d9d9d9')
                }else{
                    setShowKdmBranchErr(true)
                    setBranchBorder('#ff4d4f')
                }
            }
        } 

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
                    {/* <Form form={form} > */}
                        <Row style={{alignItems:'center'}} justify='space-between'>
                            <p className="form-title">{index + 1} - Key Decison Makers ( KDM ) Details</p>
                            { index !== 0 &&
                                <p onClick={()=> deleteKDM(el,index)} style={{color:'indianred',fontSize:14,cursor: 'pointer'}}>DELETE</p>
                            }
                        </Row>
                        <Row gutter={16} className="statsLead kdmStyle" style={{marginBottom:40}}>
                            <Col xs={24} sm={12} md={24} lg={12} xl={12} style={{ marginBottom: "1rem" }}>
                                {/* <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="kdmName"
                                    label="Key Decison Maker Name"
                                    rules={[
                                        // { required: true, message: "First Name is required",},
                                        { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                                    ]}
                                    style={{ marginBottom: "1rem" }}
                                > */}
                                    <p style={{marginBottom:6}}>Key Decison Maker Name</p>
                                    <Input
                                        placeholder="Enter Key Decison Maker Name"
                                        value={el.kdmName}
                                        style={{ borderColor: kdmNameBorder }}
                                        // defaultValue={kdmName}
                                        onInput={(item) =>fieldValidation(item,'kdmName')}
                                        onChange={(item) => onChangeKdmName(item,index)}
                                    />
                                    {showKdmNameErr && <p style={{marginBottom:6,color:'#ff4d4f'}}>Only Alphabets are Allowed</p>}
                                {/* </Form.Item> */}
                            </Col>
                            <Col xs={24} sm={12} md={24} lg={12} xl={12} style={{ marginBottom: "1rem" }}>
                                {/* <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="kdmRole"
                                    label="KDM Role"
                                    style={{ marginBottom: "1rem" }}
                                > */}
                                    <p style={{marginBottom:6}}>KDM Role</p>
                                    <Select
                                        bordered={true}
                                        placeholder="Select KDM Role"
                                        options={kdmRolesArr}
                                        value={el.kdmRole || undefined}
                                        style={{ display: 'flex' }}
                                        
                                        // defaultValue={citiesOptions}
                                        onChange={(item) => onChangeKdmRole(item,index)}
                                    ></Select>
                                {/* </Form.Item> */}
                            </Col>

                            <Col xs={24} sm={12} md={24} lg={12} xl={12} style={{ marginBottom: "1rem" }}>
                                {/* <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="kdmDesig"
                                    label="KDM Designation"
                                    // rules={[
                                    //     // { required: true, message: "First Name is required",},
                                    //     { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                                    // ]}
                                    style={{ marginBottom: "1rem" }}
                                > */}
                                <p style={{marginBottom:6}}>KDM Designation</p>
                                    <Input
                                        placeholder="Enter KDM Designation"
                                        value={el.kdmDesignation}
                                        style={{ borderColor: desigBorder }}
                                        onInput={(item) =>fieldValidation(item,'designation')}
                                        // defaultValue={kdmName}
                                        onChange={(item) => onChangeKdmDesig(item,index)}
                                    />
                                    {showDesigErr && <p style={{marginBottom:6,color:'#ff4d4f'}}>Only Alphabets are Allowed</p>}
                                {/* </Form.Item> */}
                            </Col>

                            <Col xs={24} sm={12} md={24} lg={12} xl={12} style={{ marginBottom: "1rem" }}>
                                {/* <Form.Item
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
                                > */}
                                    <p style={{marginBottom:6}}>KDM Primary Contact</p>
                                    <Input
                                        placeholder="Enter KDM Primary Contact"
                                        value={el.kdmPrimContact}
                                        maxLength="10"
                                        
                                        style={{ borderColor: primContactBorder }}
                                        onInput={(item) =>fieldValidation(item,'primContact')}
                                        // defaultValue={kdmName}
                                        onChange={(item) => onChangeKdmPrimMob(item,index)}
                                    />
                                    {showPrimContactErr && <p style={{marginBottom:6,color:'#ff4d4f'}}>Only Numbers are Allowed</p>}
                                {/* </Form.Item> */}
                            </Col>

                            <Col xs={24} sm={12} md={24} lg={12} xl={12} style={{ marginBottom: "1rem" }}>
                                {/* <Form.Item
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
                                > */}
                                <p style={{marginBottom:6}}>KDM Alternate Contact</p>
                                    <Input
                                        placeholder="Enter KDM Alternate Contact"
                                        value={el.kdmAltContact}
                                        maxLength="10"
                                        
                                        style={{ borderColor: altContactBorder }}
                                        onInput={(item) =>fieldValidation(item,'altContact')}
                                        // defaultValue={kdmName}
                                        onChange={(item) => onChangeKdmAltMob(item,index)}
                                    />
                                    {showAltContactErr && <p style={{marginBottom:6,color:'#ff4d4f'}}>Only Numbers are Allowed</p>}
                                {/* </Form.Item> */}
                            </Col>

                            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                                {/* <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="kdmEmail"
                                    label="KDM Email ID"
                                    // rules={[
                                    //     // { required: true, message: "First Name is required",},
                                    //     { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                                    // ]}
                                    style={{ marginBottom: "1rem" }}
                                > */}
                                <p style={{marginBottom:6}}>KDM Email ID</p>
                                    <Input
                                        placeholder="Enter KDM Email ID"
                                        value={el.kdmEmailId}
                                        style={{ marginBottom: "1rem" }}
                                        // defaultValue={kdmName}
                                        onChange={(item) => onChangeKdmEmail(item,index)}
                                    />
                                {/* </Form.Item> */}
                            </Col>

                            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                                {/* <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="kdmDOB"
                                    label="Date Of Birth"
                                    style={{ marginBottom: "1rem" }}
                                > */}
                                <p style={{marginBottom:6}}>Date Of Birth</p>
                                    <DatePicker 
                                        onChange={ (date,dateString) => onChangeKdmDOB(date,dateString,index) } 
                                        value={el.kdmDOB}
                                        format="MM/DD/YYYY"
                                        style={{display:'flex',flex:1,marginBottom: "1rem"}}
                                    />
                                {/* </Form.Item> */}
                            </Col>

                            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                                {/* <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="kdmState"
                                    label="State"
                                    style={{ marginBottom: "1rem" }}
                                > */}
                                <p style={{marginBottom:6}}>State</p>
                                    <Select
                                        bordered={true}
                                        placeholder="Select State"
                                        options={stateOptions}
                                        value={el.kdmState || undefined}
                                        onSelect={stateSelectHandler}
                                        style={{ marginBottom: "1rem",display: 'flex' }}
                                        // defaultValue={citiesOptions}
                                        onChange={(item) => onChangeKdmState(item,index)}
                                    ></Select>
                                {/* </Form.Item> */}
                            </Col>

                            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                                {/* <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="kdmCity"
                                    label="City"
                                    style={{ marginBottom: "1rem" }}
                                > */}
                                <p style={{marginBottom:6}}>City</p>
                                    <Select
                                        bordered={true}
                                        placeholder="Select City"
                                        options={citiesOptions}
                                        value={el.kdmCity || undefined}
                                        style={{ marginBottom: "1rem",display: 'flex' }}
                                        // defaultValue={citiesOptions}
                                        onChange={(item) => onChangeKdmCity(item,index)}
                                    ></Select>
                                {/* </Form.Item> */}
                            </Col>

                            <Col xs={24} sm={12} md={24} lg={12} xl={12} style={{ marginBottom: "1rem" }}>
                                {/* <Form.Item
                                    {...formItemLayout}
                                    className="form-item-name label-color"
                                    name="kdmBranch"
                                    label="Branch (if applicable)"
                                    // rules={[
                                    //     // { required: true, message: "First Name is required",},
                                    //     { message: "Only Alphabets are Allowed",pattern: new RegExp(/^[a-zA-Z ]+$/),},
                                    // ]}
                                    style={{ marginBottom: "1rem" }}
                                > */}
                                <p style={{marginBottom:6}}>Branch (if applicable)</p>
                                    <Input
                                        placeholder="Enter Branch"
                                        value={el.kdmBranch}
                                        style={{ borderColor: branchBorder }}
                                        // defaultValue={kdmName}
                                        onInput={(item) =>fieldValidation(item,'kdmBranch')}
                                        onChange={(item) => onChangeKdmBranch(item,index)}
                                    />
                                    {showKdmBranchErr && <p style={{marginBottom:6,color:'#ff4d4f'}}>Only Alphabets are Allowed</p>}
                                {/* </Form.Item> */}
                            </Col>
                        </Row>
                    {/* </Form> */}
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

