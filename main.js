var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var io = require('socket.io')(http);



app.use(express.static('public'));

app.get('/',function(req,res){
 fs.readFile("game_start.html", 'utf-8', function (error, data) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.end();
	});
});


http.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
 

io.on('connection', function(socket){
  console.log('a user connected');
});


