import React,{useState,useEffect} from 'react'
import {Typography} from 'antd'
import {MinusCircleFilled,PlusCircleFilled} from '@ant-design/icons'
import './index.css'


const Index = ( {Remove,CurentOrPast,pastData,teamPast} ) => {
  const [Self,setSelf]=useState(true);
  const [Team,setTeam]=useState(true);
  CurentOrPast(Self);
  
  useEffect(()=>{
    if(Remove ==false){
      setTeam(false)
    }
  },[Remove])
useEffect(()=>{
  console.log(pastData);
},[])

  const currentEvent=`Past Date Show ${pastData||teamPast} Events from past`
  const historyEvent='Hide all past events for the month'
  return (
    <div className='PastFuture'>
          {Self ?
          <div className='pastEvent'>
            <span style={{padding:"0px"}}>
                Past Date
              <span className='pastEventChange'>Show</span>
                {pastData||teamPast}
              <span className='pastEventChange'>Events from past</span>
              
            </span>
          </div>
          : <Typography>{historyEvent}</Typography>}
        {
          Team ? Self ? 
            <PlusCircleFilled  style={{fontSize:"20px",marginRight:"7px"}}
              onClick={(e)=>{
              setSelf(false)
              }}
            />
        :
          <MinusCircleFilled
          style={{fontSize:"20px",marginRight:"7px"}}
          onClick={(e)=>{
              console.log(e);
              setSelf(true)
            }} 
          />
          :""
        }
    </div>
  )
}

export default Index