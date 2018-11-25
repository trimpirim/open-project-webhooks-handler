const restify = require('restify');
const fs = require('fs');
const util = require('util');
const moment = require('moment');

function respond(req, res, next) {
    const stream = fs.createWriteStream(`${__dirname}/logs/requests.log`, {flags: 'a+'});
    stream.write(`[${moment().format('YYYY-MM-DD hh:mm:ss')}] ${util.format.apply(null, [JSON.stringify(req.body)])}\n`);
    res.send({success: true});
    next();
}

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

server.post('/workpackages', respond);

server.listen(8899, function() {
    console.log('%s listening at %s', server.name, server.url);
});