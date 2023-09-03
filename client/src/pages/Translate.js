import React, { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload.js";
// import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function Translate() {
    const [options, setOptions] = useState([]);
    const [to, setTo] = useState('Fr');
    const [from, setFrom] = useState('En');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [learnedWords, setLearnedWords] = useState({wordList: new Map(), display: ''})

    const translate = async () => {
        const params = new URLSearchParams();
        params.append('q', input);
        params.append('source', from);
        params.append('target', to);
        let fetchedProperly = ''
        
        fetch('./translate?' + params).then(
        res=>{fetchedProperly = res.status===200 ? true:false;return res;}).then(
        res=>res.json()).then(
        res=> {setOutput(res); console.log(res);return res;}).then(
        ()=>{
            if(!fetchedProperly)
                return;
            let newLearnedWords = learnedWords; 
            if (newLearnedWords.wordList.has(input) === false) {
                newLearnedWords.display += input + '\n' 
                newLearnedWords.wordList.set(input, 'true')
            }
            setLearnedWords(newLearnedWords)
        }).catch((err) => console.log(err))
      }

    useEffect(() => {
        // Load the list of language options here
        // For example, you can fetch this list from an API
        const fetchLanguages = async () => {
            const languageOptions = [
                { code: "En", name: "English" },
                // { code: "Es", name: "Spanish" },
                { code: "Fr", name: "French" },
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
                    {options.map((opt) => (
                        <option key={opt.code} value={opt.code}>
                            {opt.name}
                        </option>
                    ))}
                </select>
                To ({to}) : 
                <select onChange={(e) => setTo(e.target.value)} value={to}>
                    {options.map((opt) => (
                        <option key={opt.code} value={opt.code}>
                            {opt.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="container">
                <FileUpload />
                <div className="words-container">
                    <div>
                        <h3 className="label-text"> From: </h3>
                        <textarea id="inputArea"
                            cols="28" 
                            rows="1" 
                            placeholder="Copy your word here..."
                            className="word-textarea"
                            onInput={(e) => setInput(e.target.value)}
                            >
                        </textarea>
                    </div>
                    <div>
                        <button 
                            className="translate-button"
                            onClick={e=>translate()}
                        >
                            Translate
                        </button>
                    </div>
                    <div>
                        <h3 className="label-text"> To: </h3>
                        <textarea readOnly
                            cols="28" 
                            rows="3" 
                            className="word-textarea"
                            placeholder="Translation loading..."
                            value={output}>
                        </textarea>
                    </div>
                </div>
                <div>
                    <h1> Learned Words </h1>
                    <textarea readOnly
                        className="learned-words-textarea"
                        cols="20"
                        rows="20"
                        placeholder="Your Learned Words:"
                        value={learnedWords.display}
                        >

                    </textarea>
                </div>
            </div>
        </div>
    );
};
