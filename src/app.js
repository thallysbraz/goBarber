import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import * as Sentry from "@sentry/node";
import Youch from "youch";

import routes from "./routes"; //import de rotas
import sentryConfig from "./config/sentry"; //import config Sentry
import "express-async-errors"; //
import "./database/index"; //import da conexão com banco

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig); //init Sentry

    this.middlewares();
    this.routes();

    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(cors());
    this.server.use(express.json());
    //express.static que serve arquivos estaticos que podem ser acessados diretamente pelo navegador.
    //Passando a rota "/files", e o path dos arquivos
    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
    );
  }

  routes() {
    this.server.use(routes);

    this.server.use(Sentry.Handlers.errorHandler());
  }
  //tratando erros
  exceptionHandler() {
    //interceptando erros
    this.server.use(async (err, req, res, next) => {
      //se o error for em desenvolvimento, retorna apenas um json
      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      //se for em produção, retorna log Erro interno
      return res.status(500).json({ error: "Internal server error" });
    });
  }
}

export default new App().server;

// yarn sequelize migration:create --name=create-users
