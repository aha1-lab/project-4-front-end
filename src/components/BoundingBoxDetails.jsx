import React from "react";
import { Card, Dropdown } from "react-bootstrap";

function BoundingBoxDetails({ box, classes }) {

  const handleClassChange = (event)=>{
      console.log(event.target.value)
  }
  return (
    <Card>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex flex-column">
          <span>
            ({box.x1},{box.y1}) ({box.x2},{box.y2})
          </span>
          <select onChange={handleClassChange}>
            <option></option>
            {classes.map((cls, index) => (
              <>
                <option key={index} href="#">
                  {cls}
                </option>
              </>
            ))}
          </select>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BoundingBoxDetails;
