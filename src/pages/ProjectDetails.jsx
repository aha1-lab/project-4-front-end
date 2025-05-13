import {useContext,useEffect,useState} from 'react'
import axios from 'axios'

function ProjectDetails() {

    const [formData, setFormData] = useState(null)

    const [error, setError] = useState(null)

    const [selectedFile, setSelectedFile] = useState(null);
    
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACK_END_SERVER_URL}/ProjectDetails`);
                setFormData(response.data);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchData();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewUrl(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

      const handleUpload = async () => {
        if (!selectedFile) return alert("No file selected.");
    
        const formData = new FormData();
        formData.append('image', selectedFile);
    
        try {
          const response = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/ProjectDetails`, {
            method: 'POST',
            body: formData,
          });
    
          if (response.ok) {
            alert('Upload successful!');
          } else {
            alert('Upload failed.');
          }
        } catch (err) {
          console.error(err);
          alert('An error occurred while uploading.');
        }
      };

  return (
    <>
    
    <h2>Project Details</h2>

    {
  formData && (
      <div>
          <ul>
              <li>Project Name: {formData.name}</li>
              <li>Project Description: {formData.description}</li>
              <li>Project Type: {formData.type}</li>
          </ul>
      </div>
   )

    } 

    <button>Add Class</button>

    <button onClick={handleUpload}>Add Image</button>      
    <input type='file' accept='image/*' onChange={handleFileChange}/>
    </>
  )
}

export default ProjectDetails
