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
            <Route path="/clubsMaster" component={ClubsMaster}></Route>
            <Route path="/birthday" component={Birthday}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
