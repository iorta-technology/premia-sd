import { useMemo, useCallback } from "react";
import "./PlanCards.css";
import "./rhs.css";
import * as actions from "../../store/actions/index";
import { Col, Row, message } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
// import { baseURL } from "../../axios-common";
import { stoageSetter } from "../../helpers";
import apiConfig from "../../config/api.config";
import { planDetailsFailure, planDetailsStart, planDetailsSuccess } from "../../store/actions/allPlanDetails";
import {getPlanDetails} from "../../store/actions/planDetailsAction";
import { TokenOutlined } from "@mui/icons-material";
const { baseURL, auth, secure, NODE_ENV } = apiConfig;

const PlanCard = ({
  planName = "Educational Plan",
  policyName = "Policy Name",
  planNumber = "Plan number",
  dueDate = "DD/MM/YYYY",
  premiumAmt = "00.00",
  payTerm = "Monthly",
  planSatusChipBackgroundColor,
}) => {
  const history = useHistory();
  const state = useSelector(
    (state) => state
  );
  console.log('plancard state',state)
  const planDetailsListing = useSelector(
    (state) => state?.login?.planListing.P_LOP_DTLS
  );
  console.log("line 123", planDetailsListing);
  const sysId = useSelector((state) => state?.login?.planListing?.POL_SYS_ID);
  const token = useSelector((state) => state?.login?.loginDetails.token);
  const planSatusChipStyle = useMemo(() => {
    return {
      backgroundColor: planSatusChipBackgroundColor,
    };
  }, [planSatusChipBackgroundColor]);

  const onPlanCardContainerClick = useCallback(() => {
    // Please sync "Company03- ListingRisk-1" to the project
  }, []);

  const dispatch = useDispatch();

  const handleViewDetails =  (polNo, sysId) => {
   
    dispatch(getPlanDetails(polNo, sysId, token));
    history.push('/plan-details')
  };
  return (
    <>
      <div className="planlist_details_body mb-4" style={{ marginTop: 80 }}>
        <Row
          gutter={22}
          style={{
            margin: "0",
            padding: 0,
          }}
        >
          <Col sm={24} md={18} lg={18} xlg={8}>
            <p
              className="tab_title"
              style={{ display: "flex", alignSelf: "flex-start" }}
            >
              My Policies
            </p>
            {planDetailsListing?.length > 0
              ? planDetailsListing.map((item, index) => {
                  return (
                    <div
                      className="plan-card mb-3"
                      onClick={onPlanCardContainerClick}
                    >
                      <div className="plan-details">
                        <div className="plan-name">
                          {item.POL_ASSURED_NAME}{" "}
                          <p className="policy-name mb-0">
                            {item?.PROD_PORTAL_DESC?.toLowerCase()}
                          </p>
                        </div>
                      </div>
                      <div className="details-div">
                        <div className="details-col">
                          <div className="plan-no-date">
                          <div
                          className="plan-satus-chip"
                          style={{
                            backgroundColor:
                              item.POL_ADDL_STATUS === "Matured"
                                ? "#434C55"
                                : item.POL_ADDL_STATUS === "Lapsed - Cancelled"
                                ? "#F19A49"
                                : "#6CC100",
                          }}
                        >
                          <div>{item.POL_ADDL_STATUS}</div>
                        </div>
                            <div className="data">
                              <div className="value">{item?.POL_NO}</div>
                              <div className="label">Plan Number</div>
                            </div>
                            <div className="data">
                              <div className="value">
                                {item?.DUE_DATE
                                  ? moment(item.DUE_DATE).format("DD-MM-YYYY")
                                  : "--"}
                              </div>
                              <div className="label">Due Date</div>
                            </div>
                          </div>
                          <div className="plan-no-date">
                            <div className="data">
                              <div className="value">
                                {item?.POL_LC_PRENEED_PRICE}
                              </div>
                              <div className="label">Premium Amount</div>
                            </div>
                            <div className="data">
                              <div className="value">
                                {item?.POL_MODE_OF_PYMT}
                              </div>
                              <div className="label">Payment Term</div>
                            </div>
                          </div>
                        </div>
                        <div className="cta-col">
                          {/* <button className="primary-btn">
                            <div className="text1">Pay Now</div>
                          </button> */}
                          <button
                            className="outline-btn"
                            onClick={() =>
                              handleViewDetails(item?.POL_NO, item?.POL_SYS_ID)
                            }
                          >
                            <div className="text2">View Details</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""}
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
                        <div className="product-name">Cash Loan Program</div>
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
      {/* <div className="footer_powered_by fixed-bottom">
        Powered by <strong>Salesdrive</strong>
        <sup>TM</sup>
      </div> */}
    </>
  );
};

export default PlanCard;
