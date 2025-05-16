import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {
  getClassIndex,
  addClass,
  deleteClass,
} from "../services/classesService";

function ClassList({ projectId }) {
  const initialClass = {
    className: "",
    projectId: projectId,
  };

  const [classList, setClassList] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(initialClass);

  const getClasses = async () => {
    try {
      const list = await getClassIndex(projectId);
      setClassList(list);
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleClose = async () => {
    setShow(false);
    setFormData(initialClass);
  };
  const handleShow = () => setShow(true);

  const handlAddClass = async () => {
    await addClass(formData);
    await getClasses();
    setFormData(initialClass);
    setShow(false);
  };

  const handleDeleteClass = async (classId) => {
    try {
      await deleteClass(classId);
      await getClasses();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);
  return (
    <div
      style={{
        height: "400px",
        border: "5px dashed rgb(117, 112, 112)",
        padding: "1rem",
      }}
    >
      <h3>Classes</h3>
      <ul>
        {classList &&
          classList.map((cls) => (
            <li key={cls.id}>
              <div className="d-flex justify-content-between">
                {cls.className}
                <Button
                  className="btn-close p-1 bd-highlight "
                  onClick={() => {
                    handleDeleteClass(cls.id);
                  }}
                ></Button>
              </div>
            </li>
          ))}
      </ul>
      <Button variant="success" className="mt-auto " onClick={handleShow}>
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
          <Button variant="primary" onClick={handlAddClass}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ClassList;
