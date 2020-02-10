import jwt from "jsonwebtoken";
import * as Yup from "yup";

import authConfig from "../../config/auth"; //Configs para JWT
import User from "../models/User"; //Model de Usuário

class SessionController {
  async store(req, res) {
    //try/catch por volta de todo codigo para capturar e tratar erros internos
    try {
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

      const { email, password } = req.body; //recebendo dados

      const user = await User.findOne({ where: { email } }); //procurando usuário no banco de dados

      //se nao encontrar
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      //se encontrar, verifica a senha
      if (!(await user.checkPassword(password))) {
        return res.status(401).json({
          error: "Password does not math. Invalid"
        });
      }
      //se a senha estiver correta
      const { id, name } = user; //salva dados do usuário para criar sessão
      return res.json({
        user: {
          id,
          name,
          email
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn
        })
      }); //retorna os dados da sessão
    } catch (erros) {
      return res.json({ msg: "houve erro interno na aplicação", erro: erros });
    }
  }
}

export default new SessionController();
