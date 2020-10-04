import './Search.css';
import Popup from "../popup/Popup";
import React, {useState} from 'react';
import {Form, Container, ListGroup} from "react-bootstrap";


function Search(props) {
    const [hidden,setHidden] = useState(true);
    const [data] = useState(props.places);
    const [filteredData,setFilteredData] = useState(data);

    function handleSearch(e){
      let searchText = e.target.value.toLowerCase();
      if (searchText !== "") {
        setHidden(false);
      } else {
        setHidden(true);
      }
      var newData = data.filter(text => text.includes(searchText));
      setFilteredData(newData);
    }

    return (
      <Container id={"search"}>
          <h2 id={"searchTitle"}>Search for your polling place</h2>
          <div className="searchdrop">
              <Form>
                  <Form.Control id="searchBar" size="lg" type="search" placeholder="Select a location" onChange={handleSearch} onClick={() => setHidden(!hidden)}/>
              </Form>
          </div>
          { !hidden &&
            <div id="dropdown">
              <ListGroup id={"searchLocationsGroup"}>
                { filteredData.length > 0
                  ? filteredData.map((place, i) => (
                      <ListGroup.Item className="searchResult" action href={"#/location/" + place} key={place} tabindex={i+1}>
                        <h5>{place}</h5>
                        <p>{place}</p>
                      </ListGroup.Item>
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