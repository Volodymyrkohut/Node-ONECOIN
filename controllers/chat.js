function serverChat(app, io){


	app.get("/chat",function(req,res,next){
		res.render("chat.ejs",{title:"Chat"})
		next()
	})

var Message = [],
    arrayUser = {},
    item = "";

io.sockets.on("connection",function(client){
// console.log(client)



	client.on("user",function(data){
		arrayUser[client.id] = data;
		if(data){
			
			var array = []
			for(var i in arrayUser){
				array.push(arrayUser[i]);
			}
			var userList = array.join("<br>")
		io.sockets.emit("answer",{user:userList, text: item});

		}
		
	})

	client.on("disconnect",function (){
		delete arrayUser[client.id]
	})

	client.on("message",function(data){
	
	if(data){
		item = "";
		Message.push(arrayUser[client.id] + ": "+ data.msg)
	
		for(var i= 0; i < Message.length; i++){
			item = item + Message[i] + "<br>";
				if(Message.length == 15){
					Message.splice(Message[Message.length],1);
				}
		}

		io.sockets.emit("send",{report:item})
	}
	})

})

}

module.exports = serverChat;

