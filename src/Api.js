import axios from "axios";

export default axios.create({
  baseURL: `https://lvrnjak-blog-server.herokuapp.com/rest-api/`,
});
