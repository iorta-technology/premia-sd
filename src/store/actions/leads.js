import * as actionTypes from "./actionTypes";
import axios from "../../axios-common";
import { getLeadFilter } from "../../helpers";
import axiosLms from "../../axios-lmsv2";
import axiosRequest from "../../axios-request/request.methods";
import supportLead from "../../components/LeadCards/supportLeads";
import supportLead_broker from "../../components/LeadCards_broker_flow/supportLeads"

// Fetch leads data
export const fetchAllLeadsStart = () => {
  return {
    type: actionTypes.FETCH_ALL_LEADS_START,
  };
};

export const fetchAllLeadsSuccess = (allLeads, count) => {
  console.log(allLeads,"broker flow leads");
  return {
    type: actionTypes.FETCH_ALL_LEADS_SUCCESS,
    allLeads: allLeads,
    count: count,
  };
};

export const fetchAllLeadsFail = (error) => {
  return {
    type: actionTypes.FETCH_ALL_LEADS_FAIL,
    error: error,
  };
};
export const fetchAllLeads_broker = (id, leads, pageNo) => {
  console.log(id);
  console.log("pageNo ===== ", pageNo);
  // const leadFilter = getLeadFilter(leads)
  let skipVal;
  pageNo === 1 ? (skipVal = 0) : (skipVal = (pageNo - 1) * 15);

  return async (dispatch) => {
    dispatch(fetchAllLeadsStart());
    let result = await axiosRequest.get(
      `user/getbrokerlist?userId=${id}&filter=${leads}&skip=${skipVal}`,
      { secure: true }
    );
    console.log("+++++++++ GET LEAD DATA ++++++++", result);
    if (result.data.length > 0) {
      dispatch(
        fetchAllLeadsSuccess(
          supportLead_broker.readSortDataFromAPI(
            leads,
            result === "No leads found" ? [] : result.data,
            this
          ),
          result.count[0]
        )
      );
    } else {
      dispatch(fetchAllLeadsFail());
    }
  };
};

export const fetchAllLeads = (id, leads, pageNo) => {
  console.log(id);
  console.log("pageNo ===== ", pageNo);
  // const leadFilter = getLeadFilter(leads)
  let skipVal;
  pageNo === 1 ? (skipVal = 0) : (skipVal = (pageNo - 1) * 15);

  return async (dispatch) => {
    dispatch(fetchAllLeadsStart());
    // return axios.get(`user/v2/getLead/${id}?leadfilter=${leadFilter}&skip=${skipVal}`)
    //     .then(res => {
    //         // console.log(res.data.errMsg[1][0].count)
    //         const response = res.data.errMsg
    //         const errorCode = res.data.errCode
    //         if(errorCode===-1){

    //             return dispatch(fetchAllLeadsSuccess(response[0],response[1][0].count))
    //         }else{
    //             throw response
    //         }
    //     })
    //     .catch(error => {
    //         return dispatch(fetchAllLeadsFail(error))
    //     })

    let result = await axiosRequest.get(
      `user/v2/getLead/${id}?leadfilter=${leads}&skip=${skipVal}`,
      { secure: true }
    );
    console.log("+++++++++ GET LEAD DATA ++++++++", result);
    if (result.length > 0) {
      // dispatch(fetchAllLeadsSuccess(result[0], result[1][0].count));
      // self.todayLeads.leadsData  = leadSupport.readSortDataFromAPI('all', res.data.errMsg[0], this);
      dispatch(
        fetchAllLeadsSuccess(
          supportLead.readSortDataFromAPI(
            leads,
            result === "No leads found" ? [] : result[0],
            this
          ),
          result[1][0].count
        )
      );
    } else {
      // fetchAllLeadsSuccess([])
      dispatch(fetchAllLeadsFail());
    }
  };
};

export const fetchDataAfterFilter = (
  id,
  skip,
  searchtxt,
  lead_status,
  sorByFlter,
  sort_status,
  leadfilter,
  lead_disposition,
  leadType,
  searchType,
  dateFilter
) => {
  console.warn("_______ dateFilter", dateFilter);
  return async (dispatch) => {
    dispatch(fetchAllLeadsStart());
    // &searchType=fname
    let url = `user/v2/getLead/${id}?skip=${skip}`;

    if (searchType.trim().length) url += `&searchType=${searchType}`;
    if (searchtxt.trim().length) {
      url += `&searchtxt=${searchtxt}`;
    }
    if (lead_status.trim().length) {
      url += `&lead_status=${lead_status}`;
    }
    if (sorByFlter.trim().length) {
      url += `&sorByFlter=${sorByFlter}`;
    }
    if (sort_status.trim().length) {
      url += `&sort_status=${sort_status}`;
    }
    if (leadfilter.trim().length) {
      url += `&leadfilter=${leadfilter}`;
    }
    if (lead_disposition.trim().length) {
      url += `&lead_disposition=${lead_disposition}`;
    }
    if (leadType.trim().length) {
      url += `&leadType=${leadType}`;
    }
    if (dateFilter.trim().length) url += `&inceptionDate=${dateFilter}`;

    let result = await axiosRequest.get(url);
    console.warn("_______Filter", result);
    if (result.length > 0) {
      dispatch(
        fetchAllLeadsSuccess(
          supportLead.readSortDataFromAPI(
            leadfilter,
            result === "No leads found" ? [] : result[0],
            this
          ),
          result[1][0].count
        )
      );
      // dispatch(fetchAllLeadsSuccess(result[0], result[1][0].count));
    } else {
      dispatch(fetchAllLeadsFail());
    }
  };
};

// Fetch Designation

export const fetchDesignationStart = () => {
  return {
    type: actionTypes.FETCH_DESIGNATION_START,
  };
};

export const fetchDesignationSuccess = (designations) => {
  return {
    type: actionTypes.FETCH_DESIGNATION_SUCCESS,
    designations: designations,
  };
};

export const fetchDesignationFail = (error) => {
  return {
    type: actionTypes.FETCH_DESIGNATION_FAIL,
    error: error,
  };
};

export const fetchDesignation = (channelCode) => {
  return (dispatch) => {
    dispatch(fetchDesignationStart());
    return axios
      .get(
        `admin/getDesignationMaster?userId=5b3b4cc28fa96d39870443e3&channelCode=5dbfdfa8e51cd5522249ba70`
      )
      .then((res) => {
        if (res.data.errCode === -1) {
          return dispatch(fetchDesignationSuccess(res.data.errMsg[0]));
        }
      })
      .catch((error) => {
        return dispatch(fetchDesignationFail(error.response.data.errors));
      });
  };
};

// Fetch Team Member

export const fetchTeamMemberStart = () => {
  return {
    type: actionTypes.FETCH_TEAM_MEMBER_START,
  };
};

export const fetchTeamMemberSuccess = (teamMember) => {
  return {
    type: actionTypes.FETCH_TEAM_MEMBER_SUCCESS,
    teamMember: teamMember,
  };
};

export const fetchTeamMemberFail = (error) => {
  return {
    type: actionTypes.FETCH_TEAM_MEMBER_FAIL,
    error: error,
  };
};

export const fetchTeamMember = (id) => {
  return (dispatch) => {
    dispatch(fetchTeamMemberStart());
    return axiosLms
      .get(`user_tree?userId=6153f1ec4735ef7f942926e3`)
      .then((res) => {
        console.log(res.data.errMsg);
        if (res.data.errCode === -1) {
          return dispatch(fetchTeamMemberSuccess());
        } else {
          throw res;
        }
      })
      .catch((error) => {
        console.log(error);
        return dispatch(fetchTeamMemberFail(error));
      });
  };
};

//----- ACTION FOR CHANGE TAB
export const updateTabOfDashboard = (globalTab) => {
  return {
    type: actionTypes.UPDATE_TAB_POSSITION,
    globalTab: globalTab,
  };
};

// Action for Allocate satus

export const updateAllocateOfOpportunities = (allocate) => {
  return {
    type: actionTypes.UPDATE_ALLCATION_TAB_POSSITION,
    allocateTab: allocate,
  };
};

// Action to store all checked leads

export const updateCheckAllocatedLead = (checkedLead) => {
  return {
    type: actionTypes.UPDATE_ALLCATED_CHECKED_LEADS,
    checkedLead: checkedLead,
  };
};
