import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { getClassIndex, addClass, deleteClass } from "../services/classesService";



function ClassList({projectId}) {

  const initialClass = {
    className: "",
    projectId: projectId
  };
  
  const [classList, setClassList] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(initialClass);

  const getClasses = async ()=>{
    try {
      const list = await getClassIndex(projectId)
      setClassList(list);
    } catch (error) {
      console.log(error)
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleClose = async() => {
    setShow(false);
    setFormData(initialClass);
    
  };
  const handleShow = () => setShow(true);
  
  const handlAddClass = async ()=>{
    await addClass(formData)
    await getClasses();
    setFormData(initialClass);
    setShow(false);
  }

  const handleDeleteClass = async (classId) =>{
    try {
      await deleteClass(classId);
      await getClasses();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{getClasses()}, []);
  return (
    <div>
      <h3>Classes</h3>
      <ul>
        {classList &&
          classList.map((cls) => (
            <li key={cls.id}>
              {cls.className} <Button className="btn-close" onClick={()=>{handleDeleteClass(cls.id)}}></Button>
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
          <Button variant="primary" onClick={handlAddClass}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ClassList;
