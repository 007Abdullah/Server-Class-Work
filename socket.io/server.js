var users = [
    {
        name: "sameer"
    },
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








app.use("/", express.static(path.resolve(path.join(__dirname, 'public'))))

app.post('/gtdata', (req, res, next) => {
    let sass = req.body.user;
    res.send({
        check: sass
    });
    console.log(sass);
})
// var server = http.createServer(app);


// var io = socketIO(server);




// io.on('connection', (user) => {

//     console.log("user id: ", user.id);

//     user.emit("NOTIFICATION", "some data")

//     users.push(user);

//     console.log("user count: ", users.length);


//     setTimeout(function () {
//         users[0].emit("NOTIFICATION", "new message")
//     }, 10000)
//     console.log('a user connected');

// });


// setInterval(function () {
//     io.emit("COMMON_TOPIC", `some comon data: ${new Date().getSeconds()}`)
// }, 3000)


app.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})