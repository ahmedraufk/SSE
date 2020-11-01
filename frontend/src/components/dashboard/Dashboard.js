import React, {useEffect, useState} from 'react';
import {Table, Nav, Col, Row} from 'react-bootstrap';
import Menu from "../menu/Menu";
import './Dashboard.css';

function Dashboard() {

  const[selectedLocation, setSelectedLocation] = useState(0);
  const[reportData, setReportData] = useState([]);

  useEffect(() => {
    fetch('/api/reports')
      .then(response => response.json())
      .then(data => {
        setReportData(data);
      });
  }, []);

  function loadReports(id) {
    fetch('/api/reports')
      .then(response => response.json())
      .then(data => {
        setReportData(data);
        setSelectedLocation(id - 1);
      });
  }

  return (
    <div className="dashboard">
      <Menu showDropdown={true}/>
      <div className="container-fluid">
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
              ? <h4 className="mt-2 mb-4">{reportData[selectedLocation].name}</h4>
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
    </div>
  );
}

export default Dashboard;
