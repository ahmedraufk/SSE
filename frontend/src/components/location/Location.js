import React, {useState, useRef, useEffect} from 'react';
import './Location.css';
import Menu from "../menu/Menu";
import {Badge, Col, Container, Row, Table, Alert,Button} from "react-bootstrap";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = "pk.eyJ1IjoibWljaGFlbC1rMTAxIiwiYSI6ImNqajBkMXNmbDBnbzAza2x6Mnp1Mjl5YWIifQ.K5e1fvORu0_ZfSPH4cGlNA"

function Location(props) {
  const [location, setLocation] = useState({});
  const mapboxElRef = useRef(null); // DOM element to render gmap
  const lat = 33.7552
  const long = -84.3803
  useEffect(() => {
    // You can store the gmap instance with useRef too
    const map = new mapboxgl.Map({
      container: mapboxElRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-84.3803, 33.7552], // initial geo location
      zoom: 10 // initial zoom
    });

    // Add navigation controls to the top right of the canvas
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());
  //   gmap.addControl(
  //     new MapboxDirections({
  //       accessToken: mapboxgl.accessToken
  //     }),
  //     'top-left'
  //   );
    var marker = new mapboxgl.Marker()
        .setLngLat([-84.3803,33.7552])
        .addTo(map);

    fetch('/api/locations/' + props.match.params.location_id)
      .then(response => response.json())
      .then(data => {
        setLocation(data[0]);
      });
  }, []);

  return (
    <div className="location">
      <Menu/>
      <Container id="locationContainer">
        <Row>
          <Col lg={4}>
            <h2 id="locationName">{location.name}</h2>
            <h6 id="locationAddress">{location.address}</h6>
            <div id="map" ref={mapboxElRef}></div>
            <Button variant="secondary" href={"https://www.google.com/maps/dir/?api=1&destination="+lat+","+long} target="_blank" size = "lg" block>Directions</Button>{' '}
          </Col>
          <Col lg={4}>
            <h5>Current Times</h5>
            <div className="waitTimesCard">
              <h6>Current wait time</h6>
              <h1 id="timeLabel">24</h1>
              <h6>minutes</h6>
              <p id="lastUpdatedLabel">Last updated:</p>
            </div>
            <div className="waitTimesCard">
              <h4><Badge variant="success">Lowest Today</Badge></h4>
              <div>
                <h3>30-45 minutes</h3>
                <p>at 9:30 AM</p>
              </div>
            </div>
            <div className="waitTimesCard">
              <h4><Badge variant="danger">Highest Today</Badge></h4>
              <div>
                <h3>15-30 minutes</h3>
                <p>at 8:15 AM</p>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <h5>Predicted Times</h5>
            <Table bordered id="predictedTimes">
              <tbody>
                <tr>
                  <td>8AM - 9AM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>9AM - 10AM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>10AM - 11AM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>11AM - 12PM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>12PM - 1PM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>1PM - 2PM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>2PM - 3PM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>3PM - 4PM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>4PM - 5PM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>5PM - 6PM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>6PM - 7PM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>7PM - 8PM</td>
                  <td>15 mins</td>
                </tr>
              </tbody>
            </Table>
            <Alert variant="warning">Polls close at 8 PM.</Alert>
            <Alert variant="info">
              <Alert.Link href="#/FAQ">How was this data calculated?</Alert.Link>
            </Alert>
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default Location;
