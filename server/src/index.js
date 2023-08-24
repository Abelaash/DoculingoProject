const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const pdfParser = require("pdf-parse");
const parseGDoc = require("./parseGDoc");
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient
var translateDB, EnToFrDic, FrToEnDic, EnToFr, FrToEn
var connectedToDB = false

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

app.get('/link/*', async (req, res) => {

  const linkId = req.originalUrl.substring(6);
   
  fetch("https://docs.googleapis.com/v1/documents/" + linkId).then(data=>data.json()).then(data=>{return parseGDoc(data);}).then(data=>res.send(data))
})

app.get('/translate*', async (req, res) => {
    var input = req.query.q;
    var collectionName = req.query.source + 'To' + req.query.target;
    var findResult
    if(connectedToDB) {
        findResult = await translateDB.collection(collectionName).findOne({word:input})
        if (!findResult) {
            findResult = { translation: ['The word "' + input + '" could not be translated :(']}
            res.status(201); 
        }
        res.send(findResult.translation)
    }
    else {
        switch(collectionName) {
            case 'EnToFr': {
                if(EnToFrDic.has(input) === false) {
                    findResult = { translation: ['The word "' + input + '" could not be translated :(']}
                    res.status(201);
                }
                else {
                    findResult = {
                        translation : JSON.parse(EnToFrDic.get(input))
                    }
                }
                res.send(findResult.translation)
            }
            break; 
            case 'FrToEn': {
                if(FrToEnDic.has(input) === false) {
                    findResult = { translation: ['The word "' + input + '" could not be translated :(']}
                    res.status(201);
                }
                else {
                    findResult = {
                        translation : JSON.parse(FrToEnDic.get(input))
                    }
                }
                res.send(findResult.translation)
            }
        }
    }
    console.log("Translate query complete: " + input + " => " + findResult.translation)
})

app.listen(4000, () => {
    console.log("Please wait, trying to configure MongoDB connection...")
    console.log("Please wait before making any queries (approx. 30 seconds)")
    //The following assumes that if MongoDB is running, it will contain a
    //db named "Translate" which contains our dicitonaries

    //If mongodb is not running, then it parses local dictionaries instead
    MongoClient.connect('mongodb://127.0.0.1:27017').then(client => {
        translateDB = client.db('Translate')
        connectedToDB = true
        console.log("Connected to MongoDB database")
        console.log("---------------------------------------------------------")
    }).catch(err=>{
        console.log("MongoDB is not running. Using Local Dictionaries instead.")
        console.log("---------------------------------------------------------")
        connectedToDB = false

        EnToFr = fs.readFileSync('dictionaries/EnToFr.txt', { encoding: 'utf8' });
        EnToFr = JSON.parse(EnToFr);

        FrToEn = fs.readFileSync('dictionaries/FrToEn.txt', { encoding: 'utf8' });
        FrToEn = JSON.parse(FrToEn)

        EnToFrDic = new Map()
        EnToFr.map((entry) => {
            EnToFrDic.set(entry.word, JSON.stringify(entry.translation))
        } )

        FrToEnDic = new Map()
        FrToEn.map((entry) => {
            FrToEnDic.set(entry.word, JSON.stringify(entry.translation))
        } )
    })
})