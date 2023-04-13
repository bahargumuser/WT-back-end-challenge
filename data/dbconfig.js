const knex = require("knex");
const { NODE_ENV } = require("../config");
const config = require("../knexfile");

module.exports = knex(config[NODE_ENV]);
