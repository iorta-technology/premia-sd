import './App.css';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
function App() {
  return (
    <Router>
    <div>
      <Switch>
        <Route path="/login"  component={Login}></Route>
        <Route path="/forgotpassword" component={ForgotPassword}></Route>
        <Route path="/changepassword" component={ChangePassword}></Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
