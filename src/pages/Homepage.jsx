import { useContext, useEffect, useState } from "react";
import { authContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router";
import Annotator from "../components/Annotator";
import { Button, Row, Col } from "react-bootstrap";
import BoundingBoxDetails from "../components/BoundingBoxDetails";
import { addAnnotation, deleteAnnotation, getAnnotationList } from "../services/annotationService";

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
      const annotationList = await getAnnotationList(list[0].id);
      setBoxesList(annotationList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImageList();
  }, []);

  // Source: https://stackoverflow.com/questions/60766094/using-react-hooks-how-can-i-update-an-object-that-is-being-passed-to-a-child-vi
  const handleUpdateBoxClass = async(index, classId) => {
    const prevBox = () => {
      const newBoxes = [...boxesList];
      newBoxes[index] = {
        ...newBoxes[index],
        color: classes[classId].color,
        imageId: currentImage.id,
        classId: classId,
        className: classes[classId].name,
      };
      return newBoxes;
    };
    const boxes = prevBox();
    boxes[index].imageId= currentImage.id;
    boxes[index].classId= classId;
    boxes[index].className= classes[classId].name;
    boxes[index].color= classes[classId].color;
    setBoxesList(boxes);
    // console.log(boxes[index]);
    try {
      // const annotation = await addAnnotation(boxes[index]);
      const annotation = await axios.post(`http://localhost:5000/annotations`, boxes[index]);
      console.log(annotation.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBox = async(index) => {
    await deleteAnnotation(index);
    const annotationList = await getAnnotationList(imageList[currentImageIndex].id);
    setBoxesList(annotationList);
  };

  const goLeft = async() => {
    if (currentImageIndex > 0) {
      const newImageIndex = currentImageIndex - 1;
      setCurrentImageIndex(newImageIndex);
      setCurrentImage(imageList[newImageIndex]);
      setBoxesList([]);
      try {
        const annotationList = await getAnnotationList(imageList[newImageIndex].id);
        setBoxesList(annotationList);
      } catch (error) {
        console.log(error);
      }
      
    }
  };
  const goRight = async() => {
    if (currentImageIndex < imageList.length - 1) {
      const newImageIndex = currentImageIndex + 1;
      setCurrentImageIndex(newImageIndex);
      setCurrentImage(imageList[newImageIndex]);
      setBoxesList([]);
      const annotationList = await getAnnotationList(imageList[newImageIndex].id);
      setBoxesList(annotationList);
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
                    deleteBox={()=>{deleteBox(box.id)}}
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
