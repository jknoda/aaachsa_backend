var Sequelize = require('sequelize');
const dbConfig = require('./src/config/database')
const Empresa = require('./src/models/Empresa');

console.log(dbConfig);
const connection = new Sequelize(dbConfig);

Empresa.init(connection);

Empresa.findAll().then(function(results){
  console.log(results);
})

