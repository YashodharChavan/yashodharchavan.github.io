import React, { useEffect, useState } from 'react';
import CenteredHR from './CenteredHR';
const TranslationDefination = ({ word, fontSize }) => {
    const [definition, setDefinition] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!word) return;

        const fetchDefinition = async () => {
            try {
                const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                if (!res.ok) throw new Error('Definition not found');
                const data = await res.json();
                setDefinition(data[0]);
                setError(null);
            } catch (err) {
                setDefinition(null);
                setError(err.message);
            }
        };

        fetchDefinition();
    }, [word]);

    return (
        <div className="p-4 text-sm overflow-auto">

            {error && <p className="text-red-500">{error}</p>}

            {!error && definition && (
                <>
                    <CenteredHR text="Defination" />
                    {definition.phonetic ? (
                        <p className="italic" style={{fontSize: `calc(16px + ${fontSize}px)`}}>Phonetic: {definition.phonetic}</p>
                    ): (
                        <span></span>
                    )}

                    {definition.meanings.map((meaning, idx) => (
                        <div key={idx} className="mt-2" style={{fontSize: `calc(14px + ${fontSize}px)`}}>
                            <p className="font-semibold">{meaning.partOfSpeech}</p>
                            <ul className="list-disc ml-5" style={{paddingLeft: "24px"}}>
                                {meaning.definitions.map((def, i) => (
                                    <li key={i}>{def.definition}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default TranslationDefination;
