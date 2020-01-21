import Sequelize from "sequelize";

import databaseConfig from "../config/database"; //model de config
import User from "../app/models/User"; //Model de user
import File from "../app/models/File";

const models = [User, File]; // array com todos os models

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
