const http = require("http");

function requestHandle(request, response) {
    console.log("In comes a request to:" + request.url);
    console.log("In comes a request to:" + request.method);
    console.log("In comes a request to:" + request.body);
    response.end("Hello World!");
}

var server = http.createServer(requestHandle);

server.listen(3000);