import React from 'react'
import { Row, Col, Step, Steps } from 'antd'
import { ShareAltOutlined, DownloadOutlined } from '@ant-design/icons';
import './Notification.css'


const NotificationComp = () => {
    const { Step } = Steps;
  return (
    <>
        <div className="header">
                <Row >
                    <Col><p className="product-title">Notification</p></Col>
                </Row>
                
        </div>
        
       {/* Start the node data */}

        <div className='mainTab'>
            <Row className='row-space'>
                <Col flex="50px">
                    <div className='startNode'></div>
                </Col>
                <Col flex="auto">
                    <div className='notifyHead'>
                        <h4>Alert</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col flex="50px">
                    <div className='root-to-node'></div>
                    <div className='steps'></div>
                </Col>
                <Col flex="auto">
                    <div className='box-data1'>
                    <div className='notification_data1'>
                        <div className='list_data1'>
                            <h4>TO-DO</h4>
                            <p>You have been assigned a new task(Complete report) by Bhanyshree</p>
                        </div>
                        <div className='date1'>
                            <p>6:36 pm, July 19th, 2022</p>
                            <button>View Details</button>
                        </div>
                    </div>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col flex="50px">
                    <div className='steps'></div>
                </Col>
                <Col flex="auto">
                    <div className='box-data1'>
                    <div className='notification_data1'>
                        <div className='list_data1'>
                            <h4>TO-DO</h4>
                            <p>You have been assigned a new task(Complete report) by Bhanyshree</p>
                        </div>
                        <div className='date1'>
                            <p>6:36 pm, July 19th, 2022</p>
                            <button>View Details</button>
                        </div>
                    </div>
                    </div>
                </Col>
            </Row>

        </div>
    </>
  )
}

export default NotificationComp