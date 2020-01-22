import Sequelize, { Model } from "sequelize";

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        //campo virtual para retornar URL da imagem do avatar
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/files/${this.path}`;
          }
        }
      },
      { sequelize }
    );
    return this;
  }
}

export default File;
