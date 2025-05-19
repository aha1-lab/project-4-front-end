import {useContext,useEffect,useState} from 'react'
import axios from 'axios'


function ClassList() {

    const [formData, setFormData] = useState(null)

    const [error, setError] = useState(null)

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



  return (
    <>
      <input type='text'/>
      <button onChange={}>Add Class</button>
    </>
  )
}

export default ClassList
