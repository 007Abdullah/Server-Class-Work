var PORT = process.env.PORT || 5000;
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");



/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = "mongodb+srv://root:root@cluster0.s5oku.mongodb.net/testdb?retryWrites=true&w=majority";
// let dbURI = 'mongodb://localhost:27017/abc-database';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log('Mongoose is connected');
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});
mongoose.connection.on('error', function (err) {//any error
    console.log("Mongoose connection error", err);
    process.exit(1);
});

process.on('SIGINT', function () {////this function will run jst before app is closing
    console.log("app is terminated");
    mongoose.connection.close(function () {
        console.log("Mongoose Default Connection Close");
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    gender: String,
    createdon: { type: Date, 'default': Date.now }
});

var userModel = mongoose.model("users", userSchema);

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use("/", express.static(path.resolve(path.join(__dirname, "public"))));


app.post("/signup", (req, res, next) => {
    if (!req.body.name || !req.body.email || !req.body.password || !req.body.phone || !req.body.gender) {
        res.status(403).send(`  please send name, email, passwod, phone and gender in json body.
        e.g:
        {
            "name": "malik",
            "email": "malikasinger@gmail.com",
            "password": "abc",
            "phone": "03001234567",
            "gender": "Male"
        }`);
        return;
    }
    var newUser = new userModel({
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "phone": req.body.phone,
        "gender": req.body.gender,
    });
    newUser.save((err, data) => {
        if (!err) {
            res.status(200).send({
                message: "User is Created"
            });
        }
        else {
            console.log(err);
            res.status(500).send({
                message: "User Create Error"
            } + err);
        }
    });
});


app.listen(PORT, () => {
    console.log("Server is Running :", PORT);
})

