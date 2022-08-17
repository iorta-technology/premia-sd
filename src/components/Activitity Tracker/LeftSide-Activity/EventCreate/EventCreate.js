import {Button, Modal, Typography} from 'antd'
import React,{useState,useEffect} from 'react'
import LeftButton from '../../icons/leftcalenderarrow.png'
import RightButton from '../../icons/rightcalenderarrow.png'
import {LeftOutlined,RightOutlined,PlusSquareFilled} from '@ant-design/icons'
import Create from '../../ModalBox/ModalBox-Open'
import EventCreateComponent from '../../../Contests/CalendarEvent'
import Addactivity from '../../icons/Addactivity.png'
import './EventCreate.css'


// const [monthIncrement,setCount]=useState(0);
// const [monthDecrement,setDecre]=useState(0);

// const increDecre=()=>{
//   setCount(monthIncrement+1);
// }

// const Decre=()=>{
// }

// useEffect(()=>{
//   var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   const Month=strArray[new Date().getMonth()];
//   const inCreMonth=Month+monthIncrement;
//   const MonthData=strArray[inCreMonth];
//   const Year=new Date().getFullYear();

// },[])

const EventCreate = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const eventClickBtn=(event)=>{
    event()
  }
  const click=(data)=>{
    console.log(data);
  }

  return (
        <div className='EventCreate-dateChange'>
          <div className='EventCreate-Right'>
            <img src={LeftButton} 
            style={{backgroundSize:"100% 100%" }} 
            alt="left-side-button"/>
            <p>
              Jul-2022
            </p>
            <img src={RightButton} 
            style={{backgroundSize:"100% 100%"}} 
            alt="right-side-button"/>
          </div>
          {
              isModalVisible == true ?
              <EventCreateComponent click={'data'}/>
              :""
            }
          <div className='EventCreate-btn'>
            <Typography>Create an Event</Typography>
            <img src={Addactivity} alt='Addactivity' 
            style={{backgroundSize: '100% 100%'}} 
            onClick={showModal}/>
            {/* <PlusSquareFilled onClick={showModal}/> */}
            {/* <Create setIsModalVisible={setIsModalVisible}
            isModalVisible={isModalVisible}/> */}
          </div>
            
        </div>
  )
}

export default EventCreate