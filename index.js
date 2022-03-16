const PORT = process.env.PORT || 5000;
var http = require("http");

http.createServer (function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain"});
    response.write("Hello!\n");
    response.end("This is the end");
})
.listen(PORT);