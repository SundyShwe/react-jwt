import express, { json } from "express";
import { users } from "./data/users.js";
import { getUserInfo, getUsers, signIn } from "./users/users.controller.js";
import { verifyToken } from "./users/users.middleware.js";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

app.get("/users", getUsers);

app.post("/signin", signIn);
app.get("/users/:id", verifyToken, getUserInfo);

//error handling
app.use((err, req, res, next) => {
  res.status(err.status).json({ success: false, data: err.message });
});

app.listen(8080, () => console.log("listening to port 8080"));
