'use client';

import React, { useState } from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { format } from 'date-fns';
import TiffinTracker from '../TiffinTracker';
import { Utensils, Trash2 } from 'lucide-react';
import ConfirmationModal from '../ConfirmationModal';

const MealView = () => {
    const { selectedDate, expenses, addExpense, removeExpense } = useExpense();
    const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, expense: null });
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');

    const dateKey = selectedDate.toDateString();
    const mealExpenses = expenses
        .filter(e =>
            new Date(e.date).toDateString() === dateKey &&
            e.category === 'Meals'
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort descending

    const handleDeleteClick = (expense) => {
        setDeleteConfirm({ isOpen: true, expense });
    };

    const confirmDelete = () => {
        if (deleteConfirm.expense) {
            removeExpense(deleteConfirm.expense.id);
        }
        setDeleteConfirm({ isOpen: false, expense: null });
    };

    const handleAddMeal = (e) => {
        e.preventDefault();
        if (!amount) return;

        // Create a date object with the selected date but current time
        const now = new Date();
        const expenseDate = new Date(selectedDate);
        expenseDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());

        addExpense({
            date: expenseDate.toISOString(),
            category: 'Meals',
            type: 'manual',
            amount: Number(amount),
            note: note || 'Meal'
        });
        setAmount('');
        setNote('');
    };

    return (
        <div className="space-y-6 p-4 pb-24">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">Meals</h2>
                <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {format(selectedDate, 'd MMM')}
                </div>
            </div>

            <TiffinTracker />

            <div className="space-y-3">
                <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                    <Utensils size={18} />
                    Today's Meals
                </h3>

                {mealExpenses.length === 0 ? (
                    <p className="text-slate-400 text-sm italic">No meal entries for this day.</p>
                ) : (
                    <div className="space-y-2">
                        {mealExpenses.map(expense => {
                            const dateObj = new Date(expense.date);
                            return (
                                <div key={expense.id} className="flex justify-between items-center p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                                    <div className="flex flex-col flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-slate-800 text-lg">
                                                {expense.note || 'Meal'}
                                            </span>
                                            {expense.type === 'tiffin' && (
                                                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">Tiffin</span>
                                            )}
                                        </div>
                                        <span className="text-xs font-medium text-slate-400">
                                            {format(dateObj, 'h:mm a')}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-slate-800 text-lg">₹{expense.amount}</span>
                                        <button
                                            onClick={() => handleDeleteClick(expense)}
                                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Manual Meal Entry Form */}
            <form onSubmit={handleAddMeal} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Utensils size={18} />
                    Add Manual Meal
                </h3>
                <div className="flex flex-col gap-3 mb-3">
                    <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="Amount (₹)"
                        className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    />
                    <input
                        type="text"
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        placeholder="Note (e.g., Lunch, Dinner, Snacks)"
                        className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    />
                </div>
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                    <Utensils size={20} /> Add Meal
                </button>
            </form>

            <ConfirmationModal
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, expense: null })}
                onConfirm={confirmDelete}
                title="Delete Meal Entry?"
                message={`Are you sure you want to delete this meal entry of ₹${deleteConfirm.expense?.amount || 0}?`}
                confirmText="Delete"
                confirmColor="bg-red-600 hover:bg-red-700 shadow-red-200"
            />
        </div>
    );
};

export default MealView;
