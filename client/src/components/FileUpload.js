/* eslint-disable */ 
import React, { useState, useEffect } from 'react';
let client_id = "940292526044-ibg5umv7i658tdlqffuanjg1049ab93o.apps.googleusercontent.com"; 
var tokenResponse = [] //stores access token, expires in 1 hour 

function FileUpload() {

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [pdfText, setPdfText] = useState('');

    const [client, setClient] = useState([])

    useEffect( ()=> 
      /*global google*/
      setClient(google.accounts.oauth2.initTokenClient({
      client_id: client_id,
      scope: 'https://www.googleapis.com/auth/documents.readonly',
      callback: async (tokenResp) => {
        tokenResponse = tokenResp.access_token; 
        console.log("access token received: " + tokenResponse)
      }
    })), []) 

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }

    const handleFileUpload = () => {
        const formData = new FormData();

        formData.append('uploadedFile', selectedFile);
        
        fetch("/upload", {
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

    async function fetchResponse(e) {
      e.preventDefault();
      let linkId = e.target[0].value; 
      let text = 'pogChamp'
      let y = linkId.indexOf("/edit")
      if(y!=-1)
        linkId = linkId.substring(linkId.indexOf("d/")+1, linkId.indexOf("/edit"))
      else 
        linkId = linkId.substring(linkId.indexOf("d/")+1)
      fetch("/link" + linkId + "?access_token=" + tokenResponse).then(response => {
        return response.text();

    }).then(extractedText => {
        setPdfText(extractedText);
        // console.log(extractedText)
    }).catch((err) => {
        console.error("error :(", err);
    });
    } 

    return (
        <div>
            <input type="file" id="uploadedFile" name="file" className="choose-file" onChange={handleFileChange}/>
            <button
                type="button" 
                id="btnUpload" 
                className="upload-file-btn"
                onClick={handleFileUpload}>Upload PDF</button> <br/>
            <button onClick={(e) => {client.requestAccessToken(e)}}> Sign in with Google! </button>
            <form onSubmit={(e)=> fetchResponse(e)} >
              <input type="text" placeholder="Enter Google Doc Link" />
              <button type="submit"> Fetch Text </button>
            </form>
            <div>
                    <textarea
                    cols="70"
                    rows="30"
                    id="extractedText"
                    className="document-text"
                    placeholder="PDF text will show up here..."
                    value={pdfText}
                    readOnly
                    // onInput={(e) => setInput(e.target.value)}
                    ></textarea>
                </div>    
        </div>    
    );
};

export default FileUpload;