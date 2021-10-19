import React from 'react';
import './App.css';
import './css/Menu.css'
import './css/Home.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Menu from './components/Menu';
import Home from  './components/Home'

function App() {

  return (
    <div>
      <Router>
        <Menu></Menu>
        <Switch>
          <Route exact path='/' component={Home}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;