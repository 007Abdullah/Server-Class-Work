var users = [
    { username: "ali" },
];


var PORT = process.env.PORT || 5000;
var express = require("express");
var path = require("path");
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require("http");
var socketIO = require('socket.io');

var app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json())


app.get("/signup", (req, res, next) => {
    res.send("signup response")
})

var server = http.createServer(app);
var io = socketIO(server);



app.use("/", express.static(path.resolve(path.join(__dirname, 'public'))))

app.post('/gtdata', (req, res, next) => {
    users.push({
        username: req.body.username
    });
    res.send(users)
    io.emit("CURRENT", JSON.stringify({
        username: req.body.username
    }))
})

app.get('/gtdata', (req, res, next) => {
    res.send(users);
})

server.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})