
var	socket = io.connect('http://localhost:80');

window.onunload = function(){
	socket.disconnect();
}

window.onload = function(){

var text = document.getElementById("text");
var form = document.getElementById("form");
var set = document.getElementById("set");
var userOnline = document.getElementById("bar");

var user =  prompt("Введіть своє імя") || "user";
socket.emit("user",color(user));




//for users list
socket.on("answer",function (data){
	 console.log(data)
		userOnline.innerHTML = data.user;
		 set.innerHTML =  data.text;
});





	form.onsubmit  = function (){
		socket.emit("message",{ msg: text.value });
		text.value = "";
		return false;  // шоб не пурезагружалася сторінка
	}

	
socket.on("send",function(data){
			set.innerHTML =  data.report;
})

}



/// color users list
function color (user){
var color = ["gray","green","yallow","orange","blue","red","olive","pink","cyan","teal","teal","lime"]
	var c = Math.round(Math.random()*10 + 1) ;


	var colorUser = "<span style='color:" + color[c] + ";'>" + user + "</span>"
	return colorUser;
}