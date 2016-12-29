var url_util = require("url"),
	request = require("request"),
	renderError = require("./renderError.js"),
 // console.log(url_util.parse("http://api.openweathermap.org/data/2.5/forecast/city?q=kalush&APPID=f326c3073fb2f2368e859cc83bda95f8",true))


   format = {
	protocol:"http",
	hostname: "api.openweathermap.org",
    pathname: "/data/2.5/forecast/daily",
	search: "q=kalush&lat=35&lon=139&cnt=7&lang=ua&units=metric&mode=json&APPID=f326c3073fb2f2368e859cc83bda95f8"
};

//
var URL  = url_util.format(format);
// console.log(URL);


function weather (app){
app.get("/weather",function (req,res,next){
 		request(URL,function (error,response,body){
 		 	if(error) next(error)
 		 	if(body === null){
 		 		next(renderError.setError(404,"Body Not Found"))
 		 	}

 		 	var BodyJSON = JSON.parse(body);
			res.render("weather.ejs",{data:"Weather",
									title: "Weather",
								   array: BodyJSON
								  // date:  Date(dt),
								  // day:   parseInt(temp.day - 274),
								  // morn:  parseInt(temp.morn - 274),
								  // night: parseInt(temp.night - 274),
								  // eve:  parseInt(temp.eve - 274)
								})
 		})
 	})
}
module.exports = weather;

//http://www.iconarchive.com/search?q=weather&page=10
//http://openweathermap.org/weather-conditions

//<img src="images/weather/<%- feed.weather[0].description.replace(new RegExp(" ",'g') ,"") %>.png">
//