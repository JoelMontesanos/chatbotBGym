const  mysql = require('mysql');

const pool= mysql.createPool({
    connectionLimit:3,
    host: '162.241.62.192',
    user: 'proyecc6_root',
    password: 'McBeth5!!',
    database: 'proyecc6_bulletPagos'
});


module.exports = pool;