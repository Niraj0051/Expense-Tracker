import React from 'react';
import { LayoutDashboard, Calendar, Utensils, Home, ShoppingBag } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'calendar', label: 'Calendar', icon: Calendar },
        { id: 'meals', label: 'Meals', icon: Utensils },
        { id: 'rent', label: 'Rent', icon: Home },
        { id: 'other', label: 'Others', icon: ShoppingBag },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 pb-safe pt-2 z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-around items-center max-w-md mx-auto">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 w-16
                ${isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}
              `}
                        >
                            <div className={`
                p-1.5 rounded-lg mb-1 transition-all
                ${isActive ? 'bg-blue-50 translate-y-[-2px]' : ''}
              `}>
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                            <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-0 hidden'}`}>
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
