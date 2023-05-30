import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Tabs, Form, Input , Select, Button , Modal  } from 'antd';
import '../StatusLead/StatusLead.css'
import * as actions from "../../store/actions/index";
import _ from "lodash";
import { dataFormatting } from '../../helpers'
import axiosRequest from '../../axios-request/request.methods'  
import { PlusOutlined } from '@ant-design/icons';
import moment from "moment";

const { TextArea } = Input;




const RemarksModalComp = (props) => {
    
    // const storeLeadId = useSelector((state) => state.newLead.leadId)
    // const storeUserId = useSelector((state) => state.newLead.userId)
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const _StoreData = useSelector((state) => state?.newLead?.formData);
    const user_id = useSelector((state) => state.login.user.id);
    // console.log('(((((((((_StoreData___VASS)))))))))---->>>>',_StoreData)
    // console.log('(((((((((leadDetails)))))))))---->>>>',props.leadDetails)


    
    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");

    const breakpoint = 620;

    useEffect(() => {

    }, []);


    const updateRemark = (event) =>{

        // let _appntDate = ''
        // let _appntTime = ''
        // let _apptDateFormat = ''

        // if (_StoreData.appointmentDate) {
        //     _appntDate = moment(_StoreData.appointmentDate).format("MM/DD/YYYY");
        //     _appntTime = moment(_StoreData.appointmentDate).format("LT");
        // }

        // let formBody = {
        //     company_details: {
        //       company_name: _StoreData?.company_id?.company_name,
        //       parent_company: _StoreData?.company_id?.parent_company,
        //       industry_name: _StoreData?.company_id?.industry_name,
        //       tata_aig_empaneled:_StoreData?.company_id?.tata_aig_empaneled === true ? 'Yes' : 'No',
        //       client_location: _StoreData?.company_id?.client_location,
        //       zone:_StoreData?.company_id?.zone
        //     },
        //     leadStatus: _StoreData?.leadStatus,
        //     leadDisposition: _StoreData?.leadDisposition,
        //     leadsubDisposition: _StoreData?.leadsubDisposition,
        //     opportunity_name: _StoreData?.opportunity_name,
        //     // tender_driven: _StoreData?.tender_driven === true ? 'Yes' : 'No',
        //     // LOB_opportunity: _StoreData?.lob_for_opportunity,
        //     // product_for_opportunity: _StoreData?.product_for_opportunity,
        //     // remarks: _StoreData?.remarks,
        //     teamMembers : "[]",
        //     lead_Owner_Id: user_id,
        //     lead_Creator_Id: user_id,
        //     user_id: user_id,
        //     company_id: _StoreData?.company_id?._id,
        //     // start_date: _UpdateFormBody?.start_date,
        //     // start_time:_UpdateFormBody?.start_time,
        //     start_date: _appntDate,
        //     start_time: _appntTime,
        //     client_expectations: _StoreData?.client_expectations,
        //     red_flags: _StoreData?.red_flags,
        //     our_ask: _StoreData?.our_ask,
        //     channel_name: channelData,
        //     producer: producerData,
        //     VAS_executed: vasExecuted,
        //     VAS_input: vasInputData,
        //     // VAS_input: _StoreData?.VAS_input,
        //     kdm_details: _StoreData?.company_id?.kdm_details,
        //     risk_details: _StoreData?.company_id?.risk_details,
        // }
        // console.warn('formBody ------>>>>>',formBody)
        // dispatch(actions.fetchLeadUpdateBody(formBody))
        // dispatch(actions.editLead(formBody, props.leadDetails))
        props.setShowRemarkModal(false)
    }

return (
    <>
        <Modal
            title="Remark"
            centered={true}
            visible={props.showRemarkModal}
            width={700}
            className="modalStyle"
            onCancel={() => props.setShowRemarkModal(false) }
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
                    <div>
                        <TextArea rows={4} placeholder="Enter Remark" maxLength={6} />
                    </div>
               
                <div  style={{display:'flex',flex:1,justifyContent:'flex-end',marginTop:20}}>
                    <Button size='large' onClick={()=> props.setShowRemarkModal(false)} style={{flex:1,borderRadius:5,border:'1px solid #3B371E',color:'#3B371E'}} >Cancel</Button>
                    <Button size='large' onClick={()=> updateRemark()} style={{flex:1,borderRadius:5,backgroundColor:'#3b371e',color:'#fff',marginLeft:15}} >Update</Button>
                </div>
            </Col>
        </Modal>
    </>
)
}

export default RemarksModalComp
