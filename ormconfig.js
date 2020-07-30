console.log('BASE DE DADOS: ' + process.env.JAWSDB_MARIA_URL);

module.exports = {
  "type": "mysql",
  "url": process.env.JAWSDB_MARIA_URL,
  "entities": [
    "dist/models/**/*.js"
    // "src/models/**/*.ts"
  ],
  "migrations": [
    "dist/database/migrations/**/*.js"
    // "src/database/migrations/**/*.ts"
  ],
  "cli":{
    "migrationsDir": [
      "src/database/migrations/"
    ],
    "entitiesDir": "src/models/"
  }
}
