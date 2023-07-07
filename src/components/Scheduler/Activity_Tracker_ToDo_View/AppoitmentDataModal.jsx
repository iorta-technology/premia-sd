import React, { useState, useEffect, createRef, useRef } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import moment from "moment";
import axiosRequest from "../../../axios-request/request.methods";
import "./Activity_Tracker.css";
import { CloseOutlined , EditOutlined , VideoCameraOutlined } from '@ant-design/icons';
import EventCreateComponent from "../CalendarEvent.js"

const NewLead = React.memo((props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;
  const user_id = useSelector((state) => state.login.user.id);
  
  console.log("🚀 ~ file:  ~ PROPSPSPPSS:", props)

  useEffect(() => {
    // console.log("🚀 ~ file:  ~ PROPSPSPPSS:", props)
    setIsModalVisible(!isModalVisible)
  }, []);

 
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);


  const closeBrokerModal = (event) => {
    props.setShowAppDataModal(false)

  }

  const showEditEventModal = (event) =>{
    console.log("🚀 ~ file:  ~ editDATA:", event)
    // console.log("🚀 ~ file:  ~ isModalVisible:", !isModalVisible)
    // setIsModalVisible(!isModalVisible)
    props.setShowAppDataModal(false)
    // setIsModalVisible(true)
    // console.log("🚀 ~ file: AppoitmentDataModal.jsx:60 ~ NewLead ~ isModalVisible:", isModalVisible)
  }
//   {console.log("🚀 ~ file: AppoitmentDataModal.jsx:60 ~ NewLead ~ isModalVisible:", isModalVisible)}

  return (
    <>
        {isModalVisible &&
            <EventCreateComponent
                click={"UPDATE EVENT"}
                Data={props.editData}
                // api={()=>{}}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                // callback1={callback1}
            />
        }
        <Modal
            style={{right:400}}
            centered={true}
            visible={props.showAppDataModal}
            width={400}
            className="modalStyle"
            onCancel={() => closeBrokerModal()}
            footer={null}
        >
            <div className="header">
                <div style={{ width: "50px" }}>
                    <text style={{textTransform:'capitalize',fontWeight:'600',color:props?.editData?.statusType === 'close' ? '#e46a2c' : '#18a4c5'}}>
                        {
                            // props?.editData?.statusType
                            props?.editData?.teamMember_clone?.includes(user_id) ?
                            props?.editData?.statusType === "close" ? "Close" : "Invited" :
                            props?.editData?.statusType === "open" ? "Open" : "Close"
                        }
                    </text>
                </div>
                <div style={{height:15,width:1,backgroundColor:'grey'}}></div>

                <div style={{ display:'flex',width: "50px", cursor: "pointer",justifyContent:'center' }} onClick={() => showEditEventModal(props?.editData) }>
                    <EditOutlined style={{fontSize:18,fontWeight:500 }} />
                </div>
                <div style={{height:15,width:1,backgroundColor:'grey'}}></div>
                <div style={{ display:'flex',width: "50px", cursor: "pointer",justifyContent:'center' }} onClick={() => closeBrokerModal()}>
                    <CloseOutlined style={{fontSize:18,fontWeight:500 }} />
                </div>
            </div>

            <div className="content-head">
                <div className="content-head-svg">
                    <VideoCameraOutlined style={{fontSize:18,fontWeight:500,color:'#cea0e1' }} />
                </div>
                <div style={{ color: "#CEA0E1", marginLeft: "8px" }}>
                    New Proposition Meeting
                </div>
            </div>
            <div className="content-dt-time">
                <div className="content-dt-time-left"><div>Date</div><div>{ moment(props?.editData?.startDate).format('DD/MM/YYYY') }</div></div>
                <div className="content-dt-time-right"><div>Time</div><div >{moment(props?.editData?.startDate, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A') + " to " + moment(props?.editData?.endDate, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')}</div></div>
            </div>
            <div className="content-dt-time">
                <div className="content-dt-time-left"><div>Location</div><div>{props?.editData?.location}</div></div>
                <div className="content-dt-time-right"><div>Mode</div><div>{props?.editData?.mode}</div></div>
            </div>
            <div className="content-dt-time">
                <div className="content-dt-time-left"><div>Client</div><div>{'TATA AIG'}</div></div>
                {/* <div className="content-dt-time-right"><div>Location</div><div>{props?.editData?.location}</div></div> */}
                <div className="content-dt-time-right">
                    <div>Agenda</div>
                    <div>{props?.editData?.tata_appointment_type}</div>
                </div>
            </div>
            <div className="minutes">
                <div className="minutes-content">
                    <div>Minutes of Meeting</div>
                    <div>{props?.editData?.event_description}</div>
                </div>
            </div>
            
        </Modal>
    </>
  );
});

export default NewLead;
