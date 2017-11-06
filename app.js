const http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

//~ const fs = require('fs');
const hostname = '127.0.0.1';
const port = 8000;

//Body Parser Middleware methods (app.use() runs the specified function everytime the page is reloaded)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Setting Static Directory
app.use(express.static(path.join(__dirname,'public')));



app.get('/', (req,res) => {    //handling requests to home page which is represented by '/'
	res.send('person');
	});

app.listen(port,() => {
	console.log('Server started.');
});


//~ fs.readFile('index.html',(err,html)=>{
	//~ if(err){
		//~ console.log(err);
	//~ }
	//~ const server = http.createServer((req, res) => {
		//~ res.statusCode = 200;
		//~ res.setHeader('Content-Type', 'text/html');
		//~ res.write(html);
		//~ res.end()
	//~ });
	//~ server.listen(port, hostname, () => {
	//~ console.log('Server running at http://${hostname}:${port}/');
	//~ });
//~ });



