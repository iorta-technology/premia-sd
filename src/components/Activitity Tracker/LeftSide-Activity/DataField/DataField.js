import React,{useState,useEffect, useRef, useImperativeHandle, forwardRef} from 'react'
import {Typography} from 'antd'
import {FormOutlined, MessageOutlined} from '@ant-design/icons';
import EventCreateButton from '../EventCreateButton/EventCreateButton';
import EventCreateComponent from '../../../Contests/CalendarEvent'
import axios from 'axios'
import axiosRequest from '../../../../axios-request/request.methods'
import {stoageGetter} from '../../../../helpers'
import commentIcon from '../../icons/comment.png'
import './DataField.css';
import { Col, Row } from 'antd';

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

const DataField = ({SelfMonthYear,history,TeamData,TeamHere, getFunc, getdata}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editData, setEditData] = useState({})
  //   const [isModalVisible, setIsModalVisible] = useState(
  //   {
  //     check:false,
  //     Data:null
  //   }
  // );
    const [windowWidth, setWidth] = useState(window.innerWidth);
    const breakpoint = 620;
    const showModal = (e) => {
      setIsModalVisible(true)
      setEditData(e)
      // setIsModalVisible({
      //   check:true,
      //   Data:e
      // });
    };

  const [DataContainer,setDataContainer]=useState();
  

//   useImperativeHandle(ref, () => ({
//     api : () =>{ api() }
// }));

  useEffect(()=>{
     api();
     console.log('yesssssss------>')
  },[SelfMonthYear,TeamData,history,getdata]);

  

  let {id}=stoageGetter('user')
    const api = async ()=>{
     
      const currentMonth =(1 + new Date().getMonth());
      const currentYear =new Date().getFullYear();
      const monthYear=currentMonth+'/'+currentYear;
      const MonthCompare = monthYear === SelfMonthYear;
      

      if(MonthCompare && history || TeamHere){
        let result = await axiosRequest.get(`user/fetch_appointments/${id}?teamdata=0&filter=${SelfMonthYear||TeamData?SelfMonthYear||TeamData : monthYear}&category=upcoming`)
        setDataContainer(result)
        console.log(result);
       }else if(MonthCompare && history == false){
        let result2 = await axiosRequest.get(`user/fetch_appointments/${id}?teamdata=0&filter=${SelfMonthYear||TeamData?SelfMonthYear||TeamData : monthYear}`)
        setDataContainer(result2)
       }else if(monthYear !== SelfMonthYear){
        console.warn('SelfMonthYear ------>',SelfMonthYear)
        console.warn('TeamData ------>',TeamData)
        // let result3 = await axiosRequest.get(`user/fetch_appointments/${id}?teamdata=0&filter=${SelfMonthYear||TeamData?SelfMonthYear||TeamData : monthYear}`)
        let result3 = await axiosRequest.get(`user/fetch_appointments/${id}?teamdata=0&filter=${SelfMonthYear||TeamData?SelfMonthYear||TeamData : monthYear}`)
        setDataContainer(result3)
       }
       else{
        let result4 = await axiosRequest.get(`user/fetch_appointments/${id}?teamdata=0&filter=${SelfMonthYear||TeamData?SelfMonthYear||TeamData : monthYear}&category=past`)
        setDataContainer(result4)
       }
    }

    const dateFun=(time)=>{
      var dt = new Date(time);
      var hours = dt.getUTCHours() ; // gives the value in 24 hours format
      var AmOrPm = hours >= 12 ? 'PM' : 'AM';
      hours = (hours % 12) || 12;
      var minutes = dt.getUTCMinutes() ;
      var finalTime = hours + ":" + (minutes == 0 ?"00":"00")+ "  "+AmOrPm; 
      return finalTime;
    }

  return (

    <div className='dataField'>
    
    {
        windowWidth > breakpoint &&

    DataContainer?.length>0 ? DataContainer?.map((element,index)=>{
      return(
          <div className='dataField-Card' key={index}>
            {
            ((1 + new Date(element.start_time_MS).getDate()) >= (1 + new Date().getDate())) 
            && element== DataContainer?.filter((element,index,arr)=>((new Date(element?.start_time_MS).getDate()+1) >=(1 + new Date().getDate()) 
            && (1+ new Date(element?.start_time_MS).getMonth()) >= (1+new Date().getMonth())))[0]
            ?
              <div className='head-cad-text'>
                <p>UPCOMING</p>
              </div>:""
            }
              <div className='dataContainer'>
                  <div className='bodyData'>
                      <div className='bodyData-Date'>
                          <p>
                            {
                              (new Date(element.start_time_MS).getDate()) == 1 ||(new Date(element.start_time_MS).getDate()) == 21 || (new Date(element.start_time_MS).getDate()) == 31?(new Date(element.start_time_MS).getDate()) +"st"
                              :(new Date(element.start_time_MS).getDate()) == 2 ||(new Date(element.start_time_MS).getDate()) == 22 ?(new Date(element.start_time_MS).getDate())+ "nd"
                              :(new Date(element.start_time_MS).getDate()) == 3 ||(new Date(element.start_time_MS).getDate()) == 23 ?(new Date(element.start_time_MS).getDate())+ "rd"
                              :(new Date(element.start_time_MS).getDate())+"th"
                            }
                            <span>
                            {
                              [{1:'Jan', 2:'Feb',3:'Mar', 4:'Apr', 
                              5:'May', 6:'Jun', 7:'Jul', 8:'Aug', 9:'Sep', 
                              10:'Oct',11:'Nov', 12:'Dec'}][0][ 1+ new Date(element.start_date).getMonth()]
                            } 
                            </span>                             
                        </p>
                        <p>
                          {
                            [{
                              1:'Sun',
                              2:"Mon",
                              3:"Tue",
                              4:'Wed',
                              5:"Thu",
                              6:"Fri",
                              7:"Sat"
                            }][0][1+new Date(element.start_time_MS).getDay()] 
                          }
                        </p>
                      </div>
                      <div className='TimeToEnd' style={{fontWeight : 'bold'}}>
                              <Typography>
                                {
                                  dateFun(element.start_time)
                                } 
                              </Typography>
                              <Typography style={{padding:'5px 0'}}>
                                  To
                              </Typography>
                              <Typography>
                              {
                                dateFun(element.end_time)
                              }
                              </Typography>
                      </div>
                      <div className='bodyData-centerContent'>
                          <div className='Event-CenterBody'>
                              {/* <Typography className='Event-CenterBody-BranchName'>
                                {element.branchCodeId?.branchName} ({element.branchCodeId?.branchCode})
                              </Typography> */}
                              <div className='Event-Type-Name'>
                                <div className='EventType'>
                                    <Typography >
                                        Event Type
                                    </Typography>
                                    <Typography >
                                        {element.event_type}
                                    </Typography>
                                </div>
                                <div className='EventName-Description'>
                                    <Typography>
                                        Event Name
                                    </Typography>
                                    <Typography>
                                        {element.event_description}
                                    </Typography>
                                </div>
                          </div>
                          </div>
                      </div>
                      <div className='bodyData-side'>
                          <Typography className={`closeOpen ${element.statusType =='open' ?'Open':"Close"}`}>
                              {element.statusType}
                          </Typography>
                          <FormOutlined onClick={()=>showModal(element)}/>
                      </div>
                  </div>
                  <div className='footer'>
                      {element.remarkHistory?.length >0 ?
                          <Typography>
                              <img src={commentIcon} className='footerPng'/>
                              {
                                element.remarkHistory.map((element)=>{
                                  return element.remark;
                                })
                              }
                          </Typography>
                          :""
                      }
                  </div>
              </div>
          </div>
      )
    }): 
     windowWidth < breakpoint &&
    DataContainer?.length >0 ? DataContainer?.map((element,index)=>{
        return(
            <div className='dataField-Card-mbl' key={index}>
                {
                ((1 + new Date(element.start_time_MS).getDate()) >= (1 + new Date().getDate())) 
                && element== DataContainer?.filter((element,index,arr)=>((new Date(element?.start_time_MS).getDate()+1) >=(1 + new Date().getDate()) 
                && (1+ new Date(element?.start_time_MS).getMonth()) >= (1+new Date().getMonth())))[0]
                ?
                  <div className='head-cad-text'>
                    <p>UPCOMING</p>
                  </div>:""
                }
                        <Row>
                                <Col sm={22} xs={22} md={22}>
                                <div className='TimeToEnd-mbl'>
                                <Row>
                                <Typography style={{fontWeight : 'bold'}}>{dateFun(element.start_time_MS)} To {dateFun(element.end_time_MS)}</Typography>
                                </Row>
                            </div>
                            </Col>
                            <Col sm={2} xs={2} md={2}>
                                <FormOutlined onClick={() => showModal(element)} />
                                </Col>
                              </Row>
                              {/* <Row>
                                <Col sm={24} md={24} xs={24}>
                                <Typography className='Event-CenterBody-BranchName'>
                                  {element.branchCodeId?.branchName} ({element.branchCodeId?.branchCode})
                                </Typography>
                                </Col>
                              </Row> */}

                              <Row>
                                <Col sm={7} xs={7} md={7}>
                                <div className='bodyData-Date' style={{paddingTop : 15, paddingBottom : 15}}>
                            <p>
                              {
                                (new Date(element.start_time_MS).getDate()) == 1 ||(new Date(element.start_time_MS).getDate()) == 21 || (new Date(element.start_time_MS).getDate()) == 31?(new Date(element.start_time_MS).getDate()) +"st"
                                :(new Date(element.start_time_MS).getDate()) == 2 ||(new Date(element.start_time_MS).getDate()) == 22 ?(new Date(element.start_time_MS).getDate())+ "nd"
                                :(new Date(element.start_time_MS).getDate()) == 3 ||(new Date(element.start_time_MS).getDate()) == 23 ?(new Date(element.start_time_MS).getDate())+ "rd"
                                :(new Date(element.start_time_MS).getDate())+"th"
                              }
                              <span>
                              {
                                [{1:'Jan', 2:'Feb',3:'Mar', 4:'Apr', 
                                5:'May', 6:'Jun', 7:'Jul', 8:'Aug', 9:'Sep', 
                                10:'Oct',11:'Nov', 12:'Dec'}][0][ 1+ new Date(element.start_date).getMonth()]
                              } 
                              </span>                             
                          </p>
                          <p>
                            {
                              [{
                                1:'Sun',
                                2:"Mon",
                                3:"Tue",
                                4:'Wed',
                                5:"Thu",
                                6:"Fri",
                                7:"Sat"
                              }][0][1+new Date(element.start_time_MS).getDay()] 
                            }
                          </p>
                        </div>
                                </Col>
                                <Col sm={17} xs={17} md={17}>
                                    <Row>
                                    <Col sm={15} xs={15} md={15}>
                                    
                                    <Typography style={{ fontSize: '12px', fontWeight : 'bold'}}>
                                              Event Type
                                            </Typography>
                                            <Typography style={{ fontSize: '12px',color : 'rgb(150, 153, 153)' }}>
                                            {element.event_type}
                                            </Typography>
                                            
                                        </Col>
                                         <Col sm={9} xs={9} md={9}>
                                         <div className='bodyData-side'>
                                         <Typography style={{fontSize : 12, fontWeight : 'bold' }} className={`closeOpen ${element.statusType =='open' ?'Open':"Close"}`}>
                                         {element.statusType}
                                        </Typography>
                                        </div>
                                        </Col>

                                    </Row>
                                    <Row>
                                    <Typography style={{ fontSize: '12px',fontWeight : 'bold' }}>
                                    Event Name
                                            </Typography>
                                            <Typography style={{ color : 'rgb(150, 153, 153)' , fontSize: '12px' }}>
                                            {element.event_description}
                                            </Typography>
                                    </Row>
                                </Col>
                              </Row>
                              <Row>
                                <div className='footer'>
                                  {
                                    element.remarkHistory?.length >0 ?
                                      <Typography>
                                        <img src={commentIcon} className='footerPng'/>
                                        {
                                          element.remarkHistory.map((element)=>{
                                            return element.remark;
                                        })
                                        }
                                      </Typography>
                                    :""
                                  }
                                </div>
                              </Row>
                              <hr style={{marginTop : 10, marginBottom : 10}}/>
                    </div>
                   
              
        )
      })
    :<EventCreateButton api={"getFunc"} />
  }
  {
    isModalVisible == true ?
    <EventCreateComponent click={'UPDATE EVENT'} Data={editData} api={getFunc} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    :""
  }
  </div>
  )
}

export default DataField