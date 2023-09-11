import { Card, Avatar, Button, Modal, Select, Row, Col,Input, message } from "antd";
import React, { useState, useEffect } from "react";
import "./Tab.css";
import { getTeamMainTabApi } from "../actions/allleadAction";
// import UserAddOutlined from 'antd/ico'
import { UserAddOutlined } from '@ant-design/icons';
// <UserAddOutlined />

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/leads";
import axios from "axios";
import person_black from "./../Activitity Tracker/icons/person_black.png";
import person_white from "./../Activitity Tracker/icons/person_white.png";
import axiosRequest from "../../axios-request/request.methods";
import { checkAgent, stoageGetter } from "../../helpers";

export const AllocateModal = React.memo((props) => {
  const { id } = stoageGetter("user");
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log("state------------------>",state);
  const allocateBtnStatus = useSelector((state) => state?.leads?.allocateTab);
  const checkedLead = useSelector((state) => state?.leads?.checkedLead);
  console.log("checkedlead",checkedLead);
  const [visible, setVisible] = useState(false);
  const [viewDetails, setviewDetails] = useState("");
  const [cardData, setCardData] = useState([]);
  const [firstDrop, setFirstDrop] = useState([]);
  const [firstValue, setFirstValue] = useState("Select");
  // const [cancel, setCancel] = useState(false);

  const breakpoint = 620;
  console.log("props_______props === ", props);
  // const userTreeData = useSelector(
  //   (state) => state?.home?.user_tree.reporting_users
  // );
  const userTreeData = useSelector((state) => state?.home?.user_tree);
  const managerName = useSelector(
    (state) => state?.home?.user_tree.reporting_managers
  );

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    setFirstDrop(userTreeData.reporting_hierarchies);
    // setCancel(false);
    setFirstValue("Select")
    // setCardData(userTreeData.reporting_users);
    // console.log("cardData === ", userTreeData);
  }, []);
  const handleDropdown=(event)=>{
    setFirstValue(event);
    setFirstValue(event);
    let _teamData = userTreeData.reporting_users.filter(
      (el) => el.hierarchy_id === event
    );
    setCardData(_teamData);
    // setCardData(userTreeData.reporting_users);
  }
  const handleCloseAllocate = () => {
    setVisible(false);
    dispatch(actions.updateAllocateOfOpportunities(false));
    dispatch(actions.updateCheckAllocatedLead([]));
    setCardData([]);
    // setFirstDrop([]);
    setFirstValue("Select");
    // setCancel(true);
    // setFirstDrop("Hierarchy");
  };
  console.log("viewDetails", viewDetails);

  // dataForAllocket

  const handleAllocateTo = () => {
    if (allocateBtnStatus && checkedLead?.length > 0) {
      setVisible(true);
    }
  };

  let getMangerName = (findId) => {
    // console.warn('---------managerName------->>',managerName)
    let manager = "";
    managerName.map((res) => {
      if (res._id === findId) {
        manager =
          res.first_name + " " + res.last_name + " (" + res.employeeCode + ") ";
      }
    });
    return manager;
  };

  const handleAllocateLead = (item) => {
    console.log('handleallocated ',item);
    let payload = {
      userId: id,
      Allocated_user_id: item._id,
      Lead_Id_List: checkedLead.map((res) => ({ _id: res.id })),
      firstName: item.first_name,
      lastName: item.last_name,
      reporting_manager_first_name: "",
      reporting_manager_last_name: "",
      reporting_manager_id: item.reporting_manager
    };

    axiosRequest
      .put(`user/manualAllocation_lead`, payload, {
        secure: true,
      })
      .then((res) => {
        console.warn("res---------->>>>>>>>>>>", res);
        // message.success(res);
        if (res.length !== 0) {
          message.success(res);
          handleCloseAllocate();
          setviewDetails("");
          dispatch(actions.updateCheckAllocatedLead([]));
          dispatch(actions.fetchAllLeads(id, props.tabSelected, 1));
        }else{
          message.warn("The leads are either already mapped to the agent or do not exist in the system");
          handleCloseAllocate();
          setviewDetails("");
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
  //   axiosRequest
  //   .get(`user/v2/getleads_team_count/${lead._id}`, {
  //     secure: true,
  //   })
  //   .then((res) => {
  //     setviewDetails({
  //       ...lead,
  //       convertedLead: res.converted,
  //       open: res.open_lead,
  //     });
  //   })
  //   .catch((err) => console.log(err));
  // console.log(lead, "lead");
  // setviewDetails(lead);
  }, [])


  const handleViewDetails = (lead) => {
    console.warn("VIEW___DETAIL___ID", lead);
    axiosRequest
      .get(`user/v2/getleads_team_count/${lead._id}`, {
        secure: true,
      })
      .then((res) => {
        setviewDetails({
          ...lead,
          convertedLead: res.converted,
          open: res.open_lead,
        });
      })
      .catch((err) => console.log(err));
    console.log(lead, "lead");
    setviewDetails(lead);
  };

  const modelStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    flexDirection: width <= 750 ? "column" : "row",
  };

  return (
    <>
      {/* {allocateBtnStatus && (
        <div
          style={{
            backgroundColor: "rgb(33, 150, 243)",
            position: "fixed",
            left: "50%",
            top: "60px",
            width: "320px",
            color: "white",
            padding: "0px 10px 0px 10px",
            zIndex: 99,
            transform: "translate(-50%,0)",
          }}
        >
          <p style={{ position: "relative", top: "10px" }}>
            {" "}
            You have selected {checkedLead.length} leads{" "}
            {checkedLead.length ? (
              <p
                style={{
                  cursor: "pointer",
                  marginLeft: "190px",
                  marginTop: "-25px",
                  textAlign: "end",
                }}
                onClick={() => dispatch(actions.updateCheckAllocatedLead([]))}
              >
                UNSELECT
              </p>
            ) : (
              <p
                style={{
                  cursor: "pointer",
                  marginLeft: "190px",
                  marginTop: "-25px",
                  textAlign: "end",
                }}
                onClick={() => {
                  handleCloseAllocate();
                }}
              >
                CANCEL{" "}
              </p>
            )}
          </p>
        </div>
      )} */}

      {allocateBtnStatus ? (
        width > breakpoint - 30 ? (
          // <figure
          //   className="round-cards3-active"
          //   onClick={handleAllocateTo}
          //   key={"allocket"}
          // >
          //   {" "}
          //   <figcaption className="card-caption">Allocate To</figcaption>{" "}
          // </figure>
          <button style={{padding:'4px 20px',borderRadius:'4px'}}  onClick={handleAllocateTo} key={'allocket'} className="allocate_btn">
            <div className="allocate_btn_inner" >
              <UserAddOutlined /> Allocate To
            </div>
          </button>
        ) : (
          <button
          style={{padding:'4px 20px',borderRadius:'4px',color:'#fff'}} 
            key={"allocket active"}
            onClick={handleAllocateTo}
            // style={{ color: "#fff" }}
            className="active_tabs_button"
          >
            {/* <img src={person_white} className="person" alt="person_png" /> */}
            <UserAddOutlined />
            <b>+</b> Allocate To
          </button>
        )
      ) : width > breakpoint - 30 ? (
        // <figure
        //   className="round-cards3"
        //   onClick={() => dispatch(actions.updateAllocateOfOpportunities(true))}
        //   key={"allocket"}
        // >
        //   {" "}
        //   <figcaption className="card-caption">Allocate </figcaption>{" "}
        // </figure>
        <button style={{padding:'4px 20px',borderRadius:'4px'}}  onClick={() => dispatch(actions.updateAllocateOfOpportunities(true))} className="allocate_btn">
          <div className="allocate_btn_inner">
            <UserAddOutlined style={{ color: '#fff' }} /> Allocate
          </div>
        </button>
      ) : (
        <button
        style={{padding:'4px 20px',borderRadius:'4px',color:'#000'}} 
          key={"allocket"}
          onClick={() => dispatch(actions.updateAllocateOfOpportunities(true))}
          // style={{ color: "#000" }}
          className="tabs_button"
        >
          <img src={person_black} className="person" alt="person_png" />
          <b>+</b> Allocate
        </button>
      )}
      <Modal
        title="Allocate To"
        className="todo-popup-container-width todo-header-style"
        centered
        visible={visible}
        onOk={handleCloseAllocate}
        onCancel={handleCloseAllocate}
        footer={null}
        width={width <= breakpoint ? "99%" : 800}
        bodyStyle={{ backgroundColor: "rgb(247, 247, 247)" }}
      >
        <Row>
          <Col style={{ flex: 1, margin: '2px' }}>
            <p style={{ marginBottom: 2 }}> Select Hierarchy </p>
            <Select
              value={firstValue}
              placeholder="Hierarchy"
              style={{ width: '100%' }}
              options={firstDrop}
              onChange={handleDropdown}
            ></Select>
          </Col>
          <Col style={{ flex: 1, margin: '2px' }}>
            {/* <p style={{ marginBottom: 2 }}> Search </p>
            <Input
              placeholder="Search"
              style={{ width: '100%' }}></Input> */}
          </Col>
        </Row>
        <div style={modelStyle}>
          <div
            style={{
              marginTop: '10px',
              height: "238px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              marginBottom: "5px",
              overflowY: "auto",
            }}
          >
          <div>Members ({cardData.length})</div>
            {cardData?.map((item, ind) => {
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    backgroundColor: "#fff",
                    width: "auto",
                    marginBottom: "0",
                    padding: 3,
                    alignItems: "center",
                    border: "0.8px solid lightgray",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    padding: '10px'
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                      width: '100%'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div><Avatar style={{ textTransform: "uppercase" }}>
                        {item.first_name.charAt(0) + item.last_name.charAt(0)}
                      </Avatar>
                      </div>
                      <div style={{ marginLeft: '4px' }}>
                        <p
                          style={{
                            marginBottom: 0,
                            fontWeight: "500",
                            textTransform: "capitalize",
                          }}
                        >
                          {item.first_name} {item.last_name}
                        </p>
                      </div>
                    </div>
                    {/* <div>
                      <p
                        style={{
                          marginBottom: 0,
                          fontWeight: "500",
                          color: "rgb(0, 172, 193)",
                        }}
                      >
                        Agent
                      </p>
                    </div> */}
                    {/* <div>
                      <p
                        style={{
                          marginBottom: 0,
                          fontWeight: "500",
                          textTransform: "capitalize",
                        }}
                      >
                        {item.first_name} {item.last_name}
                      </p>
                    </div> */}
                    {/* <div>
                      <p
                        style={{
                          marginBottom: 0,
                          fontWeight: "500",
                          color: "#78849E",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.lead_Id}
                      </p>
                    </div> */}
                  </div>
                  <div>
                      <p
                        style={{
                          marginBottom: 0,
                          fontWeight: "500",
                          textTransform: "capitalize",
                        }}
                      >
                      <span style={{color:'#00ACC1'}}>0</span> <span style={{color:'gray'}}><i>open leads</i></span>
                      </p>
                    </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      flex: 1,
                    }}
                  >
                    {/* <Button
                      size="small"
                      shape="round"
                      style={{
                        backgroundColor: "rgb(0, 172, 193)",
                        color: "#fff",
                      }}
                      onClick={() => handleViewDetails(item)}
                    >
                      View details
                    </Button> */}
                    <Button
                      style={{ border: '1px solid #00ACC1', color: "#00ACC1", borderRadius: '5px' }}
                      onClick={()=>handleAllocateLead(item)}
                    >
                      Allocate
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* <div
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "#ffff",
              margin: "0 10px",
              border: "0.8px solid lightgray",
            }}
          > */}
          {/* {viewDetails ? (
              <div>
                <div
                  key={viewDetails.id}
                  style={{
                    backgroundColor: "#F7FBFF",
                    padding: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        style={{
                          textTransform: "uppercase",
                        }}
                        size={{ xl: 50 }}
                      >
                        {viewDetails.first_name &&
                          viewDetails.first_name.charAt(0)}
                        {""}
                        {viewDetails.last_name &&
                          viewDetails.last_name.charAt(0)}
                      </Avatar>
                      <div style={{ color: "#00acc1", fontWeight: "bolder" }}>
                        Agent
                      </div>
                    </div>
                    <div style={{ marginLeft: 10 }}>
                      <p style={{ marginBottom: 0 }}>
                        {viewDetails.first_name + " " + viewDetails.last_name}
                      </p>
                      <p style={{ marginBottom: 0, color: "gray" }}>
                        {viewDetails.employeeCode}
                      </p>
                    </div>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <p style={{ marginBottom: 0 }}>
                      Reports to :{" "}
                      <span style={{ color: "gray" }}>
                        {getMangerName(viewDetails.reporting_manager)}
                      </span>{" "}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#F4F6F9",
                    border: "1px solid #D2DDE8",
                    padding: "10px",
                    marginLeft: "15px",
                    marginRight: "15px",
                    marginTop: "15px",
                    height: "2.5rem",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      color: "rgb(0, 172, 193)",
                    }}
                  >
                    Lead
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "#F4F6F9",
                    border: "1px solid #D2DDE8",
                    padding: "10px",
                    marginLeft: "15px",
                    marginRight: "15px",
                    height: "6rem",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>Converted Lead</div>
                    <div style={{ fontWeight: "bold" }}>
                      {viewDetails.convertedLead}
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>Open</div>
                    <div style={{ fontWeight: "bold" }}>{viewDetails.open}</div>
                  </div>
                </div>
                <div
                  style={{
                    margin: "15px",
                  }}
                >
                  <Button
                    style={{ backgroundColor: "#00ACC1", color: "#fff" }}
                    onClick={handleAllocateLead}
                  >
                    Allocate
                  </Button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  padding: "150px 0 50px",
                  textAlign: "center",
                  fontSize: "24px",
                  fontFamily: "robotoregular",
                  color: "gray",
                }}
              >
                Please Select the Card!!
              </div>
            )} */}
          {/* </div> */}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "-5px",
            marginTop: "5px",
          }}
        >
          <Button onClick={handleCloseAllocate}>Cancel</Button>
        </div>
      </Modal>
    </>
  );
});

function AllocateModalShow({ id, tabSelected }) {
  return (
    <>
      <AllocateModal id={id} tabSelected={tabSelected} />
    </>
  );
}
export default AllocateModalShow;
