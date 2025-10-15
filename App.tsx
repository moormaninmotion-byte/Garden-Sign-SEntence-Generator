
import React, { useState, useCallback } from 'react';
import { generateAmbiguousSentence, generateExplanation } from './services/geminiService';
import Header from './components/Header';
import SentenceDisplay from './components/SentenceDisplay';
import GenerateButton from './components/GenerateButton';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';

const App: React.FC = () => {
    const [sentence, setSentence] = useState<string>('They are hunting dogs.');
    const [explanation, setExplanation] = useState<string>(`Interpretation 1: 'hunting' is an adjective describing the dogs (i.e., they are dogs used for hunting).
Interpretation 2: 'hunting' is a verb, and 'they' are hunting the dogs.`);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const newSentenceRaw = await generateAmbiguousSentence();
            const cleanedSentence = newSentenceRaw.replace(/["*]/g, '').trim();

            const newExplanationRaw = await generateExplanation(cleanedSentence);
            const cleanedExplanation = newExplanationRaw.replace(/[*]/g, '').trim();
            
            setSentence(cleanedSentence);
            setExplanation(cleanedExplanation);
        } catch (err) {
            setError('Failed to generate content. Please check your API key and try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white font-sans">
            <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="w-full max-w-2xl text-center space-y-8">
                    <Header />
                    
                    <div className="relative w-full min-h-[12rem] flex items-center justify-center">
                        {isLoading ? (
                            <LoadingSpinner />
                        ) : error ? (
                             <p className="text-red-400 bg-red-900/30 p-4 rounded-lg">{error}</p>
                        ) : (
                            <SentenceDisplay sentence={sentence} explanation={explanation} />
                        )}
                    </div>

                    <GenerateButton onClick={handleGenerate} isLoading={isLoading} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;
