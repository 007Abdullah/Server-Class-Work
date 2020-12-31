var users = [
    { userName: "ali" },
    { userName: "li" },
    { userName: "ai" },
    { userName: "ai" },
    { userName: "ali" },
    { userName: "ai" },
    { userName: "aliadasd" },
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
    // let sass = req.body.name;
    users.push({
        userName: req.body.name
    });
    res.send({
        check: users,
        message: "send"
    });
    console.log(sass);
})
var server = http.createServer(app);


var io = socketIO(server);




io.on('connection', (user) => {

    console.log("user", user);

    console.log("user id: ", user.id);


    {
        users.map((eachUser) => {
            console.log("Each user", eachUser.userName)
        })
    }

    console.log("Name ", users[0].userName)

    user.emit("Name ", users[0].userName)

    users.push(user)
    setTimeout(function () {
        {users.map((eachUser) => {
                console.log("Each user", eachUser.userName)
            })
        }

    }, 1000)
    console.log('a user connected');

});


setInterval(function () {
    io.emit("COMMON_TOPIC", `some comon data: ${new Date().getSeconds()}`)
}, 3000)


server.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})