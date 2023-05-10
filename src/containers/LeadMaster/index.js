import React, { useEffect, useState } from "react";
import "./index.css";
import Tab from "../../components/Tab/Tab";
import LeadCards from "../../components/LeadCards/LeadCards";
import FloatButton from "../../components/FloatButton/FloatButton";
import * as actions from "../../store/actions/index";
import { Pagination, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { stoageGetter } from "../../helpers";
import { useHistory } from "react-router";

const LeadMaster = (props) => {
  //Set current page no of the page
  const [current, setcurrent] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();
  console.warn("current----------------->>>>>", current);
  // console.warn('props----------------->>>>>',props)

  dispatch(actions.headerName("Opportunities"));

  const [width, setWidth] = useState(window.innerWidth);
  const [skipVal, setSkipVal] = useState(0);
  const breakpoint = 620;

  useEffect(() => {
    setcurrent(1);
    console.warn("props----------------->>>>>", props);
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
  // console.warn("_leadCount ----------------->>>>>", _leadCount);
  //Loading leads data
  const leadDataLoading = useSelector(
    (state) => state.leads.fetch_allLeads_Loading
  );
  // lead count of the page
  const totalLeads = useSelector((state) => {
    return state.leads.count;
  });

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
    // let _decrement = 0
    // let _increment = 0

    // if(current > page){
    //     _decrement = skipVal - 15
    //     setSkipVal(_decrement)
    //     // getTodoData(_decrement)
    // }else if(current < page) {
    //     _increment = skipVal + 15
    //     setSkipVal(_increment)
    //     // getTodoData(_increment)
    // }

    setcurrent(page);
    console.log("page----------->>>>>", page);
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
  // console.warn("debug 001",leadsData,"debug 002",leadDataLoading)
  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        marginTop: width <= 620 ? (width <= 436 ? 15 : 75) : "",
      }}
    >
      <Tab tabMenu={tabMenu} header="Lead" current={current} />
      <div className="page-holder">
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
      <LeadCards leads={leadsData} leadDataLoading={leadDataLoading} />
    </div>
  );
};

export default LeadMaster;
