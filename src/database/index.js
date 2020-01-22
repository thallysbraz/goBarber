import Sequelize from "sequelize";

import databaseConfig from "../config/database"; //model de config
import User from "../app/models/User"; //Model de user
import File from "../app/models/File"; //Model de Arquivos
import Appointment from "../app/models/Appointment"; //Model de Agendamentos

const models = [User, File, Appointment]; // array com todos os models

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
