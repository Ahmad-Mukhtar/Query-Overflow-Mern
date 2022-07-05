import axios from "axios";

const answerInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DEV_API_URL}/answer`,
});

export default answerInstance;
