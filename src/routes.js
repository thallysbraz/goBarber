import { Router } from "express";

import User from "./app/models/User";

const routes = new Router(); //instanciando rotas

routes.get("/", async (req, res) => {
  const user = await User.create({
    name: "Thallys",
    email: "thallysbraz3@gmail.com",
    password_hash: "1234"
  });

  return res.json(user);
});

export default routes;
