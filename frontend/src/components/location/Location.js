import React, {useState, useRef, useEffect} from 'react';
import {Badge, Button, Col, Container, Row} from "react-bootstrap";
import Menu from "../menu/Menu";
import mapboxgl from 'mapbox-gl';
import gmapsLogo from '../../res/img/googleMaps.png';
import './Location.css';

mapboxgl.accessToken = "pk.eyJ1IjoibWljaGFlbC1rMTAxIiwiYSI6ImNqajBkMXNmbDBnbzAza2x6Mnp1Mjl5YWIifQ.K5e1fvORu0_ZfSPH4cGlNA"

function Location(props) {
  const [location, setLocation] = useState({});
  const [dataAge, setDataAge] = useState(null);
  const [lowestTime, setLowestTime] = useState(null);
  const [highestTime, setHighestTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const mapboxElRef = useRef(null);
  const bucketMap = ["15-30 mins", "30 mins - 1 hr", "1-2 hrs", "2-4 hrs", "4+ hrs"]

  useEffect(() => {
    window.scrollTo(0,0);
    let locationId = localStorage.getItem("location_id");
    if (typeof props.location.location_id !== "undefined") {
      localStorage.setItem("location_id", props.location.location_id);
      locationId = localStorage.getItem("location_id");
    }

    fetch('/api/locations/' + locationId)
      .then(response => response.json())
      .then(data => {
        setLocation(data);
        if (data.currentTime !== null) {
          setDataAge(new Date(data.currentTime.timestamp).getTime());
        }
        setLowestTime(data.lowestTime);
        setHighestTime(data.highestTime);
        setCurrentTime(data.currentTime);
        const map = new mapboxgl.Map({
          container: mapboxElRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [data.lon, data.lat],
          zoom: 12
        });
        map.addControl(new mapboxgl.NavigationControl());
        new mapboxgl.Marker()
          .setLngLat([data.lon, data.lat])
          .addTo(map);
      });
  }, [props.location.location_id]);

  return (
    <div className="location">
      <Menu pageLocation="location" showDropdown={true}/>
      <Container id="locationContainer">
        <Row>
          <Col lg={12}>
            <h2 id="locationName">{location.name}</h2>
            <h6 id="locationAddress">{location.address}</h6>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
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
            { new Date().getTime() - dataAge < (30 * 60 * 1000) && currentTime != null
              ? <div className="waitTimesCard">
                  <h4><Badge variant="primary">Current Wait Time</Badge></h4>
                  <h1>{bucketMap[currentTime.estimated_time-1]}</h1>
                  <p id="lastUpdatedLabel">Last updated: Today at {new Date(dataAge).toLocaleTimeString(navigator.language, {hour: 'numeric', minute:'numeric'})}</p>
                </div>
              : <div className="waitTimesCard">
                <h4><Badge variant="primary">Current Wait Time</Badge></h4>
                <h1>Not enough data.</h1>
                  <p id="lastUpdatedLabel">More reports have to be made at this location to provide an accurate wait time.</p>
                </div>
            }
            <div className="waitTimesCard">
              <Row>
                <Col>
                  <h4><Badge variant="success">Lowest Today</Badge></h4>
                  { lowestTime !== null && typeof lowestTime !== "undefined"
                    ? <div>
                        <h3>{bucketMap[lowestTime.estimated_time-1]}</h3>
                        <p>at {new Date(lowestTime.timestamp).toLocaleTimeString(navigator.language, {hour: 'numeric', minute:'numeric'})}</p>
                      </div>
                    : <div>
                        <h3>No reports.</h3>
                        <p>No reports have been made yet.</p>
                      </div>
                  }
                </Col>
                <Col>
                  <h4><Badge variant="danger">Highest Today</Badge></h4>
                  { highestTime !== null && typeof highestTime !== "undefined"
                    ? <div>
                      <h3>{bucketMap[highestTime.estimated_time-1]}</h3>
                      <p>at {new Date(highestTime.timestamp).toLocaleTimeString(navigator.language, {hour: 'numeric', minute:'numeric'})}</p>
                    </div>
                    : <div>
                      <h3>No reports.</h3>
                      <p>No reports have been made yet.</p>
                    </div>
                  }
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Location;
