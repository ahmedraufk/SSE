
const app = require("../app.js");
const db = require('../db');
const hikesData = require('./data/hikes.json');
const http = require('http');
const newHike = require('./data/new_hike.json');
const request = require('supertest');
const testData = require('./data/test_data.json');

describe("Test the hikes routes", () => {
  let server;

  beforeAll(done => {
    db.query(testData["hike1"]);
    db.query(testData["hike2"]);
    db.query(testData["feature1"]);
    db.query(testData["feature2"]);
    done();
  });

  afterAll(done => {
    db.query("DELETE FROM hikes;");
    db.query("DELETE FROM features;");
    db.query("ALTER TABLE hikes AUTO_INCREMENT = 1;");
    db.query("ALTER TABLE features AUTO_INCREMENT = 1;");
    db.end()
    done()
  });

  beforeEach((done) => {
    server = http.createServer(app);
    server.listen(done);
  });
  
  afterEach((done) => {
    server.close(done)
  });

  it("should retrieve all hikes", (done) => { 
    return request(app)
      .get("/api/hikes")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(hikesData);
        done();
      });
  });

  it("should retrieve hike with id = 1", (done) => { 
    return request(app)
      .get("/api/hikes/1")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual([hikesData[0]]);
        done();
      });
  });

  it("should create a new hike", (done) => { 
    return request(app)
      .post("/api/hikes")
      .send(testData["new_hike"])
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body[0]["data"]).toStrictEqual(newHike);
        done();
      });
  });

});

