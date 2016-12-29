
var Person = require("../db/UserSchema.js").Person;

module.exports = function (app){

var session = require("express-session");
app.use(session({
	secret: "mySekretWord",
	key: "NODESESSID",
	cookie: {
			path: "/",
			maxAge: null,
			httpOnly:true
	}

}));

	app.get("/login",function (req,res,next){
		if(req.session.user){
				Person.findById(req.session.user,function (error,data){
			if(error) next(error) 
			res.render("user/enter",{title:"my room",some:"Ваш кабінет", login:data.name,
														password:data.password})
		})
		}else{
			res.render("./user/login",{title:"login",some:"Ввійдіть будь-ласка"});
		}
	})

	app.post("/login",function (req,res){
		var login = req.body.login,
		    password = req.body.password;
		Person.findOne({name: login},function (error,data){

			if(error) next(error)
				if(data){
					if(data.checkPassword(password)){
						req.session.user = data._id
						res.status(302) // redirect
						res.setHeader("Location","/login");
						res.send("200")
						console.log("Data is send")
					}
				
					else{
						res.status(401) // redirect
						res.setHeader("Location","/login");
						res.send("404")
					}
				}
		})
	})


}


