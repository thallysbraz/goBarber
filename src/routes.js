import { Router } from "express";

import authMiddleware from "./app/middlewares/auth"; //middleware de autenticação

import User from "./app/models/User"; //Model de Usuário

import UserController from "./app/controllers/UserController"; // UserController
import SessionController from "./app/controllers/SessionController"; // SessionController

const routes = new Router(); //instanciando rotas

routes.post("/users", UserController.store); //rota para criar usuario
routes.post("/session", SessionController.store); // rota pra autenticar usuario

routes.use(authMiddleware); //Middleware global || valido para rotas abaixo

routes.put("/users", UserController.update); //rota pra atualizar usuário
export default routes;
