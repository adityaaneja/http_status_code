const http = require('http');
const os = require('os');

console.log("HTTP server simulator starting...");

var requestCount = 0;

var handler = function(request, response) {
  console.log("Received request from " + request.connection.remoteAddress);
  requestCount++;
  if (requestCount > 5) {
    response.writeHead(500);
    response.end("I'm not well. Please restart me!");
    requestCount=0; // Every sixth request returns 500. Reset the counter -aa 
    return;
  }
  else if (request.url == '/forbidden') {  // request to the /forbidden endpoint returns 403
    response.writeHead(403);
    response.end('Forbidden Resource')
    return;
  }
  else if (request.url == '/auth_req') {  //request to the /auth_req endpoint returns 401
    response.writeHead(401);
    response.end('Authorization Required');
    return;
  }
  else if (request.url == '/bad_request') { //request to the /bad_request endpoint returns 400
    response.writeHead(400);
    response.end('Bad Request');
    return;
  }
  else {
  response.writeHead(200);                 //Everything else returns 200. Set HTTP liveliness probe to monitor /
  response.end("You've hit " + os.hostname() + "\n");
  }
};

var www = http.createServer(handler);
www.listen(8080);

