import React from 'react';
import {Accordion, Card, Button, Container} from 'react-bootstrap';
import Menu from "../menu/Menu";
import './Faq.css';

function Faq() {

  return (
    <div className="faq">
      <Menu showDropdown={true}/>
      <Container className="faqContainer">
        <h1>FAQs</h1>
        <Accordion id="faqAccordion" defaultActiveKey="0">
            <Card key={1}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={1}>
                       What is the purpose of this site?
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={1}>
                    <Card.Body>
                        <p>This site is part of a project to improve the voting experience for voters across the United States. This election cycle, we are piloting a program for reporting wait times to voters in Fulton County, GA. We hope this site will help you be more informed about the current wait times at your polling location.</p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card key={2}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={2}>
                        How can I use this site?
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={2}>
                    <Card.Body>
                        <p>This site will become active on election day: November 3rd, 2020. On that day, you will be able to search for any polling location in Fulton County and, if we are collecting data for that location, see what the currently reported wait time is. We will be collecting wait times for most, but not all, polling locations in Fulton County. Please keep in mind that this is a pilot program. Your actual experience of waiting times may differ from what is posted.</p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card key={3}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={3}>
                        How do I report a wait time?
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={3}>
                    <Card.Body>
                        <p>
                            Wait times should only be reported from the polling location itself, and during the pilot program we are only accepting wait time reports from a subset of polling locations. At those locations, you will see a sign near the exit like the one below. If you see that sign, please send a text to the number provided with the number of minutes you waited in line to vote.
                        </p>
                        <img className="img-fluid" src={require("../../res/img/waitPoster.png")} alt="Post with instructions to report wait time"/>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card key={4}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={4}>
                        Who is supporting this project?
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={4}>
                    <Card.Body>
                        <p>
                            This project is a collaboration between the < a href={"https://www.gatech.edu/"} >Georgia Institute of Technology</a> and Fulton County. It is funded with a grant from < a href={"https://www.newventurefund.org/"} >The New Venture Fund</a>  based out of Washington, DC.
                        </p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card key={5}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={5}>
                        Why is this project only for Fulton County?
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={5}>
                    <Card.Body>
                        <p>
                            This project is part of a larger program to evaluate tools to improve the voting experience across the United States. This particular wait time project is being piloted in Fulton County, while other projects that are funded by a grant from < a href={"https://www.newventurefund.org/"} >The New Venture Fund</a> are occurring in other locations.
                        </p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card key={6}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={6}>
                        How do you estimate the wait time?
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={6}>
                    <Card.Body>
                        <p>
                            The current wait times you see on this site are a combination of reports from voters and observations made by members of our team. We combine every response we receive via text message and the observed times in a weighted average to produce the time shown on this site.
                        </p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card key={7}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={7}>
                        How do you protect my privacy?
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={7}>
                    <Card.Body>
                        <p>
                            When you submit a wait time via SMS texting, your phone number is not stored. When you fill out an online survey as part of this project, no identifying information is stored about you or the device you submitted it on. Your participation in both of these activities is completely voluntary and anonymous.
                        </p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card key={8}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={8}>
                        What if I have a question that is not answered on this FAQ?
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={8}>
                    <Card.Body>
                        <p>
                            If you have another question or feedback about this site, please email us at gbarkhuff3@gatech.edu.
                        </p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
      </Container>
    </div>
  );
}

export default Faq;
