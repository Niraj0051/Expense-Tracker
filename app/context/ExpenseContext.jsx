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
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save expense');
      }

      console.log('Expense saved successfully');
    } catch (error) {
      console.error('Failed to add expense:', error);
      // Revert on failure
      setExpenses(prev => prev.filter(e => e.id !== newExpense.id));
      // Alert user about the failure
      alert(`Failed to save expense: ${error.message}. Please check your connection and try again.`);
    }
  };

  const removeExpense = async (id) => {
    // Store the expense in case we need to restore it
    const expenseToDelete = expenses.find(e => e.id === id);

    // Optimistic update
    setExpenses(prev => prev.filter(e => e.id !== id));

    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete expense');
      }

      console.log('Expense deleted successfully');
    } catch (error) {
      console.error('Failed to delete expense:', error);
      // Restore on failure
      if (expenseToDelete) {
        setExpenses(prev => [expenseToDelete, ...prev]);
      }
      alert(`Failed to delete expense: ${error.message}. Please check your connection and try again.`);
    }
  };

  const updateTiffinSettings = async (settings) => {
    const oldSettings = tiffinSettings;
    const newSettings = { ...tiffinSettings, ...settings };
    setTiffinSettings(newSettings);

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save settings');
      }

      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Failed to update settings:', error);
      // Revert on failure
      setTiffinSettings(oldSettings);
      alert(`Failed to save settings: ${error.message}. Please check your connection and try again.`);
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
