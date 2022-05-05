//create socket io server and express server
const express = require('express');
const app = express();
app.use(express.static(__dirname +'/public'));
const soketio = require('socket.io');
const expressServer =app.listen(8080);
const io = soketio(expressServer);
const helmet = require('helmet');
app.use(helmet());
console.log("listening on port 8080");

//app orgs
module.exports={
    app,
    io
}