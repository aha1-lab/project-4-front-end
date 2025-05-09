import { useContext, useEffect, useState } from "react";
import { authContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router";
import Annotator from "../components/Annotator";
import img from "../assets/plyfly.jpg";
import { Button, Row, Col } from "react-bootstrap";
import BoundingBoxDetails from "../components/BoundingBoxDetails";

function Homepage() {
  const projectId = 1;
  const [boxesList, setBoxesList] = useState([]);
  const [imageList, setImageList] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const classes = [
    { name: "wheel", color: "red" },
    { name: "steering", color: "blue" },
  ];

  const getImageList = async () => {
    try {
      let list = await axios.get(
        `http://127.0.0.1:5000/projects/${projectId}/images`
      );
      list = list.data;
      setImageList(list);
      if(list.length > 0) {
      setCurrentImage(list[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImageList();
  }, []);

  // Source: https://stackoverflow.com/questions/60766094/using-react-hooks-how-can-i-update-an-object-that-is-being-passed-to-a-child-vi
  const handleUpdateBoxColor = async(index, classId) => {
    const prevBox = () => {
      const newBoxes = [...boxesList];
      newBoxes[index] = {
        ...newBoxes[index],
        color: classes[classId].color,
        imageId: currentImage.id,
        classId: classId,
        className: classes[classId].name
      };
      return newBoxes;
    };
    const boxes = prevBox();
    setBoxesList(boxes);
    const annotationData = {
      x1:boxes[index].x1,
      y1:boxes[index].y1,
      x2:boxes[index].x2,
      y2:boxes[index].y2,
      imageId: currentImage.id,
      classId: classId,
      className: classes[classId].name,
      color: classes[classId].color,
    }
    console.log(annotationData);
    try {
      const annotation = await axios.post("http://127.0.0.1:5000/annotations", annotationData)
      console.log(annotation.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBox = (index) => {
    const modifiedBoxes = [...boxesList];
    modifiedBoxes.splice(index, 1);
    setBoxesList(modifiedBoxes);
  };

  const goLeft = () => {
    if (currentImageIndex > 0) {
      const newImageIndex = currentImageIndex - 1;
      setCurrentImageIndex(newImageIndex);
      setCurrentImage(imageList[newImageIndex]);
      setBoxesList([]);
    }
  };
  const goRight = () => {
    if (currentImageIndex < imageList.length - 1) {
      const newImageIndex = currentImageIndex + 1;
      setCurrentImageIndex(newImageIndex);
      setCurrentImage(imageList[newImageIndex]);
      setBoxesList([]);
    }
  };

  return (
    <div>
      {imageList && (
        <>
          <Row>
            <div className="mt-auto">
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
                  {currentImageIndex +1} of {imageList.length}
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
                sourceImage={`http://127.0.0.1:5000/images/${currentImage.imageName}`}
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
                    handleUpdateBoxColor={handleUpdateBoxColor}
                    boxIndex={index}
                    deleteBox={deleteBox}
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

export default Homepage;
