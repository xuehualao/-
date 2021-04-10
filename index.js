let http = require("http");
http.createServer(function (req, res) {
    res.writeHead(200, {
        "content-type": "text/html;charset=utf-8"
    });
    res.end("<h1>blue</h1>");
}).listen(8088, "127.0.0.1");