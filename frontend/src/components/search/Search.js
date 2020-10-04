import './Search.css';
import Popup from "../popup/Popup";
import React, {useState} from 'react';
import {Form, Container, ListGroup, ListGroupItem} from "react-bootstrap";


function Search(props) {
    const [hidden,setHidden] = useState(true);
    const [hasText, setHasText] = useState(false);
    const [data] = useState(props.places);
    const [filteredData,setFilteredData] = useState([]);

    function handleSearch(e){
      let searchText = e.target.value.toLowerCase();
      if (searchText !== "") {
        setHidden(false);
        setHasText(true);
      } else {
        setHidden(true);
        setHasText(false);
      }
      var newData = data.filter(text => text.includes(searchText));
      setFilteredData(newData);
    }

    return (
      <Container id={"search"}>
          <h2 id={"searchTitle"}>Search for your polling place</h2>
          <div className="searchdrop">
              <Form>
                  <Form.Control id="searchBar" size="lg" type="search" placeholder="Select a location" onChange={handleSearch} />
              </Form>
          </div>
          { hasText &&
            <div id="dropdown">
              <ListGroup id={"searchResultsGroup"}>
                { filteredData.length > 0
                  ? filteredData.map(place => (
                      <ListGroupItem className="searchResult" action href={"#/info/" + place} key={place}>
                        <h5>{place}</h5>
                        <p>{place}</p>
                      </ListGroupItem>
                    ))
                  : <ListGroupItem>No results found.</ListGroupItem>
                }
              </ListGroup>
            </div>
          }
          <Popup />
      </Container>
    );
}

export default Search;