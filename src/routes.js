const { Router } = require("express");

const routes = new Router(); //instanciando rotas

routes.get("/", (req, res) => {
  return res.json({ msg: "Hello Word" });
});

module.exports = routes;
