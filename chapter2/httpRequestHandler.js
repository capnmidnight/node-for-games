var mime = require("mime");
var path = require("path");
var fs = require("fs");

module.exports = function requestHandler(req, res) {
    var fileName = path.join(__dirname, req.url);
    if(fileName[fileName.length - 1] === path.sep)
        fileName += "index.html";
    fs.readFile(fileName, function readFile(err, data) {
        if (err)
            send(res, 404, "text/plain", "File not found. Path: ("
                + req.url
                + ") reason: "
                + JSON.stringify(err));
        else
            send(res, 200, mime.lookup(fileName), data);
    });
}

function send(res, code, type, data) {
    res.writeHead(code, {"Content-Type": type});
    res.end(data);
}