import axios from "axios";

const bookmarkInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DEV_API_URL}/bookmark`,
});

export default bookmarkInstance;
