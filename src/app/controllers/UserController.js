import User from "../models/User"; // Model de usuário

class UserController {
  //store para criar usuário
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

  //update para atualizar usuário
  async update(req, res) {
    const { email, oldPassoword } = req.body;

    const user = await User.findByPk(req.userId); //buscando user
    //verificando se usuário esta trocando email
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }
    }
    //verificando se a senha antiga está correta com a informada
    if (oldPassoword && !(await user.checkPassword(oldPassoword))) {
      return res.status(401).json({ error: "Password does not math. Invalid" });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({ id, name, email, provider });
  }
}

export default new UserController();
