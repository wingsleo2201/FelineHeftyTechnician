const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 4000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.post('/', async (req, res) => {
    const apiKey = '025576a5716d4b679d555e54e4b97a45';
    let request = require('request');

    let requestHeaders = {
        "Content-Type": "application/json",
        "apikey": req.body.apiKey
    }
    let result = '';
    request({
        uri: "https://api.rebrandly.com/v1/links",
        method: "POST",
        body: JSON.stringify({destination: req.body.link}),
        headers: requestHeaders
    }, (err, response, body) => {
      if(body==='Unauthorized'){
        res.send('Error!');
      }
      else{
        let link = JSON.parse(body);
        res.send(link.shortUrl);
      }
        
    }
    )
});
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
