require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router');

const port = process.env.PORT || 8080;
const app = express();

//DB setup
mongoose.connect('mongodb://localhost:27017/react_blog');

app.use(cors());
app.use(bodyParser.json({ type: '*/*'}));
app.use(express.static(__dirname));
router(app);

const server = http.createServer(app);

server.listen(port, function(){
    console.log('Server now listening on port:', port);
});