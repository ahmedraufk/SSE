import React from 'react';
import {Nav,Navbar,Form,FormControl,Button} from "react-bootstrap";
import './Menu.css';
import sociallyDistantVoters from '../../res/img/sociallyDistantVoters.svg';

function Menu() {

    return (
        <Navbar collapseOnSelect expand="lg" id="menu" variant ="dark">
            <Navbar.Brand href="/">
              <img
                src={sociallyDistantVoters}
                width="60"
                height="30"
                className="d-inline-block align-top"
                alt="Graphic of voters socially distancing"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#/countyWide">County Wide</Nav.Link>
                    <Nav.Link href="#/faq">FAQ</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-md-2" />
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Menu;
