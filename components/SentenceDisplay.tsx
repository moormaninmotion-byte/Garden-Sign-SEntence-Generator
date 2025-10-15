
import React, { useState, useEffect } from 'react';

interface SentenceDisplayProps {
    sentence: string;
    explanation: string;
}

const SentenceDisplay: React.FC<SentenceDisplayProps> = ({ sentence, explanation }) => {
    const [isExplanationVisible, setIsExplanationVisible] = useState(false);

    // Hide explanation when the sentence prop changes
    useEffect(() => {
        setIsExplanationVisible(false);
    }, [sentence]);

    const toggleExplanation = () => {
        setIsExplanationVisible(prevState => !prevState);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full p-6 bg-white/5 border border-slate-700 rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:bg-white/10 hover:border-slate-600">
                <p className="text-2xl md:text-3xl font-serif italic text-slate-200 text-center">
                    "{sentence}"
                </p>
            </div>

            <div className="w-full mt-4">
                <div className="text-center">
                    <button
                        onClick={toggleExplanation}
                        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 rounded-lg px-3 py-2 text-sm font-medium"
                        aria-expanded={isExplanationVisible}
                        aria-controls="explanation-panel"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <span>{isExplanationVisible ? 'Hide Explanation' : 'Reveal Explanation'}</span>
                    </button>
                </div>

                {isExplanationVisible && (
                     <div
                        id="explanation-panel"
                        className="mt-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 animate-fade-in"
                        style={{ animation: 'fadeIn 0.5s ease-in-out' }}
                    >
                        <p className="whitespace-pre-wrap font-sans not-italic text-base leading-relaxed">{explanation}</p>
                    </div>
                )}
            </div>
             <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default SentenceDisplay;
