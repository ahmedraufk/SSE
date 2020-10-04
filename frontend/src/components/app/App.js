import React from 'react';
import Home from '../home/Home';
import Menu from "../menu/Menu";
import WaitTimes from "../wait_times/WaitTimes";
import PollingInfo from "../polling_info/PollingInfo";
import Faq from "../faq/Faq";
import Container from 'react-bootstrap/Container'
import {Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  return (
    <div className="app">
      <Menu/>
      <Container className="content">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/wait_times' component={WaitTimes}/>
          <Route exact path='/faq' component={Faq}/>
          <Route exact path='/polling_info/:id' component={PollingInfo}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
