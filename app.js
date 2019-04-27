var http = require('http');
var fs = require('fs'); // get filestructure module
var url = require('url'); // get url module
var PORT = process.env.PORT || 5000;
var os = require('os'); // add the operating system global method
var EvEm = require('events'); // adds the CLASS Events, which contains objects... needs to be instantiated though
var emitter = new EvEm(); // instantiates object with global class methods under events



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
        console.log(`..Free memory: ${os.freemem()}`)
        res.end();

    });

}).listen(PORT);

console.log("Server listening on port: 8080....");