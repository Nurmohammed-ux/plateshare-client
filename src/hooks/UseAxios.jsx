import axios from "axios";

const instance = axios.create({
  baseURL: "https://plateshare-server-part2.onrender.com",
});

const useAxios = () => {
  return instance;
};

export default useAxios;
