module.exports = {
  dialect: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "First2019",
  database: "Barber",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
/*  DataBase with docker

module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "First2019",
  database: "goBarber",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};

*/
