
// components/Header.jsx
import React from 'react';

function Header({ setCurrentView }) {
    return (
        <header className="bg-indigo-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center max-w-4xl">
                <h1
                    className="text-2xl font-bold cursor-pointer"
                    onClick={() => setCurrentView('list')}
                >
                    Tiny Decisions
                </h1>
                <button
                    onClick={() => setCurrentView('form')}
                    className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-50 transition"
                >
                    New Decision
                </button>
            </div>
        </header>
    );
}

export default Header;