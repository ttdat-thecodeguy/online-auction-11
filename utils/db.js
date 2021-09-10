// module.exports = require('knex')({
//     client: 'mysql2',
//     connection: {
//       host : 'localhost',
//       port : 3308,
//       user : 'root',
//       password : '',
//       database : 'online-auction'
//     }
//   });



  module.exports = require('knex')({
    client: 'mysql2',
    connection: {
      host : process.env.DB_HOST,
      port : process.env.DB_PORT,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME
    }
  });