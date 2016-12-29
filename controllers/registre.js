
var Person = require("../db/UserSchema.js").Person;
//register!
module.exports = function (app){
app.get("/registre",function (req,res){
	res.render("user/registre", {title:"registre"})
})

app.post("/registre",function (req,res,next){

	var userList = new Person({
		name: req.body.login,
		password:req.body.password,
		// mail:req.body.mail,
		// tel:req.body.tel
	})

	userList.save(function (err){
		if(err) console.log(err);
		else{ 
			console.log(userList.password);
		}
	})
	res.status(302) // redirect
	res.setHeader("Location","/");
	res.send("200")
})

}


