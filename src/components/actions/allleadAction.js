import api from "../services/Axios"


export const getTeamMainTabApi = () => {
    // const header = {
    //     headers: { "Authorization" : `Bearer ${token}`}
    // }
    return api.get(`user/getleads_team/AG1ZVGTL?leadfilter=all&skip=0`)
        .then(res => res).catch(err => err)

}

export const getFirstDropdownValueApi = () => {
    return api.get(`admin/getHierarchy?userId=5b3b4cc28fa96d39870443e3&channelCode=5dbfdfa8e51cd5522249ba70&skip=0&hierarchy_type=1`)
        .then(res => res).catch(err => err)
}

export const getSecondDropdownValueApi = () => {
    return api.get(`https://sdrestnode.iorta.in/secure/sd/user/getteamAuto/5df77d17009e273b39cae811?sortBy=604800000&skip=0`)
        .then(res => res).catch(err => err)
}

export const getFormByIdApi = ({id}) => {
    return api.get(`https://sdrestnode.iorta.in/secure/sd/user/v2/getLead/${id}?leadfilter=all&skip=0`)
        .then(res => res).catch(err => err)
}

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