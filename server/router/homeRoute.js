import { Router } from "express";
import { home } from "../controller/homeController.js";

const route = Router();

route.get('/trends' , home);

export default route;
