const { getPool, initDb } = require('@/lib/_db');
import { NextResponse } from 'next/server';

export async function GET() {
    const pool = getPool();

    await initDb();

    try {
        const result = await pool.query("SELECT value FROM settings WHERE key = 'tiffin_settings'");
        if (result.rows.length > 0) {
            console.log('Fetched settings:', result.rows[0].value);
            return NextResponse.json(result.rows[0].value);
        } else {
            console.log('No settings found, returning defaults');
            return NextResponse.json({ pricePerTiffin: 0, rentAmount: 5000 });
        }
    } catch (err) {
        console.error('GET /api/settings error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(request) {
    const pool = getPool();
    const settings = await request.json();

    console.log('Attempting to update settings:', settings);

    try {
        await pool.query(
            `INSERT INTO settings (key, value) VALUES ('tiffin_settings', $1)
       ON CONFLICT (key) DO UPDATE SET value = $1`,
            [JSON.stringify(settings)]
        );
        console.log('Settings update successful');
        return NextResponse.json(settings);
    } catch (err) {
        console.error('POST /api/settings error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
