import axios from "axios";

const basicApi = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_PORT}/api/v1`,
  auth: {
    username: import.meta.env.VITE_BASIC_USERNAME,
    password: import.meta.env.VITE_BASIC_PASSWORD,
  },
});

export { basicApi }
