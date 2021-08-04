import React from 'react'
import {Tabs,Card} from 'antd'
import './Tab.css'
const {TabPane} = Tabs

const  Tab = (props)=> {
    let card1 = <Card className="tab-pane">All leads</Card>
    let card2 = <Card className="tab-pane">Open</Card>
    let card3 = <Card className="tab-pane">Failed</Card>
    return (
        <div className="tab-container">
            <Tabs defaultActiveKey="1" tabBarGutter={10} type="card" centered={true}>
                <TabPane tab={card1} key="1">
                </TabPane>
                <TabPane tab={card2} key="2">
                </TabPane>
                <TabPane tab={card3} key="3">
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Tab

// function callback(key) {
//     console.log(key);
//   }
// const renderTabBar = (props, DefaultTabBar) => (
//     // <Sticky bottomOffset={80}>
//     //   {({ style }) => (
//         <DefaultTabBar {...props} className="site-custom-tab-bar"  />
//     //   )}
//     // </Sticky>
//   );