import React from 'react';
import './Faq.css';
import Menu from "../menu/Menu";
import faq from '../../res/faq.json';
import {Accordion, Card, Button, Container} from 'react-bootstrap';

function Faq() {

  return (
    <div className="faq">
      <Menu pageLocation="faq"/>
      <Container className="faqContainer">
        <h1>FAQs</h1>
        <Accordion id="faqAccordion" efaultActiveKey="0">
          {faq.map((question, i) => (
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={i+1}>
                  {question.text}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={i+1}>
                <Card.Body>{question.answer}</Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </Container>
    </div>
  );
}

export default Faq;
