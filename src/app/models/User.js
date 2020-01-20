import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, //VIRTUAL = Dado que nunca vai existir no banco, somente no back end
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN
      },
      { sequelize }
    );
    //Hook para user ser executado antes de salvar no Banco
    this.addHook("beforeSave", async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
}

export default User;
