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

   /* 
  socket.on('login_req', function(data) {
          io.to(socket.id).emit("login_res",{ IsValid: "True" });

        
    	 if (data["username"]==sys_user && data["password"]==sys_pwd) {
            io.to(socket.id).emit("login_res",{ IsValid: "True" });
         }else{
             io.to(socket.id).emit("login_res",{ IsValid: "False" });
         }
        
    });
    */

     socket.on('moveRequest', function(data) {

     	 var direct = data["direction"];
         console.log("The client:" + socket.id + " requested to " +direct);
         io.to(socket.id).emit("moveResponse", {direction: direct});
    });
});


