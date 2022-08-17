import React from 'react'
import {Typography} from 'antd'
import './Self.css'
import PastFutureData from '../History-showedData'
import JSONData from '../../JSON/json'
import DataField from '../DataField/DataField'
import EventCreate from '../EventCreate/EventCreate'
const Self = () => {
  return (
    <div className='container'>
      <EventCreate/>
        <div className='eventChange'>
            {JSONData.length >1?
              <PastFutureData/>
            :""  
          }
        </div>
        
        <div className='upcoming'>
            <p>Upcoming</p>
            <DataField/>
        </div>
        
        
    </div>
  )
}

export default Self;