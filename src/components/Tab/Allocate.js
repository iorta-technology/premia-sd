import { Card, Avatar, Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import "./Tab.css";
import { getTeamMainTabApi } from "../actions/allleadAction";

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
  const allocateBtnStatus = useSelector((state) => state?.leads?.allocateTab);
  const checkedLead = useSelector((state) => state?.leads?.checkedLead);
  const state = useSelector((state) => state);
  const [visible, setVisible] = useState(false);
  const [viewDetails, setviewDetails] = useState("");
  const [cardData, setCardData] = useState([]);
  const breakpoint = 620;
  console.log("state === ", state);
  const userTreeData = useSelector(
    (state) => state?.home?.user_tree.reporting_users
  );
  const managerName = useSelector(
    (state) => state?.home?.user_tree.reporting_managers
  );

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    setCardData(userTreeData);
    console.log("cardData === ", managerName);
  }, []);

  const handleCloseAllocate = () => {
    setVisible(false);
    dispatch(actions.updateAllocateOfOpportunities(false));
    dispatch(actions.updateCheckAllocatedLead([]));
  };
  console.log("viewDetails", viewDetails);

  // dataForAllocket

  const handleAllocateTo = () => {
    if (allocateBtnStatus && checkedLead?.length > 0) {
      setVisible(true);
    }
  };

  let getMangerName = (findId) => {
    let manager = "";
    managerName.map((res) => {
      if (res._id === findId) {
        manager = res.first_name + " " + res.last_name;
      }
    });
    return manager;
  };

  const handleAllocateLead = () => {
    let payload = {
      userId: "5d80e8b084dfaa4a37a6b760",
      Allocated_user_id: viewDetails._id,
      Lead_Id_List: checkedLead.map((res) => ({ _id: res.id })),
    };

    axiosRequest
      .post(`admin/manualAllocation_lead`, payload, {
        secure: true,
      })
      .then((res) => {
        handleCloseAllocate();
        setviewDetails("");
      })
      .catch((err) => console.log(err));
  };

  const handleViewDetails = (lead) => {
    axiosRequest
      .get(`user/v2/getleads_team_count/${id}`, {
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
      {allocateBtnStatus && (
        <div
          style={{
            backgroundColor: "rgb(33, 150, 243)",
            position: "absolute",
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
      )}

      {allocateBtnStatus ? (
        width > breakpoint - 30 ? (
          <figure
            className="round-cards3-active"
            onClick={handleAllocateTo}
            key={"allocket"}
          >
            {" "}
            <figcaption className="card-caption">Allocate To</figcaption>{" "}
          </figure>
        ) : (
          <button
            key={"allocket active"}
            onClick={handleAllocateTo}
            style={{ color: "#fff" }}
            className="active_tabs_button"
          >
            <img src={person_white} className="person" alt="person_png" />
            <b>+</b> Allocate To
          </button>
        )
      ) : width > breakpoint - 30 ? (
        <figure
          className="round-cards3"
          onClick={() => dispatch(actions.updateAllocateOfOpportunities(true))}
          key={"allocket"}
        >
          {" "}
          <figcaption className="card-caption">Allocate</figcaption>{" "}
        </figure>
      ) : (
        <button
          key={"allocket"}
          onClick={() => dispatch(actions.updateAllocateOfOpportunities(true))}
          style={{ color: "#000" }}
          className="tabs_button"
        >
          <img src={person_black} className="person" alt="person_png" />
          <b>+</b> Allocate
        </button>
      )}
      <Modal
        title="Allocate to"
        centered
        visible={visible}
        onOk={handleCloseAllocate}
        onCancel={handleCloseAllocate}
        footer={null}
        width={width <= breakpoint ? "99%" : 800}
        bodyStyle={{ backgroundColor: "rgb(247, 247, 247)" }}
      >
        <div style={modelStyle}>
          <div
            style={{
              height: "238px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              marginBottom: "5px",
            }}
          >
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
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 2,
                    }}
                  >
                    <div>
                      <Avatar style={{ textTransform: "uppercase" }}>
                        {item.first_name.charAt(0) + item.last_name.charAt(0)}
                      </Avatar>
                    </div>
                    <div>
                      <p
                        style={{
                          marginBottom: 0,
                          fontWeight: "500",
                          color: "rgb(0, 172, 193)",
                        }}
                      >
                        Agent
                      </p>
                    </div>
                    <div>
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
                    <div>
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
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      flex: 1,
                    }}
                  >
                    <Button
                      size="small"
                      shape="round"
                      style={{
                        backgroundColor: "rgb(0, 172, 193)",
                        color: "#fff",
                      }}
                      // style={{ height: '1.2rem', width: '4rem', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(0, 172, 193)', fontSize: '10px', fontWeight: '400px', position: 'absolute', left: '335px', color: '#ffff' }}
                      onClick={() => handleViewDetails(item)}
                    >
                      View details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "#ffff",
              margin: "0 10px",
              border: "0.8px solid lightgray",
            }}
          >
            {viewDetails ? (
              <div>
                <div
                  key={viewDetails.id}
                  style={{
                    display: "flex",
                    backgroundColor: "#F7FBFF",
                    height: "8rem",
                    width: "auto",
                    marginBottom: "1rem",
                    position: "relative",
                    alignItems: "end",
                  }}
                >
                  <Avatar
                    style={{
                      textTransform: "uppercase",
                      position: "absolute",
                      left: "7px",
                      top: "20px",
                    }}
                    size={{ xl: 50 }}
                  >
                    {viewDetails.first_name && viewDetails.first_name.charAt(0)}{" "}
                    {viewDetails.last_name && viewDetails.last_name.charAt(0)}
                  </Avatar>
                  <div style={{ margin: 10 }}>
                    <div style={{ color: "#00acc1", fontWeight: "bolder" }}>
                      Agent
                    </div>
                    <div>Reports to :</div>
                  </div>
                  <div style={{ margin: 10, color: "gray" }}>
                    <div></div>
                    {/* <div>{viewDetails.reporting_manager} </div> */}
                    <div>{getMangerName(viewDetails.reporting_manager)} </div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#F4F6F9",
                    border: "1px solid #D2DDE8",
                    padding: "10px",
                    marginLeft: "15px",
                    marginRight: "15px",
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
            )}
          </div>
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

function AllocateModalShow({ id }) {
  return (
    <>
      <AllocateModal id={id} />
    </>
  );
}
export default AllocateModalShow;
