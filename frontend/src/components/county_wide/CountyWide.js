import React, {useEffect, useRef, useState} from 'react';
import './CountyWide.css';
import Menu from "../menu/Menu";
import {Dropdown, Container, Row, Col, Card } from "react-bootstrap";

function CountyWide() {

  const [locations, setLocations] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetical");
  const countyWideRef = useRef(null); // DOM element to render map

  useEffect(() => {
    fetch('/api/locations')
      .then(response => response.json())
      .then(data => {
        setLocations(data);
      });
    countyWideRef.current.scrollTo(0,0);
  }, []);

  return (
    <div className="countyWide" ref={countyWideRef}>
      <Menu/>
      <Container id="countyWideContainer">
        <Row className="d-flex align-items-center">
          <Col>
            <h1>County Wide</h1>
          </Col>
          <Col id="dropdownColumn">
            <Dropdown id="sortDropdown">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Sort By: {sortBy}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSortBy("Alphabetical")}>Alphabetical</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy("Highest wait time")}>Highest wait time</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy("Closest to me")}>Closest to me</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row id="cardsContainer">
          {locations.map(location => (
            <Card className="countyWideCard text-center">
              <a href={"#/location/" + location.id}>
                <Card.Header>{location.name}</Card.Header>
                <Card.Body>
                  <Card.Title><h1>24</h1></Card.Title>
                  <Card.Text>
                    minutes
                  </Card.Text>
                </Card.Body>
              </a>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default CountyWide;
