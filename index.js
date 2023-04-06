var express = require('express');
const path = require("path");
var app = express();

app.use(express.static(path.join(__dirname,'views')));

app.get('/', function(req,res) {
    res.sendFile('index.html')
});

app.listen(4455);