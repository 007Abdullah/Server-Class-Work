let users = [
    {
        userEmail: "abc@gmail.com",
        userFathername: "PAPA",
        userPassword: "123",
        userName: "Abdullah",
        userPost: [],
    },
];


let tweets = [{
    userName: "some name",
    tweetText: "some text"
}]
const PORT = process.env.PORT || 5000;
const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");


var app = express();

var server = http.createServer(app);

var io = socketIO(server);



app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use("/", express.static(path.resolve(path.join(__dirname, "public"))));

app.post("/signup", (req, res, next) => {
    var cuentEmail = req.body.email;
    var isFound = false;
    for (i = 0; i < users.length; i++) {
        if (users[i].userEmail === cuentEmail) {
            isFound = i;
            break;
        }
    }
    if (isFound) {
        res.send({
            message: "Email is Already Exit",
            status: 400
        });
    }
    else {
        users.push({
            userEmail: req.body.email,
            userPassword: req.body.password,
            userName: req.body.name,
            userFathername: req.body.fname,
            userPost: [],
        });
        res.send({
            message: "Signed up succesfully",
            status: 200
        });
    }

})

app.post("/login", (req, res, next) => {


    let email = req.body.userEmail;
    let password = req.body.password;
    let isFound = false;

    for (var i = 0; i < users.length; i++) {
        if (users[i].userEmail === email) {
            isFound = i;
            break;
        }
    }
    if (isFound) {
        if (users[isFound].userPassword === password) {

            res.send({
                message: "Signed in succesfully",
                status: 200,
                currentUser: {
                    userName: users[isFound].userName,
                    userEmail: users[isFound].userEmail,
                }
            });
        } else {
            res.send({
                message: "password is wrong",
                status: 400,
            });
        }

    } else {
        res.send({
            message: "User not found",
            status: 400,
        })
    }
})

app.post("/tweet", (req, res, next) => {
    tweets.push({
        userName: req.body.userName,
        tweetText: req.body.tweetText,
    })
    res.send(tweets);
    io.emit("NEW_POST", JSON.stringify(tweets[tweets.length - 1]));
})
app.get("/tweet", (req, res, next) => {
    res.send(tweets);
})
server.listen(PORT, () => {
    console.log("Server is Runnig :", PORT);
})