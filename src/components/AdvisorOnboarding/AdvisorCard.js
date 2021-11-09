import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Switch, Divider, Row, Col,Button } from 'antd'
import { MoreOutlined,ExclamationCircleOutlined  } from '@ant-design/icons';
import '../LeadCards/LeadCard.css';
import './AdvisorCard.scss'
import * as actions from '../../store/actions/index';
import { useHistory } from 'react-router-dom';

const LeadCard = React.memo((props) => {

    const dispatch = useDispatch()
    const history = useHistory()
    //     const {id,lead_Id,leadStatus,firstName,lastName,created_date,allocatedDate,primaryMobile,allocatedBy,allocatedTo} = props

    //   const leadComponent = 


    //   leadStatus === 'newleadentery'
    //                         ? 
    //     <p className="user-status-text capitalize open">Open</p>
    //     :
    //   leadStatus === 'converted'
    //   ?
    //   <p className="user-status-text capitalize converted">{leadStatus}</p>
    //   :
    //   leadStatus === 'failed'
    //   ?
    //   <p className="user-status-text capitalize failed">{leadStatus}</p>
    //   :
    //   <p className="user-status-text capitalize">{leadStatus}</p>

    //     let avatar = firstName.match(/\b(\w)/g) + lastName.match(/\b(\w)/g)

    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 620;

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);

        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [width]);
    const updateHandler = (id) => {
        dispatch(actions.fetchLeadDetails(id))
        history.replace('/leadmasterpage/statuslead')
    }
    // Card for desktop
    let card =
        // <Card
        //     // key={id}
        //     loading={props.loading}
        //     className="lead-card-desktop"
        //     hoverable={true}
        //     style={{ width: 610 }}>
        <Row className="advisor-card-desktop" align="top">
            <Col span={2}>
                <Avatar size={{ xl: 40 }}>AV</Avatar>
                {/* <Card.Grid hoverable={false} className="grid-style">
                        </Card.Grid> */}
            </Col>
            <Col span={12}>
                <p className="paragraph capitalize">Azim Shaikh</p>
                <p className="paragraph capitalize">App ID AGIN_202111_000420</p>
            </Col>
            <Col span={10}>
                <Row justify="center" align="middle">
                    <Col span={6}>
                        <Row justify="center" align="middle">
                            <Col span={4}>
                                <Divider className="divider" type="vertical" />
                            </Col>
                            <Col span={14} offset={6}>
                                <ExclamationCircleOutlined style={{ fontSize: '25px' }} />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={7}>
                        <Row justify="end" align="middle">
                            <Col span={4}>
                                <Divider className="divider" type="vertical" />
                            </Col>
                            <Col span={20}>
                                <p className="paragraph capitalize lead-status">Failed</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={9}>
                        <Row justify="end" align="middle">
                            <Col span={4}>
                                <Divider className="divider" type="vertical" />
                            </Col>
                            <Col span={20}>
                                <div className="lead-box">
                                    <p className="paragraph capitalize lead-agent">AGENT</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={2}>
                        <Row>
                            <Col span={4}>
                                <Divider className="divider" type="vertical" />
                            </Col>
                            <Col span={19} offset={1}>
                                <MoreOutlined style={{ fontSize: '30px', marginLeft: 'auto', fontWeight:'bold' }} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Divider  className="middle-divider"/>
            <Col span={24}>
                <Row justify="center" align="middle">
                    <Col span={18}>
                        <Row gutter={[16, 24]}>
                            <Col span={8} >
                                <p className="paragraph text-type ">Created on</p>
                                <p className="paragraph text-content">Date</p>
                            </Col>
                            <Col span={8} >
                                <p className="paragraph text-type">Created on</p>
                                <p className="paragraph text-content">Date</p>
                            </Col>
                            <Col span={8} >
                                <p className="paragraph text-type">Created on</p>
                                <p className="paragraph text-content">Date</p>
                            </Col>
                            <Col span={8} >
                                <p className="paragraph text-type">Created on</p>
                                <p className="paragraph text-content">Date</p>
                            </Col>
                            <Col span={8} >
                                <p className="paragraph text-type">Created on</p>
                                <p className="paragraph text-content">Date</p>
                            </Col>
                            <Col span={8} >
                                <p className="paragraph text-type">Created on</p>
                                <p className="paragraph text-content">Date</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={1}>
                        <Divider className="upd-divider" type="vertical" />
                    </Col>
                    <Col span={5} >
                        <Button className="adv-upd-btn"
                        // onClick={()=>updateHandler(id)}
                        >Update</Button>
                    </Col>
                </Row>

            </Col>

        </Row>
    {/* <div className="avatar-and-status">
                <Avatar size={{ xl: 50 }}>AV</Avatar>
                <Card.Grid hoverable={false} className="grid-style">
                    <p className="user-name-text capitalize">Azim Shaikh</p>
                    <p className="user-name-text capitalize">App ID AGIN_202111_000420</p>
                </Card.Grid>
            </div>
            <Divider />
            <div className="content">
                <div className="content-header">
                    <p className="user-name-text capitalize">
                        firstName lastName
                    </p>
                    <span className="user-id uppercase">
                        lead_Id
                    </span>
                </div>
                <div className="content-body">
                    <Card.Grid hoverable={false} className="grid-style">
                        <p className="text-type">Created on</p>
                        <p className="text-content">Date</p>
                    </Card.Grid>
                    <Card.Grid hoverable={false} className="grid-style">
                        <p className="text-type">Created on</p>
                        <p className="text-content">Date</p>
                    </Card.Grid>
                    <Card.Grid hoverable={false} className="grid-style">
                        <p className="text-type">Appointment on</p>
                        <p className="text-content">-</p>
                    </Card.Grid>
                    <Card.Grid hoverable={false} className="grid-style">
                        <p className="text-type">Mobile No.</p>
                        <p className="text-content">Date</p>
                    </Card.Grid>
                    <Card.Grid hoverable={false} className="grid-style">
                        <p className="text-type">Allocated by</p>
                        <p className="text-content capitalize">Date</p>
                    </Card.Grid>
                    <Card.Grid hoverable={false} className="grid-style">
                        <p className="text-type">Allocated to</p>
                        <p className="text-content capitalize">Date</p>
                    </Card.Grid>
                </div>
            </div> */}

    // </Card>
    //Card for Mobile
    // if(width<breakpoint){
    //     card = 
    //     <Card
    //         className="lead-card-mobile"
    //         hoverable>
    //         <Avatar size={{
    //                 xs: 36,
    //                 md: 40,
    //                 xl: 50,
    //                 }}
    //                 style={{backgroundColor:'blue'}}>{avatar}</Avatar>
    //         <div className="card-content-text capitalize">
    //             <p className="user-name-text">{firstName} {lastName}</p>
    //             <p className="user-status-text">{leadStatus}</p>
    //         </div>
    //         <MoreOutlined  style={{fontSize:'25px',marginLeft:'auto',color:'grey'}}/>
    //     </Card>
    // }
    return (
        <div
        // key={id}
        >
            {card}
        </div>

    )
})

export default LeadCard
