var mongoose = require( 'mongoose' )

const dataSchema = { dataname: String, wpm: String, accuracy: String,date:String,time:String}

const Data = mongoose.model( 'Data', dataSchema );

module.exports = Data