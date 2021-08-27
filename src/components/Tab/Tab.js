import React from 'react'
import { Tabs, Card, Button, Col, Row } from 'antd'
import './Tab.css'
const { TabPane } = Tabs

const Tab = (props) => {
    const gridStyle = {
        width:'100%',
        height:'100px',
        textAlign: 'center',
        borderRadius:'10px',
        backgroundColor:'rgb(1, 180, 187)',
        color:'#fafafa'
        };
    // let card = <Card className="tab-pane" style={gridStyle}>
    //     All leads
    //     <Button type="primary" danger={true} shape="circle" size="small">
    //         95
    //     </Button>
    // </Card>

    const style = {
        color: '#9d9d9d',
        backgroundColor: '#fafafa'
    }
    return (
        <>
            <div className="tab-container">
                <Tabs defaultActiveKey="1" tabBarGutter={10} style={style} centered={true} type="card">
                    <TabPane
                        key="1"
                        tab={
                            <Row className="tab-style">
                                <Col xl={24}>All Leads</Col>
                            </Row>
                        }>
                    </TabPane>
                    <TabPane
                        key="2"
                        tab={
                            <Card className="tab-pane" style={gridStyle}>
                                All leads
                                <Button type="primary" danger={true} shape="circle" size="small">
                                    95
                                </Button>
                            </Card>
                        }>
                    </TabPane>
                    <TabPane  key="3" tab="card 1">

                    </TabPane>
                </Tabs>
            </div>

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