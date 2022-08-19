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
import Tabs from '../../components/Tab/Tab'

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
const tabMenu = [
    {
      id: 'calendar',
      value: "Calendar",
    },
    {
      id: 'todo',
      value: "To Do"
    },
  
  ]

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
 const [windowWidth, setWidth] = useState(window.innerWidth);
 const breakpoint = 620;
    return(

        <div className="ActivityCalender-container">
            {/* {
                width<=1000?<div className='ActivityCalender-Header'>
                <img className='ActivityCalender-Header-img' src={headerTabs} alt='png'/>
                <p>width:{width}</p>
            </div>:""
            } */}
            { windowWidth < breakpoint &&
                <Tabs tabMenu={tabMenu} header="To Do" activeKey="todo"/>
            }
            <Row style={{color:"#f7f7f7",marginTop:'20px'}} justify="center">
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