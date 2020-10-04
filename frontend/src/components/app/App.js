import React from 'react';
import Home from '../home/Home';
import WaitTimes from "../wait_times/WaitTimes";
import PollingInfo from "../polling_info/PollingInfo";
import Faq from "../faq/Faq";
import {Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="app">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/wait_times' component={WaitTimes}/>
        <Route exact path='/faq' component={Faq}/>
        <Route exact path='/info/:id' component={PollingInfo}/>
      </Switch>
    </div>
  );
}

export default App;
