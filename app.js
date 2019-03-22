var express = require('express');
var bodyParser = require("body-parser");


var users = [
    { id: 1, username: "hammad", password: 'abcd1234' },
    { id: 2, username: "hello", password: '1234' },
]

var server = express()

server.use(express.static('./frontend'))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

require('./server/config/db-config');
require('./server/config/passport-config')(server, users);
require('./server/routes/all-routes')(server);

server.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).send("Error Catched by error handler.")
})

server.listen(8000, () => console.log("typing server is running"))