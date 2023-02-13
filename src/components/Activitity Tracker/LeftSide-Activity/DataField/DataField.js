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

const DataField = ({SelfMonthYear,history,TeamData,TeamHere, getFunc, getdata, SelfHere,Dataupdate}) => {
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
    const[timeList,setTimeList]=useState( [{
      dispValue: "8:00 AM",
      value: "28800000"
    }, {
      dispValue: "8:30 AM",
      value: "30600000"
    }, {
      dispValue: "9:00 AM",
      value: "32400000"
    }, {
      dispValue: "9:30 AM",
      value: "34200000"
    }, {
      dispValue: "10:00 AM",
      value: "36000000"
    }, {
      dispValue: "10:30 AM",
      value: "37800000"
    }, {
      dispValue: "11:00 AM",
      value: "39600000"
    }, {
      dispValue: "11:30 AM",
      value: "41400000"
    }, {
      dispValue: "12:00 PM",
      value: "43200000"
    }, {
      dispValue: "12:30 PM",
      value: "45000000"
    }, {
      dispValue: "1:00 PM",
      value: "46800000"
    }, {
      dispValue: "1:30 PM",
      value: "48600000"
    }, {
      dispValue: "2:00 PM",
      value: "50400000"
    }, {
      dispValue: "2:30 PM",
      value: "52200000"
    }, {
      dispValue: "3:00 PM",
      value: "54000000"
    }, {
      dispValue: "3:30 PM",
      value: "55800000"
    }, {
      dispValue: "4:00 PM",
      value: "57600000"
    }, {
      dispValue: "4:30 PM",
      value: "59400000"
    }, {
      dispValue: "5:00 PM",
      value: "61200000"
    }, {
      dispValue: "5:30 PM",
      value: "63000000"
    }, {
      dispValue: "6:00 PM",
      value: "64800000"
    }, {
      dispValue: "6:30 PM",
      value: "66600000"
    }, {
      dispValue: "7:00 PM",
      value: "68400000"
    }, {
      dispValue: "7:30 PM",
      value: "70200000"
    }, {
      dispValue: "8:00 PM",
      value: "72000000"
    }, {
      dispValue: "8:30 PM",
      value: "73800000"
    }, {
      dispValue: "9:00 PM",
      value: "75600000"
    }, {
      dispValue: "9:30 PM",
      value: "77400000"
    }])
  const [DataContainer,setDataContainer]=useState();
  

//   useImperativeHandle(ref, () => ({
//     api : () =>{ api() }
// }));

  useEffect(()=>{
     api();
    if(Dataupdate != undefined && Dataupdate.length != 0){
      setDataContainer(Dataupdate)
    }
    //  console.log(TeamHere, 'self team here--->');
  },[SelfMonthYear,TeamData,history,getdata,isModalVisible, Dataupdate]);

  

  let {id}=stoageGetter('user')
  const login_user_data = stoageGetter("user");
  const agent_id = login_user_data.agentId;
    const api = async ()=>{
     
      const currentMonth =(1 + new Date().getMonth());

      const currentYear =new Date().getFullYear();
      const monthYear=currentMonth+'/'+currentYear;
      const MonthCompare = monthYear === SelfMonthYear;
      // console.log(typeof(SelfMonthYear),'monthyearrr------<<>><>M<M<');
      // console.log(TeamData, 'team yr---<><mvc><</mvc>');
      // console.log(history,'history------>');

      if(SelfHere == 'self'){
        var dS = SelfMonthYear.split("/");
        var d1 = new Date(dS[1], (+dS[0]));
        var today = new Date();
        console.log(d1,'d1----->')
        console.log(SelfMonthYear.split("/"),'split of minth')
        console.log(('0' + dS[0]).slice(-2));
        let finalMonthYear = (('0' + dS[0]).slice(-2)) + '/' + dS[1]
        if (d1 >= today) {
          let result = await axiosRequest.get(`user/fetch_appointments/${id}?teamdata=0&filter=${finalMonthYear}&category=upcoming`)
              setDataContainer(result)
              // console.log(result, 'd is greater');
        } else {
          let result = await axiosRequest.get(`user/fetch_appointments/${id}?teamdata=0&filter=${finalMonthYear}&category=past`)
          setDataContainer(result)
          // console.log(result, 'today is greater');
        }
      }

      if(TeamHere == true || TeamData != undefined){
        console.log('yes moved to team',Dataupdate);
        setDataContainer(Dataupdate)
        // var dS = TeamData.split("/");
        // var d1 = new Date(dS[1], (+dS[0]));
        // var today = new Date();
        // console.log(d1)
        // console.log(today)
        // if (d1 >= today) {
        //   // console.log('yes moved to team ---> future & current');
        //   let result = await axiosRequest.get(`user/fetch_appointments/${id}?teamdata=0&filter=${TeamData}&category=upcoming&agentCode=${agent_id}`)
        //       setDataContainer(result)
        //       // console.log(result, 'd is greater');
        // } else {
        //   // console.log('yes moved to team ---> past');
        //   let result = await axiosRequest.get(`user/fetch_appointments/${id}?teamdata=1&filter=${TeamData}&category=past&agentCode=${agent_id}`)
        //   setDataContainer(result)
        //   // console.log(result, 'today is greater');
        // }
      }
      

    //   if(MonthCompare && history || TeamHere){
    //  console.log('11111');
    //     let result = await axiosRequest.get(`user/fetch_appointments/${id}?teamdata=0&filter=${SelfMonthYear||TeamData?SelfMonthYear||TeamData : monthYear}&category=upcoming`)
    //     setDataContainer(result)
    //     console.log(result);
    //    }else if(MonthCompare && history == false){
    //     console.log('22222');
    //     console.log('self mponth year ---->', MonthCompare)
    //     let result2 = await axiosRequest.get(`user/fetch_appointments/${id}?teamdata=0&filter=${SelfMonthYear||TeamData?SelfMonthYear||TeamData : monthYear}`)
    //     setDataContainer(result2)
    //    }else if(monthYear !== SelfMonthYear){
    //     console.log('3333');
    //     console.warn('SelfMonthYear--last else ------>',SelfMonthYear)
    //     console.warn('TeamData ------>',TeamData)
    //     // let result3 = await axiosRequest.get(`user/fetch_appointments/${id}?teamdata=0&filter=${SelfMonthYear||TeamData?SelfMonthYear||TeamData : monthYear}`)
    //     let result3 = await axiosRequest.get(`user/fetch_appointments/${id}?teamdata=0&filter=${SelfMonthYear||TeamData?SelfMonthYear||TeamData : monthYear}&category=past`)
    //     setDataContainer(result3)
    //    }
    //    else{
    //     console.log('4444');
    //     console.log(SelfMonthYear , TeamData, monthYear, 'last--------->')
    //     let result4 = await axiosRequest.get(`user/fetch_appointments/${id}?teamdata=0&filter=${SelfMonthYear||TeamData?SelfMonthYear||TeamData : monthYear}&category=upcoming`)
    //     console.log(result4,'4444 result');
    //     setDataContainer(result4)
    //    }
    }

    const dateFun=(time)=>{
      // var dt = new Date(time);
      // var hours = dt.getUTCHours() ; // gives the value in 24 hours format
      // var AmOrPm = hours >= 12 ? 'PM' : 'AM';
      // hours = (hours % 12) || 12;
      // var minutes = dt.getUTCMinutes() ;
      // var finalTime = hours + ":" + (minutes == 0 ?"00":"00")+ "  "+AmOrPm; 
      let finalTimeobj = timeList.filter(item =>{return item.value == time})
      // console.log(finalTimeobj, 'obj time---->')
      let finalTime = finalTimeobj[0]?.dispValue
      // console.log(finalTime, 'val time---->')
      return finalTime;
    }

  return (

    <div className='dataField'>
    {/* {console.log(DataContainer, 'final upcoming')} */}
    {
        windowWidth > breakpoint &&

    DataContainer?.length>0 ? DataContainer?.map((element,index)=>{
      return(
          <div className='dataField-Card' key={index}>
            {console.log(element,'full elemenet list')}
            {/* {
            ((1 + new Date(element.start_time_MS).getDate()) >= (1 + new Date().getDate())) 
            && element== DataContainer?.filter((element,index,arr)=>((new Date(element?.start_time_MS).getDate()+1) >=(1 + new Date().getDate()) 
            && (1+ new Date(element?.start_time_MS).getMonth()) >= (1+new Date().getMonth())))[0]
            ?
              <div className='head-cad-text'>
                <p>UPCOMING</p>
              </div>:""
            } */}
              <div className='dataContainer'>
                  <div className='bodyData'>
                      <div className='bodyData-Date'>
                          <p>
                            {
                              (new Date(element.start_date).getDate()) == 1 ||(new Date(element.start_date).getDate()) == 21 || (new Date(element.start_date).getDate()) == 31?(new Date(element.start_date).getDate()) +"st"
                              :(new Date(element.start_date).getDate()) == 2 ||(new Date(element.start_date).getDate()) == 22 ?(new Date(element.start_date).getDate())+ "nd"
                              :(new Date(element.start_date).getDate()) == 3 ||(new Date(element.start_date).getDate()) == 23 ?(new Date(element.start_date).getDate())+ "rd"
                              :(new Date(element.start_date).getDate())+"th"
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
                              {element.statusType =='open' ?'Open':"Close"}
                          </Typography>
                          <FormOutlined onClick={()=>showModal(element)}/>
                      </div>
                  </div>
                  <div className='footer'>
                      {element.statusReason != '' ?
                          <Typography>
                              <img src={commentIcon} className='footerPng'/>
                              {/* {
                                element.remarkHistory.map((element)=>{
                                  return element.remark;
                                })
                              } */}
                               {element.statusReason}
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
                {/* {
                ((1 + new Date(element.start_time_MS).getDate()) >= (1 + new Date().getDate())) 
                && element== DataContainer?.filter((element,index,arr)=>((new Date(element?.start_time_MS).getDate()+1) >=(1 + new Date().getDate()) 
                && (1+ new Date(element?.start_time_MS).getMonth()) >= (1+new Date().getMonth())))[0]
                ?
                  <div className='head-cad-text'>
                    <p>UPCOMING</p>
                  </div>:""
                } */}
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
                                         {element.statusType =='open' ?'Open':"Close"}
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
                                {element.statusReason != '' ?
                          <Typography>
                              <img src={commentIcon} className='footerPng'/>
                              {/* {
                                element.remarkHistory.map((element)=>{
                                  return element.remark;
                                })
                              } */}
                               {element.statusReason}
                          </Typography>
                           :""
                      } 
                                </div>
                              </Row>
                              <hr style={{marginTop : 10, marginBottom : 10}}/>
                    </div>
                   
              
        )
      })
    :<EventCreateButton api={getFunc} />
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