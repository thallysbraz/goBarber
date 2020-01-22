import Appointment from "../models/Appointment"; //Model de agendamentos
import User from "../models/User";
import * as Yup from "yup";

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number() //id numero
        .integer() //inteiro
        .required(), //obrigatorio
      date: Yup.date().required() //data obrigatoria
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validationfails" });
    }

    const { provider_id, date } = req.body;

    if (provider_id === 7) {
      /* 
      Check if provider_id is a provider
    */

      console.log("number");
    } else {
      console.log("is number not");
    }

    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true }
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: "You can only create appointments with providers" });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
