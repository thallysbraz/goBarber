import File from "../models/File";

class FileControler {
  //store para salvar arquivo recebido
  async store(req, res) {
    try {
      const { originalname: name, filename: path } = req.file; //pegando dados
      //criando arquivo
      const file = await File.create({
        name,
        path
      });

      return res.json(file); //retorna os dados
    } catch (erros) {
      return res.json({
        erros: "Houve erro interno na aplicação",
        erro: erros
      });
    }
  }
}

export default new FileControler();
