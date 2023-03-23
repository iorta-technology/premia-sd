import React, { createContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Radio, Select, Input } from "antd";
import { Option } from "antd/lib/mentions";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/leads";
import { stoageGetter } from "../../helpers";
import axiosRequest from "../../axios-request/request.methods";

export function OffCanvasForGlobalFilter({ ...props }) {
  const dispatch = useDispatch();

  // searchtxt, lead_status, sorByFlter, sort_status, leadfilter, lead_disposition, leadType
  // console.log('========PROPSSS***))))>>>>>>============',props)
  const [searchTextFilter, setSearchTextFilter] = useState("");
  const [leadStatusFilter, setLeadStatusFilter] = useState("");
  const [sortByFlter, setSortByFlter] = useState("");

  const [shortByStatus, setShortByStatus] = useState("created_date_old");
  const [sortBy, setSortBy] = useState("new_to_old");

  const [sortStatusFilter, setsortStatusFilter] = useState("");
  const [leadFilter, setleadFilter] = useState("");
  const [searchType, setSearchType] = useState("fname");
  const [leadDispositionFilter, setleadDispositionFilter] = useState("");
  const [leadTypeFilter, setleadTypeFilter] = useState("");
  const [fieldLabelName, setFieldLabelName] = useState("Client Name");
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [companyArray, setCompanyArray] = useState([]);
  // setShowCompanyDropdown(false)
  // useEffect(() => {
  //   // getCompanyDetails();
  //   console.log('========PROPSSS***))))>>>>>>============',props)
  //   // setShowCompanyDropdown(false)
  // }, [props]);

  let sortByData = [
    {label:'Lead Created date - Newest to oldest',status:'new_to_old',filtValue:'createddate', value: 'created_date_old'},
    {label:'Lead Created date - Oldest to Newest',status:'old_to_new',filtValue:'createddate', value: 'created_date_new'},
    {label:'Allocation Date - Newest to Oldest',status:'new_to_old',filtValue:'allocateddate', value: 'allocation_date_old'},
    {label:'Allocation Date - Oldest to Newest',status:'old_to_new',filtValue:'allocateddate', value: 'allocation_date_new'},
  ]

  const handleSortByStatus = (ev,data) => {
    // console.log("sort by type_____ev______***", ev);
    // console.log("sort by type______data_____***", data);
    setSortByFlter(data.filtValue);
    setSortBy(data.status)
    setShortByStatus(ev);
  };
  useEffect(() => {
    getCompanyDetails();
  }, []);

  const getCompanyDetails = async (lead_id) => {
    let result = await axiosRequest.get(`admin/company/companies`, {
      secure: true,
    });
    // console.warn('__++++++COMPANY++++++++ RESPPPP',result)
    let _compArr = [];
    result.companies.map((el) => {
      let _data = { label: el.company_name, value: el._id };
      _compArr.push(_data);
    });
    setCompanyArray(_compArr);

  };

  const handleSearchType = (e,label) => {
    console.log("search type___________***", e.target.value);
    setSearchType(e.target.value)
    setFieldLabelName(label)
    // setShowCompanyDropdown(true)
    // setSortByFlter(e.target.value);
    label === 'Company Name' ? setShowCompanyDropdown(true) : setShowCompanyDropdown(false)
  };
  const handleNameSearch = (event) => {
    console.log("name search___________***", event);
    setSearchTextFilter(event);

    searchType === 'fname' ? setSearchTextFilter(event.toLowerCase()) : setSearchTextFilter(event);

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
        searchType
      )
    );
    handleClose();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    // console.log('========PROPSSS99990000***))))>>>>>>============',props)
    setShowCompanyDropdown(false)
    setFieldLabelName('Client Name')
    setShow(true)
  };

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
            </Select>
          </div> */}
          <div
            style={{
              width: "auto",
              // height: "10rem",
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
              defaultValue="fname"
              // onChange={handleSearchType}
            >
              <Radio.Button value="fname" onChange={(val,data) => handleSearchType(val,'Client Name')} >
                Client Name
              </Radio.Button>
              <Radio.Button value="" onChange={(val,data) => handleSearchType(val,'Company Name')}>
              Company Name
              </Radio.Button>
              <Radio.Button value="leadId" onChange={(val,data) => handleSearchType(val,'Lead ID')}>
                Lead ID
              </Radio.Button>
            </Radio.Group>
            <div style={{ marginLeft: "20px",marginTop:15 }}>
              <p style={{marginBottom:5}}>{fieldLabelName}</p>
            </div>
            { showCompanyDropdown ?
             
                <Select
                  placeholder="Select"
                  options={companyArray}
                  // value={formItem.LOBForOpportunity}
                  style={{
                    width: "25rem",
                    marginLeft: "1rem",
                    marginBottom: "15px"
                  }}
                  onChange={(val) => handleNameSearch(val)}
                ></Select>
              :
              <Input
                type="text"
                style={{
                  width: "25rem",
                  marginLeft: "1rem",
                  marginBottom: "15px"
                }}
                placeholder={`Enter ${fieldLabelName}`}
                onChange={(val) =>handleNameSearch(val.target.value)}
              />
              
            }
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
                  border: "none",
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
