require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router');
const app = express();

//DB setup
mongoose.connect(process.env.MONGO_URI);

//App setup
app.use(cors());
app.use(bodyParser.json({ type: '*/*'}));
app.use(express.static(__dirname));
router(app);

//Server setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port, function(){
    console.log('Server now listening on port:', port);
});