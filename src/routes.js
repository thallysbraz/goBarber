import { Router } from "express";

const routes = new Router(); //instanciando rotas

routes.get("/", (req, res) => {
  return res.json({ msg: "Hello Word" });
});

export default routes;
