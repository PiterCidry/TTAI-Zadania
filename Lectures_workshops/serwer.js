const http = require("http");

const hostname = "127.0.0.1";
const port = 8080;

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write("Hello World!");
        res.end();
    } else {
        res.writeHead(400);
        res.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});