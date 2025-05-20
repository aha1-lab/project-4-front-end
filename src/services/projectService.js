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

const getIndex = async () => {
  try {
    const response = await api.get("/")
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const addProject = async (formData) =>{
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

const getProjectDetails = async (projectId) => {
  try {
    const response = await api.get(`/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};


const updateProjectDetails = async (projectId, formData) => {
  try {
    const response = await api.put(`/${projectId}`,formData);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};


const deleteProject = async (projectId) => {
  try {
    const response = await api.delete(`/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

export {
  getIndex,
  addProject,
  getProjectDetails,
  updateProjectDetails,
  deleteProject,
};