const http = require('http');
const os = require('os');

console.log("Kubia server starting...");

var requestCount = 0;

var handler = function(request, response) {
  console.log("Received request from " + request.connection.remoteAddress);
  requestCount++;
  if (requestCount > 5) {
    response.writeHead(500);
    response.end("I'm not well. Please restart me!");
    requestCount=0; // reset the counter -aa 
    return;
  }
  else if (request.url == '/forbidden') {
    response.writeHead(403);
    response.end('Forbidden Resource')
    return;
  }
  else if (request.url == '/auth_req') {
    response.writeHead(401);
    response.end('Authorization Required');
    return;
  }
  else if (request.url == '/bad_request') {
    response.writeHead(400);
    response.end('Bad Request');
    return;
  }
  else {
  response.writeHead(200);
  response.end("You've hit " + os.hostname() + "\n");
  }
};

var www = http.createServer(handler);
www.listen(8080);

