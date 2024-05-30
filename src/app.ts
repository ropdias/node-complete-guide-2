import http from 'http';

import { requestHandler } from './routes';

// A request listener is a function that will be executed for every incoming request
const server = http.createServer(requestHandler);

server.listen(3000);
