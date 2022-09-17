import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, Switch, Row, Col } from "antd";
import { MoreOutlined, PhoneOutlined } from "@ant-design/icons";
import "./LeadCard.css";
import * as actions from "../../store/actions/index";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { drop } from "lodash";
import AllocateModal from "../Tab/Allocate";

import { updateCheckAllocatedLead } from "../../store/actions/leads";

const LeadCard = React.memo((props) => {
  const dispatch = useDispatch();
  const allocateBtnStatus = useSelector((state) => state?.leads?.allocateTab);
  const checkedLead = useSelector((state) => state?.leads?.checkedLead);
  const unCheckedLead = useSelector((state) => state?.leads?.unCheckedLead);
  const LeadData = useSelector((state) => state?.newLead?.payloadFormData);

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

  const [chkID, setChkId] = useState("");

  function checkboxes(data, e) {
    e.target.checked
      ? dispatch(updateCheckAllocatedLead([...checkedLead, data]))
      : dispatch(
          updateCheckAllocatedLead(
            checkedLead?.filter((a) => a.id !== data.id) || []
          )
        );
    setChkId(data.Id);
  }

  useEffect(() => {
    !checkedLead.length && setChkId("");
  }, [checkedLead]);

  const leadComponent =
    leadStatus === "newleadentery" ? (
      <p className="user-status-text capitalize open">Open</p>
    ) : leadStatus === "converted" ? (
      <p className="user-status-text capitalize converted">{leadStatus}</p>
    ) : leadStatus === "failed" ? (
      <p className="user-status-text capitalize failed">{leadStatus}</p>
    ) : leadStatus === "contact" ? (
      <p className="user-status-text capitalize open">Open</p>
    ) : (<p className="user-status-text capitalize">{leadStatus}</p>)

  let avatar = firstName.match(/\b(\w)/g) + lastName.match(/\b(\w)/g);

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);
  const updateHandler = (id) => {
    // console.log('____LEADDDD___IDDD',id)
    
    
    // dispatch(actions.fetchLeadDetails(id));
    // let _data = actions.fetchLeadDetails(id);
    // console.log('_data___LEADDDD',_data)
    // console.log('history-----------',history)
    // LeadData._id === id && history.push("/leadmasterpage/statuslead");
    history.push("/leadmasterpage/statuslead",{ leadID: id });
  };
  let statusColors = {
    closed: "#D04949",
    open: "#e0cb0d",
    PendingProposals: "#b50e21",
    Converted: "#159e0e",
    statusStyle: "",
    bgColor: "",
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
        {allocateBtnStatus && (
          <input
            id="checkbox"
            type="checkbox"
            checked={
              chkID &&
              checkedLead.length &&
              checkedLead?.filter((a) => a.id.includes(chkID))
            }
            onChange={(e) => checkboxes(props, e)}
          ></input>
        )}

        <div className="main-avtar">
          <div className="avatar-and-status">
            <Avatar
              style={{ paddingTop: "-40px", lineHeight: "none" }}
              size={{ xl: 50 }}
            >
              {avatar}
            </Avatar>
            {/* <div style={{ display: 'flex' }}>{leadStatus === "newleadentery" ? <div style={{ fontSize: '10px' }}>NEW<div>LEADENTRY</div></div> : leadStatus}</div> */}
            {leadComponent}
          </div>
          {/* <Avatar style={{paddingTop:'-40px',lineHeight:'none' }} size={{ xl: 50 }}>
            {avatar}
          </Avatar> */}
          {/* <div style={{display:'flex'}}>{leadStatus === "newleadentery"? <div style={{fontSize:'10px'}}>NEW<div>LEADENTRY</div></div> : leadStatus}</div> */}
          {/* <p className="user-status-text">{leadStatus === "newleadentery" || leadStatus === "contact" ? 'Open' : leadStatus}</p> */}
          {/* {leadComponent} */}
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
          <hr
            style={{
              margin: "3px -30px 4px 0px",
              opacity: "0.5",
              color: "lightgray",
            }}
          />

          <div className="content-body Datainfo-Main-Container">
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
        {allocateBtnStatus && (
          <input
            style={{
              marginTop: "-4.5rem",
              marginLeft: "-1rem",
            }}
            id="checkbox"
            type="checkbox"
            checked={
              chkID &&
              checkedLead.length &&
              checkedLead?.filter((a) => a.id.includes(chkID))
            }
            onChange={(e) => checkboxes(props, e)}
          ></input>
        )}
        <Avatar
          className="avatar-mobile"
          size={{
            xs: 50,
            md: 40,
            xl: 50,
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "blue",
          }}
        >
          {avatar}
        </Avatar>
        <div className="card-content-text capitalize">
          <p className="user-name-text">
            {firstName} {lastName}
          </p>
          {leadComponent}
          {/* <p className="user-status-text">{leadStatus === "newleadentery" || leadStatus === "contact" ? 'Open' : leadStatus}</p> */}
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
