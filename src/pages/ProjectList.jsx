import {useContext,useEffect,useState} from 'react'
import axios from 'axios'

function projectList() {

    const [formData, setFormData] = useState(null)

    const [error, setError] = useState(null)




    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`${import.meta.env.VITE_BACK_END_SERVER_URL}/ProjectList`);
    //             setFormData(response.data);
    //         } catch (error) {
    //             setError(error.message);
    //         }
    //     }
    //     fetchData();
    // }, []);


  return (
    <>
        <h2>Project Lists</h2>

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
    </>
  )
}

export default projectList
