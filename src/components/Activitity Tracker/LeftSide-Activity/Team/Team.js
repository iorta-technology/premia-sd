import React,{useState,useEffect} from 'react'
import { Button, Typography,Row,Col } from 'antd'
import {CaretDownOutlined,CloudUploadOutlined} from '@ant-design/icons'
import DataField from '../DataField/DataField'
import './Team.css'
import EventCreate from '../EventCreate/EventCreate'
import HistoryTab from '../History-showedData/index'
import axios from 'axios'
import {stoageGetter} from '../../../../helpers'

const Team = () => {
  const [isActive,setActive] =useState(false);
  const [isActive1,setActive1] =useState(false);

  const [selected, setSelected]=useState("");
  const [selected1, setSelected1]=useState("");

  const [month,setMonth]=useState()
  const [year,setyear]=useState()
  const [ApiDataContainer,setApiDataContainer]=useState();
  const [CurentOrPast,setCurentOrPast]=useState()

  const api = async ()=>{
    let id=stoageGetter('user')
    let {data}=await axios.get(`https://abinsurancenode.salesdrive.app/sdx-api/secure/user/fetch_appointments/${id}?teamdata=0&filter=${month}/${year}`);
    setApiDataContainer(data.errMsg);
  }
  useEffect(()=>{
      api();
  },[month,year])

  const options=["All","Zonal Manager","Area Manager","Sales Manager"];
  const options2=["Ankit Singh","Rahul Patali","Otter","Sawa"];
  const RemoveData=false; 
  return (
    <div className='Team'>
        <div className='Team-Top'>
            <div className='dropdown'>
        
                <div className='dropDown-Container'>
                    <div className='Tean-Hierarchy'>
                        <Typography>Hierarchy</Typography>
                        <div className='dropdown-btn' 
                            onClick={(e)=>{
                                setActive(!isActive)
                            }}
                        >
                            {
                                selected.length > 1 ? selected:options[0]
                            }   
                            <CaretDownOutlined/>
                        </div>
                                {
                                    isActive &&(
                                        <div className='dropdown-content'>
                                            {
                                                options.map((element,index)=>{
                                                    return(
                                                        <div className='dropdown-item'
                                                            onClick={((e)=>{
                                                                setSelected(element);
                                                                setActive(false)
                                                            })}
                                                            key={index}>{element}
                                                        </div>
                                                    )
                                                })
                                            }    
                                        </div>
                                    )
                                }
                    </div>
                    {
                        selected !='All' ? selected.length>1 ?
                        <div className='Team-CircleManager'>
                            <Typography>Circle Manager</Typography>
                            <div className={'dropdown-btn dropdown-btn-2nd'}
                                onClick={(e)=>{
                                    setActive1(!isActive)
                                }}
                            >
                                
                            {selected1.length > 1 ? selected1:options[0]} 
                            <CaretDownOutlined />
                        </div>
                        {
                            isActive1 &&(
                                <div className='dropdown-btn-2nd-dropdown-content dropdown-content'>
                                    {
                                        options2.map((element,index)=>{
                                            return(
                                                <div className='dropdown-item'
                                                    onClick={((e)=>{
                                                        setSelected1(element);
                                                        setActive1(false)
                                                    })}
                                                    key={index}>{element}
                                                </div>
                                            )
                                        })
                                    }    
                                </div>
                            )
                        }
                        </div>
                        :"":""
                    }
                </div>
            </div> 
        </div>
        <div className="Team-Calender">
            <Row className='Team-Calender-row'>
                <Col span={9} className='Team-Calender-first'>
                    <Typography>From Date</Typography>
                    <input type="date"/>
                </Col>
                <Col span={9} offset={1}className='Team-Calender-second'>
                    <Typography>To Date</Typography>
                    <input type='date'/>
                </Col>
                <Col span={2} offset={1} className='Team-Calender-Export'>
                    <Button> <CloudUploadOutlined /> Export</Button>
                </Col>
            </Row>
        </div>
        <EventCreate monthData={setMonth} yearData={setyear} />
        <div className=''>

        </div>
        {   
            ((month) == ( 1 + new Date().getMonth()) && (year) == (new Date().getFullYear())) 
            ?
            <HistoryTab Remove={RemoveData} CurentOrPast={setCurentOrPast} teamPast= '0'/>
            :((month) >= ( 1 + new Date().getMonth()) && (year) >= (new Date().getFullYear())) ||
            (month < (1+ new Date().getMonth()) && year > (new Date().getFullYear()))
            ?
            <Typography className='Team-Past'>UPCOMING</Typography>    
            :
            <Typography className='Team-Past'>PAST</Typography>
        }
        <div className='Team-Information'>
            <DataField TeamData={month +'/'+year}
            TeamHere={(month) ==(1 + new Date().getMonth()) && (year) ==(new Date().getFullYear())}
            />
        </div>
    </div>
  )
}

export default Team