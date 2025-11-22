import React, { useState } from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import CalendarView from './components/CalendarView';
import OverviewView from './components/views/OverviewView';
import MealView from './components/views/MealView';
import RentView from './components/views/RentView';
import OtherView from './components/views/OtherView';
import BottomNav from './components/BottomNav';
import SettingsPanel from './components/SettingsPanel';
import { Calendar as CalendarIcon } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderView = () => {
    switch (activeTab) {
      case 'overview': return <OverviewView />;
      case 'calendar': return <div className="p-4 pb-24"><CalendarView /></div>;
      case 'meal': return <MealView />;
      case 'rent': return <RentView />;
      case 'other': return <OtherView />;
      default: return <OverviewView />;
    }
  };

  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-slate-50">
        {/* Navbar */}
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
          <div className="max-w-md mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2 text-blue-600">
              <div className="bg-blue-50 p-1.5 rounded-lg">
                <CalendarIcon size={20} className="text-blue-600" />
              </div>
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">Expense Tracker</h1>
            </div>
            <SettingsPanel />
          </div>
        </nav>

        <main className="max-w-md mx-auto min-h-[calc(100vh-60px)] relative">
          {renderView()}
        </main>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </ExpenseProvider>
  );
}

export default App;
