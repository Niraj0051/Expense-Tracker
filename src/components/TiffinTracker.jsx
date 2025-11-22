import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { Plus, Utensils } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';

const TiffinTracker = () => {
    const { selectedDate, expenses, addExpense, tiffinSettings } = useExpense();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    // Filter expenses for selected date that are of category 'Meals' and type 'tiffin'
    const tiffins = expenses.filter(e =>
        new Date(e.date).toDateString() === selectedDate.toDateString() &&
        e.category === 'Meals' &&
        e.type === 'tiffin'
    );

    const totalCost = tiffins.reduce((sum, t) => sum + t.amount, 0);

    const handleAddClick = () => {
        if (tiffinSettings.pricePerTiffin <= 0) {
            alert("Please set a Tiffin Price in Settings first!");
            return;
        }
        setIsConfirmOpen(true);
    };

    const confirmAddTiffin = () => {
        // Create a date object with the selected date but current time
        const now = new Date();
        const expenseDate = new Date(selectedDate);
        expenseDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());

        addExpense({
            date: expenseDate.toISOString(),
            category: 'Meals',
            type: 'tiffin',
            amount: tiffinSettings.pricePerTiffin,
            note: 'Tiffin'
        });
    };

    return (
        <>
            <div className="bg-orange-50/50 rounded-xl border border-orange-100 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-orange-700">
                    <div className="bg-orange-100 p-1.5 rounded-lg">
                        <Utensils size={18} />
                    </div>
                    <h3 className="font-semibold">Tiffin Tracker</h3>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-orange-800">{tiffins.length}</span>
                            <span className="text-sm font-medium text-orange-600 uppercase tracking-wide">Tiffins</span>
                        </div>
                        <div className="text-sm text-orange-600 font-medium mt-1">
                            Total Cost: ₹{totalCost}
                        </div>
                    </div>

                    <button
                        onClick={handleAddClick}
                        className="bg-orange-500 hover:bg-orange-600 text-white w-12 h-12 rounded-full shadow-lg shadow-orange-200 flex items-center justify-center transition-all active:scale-90"
                    >
                        <Plus size={28} />
                    </button>
                </div>

                {tiffinSettings.pricePerTiffin === 0 && (
                    <div className="mt-3 bg-orange-100/80 text-orange-800 text-xs px-3 py-2 rounded-lg border border-orange-200">
                        ⚠️ Set price in settings to start tracking
                    </div>
                )}
            </div>

            <ConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmAddTiffin}
                title="Add Tiffin?"
                message={`Are you sure you want to add a tiffin for ₹${tiffinSettings.pricePerTiffin}?`}
                confirmText="Add Tiffin"
                confirmColor="bg-orange-500 hover:bg-orange-600 shadow-orange-200"
            />
        </>
    );
};

export default TiffinTracker;
