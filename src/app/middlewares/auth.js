import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../../config/auth"; //Config do token

export default async (req, res, next) => {
  const authHeader = req.headers.authorization; //pegando token

  //verificando se token foi enviado na requisição
  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");
  console.log("token: ", token);

  try {
    //verificando se o token e valido
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id; //pegando ID do usuário
    return next(); //se deu tudo certo, retorna next
  } catch (error) {
    //se tiver error, captura e retorna no json
    return res.status(401).json({ err: "token invalid" });
  }
};
