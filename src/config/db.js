const { Pool } = require('pg')

module.exports = new Pool({
    user: "postgres",
    password: 998310,
    host: "localhost",
    port: 5432,
    database: "myTeacher"
})