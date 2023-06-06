import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Input , Select, Button , DatePicker , message,Modal  } from 'antd';
import '../StatusLead/StatusLead.css'
// import * as actions from "../../store/actions/history";
import * as actions from "../../store/actions/index";
import _ from "lodash";
import { PlusOutlined } from '@ant-design/icons';
import moment from "moment";
import axiosRequest from "../../axios-request/request.methods";

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
    // console.log('(((((((((_StoreData)))))))))---->>>>',_StoreData)
    // console.log('(((((((((kdmDataSet-----)))))))))---->>>>',props.kdmDataSet)
    
    // console.log('(((((((((leadDetails)))))))))---->>>>',props.leadDetails)
    

    const [kdmDetCount, setKdmDetCount] = useState(2);
    const [showKdmBtn, setShowKdmBtn] = useState(true);
    const [showKdmNameErr, setShowKdmNameErr] = useState(false);
    const [Name, setName] = useState('');
    const [kdmTypeData, setKdmTypeData] = useState('');
    const [editKdmId, setEditKdmId] = useState('');
    const minimumDate = moment().format("YYYY-MM-DD"); 
                                    
    const [kdmDetArr, setkdmDetArr] = useState([
        {
            kdmName:null,
            kdmRole:'',
            kdmDesignation:'',
            kdmPrimContact:'',
            kdmAltContact:'',
            kdmEmailId:'',
            kdmDOB:'',
            kdmDOBString:null,
            kdmState:'',
            kdmCity:'',
            kdmBranch:'',
            noOfKDM:'',
            showKdmNameErr:false,
            showDesigErr:false,
            showPrimContactErr:false,
            showAltContactErr:false,
            showKdmBranchErr:false,
            showKdmEmailErr:false,
            showKdmDOBErr:false,
            kdmNameBorder:'',
            desigBorder:'',
            primContactBorder:'',
            altContactBorder:'',
            emailAddBorder:'',
            branchBorder:'',
            dobBorder:'',
        },
    ]);
    let { innerWidth: width, innerHeight: height } = window;
    const breakpoint = 620;

    useEffect(() => {
        let _dataArr = []
        if(Object.keys(props.kdmDataSet).length > 0){
            setKdmTypeData('update')
            // props.kdmDataSet.map(el =>{
                // kdmDetArr.forEach(el =>{
                setEditKdmId(props.kdmDataSet._id)
                let _data = {
                    kdmName:props.kdmDataSet.decision_maker_name,
                    kdmRole:props.kdmDataSet.role,
                    kdmDesignation:props.kdmDataSet.designation,
                    kdmPrimContact:props.kdmDataSet.primaryContact,
                    kdmAltContact:props.kdmDataSet.alternateContact,
                    kdmEmailId:props.kdmDataSet.emailAddress,
                    kdmDOB: !props.kdmDataSet.date_of_birth ? '' : moment(props.kdmDataSet.date_of_birth, "MM/DD/YYYY"),
                    kdmDOBString:!props.kdmDataSet.date_of_birth ? '' : props.kdmDataSet.date_of_birth,
                    kdmState:props.kdmDataSet.state,
                    kdmCity:props.kdmDataSet.city,
                    kdmBranch:props.kdmDataSet.branch,
                    noOfKDM:'2'
                }
                _dataArr.push(_data)
            // })
            // console.log('_dataArr========>>>>',_dataArr)
            // _dataArr.length < 4 ? setShowKdmBtn(true) : setShowKdmBtn(false)
            setkdmDetArr(_dataArr)
        }else{
            setKdmTypeData('create')
            let _data = {
                kdmName:'',
                kdmRole:'',
                kdmDesignation:'',
                kdmPrimContact:'',
                kdmAltContact:'',
                kdmEmailId:'',
                kdmDOB: '',
                kdmDOBString:'',
                kdmState:'',
                kdmCity:'',
                kdmBranch:'',
                noOfKDM:'2'
            }
            _dataArr.push(_data)
            setkdmDetArr(_dataArr)
        }

        dispatch(actions.fetchAllState(user_id));

    }, [props.kdmDataSet]);

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
        // let datevalue = moment(date).valueOf()

        let currentdate = Date.now()
        let datesub = moment(currentdate).subtract(18, 'years').format('MM/DD/YYYY');

        const _inputData = new Date(kdmDOB);
        const _compareDate = new Date(datesub);
        
        setkdmDetArr([...kdmDetArr])

        if(_inputData >= _compareDate){
            if(!kdmDOB){
                kdmDetArr[ind].showKdmDOBErr = false
                kdmDetArr[ind].dobBorder = '#d9d9d9'
            }else{
                kdmDetArr[ind].showKdmDOBErr = true
                kdmDetArr[ind].dobBorder = '#ff4d4f'
            }
        }else{
            kdmDetArr[ind].showKdmDOBErr = false
            kdmDetArr[ind].dobBorder = '#d9d9d9'
        }

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
        }
        kdmDetArr.length === 3 ? setShowKdmBtn(false) : setShowKdmBtn(true)
        // console.warn('kdmDetArr--------->>>>>',kdmDetArr)
        
    };

    const deleteKDM = (data,index) => {
        // console.warn('KDMMMM___',data)
        // console.warn('KDMMMM___INDEX',index)
        let _kdmArr = kdmDetArr.filter((el,ind) => ind !== index )
       
        _kdmArr.length < 4 ? setShowKdmBtn(true) : setShowKdmBtn(false)
        setkdmDetArr([..._kdmArr])
        
    };

    let _errMessage = ['showKdmNameErr','showDesigErr','showPrimContactErr','showAltContactErr','showKdmBranchErr','showKdmEmailErr','showKdmDOBErr']

    const updateKDMDetails = async() =>{

        let _kdmDetailsData = {}
        let _validationError = null
        kdmDetArr.map(el =>{
            let _keys = Object.keys(el)

            _keys.map(item => {
                if(_errMessage.includes(item)) {
                    _validationError = el[item] ? true : null
                }
            });

            let _data = {
                decision_maker_name: !el.kdmName ? null : el.kdmName,
                role: !el.kdmRole ? null : el.kdmRole,
                designation: !el.kdmDesignation ? null : el.kdmDesignation,
                primaryContact: !el.kdmPrimContact ? null : el.kdmPrimContact,
                alternateContact: !el.kdmAltContact ? null : el.kdmAltContact,
                emailAddress: !el.kdmEmailId ? null : el.kdmEmailId,
                date_of_birth: !el.kdmDOBString ? null : el.kdmDOBString,
                city: !el.kdmCity ? null : el.kdmCity,
                state: !el.kdmState ? null : el.kdmState,
                branch: !el.kdmBranch ? null : el.kdmBranch,
            }
            // _kdmDetailsData.push(_data)
            _kdmDetailsData = {..._data}
        })
        
        // console.warn('_kdmDetailsData ------>>>>>',_kdmDetailsData)
        // console.log('_validationError .... -------KDM---->>',_validationError)
        // let formBody = {
        //     ...props.updateFormData,
        //     kdm_details: _kdmDetailsData,
        // }

        if(_validationError){
            message.warning('Please Enter Correct Data')
            return
        }

        let formBody = {
            ..._kdmDetailsData,
        }
        console.warn('formBody ------>>>>>',formBody)
        // return


        let _compID = _StoreData?.company_id?._id

        if(kdmTypeData === 'create'){
            let result = await axiosRequest.post(`user/postkdmform?userId=${user_id}&companyid=${_compID}`,formBody,{ secure: true });
            dispatch(actions.fetchLeadDetails(_StoreData._id))
        }else{
            let result = await axiosRequest.put(`user/updatekdmform?userId=${user_id}&companyid=${_compID}&kdmId=${editKdmId}`,formBody,{ secure: true });
            dispatch(actions.fetchLeadDetails(_StoreData._id))
        }

        // console.warn('formBody ------>>>>>',formBody)
        // dispatch(actions.fetchLeadUpdateBody(formBody))
        // dispatch(actions.editLead(formBody, props.leadDetails))
        props.setShowKdmModal(false)
        
    }

    const fieldValidation = (event,fieldName,ind) =>{
        // console.warn('event ------>>>>>',event)
        // console.warn('type ------>>>>>',fieldName)
        console.warn('ind ------>>>>>',ind)
        let nameRegex =/^[A-Za-z ]+$/;
        // let nameRegex =/^[A-Za-z0-9 ]+$/;
        let emailFormate = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let numRegex =/^[0-9 ]+$/;

        if(fieldName === 'kdmName'){
            if(event.target.value.match(nameRegex)){
                kdmDetArr[ind].showKdmNameErr = false
                kdmDetArr[ind].kdmNameBorder = '#d9d9d9'
            }else{
                if(event.target.value === ''){
                    kdmDetArr[ind].showKdmNameErr = false
                    kdmDetArr[ind].kdmNameBorder = '#d9d9d9'
                }else{
                    kdmDetArr[ind].showKdmNameErr = true
                    kdmDetArr[ind].kdmNameBorder = '#ff4d4f'
                }
            }
            
        }else if(fieldName === 'designation'){
            if(event.target.value.match(nameRegex)){
                kdmDetArr[ind].showDesigErr = false
                kdmDetArr[ind].desigBorder = '#d9d9d9'
            }else{
                if(event.target.value === ''){
                    kdmDetArr[ind].showDesigErr = false
                    kdmDetArr[ind].desigBorder = '#d9d9d9'
                }else{
                    kdmDetArr[ind].showDesigErr = true
                    kdmDetArr[ind].desigBorder = '#ff4d4f'
                }
            }
        } else if(fieldName === 'primContact'){
            if(event.target.value.match(numRegex)){
                if(event.target.value.length < 10){
                    kdmDetArr[ind].showPrimContactErr = true
                    kdmDetArr[ind].primContactBorder = '#ff4d4f'
                }else{
                    kdmDetArr[ind].showPrimContactErr = false
                    kdmDetArr[ind].primContactBorder = '#d9d9d9'
                }
            }else{
                if(event.target.value === ''){
                    kdmDetArr[ind].showPrimContactErr = false
                    kdmDetArr[ind].primContactBorder = '#d9d9d9'
                }else{

                    kdmDetArr[ind].showPrimContactErr = true
                    kdmDetArr[ind].primContactBorder = '#ff4d4f'
                }
            }
        } else if(fieldName === 'altContact'){
            if(event.target.value.match(numRegex)){
                // setShowAltContactErr(false)
                // setAltContactBorder('#d9d9d9')

                if(event.target.value.length < 10){
                    kdmDetArr[ind].showAltContactErr = true
                    kdmDetArr[ind].altContactBorder = '#ff4d4f'
                }else{
                    kdmDetArr[ind].showAltContactErr = false
                    kdmDetArr[ind].altContactBorder = '#d9d9d9'
                }
            }else{
                if(event.target.value === ''){
                    kdmDetArr[ind].showAltContactErr = false
                    kdmDetArr[ind].altContactBorder = '#d9d9d9'
                }else{
                    kdmDetArr[ind].showAltContactErr = true
                    kdmDetArr[ind].altContactBorder = '#ff4d4f'
                }
            }
        } else if(fieldName === 'kdmBranch'){
            if(event.target.value.match(nameRegex)){
                kdmDetArr[ind].kdmNameBorder = false
                kdmDetArr[ind].branchBorder = '#d9d9d9'
            }else{
                if(event.target.value === ''){
                    kdmDetArr[ind].kdmNameBorder = false
                    kdmDetArr[ind].branchBorder = '#d9d9d9'
                }else{
                    kdmDetArr[ind].kdmNameBorder = true
                    kdmDetArr[ind].branchBorder = '#ff4d4f'
                }
            }
        } else if(fieldName === 'email'){
            if(event.target.value.match(emailFormate)){
                kdmDetArr[ind].showKdmEmailErr = false
                kdmDetArr[ind].emailAddBorder = '#d9d9d9'
            }else{
                if(event.target.value === ''){
                    kdmDetArr[ind].showKdmEmailErr = false
                    kdmDetArr[ind].emailAddBorder = '#d9d9d9'
                }else{
                    kdmDetArr[ind].showKdmEmailErr = true
                    kdmDetArr[ind].emailAddBorder = '#ff4d4f'
                }
            }
        } 

        setkdmDetArr([...kdmDetArr])
    }
    
return (
    <>
        <Modal
            title="Key Decison Makers Details"
            centered={true}
            visible={props.showKdmModal}
            width={width < breakpoint ? 370 : 700}
            className="modalStyle"
            onCancel={() => props.setShowKdmModal(false) }
            footer={null}
        >
            <Col
                className=" mb-2"
                xs={24}
                sm={24}
                md={16}
                lg={15}
                xl={24}
                span={23}
                >
                
                { kdmDetArr &&
                    kdmDetArr.map((el,index) =>(
                    <>
                        {/* <Form form={form} > */}
                            {/* <Row style={{alignItems:'center'}} justify='space-between'>
                                <p className="form-title">{index + 1} - Key Decison Makers ( KDM ) Details</p>
                                { index !== 0 &&
                                    <p onClick={()=> deleteKDM(el,index)} style={{color:'indianred',fontSize:14,cursor: 'pointer'}}>DELETE</p>
                                }
                            </Row> */}
                            <Row gutter={16} className="statsLead kdmStyle" style={{marginBottom:40}}>
                                <Col xs={24} sm={12} md={24} lg={12} xl={12} style={{ marginBottom: "1rem" }}>
                                    <p style={{marginBottom:6}}>Key Decison Maker Name</p>
                                    <Input
                                        placeholder="Enter Key Decison Maker Name"
                                        value={el.kdmName}
                                        style={{ borderColor: el.kdmNameBorder }}
                                        // defaultValue={kdmName}
                                        onInput={(item) =>fieldValidation(item,'kdmName',index)}
                                        onChange={(item) => onChangeKdmName(item,index)}
                                    />
                                    {el.showKdmNameErr && <p style={{marginBottom:6,color:'#ff4d4f'}}>Only Alphabets are Allowed</p>}
                                </Col>
                                <Col xs={24} sm={12} md={24} lg={12} xl={12} style={{ marginBottom: "1rem" }}>
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
                                </Col>

                                <Col xs={24} sm={12} md={24} lg={12} xl={12} style={{ marginBottom: "1rem" }}>
                                    <p style={{marginBottom:6}}>KDM Designation</p>
                                    <Input
                                        placeholder="Enter KDM Designation"
                                        value={el.kdmDesignation}
                                        style={{ borderColor: el.desigBorder }}
                                        onInput={(item) =>fieldValidation(item,'designation',index)}
                                        // defaultValue={kdmName}
                                        onChange={(item) => onChangeKdmDesig(item,index)}
                                    />
                                    {el.showDesigErr && <p style={{marginBottom:6,color:'#ff4d4f'}}>Only Alphabets are Allowed</p>}
                                </Col>

                                <Col xs={24} sm={12} md={24} lg={12} xl={12} style={{ marginBottom: "1rem" }}>
                                    <p style={{marginBottom:6}}>KDM Primary Contact</p>
                                    <Input
                                        placeholder="Enter KDM Primary Contact"
                                        value={el.kdmPrimContact}
                                        maxLength="10"
                                        
                                        style={{ borderColor: el.primContactBorder }}
                                        onInput={(item) =>fieldValidation(item,'primContact',index)}
                                        // defaultValue={kdmName}
                                        onChange={(item) => onChangeKdmPrimMob(item,index)}
                                    />
                                    {el.showPrimContactErr && <p style={{marginBottom:6,color:'#ff4d4f'}}>Enter a valid Contact Number</p>}
                                </Col>

                                <Col xs={24} sm={12} md={24} lg={12} xl={12} style={{ marginBottom: "1rem" }}>
                                    <p style={{marginBottom:6}}>KDM Alternate Contact</p>
                                    <Input
                                        placeholder="Enter KDM Alternate Contact"
                                        value={el.kdmAltContact}
                                        maxLength="10"
                                        style={{ borderColor: el.altContactBorder }}
                                        onInput={(item) =>fieldValidation(item,'altContact',index)}
                                        // defaultValue={kdmName}
                                        onChange={(item) => onChangeKdmAltMob(item,index)}
                                    />
                                    {el.showAltContactErr && <p style={{marginBottom:6,color:'#ff4d4f'}}>Enter a valid Contact Number</p>}
                                </Col>

                                <Col xs={24} sm={12} md={24} lg={12} xl={12} style={{marginBottom: "1rem" }}>
                                    
                                    <p style={{marginBottom:6}}>KDM Email ID</p>
                                    <Input
                                        placeholder="Enter KDM Email ID"
                                        value={el.kdmEmailId}
                                        style={{ borderColor: el.emailAddBorder }}
                                        onInput={(item) =>fieldValidation(item,'email',index)}
                                        // defaultValue={kdmName}
                                        onChange={(item) => onChangeKdmEmail(item,index)}
                                    />
                                    {el.showKdmEmailErr && <p style={{marginBottom:6,color:'#ff4d4f'}}>Enter a valid email address</p>}
                                </Col>

                                <Col xs={24} sm={12} md={24} lg={12} xl={12} style={{marginBottom: "1rem"}}>
                                    <p style={{marginBottom:6}}>Date Of Birth</p>
                                    <DatePicker 
                                        onChange={ (date,dateString) => onChangeKdmDOB(date,dateString,index) } 
                                        value={el.kdmDOB}
                                        format="MM/DD/YYYY"
                                        disabledDate={(d) => !d || d.isAfter(minimumDate)}
                                        style={{display:'flex',flex:1,borderColor: el.dobBorder}}
                                    />
                                    {el.showKdmDOBErr && <p style={{marginBottom:6,color:'#ff4d4f'}}>Age must be greater than 18 years</p>}
                                </Col>
                                

                                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                                    <p style={{marginBottom:6}}>State</p>
                                    <Select
                                        bordered={true}
                                        placeholder="Select State"
                                        options={stateOptions}
                                        value={el.kdmState || undefined}
                                        onSelect={stateSelectHandler}
                                        style={{ marginBottom: "1rem",display: 'flex' }}
                                        onChange={(item) => onChangeKdmState(item,index)}
                                    ></Select>
                                </Col>

                                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
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
                                </Col>

                                <Col xs={24} sm={12} md={24} lg={12} xl={12} style={{ marginBottom: "1rem" }}>
                                    <p style={{marginBottom:6}}>Branch (if applicable)</p>
                                    <Input
                                        placeholder="Enter Branch"
                                        value={el.kdmBranch}
                                        style={{ borderColor: el.branchBorder }}
                                        onInput={(item) =>fieldValidation(item,'kdmBranch',index)}
                                        onChange={(item) => onChangeKdmBranch(item,index)}
                                    />
                                    {el.showKdmBranchErr && <p style={{marginBottom:6,color:'#ff4d4f'}}>Only Alphabets are Allowed</p>}
                                </Col>
                            </Row>
                        {/* </Form> */}
                    </>
                    ))
                }
                {/* { showKdmBtn === true &&
                    <div style={{display:'flex',flex:1,justifyContent:'center'}}>
                        <Button style={{display:'flex',alignItems:'center',borderRadius:5}} onClick={()=> addKDM()} size='large' icon={<PlusOutlined />}>Add KDM</Button>
                    </div>
                } */}

                <div  style={{display:'flex',flex:1,justifyContent:'flex-end',marginTop:20}}>
                    <Button size='large' onClick={()=> props.setShowKdmModal(false)} style={{flex:1,borderRadius:5,border:'1px solid #3B371E',color:'#3B371E'}} >Cancel</Button>
                    <Button size='large' onClick={()=> updateKDMDetails()} style={{flex:1,borderRadius:5,backgroundColor:'#3b371e',color:'#fff',marginLeft:15}} >Update</Button>
                </div>
            </Col>
        </Modal>
    </>
)
}

export default KDMDetails

