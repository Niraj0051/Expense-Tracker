'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, format } from 'date-fns';

const ExpenseContext = createContext();

export const useExpense = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [tiffinSettings, setTiffinSettings] = useState({ pricePerTiffin: 0, rentAmount: 5000 });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expensesRes, settingsRes] = await Promise.all([
          fetch('/api/expenses'),
          fetch('/api/settings')
        ]);

        const expensesData = await expensesRes.json();
        const settingsData = await settingsRes.json();

        if (Array.isArray(expensesData)) {
          // Fix: Postgres returns NUMERIC as strings, so we must parse them
          const parsedExpenses = expensesData.map(e => ({
            ...e,
            amount: Number(e.amount)
          }));
          setExpenses(parsedExpenses);
        } else {
          console.error('Expected array for expenses but got:', expensesData);
          setExpenses([]);
        }

        if (settingsData && !settingsData.error) {
          setTiffinSettings(settingsData);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Actions
  const addExpense = async (expense) => {
    const newExpense = { ...expense, id: Date.now().toString() };

    // Optimistic update
    setExpenses(prev => [newExpense, ...prev]);

    try {
      await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense)
      });
    } catch (error) {
      console.error('Failed to add expense:', error);
      // Revert on failure (optional, but good practice)
      setExpenses(prev => prev.filter(e => e.id !== newExpense.id));
    }
  };

  const removeExpense = async (id) => {
    // Optimistic update
    setExpenses(prev => prev.filter(e => e.id !== id));

    try {
      await fetch(`/api/expenses/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Failed to delete expense:', error);
    }
  };

  const updateTiffinSettings = async (settings) => {
    const newSettings = { ...tiffinSettings, ...settings };
    setTiffinSettings(newSettings);

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  };

  const changeMonth = (offset) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  const selectDate = (date) => {
    setSelectedDate(date);
  };

  // Helpers
  const getExpensesForDate = (date) => {
    return expenses.filter(e => isSameDay(new Date(e.date), date));
  };

  const getMonthlyExpenses = (monthDate) => {
    const start = startOfMonth(monthDate);
    const end = endOfMonth(monthDate);
    return expenses.filter(e => {
      const d = new Date(e.date);
      return d >= start && d <= end;
    });
  };

  const value = {
    expenses,
    tiffinSettings,
    currentDate,
    selectedDate,
    loading,
    addExpense,
    removeExpense,
    updateTiffinSettings,
    changeMonth,
    selectDate,
    getExpensesForDate,
    getMonthlyExpenses
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};
