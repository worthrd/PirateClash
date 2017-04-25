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

//var initialObject = '<g id="ship" transform="translate(50,250)"><path d="M0,0 L10,20 L80,20 L90,0 L0,0" style="fill:none;stroke:black; stroke-width: 3px"/><path d="M45,0 L45, -70" style="fill:none;stroke:black; stroke-width: 2px"/></g>';
var initialObject = '<g id="tank"><g id="tank_body"><rect width="70" height="40" rx="6" ry="6" style="fill:none;stroke:black; stroke-width: 2px;z-index: -1"/></g><g id="tank_turret"><rect width="30" height="20" rx="6" ry="6"  x="20" y="10" style="fill:none;stroke:black; stroke-width: 2px"/><path d="M50,20 L85,20" style="fill:none;stroke:black; stroke-width: 2px"/></g></g>'

var onlineUsers = [];

io.on('connection', function(socket){
  console.log('a user connected:' + socket.id);
  io.to(socket.id).emit("connectionResponse", {init_object: initialObject});


     onlineUsers.push(socket.id);


     socket.on('moveRequest', function(data) {

     	   var direct = data["direction"];
         console.log("The client:" + socket.id + " requested to " +direct);
         io.to(socket.id).emit("moveResponse", {direction: direct, users: onlineUsers});
    });

    socket.on('disconnect', function() {
      console.log('a user disconected !:' + socket.id);

      var i = onlineUsers.indexOf(socket);
      onlineUsers.splice(i, 1);
   });
});


