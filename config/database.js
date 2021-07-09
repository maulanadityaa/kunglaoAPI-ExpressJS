const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '12345',
      database : 'express-api',
      port : 3306
    },
    debug: true
  });

module.exports = knex