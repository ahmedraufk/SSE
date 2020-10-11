import React, {useState, useRef, useEffect} from 'react';
import {Badge, Button, Col, Container, Row} from "react-bootstrap";
import Menu from "../menu/Menu";
import mapboxgl from 'mapbox-gl';
import Chart from "chart.js";
import gmapsLogo from '../../res/img/googleMaps.png';
import './Location.css';

mapboxgl.accessToken = "pk.eyJ1IjoibWljaGFlbC1rMTAxIiwiYSI6ImNqajBkMXNmbDBnbzAza2x6Mnp1Mjl5YWIifQ.K5e1fvORu0_ZfSPH4cGlNA"

function Location(props) {
  const [location, setLocation] = useState({});
  const mapboxElRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    let locationId = localStorage.getItem("location_id");
    if (typeof props.location.location_id !== "undefined") {
      localStorage.setItem("location_id", props.location.location_id);
      locationId = localStorage.getItem("location_id");
    }

    fetch('/api/locations/' + locationId)
      .then(response => response.json())
      .then(data => {
        setLocation(data[0]);
        const map = new mapboxgl.Map({
          container: mapboxElRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [data[0].lon, data[0].lat],
          zoom: 12
        });
        map.addControl(new mapboxgl.NavigationControl());
        new mapboxgl.Marker()
          .setLngLat([data[0].lon, data[0].lat])
          .addTo(map);
      });

    const myChartRef = chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: ['8-9 AM', '9-10 AM', '10-11 AM', '11-12 PM', '12-1 PM', '1-2 PM', '2-3 PM', '3-4 PM', '4-5 PM', '5-6 PM', '6-7 PM', '7-8 PM'],
        datasets: [{
          label: 'Today\'s Wait Times',
          data: [12, 19, 3, 5, 2, 3, 9, 10, 11, 12, 13, 14],
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
  }, [props.location.location_id]);

  return (
    <div className="location">
      <Menu pageLocation="location"/>
      <Container id="locationContainer">
        <Row>
          <Col lg={6}>
            <h2 id="locationName">{location.name}</h2>
            <h6 id="locationAddress">{location.address}</h6>
            <div id="map" ref={mapboxElRef}/>
            <Button size="lg"
                    id="directionsButton"
                    variant="light"
                    href={"https://www.google.com/maps/dir/?api=1&destination="+location.lat+","+location.lon}
                    target="_blank">
              <img className="img-fluid" id="gmapsLogo" src={gmapsLogo} alt="Google maps logo"/>
              Get Directions
            </Button>
          </Col>
          <Col lg={6}>
            <div className="waitTimesCard">
              <h4><Badge variant="primary">Current Wait Time</Badge></h4>
              <h1>24 minutes</h1>
              <p id="lastUpdatedLabel">Last updated: Today at 9:45 AM</p>
            </div>
            <div className="waitTimesCard">
              <Row>
                <Col>
                  <h4><Badge variant="success">Lowest Today</Badge></h4>
                  <div>
                    <h3>30 minutes</h3>
                    <p>at 9:30 AM</p>
                  </div>
                </Col>
                <Col>
                  <h4><Badge variant="danger">Highest Today</Badge></h4>
                  <div>
                    <h3>45 minutes</h3>
                    <p>at 8:15 AM</p>
                  </div>
                </Col>
              </Row>
            </div>
            <canvas id="myChart" ref={chartRef}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Location;
