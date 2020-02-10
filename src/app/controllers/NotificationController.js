import Notification from "../schemas/Notification"; //Schema de notificações no Mongo

import User from "../models/User"; //Model de usuário

class NotificationController {
  //async para listar notificações
  async index(req, res) {
    try {
      // verifica se o usuario é um fornecedor
      const checkIsProvider = await User.findOne({
        where: { id: req.userId, provider: true } //id pertence a um fornecedor, e se provider: true;
      });

      //Se não for um fornecedor, retorna o erro
      if (!checkIsProvider) {
        return res.status(401).json({
          error: "Only provider can load notifications"
        });
      }
      //buscando notificações no mongoDB
      const notifications = await Notification.find({
        user: req.userId
      })
        .sort({ createdAt: "desc" }) //ordenando por data
        .limit(20); //limite de 20 notificações

      return res.json(notifications); //retorna os dados
    } catch (err) {
      return res.json({ msg: "Houve erro interno na aplicação", error: err });
    }
  }

  //update pra marcar como lida
  async update(req, res) {
    try {
      //buscando notificações no mongoDB, pelo ID
      const notification = await Notification.findByIdAndUpdate(
        req.params.id,
        { read: true }, //atualizando dado
        { new: true } //retornando dado atualizado
      );

      return res.json(notification); //retorna os dados
    } catch (err) {
      return res.json({ msg: "Houve erro interno na aplicação", error: err });
    }
  }
}

export default new NotificationController();
