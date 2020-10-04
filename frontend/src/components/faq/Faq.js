import React from 'react';
import './Faq.css';
import Menu from "../menu/Menu";

function Faq() {

  return (
    <div className="faq">
      <Menu/>
      <h1>FAQ</h1>
      <br></br><br></br>

      <h2>Questions go Here</h2>
      <p>Answers go here</p>
      <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Google</a>
    </div>
  );
}

export default Faq;
