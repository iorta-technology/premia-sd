import api from "../services/Axios";

export const getTeamMainTabApi = (id) => {
  return api
    .get(`getleads_team/62fcdbfc5fb1dc8913ab59f1?skip=0&leadfilter=all`)
    .then((res) => res)
    .catch((err) => err);
};

export const getFirstDropdownValueApi = (userId) => {
  console.log("id", userId);
  return api
    .get(`user_tree?userId=${userId}`)
    .then((res) => res)
    .catch((err) => err);
};

export const getSecondDropdownValueApi = () => {
  return api
    .get(
      `https://sdrestnode.iorta.in/secure/sd/user/getteamAuto/5df77d17009e273b39cae811?sortBy=604800000&skip=0`
    )
    .then((res) => res)
    .catch((err) => err);
};

export const getFormByIdApi = ({ id }) => {
  return api
    .get(
      `https://sdrestnode.iorta.in/secure/sd/user/v2/getLead/${id}?leadfilter=all&skip=0`
    )
    .then((res) => res)
    .catch((err) => err);
};
export const getOpenTabApi = (id, leadtyp) => {
  console.log(
    "**********************************in******************************************in",
    leadtyp
  );
  return api
    .get(`getleads_team/${id}?skip=0&leadfilter=${leadtyp}`)
    .then((res) => res)
    .catch((err) => err);
};
export const getFortodayTabApi = (userId) => {
  return api
    .get(`getleads_team/62fcdbfc5fb1dc8913ab59f1?skip=0&leadfilter=today`)
    .then((res) => res)
    .catch((err) => err);
};
export const getFailedTabApi = (userId) => {
  return api
    .get(`getleads_team/62fcdbfc5fb1dc8913ab59f1?skip=0&leadfilter=failed`)
    .then((res) => res)
    .catch((err) => err);
};

// export const getAshrafFromAgentApi = () => {
//     return api.get(`https://sdrestnode.iorta.in/secure/sd/user/v2/getLead/5df782ab2b5ffa6c72ae1a25?leadfilter=all&skip=0`)
//         .then(res => res).catch(err => err)
// }

// export const getTcnFromSalesManagerApi = () => {
//     return api.get(`https://sdrestnode.iorta.in/secure/sd/user/v2/getLead/5e147dd2f14d8908c32ce217?leadfilter=all&skip=0`)
//         .then(res => res).catch(err => err)
// }

// export const getImranFromSalesManagerApi = () => {
//     return api.get(`https://sdrestnode.iorta.in/secure/sd/user/v2/getLead/5df781522b5ffa6c72ae1a1d?leadfilter=all&skip=0`)
//         .then(res => res).catch(err => err)
// }

// export const getUsamaFromBranchManagerApi = () => {
//     return api.get(`https://sdrestnode.iorta.in/secure/sd/user/v2/getLead/5df780022b5ffa6c72ae1a15?leadfilter=all&skip=0`)
//         .then(res => res).catch(err => err)
// }

// export const getAbhishekFromRegionalManagerApi = () => {
//     return api.get(`https://sdrestnode.iorta.in/secure/sd/user/v2/getLead/5df77e6a2b5ffa6c72ae1a0e?leadfilter=all&skip=0`)
//         .then(res => res).catch(err => err)
// }
