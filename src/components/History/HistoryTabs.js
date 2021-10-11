import React, { useState, useEffect }  from 'react'
import { Row, Col, Tabs,Steps,Divider } from 'antd';

const { Step } = Steps;
const { TabPane } = Tabs;

const style = {
    color:"#000",
    background:'#fff'
}
const HistoryTabs = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 620;

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [width]);
    return (
        <>
            <Tabs
                tabPosition={width > breakpoint ? 'left' : 'top'}
                size={width > breakpoint ? 'large' : 'small'}
                tabBarStyle={style}
            >
                <TabPane key="1" tab="Lead"></TabPane>
                <TabPane key="2" tab="Appointment"></TabPane>
                <TabPane key="3" tab="Proposal"></TabPane>
                <TabPane key="4" tab="Issuance"></TabPane>
            </Tabs>
                
        </>
    )
}

export default HistoryTabs
