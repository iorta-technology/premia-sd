import React,{useState,useEffect} from 'react'
import {Typography} from 'antd'
import './Self.css'
import PastFutureData from '../History-showedData'
import JSONData from '../../JSON/json'
import DataField from '../DataField/DataField'
import EventCreate from '../EventCreate/EventCreate'
import axios from 'axios';

const Self = () => {
  const [month,setMonth]=useState()
  const [year,setyear]=useState()
  const [ApiDataContainer,setApiDataContainer]=useState();
  const [CurentOrPast,setCurentOrPast]=useState()
  const [pastEventLenght,setPastEventLength]=useState();

  const api = async ()=>{
    let {data} = await axios.get(`https://pocbancanode.iorta.in/secure/user/fetch_appointments/60e5d6056b18e8309da3fa49?teamdata=0&filter=${month}/${year}`);
    setApiDataContainer(data);

  }
  useEffect(()=>{
    if(ApiDataContainer){
      for(let i = 0; i < ApiDataContainer.errMsg.length; i++){
        let a = 1+new Date(ApiDataContainer.errMsg[i].start_time_MS).getMonth();
        let b = 1+ new Date().getMonth();
        if(a==b){
          const filterCurrentData= ApiDataContainer?.errMsg.filter((element,index,arr)=>((1 + new Date(element?.start_time_MS).getDate()) < (1 + new Date().getDate())))
          if(filterCurrentData){
            setPastEventLength(filterCurrentData?.length);
          }
        }
      }
    }  
  },[month,year,CurentOrPast])
  
  useEffect(()=>{
      api();
  },[month,year,CurentOrPast])
  return (
    <div className='Self-Container'>
      <EventCreate monthData={setMonth} yearData={setyear}/>
        <div className='eventChange'>
            {
              ApiDataContainer ?.errCode == -1 && 
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
        <DataField Self = {month +'/'+ year}
          history={CurentOrPast}
          SelfHere='self'
        />
    </div>
  )
}

export default Self;