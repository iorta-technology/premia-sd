import React,{useState,useEffect} from 'react'
import { Row, Col,Tabs } from 'antd';
import { useHistory } from 'react-router-dom';
import './LeadDetailsTab.css'
const style = {
    color:"#000",
    background:'#fff'
}

const LeadDetailsTab = (props) => {
    const { TabPane } = Tabs;
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 620;

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);

        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [width]);


    // Active state on tabclick
    // const [activeKey, setactiveKey] = useState('1')
    let history = useHistory()
    const tabClick = (key) => {
        // setactiveKey(key)
        switch (key) {
            case "1": return history.push('/leadmasterpage/leaddetails/personallead');
            case "2": return history.push('/leadmasterpage/leaddetails/contactlead');
            case "3": return history.push('/leadmasterpage/leaddetails/professionallead');
            case "4": return history.push('/leadmasterpage/leaddetails/existinglead');
            case "5": return history.push('/leadmasterpage/leaddetails/productlead');
            default:  return history.push('/leadmasterpage/leaddetails/personallead');
        }
    }

    return (
        <>
            <Col className="internal-tab"  xs={22} sm={24} md={24} lg={24} xl={24}>
                <Tabs
                    tabPosition={width > breakpoint ? 'left' : 'top'}
                    size={width > breakpoint ? 'large' : 'small'}
                    tabBarStyle={style}
                    onTabClick={tabClick}
                    activeKey={props.activeKey}
                >
                    <TabPane key="1" tab="Personal Details"></TabPane>
                    <TabPane key="2" tab="Contact Details"></TabPane>
                    <TabPane key="3" tab="Professional Details"></TabPane>
                    <TabPane key="4" tab="Existing Insurance"></TabPane>
                    <TabPane key="5" tab="Proposed Product"></TabPane>
                </Tabs>
            </Col>
        </>
    )
}

export default LeadDetailsTab
