import app from "./app";

const port = 3001; //porta que o server esta rodando

app.listen(port, () => {
  console.log("server rodando na porta: " + port);
});
