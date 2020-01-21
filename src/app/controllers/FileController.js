import File from "../models/File";

class FileControler {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file; //pegando dados

    const file = await File.create({
      name,
      path
    });

    return res.json(file);
  }
}

export default new FileControler();
