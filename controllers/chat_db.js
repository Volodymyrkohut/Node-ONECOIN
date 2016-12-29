var Person = require("../db/schema_chat"),
    session = require("express-session"),
    User = require("../db/UserSchema.js").Person;

import {setError} from "./renderError.js"

function Chat(app,io){

	app.use(session({
	secret: "mySekretWord",
	key: "NODESESSID",
	cookie: {
			path: "/",
			maxAge: null,
			httpOnly:true
	}

}));

app.get("/chatdb",function (req,res,next){

	if(!req.session.user){	
		res.render("user/login.ejs",{title:"login"
									,some:"Для того щоб користуватися чатомм вам необхідно ввійти в систему"})
	}
	
	else{

			
io.sockets.on("connection",function(client){
	//при загрузці чату витягуємо записи з бази даних
	Person.find({},function (err,row){
		io.sockets.emit("mess",{send: row})
	})


		
		client.emit('disconnect')
		client.removeAllListeners()


	client.on("se",function (data){
		//Вибираємо юзера який пише msg
			User.findById(req.session.user,function (error,item){
				if(error) next(error)
					if(item === null){ setError(404,"user not Found")}
				var P = new Person({
					msg:data.message,
					name:item.name
				})

				// З невідомих причин function світиться не тим коляром
				P.save(function(error,Us){
						if(error) next(error)
					console.log("save");
					io.sockets.emit("sen",Us);
				})
			})
	})

})
res.render("chat_db.ejs",{title:"VipChat"});

}

})

}// finish function Chat

module.exports = Chat;