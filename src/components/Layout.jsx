
// components/Layout.jsx
import React from 'react';
import Header from './Header';

function Layout({ children, setCurrentView, isSidebarOpen, setSidebarOpen, stats }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header setCurrentView={setCurrentView} />

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Main content area */}
                    <div className="flex-1">
                        {children}
                    </div>

                    {/* Sidebar - only visible on medium screens and above */}
                    <div className="hidden md:block w-64 flex-shrink-0">
                        <div className="bg-white p-5 rounded-lg shadow-md">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Your Stats</h3>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Total Decisions</p>
                                    <p className="text-2xl font-bold text-indigo-600">{stats.total}</p>
                                </div>

                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Decided</p>
                                        <p className="text-xl font-bold text-green-600">{stats.decided}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Thinking</p>
                                        <p className="text-xl font-bold text-yellow-600">{stats.thinking}</p>
                                    </div>
                                </div>

                                {stats.decided > 0 && (
                                    <div>
                                        <p className="text-sm text-gray-500 mb-2">Outcomes</p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    <span className="text-sm">No regrets</span>
                                                </div>
                                                <span className="text-sm font-medium">{stats.goodDecisions}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                                                    <span className="text-sm">Still unsure</span>
                                                </div>
                                                <span className="text-sm font-medium">{stats.unsureDecisions}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                                    <span className="text-sm">Had regrets</span>
                                                </div>
                                                <span className="text-sm font-medium">{stats.badDecisions}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h4>
                                <button
                                    onClick={() => setCurrentView('form')}
                                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mb-2"
                                >
                                    Log New Decision
                                </button>
                                <button
                                    onClick={() => setCurrentView('list')}
                                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                                >
                                    View All Decisions
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;