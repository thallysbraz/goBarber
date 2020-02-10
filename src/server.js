import app from "./app";

const port = 3000; //porta que o server esta rodando

app.listen(port, () => {
  console.log("server rodando na porta: " + port);
});
