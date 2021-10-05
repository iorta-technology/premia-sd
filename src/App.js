import './App.css';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import LeadMaster from './containers/LeadMaster/index';
import NewLead from './components/NewLead/NewLead'
import Login from './components/Login/Login';
import ClubsMaster from './components/ClubMaster/ClubsMaster';
import Birthday from './components/Birthday/Birthday';
import HomePage from './components/Home/HomePage';
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import ChangePassword from './components/ChangePassword/ChangePassword';
import Sidebar from './components/SideBar/SideBar';
import CompletedContest from './components/Contests/CompletedContest';
import ActiveContest from './components/Contests/ActiveContest';
import ActiveContestDetails from './components/Contests/ActiveContestDetails';
import AllContestDetails from './components/Contests/AllContestDetails';
import AllContest from './components/Contests/AllContest';
import CompletedContestDetails from './components/Contests/CompletedContestDetails';
import MyOverallRanking from './components/Contests/MyOverallRanking';
import AllContestDetails1 from './components/Contests/AllContestDetails';
import ActiveContestDetails1 from './components/Contests/ActiveContestDetails';
import CompletedContest1 from './components/Contests/CompletedContest';
import Calendar from './components/Contests/CalendarEvent';
import ServiceCorner from './components/ServiceCorner/ServiceCorner';
import BenefitIllustrator from './components/BenefitIllustrator/BenefitIllustrator';
import SalesPitch from './components/SalesPitch/SalesPitch';
import AdvisorPitch from './components/AdvisorPitch/AdvisorPitch';
import SalesPendency from './components/SalesPendency/SalesPendency';
import RenewalReport from './components/RenewalReport/RenewalReport';
import ForSelf from './components/ForSelf/ForSelf';
import ForCustomer from './components/ForCustomer/ForCustomer';
// import cards from './components/LeadCards/LeadCards';
function App() {
  return (
    <Router>
      <div className="box-size">
        <Switch>
            <Route exact path="/">
                <Redirect to="/login" />
            </Route>
            
            <Route path="/login"  component={Login}></Route>
            <Route path="/forgotpassword" component={ForgotPassword}></Route>
            <Route path="/changepassword" component={ChangePassword}></Route>
            <Route path="/leadmasterpage/statuslead" component={NewLead}></Route>
            <Route path="/leadMaster" component={LeadMaster}></Route>
            <Route path="/clubsMaster" component={ClubsMaster}></Route>
            <Route path="/birthday" component={Birthday}></Route>
            <Route path="/servicecorner" component={ServiceCorner}></Route>
            <Route path="/benefitillustrator" component={BenefitIllustrator}></Route>
            <Route path="/salespitch" component={SalesPitch}></Route>
            <Route path="/advisorpitch" component={AdvisorPitch}></Route>
            <Route path="/salespendency" component={SalesPendency}></Route>
            <Route path="/renewalreport" component={RenewalReport}></Route>
            <Route path="/forself" component={ForSelf}></Route>
            <Route path="/forcustomer" component={ForCustomer}></Route>

            
            <div>
              <Sidebar />
              <Route path="/home"  component={HomePage}></Route>
              <Route path="/leadmasterpage/statuslead" component={NewLead}></Route>
              <Route path="/leadMaster" component={LeadMaster}></Route>
              <Route path="/rewardscorner/contests/completed"  component={CompletedContest}></Route>
              <Route path="/rewardscorner/contests/completeddetails"  component={CompletedContestDetails}/>
              <Route path="/rewardscorner/contests/allcontest"  component={AllContest}/>
              <Route path="/rewardscorner/contests/myoverallranking"  component={MyOverallRanking}/>
              <Route path="/rewardscorner/contests/allcontestdetails"  component={AllContestDetails}/>
              <Route path="/rewardscorner/contests/activecontest"  component={ActiveContest}/>
              <Route path="/rewardscorner/contests/activecontestdetails"  component={ActiveContestDetails}/>
              <Route path="/calendar" component={Calendar}/>
            </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
