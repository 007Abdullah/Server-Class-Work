var express = require("express");

var app = express();

app.use(function middlerwale(req, respon, next) {
    console.log(" Method : " + req.method);
    console.log(" URL : " + req.url);
    console.log(" Conntion remote Address : " + req.connection.remoteAddress);
    console.log(" Conntion remote Port : " + req.connection.remotePort);
    next();
})

app.get("/blub", function (req, respon, next) {
    console.log("get ");
    respon.send("sameer is sent get");
})
app.post("/blub", function (req, respon, next) {
    console.log("post ");
    respon.send("sameer is sent post");
})
app.put("/blub", function (req, respon, next) {
    console.log("put ");
    respon.send("sameer is sent put");
})
app.delete("/blub", function (req, respon, next) {
    console.log("delete ");
    respon.send("sameer is sent delete");
})

app.listen(3000, () => {
    console.log("Server is Runiing");
})



// const Http = new XMLHttpRequest();
// const url='http://192.168.50.177:3000';
// Http.open("GET", url);
// Http.send();

// Http.onreadystatechange = (e) => {
//   console.log(Http.responseText)
// }