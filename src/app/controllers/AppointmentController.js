import Appointment from "../models/Appointment"; //Model de agendamentos
import * as Yup from "yup";

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      //id e data obrigatorio
      provider_id: yup.number().required(),
      date: Yup.date().required()
    });

    return res.json({ ok: "true" });
  }
}

export default new AppointmentController();
