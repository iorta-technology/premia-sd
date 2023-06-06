/* eslint-disable import/no-anonymous-default-export */
import moment from "moment";

const CLEAR = {};
let self = null;

export default {
  readSortDataFromAPI: function (pageName, response, _this) {
    let memory = [];
    // console.warn('ONNNNN________response ', response);
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

    // console.log("length", resObj.company_id.risk_details.length> 0 )


    if(resObj.risk_details){
      dataStructure.lob_for_opportunity = !resObj?.risk_details[0]?.lob_for_opportunity ? '-' : resObj?.risk_details[0]?.lob_for_opportunity
      dataStructure.tagic_premium = !resObj?.risk_details[0]?.tagic_premium ? '-' : resObj?.risk_details[0]?.tagic_premium
      dataStructure.total_premium = !resObj?.risk_details[0]?.total_premium ? '-' : resObj?.risk_details[0]?.total_premium
      dataStructure.inception_date = !resObj?.risk_details[0]?.inception_date ? '-' : resObj?.risk_details[0]?.inception_date
    }

    dataStructure.userId = !resObj?.userId ? "-" : resObj?.userId;
    dataStructure.companyName = !resObj?.company_id?.company_name
      ? "-"
      : resObj?.company_id?.company_name;

    dataStructure.opportunityName = !resObj?.opportunity_name
      ? "-"
      : resObj?.opportunity_name;
    dataStructure.lead_Id = resObj.lead_Id;
    dataStructure.industryName = !resObj?.company_id?.industry_name
      ? "-"
      : resObj?.company_id?.industry_name;
    dataStructure.KDM_Name = !resObj?.company_id?.kdm_details[0]
      ?.decision_maker_name
      ? "-"
      : resObj?.company_id?.kdm_details[0]?.decision_maker_name;
    dataStructure.branch_Name = !resObj?.company_id?.kdm_details[0]?.branch
      ? "-"
      : resObj?.company_id?.kdm_details[0]?.branch;
    dataStructure.mobileNo = !resObj?.company_id?.kdm_details[0]?.primaryContact
      ? "-"
      : resObj?.company_id?.kdm_details[0]?.primaryContact;
    dataStructure.appointDate = !resObj?.appointmentDate
      ? "-"
      : moment(parseInt(resObj?.appointmentDate)).format("DD/MM/YYYY");
    dataStructure.location = !resObj?.company_id?.client_location
      ? "-"
      : resObj?.company_id?.client_location;

    dataStructure.weightage = !resObj?.weightage ? 0 : resObj?.weightage;
    dataStructure.id = resObj._id;

    //  dataStructure.personName = resObj.cust_name
    //  dataStructure.id = resObj._id;
    //  dataStructure.lead_Id = resObj.lead_Id;
    //  dataStructure.mobileNo = resObj.primaryMobile;
    //  dataStructure.email = resObj.email;
    //  dataStructure.status = resObj.leadStage;
    //  dataStructure.appointDate = !resObj?.appointmentDate ? '-' : moment(parseInt(resObj?.appointmentDate)).format('DD/MM/YYYY')
    //  dataStructure.allocationDate = moment(parseInt(resObj?.allocatedDate)).format('DD/MM/YYYY')

    //  dataStructure.inception = moment(parseInt(resObj.created_date)).format('DD/MM/YYYY')
    //  new Date(parseInt(resObj.created_date)).toLocaleDateString();
    if (resObj.hasOwnProperty("lead_allocated_by") === true) {
      if (resObj.lead_allocated_by !== null) {
        //  console.log("Im Here===>>",resObj.lead_allocated_by)
        if (
          resObj.hasOwnProperty("lead_allocated_by") &&
          Boolean(resObj.lead_allocated_by) &&
          typeof resObj.lead_allocated_by === "object"
        ) {
          dataStructure.allocBy =
            self.doSentenceCase(resObj.lead_allocated_by.first_name) +
            " " +
            self.doSentenceCase(resObj.lead_allocated_by.last_name);
        } else {
          dataStructure.allocBy = "-";
        }
      } else {
        dataStructure.allocBy = "-";
      }
    }

    // dataStructure.allocBy = resObj.leadCreatorId.first_name ? resObj.leadCreatorId.first_name : "-";
    if (resObj.hasOwnProperty("leadOwnerId") === true) {
      if (resObj.leadOwnerId !== null) {
        if (
          typeof resObj.leadOwnerId === "object" &&
          Object.keys(resObj.leadOwnerId).length > 0
        ) {
          dataStructure.allocTo =
            self.doSentenceCase(resObj.leadOwnerId.first_name) +
            " " +
            self.doSentenceCase(resObj.leadOwnerId.last_name);
        } else {
          dataStructure.allocTo = "-";
        }
      } else {
        dataStructure.allocTo = "-";
      }
    }
    //  console.warn('dataStructure=========',dataStructure)
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
