import React, { useState, useEffect }  from 'react'
import { Row, Col, Tabs,Steps,Divider } from 'antd';
import './History.css'
// import axiosRequest from "../../axios-request/request.methods";
const { Step } = Steps;
const { TabPane } = Tabs;


const HistoryTabs = () => {

    let { innerWidth: width, innerHeight: height } = window;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");

    // const [width, setWidth] = useState(window.innerWidth);
    // const breakpoint = 620;

    useEffect(() => {
        //const handleWindowResize = () => setWidth(window.innerWidth)
       // window.addEventListener("resize", handleWindowResize);
        // Return a function from the effect that removes the event listener
       // return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    // useEffect(() => {
    //     try {
    //         let res = axiosRequest.get(`user/fetch_goals/${id}`, { secure: true });
    //         res.then((res) => setUser(res));
    //         console.log("res", res);
    //       } catch (error) {
    //         console.log("error API " + error);
    //       }
    // }, [])
    
    
    return (
        <>
            <Col className="internal-tab"  xs={22} sm={24} md={4} lg={4} xl={4} offset={1}>
                <Tabs style={{ fontSize: '12px'}}
                     className='AdvisorPitch-Container'
                    // tabPosition={width > breakpoint ? 'left' : 'top'}
                    // size={width > breakpoint ? 'large' : 'small'}
                    // tabBarStyle={style}
                    tabPosition={tabPosition}
                >
                    <TabPane className='AdvisorPitch' key="1" tab="Lead"></TabPane>
                    <TabPane key="2" tab="Appointment"></TabPane>
                    <TabPane key="3" tab="Proposal"></TabPane>
                    <TabPane key="4" tab="Issuance"></TabPane>
                </Tabs>
            </Col> 
        </>
    )
}

export default HistoryTabs
