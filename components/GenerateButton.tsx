
import React from 'react';

interface GenerateButtonProps {
    onClick: () => void;
    isLoading: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isLoading }) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-800 border-2 border-transparent rounded-full font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700 disabled:bg-gray-600 disabled:cursor-not-allowed group"
        >
            <span className={`absolute -inset-full top-0 block transform ${isLoading ? 'animate-spin-slow' : ''} -translate-y-1/2 group-hover:translate-y-1/2 xl:group-hover:translate-y-0.5`}>
                 <svg className="w-full h-full text-cyan-400" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M39 20C39 30.4934 30.4934 39 20 39C9.50659 39 1 30.4934 1 20C1 9.50659 9.50659 1 20 1C30.4934 1 39 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </span>
            <span className="relative">
                {isLoading ? 'Generating...' : 'Generate New Sentence'}
            </span>
        </button>
    );
};

export default GenerateButton;
