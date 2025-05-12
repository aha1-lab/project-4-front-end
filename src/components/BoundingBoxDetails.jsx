import React from "react";
import { Card, Button } from "react-bootstrap";

function BoundingBoxDetails({ box, classes, handleUpdateBoxClass, boxIndex, deleteBox }) {

  const handleClassChange = (event)=>{
      const index = event.target.selectedIndex - 1;
      box.color = classes[index].color;
      handleUpdateBoxClass(boxIndex, index);
  }

  const handleDelete = ()=>{
    deleteBox(boxIndex);
  };

  return (
    <Card>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex flex-column">
          <span>
            ({box.x1},{box.y1}) ({box.x2},{box.y2})
          </span>
          <select onChange={handleClassChange} value={box.className}>
            <option></option>
            {classes.map((cls, index) => (
                <option key={index}>
                  {cls.name}
                </option>
            ))}
          </select>
        </div>
        <Button onClick={handleDelete}>🗑️</Button>
      </Card.Body>
    </Card>
  );
}

export default BoundingBoxDetails;
