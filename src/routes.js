import { Router } from "express";

import User from "./app/models/User"; //Model de Usuário

import UserController from "./app/controllers/UserController"; // UserController
import SessionController from "./app/controllers/SessionController"; // SessionController
const routes = new Router(); //instanciando rotas

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);
export default routes;
