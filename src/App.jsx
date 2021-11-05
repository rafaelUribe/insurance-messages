import React from 'react';
import './App.css';
import './css/Menu.css'
import './css/Home.css'
import './css/Ranking.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Menu from './components/Menu';
import Home from  './components/Home'
// import Ranking from './components/Ranking';

function App() {

  return (
    <div>
      <Router>
        <Menu></Menu>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          {/* <Route exact path='/Ranking' component={Ranking}></Route> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;