import React,{useState,useEffect} from 'react'
import { Button, Typography,Row,Col } from 'antd'
import {CaretDownOutlined,CloudUploadOutlined} from '@ant-design/icons'
import DataField from '../DataField/DataField'
import './Team.css'
import EventCreate from '../EventCreate/EventCreate'
import HistoryTab from '../History-showedData/index'


const Team = () => {
  const [isActive,setActive] =useState(false);
  const [isActive1,setActive1] =useState(false);

  const [selected, setSelected]=useState("");
  const [selected1, setSelected1]=useState("");


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
                <Col span={6} className='Team-Calender-first'>
                    <Typography>From Date</Typography>
                    <input type="date"/>
                </Col>
                <Col span={6} offset={1}className='Team-Calender-second'>
                    <Typography>To Date</Typography>
                    <input type='date'/>
                </Col>
                <Col span={6} offset={2} className='Team-Calender-Export'>
                    <Button> <CloudUploadOutlined /> Export</Button>
                </Col>
            </Row>
        </div>
        <EventCreate/>
        <HistoryTab Remove={RemoveData}/>
        <div className='Team-Information'>
        <DataField/>
        </div>
    </div>
  )
}

export default Team