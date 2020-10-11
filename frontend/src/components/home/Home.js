import React, {useEffect, useState} from 'react';
import {Container, Col, Row} from "react-bootstrap";
import Menu from "../menu/Menu";
import Search from "../search/Search";
import headerImage from '../../res/img/sociallyDistantVoters.svg'
import "./Home.css";

function Home() {
    const[data,setData] = useState([]);

    useEffect(() => {
        fetch('/api/locations')
            .then(response => response.json())
            .then(data => {
                setData(data);
            });
    }, []);

    return (
        <div className="home">
          <Menu/>
            <div id="header">
              <Container>
                <Row className="d-flex align-items-center">
                  <Col md={6}>
                    <img className="img-fluid" src={headerImage} alt="Graphic showing socially distant voters"/>
                  </Col>
                  <Col id="headerTextColumn" md={6}>
                    <h1>Welcome to the Fulton County voter wait time portal!</h1>
                  </Col>
                </Row>
              </Container>
            </div>
            <Search locations={data}/>
        </div>
    );
}

export default Home;
