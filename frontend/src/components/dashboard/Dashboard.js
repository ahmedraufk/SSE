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
        setReportData(data);
        setSelectedLocation(id - 1);
      });
  }

  return (
    <div className="dashboard">
      <Menu showDropdown={true}/>
      { showDashboard
        ? <div className="container-fluid">
            <Row>
            <Col className="col-md-3 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <Nav className="flex-column">
                  <h5 className="d-flex px-3 mt-2 justify-content-start">Locations</h5>
                  { reportData.map((location, i) => (
                    <Nav.Link className="dashLocationLink" key={location.id} tabIndex={i + 1} onClick={() => loadReports(location.id)}>
                      {location.name}
                    </Nav.Link>
                  ))
                  }
                </Nav>
              </div>
            </Col>
            <Col className="col-md-9 ml-sm-auto col-md-9 pt-3 px-4">
              { reportData.length > 0
                ? <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
                    <h4 className="dashboard-location-name">{reportData[selectedLocation].name}</h4>
                    <Button variant="danger" type="submit" onClick={() => logout()}>
                      Logout
                    </Button>
                  </div>
                : <h4 className="mt-2 mb-4">Select a location.</h4>
              }
              <Table striped bordered hover size="sm" id="reportsTable">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Parsed Time</th>
                    <th>Original Time</th>
                  </tr>
                </thead>
                <tbody>
                  { reportData.length > 0
                    ? reportData[selectedLocation].reports.map((report, i) => (
                      <tr key={report.id} tabIndex={i+1}>
                        <td>{new Date(report.timestamp).toLocaleTimeString()}</td>
                        <td>{report.parsed_time}</td>
                        <td>{report.original_time}</td>
                      </tr>
                    ))
                    : <tr><td>No selection made</td></tr>
                  }
                </tbody>
              </Table>
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
