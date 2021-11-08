import React from 'react'
import Cards from './Cards'
import './RenewalCards.css'
import _ from "lodash";

const RenewalCards = (props)=> {
    let card = [];
    if(props.renewals && !_.isEmpty(props.renewals)){
        card = _.map(props.renewals, (user, index) => {
            console.log("cards",user)
       return ( <React.Fragment>
            <Cards 
                key={user._id}
                user_Id={user.proposer_ID}
                userStatus={user.policy_status}
                fullName={user.proposerName}
                annualisedPremium={user.PremiumOneYear}
                end_date={user.policyEndDate}
                proposer_ID_refs={user.proposer_ID_refs}
                loading={props.renewalsDataLoading}
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
