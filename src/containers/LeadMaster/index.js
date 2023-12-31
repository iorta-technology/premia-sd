import React, { useEffect, useState } from "react";
import "./index.css";
import Tab from "../../components/Tab/Tab";
import LeadCards from "../../components/LeadCards/LeadCards";
import FloatButton from "../../components/FloatButton/FloatButton";
import * as actions from "../../store/actions/index";
import { Pagination, Button , Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { stoageGetter } from "../../helpers";
import { useHistory } from "react-router";

const LeadMaster = (props) => {
  //Set current page no of the page
  const [current, setcurrent] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();
  // console.warn("current----------------->>>>>", current);
  // console.warn('props----------------->>>>>',props)

  dispatch(actions.headerName("Opportunities"));

  const [width, setWidth] = useState(window.innerWidth);
  const [skipVal, setSkipVal] = useState(0);
  const breakpoint = 620;

  useEffect(() => {
    setcurrent(1);
    // console.warn("props----------------->>>>>", props);
  }, [props]);

  useEffect(() => {
    // const { id } = stoageGetter("user");
    // dispatch(actions.fetchAllLeads(id, "", current));

    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [dispatch, current, width]);

  //Accessing LeadCard data  from store
  const leadsData = useSelector((state) => state.leads.allLeads);
  const _leadCount = useSelector((state) => state?.home?.home_obj);
  console.log("_leadCount ----------------->>>>>", _leadCount);
  console.log("leadsData ----------------->>>>>", leadsData);
  //Loading leads data
  const leadDataLoading = useSelector(
    (state) => state.leads.fetch_allLeads_Loading
  );
  // lead count of the page
  const totalLeads = useSelector((state) => state?.leads?.count );
  // const _storeee = useSelector((state) => state );
  console.warn("totalLeads ----------------->>>>>", totalLeads);
  // console.warn("_storeee ----------------->>>>>", _storeee);

  //Pagination numbers function
  function itemRender(cur, type, originalElement) {
    const onPrev = () => {
      setcurrent(current - 1);
    };
    const onNext = () => {
      setcurrent(current + 1);
    };

    if (type === "prev") {
      return (
        <a current={current} onClick={onPrev} style={{ color: "#545454" }}>
          Prev
        </a>
      );
    }
    if (type === "next") {
      // console.log(current)
      return (
        <a current={current} onClick={onNext} style={{ color: "#545454" }}>
          Next
        </a>
      );
    }
    return originalElement;
  }

  const handlePageClick = (page) => {
    setcurrent(page);
    // console.log("page----------->>>>>", page);
  };
  const tabMenu = [
    {
      id: "all",
      value: "All" + " (" + _leadCount.all_lead + ")",
    },
    {
      id: "fortoday",
      value: "For Today" + " (" + _leadCount.today + ")",
    },
    {
      id: "open",
      value: "Open" + " (" + _leadCount.open_lead + ")",
    },
    {
      id: "converted",
      value: "Converted" + " (" + _leadCount.converted + ")",
    },
    {
      id: "failed",
      value: "Failed" + " (" + _leadCount.failed + ")",
    },
  ];
  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        marginTop: width <= 620 ? (width <= 436 ? 15 : 75) : "",
      }}
    >
      <Tab tabMenu={tabMenu} header="Lead" current={current} />
      <>
        <div className="page-holder-lead">
          <Row>
            <b style={{color:'#e46a25'}}>{`Showing ${current === 1 ? current : ((current-1)*15 + 1)} to ${current === 1 ? '15' : (current*15 > totalLeads ? totalLeads : current*15)}`}{' '}<b style={{color:'#3c3d3d'}}>{`out of ${totalLeads} records`}</b></b>
          </Row>

          <Pagination
            responsive
            showSizeChanger={false}
            current={current}
            onChange={handlePageClick}
            total={totalLeads}
            defaultPageSize={15}
            itemRender={itemRender}
          />

        </div>
      </>
      <LeadCards leads={leadsData} leadDataLoading={leadDataLoading} />
    </div>
  );
};

export default LeadMaster;
