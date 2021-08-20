import React from 'react'
import {Tabs,Card,Button} from 'antd'
import './Tab.css'
const {TabPane} = Tabs

const  Tab = (props)=> {
    // let card1 = <Card className="tab-pane">
    //                 All leads
    //                 <Button type="primary" danger={true} shape="circle" size="small">
    //                     95
    //                 </Button>
    //             </Card>
    // let card2 = <Card className="tab-pane">
    //                 Open
    //                 <Button type="primary" danger={true} shape="circle" size="small">
    //                     10
    //                 </Button>
    //             </Card>
    // let card3 = <Card className="tab-pane">
    //                 Failed
    //                 <Button type="primary" danger={true} shape="circle" size="small">
    //                     12
    //                 </Button>
    //             </Card>
    // const style={
    //     color:'gray',
    //     backgroundColor:'#ffffff'
    // }
    const renderTabBar = (props, Card) => (
          ({ style }) => (
            <Card {...props} className="site-custom-tab-bar" style={{ color:'gray',backgroundColor:'#ffffff' }} />
          )
      );
    return (
        <div className="tab-container">
                <Tabs defaultActiveKey="1" tabBarGutter={10} type="card" centered={true} renderTabBar={renderTabBar}>
                    <TabPane  key="1">
                    </TabPane>
                    <TabPane  key="2">
                    </TabPane>
                    <TabPane  key="3">
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