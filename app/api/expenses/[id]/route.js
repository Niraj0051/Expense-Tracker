const { getPool } = require('@/lib/_db');
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
    const pool = getPool();
    const { id } = params;

    console.log('Attempting to delete expense:', id);

    try {
        await pool.query('DELETE FROM expenses WHERE id = $1', [id]);
        console.log('Delete successful');
        return NextResponse.json({ message: 'Expense deleted' });
    } catch (err) {
        console.error('DELETE /api/expenses/[id] error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
