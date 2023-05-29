import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, Switch, Row, Col, Progress } from "antd";
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
  const dataVal = useSelector((state) => state);
  // console.log("allocateBtnStatus ==== ", dataVal);
  const checkedLead = useSelector((state) => state?.leads?.checkedLead);
  const unCheckedLead = useSelector((state) => state?.leads?.unCheckedLead);
  const LeadData = useSelector((state) => state?.newLead?.payloadFormData);

  const history = useHistory();
  const {
    id,
    lead_Id,
    companyName,
    industryName,
    KDM_Name,
    mobileNo,
    branch_Name,
    appointDate,
    location,
    opportunityName,
    owner_name,
    weightage,
    lob,
    total_premium,
    tagic_premium,
    inception_date,
  } = props;
  console.log("props", props);

  // console.warn('PROPSSSS___________',props)

  const [chkID, setChkId] = useState("");

  function checkboxes(data, e) {
    console.log(e.target.checked);
    e.target.checked
      ? dispatch(updateCheckAllocatedLead([...checkedLead, data]))
      : dispatch(
          updateCheckAllocatedLead(
            checkedLead?.filter((res) => res.id !== data.id) || []
          )
        );
    setChkId(data.id);
    console.log("checkedLead = ", checkedLead);
  }

  useEffect(() => {
    setChkId(checkedLead?.map((res) => res.id));
    dispatch({
      type: "UPDATE_ALLCATION_TAB_POSSITION",
      allocateTab: false,
    });
  }, []);

  useEffect(() => {
    checkedLead.length <= 0 && setChkId("");
  }, [checkedLead]);

  // const leadComponent =
  //   leadStatus === "Converted" ? (
  //     <p className="user-status-text capitalize converted">{leadStatus}</p>
  //   ) : leadStatus === "Failed" ? (
  //     <p className="user-status-text capitalize failed">{leadStatus}</p>
  //   ) : leadStatus === "Closed" ? (
  //     <p className="user-status-text capitalize" style={{ color: "#D04949" }}>
  //       {leadStatus}
  //     </p>
  //   ) : (
  //     <p className="user-status-text capitalize open">{leadStatus}</p>
  //   );

  // let avatar = leadName

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
    // history.push("/leadmasterpage/statuslead", { leadID: id });
    history.push("/company-intelligence", { leadID: id });
  };
  let statusColors = {
    closed: "#D04949",
    open: "#e0cb0d",
    PendingProposals: "#b50e21",
    Converted: "#159e0e",
    statusStyle: "",
    bgColor: "",
  };

  const nameShorter = (str) => {
    try {
      if (str !== "") {
        str = str.toUpperCase();
        let arr = str.split(" ");
        if (arr.length === 1) {
          let fLatter = arr[0]?.charAt(0);
          str = fLatter;
        } else {
          let fLatter = arr[0]?.charAt(0);
          let sLatter = arr[1]?.charAt(0);
          str = fLatter + sLatter;
        }
      }
      return str;
    } catch (error) {
      console.log(error);
    }
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
              checkedLead?.length &&
              checkedLead?.find((res) => res.id === props.id)
            }
            onChange={(e) => checkboxes(props, e)}
          ></input>
        )}
        <div className="main-avtar">
          <div className="avatar-and-status">
            <Avatar
              style={{
                // paddingTop: "-40px",
                // lineHeight: "none",
                backgroundColor: "#d8d8d8",
              }}
              size={{ xl: 50 }}
            >
              {nameShorter(companyName)}
            </Avatar>
            {/* {leadComponent} */}

            <div className="content-header">
              <p className="user-name-text capitalize">{companyName}</p>
              <span className="user-id uppercase">{" "}</span>
              {/* <a href={`tel:${primaryMobile}`}></a> */}
              {/* <PhoneOutlined className="phoneicon"></PhoneOutlined> */}
            </div>
          </div>

          <div style={{display: "flex",flexDirection:'row',alignItems:'center'}}>
            <div>
              <Progress
                strokeColor="aquamarine"
                width={40}
                format={(percent, successPercent) => percent}
                type="circle"
                percent={weightage}
              />
            </div>
            <div
              style={{
                padding: "5px 15px 5px 15px",
                backgroundColor: "#00ACC1",
                borderRadius: 20,
                display: "flex",
                justifyContent: "center",
                marginLeft: 15,
              }}
            >
              <p style={{ marginBottom: 0, color: "#fff" }}> {location} </p>
            </div>
          </div>
        </div>

        <div className="content" style={{ flex: 1 }}>
          <hr
            style={{
              margin: "3px 0px 4px 0px",
              opacity: "0.5",
              color: "lightgray",
            }}
          />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              className="content-body Datainfo-Main-Container"
              style={{ flex: 3 }}
            >
              <div className="Dateinfo-Container">
                <div className="grid-style">
                  <p className="text-content">{lob}</p>
                  <p className="text-type">LOB</p>
                </div>
                <div className="grid-style AllocatedBy-Heading">
                  <p className="text-content">
                    {owner_name?.first_name} {owner_name?.last_name}
                  </p>
                  <p className="text-type">Owner</p>
                </div>
                <div className="grid-style Appoinment-Heading">
                  <p className="text-content">{appointDate}</p>
                  <p className="text-type">Appointment on</p>
                </div>
                <div className="grid-style Appoinment-Heading">
                  {/* <p className="text-type">Owner Name</p>
                  <p className="text-content">
                    {owner_name?.first_name} {owner_name?.last_name}
                  </p> */}
                </div>
              </div>
              <div className="Dateinfo-Container">
                <div className="grid-style">
                  <p className="text-content">{inception_date}</p>
                  <p className="text-type">Inception Date</p>
                </div>
                <div className="grid-style AllocatedBy-Heading">
                  <p className="text-content capitalize">{total_premium}</p>
                  <p className="text-type">Total Premium</p>
                </div>
                <div className="grid-style Appoinment-Heading">
                  <p className="text-content capitalize">{tagic_premium}</p>
                  <p className="text-type">Tagic Premium</p>
                </div>
                <div className="grid-style Appoinment-Heading">
                  <button
                    type="primary"
                    className="update-btn"
                    onClick={() => updateHandler(id)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
            {/* <div style={{ display: "flex", flex: 1 }}>
              <button
                type="primary"
                className="update-btn"
                onClick={() => updateHandler(id)}
              >
                Update
              </button>
            </div> */}
          </div>
        </div>
        {/* <div className="Update-Btn"></div> */}
      </Card>
    </div>
  );
  //Card for Mobile
  if (width < breakpoint) {
    card = (
      <Card
        className="lead-card-mobile"
        hoverable
        onClick={() => updateHandler(id)}
      >
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
              checkedLead?.filter((res) => res.id === chkID).length > 0
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
          {nameShorter(opportunityName)}
        </Avatar>
        <div className="card-content-text capitalize">
          <p className="user-name-text">{opportunityName}</p>
          {/* {leadComponent} */}
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
