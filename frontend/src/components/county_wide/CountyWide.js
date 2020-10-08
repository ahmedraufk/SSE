import React, {useEffect, useRef, useState} from 'react';
import './CountyWide.css';
import Menu from "../menu/Menu";
import {Dropdown, Container, Row, Col, Card, Button, Form, ListGroup} from "react-bootstrap";


function CountyWide() {

  const [locations, setLocations] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetical");
  const countyWideRef = useRef(null); // DOM element to render map


  const [data, setData] = useState(null);
  const [filteredData,setFilteredData] = useState(null);



  useEffect(() => {
    fetch('/api/locations')
      .then(response => response.json())
      .then(location => {

        setData(location);
        setFilteredData(location);
      })

    countyWideRef.current.scrollTo(0,0);

  }, []);

  function handleSearch(e){
    let searchText = e.target.value.toLowerCase();

    var newData = data.filter(location => match(searchText, location.name, location.address));
    console.log(newData)
    setFilteredData(newData);

  }
  function match(filter, name, address) {
    let nameMatch = name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    let addressMatch = address.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    if (nameMatch || addressMatch) {
      return true;
    } else {
      return false;
    }
  }

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
                {/*//write custom function - sortCards*/}
                <Dropdown.Item onClick={() => setSortBy("Alphabetical")}>Alphabetical</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy("Highest wait time")}>Highest wait time</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Form.Control id="searchBar" size="lg" type="search" placeholder="Select a location" onChange={handleSearch}/>
        </Row>
        <Row id="cardsContainer">
          {/*Have the cards be arranged by categories.*/}
          {filteredData != null ? filteredData.map(location => (
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
          ))
            : <h5 id="noLocationsFound">No locations found.</h5>
          }
        </Row>
      </Container>
    </div>
  );
}

export default CountyWide;
