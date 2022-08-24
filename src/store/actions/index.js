export {
    fetchAllLeads,
    fetchDesignation,
    fetchTeamMember
} from './leads'
export {
    fetchLeadDetails,
    createLead,
    storeLead,
    editLead,
}from './newLead'
export {
    fetchAllState,
    fetchAllCities,
} from './address'
export {
    login,
    logout,
    fetchUserDetails,
    fetchHierarchy
} from './auth'
// export { home,activities } from './home'
// export { activities } from './home'
export { kpiDashboard } from './kpiDashboard'
export {fetchAllRenewals,fetchPaidRenewals,fetchUnPaidRenewals, fetchLapsedRenewals,fetchRenewalDetails} from './renewals'
export { 
    home,activities ,getUserTreeAPI
} from './home'
export {
    fetchHistory
}from './history'

export {
    fetchProduct,
    fetchPlanName
}from './product'

export {
    fetchAgentDetails,
    fetchBlogs,
    fetchCompany,
}from './agentMicrosite'

export {
    fetchAdvisorList
}from './advisor'