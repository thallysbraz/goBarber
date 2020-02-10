import Sequelize from "sequelize";
import mongoose from "mongoose";

import databaseConfig from "../config/database"; //model de config
import User from "../app/models/User"; //Model de user
import File from "../app/models/File"; //Model de Arquivos
import Appointment from "../app/models/Appointment"; //Model de Agendamentos

const models = [User, File, Appointment]; // array com todos os models

class Database {
  constructor() {
    this.init();
    this.mongo();
  }
  //iniciando Sequelize e MongoDB
  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
        useFindAndModify: false
      })
      .then(() => {
        console.log("conectado ao banco MONGODB");
      })
      .catch(err => {
        console.log("error ao conectar no banco " + err);
      });
  }
}

export default new Database();
