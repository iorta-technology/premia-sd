import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import './Tab.css'
import _ from "lodash";
import { useHistory } from 'react-router-dom';

const { TabPane } = Tabs

const Tab = ({ tabMenu, header, detailsRouteTab,activeKey,activeRenewalkey }) => {
    let history = useHistory()
    // const [activeKey, setactiveKey] = useState('1')

    // const onChange = (key)=>{

    //     setactiveKey(key)
    // }
    const handler = (activeKey) => {
        // console.log(activeKey)   
        // setactiveKey(key)
        if(activeKey){
        switch (activeKey) {
            case "1": return history.push('/leadmasterpage/statuslead');
            case "2": return history.push('/leadmasterpage/leaddetails/personallead');
            case "3": return history.push('/leadmasterpage/proposal');
            case "4": return history.push('/leadmasterpage/leadmasterdoc/leaddoc');
            case "5": return history.push('/leadmasterpage/leadhistorymaster/leadhistory');
            default:  return history.push('/leadmasterpage/statuslead');
        }
    }
    // if(activeKey){
    //     switch (activeKey) {
    //         case "1": return history.push('/renewalMaster/allRenewals');
    //         case "2": return history.push('/renewalMaster/paidRenewals');
    //         case "3": return history.push('/renewalMaster/unpaidRenewals');
    //         case "4": return history.push('/renewalMaster/lapsedRenewals');
    //     }
    // }
}
    

    // const handler = (activeRenewalkey) => {
    //     // console.log(activeKey)
    //     // setactiveKey(key)

    //     switch (activeRenewalkey) {
    //         case "1": return history.push('/renewalMaster/all');
    //         // case "2": return history.push('/leadmasterpage/leaddetails/personallead');
    //         // case "3": return history.push('/leadmasterpage/proposal');
    //         // case "4": return history.push('/leadmasterpage/leadmasterdoc/leaddoc');
    //         // case "5": return history.push('/leadmasterpage/leadhistorymaster/leadhistory');
    //         default:  return history.push('/leadmasterpage/statuslead');
    //     }
    // }

    let tabPane = []
    if (tabMenu && !_.isEmpty(tabMenu)) {

        tabPane = _.map(tabMenu, (value, id) => {
            return (
                <TabPane
                    key={value.id}
                    tab={value.value}
                >
                </TabPane>
            )
        })

    }
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
            {width > breakpoint ?
                <div className="header-img">
                    <p className="header-title">{header}</p>
                    <Tabs
                        tabBarGutter={20}
                        centered={false}
                        type="card"
                        onTabClick={handler}
                        size="large"
                        activeKey={activeKey}
                        style={{marginLeft:'110px'}}
                    >
                        {tabPane}
                    </Tabs>

                </div> :
                <>
                    <Tabs 
                        tabBarGutter={20} 
                        centered={true} 
                        onTabClick={handler}
                        size="large"
                        activeKey={activeKey}
                        style={{margin:'20px'}}
                        >
                        {tabPane}
                    </Tabs>
                </>
            }

        </>
    )
}

export default Tab
            /* <Tabs defaultActiveKey="1" tabBarGutter={10} style={style} centered={true} type="card">
<TabPane tab={card} key="1"  style={gridStyle}>
</TabPane>
<TabPane tab="All leads" key="1"  >
</TabPane>
<TabPane tab="All leads" key="1"  >
</TabPane>
</Tabs>
<Menu  mode="horizontal">
<Menu.Item key="mail" style={gridStyle}>
All leads
</Menu.Item>
<Menu.Item key="mail" style={gridStyle}>
All leads
</Menu.Item>
<Menu.Item key="mail" >
{card}
</Menu.Item>
</Menu> */

// let card2 = <Card className="tab-pane">
//                     Open
//                     <Button type="primary" danger={true} shape="circle" size="small">
//                         10
//                     </Button>
//                 </Card>
//     let card3 = <Card className="tab-pane">
//                     Failed
//                     <Button type="primary" danger={true} shape="circle" size="small">
//                         12
//                     </Button>
//                 </Card>