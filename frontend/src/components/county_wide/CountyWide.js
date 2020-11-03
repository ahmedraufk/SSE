import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Dropdown, Container, Row, Col, Form, Alert} from "react-bootstrap";
import Menu from "../menu/Menu";
import './CountyWide.css';

function CountyWide() {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetical");
  const bucketMap = ["0-15 mins", "15-30 mins", "30 mins - 1 hr", "1-2 hrs", "2-4 hrs", "4+ hrs"]

  useEffect(() => {
    window.scrollTo(0,0);
    fetch('/api/locations')
      .then(response => response.json())
      .then(locations => {
        setLocations(locations);
        setFilteredLocations(locations);
      })
  }, []);

  function handleFilter(e){
    let searchText = e.target.value.toLowerCase();
    let newData = locations.filter(location => match(searchText, location.name, location.address));
    setFilteredLocations(newData);
  }

  function match(text, name, address) {
    let nameMatch = name.toLowerCase().indexOf(text.toLowerCase()) > -1;
    let addressMatch = address.toLowerCase().indexOf(text.toLowerCase()) > -1;
    return nameMatch || addressMatch;
  }

  function sortCards(sort){
    let sorted;
    switch (sort) {
      case "Alphabetical":
        sorted = filteredLocations.sort((a, b) => (a.name > b.name) ? 1 : -1);
        setFilteredLocations(sorted);
        setSortBy("Alphabetical");
        break;
      case "Highest wait time":
        sorted = filteredLocations.sort((a, b) => {
          if (a.currentTime === null) { return 1 }
          if (b.currentTime === null) { return -1 }
          return (a.currentTime.estimated_time < b.currentTime.estimated_time) ? 1 : -1
        });
        setFilteredLocations(sorted);
        setSortBy("Highest wait time");
        break;
      case "Lowest wait time":
        sorted = filteredLocations.sort((a, b) => {
          if (a.currentTime === null) { return 1 }
          if (b.currentTime === null) { return -1 }
          return (a.currentTime.estimated_time > b.currentTime.estimated_time) ? 1 : -1
        });
        setFilteredLocations(sorted);
        setSortBy("Lowest wait time");
        break;
      default:
        break;
    }
  }

  return (
    <div className="countyWide">
      <Menu pageLocation="countyWide" showDropdown={true}/>
      <Container id="countyWideContainer">
        <Row className="d-flex align-items-center">
          <Col sm={6}>
            <h1>County Wide</h1>
          </Col>
          <Col id="dropdownColumn" sm={6}>
            <Dropdown id="sortDropdown">
              <Dropdown.Toggle variant="success">
                Sort By: {sortBy}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => sortCards("Alphabetical")}>Alphabetical</Dropdown.Item>
                <Dropdown.Item onClick={() => sortCards("Lowest wait time")}>Lowest wait time</Dropdown.Item>
                <Dropdown.Item onClick={() => sortCards("Highest wait time")}>Highest wait time</Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Form.Control id="countyWideFilter"
                        size="lg"
                        type="search"
                        placeholder="Type to filter..."
                        onChange={handleFilter}/>
        </Row>
        <Row id="cardsContainer">
          { filteredLocations.length > 0
            ? filteredLocations.map(location => (
                <Link to={{
                  pathname: '/location',
                  location_id: location.id
                }} key={location.id} className="countyWideCard" >
                  <h6 id="nameLabel">{location.name}</h6>
                  <h6 id="addressLabel">{location.address}</h6>
                  { location.currentTime === null
                    ? <Alert variant={"secondary"} id="noreports">No reports.</Alert>
                    : new Date().getTime() - new Date(location.currentTime.timestamp).getTime() < (30 * 60 * 1000)
                      ? <div id="timeLabelContainer">
                          <h4 id="minutes">{bucketMap[location.currentTime.estimated_time-1]}</h4>
                        </div>
                      : <Alert variant={"secondary"} id="noreports">No reports.</Alert>
                  }
                </Link>
              ))
            : <h5 id="countyWideNoLocationsFound">No locations found.</h5>
          }
        </Row>
      </Container>
    </div>
  );
}

export default CountyWide;
