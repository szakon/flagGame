const http = require('http');
const { Server } = require("socket.io");
const hostname = '127.0.0.1';
const port = 3000;
const fileQuery = require('./front.js')

const server = http.createServer((request, response) => {
    // Set CORS headers to allow requests from any origin
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    let filePath = request.url.split("/").filter(function(elem) {
        return elem !== "..";
    });

    // If the URL starts by /api, then it's a REST request (you can change that if you want).
    if (filePath[1] === "api/randomBotMove") {
        response.writeHead(200);
        response.write("1");
        response.end();
    } else {
        fileQuery.manage(request, response);
    }
});

const io = new Server(server);


server.listen(port, hostname, () => {
    //indicate the server is up and running and ready to lister
    console.log(`Server running at http://${hostname}:${port}/`);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('played', (text) => {
        console.log(text);
        socket.emit('rightMove',{isMoveRight:true,NextContryToGuess:'USA'})
    });

});
