import { users } from "../data/users.js";
import jwt from "jsonwebtoken";

export const signIn = (req, res, next) => {
  try {
    const { username, password } = req.body;

    const login_user = users.find((u) => u.username === username && u.password === password);
    if (login_user) {
      //succesfully login
      const accessToken = jwt.sign({ id: login_user.id, username: login_user.username, isAdmin: login_user.isAdmin }, "SUNDYMOONGOLD", { expiresIn: "30s" });
      res.json({ success: true, data: accessToken });
    } else {
      //error
      let error = new Error("Log In error. Please check your username and passowrd.");
      error.status = 400;
      throw error;
    }
  } catch (err) {
    //console.log("Error in sign in : ", err);
    next(err);
  }
};

export const getUserInfo = (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(req.tokenUser);
    const user = users.find((u) => u.id === id);
    res.json({ success: true, data: user });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getUsers = (req, res, next) => {
  res.json({ success: true, data: users });
};
