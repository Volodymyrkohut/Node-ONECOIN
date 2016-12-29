
import News from "../db/schema";
import { setError } from "./renderError.js";

function search (app) {

	app.get("/search",(req,res,next) => {
		res.render("search",{title:"search"});
	})


	app.post("/search",(req,res,next)=>{
		  const { search } =  req.body;

		News.find({$text:{$search:search}},
		(error,data) => {
			if(error) next(error)
			if( (data === null) || (data.length == 0) ) {
				next(setError(404,"По вашому запросу нічого не знайдено"))
			}
			res.render("search",{title:"find",
								  data:data})
		})
	})

}
export default search;


// при версії 2.4 or 2.6
// mongodb запускається з флагом 
///mongod --setParameter textSearchEnabled=true