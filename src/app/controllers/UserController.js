import * as Yup from "yup"; // Importando yup

import User from "../models/User"; // Model de usuário

class UserController {
  //store para criar usuário
  async store(req, res) {
    try {
      //criando validações
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .required()
          .min(6)
      });

      //Se nao passar na validação retorna
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "validation fails" });
      }
      //Se passar ... next();

      //verificando se existe algum usuário com email registrado no Banco
      const userExists = await User.findOne({
        where: { email: req.body.email }
      });

      //se encontrar algum registro
      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }

      //se não encontrou:
      const { id, name, email, provider } = await User.create(req.body);

      return res.json({ id, name, email, provider }); //retornando somente dos dados importantes para o front
    } catch (erros) {
      return res.json({
        error: "Houve error interno na aplicação",
        erro: erros
      });
    }
  }

  //update para atualizar usuário
  async update(req, res) {
    try {
      //criando validações com biblioteca Yup
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(6),
        password: Yup.string()
          .min(6)
          .when("oldPassword", (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when("password", (password, field) =>
          password ? field.required().oneOf([Yup.ref("password")]) : field
        )
      });

      //Se nao passar na validação retorna
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "validation fails" });
      }
      //Se passar ... next();

      const { email, oldPassword } = req.body; //recebendo dados

      const user = await User.findByPk(req.userId); //buscando user

      //verificando se usuário esta trocando email
      if (email !== user.email) {
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
          return res.status(400).json({ error: "User already exists" });
        }
      }
      //verificando se a senha antiga está correta com a informada
      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res
          .status(401)
          .json({ error: "Password does not math. Invalid" });
      }

      const { id, name, provider } = await user.update(req.body); //salvando atualização

      return res.json({ id, name, email, provider }); //retornando dados atualizados
    } catch (erros) {
      return res.json({
        error: "Houve error interno na aplicação",
        erro: erros
      });
    }
  }
}

export default new UserController();
