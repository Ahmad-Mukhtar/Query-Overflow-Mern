import axios from "axios";

const userInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DEV_API_URL}/user`,
});

export default userInstance;
