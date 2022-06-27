const Pool = require("pg").Pool;
const pool = new Pool({
    user: 'postgres', // default postgres
    host: 'localhost', // default localhost
    database: 'monhold',
    password: 'postgres', //added during PostgreSQL and pgAdmin installation
    port: '5432', //default port
    // ssl: {
    //     rejectUnauthorized: false
    // }
});

module.exports = pool;