import React, { useEffect, useState } from "react";
import "./index.css";
import Tab from "../../components/Tab/Tab";
import LeadCards from "../../components/LeadCards_broker_flow/LeadCards";
import FloatButton from "../../components/FloatButton/FloatButton";
import * as actions from "../../store/actions/index";
import { Pagination, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { stoageGetter } from "../../helpers";
import { useHistory } from "react-router";
import axiosRequest from "../../axios-request/request.methods";

const LeadMaster = (props) => {
  //Set current page no of the page
  const [current, setcurrent] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();

  // console.warn("current----------------->>>>>", current);
  // console.warn("props----------------->>>>>", props);

  dispatch(actions.headerName("Opportunities"));

  const [width, setWidth] = useState(window.innerWidth);
  const [skipVal, setSkipVal] = useState(0);
  const breakpoint = 620;
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setcurrent(1);
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
  // const loginState = useSelector((state) => state.login);
  // const { user } = loginState;

  // console.log(leadsData,"leads data for broker flow");
  const _leadCount = useSelector((state) => state?.home?.home_obj);
  console.log("_leadCount ----------------->>>>>", _leadCount);
  //Loading leads data
  const leadDataLoading = useSelector(
    (state) => state.leads.fetch_allLeads_Loading
  );
  // lead count of the page
  const totalLeads = useSelector((state) => state?.leads?.count);
  // console.log(totalLeads,"total leads-------------------------<");
  // const _storeee = useSelector((state) => state );
  console.log("totalLeads ----------------->>>>>", totalLeads);
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
    console.log("page----------->>>>>", page);
  };
  const tabMenu = [
    {
      id: "all_broker",
      value: "All" + " (" + _leadCount.brokerall + ")",
    },
    {
      id: "fortoday_broker",
      value: "For Today" + " (" + _leadCount.brokertoday + ")",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        marginTop: width <= 620 ? (width <= 436 ? 15 : 75) : "",
      }}
    >
      {/* <Tab tabMenu={tabMenu} header="Broker Listing" current={current} /> */}
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
