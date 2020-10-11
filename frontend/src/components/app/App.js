import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from '../home/Home';
import CountyWide from "../county_wide/CountyWide";
import Location from "../location/Location";
import Faq from "../faq/Faq";
import Footer from "../footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="app">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/countyWide' component={CountyWide}/>
        <Route exact path='/faq' component={Faq}/>
        <Route exact path='/location' component={Location}/>
        <Route exact path='/error' component={Error}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
