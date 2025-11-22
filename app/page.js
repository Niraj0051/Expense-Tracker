'use client';

import { ExpenseProvider } from './context/ExpenseContext';
import CalendarView from './components/CalendarView';
import BottomNav from './components/BottomNav';
import SettingsPanel from './components/SettingsPanel';
import OverviewView from './components/views/OverviewView';
import MealView from './components/views/MealView';
import RentView from './components/views/RentView';
import OtherView from './components/views/OtherView';
import { useState } from 'react';
import { Settings } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const renderView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'calendar':
        return <CalendarView />;
      case 'meals':
        return <MealView />;
      case 'rent':
        return <RentView />;
      case 'other':
        return <OtherView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <ExpenseProvider>
      <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b border-slate-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Expense Tracker
          </h1>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Settings size={24} className="text-slate-600" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {renderView()}
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Settings Panel */}
        <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </div>
    </ExpenseProvider>
  );
}
