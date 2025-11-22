import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { format } from 'date-fns';
import TiffinTracker from './TiffinTracker';
import { Home, ShoppingBag, Plus, Trash2 } from 'lucide-react';

const DayDetails = () => {
    const { selectedDate, expenses, addExpense, removeExpense } = useExpense();
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');

    const dateKey = selectedDate.toDateString();

    const dailyExpenses = expenses.filter(e =>
        new Date(e.date).toDateString() === dateKey
    );

    const rentExpense = dailyExpenses.find(e => e.category === 'Rent');
    const otherExpenses = dailyExpenses.filter(e => e.category === 'Others');

    const handleAddRent = () => {
        if (rentExpense) return;
        const rentAmount = prompt("Enter Rent Amount:", "5000");
        if (rentAmount) {
            addExpense({
                date: selectedDate.toISOString(),
                category: 'Rent',
                amount: Number(rentAmount),
                note: 'Monthly Rent'
            });
        }
    };

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
        <div className="h-full flex flex-col p-4 sm:p-6 gap-6">
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                    {format(selectedDate, 'EEEE, d MMM')}
                </h2>
            </div>

            <div className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pr-2">
                {/* Tiffin Section */}
                <TiffinTracker />

                {/* Rent Section */}
                <div className="bg-white rounded-xl border border-indigo-100 p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-indigo-700">
                            <div className="bg-indigo-50 p-1.5 rounded-lg">
                                <Home size={18} />
                            </div>
                            <h3 className="font-semibold">Rent</h3>
                        </div>
                        {rentExpense && (
                            <button
                                onClick={() => removeExpense(rentExpense.id)}
                                className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        )}
                    </div>

                    {rentExpense ? (
                        <div className="bg-indigo-50 text-indigo-900 p-4 rounded-xl font-medium flex justify-between items-center border border-indigo-100">
                            <span>Paid</span>
                            <span className="font-bold text-lg">₹{rentExpense.amount}</span>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddRent}
                            className="w-full py-3 border-2 border-dashed border-indigo-200 text-indigo-400 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition-all font-medium"
                        >
                            Add Rent Payment
                        </button>
                    )}
                </div>

                {/* Others Section */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-700 mb-2">
                        <div className="bg-slate-100 p-1.5 rounded-lg">
                            <ShoppingBag size={18} />
                        </div>
                        <h3 className="font-semibold">Other Expenses</h3>
                    </div>

                    <div className="space-y-2">
                        {otherExpenses.length === 0 && (
                            <p className="text-center text-slate-400 text-sm py-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                No other expenses for this day.
                            </p>
                        )}
                        {otherExpenses.map(expense => (
                            <div key={expense.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                                <div>
                                    <div className="font-medium text-slate-800">{expense.note}</div>
                                    <div className="text-xs text-slate-500">{format(new Date(expense.date), 'h:mm a')}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-slate-700">₹{expense.amount}</span>
                                    <button
                                        onClick={() => removeExpense(expense.id)}
                                        className="text-slate-300 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add Expense Form */}
            <form onSubmit={handleAddOther} className="mt-auto pt-4 border-t border-slate-100 bg-white">
                <div className="flex gap-3 mb-3">
                    <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="₹0"
                        className="w-24 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                    <input
                        type="text"
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        placeholder="Note (e.g. Groceries)"
                        className="flex-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                    <Plus size={20} /> Add Expense
                </button>
            </form>
        </div>
    );
};

export default DayDetails;
