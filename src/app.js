import express from "express";
import path from "path";

import routes from "./routes"; //import de rotas
import "./database/index"; // import da conexão com banco

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
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
  }
}

export default new App().server;

// yarn sequelize migration:create --name=create-users
