var http = require('http');
var fs = require('fs'); // get filestructure module
var url = require('url'); // get url module

http.createServer(function (req, res) {
    var q = url.parse(req.url, true); // assign url and parse requested url
    var filename = '.'+q.pathname; // assign filename based on requested url; dot signifies root dir

    if (filename === "./") {
      filename = "./index"; // pass along index.html if no page is passed into url
    }

    filename = filename + ".html"; // add .html to naked url file name

    fs.readFile(filename, function (err, data) {
      if (err){ // if filename requested doesn't exist, throw error 404, and write not found on end
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Founded");
      }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data); // valid filename requested is passed through function as `data`
        console.log("..Incoming request: " + req.url);
        res.end();

    });

}).listen(8080);

console.log("Server listening on port: 8080....");