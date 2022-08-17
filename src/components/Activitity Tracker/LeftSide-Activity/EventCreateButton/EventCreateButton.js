import { Button, Typography } from 'antd'
import React from 'react'
import './EventCreateButton.css'

const EventCreateButton = () => {
  return (
    <div className='EventCreateButton'>
        <div className='newEventTag'>
            <img src='https://sdrestdemo.iorta.in/assets/DashboardIconNew/Group127.png'/>
            <Typography style={{color:"#d0a3e2"}}>No Event Exist</Typography>
            <Button style={{backgroundColor:"#d0a3e2",color:"gray",borderRadius:"2px"}}>Create an Event</Button>
        </div>
    </div>
  )
}

export default EventCreateButton