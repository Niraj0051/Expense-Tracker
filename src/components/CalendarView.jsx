import React from 'react';
import { useExpense } from '../context/ExpenseContext';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarView = () => {
    const { currentDate, changeMonth, selectedDate, selectDate, getExpensesForDate } = useExpense();

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="flex flex-col h-full p-4 sm:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                    {format(currentDate, 'MMMM yyyy')}
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => changeMonth(-1)}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors active:bg-slate-200"
                    >
                        <ChevronLeft size={20} className="text-slate-600" />
                    </button>
                    <button
                        onClick={() => changeMonth(1)}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors active:bg-slate-200"
                    >
                        <ChevronRight size={20} className="text-slate-600" />
                    </button>
                </div>
            </div>

            {/* Grid Header */}
            <div className="grid grid-cols-7 mb-2">
                {weekDays.map(day => (
                    <div key={day} className="text-center text-xs sm:text-sm font-semibold text-slate-400 py-2 uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden flex-1">
                {calendarDays.map((day, idx) => {
                    const dayExpenses = getExpensesForDate(day);
                    const totalAmount = dayExpenses.reduce((sum, e) => sum + e.amount, 0);
                    const isSelected = isSameDay(day, selectedDate);
                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const isDayToday = isToday(day);

                    return (
                        <button
                            key={day.toString()}
                            onClick={() => selectDate(day)}
                            className={`
                relative min-h-[80px] sm:min-h-[100px] p-1 sm:p-2 flex flex-col items-center sm:items-start text-left transition-all
                ${!isCurrentMonth ? 'bg-slate-50/50 text-slate-400' : 'bg-white hover:bg-slate-50'}
                ${isSelected ? 'ring-2 ring-inset ring-blue-500 z-10' : ''}
              `}
                        >
                            <span className={`
                text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mb-1
                ${isDayToday ? 'bg-blue-600 text-white' : ''}
              `}>
                                {format(day, 'd')}
                            </span>

                            {totalAmount > 0 && (
                                <div className="mt-auto w-full flex justify-center sm:justify-start">
                                    <span className="text-[10px] sm:text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md truncate max-w-full">
                                        ₹{totalAmount}
                                    </span>
                                </div>
                            )}

                            {/* Dots for categories (Desktop only now, or minimal on mobile if needed, but user asked for cost) */}
                            <div className="absolute top-2 right-2 hidden sm:flex flex-col gap-1">
                                <div className="flex gap-0.5">
                                    {dayExpenses.some(e => e.category === 'Meals') && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                    )}
                                    {dayExpenses.some(e => e.category === 'Rent') && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                    )}
                                    {dayExpenses.some(e => e.category === 'Others') && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                    )}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarView;
