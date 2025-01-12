import { setAuth } from "./slice";
import { user as users } from "./../../mockups/User/user";
import jwt from "jsonwebtoken";
import { Router } from "react-router-dom";

export const login =
  async ({ email, password }) =>
  async (dispatch) => {
    try {
      //   const response = await api.post("/login", credentials);
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (!user) throw new Error("Auth failed");
      const secretKey = "jack"; // Replace with your actual secret key
      const token = jwt.sign(user, secretKey);
      dispatch(setAuth({ token, user }));
      // Router.push("/");
    } catch (error) {
      // Handle login error
    }
  };
