console.log('BASE DE DADOS: ' + process.env.JAWSDB_MARIA_URL);

module.exports = {
  "type": "mysql",
  "url": process.env.JAWSDB_MARIA_URL,
  "entities": [
    "dist/models/**/*.js"
  ],
  "migrations": [
    "dist/database/migrations/**/*.js"
  ],
  "cli":{
    "migrationsDir": [
      "src/database/migrations/"
    ],
    "entitiesDir": "src/models/"
  }
}
