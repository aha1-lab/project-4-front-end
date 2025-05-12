import React, { useEffect, useState } from "react";

function Annotator({ sourceImage, boxesList, setBoxesList }) {
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [isPressing, setIsPressing] = useState(false);
//   const [boxesList, setBoxesList] = useState([]);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [scaler, setScaler] = useState({ x: 0, y: 0 });
  const imageReference = React.useRef(null);
  const containerReference = React.useRef(null);

  useEffect(() => {
    const image = imageReference.current;
    if (image) {
      const handleLoad = () => {
        setImageSize({
          width: image.naturalWidth,
          height: image.naturalHeight,
        });
      };
      image.addEventListener("load", handleLoad);
      return () => image.removeEventListener("load", handleLoad);
    }
  }, [`${import.meta.env.VITE_BACK_END_SERVER_URL}/images/${sourceImage.imageName}`]);

  // Source: https://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element
  const getPixelPositionInImage = (x, y) => {
    const contrainerRect = containerReference.current.getBoundingClientRect();
    const imageRect = imageReference.current.getBoundingClientRect();
    const XScaler = imageSize.width / imageRect.width;
    const YScaler = imageSize.height / imageRect.height;
    return {
      x: Math.round((x - imageRect.left) * XScaler),
      y: Math.round((y - imageRect.top) * YScaler),
    };
  };

  const handleMouseDown = (event) => {
    const { x, y } = getPixelPositionInImage(event.clientX, event.clientY);
    setStartPoint({ x, y });
    setEndPoint({ x, y });
    setIsPressing(true);
  };

  const handleMouseMove = (event) => {
    if (isPressing === true) {
      const { x, y } = getPixelPositionInImage(event.clientX, event.clientY);
      setEndPoint({ x, y });
    }
  };

  const handleMouseUp = (event) => {
    if (isPressing === true) {
      // console.log("start: ",startPoint);
      // console.log("end: ", endPoint);
      const x1 = Math.min(startPoint.x, endPoint.x);
      const y1 = Math.min(startPoint.y, endPoint.y);
      const x2 = Math.max(startPoint.x, endPoint.x);
      const y2 = Math.max(startPoint.y, endPoint.y);
      const color = 'green';
      if (x1 !== x2 && y1 !== y2) {
        const newBox = {
          x1:x1,
          y1:y1,
          x2:x2,
          y2:y2,
          imageId: sourceImage.id,
          classId: "",
          className: "",
          color: color,
        }
        setBoxesList([...boxesList, newBox]);
      }
      setIsPressing(false);
      setStartPoint(null);
      setEndPoint(null);
    }
  };
  
  // Source: https://stackoverflow.com/questions/49898749/how-can-i-prevent-drag-and-drop-images-in-a-react-app
  const preventDragHandler = (e) => {
    e.preventDefault();
  }

  // Source: https://medium.com/@na.mazaheri/dynamically-drawing-shapes-on-canvas-with-fabric-js-in-react-js-8b9c42791903
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          ref={containerReference}
          style={{ position: "relative", display: "inline-block" }}
        >
          <img
            ref={imageReference}
            src={`${import.meta.env.VITE_BACK_END_SERVER_URL}/images/${sourceImage.imageName}`}
            alt="Annotate me"
            style={{ maxWidth: "100%", height: "auto", cursor: "crosshair" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onDragStart={preventDragHandler}
          />

          {isPressing && startPoint && endPoint && (
            <div
              style={{
                position: "absolute",
                left: `${
                  Math.min(startPoint.x, endPoint.x) *
                  (imageReference.current?.getBoundingClientRect().width /
                    imageSize.width || 1)
                }px`,
                top: `${
                  Math.min(startPoint.y, endPoint.y) *
                  (imageReference.current?.getBoundingClientRect().height /
                    imageSize.height || 1)
                }px`,
                width: `${
                  Math.abs(endPoint.x - startPoint.x) *
                  (imageReference.current?.getBoundingClientRect().width /
                    imageSize.width || 1)
                }px`,
                height: `${
                  Math.abs(endPoint.y - startPoint.y) *
                  (imageReference.current?.getBoundingClientRect().height /
                    imageSize.height || 1)
                }px`,
                border: "2px solid green",
                pointerEvents: "none",
              }}
            />
          )}

          {boxesList && boxesList.map((box, index) =>(
            <div key={index}
            style={{
              position: "absolute",
              left: `${
                Math.min(box.x1, box.x2) *
                (imageReference.current?.getBoundingClientRect().width /
                  imageSize.width || 1)
              }px`,
              top: `${
                Math.min(box.y1, box.y2) *
                (imageReference.current?.getBoundingClientRect().height /
                  imageSize.height || 1)
              }px`,
              width: `${
                Math.abs(box.x2 - box.x1) *
                (imageReference.current?.getBoundingClientRect().width /
                  imageSize.width || 1)
              }px`,
              height: `${
                Math.abs(box.y2 - box.y1) *
                (imageReference.current?.getBoundingClientRect().height /
                  imageSize.height || 1)
              }px`,
              border: `2px solid ${box.color}`,
              pointerEvents: "none",
            }}
          />
          ))}
        </div>
      </div>
    </>
  );
}

export default Annotator;
