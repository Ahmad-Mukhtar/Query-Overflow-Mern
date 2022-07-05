import axios from "axios";

const questionInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DEV_API_URL}/question`,
});

export default questionInstance;
