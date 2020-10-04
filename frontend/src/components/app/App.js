import React from 'react';
import Home from '../home/Home';
import Info from '../info/PollingInfo';
import Menu from "../menu/Menu";
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
          <Route exact path='/info/:id' component={Info}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
