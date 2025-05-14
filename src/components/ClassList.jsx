import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function ClassList() {
  const [classList, setClassList] = useState(["apple", "orange"]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    className: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleClose = () => {
    setShow(false);
    setClassList((classList) => [...classList, formData.className]);
  };
  const handleShow = () => setShow(true);

  return (
    <div>
      <h3>Classes</h3>
      <ul>
        {classList &&
          classList.map((cls, index) => (
            <li key={index}>
              {cls} <Button className="btn-close"></Button>
            </li>
          ))}
      </ul>
      <Button variant="primary" className="mt-auto" onClick={handleShow}>
        Add Class
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="className" className=" mt-3">
                Class Name:
              </Form.Label>
              <Form.Control
                type="text"
                name="className"
                id="className"
                value={formData.className}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ClassList;
