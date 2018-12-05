var fs, getContentType, http, httpServer, path, requestResponseHandler, sendResponse;

http = require('http');

fs = require('fs');

path = require('path');

getContentType = function(url) {
  switch (path.extname(url)) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.json':
      return 'application/json';
    default:
      return 'application/octate-stream';
  }
};

sendResponse = function(url, contentType, res) {
  var file;
  file = path.join(__dirname, url);
  return fs.readFile(file, function(err, content) {
    if (err) {
      return sendResponse('index.html', 'text/html', res); // default to homepage on not found
    } else {
      res.writeHead(200, {
        'Content-Type': contentType
      });
      res.write(content);
      res.end();
      return console.log(`Response: 200 ${file}`);
    }
  });
};

requestResponseHandler = function(req, res) {
  console.log(`Request came: ${req.url}`);
  if (req.url === '/') {
    return sendResponse('index.html', 'text/html', res);
  }
  return sendResponse(req.url, getContentType(req.url), res);
};

httpServer = http.createServer(requestResponseHandler);

httpServer.listen(3000, function() {
  return console.log("Node.JS static file server is listening on port 3000");
});
