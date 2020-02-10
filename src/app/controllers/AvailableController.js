import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter
} from "date-fns";
import { Op } from "sequelize";

import Appointment from "../models/Appointment"; //Model de agendamentos

class AvailableController {
  async index(req, res) {
    //recebando dados
    const { date } = req.query;

    //verificando se a data foi informada
    if (!date) {
      return res.status(400).json({ error: "Invalid date" });
    }

    //transformando dta em numero inteiro
    const searchDate = Number(date);

    //listando agendamentos
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)]
        }
      }
    });

    //buscando horarios disponiveis que os providers possui
    const schedule = [
      "08:00", // 2020-06-23 08:00:00
      "09:00", // 2020-06-23 09:00:00
      "10:00", // 2020-06-23 10:00:00
      "11:00", // 2020-06-23 11:00:00
      "12:00", // 2020-06-23 12:00:00
      "13:00", // 2020-06-23 13:00:00
      "14:00", // 2020-06-23 14:00:00
      "15:00", // 2020-06-23 15:00:00
      "16:00", // 2020-06-23 16:00:00
      "17:00", // 2020-06-23 17:00:00
      "18:00", // 2020-06-23 18:00:00
      "19:00" // 2020-06-23 19:00:00
    ];

    //available pra retornar as datas disponiveis para o usuário
    const available = schedule.map(time => {
      const [hour, minute] = time.split(":"); //pegando hora e minuto

      //value para converter as datas de 08:00 para 2020-06-23 08:00:00
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );

      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        //verificando se horario vai acontecer depois da data atual
        available:
          isAfter(value, new Date()) &&
          !appointments.find(a => format(a.date, "HH:mm") === time)
      };
    });

    return res.json(available); //retorna os dados
  }
}

export default new AvailableController();
