import React from 'react'
import "./MaturityCard.css";
import { Select } from 'antd';

const Maturity = () => {
  return (
    <div class="alert-card mb-4">
    <div class="alert-message" style={{gap:'24px'}}>
      <div class="alert-title">
      Have you missed the grace period for paying your due premium?Great News! Your premium payments are complete and you are eligible to apply for:
      </div>
      <div>
      <Select
    defaultValue="Maturity Benefit"
    style={{ width: 200 }}
    // onChange={}
    // options={[
    //   {
    //     label: 'Maturity Benefit',
    //     options: [
    //       { label: 'Maturity Benefit', value: 'Maturity Benefit' },
    //     //   { label: 'Lucy', value: 'lucy' },
    //     ],
    //   },
    // ]}
  />
      </div>
      <div className="cta-col">
                  <button className="primary-btn">
                    <div className="text1">Apply Now</div>
                  </button>
        </div>
    </div>
  </div>
  )
}

export default Maturity
