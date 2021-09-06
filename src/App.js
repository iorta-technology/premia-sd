import './App.css';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import LeadMaster from './containers/LeadMaster/index';
import StatusLead from './components/StatusLead/StatusLead'
import PersonalDetails from './components/LeadDetails/PersonalDetails/PersonalDetails' 
import ContactDetails from './components/LeadDetails/ContactDetails/ContactDetails' 
import ProfessionalDetails from './components/LeadDetails/ProfessionalDetails/ProfessionalDeatils';
import ExistingInsurance from './components/LeadDetails/ExistingInsurance';
import ProposedProduct from './components/LeadDetails/ProposedProduct';
import ProposalDetails from './components/ProposalDetails/ProposalDetails';
import DocumentsUpload from './components/DocumentsUpload/DocumentsUpload';
import History from './components/History/History';
import Login from './components/Login/Login'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import ChangePassword from './components/ChangePassword/ChangePassword';
import Sidebar from './components/SideBar/SideBar';
import ClubsMaster from './components/ClubMaster/ClubsMaster';
import Birthday from './components/Birthday/Birthday';
import HomePage from './components/Home/HomePage';
import CompletedContest from './components/Contests/CompletedContest';
import ActiveContest from './components/Contests/ActiveContest';
import ActiveContestDetails from './components/Contests/ActiveContestDetails';
import AllContestDetails from './components/Contests/AllContestDetails';
import AllContest from './components/Contests/AllContest';
import CompletedContestDetails from './components/Contests/CompletedContestDetails';
import MyOverallRanking from './components/Contests/MyOverallRanking';
// import AllContestDetails1 from './components/Contests/AllContestDetails';
// import ActiveContestDetails1 from './components/Contests/ActiveContestDetails';
// import CompletedContest1 from './components/Contests/CompletedContest';
import AllContestDetails1 from './components/Contests/AllContestDetails';
import ActiveContestDetails1 from './components/Contests/ActiveContestDetails';
import CompletedContest1 from './components/Contests/CompletedContest';
import Calendar from './components/Contests/CalendarEvent';
import AgentMicroService from './components/AgentMicroSite/AgentMicroSite';

function App() {
  return (
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
            <div>
            <Sidebar>
            <Route path="/clubsMaster" component={ClubsMaster}></Route>
            <Route path="/birthday" component={Birthday}></Route>
              
              <Route path="/home"  component={HomePage}></Route>
              <Route path="/rewardscorner/contests/completed"  component={CompletedContest}></Route> 
              <Route path="/leadmasterpage/leaddetails/personallead" component={PersonalDetails}></Route>
              <Route path="/leadmasterpage/leaddetails/contactlead" component={ContactDetails}></Route>
              <Route path="/leadmasterpage/leaddetails/professionallead" component={ProfessionalDetails}></Route>
              <Route path="/leadmasterpage/leaddetails/existingLead" component={ExistingInsurance}></Route>
              <Route path="/rewardscorner/contests/completed"  component={CompletedContest}></Route> 
              <Route path="/rewardscorner/contests/completeddetails"  component={CompletedContestDetails}/>
              <Route path="/rewardscorner/contests/allcontest"  component={AllContest}/>
              <Route path="/rewardscorner/contests/myoverallranking"  component={MyOverallRanking}/>
              <Route path="/rewardscorner/contests/activecontest"  component={ActiveContest}/>
              <Route path="/rewardscorner/contests/activecontestdetails"  component={ActiveContestDetails}/>
              <Route path="/calendar" component={Calendar}/>
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
              <Route path="/calendar" component={Calendar}/>
              </Sidebar>
            </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
