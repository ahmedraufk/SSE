import React from 'react';
import Home from '../home/Home';
import CountyWide from "../county_wide/CountyWide";
import Location from "../location/Location";
import Faq from "../faq/Faq";
import Footer from "../footer/Footer";
import {Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="app">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/countyWide' component={CountyWide}/>
        <Route exact path='/faq' component={Faq}/>
        <Route exact path='/location/:id' component={Location}/>
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
