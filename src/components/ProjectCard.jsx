import React from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { Link } from "react-router";
import { deleteProject } from "../services/ProjectService";

function ProjectCard({ project, getProjectList }) {
  const handleDelete = async () => {
    try {
      // Use project instead of project2 if that's your prop
      await deleteProject(project.id);
      getProjectList();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  return (
    <Card style={{ width: "16rem" }}>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-item-baseline mb-2">
          <span className="fs-2">{project.name}</span>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Project Type: {project.type}
        </Card.Subtitle>
        <Card.Text className="mb-4">
          Description: {project.description}
        </Card.Text>
        <div>
          <Card.Link href={`/projects/${project.id}`}>View</Card.Link>
          <Card.Link href={`/createProject/${project.id}`}>Edit</Card.Link>
          <Card.Link
            onClick={() => {
              handleDelete(project.id);
            }}
          >
            Delete
          </Card.Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
