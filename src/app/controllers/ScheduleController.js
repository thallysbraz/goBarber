import { Op } from "sequelize";
import { startOfDay, endOfDay, parseISO } from "date-fns";

import Appointment from "../models/Appointment";
import User from "../models/User";

class ScheduleController {
  //mostrar ao prestador de serviço, seus agendamentos
  async index(req, res) {
    //try/catch em volta de todo codigo pra previnir e tratar possiveis erros
    try {
      //verifica se o usuário é um prestador de serviços
      const checkUserProvider = await User.findOne({
        where: {
          id: req.userId,
          provider: true
        }
      });
      //senão for um prestador, envia um erro
      if (!checkUserProvider) {
        return res.status(401).json({ error: "User is not a provider" });
      }

      //se for ... next()
      const { date } = req.query; //recebe a data
      const parsedDate = parseISO(date); //converte a data em Date() javascript

      //procura em todos os agendamentos onde id do fornecedor é o id que o usuario esta logado
      const appointments = await Appointment.findAll({
        where: {
          provider_id: req.userId,
          canceled_at: null, //agendamento nao foi cancelado
          date: {
            //agendamentro esta dentro do range do comeco do dia ate o final do dia
            [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)]
          }
        },
        include: [
          // inclui
          {
            model: User, //a partir do model Usuario
            as: "user", //tabela user no banco de dados
            attributes: ["name"] //mostra os atributos: nome
          }
        ],
        order: ["date"] //ordenado pela data
      });

      return res.json(appointments); //retorna os agendamentos em json
    } catch (erros) {
      return res.json({ msg: "Houve erro interno na aplicação", erros: erros });
    }
  }
}

export default new ScheduleController();
