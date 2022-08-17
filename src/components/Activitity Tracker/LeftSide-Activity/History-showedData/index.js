import React,{useState,useEffect} from 'react'
import {Typography} from 'antd'
import {MinusCircleFilled,PlusCircleFilled} from '@ant-design/icons'
import './index.css'


const Index = ({Remove}) => {
  const [Self,setSelf]=useState(true);
  const [Team,setTeam]=useState(true);
  useEffect(()=>{
    if(Remove ==false){
      setTeam(false)
    }
  },[Remove])
  return (
    <div className='PastFuture'>
        <Typography>Past Date Show 2 Events from past</Typography>
        {Team?Self ?
        // <p type='button' onClick={(e)=>{
        //   console.log(e);
        //   setSelf(false)
          
        // }}>+</p>
        <PlusCircleFilled  style={{fontSize:"20px"}}
        onClick={(e)=>{
          setSelf(false)
        }}
        />
        :
        // <p type='button' onClick={(e)=>{
        //   console.log(e);
        //   setSelf(true)
        // }}>-</p>
        <MinusCircleFilled
        style={{fontSize:"20px"}}
        onClick={(e)=>{
            console.log(e);
            setSelf(true)
          }} 
        />
        :""}
    </div>
  )
}

export default Index