import React from 'react'
import LeadCard from './LeadCard'
import './LeadCards.css'
import _ from "lodash";

const LeadCards = (props)=> {
    let card = [];
    if(props.leads && !_.isEmpty(props.leads)){
        card = _.map(props.leads, (lead, index) => {
       return ( <React.Fragment>
            <LeadCard 
                key={lead._id}
                lead_Id={lead.lead_Id}
                leadStatus={lead.leadStatus}
                firstName={lead.firstName}
                lastName={lead.lastName}
                created_date={lead.created_date}
                allocatedDate={lead.allocatedDate}
                primaryMobile={lead.primaryMobile}
                allocatedBy={lead.lead_allocated_by.first_name +' '+ lead.lead_allocated_by.last_name}
                allocatedTo={lead.lead_allocated_by.first_name +' '+ lead.lead_allocated_by.last_name}
                loading={props.leadDataLoading}
            />
        </React.Fragment>
       )
        })
    }
    return (
            <div className="cards-container">
              {card}
            </div>
    )
}

export default LeadCards
