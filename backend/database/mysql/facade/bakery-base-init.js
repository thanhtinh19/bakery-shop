const Base = require("../mysql-base");
const config = require("../../../configs/database-config");

module.exports = new Base(console, config);