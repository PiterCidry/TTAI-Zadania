var express = require("express");
var app = express();
var port = 80;

app.get("/", function(req, res) {
    res.send("Hello World!!");
});

var server = app.listen(port, function() {
    console.log(`Server is listening at port ${port}`);
});