require("dotenv").config();

//DataBase local

/*module.exports = {
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
*/

//DataBase with docker

module.exports = {
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
