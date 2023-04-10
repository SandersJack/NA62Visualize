var express = require('express');
const path = require("path");
var app = express();

app.use(express.static(path.join(__dirname,'views')));
app.use(express.static(path.join(__dirname,'public')));

app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));
app.use('/three-csg-ts/', express.static(path.join(__dirname, 'node_modules/three-csg-ts/lib/esm')));
app.use('/dat.gui/', express.static(path.join(__dirname, 'node_modules/dat.gui/build')));

app.get('/', function(req,res) {
    res.sendFile('index.html')
});

app.get('/public/js/json/ChromaticCorrector.json', (req, res) => {
    console.log(res)
  
    /* Insted of doing all this */
    // res.writeHead(200, {
    //    'Content-type': 'application/json'
    // });
    // res.end(JSON.stringify(data));
  
    /* Just send the file */
    res.sendFile(path.join(__dirname, '/public/js/json/', 'ChromaticCorrector.json'));
  });

app.listen(4455);