import React from 'react';
import './Error.css';
import Menu from "../menu/Menu";
import {Container, Alert} from "react-bootstrap";


function Location(props) {

  return (
    <div className="error">
      <Menu/>
      <Container>
        <h1 id="errorTitle">Sorry, an error occurred.</h1>
        <Alert variant="danger">Something wrong happened. Please try again.</Alert>
      </Container>
    </div>
  );
}

export default Location;
