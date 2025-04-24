import React from 'react';

function FiltersBar({ filters, setFilters }) {
    return (
        <div className="bg-gray-50 p-3 rounded-lg mb-4 flex flex-wrap gap-2">
            <div className="flex items-center">
                <label htmlFor="status" className="text-sm font-medium text-gray-700 mr-2">
                    Status:
                </label>
                <select
                    id="status"
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="all">All</option>
                    <option value="decided">Decided</option>
                    <option value="thinking">Still thinking</option>
                </select>
            </div>

            <div className="flex items-center ml-4">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2">
                    Sort by:
                </label>
                <select
                    id="sort"
                    value={filters.sort}
                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                    className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                </select>
            </div>

            {filters.status === 'decided' && (
                <div className="flex items-center ml-4">
                    <label htmlFor="reflection" className="text-sm font-medium text-gray-700 mr-2">
                        Outcome:
                    </label>
                    <select
                        id="reflection"
                        value={filters.reflection}
                        onChange={(e) => setFilters({ ...filters, reflection: e.target.value })}
                        className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="all">All outcomes</option>
                        <option value="good">No regrets</option>
                        <option value="unsure">Still unsure</option>
                        <option value="bad">Had regrets</option>
                        <option value="none">No reflection yet</option>
                    </select>
                </div>
            )}
        </div>
    );
}

export default FiltersBar;