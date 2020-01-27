import Notification from "../schemas/Notification"; //Schema de notificações no Mongo

import User from "../models/User"; //Model de usuário

class NotificationController {
  async index(req, res) {
    // verifica se o usuario é um fornecedor
    const checkIsProvider = await User.findOne({
      //id pertence a um fornecedor, e se provider: true;
      where: { id: req.userId, provider: true }
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

    //retorna os dados
    return res.json(notifications);
  }
}

export default new NotificationController();
