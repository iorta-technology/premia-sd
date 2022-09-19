/* eslint-disable import/no-anonymous-default-export */
import moment from 'moment'

 const CLEAR = {};
 let self = null;
 
 
 export default {
     readSortDataFromAPI: function(pageName, response, _this) {
         // let _this = this;
         // _this = Object.assign(this.dataFields(), _this);
         // console.log('ONNNNN ', _this.d);
        //  console.warn('ONNNNN________response ', response);
 
         let memory = [];
         let tempOBJ = {};
 
         self = _this;
         try {
             for (let i = 0; i < response.length; i++) {
                 if (pageName === 'open') {
                     memory.push(Object.assign({ status: 'Open' }, this.arrangeData(response[i])));
                 } else if (pageName === 'fortoday') {
 
                     /**
                      * Here's the code is used to handle Appointment data with lead data and combined both
                      * so we can used arrange data  function which is centeralized
                      */
 
                     let _objLead = JSON.parse(JSON.stringify(response[i])); // making a copy without refrence
                     // let wholeData = JSON.parse(JSON.stringify(Object.assign({ _appointmentId: response[i]._id }, response[i])));
 
                     // delete wholeData._id;
                     // delete wholeData.leadId;
                     // Delete extra property which is not used
                     // wholeData = Object.assign(_objLead, wholeData);
 
                     // let obj = this.agentdate(response[i], _this);
                     // console.log('Access through function ', obj);
                     // wholeData = Object.assign(obj, wholeData);
 
                     // Regex 
 
                     var regex = new RegExp('^(wrongnumber|invalid|notinterested|nonserviceloc|noteligible)$');
 
 
                     if (regex.test(_objLead.leadDisposition)) {
                         tempOBJ = {};
                         tempOBJ = this.assignNewProperty(this.arrangeData(_objLead), 'Failed');
                     } else if (_objLead.leadStatus === "converted" || _objLead.appointmentdisPosition ==="leadconverted") {
                         tempOBJ = {};
                         tempOBJ = this.assignNewProperty(this.arrangeData(_objLead), 'Converted');
                     } else {
                         tempOBJ = {};
                         tempOBJ = this.assignNewProperty(this.arrangeData(_objLead), 'Open');
                     }
 
                     memory.push(tempOBJ);
 
                 } else if (pageName === 'converted') {
 
                     memory.push(this.assignNewProperty(this.arrangeData(response[i]), 'Converted'));
 
                 } else if (pageName === 'failed') {
 
                     memory.push(this.assignNewProperty(this.arrangeData(response[i]), 'Failed'));
 
                 } else if (pageName === 'all') {
 
                     var regex = new RegExp('^(wrongnumber|invalid|notinterested|nonserviceloc|noteligible|metFollowupNotIntrested)$');
 
                     if (regex.test(response[i].leadDisposition  ) || regex.test(response[i].appointmentdisPosition )) {
                         // console.log('All Response', response[i])
                         tempOBJ = {};
                         tempOBJ = this.assignNewProperty(this.arrangeData(response[i]), 'Failed');
                     } else if (response[i].leadStatus === "converted" || response[i].appointmentdisPosition ==="leadconverted") {
 
                         tempOBJ = {};
                         tempOBJ = this.assignNewProperty(this.arrangeData(response[i]), 'Converted');
                         if ('productId' in response[i]) {
                             // tempOBJ = Object.assign({ planType: response[i].productId.productName || "" }, tempOBJ);
                             tempOBJ = Object.assign({ planType: "" }, tempOBJ);
                         }
 
                     } else if ('proposalStatus' in response[i]) {
 
                         if (response[i].leadStatus.proposalStatus === "draft") {
                             tempOBJ = {};
                             tempOBJ = this.assignNewProperty(this.arrangeData(response[i]), 'Converted');
                         }
                     } else {
                         // handle Faild when lead status is contact and Disposition is appointment then it find appointment dispositions
                         var _ap_regex = new RegExp('^(apptDenies|phoneNtAvailble|Wrong_Number)');
                         if (response[i].hasOwnProperty('appointmentdisPosition') && _ap_regex.test(response[i].appointmentdisPosition)) {
                             tempOBJ = {};
                             tempOBJ = this.assignNewProperty(this.arrangeData(response[i]), 'Failed');
                         } else {
                             tempOBJ = {};
                             tempOBJ = this.assignNewProperty(this.arrangeData(response[i]), 'Open');
 
 
                         }
                     }
                    //  console.warn('LEADDDDDDDDDDD______OBJJJ__',tempOBJ)
                     memory.push(tempOBJ);
                     
                 }
             }
 
         } catch (err) {
             console.log(err);
         }
        //  console.warn('LEADDDDDDDDDDD________',memory)
         return memory;
     },
 
     fullName(fName, lName) {
         return fName + ' ' + lName;
     },
 
     completeAddress(line_01, line_02, line_03, pinCode) {
        //  (pinCode == null ? pinCode = "" : pinCode);
         return line_01 + ' ' + line_02 + ' ' + line_03 + '-' + pinCode;
     },
 
     arrangeData(resObj){
        let self = this
        //  console.log('Response :   ', resObj);
         let dataStructure = {};
         dataStructure.personName = this.fullName(resObj.firstName, resObj.lastName);
         dataStructure.id = resObj._id;
         dataStructure.lead_Id = resObj.lead_Id;
         dataStructure.mobileNo = resObj.primaryMobile;
         dataStructure.email = resObj.email;
         let _address_ = resObj.address[0];
         dataStructure.address = this.completeAddress(_address_.line1, _address_.line2, _address_.line3, resObj.pincode);
         dataStructure.allocationDate = moment(parseInt(resObj.created_date)).format('MM/DD/YYYY')
        //  new Date(parseInt(resObj.created_date)).toLocaleDateString();
 
     //    console.log("RAW STSTSTS =>", resObj.appointmentId.start_date); 
     //    console.log("MOEMNT STSTSTS =>", moment(resObj.appointmentId.start_date).format('MM/DD/YYYY') );
         // dataStructure.appointDate = 'start_date' in resObj ? new Date(parseInt(resObj.start_date)).toLocaleDateString() : "-";
         if (resObj.hasOwnProperty('start_time')){
 
             dataStructure.appointDate = moment(parseInt(resObj.start_date)).format('MM/DD/YYYY')
            //  new Date(parseInt(resObj.start_date)).toLocaleDateString();
 
         } else if ((resObj.hasOwnProperty('appointmentId') && Boolean(resObj.appointmentId) )|| (resObj.hasOwnProperty('lead_appointment') && Boolean(resObj.lead_appointment))) {
             let event_date = resObj.appointmentId.start_date == undefined ? "-" : resObj.appointmentId.start_date 
             //  || resObj.lead_appointment.start_date == undefined ? "-" :  resObj.lead_appointment.start_date
             // dataStructure.appointDate = new Date(parseInt(event_date)).toLocaleDateString();
             // console.log("event date ->",event_date );
             if(event_date == '-'){
                 dataStructure.appointDate = "-"
             }else{
                 dataStructure.appointDate = moment(resObj.appointmentId.start_date).format('MM/DD/YYYY')
             }
           
 
             // console.log("dataStructure.appointDate ELSE-IF", dataStructure.appointDate);
         } else {
             dataStructure.appointDate = "-";
             // console.log("dataStructure.appointDate ELSE", dataStructure.appointDate);
         }
 
        
 
         
         dataStructure.inception = moment(parseInt(resObj.created_date)).format('MM/DD/YYYY')
        //  new Date(parseInt(resObj.created_date)).toLocaleDateString();
         if(resObj.hasOwnProperty('lead_allocated_by') === true){
             
             if(resObj.lead_allocated_by !== null ){
                 console.log("Im Here===>>",resObj.lead_allocated_by)
                 if (resObj.hasOwnProperty('lead_allocated_by') && Boolean(resObj.lead_allocated_by) && typeof resObj.lead_allocated_by === 'object') {
                     dataStructure.allocBy = self.doSentenceCase(resObj.lead_allocated_by.first_name) + ' ' + self.doSentenceCase(resObj.lead_allocated_by.last_name)
                     
                 } else {
                     dataStructure.allocBy = "-";
                 }
             }else{
                 dataStructure.allocBy = "-";      
             }
         }
 
         // dataStructure.allocBy = resObj.leadCreatorId.first_name ? resObj.leadCreatorId.first_name : "-";
         if(resObj.hasOwnProperty('leadOwnerId') === true){
             if(resObj.leadOwnerId !== null ){
                 if (typeof resObj.leadOwnerId === 'object' && Object.keys(resObj.leadOwnerId).length > 0) {
                     dataStructure.allocTo = self.doSentenceCase(resObj.leadOwnerId.first_name) + ' ' + self.doSentenceCase(resObj.leadOwnerId.last_name);
                 } else {
                     dataStructure.allocTo = "-";
                 }
             }else{
                 dataStructure.allocTo = "-";      
             }
         }
         console.warn('dataStructure=========',dataStructure)
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
             ownerName: self.$store.getters.getresendOtp.agent_firstname
         }
 
         let allocateBy = null;
 
         if (agent.ownerId === response.leadId.leadCreatorId) {
             allocateBy = agent.ownerName;
 
         }
         let obj = {};
         obj.allocateBy = allocateBy
         return obj;
     },
     doSentenceCase(strText) {
        try {
            var _str = strText.toLowerCase();
            var collection = _str.split(" ");
            var modifyStrigs = [];
            _str = '';
            for (var i = 0; i < collection.length; i++) {
                modifyStrigs[i] = collection[i].charAt(0).toUpperCase() + collection[i].slice(1);
                _str = _str + modifyStrigs[i] + ' ';

            }
            return _str.trim();
        } catch (err) {}
    },
 }