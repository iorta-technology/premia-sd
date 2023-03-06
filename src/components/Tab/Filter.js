import React, { createContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Radio, Select, Input , DatePicker, } from "antd";
import { Option } from "antd/lib/mentions";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/leads";
import { stoageGetter } from "../../helpers";

export function OffCanvasForGlobalFilter({ ...props }) {
  const dispatch = useDispatch();

  // searchtxt, lead_status, sorByFlter, sort_status, leadfilter, lead_disposition, leadType
  // console.log('========tabFilter============',props.filterdata.tabFilter)
  const [searchTextFilter, setSearchTextFilter] = useState("");
  const [leadStatusFilter, setLeadStatusFilter] = useState("");
  const [sortByFlter, setSortByFlter] = useState("");
  const [fromDateFilter, setFromDateFilter] = useState("");
  const [toDateFilter, setToDateFilter] = useState("");
  const [lobOpporFilt, setLobOpporFilt] = useState("");

  const [shortByStatus, setShortByStatus] = useState("created_date_old");
  const [sortBy, setSortBy] = useState("new_to_old");

  const [sortStatusFilter, setsortStatusFilter] = useState("");
  const [leadFilter, setleadFilter] = useState("");
  const [searchType, setSearchType] = useState("");
  const [leadDispositionFilter, setleadDispositionFilter] = useState("");
  const [leadTypeFilter, setleadTypeFilter] = useState("");

  // let sortByData = [
  //   {label:'Lead Created date - Newest to oldest',value:'new_to_old', status: 'created_date_old'},
  //   {label:'Lead Created date - Oldest to Newest',value:'old_to_new', status: 'created_date_new'},
  //   // {label:'Allocation Date - Newest to Oldest',value:'new_to_old', status: 'allocation_date_old'},
  //   // {label:'Allocation Date - Oldest to Newest',value:'old_to_new', status: 'allocation_date_new'},
  // ]
  let sortByData = [
    {label:'Lead Created date - Newest to oldest',status:'new_to_old',filtValue:'createddate', value: 'created_date_old'},
    {label:'Lead Created date - Oldest to Newest',status:'old_to_new',filtValue:'createddate', value: 'created_date_new'},
    {label:'Allocation Date - Newest to Oldest',status:'new_to_old',filtValue:'allocateddate', value: 'allocation_date_old'},
    {label:'Allocation Date - Oldest to Newest',status:'old_to_new',filtValue:'allocateddate', value: 'allocation_date_new'},
  ]

  const handleLobOpprtunity = (ev,data) => {
    setLobOpporFilt(ev);
  };
  const handleSearchType = (e) => {
    console.log("search type___________***", e.target.value);
    setSearchType(e.target.value)
    // setSortByFlter(e.target.value);
  };
  const handleNameSearch = (e) => {
    console.log("name search___________***", e.target.value);
    setSearchTextFilter(e.target.value);

    searchType === 'fname' ? setSearchTextFilter(e.target.value.toLowerCase()) : setSearchTextFilter(e.target.value);

  };
  const handleAgeGroup = (e) => {
    console.log("age grop___________***", e.target.value);
    setSortByFlter(e.target.value);
  };
  const handleIncomeGroup = (e) => {
    console.log("income grp___________***", e.target.value);
    setSortByFlter(e.target.value);
  };
  const handleMaritalStatus = (e) => {
    console.log("mertal status___________***", e.target.value);
    setSortByFlter(e.target.value);
  };
  const handleSearchBetween = (e) => {
    console.log("search between___________***", e.target.value);
    setSortByFlter(e.target.value);
  };
  const handleApplyButton = () => {
    const { id } = stoageGetter("user");
    let skip = 0;
    // let searchtxt = searchTextFilter;
    // let sorByFlter = sortByFlter;
    // let sort_status = shortByStatus
    let leadfilter = props.filterdata.tabFilter;

    let lead_disposition = "";
    let leadType = "";
    let lead_status = "";
    dispatch(
      actions.fetchDataAfterFilter(
        id,
        skip,
        searchTextFilter,
        lead_status,
        sortByFlter,
        sortBy,
        leadfilter,
        lead_disposition,
        leadType,
        searchType,
        // lobOpporFilt,
        // fromDateFilter,
        // toDateFilter,
      )
    );
    handleClose();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    setShow(props.show);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);


  const onChangeFromDate = (date, dateString) => {
    // console.warn('APOOOOO__DATE___',date)
    // console.warn('APOOOOO__DATE',dateString)
    
    setFromDateFilter(date);
    // setApptDateString(dateString);
    // const [fromDateFilter, setFromDateFilter] = useState("");
    // const [toDateFilter, setToDateFilter] = useState("");
  };

  const onChangeToDate = (date, dateString) => {
    // console.warn('APOOOOO__DATE___',date)
    // console.warn('APOOOOO__DATE',dateString)
    
    setToDateFilter(date);
    // setApptDateString(dateString);
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow} className="me-2">
        Filter
      </Button> */}
      <figure
        style={
          !(breakpoint <= width)
            ? {
                position: "fixed",
                bottom: "8%",
                zIndex: "99999",
                boxShadow: "0px 0px 4px 1px black",
                right: "5.5%",
                transform: "scale(0.9)",
              }
            : {}
        }
        className="round-cards43"
        onClick={handleShow}
        key={"filter"}
      >
        {" "}
        {breakpoint <= width ? (
          <figcaption className="card-caption">Filter </figcaption>
        ) : null}
      </figure>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        scroll={true}
        placement={breakpoint <= width ? "end" : "down"}
        style={{
          width: breakpoint <= width ? "30rem" : "100%",
          height: "auto",
          marginTop: "3.7rem",
          backgroundColor: "rgb(247, 247, 247)",
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Select Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* <div
            style={{
              width: "auto",
              height: "6rem",
              backgroundColor: "white",
              marginBottom: "0.5rem",
            }}
          >
            <h6
              style={{ fontWeight: "bold", padding: "10px", fontSize: "13px",marginLeft:5 }}
            >
              Sort by
            </h6>
            <Select
              onChange={(ev,data)=> handleLobOpprtunity(ev,data)}
              bordered={false}
              name="SortBy"
              value={shortByStatus}
              options={sortByData}
              style={{
                width: "20rem",
                marginLeft: "1rem",
                // marginTop: "1rem",
                borderBottom: "1px gray solid",
                opacity: "0.5",
              }}
              // defaultValue=""
            >
            </Select>
          </div> */}
          <div
            style={{
              width: "auto",
              // height: "10rem",
              backgroundColor: "white",
              marginBottom: "0.5rem",
              padding:10
            }}
          >
            <div>
              <p style={{ fontWeight: "bold", fontSize: "14px" ,marginBottom:5}}>
                LOB For Opportunity
              </p>
              {/* const [lobOpporFilt, setLobOpporFilt] = useState(""); */}
              <Select
                onChange={(ev,data)=> handleLobOpprtunity(ev,data)}
                bordered={true}
                name="SortBy"
                value={lobOpporFilt}
                options={sortByData}
                style={{
                  width: "100%",
                  // marginLeft: "1rem",
                  // borderBottom: "1px gray solid",
                  // opacity: "0.5",
                }}
              >
              </Select>
            </div>

            <div>
              <div>
                <p style={{ fontWeight: "bold",fontSize: "14px" ,marginTop:10,marginBottom:5}}>
                  From
                </p>
                <DatePicker
                  onChange={onChangeFromDate}
                  value={fromDateFilter}
                  format="MM/DD/YYYY"
                  style={{ width: "100%", }}
                />
              </div>

              <div>
                <p style={{ fontWeight: "bold", fontSize: "14px" ,marginTop:10,marginBottom:5}}>
                  To
                </p>
                <DatePicker
                  onChange={onChangeToDate}
                  value={toDateFilter}
                  format="MM/DD/YYYY"
                  style={{ width: "100%", }}
                />
              </div>
            </div>


            
           
          
          </div>
          <div
            style={{ width: "auto", height: "4rem", backgroundColor: "white" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  marginTop: "15px",
                  width: "6rem",
                  backgroundColor: "rgb(59, 55, 30)",
                  color: "#fff",
                }}
                onClick={handleApplyButton}
              >
                Apply
              </Button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function GlobalFilters(props) {
  console.log("props*******", props);
  return (
    <>
      <OffCanvasForGlobalFilter key={"0"} filterdata={props} />
    </>
  );
}

export default GlobalFilters;
