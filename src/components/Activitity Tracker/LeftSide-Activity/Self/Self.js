import React,{useState,useEffect, useRef} from 'react'
import {Typography} from 'antd'
import './Self.css'
import PastFutureData from '../History-showedData'
import JSONData from '../../JSON/json'
import DataField from '../DataField/DataField'
import EventCreate from '../EventCreate/EventCreate'
import axios from 'axios';
import axiosRequest from '../../../../axios-request/request.methods'
import {stoageGetter} from '../../../../helpers'

const Self = () => {
  const [month,setMonth]=useState()
  const [year,setyear]=useState()
  const [PastDataContainer,setPastDataContainer]=useState();
  const [CurentOrPast,setCurentOrPast]=useState()
  const [pastEventLenght,setPastEventLength]=useState();
  const [getshow, setGetShow] = useState();
  let getdata = false;
  // const childRef = useRef(null);

  // const apidata = () => {
  //   childRef.current.api()
  // }
  
  useEffect(()=>{
   
    api();
  },[month,year,CurentOrPast]);
  let {id}=stoageGetter('user');
  const api = async ()=>{
    let data = await axiosRequest.get(`user/fetch_appointments/${id}?teamdata=0&filter=${month}/${year}`);
    console.log(data);
    setPastDataContainer(data);
  }
  useEffect(()=>{
    if(PastDataContainer){
      for(let i = 0; i < PastDataContainer?.length; i++){
        let a = 1+new Date(PastDataContainer[i].start_time_MS).getMonth();
        console.log(a);
        let b = 1+ new Date().getMonth();
        if(a==b){
          const filterCurrentData = PastDataContainer?.filter((element,index,arr)=>((1 + new Date(element?.start_time_MS).getDate()) <= (1 + new Date().getDate())))
          if(filterCurrentData){
            setPastEventLength(filterCurrentData?.length);
          }
        }
      }
    } 
  },[PastDataContainer])
 
  return (
    <div className='Self-Container'>
      <EventCreate monthData={setMonth} yearData={setyear}  getFunc = {api}  getdata = {setGetShow} />
        <div className='eventChange'>
            {
              PastDataContainer?.length >0 && 
              (month == 1+new Date().getMonth() && year == new Date().getFullYear())
              ?
                <PastFutureData CurentOrPast={setCurentOrPast}
                pastData={pastEventLenght}/>
              :""
            }
        </div>
        <div className='upcoming'>
          {
              (month == (1+new Date().getMonth()) && year == (new Date().getFullYear()))
              ?
              ""
              :
              (month >= (1+new Date().getMonth()) && year >= (new Date().getFullYear())) ||
              (month < (1+ new Date().getMonth()) && year > (new Date().getFullYear()))
              ?
                <p>UPCOMING</p>
                :
                <p>PAST</p>
          }
        </div>
        <DataField SelfMonthYear = {month +'/'+ year}
          history={CurentOrPast}
          SelfHere='self'
          // ref={childRef}
          getFunc={api}
          getdata = {getshow}
        />
    </div>
  )
}

export default Self;