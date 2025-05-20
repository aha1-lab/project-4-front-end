import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { getIndex } from "../services/ProjectService";
import ProjectCard from "../components/ProjectCard";
import { Row, Col } from "react-bootstrap";

function ProjectList() {
  const [formData, setFormData] = useState(null);

  const [error, setError] = useState(null);

  const getProjectList = async()=>{
    try {
      const response = await getIndex();
        setFormData(response);
    } catch (error) {
      setError(error.message);
    }
  }



  useEffect(() => {
    getProjectList();
  }, []);

  return (
    <>
      <h2>Project Lists</h2>
      <Row md={2} xs={1} lg={3} className="g-3">
        {formData &&
          formData.map((project) => (
            <Col key={project.id}>
              <ProjectCard project={project} getProjectList={getProjectList} />
            </Col>
          ))}
      </Row>
    </>
  );
}

export default ProjectList;
