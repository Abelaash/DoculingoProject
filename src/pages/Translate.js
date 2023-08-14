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
            <div className="container">
                <div>
                    <textarea
                    cols="70"
                    rows="30"
                    class="document-text"
                    placeholder="Upload your document here..."
                    onInput={(e) => setInput(e.target.value)}
                    ></textarea>
                </div>
                <div className="words-container">
                    <div>
                        <textarea
                            cols="22" 
                            rows="1" 
                            placeholder="Copy your word here..."
                            class="word-textarea">  
                        </textarea>
                    </div>
                    <div>
                        <button 
                            class="translate-button"
                            onClick={e=>translate()}
                        >
                            Translate
                        </button>
                    </div>
                    <div>
                        <textarea readOnly
                            cols="22" 
                            rows="1" 
                            className="word-textarea"
                            placeholder="Translation loading..."
                            value={output}>
                        </textarea>
                    </div>
                </div>
                <div>
                    <textarea readOnly
                        className="learned-words-textarea"
                        cols="20"
                        rows="20"
                        placeholder="Your Learned Words:"
                        >

                    </textarea>
                </div>
            </div>
        </div>
    );
};
