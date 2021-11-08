import React, { useEffect, useState } from 'react';
import { Avatar,Button,Modal,Input,DatePicker} from 'antd';
import {
    FormOutlined,
MailOutlined,
  PlusOutlined,
  PhoneOutlined,
  SlidersFilled,

   } from '@ant-design/icons';
import './ExistingPartnerDetails.css';
import CreateAdvisorModal from './CreateAdvisorModal';
import axios from 'axios';
import PartnerFloatButton from './PartnerFloatButton';
const UserList = ['U', 'L', 'To', 'Ed'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];
const ExistingPartnerDetails=()=>{
    const [user, setUser] = useState(UserList[0]);
    const [color, setColor] = useState(ColorList[0]);
    const [gap, setGap] = useState(GapList[0]);
    const[isAdvisorModalVisible,setIsAdvisorModalVisible]=useState(false)
    useEffect(()=>{
      axios.get("https://sdtatadevlmsv2.iorta.in/secure/user/fetch_existing_partners?userId=616e908c43ed727bbac8d2d4&partnerType=v1&status=inactive&skip=0")
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
console.log(err)
      })
      // alert(isAdvisorModalVisible)
    })
    const CreateEventButtonFunc=()=>{
      setIsAdvisorModalVisible(true)
      // alert(isAdvisorModalVisible)
    }
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

    const showModal = () => {
      setIsUpdateModalVisible(true);
    };
  
    const handleOk = () => {
      setIsUpdateModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsUpdateModalVisible(false);
    };
    const onChangeDate=(date, dateString)=> {
      console.log(date, dateString);
    }
    return(
        <div
        className="Existingpartnerdetails-main-flex"
        >
       <div
       className="Existingpartnerdetails-row-flex"
       >

           {/*Card Region */}
<div
className="Existingpartnerdetails-card-flex"
>
<Modal 
className="Existingpartnerdetails-modal-style"
title="Update Contact Details" visible={isUpdateModalVisible} onOk={handleOk} 
footer={[
 
  
      <Button type="primary" className="Existingpartnerdetails-modal-update-button-style">Update</Button>,
      <Button type="primary" className="Existingpartnerdetails-modal-cancel-button-style" onClick={handleCancel}>Cancel</Button>,


  
  
]}
width="50%"
bodyStyle={{
  height: "auto",
  // display:"flex",
  // flexDirection:"column"
  overflowY: "scroll"

}}
>
        <div
        className="Existingpartnerdetails-modal-row-flex"
        >
          <div>
          <p className="Existingpartnerdetails-modal-title-text-style">Partner Name</p>
          <input         className="Existingpartnerdetails-modal-input-style"/>
          </div>
          <div>
          <p className="Existingpartnerdetails-modal-title-text-style">Email Id</p>
          <input         className="Existingpartnerdetails-modal-input-style"/>
         
          </div>
        </div>
        <div
        className="Existingpartnerdetails-modal-row-flex"
        >
          <div>
          <p className="Existingpartnerdetails-modal-title-text-style">Contact No</p>
          <input         className="Existingpartnerdetails-modal-input-style"/>
          </div>
          <div>
          <p className="Existingpartnerdetails-modal-title-text-style">Address</p>
          <input         className="Existingpartnerdetails-modal-input-style"/>
          </div>
        </div>
        <div
        className="Existingpartnerdetails-modal-row-flex"
        >
            <div>
          <p className="Existingpartnerdetails-modal-title-text-style">Date Of Birth</p>
          <DatePicker className="Existingpartnerdetails-modal-input-style" onChange={onChangeDate} />
          </div>
        </div>
        
      </Modal>
<div
className="Existingpartnerdetails-card-style"
>
<div
className="Existingpartnerdetails-avatar-flex"
>
<div
className="Existingpartnerdetails-avatar-row-flex"
>
    <div
    className="Existingpartnerdetails-avatar-row-flex"
    >
<Avatar
        style={{
          backgroundColor: "#00ACC1",
          verticalAlign: 'middle',
        
          marginRight:"10px"
        }}
        size="large"
        gap={gap}
      >
       P
      </Avatar>
      <div
      className="Existingpartnerdetails-avatar-name-column-flex"
      >
      <p className="Existingpartnerdetails-avatar-name-text-style">Pratik Naik</p>
      <p className="Existingpartnerdetails-avatar-partner-text-style"><strong>Partner ID</strong> 6112223</p>
      </div>
 
     </div>
     <div
     className="Existingpartnerdetails-modal-pointer"
     onClick={showModal}
     >
     <FormOutlined 
       style={{
        fontSize:"20px",
        marginTop:"10px",
       
        // marginRight:"8px"
        }}
      />
     </div>
     
</div>

</div>
<div
className="Existingpartnerdetails-card-middle-horizontal-line-style"
></div>

<div
className="Existingpartnerdetails-contacts-flex"
>

<div
className="Existingpartnerdetails-contacts-row-flex"
>
<p className="Existingpartnerdetails-contacts-text-style">Contact</p>
<div
className="Existingpartnerdetails-create-event-row-flex"
onClick={CreateEventButtonFunc}
>
<p className="Existingpartnerdetails-create-event-text-style">Create an event</p>
    <PlusOutlined
        style={{
          fontSize:"16px",
          marginTop:"3px",
          color:"#00ACC1"
      
          // marginRight:"8px"
          }}
    />
</div>
    
</div>

</div>
<div
className="Existingpartnerdetails-card-middle-horizontal-line-style"
></div>
<div
className="Existingpartnerdetails-phone-mail-flex"
>
  <div
  className="Existingpartnerdetails-phone-mail-row-flex"
  >
    <MailOutlined 
 style={{
  fontSize:"16px",
  marginRight:"9px"
  
  }}
/>
<p className="Existingpartnerdetails-phone-mail-number-text-style">0</p>
  </div>
  <div
  className="Existingpartnerdetails-phone-mail-row-flex"
  >
      <PhoneOutlined 
          rotate="180"
   style={{
    fontSize:"16px",
    marginRight:"9px"
    
    }}
  />
  <p>0</p>
  </div>

</div>
<div
className="Existingpartnerdetails-card-middle-horizontal-line-style"
></div>
<div
className="Existingpartnerdetails-birthdate-flex"
>
  <p>Date of Birth</p>
</div>
<div
className="Existingpartnerdetails-card-middle-horizontal-line-style"
></div>
<div
className="Existingpartnerdetails-inner-card-flex"
>
  <div
  className="Existingpartnerdetails-inner-card-row-flex"
  >
  <div className="Existingpartnerdetails-inner-card-style">
    <div
    className="Existingpartnerdetails-inner-card-top-style"
    >
      <div
          className="Existingpartnerdetails-inner-card-top-column-flex"
      >
      <p className="Existingpartnerdetails-inner-card-top-heading-text">Target</p>
      <p className="Existingpartnerdetails-inner-card-top-rupees-text">₹10000</p>
      </div>

      <div
          className="Existingpartnerdetails-inner-card-top-column-flex"
      >
      <p className="Existingpartnerdetails-inner-card-top-heading-text">Achieved</p>
      <p className="Existingpartnerdetails-inner-card-top-rupees-text">₹9000</p>
      </div>
      <div
          className="Existingpartnerdetails-inner-card-top-column-flex"
      >
      <p className="Existingpartnerdetails-inner-card-top-heading-text">%Achieved</p>
      <p className="Existingpartnerdetails-inner-card-top-rupees-text">90.00%</p>
      </div>
    </div>

<div
className="Existingpartnerdetails-card-middle-horizontal-card-line-style"
></div>
<div
className="Existingpartnerdetails-card-middle-horizontal-card-margin-style"
>
<p className="Existingpartnerdetails-inner-card-top-heading-text">Current Club*</p>
<div className="Existingpartnerdetails-card-innercard-row-flex">
<p className="Existingpartnerdetails-inner-card-top-rupees-text">Silver</p>
<p className="Existingpartnerdetails-inner-card-top-heading-text">*As per GPW</p>
</div>

</div>




<div
className="Existingpartnerdetails-card-middle-horizontal-card-line-style"
></div>
<div
className="Existingpartnerdetails-card-middle-horizontal-card-margin-style"
>
<p className="Existingpartnerdetails-inner-card-top-heading-text">Next Club*</p>
<div className="Existingpartnerdetails-card-innercard-row-flex">
<p className="Existingpartnerdetails-inner-card-top-rupees-text">Gold</p>
<div
          className="Existingpartnerdetails-inner-card-top-column-flex"
      >
      <p className="Existingpartnerdetails-inner-card-top-heading-text">Balance to Achieve</p>
      <p className="Existingpartnerdetails-inner-card-top-rupees-text">₹1,000</p>
      </div>
<p className="Existingpartnerdetails-inner-card-top-heading-text">*As per GPW</p>
</div>

</div>
  </div>
  </div>
  
</div>

</div>
</div>
<div
     
     className="Existingpartnerdetails-floater-button-column-flex"
 >
   <PartnerFloatButton/>
{/* <Button
    onClick={()=>{}}
    
    className="Existingpartnerdetails-floater-button-style"
    type="primary" shape="circle" icon={<PlusOutlined  
        style={{
            fontSize:"30px",
       
       
            // marginRight:"8px"
            }}
    rotate={90}/>}  /> */}
</div>

       </div>
       {isAdvisorModalVisible?
        <CreateAdvisorModal
        advisorModalVisible={true}
        />
       :null}
      
        </div>
    )
}
export default ExistingPartnerDetails