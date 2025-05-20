import React, { useState } from "react";
import { getAnnotationList } from "../services/annotationService";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import { deleteImage } from "../services/imageService";
import { getIndex } from "../services/imageService";

function NavigateBetweenImages({
  setCurrentImageIndex,
  setCurrentImage,
  setBoxesList,
  currentImageIndex,
  imageList,
  projectId,
  setImageList,
}) {
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const goLeft = async () => {
    if (currentImageIndex > 0) {
      const newImageIndex = currentImageIndex - 1;
      setCurrentImageIndex(newImageIndex);
      setCurrentImage(imageList[newImageIndex]);
      if (setBoxesList) {
        setBoxesList([]);
        try {
          const annotationList = await getAnnotationList(
            imageList[newImageIndex].id
          );
          setBoxesList(annotationList);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  const goRight = async () => {
    if (currentImageIndex < imageList.length - 1) {
      const newImageIndex = currentImageIndex + 1;
      setCurrentImageIndex(newImageIndex);
      setCurrentImage(imageList[newImageIndex]);
      if (setBoxesList) {
        setBoxesList([]);
        const annotationList = await getAnnotationList(
          imageList[newImageIndex].id
        );
        setBoxesList(annotationList);
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      // console.log(imageList[currentImageIndex].id);
      const response = await deleteImage(
        projectId,
        imageList[currentImageIndex].id
      );
      let list = await getIndex(projectId);
      setImageList(list);
      const newImageIndex = currentImageIndex - 1;
      setCurrentImageIndex(newImageIndex);
      setCurrentImage(imageList[newImageIndex]);
      if (setBoxesList) {
        setBoxesList([]);
        const annotationList = await getAnnotationList(
          imageList[newImageIndex].id
        );
        setBoxesList(annotationList);
      }
      setMessage("Delete success");
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-auto">
      {message && (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          {message}
        </Alert>
      )}
      <div
        className="d-flex align-items-center flex-column"
        style={{ gap: "0.5rem" }}
      >
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ gap: "0.5rem" }}
        >
          <Button
            className="position-relative me-5"
            variant="success"
            onClick={() => navigate(`/projects/${projectId}`)}
          >
            Back to project
          </Button>
          <Button
            size="lg"
            variant="outline-light"
            onClick={goLeft}
            disabled={currentImageIndex === 0}
          >
            ⬅️
          </Button>
          {currentImageIndex + 1} of {imageList.length}
          <Button
            size="lg"
            variant="outline-light"
            onClick={goRight}
            disabled={currentImageIndex === imageList.length - 1}
          >
            ➡️
          </Button>
          <Button
            className="position-relative ms-5"
            variant="danger"
            onClick={handleDeleteImage}
          >
            Delete Image
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NavigateBetweenImages;
