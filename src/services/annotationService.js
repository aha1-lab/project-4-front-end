import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/annotations`;

const api = axios.create({
  baseURL: BASE_URL
});

// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

const addAnnotation = async (formData) =>{
  try {
    const response = await api.post(
      BASE_URL,
      formData);
      return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAnnotationList = async (imageId) => {
  try {
    const response = await api.get(`/${imageId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};



const deleteAnnotation = async (annotationId) => {
  try {
    const response = await api.delete(`/${annotationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};



export {
  deleteAnnotation,
  getAnnotationList,
  addAnnotation
};