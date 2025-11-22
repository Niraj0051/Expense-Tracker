import React, { useState } from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { format } from 'date-fns';
import { Home, Trash2 } from 'lucide-react';
import ConfirmationModal from '../ConfirmationModal';

const RentView = () => {
    const { selectedDate, expenses, addExpense, removeExpense, tiffinSettings } = useExpense();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const dateKey = selectedDate.toDateString();
    const rentExpense = expenses.find(e =>
        new Date(e.date).toDateString() === dateKey &&
        e.category === 'Rent'
    );

    const handleAddClick = () => {
        if (rentExpense) return;
        setIsConfirmOpen(true);
    };

    const confirmAddRent = () => {
        // Use configured rent amount or default to 5000
        const amount = tiffinSettings.rentAmount || 5000;

        addExpense({
            date: selectedDate.toISOString(),
            category: 'Rent',
            amount: Number(amount),
            note: 'Monthly Rent'
        });
    };

    const rentAmount = tiffinSettings.rentAmount || 5000;

    return (
        <div className="space-y-6 p-4 pb-24">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">Rent</h2>
                <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {format(selectedDate, 'd MMM')}
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-indigo-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                        <Home size={32} />
                    </div>
                    {rentExpense && (
                        <button
                            onClick={() => removeExpense(rentExpense.id)}
                            className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>
                    )}
                </div>

                {rentExpense ? (
                    <div className="text-center space-y-2">
                        <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Status</div>
                        <div className="text-3xl font-bold text-indigo-600">Paid</div>
                        <div className="text-xl font-semibold text-slate-800">₹{rentExpense.amount}</div>
                        <div className="text-xs text-slate-400 mt-4">
                            Paid on {format(new Date(rentExpense.date), 'h:mm a')}
                        </div>
                    </div>
                ) : (
                    <div className="text-center space-y-4">
                        <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Status</div>
                        <div className="text-xl font-semibold text-slate-400">Not Paid</div>
                        <button
                            onClick={handleAddClick}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] mt-4"
                        >
                            Mark Paid (₹{rentAmount})
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 text-sm text-indigo-800">
                ℹ️ You can change the default rent amount in Settings.
            </div>

            <ConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmAddRent}
                title="Mark Rent as Paid?"
                message={`Are you sure you want to mark rent as paid (₹${rentAmount}) for this month?`}
                confirmText="Mark Paid"
                confirmColor="bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
            />
        </div>
    );
};

export default RentView;
