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
  return (
    <>
      {projectDetails && (
        <>
          <h1>{projectDetails.name}</h1>
          <h2>{projectDetails.type}</h2>
          <h2>{projectDetails.description}</h2>

          <Row>
            <Col sm={3}>
              <ClassList projectId={projectId} />
            </Col>
            <Col sm={4}>
              <DragAndDropFile projectId={projectId} />
            </Col>
            <Col sm={2} >
              <Button className="mt-2">Edit Project</Button>
              <Button className="mt-2">Delete Project</Button>
              <Button className="mt-2" onClick={handleImage}>Annotate Images</Button>
              <Button className="mt-2">Train Model</Button>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProjectDetails;
