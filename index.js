const restify = require('restify');

function respond(req, res, next) {
    console.log(req.body);
    res.send('Success');
    next();
}

const server = restify.createServer();

server.use(restify.plugins.bodyParser);

server.post('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});