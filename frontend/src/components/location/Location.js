import React, {useState} from 'react';
import './Location.css';
import Menu from "../menu/Menu";

function Location(props) {

  const [location] = useState(props.location)

  return (
    <div className="location">
      <Menu/>
      <h1>Location</h1>
    </div>
  );
}

export default Location;
