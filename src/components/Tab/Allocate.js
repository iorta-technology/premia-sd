import { Card, Avatar, Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import "./Tab.css";
import { getTeamMainTabApi } from "../actions/allleadAction";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/leads";
import axios from "axios";
import person_black from "./../Activitity Tracker/icons/person_black.png";
import person_white from "./../Activitity Tracker/icons/person_white.png";

export const AllocateModal = React.memo((props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
  }, []);

  const dispatch = useDispatch();
  const allocateBtnStatus = useSelector((state) => state?.leads?.allocateTab);
  const checkedLead = useSelector((state) => state?.leads?.checkedLead);
  const [visible, setVisible] = useState(false);
  const [viewDetails, setviewDetails] = useState([]);
  const [cardData, setCardData] = useState([]);

  const handleCloseAllocate = () => {
    setVisible(false);
    dispatch(actions.updateAllocateOfOpportunities(false));
    dispatch(actions.updateCheckAllocatedLead([]));
  };

  // dataForAllocket

  const handleAllocateTo = () => {
    if (allocateBtnStatus && checkedLead?.length > 0) {
      setVisible(true);
    }
  };

  const handleAllocateLead = () => {
    handleCloseAllocate();
    alert("Lead allocated successfully");
  };

  useEffect(() => {
    getAlldataofTeamMainTab();
  }, []);

  const getAlldataofTeamMainTab = async () => {
    const responsedata = await getTeamMainTabApi();
    setCardData(responsedata?.data?.errMsg[0]);
  };
  const handleViewDetails = (lead) => {
    setviewDetails([lead]);
  };

  const modelStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: width <= 750 ? "column" : "row",
  };

  return (
    <>
      {allocateBtnStatus && (
        <div
          style={{
            backgroundColor: "rgb(33, 150, 243)",
            position: "absolute",
            right: "550px",
            top: "60px",
            width: "320px",
            color: "white",
            padding: "0px 10px 0px 10px",
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
        width={width <= breakpoint ? "90%" : 800}
        bodyStyle={{ backgroundColor: "rgb(247, 247, 247)" }}
      >
        <div style={modelStyle}>
          <div
            style={{
              height: "238px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginBottom: "5px",
            }}
          >
            {cardData?.map((item, ind) => {
              let avatar =
                item.firstName.match(/\b(\w)/g) +
                item.lastName.match(/\b(\w)/g);
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
                        {avatar}
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
                        {item.firstName} {item.lastName}
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
            {viewDetails.length ? (
              viewDetails?.map((item, ind) => {
                let avatar =
                  item.firstName.match(/\b(\w)/g) +
                  item.lastName.match(/\b(\w)/g);
                return (
                  <div>
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        backgroundColor: "#F7FBFF",
                        height: "8rem",
                        width: "auto",
                        marginBottom: "1rem",
                        position: "relative",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        style={{
                          textTransform: "uppercase",
                          position: "absolute",
                          left: "5px",
                          top: "20px",
                        }}
                        size={{ xl: 50 }}
                      >
                        {avatar}
                      </Avatar>
                      <p
                        style={{
                          color: "rgb(0, 172, 193)",
                          fontSize: "13px",
                          fontWeight: "bold",
                          position: "absolute",
                          left: "14px",
                          top: "70px",
                        }}
                      >
                        Agent
                      </p>
                      <p
                        style={{
                          fontWeight: "700",
                          position: "absolute",
                          left: "70px",
                          top: "35px",
                        }}
                      >
                        {item.firstName} {item.lastName}
                      </p>
                      <p
                        style={{
                          textTransform: "uppercase",
                          color: "#78849E",
                          fontSize: "11px",
                          position: "absolute",
                          left: "70px",
                          top: "55px",
                        }}
                      >
                        {item.lead_Id}
                      </p>
                      <div
                        style={{
                          position: "absolute",
                          top: "100px",
                          left: "14px",
                        }}
                      >
                        <p>
                          Reports to: {item?.lead_allocated_by?.first_name}{" "}
                          {item?.lead_allocated_by?.last_name}
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
                      <p>Converted Lead</p>{" "}
                      <p
                        style={{
                          position: "absolute",
                          left: "40rem",
                          bottom: "18rem",
                        }}
                      >
                        0
                      </p>
                      <p>Open</p>{" "}
                      <p
                        style={{
                          position: "absolute",
                          left: "40rem",
                          bottom: "15.5rem",
                        }}
                      >
                        0
                      </p>
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
                );
              })
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

function AllocateModalShow(props) {
  return (
    <>
      <AllocateModal />
    </>
  );
}
export default AllocateModalShow;
