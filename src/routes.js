import { Router } from "express";
import multer from "multer";

import authMiddleware from "./app/middlewares/auth"; //middleware de autenticação
import multerConfig from "./config/multer"; //config multer

import User from "./app/models/User"; //Model de Usuário

import UserController from "./app/controllers/UserController"; // UserController
import SessionController from "./app/controllers/SessionController"; // SessionController
import FileController from "./app/controllers/FileController"; // FileController
import ProviderController from "./app/controllers/ProviderController"; //ProviderController

const routes = new Router(); //instanciando rotas
const upload = multer(multerConfig);

routes.post("/users", UserController.store); //rota para criar usuario
routes.post("/session", SessionController.store); // rota pra autenticar usuario

routes.use(authMiddleware); //Middleware global || valido para rotas abaixo

routes.put("/users", UserController.update); //rota pra atualizar usuário

routes.get("/providers", ProviderController.index); //Rota para listar todos prestadores de serviços

routes.post("/files", upload.single("file"), FileController.store); //rota pra salvar arquivos

export default routes;
