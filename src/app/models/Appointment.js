import Sequelize, { Model } from "sequelize";
import { isBefore, subHours } from "date-fns";

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        past: {
          //retorna se o agendamento ja passou
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          }
        },
        cancelable: {
          //informar se o agendamento e cancelável ou não
          type: Sequelize.VIRTUAL,
          get() {
            /* subHours para tirar 2 horas da data do agendamento
            /  e depois comparando se a data atual ainda e antes de subHours
            /  ou seja, se a data atual e anterior a data do agendamento com 2 horas a menos*/
            return isBefore(new Date(), subHours(this.date, 2));
          }
        }
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
