import React,{useState,useEffect,} from 'react'
import { Button, Typography,Row,Col, Select } from 'antd'
import {CaretDownOutlined,CloudUploadOutlined} from '@ant-design/icons'
import DataField from '../DataField/DataField'
import './Team.css'
import EventCreate from '../EventCreate/EventCreate'
import HistoryTab from '../History-showedData/index'
import axios from 'axios'
import {stoageGetter} from '../../../../helpers'

import { useDispatch, useSelector } from 'react-redux';
const { Option } = Select;
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
    
  const [isActive,setActive] =useState(false);
  const [isActive1,setActive1] =useState(false);
  const[finalhierarchy, setFinalHierarchy] = useState()
  const [selected, setSelected]=useState("");
  const [selectedvalue, setSelectedValue]=useState("");
  const [selected1, setSelected1]=useState("");
  const [users, setUsers] = useState('')
  const [selectedvalue1, setSelectedValue1]=useState("");
  const [month,setMonth]=useState()
  const [year,setyear]=useState()
  const [CurentOrPast,setCurentOrPast]=useState()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const breakpoint = 620;
  const options=["All","Zonal Manager","Area Manager","Sales Manager"];
  const options2=["Ankit Singh","Rahul Patali","Otter","Sawa"];
  const RemoveData=false; 

  const _dataStore = useSelector((state) => state?.home?.user_tree)
  console.log(_dataStore, 'datastore before----->')
  useEffect(() => {
    try{
    
    let reportingHierarchies = _dataStore.reporting_hierarchies
    let hiererchyusers = _dataStore.reporting_users
    console.log(reportingHierarchies, 'reporting Hierarchies before----->')
    if(reportingHierarchies != undefined){
        let all = [{value : 'All', dispValue : 'All'}]
        let final = [...all,...reportingHierarchies]
        setFinalHierarchy(final)
        setSelected(final[0].value)
        setSelectedValue(final[0].dispValue)
        console.log(reportingHierarchies, 'reporting Hierarchies----->')
        setUsers(hiererchyusers)
        setSelected1()
    }else{
        let all = [{value : 'All', dispValue : 'All'}]
        let final = [...all]
        setFinalHierarchy(final)
        setSelected(final[0].value)
        setSelectedValue(final[0].dispValue)
        console.log(reportingHierarchies, 'reporting Hierarchies----->')
        setUsers(hiererchyusers)
    }
    }catch(err){
        console.log(err)
    }
    }, [])

    const hierarchyOnchange =(element) =>{
        console.log(element)
        setSelected(element);
        // setSelectedValue(element.dispValue)
        setActive(false)
        let filterdata = _dataStore.reporting_users.filter(((data,index,arr) => data.hierarchy_id == element))
        console.log(filterdata,'filter data')
        let all = [{full_name : 'Select' , hierarchy_id : 'Select'}]
        let final = [...all,...filterdata]
        setUsers(final)
        setSelectedValue1('Select')
        setSelected1('Select')
    }
    
    const userOnchange =(element) =>{
        console.log(element)
        setSelected1(element);
        // setSelectedValue(element.dispValue)
        setActive1(false)
    }

    // let reportingHierarchies = _dataStore.reporting_hierarchies
    //     setFinalHierarchy(reportingHierarchies)
    //     console.log(reportingHierarchies, 'reporting Hierarchies----->')
  return (
    <div className='Team'>

     
        
    {/* {
        windowWidth > breakpoint &&
        <Row>
        <Col md={9} lg={9} xl={9}>
        <Typography>Hierarchy</Typography>
        <div style={{marginTop : 10}}>
       <Select value={selected} onChange={hierarchyOnchange}>
       {
                                finalhierarchy?.map((element,index)=>{
                                    return(
                                        <Option
                                            value={element.value}
                                            key={index} >{element.dispValue}
                                        </Option>
                                    )
                                })
                            }    
       </Select>
       </div>
       </Col>
       <Col md={9} lg={9} xl={9} offset={1}>                     
       {
        selected !='All' && selected.length>1 ?
        <div >
            <Typography>Circle Manager</Typography>
            <div style={{marginTop : 10}}>
       <Select value={selected1}  onChange={userOnchange}>
       {
                                users?.map((element,index)=>{
                                    return(
                                        <Option
                                        value={element.hierarchy_id}
                                            key={index} >{element.full_name}
                                        </Option>
                                    )
                                })
                            }    
       </Select>
       </div> 
       </div>
       : null 
       }
       </Col>
        </Row>
    }

    {
        windowWidth < breakpoint &&
        <div>
            
                        <Typography>Hierarchy</Typography>
                        <div style={{marginTop : 10}}>
                    <Select value={selected} onChange={hierarchyOnchange}>
                    {
                                                finalhierarchy?.map((element,index)=>{
                                                    return(
                                                        <Option
                                                            value={element.value}
                                                            key={index} >{element.dispValue}
                                                        </Option>
                                                    )
                                                })
                                            }    
                    </Select>
                    </div>

                    {
                        selected !='All' && selected.length>1 ?
                        <div style={{marginTop : 10}}>
                            <Typography>Circle Manager</Typography>
                            <div style={{marginTop : 10}}>
                    <Select value={selected1}  onChange={userOnchange}>
                    {
                                                users?.map((element,index)=>{
                                                    return(
                                                        <Option
                                                        value={element.hierarchy_id}
                                                            key={index} >{element.full_name}
                                                        </Option>
                                                    )
                                                })
                                            }    
                    </Select>
                    </div> 
                    </div>
                    : null 
                    }
                    
        </div>
    } */}
           
        <div className="Team-Calender">
        {/* {
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
        } */}
          {/* {
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
        } */}
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