import { Router } from "express";
import { register,login ,getMe ,logOut } from "../controllers/auth.controller.js";

const authRoute = Router();


authRoute.post("/register" , register);
authRoute.post("/login" , login);
authRoute.get("/me" , getMe);
authRoute.post("/logout" , logOut);



export {authRoute} ;
