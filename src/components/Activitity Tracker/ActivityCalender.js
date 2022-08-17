import React,{useEffect, useState} from 'react';
import { Card, Col, Row } from 'antd';
import Self from './LeftSide-Activity/Self/Self';
// import EventCreate from './LeftSide-Activity/EventCreate/EventCreate'
import Team from './LeftSide-Activity/Team/Team';
import Todo from './RightSide-Todo/Todo';
import person_black from './icons/person_black.png'
import person_white from './icons/person_white.png'
import group_white from './icons/group_white.png'
import group_black from './icons/group_black.png'
import axios from 'axios'
import headerTabs from './icons/header-tabs.png'
import './ActivityCalender.css'

const useWidowsSize=()=>{
    const [size,setSize]=useState([window.Width,window.height]);

    useEffect(() => {
      const handleChangeSize=()=>{
        setSize([window.innerWidth,window.innerHeight]);
      }
      window.addEventListener('resize',handleChangeSize);
    },[])
    return size;
}

const App = () => {
    const [TeamSelf,setTeamSelf]=useState(true);
    // const api=async ()=>{
    //     await axios.get('https://abinsurancenode.salesdrive.app/sdx-api/secure/user/getAppointment/')
    //     .then((response)=>{
    //         console.log(response.data,"hi");
    //     });
    // }
    // useEffect(()=>{
    //     api();
    // },[])
 const [width,height]=useWidowsSize();
    return(

        <div className="ActivityCalender-container">
            {/* {
                width<=1000?<div className='ActivityCalender-Header'>
                <img className='ActivityCalender-Header-img' src={headerTabs} alt='png'/>
                <p>width:{width}</p>
            </div>:""
            } */}
            <Row style={{color:"#f7f7f7"}}>
                <Col xl={14} md={14} sm={23} xsm={22}
                    className='Activity-Right'
                    style={{boxShadow: '0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)',
                    borderRadius:"2px"}}>
                    <Card bordered={false}>
                        <div className='CardBody' style={{marginLeft:'-10px'}}>
                            <button  className={TeamSelf ? "activate":" "}
                                onClick={(e)=>{
                                    setTeamSelf(true)
                                }}>
                                <img src={TeamSelf ?person_white:person_black} className='person' alt='person_png'/>Self
                            </button>
                            <button 
                                className={!TeamSelf ? "activate":""}
                                onClick={(e)=>{
                                    setTeamSelf(false)
                                }}
                            >
                                <img src={TeamSelf ? group_black:group_white} className='person' alt='group_png'/>Team
                            </button>
                        </div>    
                        {
                            TeamSelf ? <Self/>:<Team/>
                        }
                    </Card>
                </Col>
                <Col xl={7} md={8}
                    className="ActivityCalender-container-TodoCard">
                    <Card>
                        <Todo/>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
export default App;