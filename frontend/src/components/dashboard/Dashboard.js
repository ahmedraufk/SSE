import React, {useEffect, useState} from 'react';
import {Table, Nav, Col, Row, Form, Button, Container, Alert} from 'react-bootstrap';
import Menu from "../menu/Menu";
import './Dashboard.css';

function Dashboard() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [reportData, setReportData] = useState([]);
  const [locationData, setLocationData] = useState(reportData[selectedLocation]);
  const [loginFailed, setLoginFailed] = useState(false);
  const loginData = {"username": username, "password": password};

  useEffect(() => {
    if (username != null && password != null) {
      login()
    }
  }, []);

  function login() {
    if (username !== null && password !== null) {
      fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === "error") {
            setLoginFailed(true);
          } else {
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            setLoginFailed(false);
            setShowDashboard(true);
            setReportData(data);
          }
        });
    } else {
      setLoginFailed(true);
    }
  }

  function logout() {
    localStorage.clear();
    setLoginFailed(false);
    setShowDashboard(false);
    setUsername(null);
    setPassword(null);
    setReportData([]);
  }

  function handleChange(e) {
    let type = e.target.placeholder;
    let text = e.target.value.toString().trim();
    if (type === "Username") {
      setUsername(text);
    }
    if (type === "Password") {
      setPassword(text);
    }
    if (e.target.value === "") {
      if (type === "Username") {
        setUsername(null);
      }
      if (type === "Password") {
        setPassword(null);
      }
    }
  }

  function loadReports(id) {
    fetch('/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === id) {
            setSelectedLocation(i);
            setLocationData(data[i]);
          }
        }
      });
  }

  return (
    <div className="dashboard">
      <Menu showDropdown={true}/>
      { showDashboard
        ? <div className="container-fluid">
            <Row>
            <Col className="col-md-3 d-none d-md-block bg-light sidebar">
              <Nav className="flex-column">
                <h5 className="d-flex px-3 mt-4 justify-content-start">Locations</h5>
                { reportData.map((location, i) => (
                  <Nav.Link className="dashLocationLink" key={location.id} tabIndex={i + 1} onClick={() => loadReports(location.id)}>
                    {location.name}
                  </Nav.Link>
                ))
                }
              </Nav>
            </Col>
            <Col className="col-md-9 ml-sm-auto col-md-9 pt-3 px-4">
              { locationData !== null && typeof locationData !== "undefined"
                ? <div>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
                      <h4 className="dashboard-location-name">{locationData.name}</h4>
                      <Button variant="danger" type="submit" onClick={() => logout()}>
                        Logout
                      </Button>
                    </div>
                    { locationData.reports.length > 0
                      ? <Table striped bordered hover size="sm" id="reportsTable">
                          <thead>
                          <tr>
                            <th>Time</th>
                            <th>Parsed Time</th>
                            <th>Original Time</th>
                          </tr>
                          </thead>
                          <tbody>
                          { locationData.reports.map((report, i) => (
                              <tr key={report.id} tabIndex={i + 1}>
                                <td>{new Date(report.timestamp).toLocaleTimeString()}</td>
                                <td>{report.parsed_time}</td>
                                <td>{report.original_time}</td>
                              </tr>
                            ))
                          }
                          </tbody>
                        </Table>
                      : <Alert variant={"secondary"}>No reports for this location.</Alert>
                    }
                      </div>
                : <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
                    <h4 className="dashboard-location-name">Select a location.</h4>
                    <Button variant="danger" type="submit" onClick={() => logout()}>
                      Logout
                    </Button>
                  </div>
              }
              </Col>
            </Row>
          </div>
        : <Container id={"dashboard-login"}>
            <h3>Dashboard Login</h3>
            <hr/>
            <Form>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" required onChange={handleChange}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required onChange={handleChange}/>
              </Form.Group>
              { loginFailed &&
                <Alert variant={"danger"}>Your username or password is incorrect.</Alert>
              }
              <Button variant="success" onClick={() => login()}>
                Login
              </Button>
            </Form>
          </Container>
      }
    </div>
  );
}

export default Dashboard;
