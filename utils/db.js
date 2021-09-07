module.exports = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      port : 3308,
      user : 'root',
      password : '',
      database : 'online-auction'
    }
  });