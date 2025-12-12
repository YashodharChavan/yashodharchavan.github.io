import React, { useEffect, useState } from 'react';
import CenteredHR from './CenteredHR';

const TranslationDefination = ({ word, fontSize }) => {
    const [definition, setDefinition] = useState(null);
    const [synonyms, setSynonyms] = useState([]);
    const [antonyms, setAntonyms] = useState([]);
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

    // -----------------------------
    //    Fetch Synonyms / Antonyms
    // -----------------------------
    useEffect(() => {
        if (!word) return;

        const fetchThesaurus = async () => {
            try {
                // Synonyms
                const synRes = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
                const synData = await synRes.json();
                setSynonyms(synData.map(item => item.word));

                // Antonyms
                const antRes = await fetch(`https://api.datamuse.com/words?rel_ant=${word}`);
                const antData = await antRes.json();
                setAntonyms(antData.map(item => item.word));
            } catch (err) {
                console.log("Datamuse error:", err);
            }
        };

        fetchThesaurus();
    }, [word]);

    return (
        <div className="p-4 text-sm overflow-auto">

            {/* ERROR DISPLAY */}
            {error && <p className="text-red-500">{error}</p>}

            {/* DEFINITIONS */}
            {!error && definition && (
                <>
                    <CenteredHR text="Definition" />

                    {/* PHONETIC */}
                    {definition.phonetic ? (
                        <p className="italic" style={{ fontSize: `calc(16px + ${fontSize}px)` }}>
                            Phonetic: {definition.phonetic}
                        </p>
                    ) : (
                        <span></span>
                    )}

                    {/* MEANINGS */}
                    {definition.meanings.map((meaning, idx) => (
                        <div key={idx} className="mt-2" style={{ fontSize: `calc(14px + ${fontSize}px)` }}>
                            <p className="font-semibold">{meaning.partOfSpeech}</p>
                            <ul className="list-disc ml-5" style={{ paddingLeft: "24px" }}>
                                {meaning.definitions.map((def, i) => (
                                    <li key={i}>{def.definition}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </>
            )}

            {/* SYNONYMS */}
            {synonyms.length > 0 && (
                <>
                    <CenteredHR text="Synonyms" />

                    <p style={{ fontSize: `calc(14px + ${fontSize}px)` }}>
                        {synonyms.join(', ')}
                    </p>
                </>
            )}

            {/* ANTONYMS */}
            {antonyms.length > 0 && (
                <>
                    <CenteredHR text="Antonyms" />

                    <p style={{ fontSize: `calc(14px + ${fontSize}px)` }}>
                        {antonyms.join(', ')}
                    </p>
                </>
            )}
        </div>
    );
};

export default React.memo(TranslationDefination);
