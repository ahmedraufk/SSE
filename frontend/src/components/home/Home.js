import React, {useEffect, useState} from 'react';
import "./Home.css";
import Popup from "../popup/Popup";
import SearchDrop from "../searchdrop/Searchdrop";
import {Container,Col, Row,Button} from "react-bootstrap";

function Home(props) {

    const[data,setData] = useState(['a','b','c']);

    useEffect(() => {
        fetch('/api/polling/')
            .then(response => response.json())
            .then(data => {
                setData(data[0]);
            });
    }, []);
    return (
        <div className="home">
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
                    <SearchDrop values = {data}/>
                </Row>
                <Row>
                   <Col>

                   </Col>
                    <Col>
                        <Popup />
                    </Col>
                </Row>

            </Container>

        </div>
    );
}

export default Home;
