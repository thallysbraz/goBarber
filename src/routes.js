import { Router } from "express";

import User from "./app/models/User"; //Model de Usuário

import UserController from "./app/controllers/UserController"; // UserController

const routes = new Router(); //instanciando rotas

routes.post("/users", UserController.store);

export default routes;
