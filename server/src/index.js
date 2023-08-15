const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const pdfParser = require("pdf-parse");

const app = express();

app.use(express.static('public'));
app.use(express());
app.use(cors());
app.use(fileUpload());

const PORT = 7777;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.post('/upload', (req, res) => {

    let pdfFile;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    pdfFile = req.files.uploadedFile;

    pdfParser(pdfFile).then(result => {
        res.send(result.text);
    });
    
    
});