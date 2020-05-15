var http = require("http");
var fs = require('fs');

function getType(_url) {
    var types = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".png": "image/png",
        ".gif": "image/gif",
        ".svg": "svg+xml"
    }
    for (var key in types) {
        if (_url.endsWith(key)) {
            return types[key];
        }
    }
    return "text/plain";
}

var content = function (req, res) {
    var url = "dist" + (req.url.endsWith("/") ? req.url + "index.html" : req.url);
    if (fs.existsSync(url)) {
        fs.readFile(url, (err, data) => {
            if (!err) {
                res.writeHead(200, {
                    "Content-Type": getType(url),
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, HEAD, PUT",
                    "Access-Control-Allow-Credentials": "true"
                });
                res.end(data);
            } else {
                res.statusCode = 500;
                res.end();
            }
        });
    } else {
        res.statusCode = 404;
        res.end();
    }
};

var server = http.createServer(content);

var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
