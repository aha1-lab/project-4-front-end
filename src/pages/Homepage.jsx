import { useContext, useEffect, useState } from "react";
import { authContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router";
import Annotator from "../components/Annotator";
import img from "../assets/plyfly.jpg";
import { Button, Row, Col } from "react-bootstrap";
import BoundingBoxDetails from "../components/BoundingBoxDetails";

function Homepage() {
  const [boxesList, setBoxesList] = useState([]);
  const classes = ["wheel","steering"];
  return (
    <div>
      <Row>
        <div className="mt-auto">
          <div
            className="d-flex align-items-center flex-column"
            style={{ gap: "0.5rem" }}
          >
            <div
              className="d-flex align-items-center justify-conten-center"
              style={{ gap: "0.5rem" }}
            >
              <Button size="lg" variant="outline-light">
                ⬅️
              </Button>
              <Button size="lg" variant="outline-light">
                ➡️
              </Button>
            </div>
          </div>
        </div>
      </Row>
      <Row>
        <Col sm={9}>
          <Annotator sourceImage={img} boxesList={boxesList} setBoxesList={setBoxesList}/>
        </Col>
        <Col sm={3}>
          <div style={{ border: "2px solid red" }} />
          {boxesList.map((box, index) => (
            <div key={index}>
              <BoundingBoxDetails box={box} classes={classes} />
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
}

export default Homepage;
