import { loginUser } from "../types/loginUser";
import api from "./API";

export const AuthService = {
  auth: async () => {
    return await api.post(`/auth`);
  },
  login: async (props: loginUser) => {
    return await api.post(`/auth/login`, { ...props });
  },
};
