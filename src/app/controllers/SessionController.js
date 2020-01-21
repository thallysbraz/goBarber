import jwt from "jsonwebtoken";
import * as Yup from "yup";

import authConfig from "../../config/auth"; //Configs para JWT
import User from "../models/User"; //Model de Usuário

class SessionController {
  async store(req, res) {
    //criando validações com biblioteca Yup
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      password: Yup.string().required()
    });

    //Se nao passar na validação retorna
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "validation fails" });
    }
    //Se passar ... next();

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({
        error: "Password does not math. Invalid"
      });
    }
    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  }
}

export default new SessionController();
