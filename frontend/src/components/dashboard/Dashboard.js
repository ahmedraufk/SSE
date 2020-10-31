import React, {useEffect, useRef, useState} from 'react';
import {Accordion, Table, Card, Button, Container, ListGroup,Col,Row} from 'react-bootstrap';
import Menu from "../menu/Menu";
import './Dashboard.css';
import {Link} from "react-router-dom";
import Chart from "chart.js";


function Dashboard() {

    const[data,setData] = useState([]);
    const[rdata,setRData] = useState([]);
    const[filteredData,setFilteredData] = useState([]);
    const chartRef = useRef(null);


    useEffect(() => {
        window.scrollTo(0,0);
        fetch('/api/locations')
            .then(response => response.json())
            .then(data => {
                setData(data);
            });

        fetch('/api/reports')
            .then(response => response.json())
            .then(rdata => {
                setRData(rdata);
                setFilteredData(rdata);
            });

        const myChartRef = chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: 'line',
            data: {
                labels: ['8-9 AM', '9-10 AM', '10-11 AM', '11-12 PM', '12-1 PM', '1-2 PM', '2-3 PM', '3-4 PM', '4-5 PM', '5-6 PM', '6-7 PM', '7-8 PM'],
                datasets: [{
                    label: 'Today\'s Wait Times',
                    data:filteredData.filter(report => report.parsed_time)[3]
                    ,
                    backgroundColor: [
                        'rgba(21, 75, 125, 0.3)',
                        'rgba(21, 75, 125, 0.3)',
                        'rgba(21, 75, 125, 0.3)',
                        'rgba(21, 75, 125, 0.3)',
                        'rgba(21, 75, 125, 0.3)',
                        'rgba(21, 75, 125, 0.3)',
                        'rgba(21, 75, 125, 0.3)',
                        'rgba(21, 75, 125, 0.3)',
                        'rgba(21, 75, 125, 0.3)',
                        'rgba(21, 75, 125, 0.3)',
                        'rgba(21, 75, 125, 0.3)',
                        'rgba(21, 75, 125, 0.3)'
                    ],
                    borderColor: [
                        'rgba(21, 75, 125, 1)',
                        'rgba(21, 75, 125, 1)',
                        'rgba(21, 75, 125, 1)',
                        'rgba(21, 75, 125, 1)',
                        'rgba(21, 75, 125, 1)',
                        'rgba(21, 75, 125, 1)',
                        'rgba(21, 75, 125, 1)',
                        'rgba(21, 75, 125, 1)',
                        'rgba(21, 75, 125, 1)',
                        'rgba(21, 75, 125, 1)',
                        'rgba(21, 75, 125, 1)',
                        'rgba(21, 75, 125, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true

                        }
                    }]
                }
            }
        });
    }, []);



    function handleSearch(e) {
        let id = parseInt(e.target.innerText);


        let newD = rdata.filter(report => match(id,report.location_id));
        setFilteredData(newD);
    }
    function match(id,location_id) {
       return id === location_id;
    }

    return (

        <div className="dashTable">
            <Menu showDropdown={true}/>
            <Container fluid className="dashTableContainer">

                <Row>

                <Col id="locationTable" >
                    <div className="overflow-auto">

                <Table striped bordered hover >
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Location</th>

                    </tr>
                    </thead>
                    <tbody>
                    { data.length > 0
                        ? data.map((location, i) => (

                            <tr className="searchResult" key={location.id} tabIndex={i+1}>
                                <th onClick={handleSearch}> <p>{location.id}</p></th>
                                <th>{location.name}</th>
                            </tr>

                        ))  : <ListGroup.Item><h5 id="noLocationsFound">No locations found.</h5></ListGroup.Item>
                    }
                    </tbody>
                </Table>
                    </div>
                </Col>
                <Col xs ={8}>
                    <Row>
                        <canvas id="myChart" ref={chartRef}/>
                    </Row>
                        <Row>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Time Stamp</th>
                                    <th>Parsed Time</th>
                                    <th>Original Time</th>


                                </tr>
                                </thead>
                                <tbody>
                                { filteredData.length > 0
                                    ? filteredData.map((report, i) => (

                                        <tr className="searchResult" key={report.id} tabIndex={i+1}>
                                            <th>{report.timestamp}</th>
                                            <th>{report.parsed_time}</th>
                                            <th>{report.original_time}</th>


                                        </tr>

                                    ))  : <ListGroup.Item><h5 id="noLocationsFound">No selection made</h5></ListGroup.Item>
                                }


                                </tbody>
                            </Table>
                        </Row>


                </Col>

                </Row>

            </Container>
        </div>
    );
}

export default Dashboard;
