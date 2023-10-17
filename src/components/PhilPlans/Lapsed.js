import React from 'react'
import "./CashLoan.css";

const Lapsed = () => {
  return (
    <div>
    <div class="alert-card mb-4">

    <div class="alert-message" style={{gap:'24px'}}>
      <div class="alert-title">
      Have you missed the grace period for paying your due premium?
      </div>
      <div class="message">
      Don't worry, your insurance coverage can be renewed.
      </div>
      <div className="cta-col">
                  <button className="primary-btn">
                    <div className="text1">Apply for Reinstatement</div>
                  </button>
        </div>
    </div>
  </div>
    </div>
  )
}

export default Lapsed
