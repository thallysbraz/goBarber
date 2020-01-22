import Appointment from "../models/Appointment"; //Model de agendamentos
import User from "../models/User";
import * as Yup from "yup";

class AppointmentController {
  //store para criar agendamento
  async store(req, res) {
    //try/catch por volta de todo codigo para capturar e tratar erros internos
    try {
      const schema = Yup.object().shape({
        provider_id: Yup.number() //id numero
          .integer() //inteiro
          .required(), //obrigatorio
        date: Yup.date().required() //data obrigatoria
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Validationfails" });
      }

      const { provider_id, date } = req.body; //recebendo dados

      const checkIsProvider = await User.findOne({
        // verifica se o usuario é um fornecedor
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
      const appointment = await Appointment.create({
        user_id: req.userId,
        provider_id,
        date
      });

      return res.json(appointment); //retorna os dados
    } catch (erros) {
      return res.json({
        erros: "houve error interno na aplicação",
        erro: erros
      });
    }
  }
}

export default new AppointmentController();
