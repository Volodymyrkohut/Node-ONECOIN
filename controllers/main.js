 

 function controllers (app){

 	app.get("/",function (req,res,next){
 		res.render("main",{title: "Головна"})
 	}) 	
}

module.exports = controllers;

// var parseString = require('xml2js').parseString;
// parseString(body, function (err, result) {
 		// 	if(err) console.log("error");
     		  // console.dir(JSON.stringify(result));
			 // var Json = JSON.stringify(result)
