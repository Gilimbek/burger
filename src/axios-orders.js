import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-69ebc-default-rtdb.firebaseio.com/"
});

export default instance;
