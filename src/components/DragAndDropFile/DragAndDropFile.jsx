import React, { useState, useRef, useCallback } from "react";
import { Button } from "react-bootstrap";
import "./DragAndDropFile.css";
import { useDropzone } from "react-dropzone";
import { addImage } from "../../services/imageService";

function DragAndDropFile({ projectId }) {
  const [files, setFiles] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files[]", file); 
      });

      const response = await addImage(projectId, formData);
      console.log(response);

      setFiles(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    setFiles(null);
  };
  return (
    <>
      {!files && (
        <div className="dropzone" {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <h4>Drop the files here ...</h4>
          ) : (
            <h4>Drag 'n' drop some files here, or click to select files</h4>
          )}
        </div>
      )}

      {files && (
        <>
          <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
          <Button onClick={handleUpload}>Upload</Button>
          <Button onClick={handleDelete}>❌</Button>
        </>
      )}
    </>
  );
}

export default DragAndDropFile;
