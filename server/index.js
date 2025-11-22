const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Database Schema
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
    console.log('Database schema initialized');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};

// Routes

// GET /api/expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM expenses ORDER BY date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/expenses
app.post('/api/expenses', async (req, res) => {
  const { id, date, category, amount, note, type } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO expenses (id, date, category, amount, note, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id, date, category, amount, note, type]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/expenses/:id
app.delete('/api/expenses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM expenses WHERE id = $1', [id]);
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/settings
app.get('/api/settings', async (req, res) => {
  try {
    const result = await pool.query("SELECT value FROM settings WHERE key = 'tiffin_settings'");
    if (result.rows.length > 0) {
      res.json(result.rows[0].value);
    } else {
      res.json({ pricePerTiffin: 0, rentAmount: 5000 });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/settings
app.post('/api/settings', async (req, res) => {
  const settings = req.body;
  try {
    await pool.query(
      `INSERT INTO settings (key, value) VALUES ('tiffin_settings', $1)
       ON CONFLICT (key) DO UPDATE SET value = $1`,
      [JSON.stringify(settings)]
    );
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initDb();
});
