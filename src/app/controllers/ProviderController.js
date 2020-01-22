import User from "../models/User"; // Model de Usuário
import File from "../models/File"; // Model de Files

class ProviderController {
  async index(req, res) {
    //try/catch por volta de todo codigo para capturar e tratar erros internos
    try {
      const providers = await User.findAll({
        //procrando usuarios que são provedores
        where: { provider: true },
        attributes: ["id", "name", "email", "avatar_id"], // pegando somente dados úteis
        //incluindo relacionamento para pegar o avatar
        include: [
          {
            model: File,
            as: "avatar",
            attributes: ["name", "path", "url"]
          }
        ]
      });

      return res.json(providers);
    } catch (erros) {
      return res.json({
        msg: "Houve erro interno na aplicação",
        erro: erros
      });
    }
  }
}

export default new ProviderController();
