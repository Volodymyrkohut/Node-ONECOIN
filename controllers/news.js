import News from "../db/schema";
import { setError } from "./renderError.js";

function news(app){
//маршрутизація
app.get("/news/:cat?",(req,res,next)=>{
	//якщо в юрл існує строка кат то парситимуться категорії в іншому випадку покаже всі категорії
	 var findByCat = {},
		 cat = req.params.cat,
		 page = req.query.param,
		 limit = req.query.limit;
	 
	 if(limit)
		limit = Math.round(req.query.limit);
	
	 else
		 limit = 5
	 
		if(cat)
			findByCat = {cat:cat}


		if(page)
			 page = req.query.param
		
		else
			page = 1;
		
News.paginate(findByCat, { page:page,
						   limit: limit, 
						   sort: {date: -1} }, 
	(error, data) => {
	if(error) next(error)
	if(data === null){ next(setError(404,"Categori not found"))}	
	
	res.render("news",{
				cat:cat,
				data:  data.docs,
				title: "Криптовалюти",
				pages:data.pages,
				page:data.page,    // поточна сторінка
				total: data.total //  кількість статей
	})
	})
})


//Відкрита стаття!
	app.get("/news/open/:id",(req,res,next) => {
		 var id = req.params.id
		News.findById(id,function (error,data){
			if(error) next(error)
			if(data === null){ next(setError(404,"News not found"))}	
			res.render("newsopen",{
				data:data,
				title:data.title
			})
		})
	})

//for  RSS
	app.get("/api/news/json",(req,res,next) => {
		News.find({},(error,data) => {
			if(error) next(error)
			if(data === null){ next(setError(404,"JSON not found"))}	
			res.json(data);
		})

	})
}

export default news;

// News.list({start: 0, limit: 5, find:cat}, function(err,count,results){
//	})