import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import BenefitIllustrator from "./components/BenefitIllustrator/BenefitIllustrator";
import ProposalFulfilment from "./components/ProposalFulfilment/ProposalFulfilment";
import DateScheduler from "./components/Scheduler/Activity_Tracker_ToDo_View/Activity_Tracker";
// import DateScheduler from "./components/Scheduler/DateScheduler_List_View/DateScheduler";
import { Spin } from "antd";
import Multichannel from "./components/Multichannel";
import DefaultChannel from "./components/DefaultChannel/DefaultChannel";
import ResourceCenter from "./components/SalesPitch/ResourceCenter";

// const Master = React.lazy(() => import("./containers/Master/index"));
const LeadMaster = React.lazy(() => import("./containers/LeadMaster/index"));
const Brokerflow = React.lazy(() =>
  import("./containers_brokerFlow/LeadMaster/index")
);
const AdvisorList = React.lazy(() =>
  import("./components/AdvisorOnboarding/AdvisorCard")
);
const StatusLead = React.lazy(() =>
  import("./components/StatusLead/StatusLead")
);
const NewLeadCreation = React.lazy(() =>
  import("./components/StatusLead/NewLeadCreation")
);

const LeadBulkUpload = React.lazy(() =>
  import("./components/StatusLead/LeadBulkUpload")
);

const PersonalDetails = React.lazy(() =>
  import("./components/LeadDetails/PersonalDetails/PersonalDetails")
);
const ContactDetails = React.lazy(() =>
  import("./components/LeadDetails/ContactDetails/ContactDetails")
);
const ProfessionalDetails = React.lazy(() =>
  import("./components/LeadDetails/ProfessionalDetails/ProfessionalDeatils")
);
const ExistingInsurance = React.lazy(() =>
  import("./components/LeadDetails/ExistingInsurance")
);
const ProposedProduct = React.lazy(() =>
  import("./components/LeadDetails/ProposedProduct")
);
const ProposalDetails = React.lazy(() =>
  import("./components/ProposalDetails/ProposalDetails")
);
const DocumentsUpload = React.lazy(() =>
  import("./components/DocumentsUpload/DocumentsUpload")
);
const History = React.lazy(() => import("./components/History/History"));
const BrokerHistory = React.lazy(() =>
  import("./components/History/Broker_History")
);
const Login = React.lazy(() => import("./components/Login/Login"));
const ForgotPassword = React.lazy(() =>
  import("./components/ForgotPassword/ForgotPassword")
);
const ChangePassword = React.lazy(() =>
  import("./components/ChangePassword/ChangePassword")
);
const Sidebar = React.lazy(() => import("./components/SideBar/SideBar"));
const ClubsMaster = React.lazy(() =>
  import("./components/ClubMaster/ClubsMaster")
);
const Birthday = React.lazy(() => import("./components/Birthday/Birthday"));
const HomePage = React.lazy(() => import("./components/Home/HomePage"));
const CompletedContest = React.lazy(() =>
  import("./components/Contests/CompletedContest")
);
const ActiveContest = React.lazy(() =>
  import("./components/Contests/ActiveContest")
);
const ActiveContestDetails = React.lazy(() =>
  import("./components/Contests/ActiveContestDetails")
);
// const AllContestDetails = React.lazy(() =>
//   import("./components/Contests/AllContestDetails")
// );
// const Calendar1 = React.lazy(() =>
//   import("./components/Activitity Tracker/ActivityCalender")
// );
const AllContest = React.lazy(() => import("./components/Contests/AllContest"));
// const CompletedContestDetails = React.lazy(() =>
//   import("./components/Contests/CompletedContestDetails")
// );
const MyOverallRanking = React.lazy(() =>
  import("./components/Contests/MyOverallRanking")
);
// const AllContestDetails1 = React.lazy(() =>
//   import("./components/Contests/AllContestDetails")
// );
// const ActiveContestDetails1 = React.lazy(() =>
//   import("./components/Contests/ActiveContestDetails")
// );
// const CompletedContest1 = React.lazy(() =>
//   import("./components/Contests/CompletedContest")
// );
// const Calendar = React.lazy(() =>
//   import("./components/Contests/CalendarEvent")
// );
const AgentMicroService = React.lazy(() =>
  import("./components/AgentMicroSite/AgentMicroSite")
);

const KpiDashboard = React.lazy(() =>
  import("./components/KpiDashboard/KpiDashboard")
);

const NotifyPage = React.lazy(() =>
  import("./components/NotificationComp/NotificationComp")
);

const DailyBussiness = React.lazy(() =>
  import("./components/DailyBussiness/DailyBussiness")
);
const Blog = React.lazy(() => import("./components/AgentMicroSite/Blog"));
const AdvisorPitch = React.lazy(() =>
  import("./components/AdvisorPitch/AdvisorPitch")
);
// const BenefitIllustrator = React.lazy(() => import('./components/BenefitIllustrator/BenefitIllustrator'))
const ForCustomer = React.lazy(() =>
  import("./components/ForCustomer/ForCustomer")
);
const ForSelf = React.lazy(() => import("./components/ForSelf/ForSelf"));
const RenewalReport = React.lazy(() =>
  import("./components/RenewalReport/RenewalReport")
);
const SalesPitch = React.lazy(() =>
  import("./components/SalesPitch/SalesPitch")
);
const ServiceCorner = React.lazy(() =>
  import("./containers/ServiceCorner/index")
);
// const ServiceCornerAll = React.lazy(() =>
//   import("./components/ServiceCorner/ServiceCorner")
// );
const ServiceCornerSelf = React.lazy(() =>
  import("./components/ServiceCorner/ServiceSelf")
);
const ServiceCornerCustomers = React.lazy(() =>
  import("./components/ServiceCorner/ServiceCustomer")
);
const Renewals = React.lazy(() => import("./containers/RenewalMaster/index"));
const RenewalAll = React.lazy(() =>
  import("./components/RenewalCollections/AllRenewals")
);
const RenewalPaid = React.lazy(() =>
  import("./components/RenewalCollections/PaidRenewals")
);
const RenewalUnPaid = React.lazy(() =>
  import("./components/RenewalCollections/UnPaidRenewals")
);
const RenewalLapsed = React.lazy(() =>
  import("./components/RenewalCollections/LapsedRenewals")
);
const RenewalMasterDetails = React.lazy(() =>
  import("./components/RenewalCollections/RenewalDetails")
);
const SalesPendency = React.lazy(() =>
  import("./components/SalesPendency/SalesPendency")
);
const ExistingPartner = React.lazy(() =>
  import("./components/Partners/ExistingPartner")
);
const ExistingPartnerDetails = React.lazy(() =>
  import("./components/Partners/ExistingPartnerDetails")
);
const MappedBranches = React.lazy(() =>
  import("./components/MappedBranches/MappedBranches")
);
const LoanProducts = React.lazy(() =>
  import("./components/Products/LoanProducts")
);
// const ProposalFulfilment = React.lazy(() => import('./components/ProposalFulfilment/ProposalFulfilment'))
const PrePaymentReview = React.lazy(() =>
  import("./components/PrePaymentReview/PrePaymentReview")
);
const PaymentOptions = React.lazy(() =>
  import("./components/PaymentOptions/PaymentOptions")
);
const ProposalHistory = React.lazy(() =>
  import("./components/ProposalHistory/ProposalHistory")
);
const CreateTask = React.lazy(() => import("./components/Calender/CreateTask"));
const CreateNewTask = React.lazy(() =>
  import("./components/Calender/CreateNewTask")
);
const UploadDocuments = React.lazy(() =>
  import("./components/UploadDocuments/UploadDocuments")
);
// const AdvisorProfile = React.lazy(() =>
//   import("./components/AdvisorProfile/AdvisorProfile")
// );
const Dashboard = React.lazy(() => import("./components/Dashboard/Dashboard"));
const BulkAction = React.lazy(() =>
  import("./components/BulkAction/BulkAction")
);
const TodoMobile = React.lazy(() =>
  import("./components/Activitity Tracker/TodoMobile")
);

const CompIntelligence = React.lazy(() =>
  import("./components/CompanyIntelligence/CompIntelligence")
);
const PlanDetail = React.lazy(() =>
  import("./components/PhilPlans/PlanDetails")
);
const Maturity = React.lazy(() =>
  import("./components/PhilPlans/MaturityBenefit")
);
const CompIntelligence_broker = React.lazy(() =>
  import("./components/CompanyIntelligence_broker_flow/CompIntelligence")
);

//importing Our Scheduler

// const scheduler=React.lazy(()=>{
//   import("./components/Scheduler/Scheduler")
// });

function App() {
  return (
    <React.Suspense
      fallback={
        <div className="loader">
          {" "}
          <Spin size="large" />{" "}
        </div>
      }
    >
      <Router>
        <div className="box-size">
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            {/* creating a route of scheduler */}
            {/* <Route path="/datescheduler" component={DateScheduler}></Route> */}

            <Route path="/login" component={Login}></Route>
            <Route path="/forgotpassword" component={ForgotPassword}></Route>
            <Route path="/changepassword" component={ChangePassword}></Route>
            {/* <Route path="/himanshu" component={AgentMicroService}></Route> */}
            <Route path="/profile" component={AgentMicroService}></Route>
            <Route path="/blog" component={Blog}></Route>
            {/* <Route path="/Master/:masterType" component={Master}></Route> */}

            <div>
              {/* Make this route at the end only. */}
              <Route
                path="/agentMicrosite"
                component={AgentMicroService}
              ></Route>
              <div>
                <Sidebar />
                <div>
                  <Route path="/clubsMaster" component={ClubsMaster}></Route>
                  <Route path="/birthday" component={Birthday}></Route>
                  <Route path="/home" component={HomePage}></Route>
                  <Route
                    path="/rewardscorner/contests/completed"
                    component={CompletedContest}
                  ></Route>
                  <Route
                    path="/rewardscorner/contests/allcontest"
                    component={AllContest}
                  />
                  <Route
                    path="/rewardscorner/contests/myoverallranking"
                    component={MyOverallRanking}
                  />
                  <Route
                    path="/rewardscorner/contests/activecontest"
                    component={ActiveContest}
                  />
                  <Route
                    path="/rewardscorner/contests/activecontestdetails"
                    component={ActiveContestDetails}
                  />
                  <Route path="/calendar" component={DateScheduler} />
                  <Route path="/todo" component={TodoMobile} />

                  <Route path="/kpi-dashboard" component={KpiDashboard} />
                  <Route path="/daily-bussienss" component={DailyBussiness} />
                  <Route path="/notifypage" component={NotifyPage} />

                  <Route
                    path="/masterpresales/advisordetail/advisorpitch"
                    component={AdvisorPitch}
                  ></Route>
                  <Route
                    path="/master/benefitillustrator"
                    component={BenefitIllustrator}
                  ></Route>
                  <Route
                    path="/master/proposalfulfilment"
                    component={ProposalFulfilment}
                  ></Route>
                  <Route
                    path="/master/prepaymentreview"
                    component={PrePaymentReview}
                  ></Route>
                  <Route
                    path="/master/paymentoptions"
                    component={PaymentOptions}
                  ></Route>
                  <Route path="/forcustomer" component={ForCustomer}></Route>
                  <Route path="/forself" component={ForSelf}></Route>
                  <Route
                    path="/renewalreport"
                    component={RenewalReport}
                  ></Route>
                  <Route
                    path="/masterpresales/customerdetails/salespitch"
                    component={SalesPitch}
                  ></Route>
                  <Route
                    path="/resourcecenter"
                    component={ResourceCenter}
                  ></Route>
                  <Route
                    path="/servicecorner/all"
                    component={ServiceCorner}
                  ></Route>
                  <Route
                    path="/servicecorner/self"
                    component={ServiceCornerSelf}
                  ></Route>
                  <Route
                    path="/servicecorner/customers"
                    component={ServiceCornerCustomers}
                  ></Route>
                  <Route
                    path="/renewalMaster/allRenewals"
                    component={Renewals}
                  />
                  <Route path="/renewalMaster/all" component={RenewalAll} />
                  <Route
                    path="/renewalMaster/paidRenewals"
                    component={RenewalPaid}
                  />
                  <Route
                    path="/renewalMaster/unpaidRenewals"
                    component={RenewalUnPaid}
                  />
                  <Route
                    path="/renewalMaster/lapsedRenewals"
                    component={RenewalLapsed}
                  />
                  <Route
                    path="/renewalMaster/Details"
                    component={RenewalMasterDetails}
                  />
                  <Route
                    path="/salespendency"
                    component={SalesPendency}
                  ></Route>
                  <Route path="/existingpartner" component={ExistingPartner} />
                  <Route
                    path="/existingpartnerdetails"
                    component={ExistingPartnerDetails}
                  />
                  <Route
                    path="/mappedbranches"
                    component={MappedBranches}
                  ></Route>
                  <Route
                    path="/master/uploaddocuments"
                    component={UploadDocuments}
                  ></Route>
                  <Route
                    path="/master/proposalhistory"
                    component={ProposalHistory}
                  ></Route>
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/createtask" component={CreateTask} />
                  <Route path="/createnewtask" component={CreateNewTask} />
                  <Route
                    path="/leadMaster/:leadType"
                    component={LeadMaster}
                  ></Route>
                  <Route
                    path="/brokerflow/:leadType"
                    component={Brokerflow}
                  ></Route>
                  <Route path="/multichannel" component={Multichannel}></Route>
                  <Route
                    path="/defaultchannel"
                    component={DefaultChannel}
                  ></Route>
                  <Route
                    path="/leadmasterpage/statuslead"
                    component={StatusLead}
                  ></Route>
                  <Route
                    path="/leadmasterpage/newleadcreation"
                    component={NewLeadCreation}
                  ></Route>
                  <Route
                    path="/leadmasterpage/leadBulkUpload"
                    component={LeadBulkUpload}
                  ></Route>
                  <Route
                    path="/leadmasterpage/leaddetails/personallead"
                    component={PersonalDetails}
                  ></Route>

                  <Route
                    path="/company-intelligence"
                    component={CompIntelligence}
                  ></Route>
                  <Route path="/plan-details" component={PlanDetail}></Route>
                  <Route path="/maturity-benefit" component={Maturity}></Route>
                  <Route
                    path="/company-intelligence_broker"
                    component={CompIntelligence_broker}
                  ></Route>

                  <Route
                    path="/leadmasterpage/leaddetails/contactlead"
                    component={ContactDetails}
                  ></Route>
                  <Route
                    path="/leadmasterpage/leaddetails/professionallead"
                    component={ProfessionalDetails}
                  ></Route>
                  <Route
                    path="/leadmasterpage/leaddetails/existingLead"
                    component={ExistingInsurance}
                  ></Route>
                  <Route
                    path="/leadmasterpage/leaddetails/productLead"
                    component={ProposedProduct}
                  ></Route>
                  <Route
                    path="/leadmasterpage/proposal"
                    component={ProposalDetails}
                  ></Route>
                  <Route
                    path="/leadmasterpage/leadmasterdoc/leaddoc"
                    component={DocumentsUpload}
                  ></Route>
                  <Route
                    path="/leadmasterpage/leadhistory"
                    component={History}
                  ></Route>
                  <Route
                    path="/broker-activity"
                    component={BrokerHistory}
                  ></Route>
                  <Route
                    path="/advisorOnboarding/:type"
                    component={AdvisorList}
                  ></Route>

                  {/* <Route path="/master/proposalTabs" component={ProposalTabs}></Route> */}
                  {/* <Route path="/master/benefitillustrator" component={ProposalTabs}></Route> */}
                  {/* <Route path="/applications" component={Applications}></Route> */}
                  <Route
                    path="/PropsalFulfilment"
                    component={ProposalFulfilment}
                  ></Route>

                  {/* creating a route of scheduler */}
                </div>
              </div>
              <Route path="/products" component={LoanProducts} />
              <Route path="/bulkaction" component={BulkAction} />
            </div>
          </Switch>
        </div>
      </Router>
    </React.Suspense>
  );
}

export default App;
