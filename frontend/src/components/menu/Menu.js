import React from 'react';
import {Nav,Navbar,Form,FormControl,Button} from "react-bootstrap";
import './Menu.css';
import sociallyDistantVoters from '../../res/img/sociallyDistantVoters.svg';

function Menu() {

    return (
        <Navbar id="menu" variant ="dark">
            <Navbar.Brand href="/">
              <img
                src={sociallyDistantVoters}
                width="60"
                height="30"
                className="d-inline-block align-top"
                alt="Graphic of voters socially distancing"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#/wait_times">Wait Times</Nav.Link>
                    <Nav.Link href="#/faq">FAQ</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Menu;
