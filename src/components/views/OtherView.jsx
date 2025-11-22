import React, { useState } from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { format } from 'date-fns';
import { ShoppingBag, Plus, Trash2 } from 'lucide-react';

const OtherView = () => {
    const { selectedDate, expenses, addExpense, removeExpense } = useExpense();
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');

    const dateKey = selectedDate.toDateString();
    const otherExpenses = expenses.filter(e =>
        new Date(e.date).toDateString() === dateKey &&
        e.category === 'Others'
    );

    const handleAddOther = (e) => {
        e.preventDefault();
        if (!amount) return;
        addExpense({
            date: selectedDate.toISOString(),
            category: 'Others',
            amount: Number(amount),
            note: note || 'Expense'
        });
        setAmount('');
        setNote('');
    };

    return (
        <div className="h-full flex flex-col p-4 pb-24">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Others</h2>
                <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {format(selectedDate, 'd MMM')}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 mb-4">
                {otherExpenses.length === 0 ? (
                    <div className="text-center py-10">
                        <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                            <ShoppingBag size={32} />
                        </div>
                        <p className="text-slate-500 font-medium">No expenses yet</p>
                        <p className="text-slate-400 text-sm">Add miscellaneous expenses below</p>
                    </div>
                ) : (
                    otherExpenses.map(expense => (
                        <div key={expense.id} className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-xl shadow-sm group">
                            <div>
                                <div className="font-medium text-slate-800">{expense.note}</div>
                                <div className="text-xs text-slate-500">{format(new Date(expense.date), 'h:mm a')}</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-slate-700">₹{expense.amount}</span>
                                <button
                                    onClick={() => removeExpense(expense.id)}
                                    className="text-slate-300 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={handleAddOther} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-semibold text-slate-700 mb-3">Add New Expense</h3>
                <div className="flex gap-3 mb-3">
                    <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="₹0"
                        className="w-24 px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                    <input
                        type="text"
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        placeholder="Note"
                        className="flex-1 px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>
                <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 rounded-xl shadow-lg shadow-slate-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                    <Plus size={20} /> Add
                </button>
            </form>
        </div>
    );
};

export default OtherView;
