import React, { useState } from 'react';

function DecisionForm({ addDecision, existingDecision, setCurrentView }) {
    const [formData, setFormData] = useState(
        existingDecision || {
            id: Date.now(),
            title: '',
            dateCreated: new Date().toISOString().split('T')[0],
            pros: '',
            cons: '',
            isDecided: false,
            finalChoice: '',
            explanation: '',
            reflection: null, // null, 'good', 'unsure', 'bad'
            reflectionNote: ''
        }
    );

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addDecision(formData);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                    {existingDecision ? 'Edit Decision' : 'New Decision'}
                </h2>
                <button
                    onClick={() => setCurrentView('list')}
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
                        placeholder="What decision are you considering?"
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
                            placeholder="List the positives..."
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
                            placeholder="List the negatives..."
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
                                placeholder="Your final choice..."
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
                                placeholder="Explain your reasoning..."
                            ></textarea>
                        </div>
                    </div>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Save Decision
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DecisionForm;