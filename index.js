import Server from 'tbg95-server';
import http from 'http';
import nodeStatic from 'node-static';


const bare =  new Server('/content/', '');
const serve = new nodeStatic.Server('front/');

const server = http.createServer();

server.on('request', (request, response) => {
    if (bare.route_request(request, response)) return true;
    serve.serve(request, response);
});

server.on('upgrade', (req, socket, head) => {
  if(bare.route_upgrade(req, socket, head))return;
  socket.end();
});

server.listen(process.env.PORT || 1999);
