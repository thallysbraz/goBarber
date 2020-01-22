import Sequelize, { Model } from "sequelize";

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        path: Sequelize.DATE
      },
      { sequelize }
    );
    return this;
  }
  //Quando tem dois relacionamentos com a mesma tabela, o Sequelize requer um "apelido". Objeto as:"NomeDoApelido"
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsTo(models.User, { foreignKey: "provider_id", as: "provider" });
  }
}

export default Appointment;
