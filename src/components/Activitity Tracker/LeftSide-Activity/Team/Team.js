import React,{useState,useEffect,} from 'react'
import { Button, Typography,Row,Col } from 'antd'
import {CaretDownOutlined,CloudUploadOutlined} from '@ant-design/icons'
import DataField from '../DataField/DataField'
import './Team.css'
import EventCreate from '../EventCreate/EventCreate'
import HistoryTab from '../History-showedData/index'
import axios from 'axios'
import {stoageGetter} from '../../../../helpers'

import { useDispatch, useSelector } from 'react-redux';

const useWidowsSize = () => {
    const [size, setSize] = useState([window.Width, window.height]);
    
    useEffect(() => {
      
        const handleChangeSize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', handleChangeSize);
    }, [])
    return size;
  }

const Team = () => {
    // const _dataStore = useSelector((state) => state?.home?.user_tree)
    // console.log(_dataStore,'data store---->')
  const [isActive,setActive] =useState(false);
  const [isActive1,setActive1] =useState(false);

  const [selected, setSelected]=useState("");
  const [selected1, setSelected1]=useState("");

  const [month,setMonth]=useState()
  const [year,setyear]=useState()
  const [CurentOrPast,setCurentOrPast]=useState()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const breakpoint = 620;
  const options=["All","Zonal Manager","Area Manager","Sales Manager"];
  const options2=["Ankit Singh","Rahul Patali","Otter","Sawa"];
  const RemoveData=false; 
  return (
    <div className='Team'>

        <div className='Team-Top'>
            
            <div className='dropdown'>
        
    {
        windowWidth > breakpoint &&
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
    }

{
        windowWidth < breakpoint &&
        <div>
             <div >
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
                        <div style={{marginTop : 10}}>
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
}
            </div> 
        </div>
        <div className="Team-Calender">
        {
        windowWidth >breakpoint &&
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
        }
          {
        windowWidth < breakpoint &&
        <div>
            <Row className='Team-Calender-row'>
                <Col span={12} className='Team-Calender-first'>
                    <Typography>From Date</Typography>
                    <input type="date"/>
                </Col>
                <Col span={11} offset={1}className='Team-Calender-second'>
                    <Typography>To Date</Typography>
                    <input type='date'/>
                </Col>
            </Row>
            <Row className='Team-Calender-row'>
                <Col span={3} offset={18} className='Team-Calender-Export'>
                    <Button> <CloudUploadOutlined /> Export</Button>
                </Col>
            </Row>
            </div>
        }
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
            <DataField TeamData={month+'/'+year}
            TeamHere={(month) ==(1 + new Date().getMonth()) && (year) ==(new Date().getFullYear())}
            />
        </div>
    </div>
  )
}

export default Team