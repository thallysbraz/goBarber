import express from "express";

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
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;

// yarn sequelize migration:create --name=create-users
