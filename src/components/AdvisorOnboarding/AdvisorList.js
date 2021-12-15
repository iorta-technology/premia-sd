import { useEffect, useState } from 'react'
import AdvisorCard from './AdvisorCard'
import _ from "lodash";
import { Row, Col, Avatar, Card, Divider, Button,Pagination } from 'antd'
import * as actions from '../../store/actions/index';
import { useDispatch,useSelector } from 'react-redux';
import Tab from '../Tab/Tab'
import NoRecordsFound from '../NoRcordsFound/NoRecordsFound';
const LeadCards = (props) => {
    const dispatch = useDispatch()
    const totalLeads = useSelector((state)=>{
        // console.log(state.leads.count[0].count)
        return state.advisor.count
    })
    const advisorListData = useSelector((state)=>state.advisor.allAdvisorList)
    const allAdvisorListLoading = useSelector((state)=>state.advisor.allAdvisorListLoading)
    const [width, setWidth] = useState(window.innerWidth);
    const [current,setcurrent] = useState(1)

    const breakpoint = 620;

    useEffect(() => {
        dispatch(actions.fetchAdvisorList('','all',current))

        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);

        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [width,current,dispatch]);

    function itemRender(cur, type, originalElement) {
        const onPrev = ()=>{
            setcurrent(current-1)
        }
        const onNext = ()=>{
            setcurrent(current+1)
        }

        if (type === 'prev') {
            return <a current={current} onClick={onPrev} style={{color:'#545454'}}>Prev</a>;
          }
        if (type === 'next') {
            // console.log(current)
          return <a current={current} onClick={onNext}style={{color:'#545454'}}>Next</a>;
        }
        return originalElement;
    }
    const handlePageClick = (page)=>{
        setcurrent(page)
        console.log(page)
    }
    const tabMenu = [
        {
            id:'all',
            value:"All"
        },
        {
            id:'Draft',
            value:"Draft"
        },
        {
            id:'Application',
            value:"Application"
        },
        {
            id:'Recruited',
            value:"Recruited"
        },
        {
            id:'Failed',
            value:"Failed"
        },
        
    ]
    let card = [];
    if (allAdvisorListLoading) { return <NoRecordsFound /> }
    if (!_.isEmpty(advisorListData)) {
        card = _.map(advisorListData, (advisor, index) => {
            return (
                <>
                    <Col sm={18} md={18} lg={11} xl={10}>
                        <AdvisorCard
                            key={advisor._id}
                            id={advisor._id}
                            policyId={advisor.policyId}
                            proposalType={advisor.proposalType}
                            proposalStatus={advisor.proposalStatus}
                            firstName={advisor.CandidateName_as_per_PAN}
                            // lastName={advisor.lastName}
                            createdDate={advisor.createdDate}
                            submittedDate={advisor.allocatedDate}
                            primaryMobile={advisor.Mobile_No}
                            // allocatedBy={lead.lead_allocated_by === null ? '' : lead.lead_allocated_by.first_name + ' ' + lead.lead_allocated_by.last_name}
                            // allocatedTo={lead.lead_allocated_by === null ? '' : lead.lead_allocated_by.first_name + ' ' + lead.lead_allocated_by.last_name}
                            // appointmentOn={lead?.appointmentId?.start_date}
                            // loading={props.leadDataLoading}
                        />
                    </Col>
                </>
            )
        })
    }
    return (
        <>
        <Tab 
                tabMenu={tabMenu} 
                header="Recruitment Applications" 
                // current={current}
                />
        <div className="cards-container">
            <Row justify="center" gutter={[18, { xs: 8, sm: 10, md: 10, lg: 18 }]}>
                {card}
                {/* this is just a presentational card  */}
                <Col sm={18} md={18} lg={11} xl={10} className={width < breakpoint ? "dummy-card-mobile" : 'dummy-card-desktop'} >
                    <  >
                        <Row className="advisor-card" align="top" justify="center">
                            <Col span={2}>
                                <Avatar
                                    size={{ xl: 40 }}
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#00ACC1',
                                    }}
                                >AV</Avatar>
                                {/* <Card.Grid hoverable={false} className="grid-style">
                        </Card.Grid> */}
                            </Col>
                            <Col span={12}>
                                <p className="paragraph capitalize advisor-name font-bold">Azim Shaikh</p>
                                <p className="paragraph capitalize app-id-label font-bold">App ID <span className="app-id">AGIN_202111_000420</span></p>
                            </Col>
                            <Col span={10}>
                                <Row justify="center" align="middle">
                                    <Col span={6}>
                                        <Row justify="center" align="middle">
                                            <Col span={4}>
                                                <Divider className="divider" type="vertical" />
                                            </Col>
                                            <Col span={14} offset={6}>
                                                {/* <ExclamationCircleOutlined style={{ fontSize: '25px' }} /> */}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={7}>
                                        <Row justify="end" align="middle">
                                            <Col span={4}>
                                                <Divider className="divider" type="vertical" />
                                            </Col>
                                            <Col span={20}>
                                                <p className="paragraph capitalize lead-status font-bold">Failed</p>
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
                                                    <p className="paragraph capitalize lead-agent font-bold">AGENT</p>
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
                                                {/* <Popover placement="leftTop" content={content} trigger="click" style={{ width: '135px' }}>
                                    <MoreOutlined className="more-icon" style={{ fontSize: '30px', marginLeft: 'auto', fontWeight: 'bold' }} />
                                </Popover> */}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Divider className="middle-divider" />
                            <Col span={24}>
                                <Row justify="center" align="middle">
                                    <Col span={18}>
                                        <Row gutter={[16, 24]}>
                                            <Col span={8} >
                                                <p className="paragraph adv-detail-label font-bold ">Created on</p>
                                                <p className="paragraph adv-text">Date</p>
                                            </Col>
                                            <Col span={8} >
                                                <p className="paragraph adv-detail-label font-bold">Submitted on</p>
                                                <p className="paragraph adv-text">Date</p>
                                            </Col>
                                            <Col span={8} >
                                                <p className="paragraph adv-detail-label font-bold">Status Updated on</p>
                                                <p className="paragraph adv-text">Date</p>
                                            </Col>
                                            <Col span={8} >
                                                <p className="paragraph adv-detail-label font-bold">MObile No</p>
                                                <p className="paragraph adv-text">Date</p>
                                            </Col>
                                            <Col span={8} >
                                                <p className="paragraph adv-detail-label font-bold">Location</p>
                                                <p className="paragraph adv-text">Date</p>
                                            </Col>
                                            <Col span={8} >
                                                <p className="paragraph adv-detail-label font-bold">Status</p>
                                                <p className="paragraph adv-text">Date</p>
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
                    </>
                </Col>
            </Row>
        </div>
        <div className="page-holder">
            <Pagination
                responsive
                current={current}
                onChange={handlePageClick}
                total={totalLeads}
                defaultPageSize={15}
                itemRender={itemRender} />
        </div>
        </>
    )
}

export default LeadCards
