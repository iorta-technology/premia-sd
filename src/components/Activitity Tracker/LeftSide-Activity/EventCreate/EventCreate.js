import {Typography} from 'antd'
import React,{useState,useEffect} from 'react'
import LeftButton from '../../icons/leftcalenderarrow.png'
import RightButton from '../../icons/rightcalenderarrow.png'
import Create from '../../ModalBox/ModalBox-Open'
import EventCreateComponent from '../../../Contests/CalendarEvent'
import Addactivity from '../../icons/Addactivity.png'
// import axios from '../../../../axios-request/request.methods'
import axios from 'axios'
import './EventCreate.css'


const EventCreate = ({monthData,yearData}) => {

  const MonthContainer=[{1:'Jan', 2:'Feb',3:'Mar', 4:'Apr', 
    5:'May', 6:'Jun', 7:'Jul', 8:'Aug', 9:'Sep', 10:'Oct', 
    11:'Nov', 12:'Dec'}];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const [count,setCount]=useState((1+ new Date().getMonth()))
  const [month,setMonth]=useState(MonthContainer[0][1+ new Date().getMonth()]);
  const [year,setYear]=useState(new Date().getFullYear())
  const [requestData,setRequestData]=useState()

  const eventClickBtnDec=()=>{
      setCount(count - 1)
      if(count <=1){
        setCount(12)
        console.log(setCount(count+11));
        setYear(year - 1)
      }
      setMonth(MonthContainer[0][count]);
  }
  const eventClickBtnInc= (e,data)=>{
    setCount(count+1)
    if(count>11){
      setCount(1);
      setYear(year+1)
    }
  }

  // useEffect(()=>{ console.log(month,count)},[count,month])

  const api = async ()=>{
    // await axios.get('https://abinsurancenode.salesdrive.app/sdx-api/secure/user/getAppointment/60069a18579be233d2decf04')
    // let data = await axiosRequest.get('user/getAppointment/60069a18579be233d2decf04');
    const {data}= await axios.get(`https://pocbancanode.iorta.in/secure/user/fetch_appointments/60e5d6056b18e8309da3fa49?teamdata=0&filter=0${count}/${year}`);  
    setRequestData(data.errMsg)
    // console.log(data);
  }
  monthData(count);
  yearData(year);

  useEffect(async ()=>{
    api()  
  },[count,year])
  
  return (
        <div className='EventCreate-dateChange'>
          <div className='EventCreate-Right'>
            <img src={LeftButton} 
            style={{backgroundSize:"100% 100%",cursor:"pointer" }} 
            alt="left-side-button"
            onClick={eventClickBtnDec}/>
            <p>
              {MonthContainer[0][count]} - {year}
            </p>
            <img src={RightButton} 
            style={{backgroundSize:"100% 100%",cursor:"pointer"}} 
            alt="right-side-button"
            onClick={eventClickBtnInc}/>
          </div>
          {
              isModalVisible == true ?
              <EventCreateComponent click={'data'}/>
              :""
            }
          <div className='EventCreate-btn'>
            <Typography>Create an Event</Typography>
            <img src={Addactivity} alt='Addactivity' 
            style={{backgroundSize: '100% 100%',cursor:"pointer"}} 
            onClick={showModal}/>
          </div>
            
        </div>
  )
}

export default EventCreate