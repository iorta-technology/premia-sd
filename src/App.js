import React from 'react'
import './App.css';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import {Spin} from 'antd';

const LeadMaster = React.lazy(()=> import('./containers/LeadMaster/index'))
const StatusLead = React.lazy(()=> import('./components/StatusLead/StatusLead'))
const PersonalDetails = React.lazy(()=> import('./components/LeadDetails/PersonalDetails/PersonalDetails'))
const ContactDetails = React.lazy(()=> import('./components/LeadDetails/ContactDetails/ContactDetails'))
const ProfessionalDetails = React.lazy(()=> import('./components/LeadDetails/ProfessionalDetails/ProfessionalDeatils'))
const ExistingInsurance = React.lazy(()=> import('./components/LeadDetails/ExistingInsurance'))
const ProposedProduct = React.lazy(()=> import('./components/LeadDetails/ProposedProduct'))
const ProposalDetails = React.lazy(()=> import('./components/ProposalDetails/ProposalDetails'))
const DocumentsUpload = React.lazy(()=> import('./components/DocumentsUpload/DocumentsUpload'))
const History = React.lazy(()=> import('./components/History/History'))
const Login = React.lazy(()=> import('./components/Login/Login'))
const ForgotPassword = React.lazy(()=> import('./components/ForgotPassword/ForgotPassword'))
const ChangePassword = React.lazy(()=> import('./components/ChangePassword/ChangePassword'))
const Sidebar = React.lazy(()=> import('./components/SideBar/SideBar'))
const ClubsMaster = React.lazy(()=> import('./components/ClubMaster/ClubsMaster'))
const Birthday = React.lazy(()=> import('./components/Birthday/Birthday'))
const HomePage = React.lazy(()=> import('./components/Home/HomePage'))
const CompletedContest = React.lazy(()=> import('./components/Contests/CompletedContest'))
const ActiveContest = React.lazy(()=> import('./components/Contests/ActiveContest'))
const ActiveContestDetails = React.lazy(()=> import('./components/Contests/ActiveContestDetails'))
const AllContestDetails = React.lazy(()=> import('./components/Contests/AllContestDetails'))
const AllContest = React.lazy(()=> import('./components/Contests/AllContest'))
const CompletedContestDetails = React.lazy(()=> import('./components/Contests/CompletedContestDetails'))
const MyOverallRanking = React.lazy(()=> import('./components/Contests/MyOverallRanking'))
const AllContestDetails1 = React.lazy(()=> import('./components/Contests/AllContestDetails'))
const ActiveContestDetails1 = React.lazy(()=> import('./components/Contests/ActiveContestDetails'))
const CompletedContest1 = React.lazy(()=> import('./components/Contests/CompletedContest'))
const Calendar = React.lazy(()=> import('./components/Contests/CalendarEvent'))
const AgentMicroService = React.lazy(()=> import('./components/AgentMicroSite/AgentMicroSite'))
const KpiDashboard = React.lazy(()=> import('./components/KpiDashboard/KpiDashboard'))
const Blog = React.lazy(()=> import('./components/AgentMicroSite/Blog'))
const AdvisorPitch = React.lazy(()=> import('./components/AdvisorPitch/AdvisorPitch'))
const BenefitIllustrator = React.lazy(()=> import('./components/BenefitIllustrator/BenefitIllustrator'))
const ForCustomer = React.lazy(()=> import('./components/ForCustomer/ForCustomer'))
const ForSelf = React.lazy(()=> import('./components/ForSelf/ForSelf'))
const RenewalReport = React.lazy(()=> import('./components/RenewalReport/RenewalReport'))
// const SalesPitch = React.lazy(()=> import('./components/SalesPitch/SalesPitch'))
const ServiceCorner = React.lazy(()=> import('./components/ServiceCorner/ServiceCorner'))
const Renewals = React.lazy(()=> import('./containers/RenewalMaster/index'))
const RenewalAll = React.lazy(()=> import('./components/RenewalCollections/AllRenewals'))
const RenewalPaid = React.lazy(()=> import('./components/RenewalCollections/PaidRenewals'))
const RenewalUnPaid = React.lazy(()=> import('./components/RenewalCollections/UnPaidRenewals'))
const RenewalLapsed = React.lazy(()=> import('./components/RenewalCollections/LapsedRenewals'))
const RenewalMasterDetails = React.lazy(()=> import('./components/RenewalCollections/RenewalDetails'))
const SalesPendency = React.lazy(()=> import('./components/SalesPendency/SalesPendency'))
// const ExistingPartner = React.lazy(()=> import('./components/Partners/ExistingPartner'))
const MappedBranches = React.lazy(()=> import('./components/MappedBranches/MappedBranches'))
const LoanProducts = React.lazy(()=> import('./components/Products/LoanProducts'))

function App() {
  return (
  <React.Suspense fallback={<Spin size="large" className="loader"/>}>
    
      <Router>
        <div className="box-size">
          <Switch>
              <Route exact path="/">
                  <Redirect to="/himanshu" />
              </Route>
              <Route path="/login"  component={Login}></Route>
              <Route path="/forgotpassword" component={ForgotPassword}></Route>
              <Route path="/changepassword" component={ChangePassword}></Route>
              <Route path="/himanshu" component={AgentMicroService}></Route>
              <Route path="/blog" component={Blog}></Route>
              <Route path="/leadMaster/all_leads" component={LeadMaster}></Route>
              <Route path="/leadmasterpage/statuslead" component={StatusLead}></Route>
              <Route path="/leadmasterpage/leaddetails/personallead" component={PersonalDetails}></Route>
              <Route path="/leadmasterpage/leaddetails/contactlead" component={ContactDetails}></Route>
              <Route path="/leadmasterpage/leaddetails/professionallead" component={ProfessionalDetails}></Route>
              <Route path="/leadmasterpage/leaddetails/existingLead" component={ExistingInsurance}></Route>
              <Route path="/leadmasterpage/leaddetails/productLead" component={ProposedProduct}></Route>
              <Route path="/leadmasterpage/proposal" component={ProposalDetails}></Route>
              <Route path="/leadmasterpage/leadmasterdoc/leaddoc" component={DocumentsUpload}></Route>
              <Route path="/leadmasterpage/leadhistorymaster/leadhistory" component={History}></Route>
              <div>
              <Sidebar />
              <Route path="/clubsMaster" component={ClubsMaster}></Route>
              <Route path="/birthday" component={Birthday}></Route>
              <Route path="/home"  component={HomePage}></Route>
              <Route path="/rewardscorner/contests/completed"  component={CompletedContest}></Route>
              <Route path="/rewardscorner/contests/allcontest"  component={AllContest}/>
              <Route path="/rewardscorner/contests/myoverallranking"  component={MyOverallRanking}/>
              <Route path="/rewardscorner/contests/activecontest"  component={ActiveContest}/>
              <Route path="/rewardscorner/contests/activecontestdetails"  component={ActiveContestDetails}/>
              <Route path="/calendar" component={Calendar}/>
              <Route path="/kpi-dashboard" component={KpiDashboard}/>
              <Route path="/advisorpitch" component={AdvisorPitch}></Route>
              <Route path="/benefitillustrator" component={BenefitIllustrator}></Route>
              <Route path="/forcustomer" component={ForCustomer}></Route>
              <Route path="/forself" component={ForSelf}></Route>
              <Route path="/renewalreport" component={RenewalReport}></Route>
              {/* <Route path="/salespitch" component={SalesPitch}></Route> */}
              <Route path="/servicecorner" component={ServiceCorner}></Route>
              <Route path="/renewalMaster/allRenewals" component={Renewals}/>
              <Route path="/renewalMaster/all" component={RenewalAll}/>
              <Route path="/renewalMaster/paidRenewals" component={RenewalPaid}/>
              <Route path="/renewalMaster/unpaidRenewals" component={RenewalUnPaid}/>
              <Route path="/renewalMaster/lapsedRenewals" component={RenewalLapsed}/>
              <Route path="/renewalMaster/Details" component={RenewalMasterDetails}/>
              <Route path="/salespendency" component={SalesPendency}></Route>
              {/* <Route path="/existingpartner" component={ExistingPartner}/> */}
              <Route path="/mappedbranches" component={MappedBranches}></Route>
              <Route path="/products/loanproducts" component={LoanProducts}/>


              </div>
          </Switch>
        </div>
      </Router>
  </React.Suspense>
  );
}

export default App;
