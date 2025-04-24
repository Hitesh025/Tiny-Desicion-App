// components/DecisionList.jsx (Enhanced Version)
import React from 'react';

function DecisionList({ decisions, viewDecision, setCurrentView }) {
    const getStatusBadge = (decision) => {
        if (!decision.isDecided) {
            return (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                    Thinking
                </span>
            );
        }

        // For decided items with reflection
        if (decision.reflection) {
            switch (decision.reflection) {
                case 'good':
                    return (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                            No regrets
                        </span>
                    );
                case 'unsure':
                    return (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 flex items-center">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                            Still unsure
                        </span>
                    );
                case 'bad':
                    return (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                            Had regrets
                        </span>
                    );
                default:
                    return null;
            }
        }

        // Decided but no reflection yet
        return (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Decided
            </span>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
            {decisions.map((decision) => (
                <div
                    key={decision.id}
                    onClick={() => viewDecision(decision)}
                    className="p-4 hover:bg-gray-50 transition cursor-pointer"
                >
                    <div className="flex justify-between items-start">
                        <div className="flex-grow">
                            <h3 className="font-medium text-gray-900">
                                {decision.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {formatDate(decision.dateCreated)}
                            </p>
                        </div>
                        <div className="ml-4">
                            {getStatusBadge(decision)}
                        </div>
                    </div>

                    {decision.isDecided && (
                        <div className="mt-3">
                            <p className="text-sm text-gray-700">
                                <span className="font-medium">Chose:</span> {decision.finalChoice}
                            </p>

                            {decision.pros || decision.cons ? (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {decision.pros && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                            Pros: {decision.pros.split('\n').length} points
                                        </span>
                                    )}
                                    {decision.cons && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                            Cons: {decision.cons.split('\n').length} points
                                        </span>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default DecisionList;