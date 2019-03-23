var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');



var server = express()

server.use(cors());
// server.use((req,res,next)=>{res.setHeader("Access-Control-Allow-Origin","*")
// next()}
// )

server.use(express.static('./frontend'))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

require('./server/config/db-config');
require('./server/config/passport-config')(server);
require('./server/routes/all-routes')(server);

server.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).send("Error Catched by error handler.")
})

server.listen(8000, () => console.log("typing server is running"))