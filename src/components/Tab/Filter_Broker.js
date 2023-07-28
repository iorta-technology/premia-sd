import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Radio, Select, Input } from "antd";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/leads";
import { stoageGetter, doSentenceCase } from "../../helpers";
import axiosRequest from "../../axios-request/request.methods";
import { useSelector } from "react-redux";
import { Row, Col, Avatar, Card, message, DatePicker } from "antd";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import moment from "moment";


export function OffCanvasForGlobalFilter({ ...props }) {
  const dispatch = useDispatch();

  //declaring varibles to stores the dates
  const [dateFilter, setDateFilter] = useState("");
  const [dateString, setDateString] = useState("");
  const [searchTextFilter, setSearchTextFilter] = useState("");
  const [sortByFlter, setSortByFlter] = useState("");

  const [shortByStatus, setShortByStatus] = useState("created_date_old");
  const [sortBy, setSortBy] = useState("new_to_old");

  const [leadFilter, setleadFilter] = useState("");
  const [searchType, setSearchType] = useState("");
  const [leadDispositionFilter, setleadDispositionFilter] = useState("");
  const [leadTypeFilter, setleadTypeFilter] = useState("");
  const [fieldLabelName, setFieldLabelName] = useState("Broker Name");
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [companyArray, setCompanyArray] = useState([]);

  // inception dates

  const [inceptionDates, setInceptionDates] = useState([]);

  const state = useSelector((state) => state?.login?.user);


  useEffect(() => {
    getCompanyDetails();
    getDates();
  }, []);



  //for fetching the inception dates using the API calls
  const getDates = async () => {
    let result = await axiosRequest.get(`user/getInceptionDates?userId=${state.id}`, {
      secure: true,
    });

    console.log(result)
    let _dates = result[0]?.inception_dates.filter(el =>{
      if(el) return el
    })
    // console.log('INCEPT _dates-------',_dates)
    setInceptionDates(_dates);
  }
  //disabling dates
  
  const disabledDate=(current)=>{
    let day = current.date();
    if (day < 10) day = '0' + day;
    let month = current.month() + 1;
    if (month < 10) month = '0' + month;
    let year = current.year();
    let date = month + '/' + day + '/' + year;
    return !(inceptionDates.includes(date));
  }




  const getCompanyDetails = async (lead_id) => {
    let result = await axiosRequest.get(`admin/company/companies`, {
      secure: true,
    });
    let _compArr = [];
    result.companies.map((el) => {
      let _data = { label: el.company_name, value: el._id };
      _compArr.push(_data);
    });
    setCompanyArray(_compArr);
  };

  //calling the function when date is changing
  const onChangeFromDate = (date, dateString) => {
    setDateFilter(date);
    setDateString(dateString);
    // setDateString(dateString);
  };


  const validateDateRange = (startDateStr, endDateStr) => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    if (startDate > endDate) {
      return false;
    }
    return true;
  }

  const handleSearchType = (e, label) => {
    setSearchType(e.target.value)
    setFieldLabelName(label)
    label === 'Broker Name' ? setShowCompanyDropdown(true) : setShowCompanyDropdown(false)
  };
  const handleNameSearch = (event) => {
    // console.log('event------->>',event)
    // console.log('data------->>',data)
    setSearchTextFilter(event);
    searchType === 'fname' ? setSearchTextFilter(event.toLowerCase()) :
      searchType === 'leadId' ? setSearchTextFilter(doSentenceCase(event.toLowerCase())) : setSearchTextFilter(event);
  };

  const handleApplyButton = () => {
    const { id } = stoageGetter("user");
    let skip = 0;
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
        dateString
      )
    );
    handleClose();
    setDateFilter('');
    setDateString('');
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {

    setShowCompanyDropdown(true)
    setFieldLabelName('Broker Name')
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
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>

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
              backgroundColor: "white",
              marginBottom: "0.5rem",
            }}
          >
            <h6
              style={{ fontWeight: "bold", padding: "10px", fontSize: "13px" }}
            >
              Search Type Selection
            </h6>
           
            <div style={{ marginLeft: "20px", marginTop: 15 }}>
              <p style={{ marginBottom: 5 }}>{fieldLabelName}</p>
            </div>
            
            {showCompanyDropdown ?

              <Select
                placeholder="Select"
                options={companyArray}
                style={{
                  width: "25rem",
                  marginLeft: "1rem",
                  marginBottom: "15px"
                }}
                onChange={(val,data) => handleNameSearch(val)}
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
                onChange={(val) => handleNameSearch(val.target.value)}
              />
            }
             <div style={{ marginLeft: "20px"}}>
              <p style={{ marginBottom: 5 }}>Appointment Date</p>
            </div>
             <div style={{ margin: "10px", marginLeft: "20px" }}>
              <DatePicker style={{
                  width: "25rem",
                  marginBottom: "15px"
                }}
                onChange={onChangeFromDate}
                value={dateFilter}
                disabledDate={disabledDate}
                dateRender={current => {
                  const style = {};
                  let day = current.date();
                  if (day < 10) day = '0' + day;
                  let month = current.month() + 1;
                  if (month < 10) month = '0' + month;
                  let year = current.year();
                  let date = month + '/' + day + '/' + year;
                  // console.log('INCEPPTTTTTT__DATE-----',date)
                  if (inceptionDates.includes(date)) {
                    style.color = 'white'
                    style.backgroundColor = '#00acc1';
                  }
                  return (
                    <div className="ant-calendar-date" style={style}>
                      {current.date()}
                    </div>
                  );
                }}
                format="MM/DD/YYYY"
                className='expt-picker'
              />
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
  return (
    <>
      <OffCanvasForGlobalFilter key={"0"} filterdata={props} />
    </>
  );
}

export default GlobalFilters;
