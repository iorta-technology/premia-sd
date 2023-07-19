/* eslint-disable import/no-anonymous-default-export */
import moment from "moment";

const CLEAR = {};
let self = null;

export default {
  readSortDataFromAPI: function (pageName, response, _this) {
    let memory = [];
    console.log('ONNNNN________response ', response);
    self = _this;
    try {
      for (let i = 0; i < response.length; i++) {
        memory.push(this.arrangeData(response[i]));
      }
      return memory;
    } catch (err) {
      console.log("ERROR ", err);
    }
  },

  completeAddress(line_01, line_02, line_03, pinCode) {
    //  (pinCode == null ? pinCode = "" : pinCode);
    return line_01 + " " + line_02 + " " + line_03 + "-" + pinCode;
  },

  arrangeData(resObj) {
    let self = this;
    console.log("Response :   ", resObj);
    let dataStructure = {};
    dataStructure.wallet_size=resObj.producer.wallet_size;
    dataStructure.producer_name=resObj.producer.producer_name;
    dataStructure._id=resObj._id;
    dataStructure.city=resObj.producer.city;
    dataStructure.name=resObj.userId.first_name + resObj.userId.last_name;
    dataStructure.appointment_on=resObj.appointementDate===undefined?'-':resObj.appointementDate;
    dataStructure.lob=resObj.lob_for_opportunity===undefined?'-':resObj.lob_for_opportunity
    dataStructure.raw_producer_name=resObj.producer.raw_producer_name;
    dataStructure.utilization=resObj.utilization===undefined?'-':resObj.utilization;
    dataStructure.brokerId=resObj._id;

    // console.log("length", resObj.company_id.risk_details.length> 0 )
    // let _inceptDate = ''
    // if(resObj.risk_details){
    //   dataStructure.lob_for_opportunity = !resObj?.risk_details[0]?.lob_for_opportunity ? '-' : resObj?.risk_details[0]?.lob_for_opportunity
    //   dataStructure.tagic_premium = !resObj?.risk_details[0]?.tagic_premium ? '-' : resObj?.risk_details[0]?.tagic_premium
    //   dataStructure.total_premium = !resObj?.risk_details[0]?.total_premium ? '-' : resObj?.risk_details[0]?.total_premium
    //   let redable_date = !resObj?.risk_details[0]?.inception_date ? '-' :  new Date(resObj?.risk_details[0]?.inception_date).toLocaleString('en-US', { timeZone: 'UTC' }).split(',')
    //   _inceptDate = redable_date[0]
    //   dataStructure.inception_date = _inceptDate
    // }
    // dataStructure.userId = !resObj?.userId ? "-" : resObj?.userId;
    // dataStructure.companyName = !resObj?.company_id?.raw_company_name
    //   ? "-"
    //   : resObj?.company_id?.raw_company_name;

    // dataStructure.opportunityName = !resObj?.opportunity_name
    //   ? "-"
    //   : resObj?.opportunity_name;
    // dataStructure.lead_Id = resObj.lead_Id;
    // dataStructure.industryName = !resObj?.company_id?.industry_name
    //   ? "-"
    //   : resObj?.company_id?.industry_name;
    // dataStructure.KDM_Name = !resObj?.company_id?.kdm_details[0]
    //   ?.decision_maker_name
    //   ? "-"
    //   : resObj?.company_id?.kdm_details[0]?.decision_maker_name;
    // dataStructure.branch_Name = !resObj?.company_id?.kdm_details[0]?.branch
    //   ? "-"
    //   : resObj?.company_id?.kdm_details[0]?.branch;
    // dataStructure.mobileNo = !resObj?.company_id?.kdm_details[0]?.primaryContact
    //   ? "-"
    //   : resObj?.company_id?.kdm_details[0]?.primaryContact;
    // dataStructure.appointDate = !resObj?.appointmentDate
    //   ? "-"
    //   : moment(parseInt(resObj?.appointmentDate)).format("DD/MM/YYYY");
    // dataStructure.location = !resObj?.company_id?.client_location
    //   ? "-"
    //   : resObj?.company_id?.client_location;

    // dataStructure.weightage = !resObj?.weightage ? 0 : resObj?.weightage;
    // dataStructure.id = resObj._id;
    // if (resObj.hasOwnProperty("lead_allocated_by") === true) {
    //   if (resObj.lead_allocated_by !== null) {
    //     if (
    //       resObj.hasOwnProperty("lead_allocated_by") &&
    //       Boolean(resObj.lead_allocated_by) &&
    //       typeof resObj.lead_allocated_by === "object"
    //     ) {
    //       dataStructure.allocBy =
    //         self.doSentenceCase(resObj.lead_allocated_by.first_name) +
    //         " " +
    //         self.doSentenceCase(resObj.lead_allocated_by.last_name);
    //     } else {
    //       dataStructure.allocBy = "-";
    //     }
    //   } else {
    //     dataStructure.allocBy = "-";
    //   }
    // }

    // if (resObj.hasOwnProperty("leadOwnerId") === true) {
    //   if (resObj.leadOwnerId !== null) {
    //     if (
    //       typeof resObj.leadOwnerId === "object" &&
    //       Object.keys(resObj.leadOwnerId).length > 0
    //     ) {
    //       dataStructure.allocTo =
    //         self.doSentenceCase(resObj.leadOwnerId.first_name) +
    //         " " +
    //         self.doSentenceCase(resObj.leadOwnerId.last_name);
    //     } else {
    //       dataStructure.allocTo = "-";
    //     }
    //   } else {
    //     dataStructure.allocTo = "-";
    //   }
    // }
    return dataStructure;
  },

  assignNewProperty(OBJ, status) {
    let latestOBJ;
    latestOBJ = Object.assign({ status: status }, OBJ);
    return latestOBJ;
  },

  agentdate(response, self) {
    let agent = {
      ownerId: self.$store.getters.getresendOtp._id,
      ownerName: self.$store.getters.getresendOtp.agent_firstname,
    };

    let allocateBy = null;

    if (agent.ownerId === response.leadId.leadCreatorId) {
      allocateBy = agent.ownerName;
    }
    let obj = {};
    obj.allocateBy = allocateBy;
    return obj;
  },
  doSentenceCase(strText) {
    try {
      var _str = strText.toLowerCase();
      var collection = _str.split(" ");
      var modifyStrigs = [];
      _str = "";
      for (var i = 0; i < collection.length; i++) {
        modifyStrigs[i] =
          collection[i].charAt(0).toUpperCase() + collection[i].slice(1);
        _str = _str + modifyStrigs[i] + " ";
      }
      return _str.trim();
    } catch (err) {}
  },
};
