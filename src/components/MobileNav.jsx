// components/MobileNav.jsx
import React from 'react';

function MobileNav({ currentView, setCurrentView, stats }) {
    return (
        <div className="fixed inset-x-0 bottom-0 md:hidden bg-white border-t border-gray-200 shadow-lg z-10">
            <div className="flex justify-around items-center h-16">
                <button
                    onClick={() => setCurrentView('list')}
                    className={`flex flex-col items-center px-4 py-2 ${currentView === 'list' ? 'text-indigo-600' : 'text-gray-500'
                        }`}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        ></path>
                    </svg>
                    <span className="text-xs mt-1">Decisions</span>
                </button>

                <button
                    onClick={() => setCurrentView('form')}
                    className={`flex flex-col items-center px-4 py-2 ${currentView === 'form' ? 'text-indigo-600' : 'text-gray-500'
                        }`}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                        ></path>
                    </svg>
                    <span className="text-xs mt-1">New</span>
                </button>

                <button
                    onClick={() => setCurrentView('stats')}
                    className={`flex flex-col items-center px-4 py-2 ${currentView === 'stats' ? 'text-indigo-600' : 'text-gray-500'
                        }`}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        ></path>
                    </svg>
                    <span className="text-xs mt-1">Stats</span>
                </button>
            </div>
        </div>
    );
}

export default MobileNav;