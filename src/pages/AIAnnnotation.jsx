import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Annotator from "../components/Annotator";
import { Button, Row, Col, Form } from "react-bootstrap";
import { getAnnotationList } from "../services/annotationService";
import { getIndex } from "../services/imageService";
import { askAiToAnnotate } from "../services/aiAnnotations";
import NavigateBetweenImages from "../components/NavigateBetweenImages";
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

function AIAnnnotation() {
  const [formData, setFormData] = useState({
    className: "",
    description: "",
  });
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const { projectId } = useParams();
  const [imageList, setImageList] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [classDescrition, setClassDescription] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const getImageList = async () => {
    try {
      let list = await getIndex(projectId);
      setImageList(list);
      if (list.length > 0) {
        setCurrentImage(list[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImageList();
  }, []);

  const handleAdd = () => {
    const data = [...classDescrition];
    data.push(formData);
    setClassDescription(data);
    setFormData({
      className: "",
      description: "",
    });
  };

  const handleDeleteClass = (index) => {
    const data = [...classDescrition];
    data.splice(index, 1);
    setClassDescription(data);
  };

  const handleRequest = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = {};
    classDescrition.forEach((cls) => {
      data[cls.description] = cls.className;
    });
    try {
      data["imagePath"] = currentImage.imageName;
      const response = await askAiToAnnotate(data);
      setCurrentImage(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    !loading ?
    <div>
      {imageList && (
        <>
          <NavigateBetweenImages
            setCurrentImageIndex={setCurrentImageIndex}
            setCurrentImage={setCurrentImage}
            setBoxesList={null}
            currentImageIndex={currentImageIndex}
            imageList={imageList}
            projectId={projectId}
          />
          <Row>
            {currentImage && (
              <Annotator
                sourceImage={currentImage}
                boxesList={null}
                setBoxesList={null}
              />
            )}
          </Row>
          <Row>
            <h2>Classes</h2>
            {classDescrition &&
              classDescrition.map((cls, index) => (
                <li key={index}>
                  {cls.className} : {cls.description}{" "}
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDeleteClass(index);
                    }}
                  >
                    {" "}
                    X
                  </Button>
                </li>
              ))}
          </Row>
          <Row>
            <Form className="mt-2">
              <Row>
                <Col sm={3}>
                  <Form.Group>
                    <Form.Label>Class Name</Form.Label>
                    <Form.Control
                      rows={4}
                      type="text"
                      name="className"
                      id="className"
                      value={formData.className}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Enter your description Here</Form.Label>
                    <Form.Control
                      rows={4}
                      type="text"
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button className="mt-4" variant="info" onClick={handleAdd}>
                    add
                  </Button>
                </Col>
              </Row>
              <Button
                className="mt-3"
                variant="info"
                type="submit"
                onClick={handleRequest}
              >
                Submit request
              </Button>
              <Button className="mt-3 ms-3" variant="warning">
                Annotate all images
              </Button>
            </Form>
          </Row>
        </>
      )}
    </div>:
    <Spin fullscreen="true" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  );
}

export default AIAnnnotation;
