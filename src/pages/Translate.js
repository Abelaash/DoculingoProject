import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function Translate() {
    const [options, setOptions] = useState([]);
    const [to, setTo] = useState('en');
    const [from, setFrom] = useState('en');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const translate = () => {
        const params = new URLSearchParams();
        params.append('q', input);
        params.append('source', from);
        params.append('target', to);
        params.append('api-key');
      }

    useEffect(() => {
        // Load the list of language options here
        // For example, you can fetch this list from an API
        const fetchLanguages = async () => {
            // Replace this with actual API call to fetch language options
            const languageOptions = [
                { code: "en", name: "English" },
                { code: "es", name: "Spanish" },
                // Add more languages here
            ];
            setOptions(languageOptions);
        };
        fetchLanguages();
    }, []);

    return (
        <div className="page">
            <h1>Translate</h1>
            <div className="textbox">
                From ({from}) :
                <select onChange={(e) => setFrom(e.target.value)} value={from}>
                    <option value="en">English</option>
                    {options.map((opt) => (
                        <option key={opt.code} value={opt.code}>
                            {opt.name}
                        </option>
                    ))}
                </select>
                To ({to}) :
                <select onChange={(e) => setTo(e.target.value)} value={to}>
                    <option value="en">English</option>
                    {options.map((opt) => (
                        <option key={opt.code} value={opt.code}>
                            {opt.name}
                        </option>
                    ))}
                </select>
            </div>
            {/* The rest of the code remains unchanged */}
        </div>
    );
};
