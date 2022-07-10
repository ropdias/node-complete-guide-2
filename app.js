const http = require("http");

const routes = require("./routes");

console.log(routes.someText);

// A request listener is a function that will be executed for every incoming request
const server = http.createServer(routes.handler);

server.listen(3000);
