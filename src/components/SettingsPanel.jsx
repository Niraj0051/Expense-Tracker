import React, { useState, useEffect } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { Settings, X } from 'lucide-react';

const SettingsPanel = () => {
    const { tiffinSettings, updateTiffinSettings } = useExpense();
    const [isOpen, setIsOpen] = useState(false);
    const [price, setPrice] = useState(tiffinSettings.pricePerTiffin);
    const [rent, setRent] = useState(tiffinSettings.rentAmount || 5000);

    // Sync local state when settings change (e.g. on first load)
    useEffect(() => {
        setPrice(tiffinSettings.pricePerTiffin);
        setRent(tiffinSettings.rentAmount || 5000);
    }, [tiffinSettings]);

    const handleSave = () => {
        updateTiffinSettings({
            pricePerTiffin: Number(price),
            rentAmount: Number(rent)
        });
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors active:bg-slate-200"
                title="Settings"
            >
                <Settings size={22} className="text-slate-600" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-800">Settings</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-5">
                            {/* Tiffin Price */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Price per Tiffin
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-lg"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            {/* Rent Amount */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Monthly Rent Amount
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                                    <input
                                        type="number"
                                        value={rent}
                                        onChange={(e) => setRent(e.target.value)}
                                        className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-lg"
                                        placeholder="5000"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleSave}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-2"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SettingsPanel;
