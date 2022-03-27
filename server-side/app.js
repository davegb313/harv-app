const express = require('express');
const bodyParser = require('body-parser');

const gatherData = require('./child-process');

const port = 5000;
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    next();
})

app.post('/getdata', async (req, res, next) => {
    const { domainToCheck } = req.body;
    let returnedData;
    try {
        returnedData = gatherData(domainToCheck);
    } catch (err) {
        console.error('something went wrong, try again');
    }
    res.json({ returnedData });
})

app.listen(port, () => console.log(`example on port ${port}`));