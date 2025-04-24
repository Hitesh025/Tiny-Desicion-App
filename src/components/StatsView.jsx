import React from 'react';

function StatsView({ stats, setCurrentView }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Your Stats</h2>
                <button
                    onClick={() => setCurrentView('list')}
                    className="text-gray-500 hover:text-gray-700"
                >
                    Back
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-indigo-50 p-4 rounded-md text-center">
                    <h3 className="text-sm font-medium text-indigo-800 mb-1">Total</h3>
                    <p className="text-2xl font-bold text-indigo-600">{stats.total}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-md text-center">
                    <h3 className="text-sm font-medium text-green-800 mb-1">Decided</h3>
                    <p className="text-2xl font-bold text-green-600">{stats.decided}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-md text-center">
                    <h3 className="text-sm font-medium text-yellow-800 mb-1">Thinking</h3>
                    <p className="text-2xl font-bold text-yellow-600">{stats.thinking}</p>
                </div>
            </div>

            {stats.decided > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Decision Outcomes</h3>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="relative h-6 bg-gray-100">
                            {stats.goodDecisions > 0 && (
                                <div
                                    className="absolute top-0 left-0 h-full bg-green-500"
                                    style={{ width: `${(stats.goodDecisions / stats.decided) * 100}%` }}
                                ></div>
                            )}
                            {stats.unsureDecisions > 0 && (
                                <div
                                    className="absolute top-0 h-full bg-yellow-500"
                                    style={{
                                        left: `${(stats.goodDecisions / stats.decided) * 100}%`,
                                        width: `${(stats.unsureDecisions / stats.decided) * 100}%`
                                    }}
                                ></div>
                            )}
                            {stats.badDecisions > 0 && (
                                <div
                                    className="absolute top-0 right-0 h-full bg-red-500"
                                    style={{ width: `${(stats.badDecisions / stats.decided) * 100}%` }}
                                ></div>
                            )}
                        </div>

                        <div className="p-4">
                            <div className="grid grid-cols-3 gap-2 text-center text-sm">
                                <div>
                                    <div className="flex items-center justify-center">
                                        <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                                        <span className="font-medium">No regrets</span>
                                    </div>
                                    <p>{stats.goodDecisions}</p>
                                </div>
                                <div>
                                    <div className="flex items-center justify-center">
                                        <span className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                                        <span className="font-medium">Still unsure</span>
                                    </div>
                                    <p>{stats.unsureDecisions}</p>
                                </div>
                                <div>
                                    <div className="flex items-center justify-center">
                                        <span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                                        <span className="font-medium">Had regrets</span>
                                    </div>
                                    <p>{stats.badDecisions}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="text-center mt-6">
                <button
                    onClick={() => setCurrentView('form')}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mb-3"
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
    );
}

export default StatsView;