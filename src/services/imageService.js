import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/projects`;

const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getIndex = async (projectId) => {
  try {
    const response = await api.get(`/${projectId}/images`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const addImage = async (projectId, formData) =>{
  try {
    const response = await api.post(
      `/${projectId}/images`,
      formData);
      return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getImageDetails = async (projectId, imageId) => {
  try {
    const response = await api.get(`/${projectId}/images/${imageId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};


const deleteImage = async (projectId, imageId) => {
  try {
    const response = await api.delete(`/${projectId}/images/${imageId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

export {
  getIndex,
  addImage,
  getImageDetails,
  deleteImage

};