module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "1",
    DB: "tagtutorial",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };