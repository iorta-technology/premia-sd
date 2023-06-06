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

    const [remark, setRemark] = useState("");
    const [reamrkDataArr, setreamrkDataArr] = useState([]);
    const [formItem, setFormItem] = useState({ remarks:'' });
    // console.log('(((((((((_StoreData___VASS)))))))))---->>>>',_StoreData)
    // console.log('(((((((((leadDetails)))))))))---->>>>',props.leadDetails)


    
    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");

    const breakpoint = 620;

    useEffect(() => {

    }, []);

    const addRemarks = async () => {
        let result = "";
        if (remark && remark != "") {
            result = await axiosRequest.post(`user/add-opporunity-remark/${_StoreData._id}`,{ new_remark: remark },{ secure: true });
    
            if (result) {
                setRemark("");
                form.setFieldsValue({remarks: ""});
                // setreamrkDataArr([...reamrkDataArr, result]);
                props.setShowRemarkModal(false)
                dispatch(actions.fetchLeadDetails(_StoreData._id))
                return 
            }
        
            // let _remark = [
            //     {
            //         description: remark,
            //         dateTime: new Date().toLocaleString("en-US"),
            //     },
            // ];
            // setRemark("");
        
            // setFormItem((res) => ({ ...res,remarks: _remark }));
            // form.setFieldsValue({remarks: ""});
        
            // let remID = Math.floor(1000 + Math.random() * 9000);
            // let _data = {
            //     description: remark,
            //     date: new Date().toLocaleDateString().valueOf(),
            //     remark_id: remID.toString(),
            // };
        
            // setreamrkDataArr([...reamrkDataArr, _data]);
            
        }
      };


    const onChangeRemark = (event) =>{
        setRemark(event.target.value)
    }
return (
    <>
        <Modal
            title="Remark"
            centered={true}
            visible={props.showRemarkModal}
            width={width < breakpoint ? 370 : 700}
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
                        <TextArea 
                            rows={4} 
                            placeholder="Enter Remark" 
                            value={remark}
                            // maxLength={6}
                            onChange={(e) => onChangeRemark(e)}
                         />

                        {/* <Button
                            type="primary"
                            style={{
                                border: "none",
                                display: "flex",
                                alignItems: "center",
                                marginTop: "16px",
                                backgroundColor: "#00ACC1",
                            }}
                            icon={<PlusOutlined />}
                            onClick={addRemarks}
                        >
                        ADD
                      </Button> */}
                    </div>
                    

                    
               
                <div  style={{display:'flex',flex:1,justifyContent:'flex-end',marginTop:20}}>
                    <Button size='large' onClick={()=> props.setShowRemarkModal(false)} style={{flex:1,borderRadius:5,border:'1px solid #3B371E',color:'#3B371E'}} >Cancel</Button>
                    <Button size='large' onClick={()=> addRemarks()} style={{flex:1,borderRadius:5,backgroundColor:'#3b371e',color:'#fff',marginLeft:15}} >Update</Button>
                </div>
            </Col>
        </Modal>
    </>
)
}

export default RemarksModalComp

