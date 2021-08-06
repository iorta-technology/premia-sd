import './App.css';
<<<<<<< HEAD
import Login from './components/Login';

import Achievment from './components/Achievement';
import ActiveContest from './components/ActiveContest';
import AllContest from './components/AllContest';
import AllContestDetails from './components/AllContestDetails';
import ActiveContestDetails from './components/ActiveContestDetails';
import CompletedContest from './components/CompletedContest';
function App() {
  return (
    <div>
      <ActiveContestDetails />
    </div>
=======
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import LeadMaster from './containers/LeadMaster/index';
import NewLead from './components/NewLead/NewLead'
import Login from './components/Login/Login'
import HomePage from './components/Home/HomePage';
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import ChangePassword from './components/ChangePassword/ChangePassword';
// import cards from './components/LeadCards/LeadCards';
function App() {
  return (
    <Router>
      <div className="box-size">
        <Switch>
            <Route exact path="/">
                <Redirect to="/login" />
            </Route>
            <Route path="/home"  component={HomePage}></Route>
            <Route path="/login"  component={Login}></Route>
            <Route path="/forgotpassword" component={ForgotPassword}></Route>
            <Route path="/changepassword" component={ChangePassword}></Route>
            <Route path="/leadmasterpage/statuslead" component={NewLead}></Route>
            <Route path="/leadMaster" component={LeadMaster}></Route>
        </Switch>
      </div>
    </Router>
>>>>>>> 356bc9712c8a1044cd08fdd6955aab2a944f90c1
  );
}

export default App;
