const { getPool, initDb } = require('@/lib/_db');
import { NextResponse } from 'next/server';

export async function GET() {
    const pool = getPool();
    const results = {
        timestamp: new Date().toISOString(),
        envCheck: {
            hasDatabaseUrl: !!process.env.DATABASE_URL,
            databaseUrlPrefix: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 20) + '...' : 'NOT SET'
        },
        connection: null,
        tables: [],
        error: null
    };

    try {
        const testQuery = await pool.query('SELECT NOW() as current_time');
        results.connection = {
            success: true,
            serverTime: testQuery.rows[0].current_time
        };

        await initDb();

        const tablesQuery = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
        results.tables = tablesQuery.rows.map(r => r.table_name);

        const expensesCount = await pool.query('SELECT COUNT(*) FROM expenses');
        const settingsCount = await pool.query('SELECT COUNT(*) FROM settings');

        results.rowCounts = {
            expenses: parseInt(expensesCount.rows[0].count),
            settings: parseInt(settingsCount.rows[0].count)
        };

        return NextResponse.json(results);
    } catch (err) {
        results.error = {
            message: err.message,
            code: err.code,
            detail: err.detail
        };
        return NextResponse.json(results, { status: 500 });
    }
}
