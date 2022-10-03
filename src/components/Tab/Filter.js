import React, { createContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Radio, Select, Input } from "antd";
import { Option } from "antd/lib/mentions";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/leads";
import { stoageGetter } from "../../helpers";

export function OffCanvasForGlobalFilter({ ...props }) {
  const dispatch = useDispatch();

  // searchtxt, lead_status, sorByFlter, sort_status, leadfilter, lead_disposition, leadType

  const [searchTextFilter, setSearchTextFilter] = useState("");
  const [leadStatusFilter, setLeadStatusFilter] = useState("");
  const [sortByFlter, setSortByFlter] = useState("");

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

  const handleSortByStatus = (ev,data) => {
    console.log("sort by type_____ev______***", ev);
    console.log("sort by type______data_____***", data);
    setSortByFlter(data.filtValue);
    setSortBy(data.status)
    setShortByStatus(ev);
  };
  const handleSearchType = (e) => {
    console.log("search type___________***", e.target.value);
    setSearchType(e.target.value)
    // setSortByFlter(e.target.value);
  };
  const handleNameSearch = (e) => {
    console.log("name search___________***", e.target.value);
    setSearchTextFilter(e.target.value);
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
    let leadfilter = "all";

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
        searchType
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
          <div
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
              onChange={(ev,data)=> handleSortByStatus(ev,data)}
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
              {/* <Option value="new_to_old">
                Lead Created Date - Newest to Oldest
              </Option>
              <Option value="old_to_new">
                Lead Created Date - Oldest to Newest
              </Option>
              <Option value="allo_new_to_old">
                Allocation Date - Newest to Oldest
              </Option>
              <Option value="allo_old_to_new">
                Allocation Date - Oldest to Newest
              </Option> */}
            </Select>
          </div>
          <div
            style={{
              width: "auto",
              height: "10rem",
              backgroundColor: "white",
              marginBottom: "0.5rem",
            }}
          >
            <h6
              style={{ fontWeight: "bold", padding: "10px", fontSize: "13px" }}
            >
              Search Type Selection
            </h6>
            <Radio.Group
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "1rem",
              }}
              // onChange={handleSearchType}
            >
              <Radio.Button value="fname" onChange={handleSearchType}>
                Name
              </Radio.Button>
              <Radio.Button value="primaryMobile" onChange={handleSearchType}>
                Mobile
              </Radio.Button>
              <Radio.Button value="leadId" onChange={handleSearchType}>
                Lead ID
              </Radio.Button>
            </Radio.Group>
            <div style={{ marginLeft: "20px" }}>
              <p>Name</p>
            </div>
            <Input
              type="text"
              style={{
                border: "none",
                borderBottom: "1px gray solid",
                opacity: "0.5",
                width: "25rem",
                marginLeft: "1rem",
                marginTop: "-10px",
              }}
              placeholder="Enter Name"
              size="large"
              onChange={handleNameSearch}
            />
          </div>
          <div
            style={{ width: "auto", height: "4rem", backgroundColor: "white" }}
          >
            {/* <h6 style={{ fontFamily: 'robotoregular', fontWeight: 'bold', padding: '10px', fontSize: '13px' }}>Filter By</h6>
            <div style={{ width: 'auto', marginTop: '0rem', marginLeft: '0.7rem' }}>
              <p style={{ fontFamily: 'robotoregular', fontWeight: 'bold', fontSize: '13px' }}>Age Group</p>
              <Select bordered={false}
                style={{ width: '6rem', borderBottom: '1px gray solid', opacity: '0.5' }}
                name='Age Group'
                value={''}
                onChange={handleAgeGroup}
              >
                <Option value='18-to-28'>18 to 28</Option>
                <Option value='29-to-35'>29 to 35</Option>
                <Option value='36-to-45'>36 to 45</Option>
                <Option value='56-and-above'>56 and above</Option>
              </Select>
            </div> */}
            {/* <div style={{ width: 'auto', marginLeft: '10rem', marginTop: '-4.3rem' }}>
              <p style={{ fontFamily: 'robotoregular', fontWeight: 'bold', fontSize: '13px' }}>Income Group</p>
              <Select bordered={false}
                style={{ width: '6rem', borderBottom: '1px gray solid', opacity: '0.5' }}
                value={''}
                name='Income Group'
                onChange={handleIncomeGroup}

              >
                <Option value='less-to-2.5'>Less than 2.5 Lacs</Option>
                <Option value='2.5-to-3.9'>2.5 Lacs to 3.9 Lacs</Option>
                <Option value='3.5-to-4.99'>3.5 Lacs to 4.99 Lacs</Option>
                <Option value='5-to-7.99'>5 Lacs to 7.99 Lacs</Option>
                <Option value='8-to-9.9'>8 Lacs to 9.9 Lacs</Option>
                <Option vlue='10-to-14.99'>More than 10 Lacs, Less than 14.99 Lacs</Option>
                <Option value='15-to-20'>More than 15 Lacs, Less than 20 Lacs</Option>
                <Option value='20-to-more'>More than 20 Lacs</Option>
              </Select>
            </div> */}
            {/* <div style={{ widht: 'auto', marginLeft: '19rem', position: 'relative', top: '-4.3rem' }}>
              <p style={{ fontFamily: 'robotoregular', fontWeight: 'bold', fontSize: '13px' }}>Marital Status</p>
              <Select bordered={false}
                style={{ width: '6rem', borderBottom: '1px gray solid', opacity: '0.5' }}
                name='Marital Status'
                value={''}
                onChange={handleMaritalStatus}
              >
                <Option value='Single'>Single</Option>
                <Option value='Married'>Married, No Kids</Option>
                <Option value='With-kids'>With Kids</Option>
              </Select>
            </div> */}
            {/* <div style={{ width: 'auto', height: '6rem', backgroundColor: 'white', marginTop: '-2.5rem' }}>

              <h6 style={{ fontFamily: 'robotoregular', fontWeight: 'bold', padding: '10px', fontSize: '13px' }}>Search Between</h6>
              <Radio.Group
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}
                onChange={handleSearchBetween}
              >
                <Radio.Button value='Name'>MTD</Radio.Button>
                <Radio.Button value='Mobile'>YTD</Radio.Button>
                <Radio.Button value='Lead'>Custom</Radio.Button>
              </Radio.Group>

            </div> */}

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
