export { fetchAllLeads, fetchDesignation, fetchTeamMember } from "./leads";
export {
  fetchLeadDetailsSuccess,
  fetchLeadUpdateBody,
  fetchLeadDetails,
  createLead,
  storeLead,
  editLead,
  editCollaborators,
  editLead_broker,
  fetchLeadDetails_broker,
} from "./newLead";
export { fetchAllState, fetchAllCities } from "./address";
export {
  loginSuccess,
  login,
  logout,
  fetchUserDetails,
  fetchHierarchy,
  multiChannelData,
  headerName,
} from "./auth";
// export { home,activities } from './home'
// export { activities } from './home'
export { kpiDashboard } from "./kpiDashboard";
export {
  getAgentDetails,
  getMaturityDetails,
  getPlanTermination,
  getClaimsDetails,
  getCashLoan,
} from "./allPlanDetails";

export { getPlanDetails } from "./planDetailsAction";

export {
  fetchAllRenewals,
  fetchPaidRenewals,
  fetchUnPaidRenewals,
  fetchLapsedRenewals,
  fetchRenewalDetails,
} from "./renewals";
export {
  home,
  activities,
  getUserTreeAPI,
  todoGetData,
  getBusinessCardAPI,
  businessCardData,
} from "./home";
export { fetchHistory } from "./history";

export { fetchProduct, fetchPlanName } from "./product";

export { fetchAgentDetails, fetchBlogs, fetchCompany } from "./agentMicrosite";

export { fetchAdvisorList } from "./advisor";
