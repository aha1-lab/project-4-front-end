import React from "react";
import { Card, Button } from "react-bootstrap";

function BoundingBoxDetails({
  box,
  classes,
  handleUpdateBoxClass,
  boxIndex,
  deleteBox,
}) {
  const handleClassChange = (event) => {
    const classId = event.target.value;
    box.color = "red";
    handleUpdateBoxClass(boxIndex, classId);
  };
  const handleDelete = () => {
    deleteBox(boxIndex);
  };

  return (
    <Card>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex flex-column">
          <span>
            ({box.x1},{box.y1}) ({box.x2},{box.y2})
          </span>
          <select
            disabled={!!box.classId}
            onChange={handleClassChange}
            value={box.classId || ""}
          >
            <option></option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.className}
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
