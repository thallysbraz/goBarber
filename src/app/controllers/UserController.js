import User from "../models/User"; // Model de usuário

class UserController {
  async store(req, res) {
    //verificando se existe algum usuário com email registrado no Banco
    const userExists = await User.findOne({
      where: { email: req.body.email }
    });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }
    // criando Usuário no Banco
    const { id, name, email, provider } = await User.create(req.body);
    // pegando retorno somente dos dados importantes no front

    return res.json({ id, name, email, provider });
  }
}

export default new UserController();
