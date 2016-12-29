var express  = require("express"), 
	app = express(),
    http = require("http"),
    ejs = require("ejs"),
    ejsLocals = require("ejs-locals"),
    bodyParser = require("body-parser"),
    path = require("path"),
	favicon = require('serve-favicon')




app.use(bodyParser.urlencoded({extended:false}));
app.set("views",__dirname + "/views");
app.set("view engine","ejs");
app.engine("ejs",ejsLocals);
app.use(express.static(path.join(__dirname + "/public")));
app.use(favicon(__dirname + '/public/images/favicon/logo.ico'));


//проміжна функція 
app.use(function (req,res,next){
	res.set("X-Powered-By","Node.js")
	next();
})
//or
//app.disable("X-Powered-By");

//socket
var socket = require("socket.io"),
	 io2 = socket.listen(app.listen(8080)),  //for db chat
	 io = socket.listen(app.listen(80,function (){
		console.log("server is listen on port 80")
	}));


///routers

var	  main = require("./controllers/main.js")(app),
	 weather = require("./controllers/weather.js")(app),
	 news = require("./controllers/news.js")(app),
	 admin = require("./controllers/admin.js")(app),
	 chat = require("./controllers/chat.js")(app,io),

	 chatdb = require("./controllers/chat_db.js")(app,io2),  //chat працює на іншому порті
	 login = require("./controllers/login.js")(app),
	 registre = require("./controllers/registre.js")(app),
	 search = require("./controllers/search.js")(app);
	 

var error = require("./controllers/error.js")(app);




// var listen =  http.createServer(app).listen(80,function(){
// 	console.log("server is listen on port 80");
// })