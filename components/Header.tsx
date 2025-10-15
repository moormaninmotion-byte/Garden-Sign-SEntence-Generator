
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Semantic Ambiguity Generator
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
                Generate sentences that are grammatically perfect but have more than one meaning.
            </p>
        </header>
    );
};

export default Header;
