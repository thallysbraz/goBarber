import * as Yup from "yup";
import pt from "date-fns/locale/pt";
import { startOfHour, parseISO, isBefore, format, subHours } from "date-fns";

import Appointment from "../models/Appointment"; //Model de agendamentos
import User from "../models/User"; //Model de usuário
import File from "../models/File"; //Model de arquivos
import Notification from "../schemas/Notification";

class AppointmentController {
  //listando agendamentos de usuário
  async index(req, res) {
    try {
      const { page = 1 } = req.query; //recebendo paginação

      const appointments = await Appointment.findAll({
        where: {
          user_id: req.userId,
          canceled_at: null
        },
        order: ["date"],
        attributes: ["id", "date"],
        limit: 20, //listando no maximo 20 registros
        offset: (page - 1) * 20, //pulando registros ja listados
        include: [
          {
            model: User,
            as: "provider",
            attributes: ["id", "name"],
            include: [{ model: File, as: "avatar" }]
          }
        ]
      });

      return res.json(appointments);
    } catch (erros) {
      return res.json({ msg: "Houve erro interno na aplicação", erros: erros });
    }
  }

  //store para criar agendamento
  async store(req, res) {
    //try/catch por volta de todo codigo para capturar e tratar erros internos
    try {
      //fazendo validação com Yup
      const schema = Yup.object().shape({
        provider_id: Yup.number() //id numero
          .integer() //inteiro
          .required(), //obrigatorio
        date: Yup.date().required() //data obrigatoria
      });

      //Se a validação não passar, retorna o erro
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Validationfails" });
      }

      //Se passar ... next();
      const { provider_id, date } = req.body; //recebendo dados

      // verifica se o usuario é um fornecedor
      const checkIsProvider = await User.findOne({
        //id pertence a um fornecedor, e se provider: true;
        where: { id: provider_id, provider: true }
      });

      //Se não for um fornecedor, retorna o erro
      if (!checkIsProvider) {
        return res.status(401).json({
          error: "You can only create appointments with providers"
        });
      }
      //Se for um fornecedor ... next();

      //hourStart pra pegar a hora, desconsiderando minutos e segundos
      const hourStart = startOfHour(parseISO(date));

      //check for past dates
      if (isBefore(hourStart, new Date())) {
        // se a hora/data informada é anterior a hora/data atual
        return res.status(400).json({
          error: "Past dates are not permitted"
        });
      }

      //procurando agendamento nesse horario
      const checkAvailability = await Appointment.findOne({
        where: {
          provider_id,
          canceled_at: null,
          date: hourStart
        }
      });

      // se ja existe um agendamento nesse horario
      if (checkAvailability) {
        return res
          .status(400) // ele retorna um json com o erro
          .json({
            error: "Appointment date is not available "
          });
      }

      //se não existir salva
      //save appointment
      const appointment = await Appointment.create({
        user_id: req.userId,
        provider_id,
        date
      });

      //Notify appointment provider
      //buscando nome do usuário
      const user = await User.findByPk(req.userId);

      //formatando data
      const formattedDate = format(
        hourStart,
        "'dia' dd 'de' MMMM', às' H:mm'h'",
        { locale: pt }
      );

      //salvando notificação no MongoDB
      await Notification.create({
        content: `Novo agendamento de ${user.name} para ${formattedDate}`,
        user: provider_id
      });

      return res.json(appointment); //retorna os dados
    } catch (erros) {
      return res.json({ msg: "Houve erro interno na aplicação", erros: erros });
    }
  }
}

export default new AppointmentController();
