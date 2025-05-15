import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Annotator from "../components/Annotator";
import { Button, Row, Col } from "react-bootstrap";
import BoundingBoxDetails from "../components/BoundingBoxDetails";
import {
  addAnnotation,
  deleteAnnotation,
  getAnnotationList,
} from "../services/annotationService";
import { getIndex } from "../services/imageService";
import { getClassIndex } from "../services/classesService";

function ImageAnnotation() {
  const { projectId } = useParams();
  const [boxesList, setBoxesList] = useState([]);
  const [imageList, setImageList] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [classes, setClasses] = useState(null);
  const navigate = useNavigate();

  const getImageList = async () => {
    try {
      let list = await getIndex(projectId);
      setImageList(list);
      if (list.length > 0) {
        setCurrentImage(list[0]);
        const annotationList = await getAnnotationList(list[0].id);
        // console.log(annotationList)
        setBoxesList(annotationList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getClassList = async () => {
    try {
      const list = await getClassIndex(projectId);
      setClasses(list);
    } catch (error) {}
  };

  useEffect(() => {
    getImageList();
    getClassList();
  }, []);

  // Source: https://stackoverflow.com/questions/60766094/using-react-hooks-how-can-i-update-an-object-that-is-being-passed-to-a-child-vi
  const handleUpdateBoxClass = async (index, classId) => {
    const prevBox = () => {
      const newBoxes = [...boxesList];
      newBoxes[index] = {
        ...newBoxes[index],
        imageId: currentImage.id,
        classId: classId,
        id: null,
      };
      return newBoxes;
    };
    const boxes = prevBox();
    boxes[index].imageId = currentImage.id;
    boxes[index].classId = classId;
    try {
      const boxTemp = { ...boxes[index] };
      delete boxTemp.className;
      delete boxTemp.color;
      // console.log(boxTemp)
      const annotation = await addAnnotation(boxTemp);
      // console.log(annotation);
    } catch (error) {
      console.log(error);
    }
    setBoxesList(boxes);
  };

  const deleteBox = async (index) => {
    await deleteAnnotation(index);
    const annotationList = await getAnnotationList(
      imageList[currentImageIndex].id
    );
    setBoxesList(annotationList);
  };
  const goLeft = async () => {
    if (currentImageIndex > 0) {
      const newImageIndex = currentImageIndex - 1;
      setCurrentImageIndex(newImageIndex);
      setCurrentImage(imageList[newImageIndex]);
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
  };
  const goRight = async () => {
    if (currentImageIndex < imageList.length - 1) {
      const newImageIndex = currentImageIndex + 1;
      setCurrentImageIndex(newImageIndex);
      setCurrentImage(imageList[newImageIndex]);
      setBoxesList([]);
      const annotationList = await getAnnotationList(
        imageList[newImageIndex].id
      );
      setBoxesList(annotationList);
    }
  };

  return (
    <div>
      {imageList && (
        <>
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
          <Row>
            <Col sm={9}>
              {currentImage && (
                <Annotator
                  sourceImage={currentImage}
                  boxesList={boxesList}
                  setBoxesList={setBoxesList}
                />
              )}
            </Col>
            <Col sm={3}>
              <div style={{ border: "2px solid red" }} />
              {boxesList.map((box, index) => (
                <div key={index}>
                  <BoundingBoxDetails
                    box={box}
                    classes={classes}
                    handleUpdateBoxClass={handleUpdateBoxClass}
                    boxIndex={index}
                    deleteBox={() => {
                      deleteBox(box.id);
                    }}
                  />
                </div>
              ))}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default ImageAnnotation;
