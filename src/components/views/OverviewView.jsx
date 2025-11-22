import React from 'react';
import ExpenseSummary from '../ExpenseSummary';
import { useExpense } from '../../context/ExpenseContext';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const OverviewView = () => {
    const { currentDate, changeMonth } = useExpense();

    return (
        <div className="space-y-6 p-4 pb-24">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">Overview</h2>

                {/* Month Navigation */}
                <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
                    <button
                        onClick={() => changeMonth(-1)}
                        className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-slate-700 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-semibold text-slate-700 min-w-[90px] text-center">
                        {format(currentDate, 'MMMM yyyy')}
                    </span>
                    <button
                        onClick={() => changeMonth(1)}
                        className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-slate-700 transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <ExpenseSummary />

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">Quick Tip</h3>
                <p className="text-sm text-blue-600">
                    Use the arrows above to view expenses for different months. Your totals will update automatically.
                </p>
            </div>
        </div>
    );
};

export default OverviewView;
