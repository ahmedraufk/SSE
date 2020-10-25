import React from 'react';
import {Accordion, Card, Button, Container} from 'react-bootstrap';
import Menu from "../menu/Menu";
import faq from '../../res/faq.json';
import './Faq.css';

function Faq() {

  return (
    <div className="faq">
      <Menu showDropdown={true}/>
      <Container className="faqContainer">
        <h1>FAQs</h1>
        <Accordion id="faqAccordion" defaultActiveKey="0">
          { faq.map((question, i) => (
              <Card key={i+1}>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey={i+1}>
                    {question.text}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={i+1}>
                  <Card.Body>
                      <p>{question.answer}</p>
                      { question.img.length > 0 &&
                        <img class="img-fluid" src = { require("../../res/img/" + question.img)}/>
                      }

                  </Card.Body>
                </Accordion.Collapse>
              </Card>

            ))
          }
        </Accordion>
      </Container>
    </div>
  );
}

export default Faq;
