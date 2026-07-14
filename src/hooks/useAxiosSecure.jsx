import axios from "axios";
import UseAuth from "./useAuth";
import { useEffect } from "react";

const instance = axios.create({
  baseURL: "https://plateshare-server-part2.onrender.com",
});

const useAxiosSecure = () => {
  const { user } = UseAuth();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      async (config) => {
        if (user?.accessToken) {
          config.headers.authorization = `Bearer ${user.accessToken}`;
          // console.log(config.headers.authorization);
        }
        return config;
      },
    );
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);
  return instance;
};

export default useAxiosSecure;
