var mongoose  = require("mongoose");
mongoose.connect("mongodb://localhost/news");



// mongoose.plugin(require('mongoose-list'));


module.exports = mongoose;