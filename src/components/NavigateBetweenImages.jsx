import React from "react";
import { getAnnotationList } from "../services/annotationService";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

function NavigateBetweenImages({
  setCurrentImageIndex,
  setCurrentImage,
  setBoxesList,
  currentImageIndex,
  imageList,
  projectId,
}) {
  const navigate = useNavigate();
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

  return (
    <Row>
      <div className="mt-auto">
        <Button
          className="position-relative"
          onClick={() => navigate(`/projects/${projectId}`)}
        >
          Back to project
        </Button>

        <div
          className="d-flex align-items-center flex-column"
          style={{ gap: "0.5rem" }}
        >
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ gap: "0.5rem" }}
          >
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
          </div>
        </div>
      </div>
    </Row>
  );
}

export default NavigateBetweenImages;
