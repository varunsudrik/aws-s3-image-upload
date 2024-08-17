import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;
const USER_ID = 123;

const axiosClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'x-user-id': USER_ID,
  },
});

export const post = async (url, data) => {
  try {
    let newurl = baseURL + url;
    const response = await axiosClient.post(newurl, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const get = async url => {
  try {
    let newurl = baseURL + url;
    const response = await axiosClient.get(newurl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default axiosClient;
