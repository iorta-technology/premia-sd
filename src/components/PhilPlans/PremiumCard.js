import React from "react";
import { Card, Button } from "antd";
import "./rhs.css";
const PremiumCard = () => {
  const style = {
    antBtn: {
      background: "#01AB4F",
      borderRadius: "4px",
      fontSize: "14px",
      color: "#fff",
      //   fontStyle: "normal",
      //   fontWeight: 500,
    },
  };
  return (
    <>
      <Card
        className="premium_card rounded"
        size="small"
        title="Premium Payments"
        style={{ width: "100%" }}
      >
        <div className="premium_card_body">
          <div className="d-flex justify-content-between border_bottom mb-3 pb-3">
            <div>
              <p className="mb-0 amount">P3,153.00</p>
              <p className="mb-0 amt_date">Feb 12, 2023</p>
            </div>
            <Button className="pay_btn">Pay Now</Button>
          </div>
          <div className="d-flex justify-content-between border_bottom mb-3 pb-3">
            <div>
              <p className="mb-0 amount">P3,153.00</p>
              <p className="mb-0 amt_date">Feb 12, 2023</p>
            </div>
            <Button className="paid_btn">Paid</Button>
          </div>
          <div className="d-flex justify-content-between border_bottom mb-3 pb-3">
            <div>
              <p className="mb-0 amount">P3,153.00</p>
              <p className="mb-0 amt_date">Feb 12, 2023</p>
            </div>
            <Button className="paid_btn">Paid</Button>
          </div>
          <div className="d-flex justify-content-between border_bottom  pb-3">
            <div>
              <p className="mb-0 amount">P3,153.00</p>
              <p className="mb-0 amt_date">Feb 12, 2023</p>
            </div>
            <Button className="paid_btn">Paid</Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default PremiumCard;
