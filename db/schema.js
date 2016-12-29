var mongoose = require("./db.js");



var responseData = new mongoose.Schema({
	title: String,
	meta_d:String,
	meta_k:String,
	description: String,
	cat: String,
	content: String,   
	author: String,
	date: Date,
	num: Number,
	img: String
})
//for order! pages navigation
var mongoosePaginate = require('mongoose-paginate');
 responseData.plugin(mongoosePaginate);


var News = mongoose.model("News",responseData)


module.exports = News;


