import React from 'react';
import Menu from '../menu/Menu';
import "./Home.css";
import SearchDrop from "../searchdrop/Searchdrop";
import {Container,Col, Row,Button} from "react-bootstrap";

function Home() {

    return (
        <div className="home">
            <Menu />
            <Container id="header">
                <Row>
                    <Col md={{ span: 5, offset: 5}}>
                        <h1 id="headtext">Welcome to the Fulton County voter wait time portal!</h1>
                    </Col>
                </Row>
            </Container>
            <Container id="searchtitle">
                <Row id="h2text">
                    <h2>
                        Search for your polling place
                    </h2>
                </Row>

                <Row>
                    <SearchDrop />
                </Row>
                <Row>
                   <Col>
                       <Button variant="primary">Search</Button>{' '}
                   </Col>
                    <Col>
                        <Button variant="primary">I don't know my polling place</Button>{' '}
                    </Col>
                </Row>

            </Container>

        </div>
    );
}

export default Home;
