import {useEffect,useState} from 'react'
import LeadCard from './LeadCard'
import './LeadCards.css'
import _ from "lodash";
import { Row, Col,Avatar,Card } from 'antd'
import NoRecordsFound from '../NoRcordsFound/NoRecordsFound';
const LeadCards = (props) => {
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 620;

     useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);

        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [width]);
    let card = [];
    if(_.isEmpty(props.leads)){return <NoRecordsFound/>    }
    if (!_.isEmpty(props.leads)) {
        card = _.map(props.leads, (lead, index) => {
            return (
                <>
                    <Col sm={18}  md={18} lg={11} xl={10}>
                        <LeadCard
                            key={lead._id}
                            id={lead._id}
                            lead_Id={lead.lead_Id}
                            leadStatus={lead.leadStatus}
                            firstName={lead.firstName}
                            lastName={lead.lastName}
                            created_date={lead.created_date}
                            allocatedDate={lead.allocatedDate}
                            primaryMobile={lead.primaryMobile}
                            allocatedBy={lead.lead_allocated_by === null? '' :lead.lead_allocated_by.first_name + ' ' + lead.lead_allocated_by.last_name}
                            allocatedTo={lead.lead_allocated_by === null? '' :lead.lead_allocated_by.first_name + ' ' + lead.lead_allocated_by.last_name}
                            appointmentOn={lead?.appointmentId?.start_date}
                            loading={props.leadDataLoading}
                        />
                    </Col>
                </>
            )
        })
    }
    return (
        <div className="cards-container">
            <Row justify="center" gutter={[18,{ xs: 8, sm: 10, md: 10, lg:18 }]}>
                {card}
                {/* this is just a presentational card  */}
                <Col sm={18}  md={18} lg={11} xl={10} className={width<breakpoint? "dummy-card-mobile":'dummy-card-desktop'} >
                    <  >
                        <Card
                            // key={id}
                            // loading={props.loading}
                            className="lead-card-desktop"
                            hoverable={true}>
                            <div className="avatar-and-status">
                                <Avatar size={{ xl: 50 }}></Avatar>
                            </div>
                            <div className="content">
                                <div className="content-header">
                                    <p className="user-name-text capitalize">
                                        <span className="user-id uppercase">
                                        </span>
                                    </p>
                                    
                                </div>
                                <div className="content-body">
                                    <Card.Grid hoverable={false} className="grid-style">
                                        <p className="text-type">Created on</p>
                                        <p className="text-content"></p>
                                    </Card.Grid>
                                    <Card.Grid hoverable={false} className="grid-style">
                                        <p className="text-type">Created on</p>
                                        <p className="text-content"></p>
                                    </Card.Grid>
                                    <Card.Grid hoverable={false} className="grid-style">
                                        <p className="text-type">Appointment on</p>
                                        <p className="text-content">-</p>
                                    </Card.Grid>
                                    <Card.Grid hoverable={false} className="grid-style">
                                        <p className="text-type">Mobile No.</p>
                                        <p className="text-content"></p>
                                    </Card.Grid>
                                    <Card.Grid hoverable={false} className="grid-style">
                                        <p className="text-type">Allocated by</p>
                                        <p className="text-content capitalize"></p>
                                    </Card.Grid>
                                    <Card.Grid hoverable={false} className="grid-style">
                                        <p className="text-type">Allocated to</p>
                                        <p className="text-content capitalize"></p>
                                    </Card.Grid>
                                </div>
                            </div>
                            <button className="update-btn" >Update</button>
                        </Card>
                        
                    </>
                </Col>
            </Row>
        </div>
    )
}

export default LeadCards
