const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Initialize DB tables if they don't exist
const initDb = async () => {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(50) UNIQUE NOT NULL,
        value JSONB NOT NULL
      );

      CREATE TABLE IF NOT EXISTS expenses (
        id VARCHAR(50) PRIMARY KEY,
        date TIMESTAMP NOT NULL,
        category VARCHAR(50) NOT NULL,
        amount NUMERIC(10, 2) NOT NULL,
        note TEXT,
        type VARCHAR(50)
      );
    `);
    } catch (err) {
        console.error('Error initializing database:', err);
    }
};

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Initialize DB on first request
    await initDb();

    if (req.method === 'GET') {
        try {
            const result = await pool.query("SELECT value FROM settings WHERE key = 'tiffin_settings'");
            if (result.rows.length > 0) {
                return res.status(200).json(result.rows[0].value);
            } else {
                return res.status(200).json({ pricePerTiffin: 0, rentAmount: 5000 });
            }
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    if (req.method === 'POST') {
        const settings = req.body;
        try {
            await pool.query(
                `INSERT INTO settings (key, value) VALUES ('tiffin_settings', $1)
         ON CONFLICT (key) DO UPDATE SET value = $1`,
                [JSON.stringify(settings)]
            );
            return res.status(200).json(settings);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
