import React, { useState } from 'react';

function FileUpload() {

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [pdfText, setPdfText] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }

    const handleFileUpload = () => {
        const formData = new FormData();

        formData.append('uploadedFile', selectedFile);

        fetch("http://localhost:7777/upload", {
            method: "post", 
            body: formData
        }).then(response => {
            // console.log(response.text());
            return response.text();

        }).then(extractedText => {
            setPdfText(extractedText);
        }).catch((err) => {
            console.error("error :(", err);
        });
    }


    return (
        <div>
            <input type="file" id="uploadedFile" name="file" onChange={handleFileChange}/>
            <button
                type="button" 
                id="btnUpload" 
                onClick={handleFileUpload}>Upload PDF</button>
            <div>
                    <textarea
                    cols="70"
                    rows="30"
                    id="extractedText"
                    class="document-text"
                    placeholder="Upload your document here..."
                    value={pdfText}
                    // onInput={(e) => setInput(e.target.value)}
                    ></textarea>
                </div>    
        </div>    
    );
};

export default FileUpload;