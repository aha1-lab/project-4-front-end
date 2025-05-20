import { useState, useContext, useEffect } from "react";
import { authContext } from "../context/AuthContext";
import axios from "axios";
import { Form, Dropdown, Button } from "react-bootstrap";
import {addProject, updateProjectDetails} from "../services/ProjectService";
import { useNavigate, useParams } from "react-router";
import { getProjectDetails } from "../services/ProjectService";

const projectTypes = [
  "object_detection",
  "image_classification",
  "image_segmentation",
];

const initProjectFoprm =
    {
    name: "",
    description: "",
    type: projectTypes[0],
  };


function CreateProject() {
  const {projectId} = useParams();
  const navigate = useNavigate();
  const [projectForm, setProjectForm] = useState(initProjectFoprm);
  const [message, setMessage] = useState("");


  const projectDetaisl = async ()=>{
    try {
      const response = await getProjectDetails(projectId);
      setProjectForm(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (projectId){
        const response = await updateProjectDetails(projectId, projectForm);

      }else{
        const response = await addProject(projectForm);
        // console.log("Project created:", response.data);
      }
        setProjectForm(initProjectFoprm);
        setMessage("Project created successfully!");
        setTimeout(() => setMessage(""), 3000);
        navigate("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      setMessage("Failed to create project.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  useEffect(() => {
    if (projectId) projectDetaisl();
  }, []);

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="name" className=" mt-3">
          Project Name:
        </Form.Label>
        <Form.Control
          type="text"
          name="name"
          id="name"
          value={projectForm.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="description" className=" mt-3">
          Project Name:
        </Form.Label>
        <Form.Control
          type="text"
          name="description"
          id="description"
          value={projectForm.description}
          onChange={handleChange}
        />
      </Form.Group>
      <Dropdown>
        <Dropdown.Toggle variant="Info">{projectForm.type}</Dropdown.Toggle>
        <Dropdown.Menu>
          {projectTypes.map((type) => (
            <Dropdown.Item
              key={type}
              onClick={() => setProjectForm({ ...projectForm, type })}
            >
              {type}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Button onClick={handleSubmit} className="mt-3" variant="primary">
        {projectId ? "Update Project" : "Create New Project"}
      </Button>
    </Form>
  );
}

export default CreateProject;
