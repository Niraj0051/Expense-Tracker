import React from 'react';
import { useExpense } from '../context/ExpenseContext';
import { format } from 'date-fns';
import { Wallet, Home, Utensils, ShoppingBag } from 'lucide-react';

const ExpenseSummary = () => {
    const { currentDate, getMonthlyExpenses } = useExpense();

    const monthlyExpenses = getMonthlyExpenses(currentDate);

    const totalExpense = monthlyExpenses.reduce((sum, e) => sum + e.amount, 0);

    const rentTotal = monthlyExpenses
        .filter(e => e.category === 'Rent')
        .reduce((sum, e) => sum + e.amount, 0);

    const mealsTotal = monthlyExpenses
        .filter(e => e.category === 'Meals')
        .reduce((sum, e) => sum + e.amount, 0);

    const othersTotal = monthlyExpenses
        .filter(e => e.category === 'Others')
        .reduce((sum, e) => sum + e.amount, 0);

    const tiffinCount = monthlyExpenses
        .filter(e => e.category === 'Meals' && e.type === 'tiffin')
        .length;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-5 shadow-lg shadow-blue-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3 opacity-90">
                        <div className="bg-white/20 p-1.5 rounded-lg">
                            <Wallet size={18} />
                        </div>
                        <span className="font-medium text-sm">Total Spent</span>
                    </div>
                    <div className="text-3xl font-bold tracking-tight">₹{totalExpense}</div>
                    <div className="text-sm opacity-75 mt-1 font-medium">{format(currentDate, 'MMMM yyyy')}</div>
                </div>
            </div>

            {/* Rent Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 relative overflow-hidden group hover:border-indigo-200 transition-colors">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-2xl"></div>
                <div className="flex items-center gap-2 text-indigo-600 mb-2">
                    <div className="bg-indigo-50 p-1.5 rounded-lg group-hover:bg-indigo-100 transition-colors">
                        <Home size={18} />
                    </div>
                    <span className="font-semibold text-sm">Rent</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">₹{rentTotal}</div>
            </div>

            {/* Meals Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 relative overflow-hidden group hover:border-orange-200 transition-colors">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-l-2xl"></div>
                <div className="flex items-center gap-2 text-orange-600 mb-2">
                    <div className="bg-orange-50 p-1.5 rounded-lg group-hover:bg-orange-100 transition-colors">
                        <Utensils size={18} />
                    </div>
                    <span className="font-semibold text-sm">Meals</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">₹{mealsTotal}</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">{tiffinCount} Tiffins</div>
            </div>

            {/* Others Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 relative overflow-hidden group hover:border-slate-300 transition-colors">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-500 rounded-l-2xl"></div>
                <div className="flex items-center gap-2 text-slate-600 mb-2">
                    <div className="bg-slate-100 p-1.5 rounded-lg group-hover:bg-slate-200 transition-colors">
                        <ShoppingBag size={18} />
                    </div>
                    <span className="font-semibold text-sm">Others</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">₹{othersTotal}</div>
            </div>
        </div>
    );
};

export default ExpenseSummary;
