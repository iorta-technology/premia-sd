import './App.css';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import LeadMaster from './containers/LeadMaster/index';
import NewLead from './components/NewLead/NewLead'
import Login from './components/Login/Login'
import HomePage from './components/Home/HomePage';
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import ChangePassword from './components/ChangePassword/ChangePassword';
import Sidebar from './components/SideBar/SideBar';
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
            <div>
              <Sidebar />
              <Route path="/home"  component={HomePage}></Route>
              <Route path="/leadmasterpage/statuslead" component={NewLead}></Route>
              <Route path="/leadMaster" component={LeadMaster}></Route>
            </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
