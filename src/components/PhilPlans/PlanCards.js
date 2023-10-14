import { useMemo, useCallback } from "react";
import "./PlanCards.css";
import "./rhs.css";

import { Col, Row } from "antd";

const PlanCard = ({
  planName = "Educational Plan",
  policyName = "Policy Name",
  planNumber = "Plan number",
  dueDate = "DD/MM/YYYY",
  premiumAmt = "00.00",
  payTerm = "Monthly",
  planSatusChipBackgroundColor,
}) => {
  const planSatusChipStyle = useMemo(() => {
    return {
      backgroundColor: planSatusChipBackgroundColor,
    };
  }, [planSatusChipBackgroundColor]);

  const onPlanCardContainerClick = useCallback(() => {
    // Please sync "Company03- ListingRisk-1" to the project
  }, []);

  return (
    <>
      <div className="plan_details_body" style={{ marginTop: 80 }}>
        <Row
          gutter={22}
          style={{
            margin: "0",
            padding: 0,
          }}
        >
          <Col
            sm={24}
            md={18}
            lg={18}
            xlg={8}
          >
            <p
              className="tab_title"
              style={{ display: "flex", alignSelf: "flex-start" }}
            >
              My Policies
            </p>
            <div className="plan-card mb-4" onClick={onPlanCardContainerClick}>
              <div className="plan-details">
                <div className="plan-name">
                  {planName} <b className="policy-name">{policyName}</b>
                </div>
                <div className="plan-satus-chip" style={planSatusChipStyle}>
                  <div className="active">Active</div>
                </div>
              </div>
              <div className="details-div">
                <div className="details-col">
                  <div className="plan-no-date">
                    <div className="data">
                      <div className="value">{planNumber}</div>
                      <div className="label">Plan Number</div>
                    </div>
                    <div className="data">
                      <div className="value">{dueDate}</div>
                      <div className="label">Due Date</div>
                    </div>
                  </div>
                  <div className="plan-no-date">
                    <div className="data">
                      <div className="value">{premiumAmt}</div>
                      <div className="label">Premium Amount</div>
                    </div>
                    <div className="data">
                      <div className="value">{payTerm}</div>
                      <div className="label">Payment Term</div>
                    </div>
                  </div>
                </div>
                <div className="cta-col">
                  <button className="primary-btn">
                    <div className="text1">Pay Now</div>
                  </button>
                  <button className="outline-btn">
                    <div className="text2">View Details</div>
                  </button>
                </div>
              </div>
            </div>
            <div className="plan-card mb-4" onClick={onPlanCardContainerClick}>
              <div className="plan-details">
                <div className="plan-name">
                  {planName} <b className="policy-name">{policyName}</b>
                </div>
                <div className="plan-satus-chip" style={planSatusChipStyle}>
                  <div className="active">Active</div>
                </div>
              </div>
              <div className="details-div">
                <div className="details-col">
                  <div className="plan-no-date">
                    <div className="data">
                      <div className="value">{planNumber}</div>
                      <div className="label">Plan Number</div>
                    </div>
                    <div className="data">
                      <div className="value">{dueDate}</div>
                      <div className="label">Due Date</div>
                    </div>
                  </div>
                  <div className="plan-no-date">
                    <div className="data">
                      <div className="value">{premiumAmt}</div>
                      <div className="label">Premium Amount</div>
                    </div>
                    <div className="data">
                      <div className="value">{payTerm}</div>
                      <div className="label">Payment Term</div>
                    </div>
                  </div>
                </div>
                <div className="cta-col">
                  <button className="primary-btn">
                    <div className="text1">Pay Now</div>
                  </button>
                  <button className="outline-btn">
                    <div className="text2">View Details</div>
                  </button>
                </div>
              </div>
            </div>
            <div className="plan-card mb-4" onClick={onPlanCardContainerClick}>
              <div className="plan-details">
                <div className="plan-name">
                  {planName} <b className="policy-name">{policyName}</b>
                </div>
                <div className="plan-satus-chip" style={planSatusChipStyle}>
                  <div className="active">Active</div>
                </div>
              </div>
              <div className="details-div">
                <div className="details-col">
                  <div className="plan-no-date">
                    <div className="data">
                      <div className="value">{planNumber}</div>
                      <div className="label">Plan Number</div>
                    </div>
                    <div className="data">
                      <div className="value">{dueDate}</div>
                      <div className="label">Due Date</div>
                    </div>
                  </div>
                  <div className="plan-no-date">
                    <div className="data">
                      <div className="value">{premiumAmt}</div>
                      <div className="label">Premium Amount</div>
                    </div>
                    <div className="data">
                      <div className="value">{payTerm}</div>
                      <div className="label">Payment Term</div>
                    </div>
                  </div>
                </div>
                <div className="cta-col">
                  <button className="primary-btn">
                    <div className="text1">Pay Now</div>
                  </button>
                  <button className="outline-btn">
                    <div className="text2">View Details</div>
                  </button>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={24} md={6} lg={6} xlg={8}>
            <div className="rhs">
              <div className="contact-us">
                <div className="div">
                  <img
                    className="support-img-icon"
                    alt=""
                    src="/support-img@2x.png"
                  />
                </div>
                <div className="div1">
                  <div className="call-us-at">
                    Call us at (02) 8802-7202 on weekdays from 8:00AM to 5:00PM
                  </div>
                  <div className="secondary-button">
                    <div className="text">Get In Touch With US</div>
                  </div>
                </div>
              </div>
              
                  <div className="rhs-products">
                    <div className="div2">
                      <div className="title">Special Cash Programms</div>
                      <div className="nav">
                        <img
                          className="keyboard-arrow-left-icon"
                          alt=""
                          src="/keyboard-arrow-left.svg"
                        />

                        <img
                          className="keyboard-arrow-left-icon"
                          alt=""
                          src="/keyboard-arrow-right.svg"
                        />
                      </div>
                    </div>
                    <div className="product-cards">
                      <div className="product-card-1">
                        <div className="product-image">
                          <img
                            className="image-13-icon"
                            alt=""
                            src="/image-13@2x.png"
                          />
                        </div>
                        <div className="product-desc">
                          <div className="content">
                            <div className="product-name">
                              Cash Loan Program
                            </div>
                            <div className="product-info">
                              Good News! PhilPlans is offering an exclusive Cash
                              Loan Program with its lowest-ever 8% per annum
                              interest rate to qualified planholders.
                            </div>
                          </div>
                          <div className="cta">
                            <div className="read-more">read more</div>
                            <div className="get-in-touch">Get in touch</div>
                          </div>
                        </div>
                      </div>
                      <div className="product-card-1">
                        <div className="product-image">
                          <img
                            className="image-13-icon"
                            alt=""
                            src="/image-131@2x.png"
                          />
                        </div>
                        <div className="product-desc">
                          <div className="content">
                            <div className="product-name">Lump Sum Payment</div>
                            <div className="product-info">
                              Good News! PhilPlans is offering an exclusive Cash
                              Loan Program with its lowest-ever 8% per annum
                              interest rate to qualified planholders.
                            </div>
                          </div>
                          <div className="cta">
                            <div className="read-more">read more</div>
                            <div className="get-in-touch">Get in touch</div>
                          </div>
                        </div>
                      </div>
                      <div className="product-card-1">
                        <div className="product-image">
                          <img
                            className="image-13-icon"
                            alt=""
                            src="/image-132@2x.png"
                          />
                        </div>
                        <div className="product-desc">
                          <div className="content">
                            <div className="product-name">
                              Plan Termination Value
                            </div>
                            <div className="product-info">
                              Good News! PhilPlans is offering an exclusive Cash
                              Loan Program with its lowest-ever 8% per annum
                              interest rate to qualified planholders.
                            </div>
                          </div>
                          <div className="cta">
                            <div className="read-more">read more</div>
                            <div className="get-in-touch">Get in touch</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
               
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PlanCard;
