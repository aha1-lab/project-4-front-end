import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getProjectDetails } from "../services/ProjectService";
import { Button, Row, Col } from "react-bootstrap";
import DragAndDropFile from "../components/DragAndDropFile/DragAndDropFile";
import ClassList from "../components/ClassList";
import { deleteProject } from "../services/ProjectService";


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

  const handleDelete = async () => {
    try {
      // Use project instead of project2 if that's your prop
      await deleteProject(projectId);
      navigate('/projects');
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

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
                <Button className="mt-2 w-100" variant="success" onClick={()=>{navigate(`/createProject/${projectId}`)}}>Edit Project</Button>
              <Button className="mt-2 w-100 btn btn-danger" onClick={handleDelete} >Delete Project</Button>
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
