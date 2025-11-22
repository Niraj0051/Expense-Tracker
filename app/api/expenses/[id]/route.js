const { getPool } = require('@/lib/_db');
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
    const pool = getPool();
    // Next.js 15+ requires awaiting params
    const { id } = await params;

    console.log('Attempting to delete expense:', id);

    try {
        const result = await pool.query('DELETE FROM expenses WHERE id = $1', [id]);
        console.log('Delete successful, rows affected:', result.rowCount);
        return NextResponse.json({ message: 'Expense deleted', rowCount: result.rowCount });
    } catch (err) {
        console.error('DELETE /api/expenses/[id] error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
