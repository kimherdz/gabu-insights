const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: '123456',
    port: 5432,
});

pool.on('connect', () => {
    console.log('connected to database');
});

pool.on('error', (err) => {
    console.error('error en la conexion:', err);
});

module.exports = pool;