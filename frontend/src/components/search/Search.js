import './Search.css';
import Popup from "../popup/Popup";
import React, { useState, useEffect } from 'react';
import { Form, Container, ListGroup } from "react-bootstrap";
import {Link} from "react-router-dom";


function Search(props) {
    const [hidden,setHidden] = useState(true);
    const [data, setData] = useState(null);
    const [filteredData,setFilteredData] = useState(null);

    useEffect(() => {
      setData(props.locations);
      setFilteredData(props.locations)
    }, [props.locations]);

    function handleSearch(e) {
      let searchText = e.target.value.toLowerCase();
      if (searchText !== "") {
        setHidden(false);
      } else {
        setHidden(true);
      }
      let newData = data.filter(location => match(searchText, location.name, location.address));
      setFilteredData(newData);
    }

    function match(text, name, address) {
      let nameMatch = name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      let addressMatch = address.toLowerCase().indexOf(text.toLowerCase()) > -1;
      return nameMatch || addressMatch;
    }

    return (
      <Container id={"search"}>
          <h2 id={"searchTitle"}>Search for your polling place</h2>
          <div className="searchdrop">
              <Form>
                  <Form.Control id="searchBar" size="lg" type="search" placeholder="Select a location" label="Search box" onChange={handleSearch} onClick={() => setHidden(!hidden)}/>
              </Form>
          </div>
          { !hidden &&
            <div id="dropdown">
              <ListGroup id={"searchLocationsGroup"}>
                { filteredData.length > 0
                  ? filteredData.map((location, i) => (
                      <Link to={{
                        pathname: '/location',
                        location_id: location.id
                      }} className="searchLink" key={location.id}>
                        <ListGroup.Item className="searchResult" action key={location.id} tabIndex={i+1}>
                          <h5>{location.name}</h5>
                          <p>{location.address}</p>
                        </ListGroup.Item>
                      </Link>
                    ))
                  : <ListGroup.Item><h5 id="noLocationsFound">No locations found.</h5></ListGroup.Item>
                }
              </ListGroup>
            </div>
          }
          <Popup />
      </Container>
    );
}

export default Search;