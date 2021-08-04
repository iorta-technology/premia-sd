import './App.css';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import HomePage from './components/Home/HomePage';
import Login from './components/Login/Login'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import ChangePassword from './components/ChangePassword/ChangePassword';
import LeadMaster from './containers/LeadMaster/index';
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
            {/* <Route path="/all_leads" component={cards}></Route> */}
          <Route path="/leadMaster" component={LeadMaster}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
