import News from "../db/schema.js";
export default function (app){
//main
app.get("/admin",function (req,res,next){
	res.render("admin/index",{title:"Кабінет адміністратора"});
})

//insert
app.get("/admin/insert",function (req,res,next){
		res.render("admin/insert",{title:"Save"})
})
	
app.post("/admin/insert",function (req,res,next){
	const {title,description,content,author,cat,submit,meta_d,meta_k} = req.body
		var N = new News({
			title,
			description,
			cat,
			content,
			author,
			img: cat + ".png",
			date: new Date(),
			meta_d,
			meta_k
		})

		N.save(function (error,data){
			if(error) next(error)
			 
			else{
				 console.log("відправлено");
					res.status(302) // redirect
					res.setHeader("Location","/admin");
					res.send("200")
					console.log(N);
				}
		})

})
//
//якщо помилка  ERROR "WiredTigerIndex:: insert :key too large" тоді
//onecoin nowonecoin nowonecoin " mongod --setParameter failIndexKeyTooLong=false    " Записати в консолі монго



//update
app.get("/admin/update",function (req,res,next){
	News.find({},function(error,data){
		if(error) next(error)
		res.render("admin/update",{ data: data,
								    title: "update"});
	})
})


app.get("/admin/update/:id",function(req,res,next){
	const id = req.params.id;
	News.findById(id,function (error,data){
		if(error)  next(error)
		res.render("admin/change",{ data:data, title: "change" });
	}) 
})


	app.post("/admin/change", function (req,res,next){
			const { title,description,content,author,cat,secret,meta_k,meta_d } = req.body;

	 	News.update({_id: secret}, {$set: { title,
									 		description,
									 		content,
									 		author,
									 		cat,
									 		img:cat + ".png",
									 		meta_k,
									 		meta_d}}, {upsert: true}, function(error,data){
									 			if(error)
									 				next(error)
									 			else{
									 				console.log("change");
									 				res.status(302) // redirect
													res.setHeader("Location","/admin");
													res.send("200")
									 			}
											}
		)
	});
}

//https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications