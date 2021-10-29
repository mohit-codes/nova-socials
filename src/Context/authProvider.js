import axios from "axios";
import { createContext, useContext, useState } from "react";
import { BASE_URL } from "../utils/constants";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  const loginUserWithCredentials = async (email, password) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
      });
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
      }
      return { user: data.user, message: data.message, success: data.success };
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUserWithCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthProvider);
};
