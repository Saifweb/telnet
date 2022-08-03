//set express to work
const express =require('express');
const app=express();

//set port 
// PORT
const PORT = process.env.PORT || 8081;

// Listen on port 8081
app.listen(PORT, () =>
  console.log(`Application is listening on port ${PORT}!`)
);//set index.html
app.set('views','./Views');
//set static file index+css
app.use(express.static('public'));
app.use(express.static(__dirname + '/Views'));
app.use('/css',express.static(__dirname + '/public'));
app.use('/js',express.static(__dirname + '/public'));
//set WebSocket 
const WebSocket=require('ws');
// open connection with port ! 
const UrlSocket = new WebSocket.Server({port: 8082});
// test connection usless for our case ( if we dont use the url : ws://localhost:8082 )
UrlSocket.on('connection', socket =>{

    console.log(" new client connection open");

    socket.on("message",data=>{
        console.log(data);
        socket.send(data);
    })
    socket.on('close',()=>{
        console.log('client disconnected');
    })

})




