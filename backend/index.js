var express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes');
const cors = require('cors');
const fileUpload = require('express-fileupload');

var app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

app.use('/upload', routes.upload);

app.listen(3000, function () {
    console.log(' listening on port 3000');
})