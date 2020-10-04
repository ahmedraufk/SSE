import React, {useEffect, useState} from 'react';
import "./Home.css";
import Search from "../search/Search";
import {Container, Col, Row} from "react-bootstrap";
import headerImage from '../../res/img/sociallyDistantVoters.svg'

function Home(props) {

    const[data,setData] = useState(['adam','grace','ellen', 'michael', 'michaela', 'bea', 'mike']);

    useEffect(() => {
        fetch('/api/polling')
            .then(response => response.json())
            .then(data => {
                setData(data);
            });
    }, []);

    return (
        <div className="home">
            <div id={"header"}>
              <Container>
                <Row className="d-flex align-items-center">
                  <Col md={6}>
                    <img className={"img-fluid"} src={headerImage} alt={'Graphic showing socially distant voters'}/>
                  </Col>
                  <Col id="headerTextColumn" md={6}>
                    <h1>Welcome to the Fulton County voter wait time portal!</h1>
                  </Col>
                </Row>
              </Container>
            </div>
            <Search places={data}/>
        </div>
    );
}

export default Home;
