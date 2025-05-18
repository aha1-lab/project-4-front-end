import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getProjectDetails } from "../services/ProjectService";
import { Button, Row, Col } from "react-bootstrap";
import DragAndDropFile from "../components/DragAndDropFile/DragAndDropFile";
import ClassList from "../components/ClassList";

function ProjectDetails() {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const navigate = useNavigate();

  const getDetails = async () => {
    try {
      const response = await getProjectDetails(projectId);
      setProjectDetails(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handleImage = ()=>{
    navigate(`/projects/${projectId}/images`)
  }
  const handleImageAi = ()=>{
    navigate(`/projects/${projectId}/images/ai`)
  }
  return (
    <>
      {projectDetails && (
        <>
          <h1>{projectDetails.name}</h1>
          <h3>Project Type: {projectDetails.type}</h3>
          <p>{projectDetails.description}</p>

          <Row>
            <Col sm={3}>
              <ClassList projectId={projectId} />
            </Col>
            <Col sm={5}>
              <DragAndDropFile projectId={projectId} />
            </Col>
            <Col sm={3} className="dropzone">
              <Button className="mt-2 w-100" variant="success">Edit Project</Button>
              <Button className="mt-2 w-100 btn btn-danger" >Delete Project</Button>
              <Button className="mt-2 w-100" onClick={handleImage} variant="success">Annotate Images</Button>
              <Button className="mt-2 w-100" onClick={handleImageAi} variant="success">Use AI Tools</Button>
              <Button className="mt-2 w-100" variant="success">Train Model</Button>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProjectDetails;
