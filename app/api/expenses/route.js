const { getPool, initDb } = require('@/lib/_db');
import { NextResponse } from 'next/server';

export async function GET() {
    const pool = getPool();

    try {
        await initDb();
        const result = await pool.query('SELECT * FROM expenses ORDER BY date DESC');
        console.log('Fetched expenses:', result.rows.length);
        return NextResponse.json(result.rows);
    } catch (err) {
        console.error('GET /api/expenses error:', err);
        return NextResponse.json({ error: err.message, stack: err.stack }, { status: 500 });
    }
}

export async function POST(request) {
    const pool = getPool();
    const body = await request.json();
    const { id, date, category, amount, note, type } = body;

    console.log('Attempting to insert expense:', { id, date, category, amount });

    try {
        await initDb();
        const result = await pool.query(
            'INSERT INTO expenses (id, date, category, amount, note, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [id, date, category, amount, note, type]
        );
        console.log('Insert successful:', result.rows[0]);
        return NextResponse.json(result.rows[0]);
    } catch (err) {
        console.error('POST /api/expenses error:', err);
        return NextResponse.json({ error: err.message, detail: err.detail }, { status: 500 });
    }
}
