import React from 'react'
import Cards from './Cards'
import './RenewalCards.css'
import _ from "lodash";

const RenewalCards = (props)=> {
    let card = [];
    if(props.renewals && !_.isEmpty(props.renewals)){
        card = _.map(props.renewals, (lead, index) => {
            console.log("cards",lead)
       return ( <React.Fragment>
            <Cards 
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

export default RenewalCards
