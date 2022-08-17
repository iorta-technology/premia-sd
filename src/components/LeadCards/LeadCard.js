import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, Switch, Row, Col } from "antd";
import { MoreOutlined, PhoneOutlined } from "@ant-design/icons";
import "./LeadCard.css";
import * as actions from "../../store/actions/index";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { drop } from "lodash";
const LeadCard = React.memo((props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    id,
    lead_Id,
    leadStatus,
    firstName,
    lastName,
    created_date,
    allocatedDate,
    primaryMobile,
    allocatedBy,
    allocatedTo,
    appointmentOn,
  } = props;

  const leadComponent =
    leadStatus === "newleadentery" ? (
      <p className="user-status-text capitalize open">Open</p>
    ) : leadStatus === "converted" ? (
      <p className="user-status-text capitalize converted">{leadStatus}</p>
    ) : leadStatus === "failed" ? (
      <p className="user-status-text capitalize failed">{leadStatus}</p>
    ) : (
      <p className="user-status-text capitalize">{leadStatus}</p>
    );

  let avatar = firstName.match(/\b(\w)/g) + lastName.match(/\b(\w)/g);

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  useEffect(() => {
    //  console.log(moment(appointmentOn).format('DD-MM-YYYY'))
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);
  const updateHandler = (id) => {
    dispatch(actions.fetchLeadDetails(id));
    history.replace("/leadmasterpage/statuslead");
  };
  // Card for desktop

  let card = (
    <div className="LeadCard-Main-Page-Container">
      <Card
        key={id}
        loading={props.loading}
        className="lead-card-desktop"
        hoverable={true}
      >
        <div className="main-avtar">

        <div className="avatar-and-status">
        {
          //  leadComponent.props.children === "Open" ?
          //  <input type='checkbox'></input>
          //  :null
        }
          <Avatar style={{ }} size={{ xl: 50 }}>
            {avatar}
          </Avatar>
          
          {leadComponent} 
        </div>
        </div>
          
        <div className="content">
          <div className="content-header">
            <p className="user-name-text capitalize">
              {firstName} {lastName}
            </p>
            <span className="user-id uppercase">{lead_Id}</span>
            <a href={`tel:${primaryMobile}`}></a>
            {/* <PhoneOutlined className="phoneicon"></PhoneOutlined> */}
          </div>
          <hr style={{ margin:'3px 0px 4px 0px', opacity:'0.5' }} />

          <div className="content-body Datainfo-Main-Container">
            {/* Date Data Code Start Here */}
            <div className="Dateinfo-Container">
              <Card.Grid hoverable={false} className="grid-style">
                <p className="text-type">Created on</p>
                <p className="text-content">
                  {new Date(created_date).toLocaleDateString("in")}
                </p>
              </Card.Grid>
              <Card.Grid
                hoverable={false}
                className="grid-style AllocatedBy-Heading"
              >
                <p className="text-type">Allocated on</p>
                <p className="text-content">
                  {new Date(allocatedDate).toLocaleDateString("in")}
                </p>
              </Card.Grid>
              <Card.Grid
                hoverable={false}
                className="grid-style Appoinment-Heading"
              >
                <p className="text-type">Appointment on</p>
                <p className="text-content">
                  {!appointmentOn
                    ? "-"
                    : new Date(appointmentOn).toLocaleDateString("in")}
                </p>
              </Card.Grid>

              {/* Mobile No And Allocated Data Code Start Here */}
              {/* <div className="NameAllocate-Data-Container"> */}
              <Card.Grid hoverable={false} className="grid-style">
                <p className="text-type">Mobile No.</p>
                <p className="text-content">{primaryMobile}</p>
              </Card.Grid>
              <Card.Grid
                hoverable={false}
                className="grid-style AllocatedBy-Heading"
              >
                <p className="text-type">Allocated by</p>
                <p className="text-content capitalize">{allocatedBy}</p>
              </Card.Grid>
              <Card.Grid
                hoverable={false}
                className="grid-style Appoinment-Heading"
              >
                <p className="text-type">Allocated to</p>
                <p className="text-content capitalize">{allocatedTo}</p>
              </Card.Grid>
              {/* </div> */}
            </div>
          </div>
        </div>
        {/* <div className="Update-Btn"></div> */}
        <button className="update-btn" onClick={() => updateHandler(id)}>
          Update
        </button>
      </Card>
    </div>
  );
  //Card for Mobile
  if (width < breakpoint) {
    card = (
      <Card className="lead-card-mobile" hoverable>
        <Avatar
          className="avatar-mobile"
          size={{
            xs: 36,
            md: 40,
            xl: 50,
          }}
          style={{ backgroundColor: "blue" }}
        >
          {avatar}
        </Avatar>
        <div className="card-content-text capitalize">
          <p className="user-name-text">
            {firstName} {lastName}
          </p>
          <p className="user-status-text">{leadStatus}</p>
          {/* <PhoneOutlined
            style={{ color: "green", cursor: "pointer" }}
          ></PhoneOutlined> */}
        </div>
        <MoreOutlined
          style={{ fontSize: "25px", marginLeft: "auto", color: "grey" }}
        />
      </Card>
    );
  }
  return <div key={id}>{card}</div>;
});

export default LeadCard;
