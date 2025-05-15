import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/classes`;

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

const getClassIndex = async (projectId) => {
  try {
    const response = await api.get(`/${projectId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const addClass = async (formData) =>{
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



const deleteClass = async (ClassId) => {
  try {
    const response = await api.delete(`/${ClassId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

export {
  getClassIndex,
  addClass,
  deleteClass,
};