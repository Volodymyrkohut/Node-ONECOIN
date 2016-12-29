var mongoose = require("./db.js")


var SchemaDate = new mongoose.Schema({
	name:String,
	msg:String,
	date:{
		type:Date,
		default: Date.now()
	}

})

var Person = mongoose.model("Person",SchemaDate);




module.exports = Person;