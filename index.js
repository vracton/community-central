const http = require("http");
const path = require("path");
const express = require("express");
const JSONdb = require('simple-json-db');

//db
const db = new JSONdb('./db.json');

//express
const app = express();
app.use(express.json());
const httpserver = http.Server(app);

process.on('uncaughtException', console.error);
process.on('uncaughtRejection', console.error);

app.use("/", express.static(path.join(__dirname, "/public/homepage/")));
app.use("/login", express.static(path.join(__dirname, "/public/login/")));
app.use("/volunteer", express.static(path.join(__dirname, "/public/volunteer/")));
app.use("/petitions", express.static(path.join(__dirname, "/public/petitions/")));

httpserver.listen(3000, () => {
	console.log("Server Started")
});

//actual code
app.get("/content/:name", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/content/", req.params.name));
})

app.post("/vData", (req, res) => {
	res.send(JSON.stringify(db.get("volunteer")));
})
app.post("/pData", (req, res) => {
	res.send(JSON.stringify(db.get("petitions")));
})

app.get("/addPost/:title/:desc/:loc/:date/:time/:img",(req,res)=>{
	let a = db.get("volunteer")
	a.push({
		"title": req.params.title,
		"desc": req.params.desc,
		"loc": req.params.loc,
		"date": req.params.date,
		"time": req.params.time,
		"img": decodeURIComponent(req.params.img),
		"ts": Date.now(),
		"signups":[]
	})
	db.set("volunteer",a)
})

app.get("/addPet/:title/:desc/:img",(req,res)=>{
	let a = db.get("petitions")
	a.push({
		"title": req.params.title,
		"desc": req.params.desc,
		"img": decodeURIComponent(req.params.img),
		"ts": Date.now(),
		"votes":[],
		"count": 0
	})
	db.set("petitions",a)
})

app.get("/subscribeToPost/:postname/:email", (req,res)=>{
	let a = db.get("volunteer")
	for (let i of a){
		if (i.title == req.params.postname){
			i.signups.push(req.params.email)
		}
	}
	db.set("volunteer",a)
})

app.get("/vote/:postname/:email", (req,res)=>{
	let a = db.get("petitions")
	for (let i of a){
		if (i.title == req.params.postname){
			i.votes.push(req.params.email)
			i.count++
		}
	}
	db.set("petitions",a)
})