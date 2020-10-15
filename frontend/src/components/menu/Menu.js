import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Container, Nav, Navbar, FormControl, Dropdown} from "react-bootstrap";
import sociallyDistantVoters from '../../res/img/sociallyDistantVoters.svg';
import './Menu.css';

function Menu(props) {
  const pageLocation = props.pageLocation
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    fetch('/api/locations')
      .then(response => response.json())
      .then(locations => {
        setLocations(locations);
        setFilteredLocations(locations);
      })
  }, []);

  function reloadLocation(location_id) {
    localStorage.setItem("location_id", location_id);
    window.location.reload();
  }

  function handleSearch(e) {
    let searchText = e.target.value.toLowerCase();
    let newData = locations.filter(location => match(searchText, location.name, location.address));
    setFilteredLocations(newData);
  }

  function match(text, name, address) {
    let nameMatch = name.toLowerCase().indexOf(text.toLowerCase()) > -1;
    let addressMatch = address.toLowerCase().indexOf(text.toLowerCase()) > -1;
    return nameMatch || addressMatch;
  }

  return (
    <Navbar collapseOnSelect expand="md" id="menu" variant ="dark">
      <Navbar.Brand>
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
          <Nav.Link href="#/" className="menuLink"><i className="fas fa-home"/>Home</Nav.Link>
          <Nav.Link href="#/countyWide" className="menuLink"><i className="far fa-building"/>County Wide</Nav.Link>
          <Nav.Link href="#/faq" className="menuLink"><i className="far fa-question-circle"/>FAQs</Nav.Link>
        </Nav>
        <Dropdown>
          <Dropdown.Toggle variant="light">
            Select a location
          </Dropdown.Toggle>

          <Dropdown.Menu id="menuDropdownMenu">
            <Container>
              <FormControl
                autoFocus
                placeholder="Type to filter..."
                onChange={handleSearch}
                id="dropdownMenuFilter"
              />
              { filteredLocations.length > 0 && pageLocation !== "location" &&
                filteredLocations.map(location => (
                  <Dropdown.Item as={Link} className="dropdownItem"
                     key={location.id} to={{
                       pathname: '/location',
                       location_id: location.id
                     }}>
                    <h6 className="dropdownName">{location.name}</h6>
                    <p className="dropdownAddress">{location.address}</p>
                  </Dropdown.Item>
                ))
              }
              { filteredLocations.length > 0 && pageLocation === "location" &&
                filteredLocations.map(location => (
                  <Dropdown.Item as={Link} className="dropdownItem" onClick={() => reloadLocation(location.id)}
                       key={location.id} to="#/location">
                    <h6 className="dropdownName">{location.name}</h6>
                    <p className="dropdownAddress">{location.address}</p>
                  </Dropdown.Item>
                ))
              }
              { filteredLocations.length < 1 &&
                <Dropdown.Item>
                  <h6 id="menuNoLocationsFound">No locations found.</h6>
                </Dropdown.Item>
              }
            </Container>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Menu;
