console.log('BASE DE DADOS: ' + process.env.JAWSDB_MARIA_URL);
console.log('DIR ENTITIES: ' + process.env.ENTITIES);
console.log('DIR MIGRATIONS: ' + process.env.MIGRATIONS);

module.exports = {
  "type": "mysql",
  "url": process.env.JAWSDB_MARIA_URL,
  "entities": [
    process.env.ENTITIES
    // "dist/models/**/*.js"
  ],
  "migrations": [
    process.env.MIGRATIONS
  // "dist/database/migrations/**/*.js"
  ],
  "cli":{
    "migrationsDir": [
      "src/database/migrations/"
    ],
    "entitiesDir": "src/models/"
  }
}
