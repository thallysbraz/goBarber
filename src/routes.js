import { Router } from "express";
import multer from "multer";

import authMiddleware from "./app/middlewares/auth"; //middleware de autenticação
import multerConfig from "./config/multer"; //config multer

import UserController from "./app/controllers/UserController"; // UserController
import SessionController from "./app/controllers/SessionController"; // SessionController
import FileController from "./app/controllers/FileController"; // FileController
import ProviderController from "./app/controllers/ProviderController"; //ProviderController
import AppointmentController from "./app/controllers/AppointmentController"; //AppointmentController
import ScheduleController from "./app/controllers/ScheduleController"; //ScheduleController
import NotificationController from "./app/controllers/NotificationController"; //NotificationController

const routes = new Router(); //instanciando rotas
const upload = multer(multerConfig);

routes.post("/users", UserController.store); //rota para criar usuario
routes.post("/session", SessionController.store); // rota pra autenticar usuario

routes.use(authMiddleware); //Middleware global || valido para rotas abaixo

//rotas de usuários
routes.put("/users", UserController.update); //Rota pra atualizar usuário

//rotas de providers
routes.get("/providers", ProviderController.index); //Rota para listar todos prestadores de serviços

//rotas de appointments do usuário
routes.get("/appointments", AppointmentController.index); //Rota para listar agendamento
routes.post("/appointments", AppointmentController.store); //Rota para criar agendamento

//rota de notificação de agendamento
routes.get("/notifications", NotificationController.index); //Rota para listar

//rotas de prestador de serviços
routes.get("/schedule", ScheduleController.index);

//rotas de arquivos
routes.post("/files", upload.single("file"), FileController.store); //Rota pra salvar arquivos

export default routes;
