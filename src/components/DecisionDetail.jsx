import React, { useState } from 'react';

function DecisionDetail({ decision, updateDecision, deleteDecision, setCurrentView }) {
    const [isEditing, setIsEditing] = useState(false);
    const [showReflectionForm, setShowReflectionForm] = useState(false);
    const [formData, setFormData] = useState({
        ...decision,
        reflection: decision.reflection || null
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateDecision(formData);
        setIsEditing(false);
    };

    const handleReflection = (value) => {
        setFormData({
            ...formData,
            reflection: value
        });
    };

    const handleReflectionSubmit = (e) => {
        e.preventDefault();
        updateDecision(formData);
        setShowReflectionForm(false);
    };

    const formattedDate = new Date(decision.dateCreated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const getTimeSinceDecision = () => {
        const created = new Date(decision.dateCreated);
        const now = new Date();
        const diffTime = Math.abs(now - created);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return '1 day ago';
        if (diffDays < 30) return `${diffDays} days ago`;
        if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `${months} ${months === 1 ? 'month' : 'months'} ago`;
        }
        const years = Math.floor(diffDays / 365);
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    };

    if (isEditing) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Edit Decision</h2>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        Cancel
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Decision Title*
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="pros" className="block text-sm font-medium text-gray-700 mb-1">
                                Pros (Optional)
                            </label>
                            <textarea
                                id="pros"
                                name="pros"
                                value={formData.pros}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="One pro per line..."
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="cons" className="block text-sm font-medium text-gray-700 mb-1">
                                Cons (Optional)
                            </label>
                            <textarea
                                id="cons"
                                name="cons"
                                value={formData.cons}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="One con per line..."
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isDecided"
                            name="isDecided"
                            checked={formData.isDecided}
                            onChange={handleChange}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isDecided" className="ml-2 block text-sm text-gray-700">
                            I've made my decision
                        </label>
                    </div>

                    {formData.isDecided && (
                        <div className="space-y-4 p-4 bg-gray-50 rounded-md">
                            <div>
                                <label htmlFor="finalChoice" className="block text-sm font-medium text-gray-700 mb-1">
                                    What did you decide?*
                                </label>
                                <input
                                    type="text"
                                    id="finalChoice"
                                    name="finalChoice"
                                    value={formData.finalChoice}
                                    onChange={handleChange}
                                    required={formData.isDecided}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-1">
                                    Why did you make this choice?*
                                </label>
                                <textarea
                                    id="explanation"
                                    name="explanation"
                                    value={formData.explanation}
                                    onChange={handleChange}
                                    required={formData.isDecided}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                ></textarea>
                            </div>

                            <div>
                                <p className="block text-sm font-medium text-gray-700 mb-2">
                                    Was this a good decision?
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        className={`px-3 py-1 rounded-full text-sm ${formData.reflection === 'good'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-green-100 text-green-800'
                                            }`}
                                        onClick={() => handleReflection('good')}
                                    >
                                        No regrets
                                    </button>
                                    <button
                                        type="button"
                                        className={`px-3 py-1 rounded-full text-sm ${formData.reflection === 'unsure'
                                            ? 'bg-yellow-500 text-white'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                        onClick={() => handleReflection('unsure')}
                                    >
                                        Still unsure
                                    </button>
                                    <button
                                        type="button"
                                        className={`px-3 py-1 rounded-full text-sm ${formData.reflection === 'bad'
                                            ? 'bg-red-500 text-white'
                                            : 'bg-red-100 text-red-800'
                                            }`}
                                        onClick={() => handleReflection('bad')}
                                    >
                                        Had regrets
                                    </button>
                                    {formData.reflection && (
                                        <button
                                            type="button"
                                            className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                                            onClick={() => handleReflection(null)}
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                            </div>

                            {formData.reflection && (
                                <div>
                                    <label htmlFor="reflectionNote" className="block text-sm font-medium text-gray-700 mb-1">
                                        Reflection (Optional)
                                    </label>
                                    <textarea
                                        id="reflectionNote"
                                        name="reflectionNote"
                                        value={formData.reflectionNote}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Share your thoughts on this decision in retrospect..."
                                    ></textarea>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => deleteDecision(decision.id)}
                            className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition"
                        >
                            Delete
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    if (showReflectionForm) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Add Reflection</h2>
                    <button
                        onClick={() => setShowReflectionForm(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        Cancel
                    </button>
                </div>

                <form onSubmit={handleReflectionSubmit} className="space-y-6">
                    <div>
                        <p className="block text-sm font-medium text-gray-700 mb-2">
                            Was this a good decision?
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                className={`px-3 py-1 rounded-full text-sm ${formData.reflection === 'good'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-green-100 text-green-800'
                                    }`}
                                onClick={() => handleReflection('good')}
                            >
                                No regrets
                            </button>
                            <button
                                type="button"
                                className={`px-3 py-1 rounded-full text-sm ${formData.reflection === 'unsure'
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-yellow-100 text-yellow-800'
                                    }`}
                                onClick={() => handleReflection('unsure')}
                            >
                                Still unsure
                            </button>
                            <button
                                type="button"
                                className={`px-3 py-1 rounded-full text-sm ${formData.reflection === 'bad'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-red-100 text-red-800'
                                    }`}
                                onClick={() => handleReflection('bad')}
                            >
                                Had regrets
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="reflectionNote" className="block text-sm font-medium text-gray-700 mb-1">
                            Your thoughts on this decision (Optional)
                        </label>
                        <textarea
                            id="reflectionNote"
                            name="reflectionNote"
                            value={formData.reflectionNote}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="What did you learn from this decision? Would you make the same choice again?"
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            disabled={!formData.reflection}
                        >
                            Save Reflection
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => setCurrentView('list')}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center"
                >
                    ← Back to list
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-3 py-1 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deleteDecision(decision.id)}
                        className="px-3 py-1 text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">{decision.title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Created {formattedDate} ({getTimeSinceDecision()})
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {decision.pros && (
                    <div className="bg-green-50 p-4 rounded-md">
                        <h3 className="font-medium text-green-800 mb-2">Pros</h3>
                        <div className="space-y-2">
                            {decision.pros.split('\n').filter(pro => pro.trim()).map((pro, index) => (
                                <div key={index} className="flex items-start">
                                    <span className="inline-flex items-center justify-center w-5 h-5 bg-green-100 text-green-800 rounded-full text-xs mr-2 mt-0.5">
                                        +
                                    </span>
                                    <p className="text-gray-700 flex-1">{pro}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {decision.cons && (
                    <div className="bg-red-50 p-4 rounded-md">
                        <h3 className="font-medium text-red-800 mb-2">Cons</h3>
                        <div className="space-y-2">
                            {decision.cons.split('\n').filter(con => con.trim()).map((con, index) => (
                                <div key={index} className="flex items-start">
                                    <span className="inline-flex items-center justify-center w-5 h-5 bg-red-100 text-red-800 rounded-full text-xs mr-2 mt-0.5">
                                        -
                                    </span>
                                    <p className="text-gray-700 flex-1">{con}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {decision.isDecided ? (
                <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center mb-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 mr-2">
                            Decided
                        </span>
                        <h3 className="font-medium">I chose: {decision.finalChoice}</h3>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                        <h4 className="font-medium text-gray-700 mb-2">Why I chose this:</h4>
                        <p className="text-gray-600 whitespace-pre-line">{decision.explanation}</p>
                    </div>

                    {decision.reflection ? (
                        <div className="mb-6">
                            <div className="flex items-center mb-2">
                                <span className={`w-3 h-3 rounded-full mr-2 ${decision.reflection === 'good' ? 'bg-green-500' :
                                    decision.reflection === 'unsure' ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}></span>
                                <h4 className="font-medium text-gray-700">
                                    {decision.reflection === 'good' ? 'No regrets' :
                                        decision.reflection === 'unsure' ? 'Still unsure' : 'Had regrets'}
                                </h4>
                            </div>

                            {decision.reflectionNote && (
                                <div className="bg-gray-50 p-4 rounded-md mt-2">
                                    <p className="text-gray-600 whitespace-pre-line">{decision.reflectionNote}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="mb-6">
                            <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300 text-center">
                                <p className="text-gray-500 mb-3">How did this decision work out for you?</p>
                                <button
                                    onClick={() => setShowReflectionForm(true)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Add Your Reflection
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="border-t border-gray-200 pt-6 text-center">
                    <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 mb-2">
                            Still thinking
                        </span>
                        <p className="text-gray-600 mb-4">
                            You're still considering this decision. Update when you've made your choice.
                        </p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            I've Made My Decision
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DecisionDetail;