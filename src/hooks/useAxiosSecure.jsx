import axios from "axios";
import UseAuth from "./useAuth";
import { useEffect } from "react";

const instance = axios.create({
  baseURL: "http://localhost:3000",
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
