/// creating a http server in nodejs
// import
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req);
    
});

server.listen(3000);
