import React, { useState, useEffect } from 'react'
import { Tabs, Card, Button, Col, Row } from 'antd'
import './Tab.css'
import _ from "lodash";

const { TabPane } = Tabs

const Tab = (props) => {

    const {tabMenu,header} =  props
    let tabPane = []
    if (tabMenu && !_.isEmpty(tabMenu)) {

        tabPane = _.map(tabMenu,(value,id) => {
            return (
                <TabPane
                    key={value.id}
                    tab={value.value}>
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
                        defaultActiveKey="1" 
                        tabBarGutter={20} 
                        centered={false} 
                        type="card"
                        onChange={props.tabChangedHandler}
                        >
                            {tabPane}
                    </Tabs>

                </div> :
                <>
                    <Tabs defaultActiveKey="1" tabBarGutter={20} centered={true} >
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