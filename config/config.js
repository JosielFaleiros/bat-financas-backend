module.exports = {
  "development": {
    // "logging": false,
    "username": "root",
    "password": "root",
    "database": "batfinancas",
    "host": "127.0.0.1",
    "dialect": "mongodb"
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "batfinancas",
    "host": "127.0.0.1",
    "dialect": "mongodb"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_SECRET,
    "database": "batfinancas",
    "host": process.env.DB_HOST,
    "dialect": "mongodb"
  },
  "secret": process.env.TOKEN_SECRET
}
