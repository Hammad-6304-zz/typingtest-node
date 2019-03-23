var mongoose = require('mongoose')

var db_url ='mongodb+srv://fyp:fyp@fyp-mrp9t.mongodb.net/test?retryWrites=true'
mongoose.connect(db_url, { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () { console.log('Successfully connected to DB') });
