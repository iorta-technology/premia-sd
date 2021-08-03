import './App.css';
import LeadMaster from './containers/LeadMaster/index'
import cards from './components/LeadCards/LeadCards';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
function App() {
  return (
    <Router>
      <div className="box-size">
        <Switch>
          <Route path="/all_leads" component={cards}></Route>
          <Route path="/leadMaster" component={LeadMaster}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
