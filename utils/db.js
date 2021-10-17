module.exports = require('knex')({
  //   client: 'mysql2',
  //   connection: {
  //     host : 'localhost',
  //     port : 3306,
  //     user : 'root',
  //     password : '',
  //     database : 'online-auction'
  //   }
  // });



  module.exports = require('knex')({
    client: 'mysql2',
    connection: {
      host : "us-cdbr-east-04.cleardb.com",
      port : 3306,
      user : "bcee0366b61953",
      password : "291d44bb",
      database : "heroku_1ab5fb504169dfe"
    }
  });