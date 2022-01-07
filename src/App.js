import React from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import {stoageGetter} from './helpers'

const LeadMaster = React.lazy(()=> import('./containers/LeadMaster/index'))
const AdvisorList = React.lazy(()=> import('./components/AdvisorOnboarding/AdvisorList'))
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
const SalesPitch = React.lazy(()=> import('./components/SalesPitch/SalesPitch'))
const ServiceCorner = React.lazy(()=> import('./components/ServiceCorner/ServiceCorner'))
const Renewals = React.lazy(()=> import('./containers/RenewalMaster/index'))
const RenewalAll = React.lazy(()=> import('./components/RenewalCollections/AllRenewals'))
const RenewalPaid = React.lazy(()=> import('./components/RenewalCollections/PaidRenewals'))
const RenewalUnPaid = React.lazy(()=> import('./components/RenewalCollections/UnPaidRenewals'))
const RenewalLapsed = React.lazy(()=> import('./components/RenewalCollections/LapsedRenewals'))
const RenewalMasterDetails = React.lazy(()=> import('./components/RenewalCollections/RenewalDetails'))
const SalesPendency = React.lazy(()=> import('./components/SalesPendency/SalesPendency'))
const ExistingPartner = React.lazy(()=> import('./components/Partners/ExistingPartner'))
const ExistingPartnerDetails=React.lazy(()=> import('./components/Partners/ExistingPartnerDetails'))
const MappedBranches = React.lazy(()=> import('./components/MappedBranches/MappedBranches'))
const LoanProducts = React.lazy(()=> import('./components/Products/LoanProducts'))
const ProposalFulfilment = React.lazy(() => import('./components/ProposalFulfilment/ProposalFulfilment'))
const PrePaymentReview = React.lazy(() => import('./components/PrePaymentReview/PrePaymentReview'))
const PaymentOptions = React.lazy(() => import('./components/PaymentOptions/PaymentOptions'))
const ProposalHistory = React.lazy(() => import('./components/ProposalHistory/ProposalHistory'))
const ProofAddress = React.lazy(() => import('./components/UploadDocuments/AddressProof'))
const AdvisorProfile = React.lazy(() => import('./components/AdvisorProfile/AdvisorProfile'))
const NotFound = React.lazy(()=> import('./components/ComponentNotFound/ComponentNotFound'))
const NoRecord=React.lazy(()=> import('./components/Partners/NoRecord'))

const ListCreationMaster = React.lazy(()=> import('./components/ListCreation/ListCreationMaster'))
const CreateOpporCustData = React.lazy(()=> import('./components/ListCreation/CreateOpporCustData'))
// const NoRecord=React.lazy(()=> import('./components/Partners/NoRecord'))
const ShopGuardRoute = ({ component: Component, ...props }) => (
  <Route
    {...props}
    render={routeProps => {
      const logindata = stoageGetter('user')
      
      // Do all your conditional tests here
      return logindata === null ? (
        <Redirect to="/himanshu" />
        ) : (
          <Component {...routeProps} />
        );
    }}
  />
);

function App() {
  // const logindata = stoageGetter('user')
  // if(!logindata){
  //   console.log(true)

  //   return (
  //     <Router>
  //       <Switch>
  //         <Route exact path="/">
  //                 <Redirect to="/himanshu" />
  //         </Route>
  //       </Switch>
  //     </Router>
  //   )
  // }
  return (
    <React.Suspense fallback={<Spin size="large" className="loader" />}>

      <Router>
        <div className="box-size">
          <Switch>
            <Route exact path="/">
              <Redirect to="/profile" />
            </Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/forgotpassword" component={ForgotPassword}></Route>
            <Route exact path="/changepassword" component={ChangePassword}></Route>
            <Route exact path="/profile" component={AgentMicroService}></Route>
            <Route exact path="/blog" component={Blog}></Route>
            <div>
              {/* Make this route at the end only. */}
              <Route exact  path="/agentMicrosite" component={AgentMicroService}></Route>
              {/* <div> */}
              <Sidebar />
              <Route exact path="/advisorOnboarding/:type" component={AdvisorList}></Route>
              <Route exact path="/leadMaster/:leadType" component={LeadMaster}></Route>
              <Route exact path="/leadmasterpage/statuslead" component={StatusLead}></Route>
              <Route exact path="/leadmasterpage/leaddetails/personallead" component={PersonalDetails}></Route>
              <Route exact path="/leadmasterpage/leaddetails/contactlead" component={ContactDetails}></Route>
              <Route exact path="/leadmasterpage/leaddetails/professionallead" component={ProfessionalDetails}></Route>
              <Route exact path="/leadmasterpage/leaddetails/existingLead" component={ExistingInsurance}></Route>
              <Route path="/leadmasterpage/leaddetails/productLead" component={ProposedProduct}></Route>
              <Route exact path="/leadmasterpage/proposal" component={ProposalDetails}></Route>
              <Route exact path="/leadmasterpage/leadmasterdoc/leaddoc" component={DocumentsUpload}></Route>
              <Route exact path="/leadmasterpage/leadhistorymaster/leadhistory" component={History}></Route>
              <Route exact path="/clubsMaster" component={ClubsMaster}></Route>
              <Route exact path="/birthday" component={Birthday}></Route>
              <Route exact path="/home" component={HomePage}></Route>
              <Route exact path="/rewardscorner/contests/completed" component={CompletedContest}></Route>
              <Route exact path="/rewardscorner/contests/allcontest" component={AllContest} />
              <Route exact path="/rewardscorner/contests/myoverallranking" component={MyOverallRanking} />
              <Route exact path="/rewardscorner/contests/activecontest" component={ActiveContest} />
              <Route exact path="/rewardscorner/contests/activecontestdetails" component={ActiveContestDetails} />
              <Route exact path="/calendar" component={Calendar} />
              <Route exact path="/kpi-dashboard" component={KpiDashboard} />
              <Route exact path="/advisorpitch" component={AdvisorPitch}></Route>
              <Route exact path="/benefitillustrator" component={BenefitIllustrator}></Route>
              <Route exact path="/proposalfulfilment" component={ProposalFulfilment}></Route>
              <Route exact path="/prepaymentreview" component={PrePaymentReview}></Route>
              <Route exact path="/paymentoptions" component={PaymentOptions}></Route>
              <Route exact path="/forcustomer" component={ForCustomer}></Route>
              <Route exact path="/forself" component={ForSelf}></Route>
              <Route exact path="/renewalreport" component={RenewalReport}></Route>
              {/* <Route path="/salespitch" component={SalesPitch}></Route> */}
              <Route exact path="/servicecorner" component={ServiceCorner}></Route>
              <Route exact path="/renewalMaster/allRenewals" component={Renewals} />
              <Route exact path="/renewalMaster/all" component={RenewalAll} />
              <Route exact path="/renewalMaster/paidRenewals" component={RenewalPaid} />
              <Route exact path="/renewalMaster/unpaidRenewals" component={RenewalUnPaid} />
              <Route exact path="/renewalMaster/lapsedRenewals" component={RenewalLapsed} />
              <Route exact path="/renewalMaster/Details" component={RenewalMasterDetails} />
              <Route exact path="/salespendency" component={SalesPendency}></Route>
              <Route exact path="/existingpartner" component={ExistingPartner}/>
              <Route exact path="/existingpartnerdetails" component={ExistingPartnerDetails}/>
              {/* <Route exact path="/norecord" component={NoRecord}></Route> */}
              <Route exact path="/mappedbranches" component={MappedBranches}></Route>
              <Route exact path="/uploadMaster/addressProof" component={ProofAddress}></Route>
              <Route exact path="/proposalhistory" component={ProposalHistory}></Route>
              <Route exact path="/list-creation-master" component={ListCreationMaster}></Route>
              <Route exact path="/create-list" component={CreateOpporCustData}></Route>
              
              
            {/* </div> */}
              {/* <Route path="/existingpartner" component={ExistingPartner}/> */}
              <Route exact path="/mappedbranches" component={MappedBranches}></Route>
              <Route exact path="/products" component={LoanProducts}/>
              
              </div>
              <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    </React.Suspense>
  );
}

export default App;
