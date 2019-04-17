const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

app.get('/api/likestats', (req, res) => {

  fs.readFile('likeStats.json', 'utf8', (err, data) => {
    if (err) throw error;

    res.json(JSON.parse(data));
  });
});

app.post('/api/like', (req, res) => {
  let likeUpdate = req.body;

  fs.writeFile('likeStats.json', likeUpdate, (err) => {
    if(err) throw error;
  });

  res.json('like accepted');
});


app
.use(express.static('build'))
.listen(PORT, () => console.log(`Listening on http://127.0.0.1:${ PORT }`));
