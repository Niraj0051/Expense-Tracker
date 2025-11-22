const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

async function testConnection() {
    try {
        console.log('Attempting to connect to:', process.env.DATABASE_URL.split('@')[1]); // Log host only for safety
        const client = await pool.connect();
        console.log('Successfully connected to Neon DB!');

        const res = await client.query('SELECT NOW()');
        console.log('Database time:', res.rows[0].now);

        console.log('Checking tables...');
        const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
        console.log('Existing tables:', tables.rows.map(r => r.table_name));

        client.release();
        process.exit(0);
    } catch (err) {
        console.error('Connection Error Details:', err);
        process.exit(1);
    }
}

testConnection();
