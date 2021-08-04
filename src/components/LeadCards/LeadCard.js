import React,{useEffect,useState} from 'react'
import {Card,Avatar} from 'antd'
import {MoreOutlined } from '@ant-design/icons';
import './LeadCard.css';
const LeadCard = React.memo((props) => {

    const {lead_Id,leadStatus,firstName,lastName,created_date,allocatedDate,primaryMobile,allocatedBy,allocatedTo} = props
  const leadComponent = 
  leadStatus === 'open'
  ? 
  <p className="user-status-text capitalize open">{leadStatus}</p>
  :
  leadStatus === 'converted'
  ?
  <p className="user-status-text capitalize converted">{leadStatus}</p>
  :
  leadStatus === 'failed'
  ?
  <p className="user-status-text capitalize failed">{leadStatus}</p>
  :
  <p className="user-status-text capitalize">{leadStatus}</p>

    let avatar = firstName.match(/\b(\w)/g) + lastName.match(/\b(\w)/g)

    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 620;

     useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);

        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    // Card for desktop
    let card = 
            <Card
                className="lead-card-desktop"
                hoverable={true}>
                    <div className="avatar-and-status">
                        <Avatar size={{xl: 50}}>{avatar}</Avatar>
                        {leadComponent}
                    </div>
                    <div className="content">
                        <div className="content-header">
                            <p className="user-name-text capitalize">
                                {firstName} {lastName}
                                <span className="user-id uppercase">
                                    {lead_Id}
                                </span>
                            </p>
                        </div>
                        <div className="content-body">
                            <Card.Grid hoverable={false} className="grid-style">
                                <p className="text-type">Created on</p>
                                <p className="text-content">{new Date(created_date).toLocaleDateString('in')}</p>
                            </Card.Grid>
                            <Card.Grid hoverable={false} className="grid-style">
                                <p className="text-type">Created on</p>
                                <p className="text-content">{new Date(allocatedDate).toLocaleDateString('in')}</p>
                            </Card.Grid>
                            <Card.Grid  hoverable={false} className="grid-style">
                                <p className="text-type">Appointment on</p>
                                <p className="text-content">-</p>
                            </Card.Grid>
                            <Card.Grid  hoverable={false} className="grid-style">
                                <p className="text-type">Mobile No.</p>
                                <p className="text-content">{primaryMobile}</p>
                            </Card.Grid>
                            <Card.Grid  hoverable={false} className="grid-style">
                                <p className="text-type">Allocated by</p>
                                <p className="text-content capitalize">{allocatedBy}</p>
                            </Card.Grid>
                            <Card.Grid  hoverable={false} className="grid-style">
                                    <p className="text-type">Allocated to</p>
                                    <p className="text-content capitalize">{allocatedTo}</p>
                            </Card.Grid>
                        </div>
                    </div>
                    <button className="update-btn">Update</button>  
            </Card>

    //Card for Mobile
    if(width<breakpoint){
        card = 
        <Card
            className="lead-card-mobile"
            hoverable>
            <Avatar size={{
                    xs: 36,
                    md: 40,
                    xl: 50,
                    }}
                    style={{backgroundColor:'blue'}}>{avatar}</Avatar>
            <div className="card-content-text capitalize">
                <p className="user-name-text">{firstName} {lastName}</p>
                <p className="user-status-text">{leadStatus}</p>
            </div>
            <MoreOutlined  style={{fontSize:'25px',marginLeft:'auto',color:'grey'}}/>
        </Card>
    }
    return (
            <div>{card}</div>

    )
})

export default LeadCard
