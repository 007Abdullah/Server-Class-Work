var PORT = process.env.PORT || 5000;
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt-inzi");
var jwt = require('jsonwebtoken');



/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = "mongodb+srv://root:root@cluster0.s5oku.mongodb.net/CURD_DATA?retryWrites=true&w=majority";
// let dbURI = 'mongodb://localhost:27017/testdb-database';
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
    uid: Number,
    uname: String,
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
    if (!req.body.uid || !req.body.uname || !req.body.email || !req.body.password || !req.body.phone || !req.body.gender) {
        res.status(403).send(`  please send name, email, passwod, phone and gender in json body.
        e.g:
        {
            "uid":"User ID",
            "uname": "Sameer",
            "email": "kb337137@gmail.com",
            "password": "abc",
            "phone": "03121278181",
            "gender": "Male"
        }`);
        return;
    }
    userModel.findOne({ email: req.body.email }, function (err, doc) {
        if (!err && !doc) {
            bcrypt.stringToHash(req.body.password).then(ispasswordhash => {
                console.log("hash: ", ispasswordhash);
                var newUser = new userModel({
                    uid: req.body.uid,
                    uname: req.body.uname,
                    email: req.body.email,
                    password: ispasswordhash,
                    phone: req.body.phone,
                    gender: req.body.gender,
                });
                newUser.save((err, data) => {
                    if (!err) {
                        res.send({
                            message: "user created",
                            status: 200
                        });
                    }
                    else {
                        console.log(err);
                        res.status(500).send({
                            message: "user create error, " + err
                        });
                    }
                });
            });
        } else if (err) {
            res.send({
                message: "DB ERR" + err,
                status: 500
            })
        } else {
            res.send({
                message: "User ALready Exit ",
                status: 409
            })
        }

    })

});
app.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.send(
            ` please send email and passwod in json body.
                e.g:
            {
                "email": "abc@gmail.com",
                "password": "123",
            }`
        )
    }
    // userModel.findOne({email:req.body.email, password: req.body.password })
    userModel.findOne({ email: req.body.email }, function (err, data) {
        if (err) {
            console.log(err)
            res.status(500).send({
                message: "an error occured: " + JSON.stringify(err)
            });
        }
        else if (data) {
            bcrypt.varifyHash(req.body.password, data.password).then(isMatchPassword => {
                if (isMatchPassword) {
                    res.send({
                        message: "login success",
                        user: {
                            uid: data.id,
                            name: data.name,
                            email: data.email,
                            phone: data.phone,
                            gender: data.gender,
                        },
                        token: token
                    });

                } else {
                    console.log("not matched");
                    res.status(401).send({
                        message: "incorrect password"
                    })
                }
            }).catch(e => {
                console.log("error: ", e)
            })
        }
        else {
            res.status(403).send({
                message: "user not found"
            });
        }
    })
    // Querying/reading data from database: https://mongoosejs.com/docs/models.html#querying
    // deleting data from database: https://mongoosejs.com/docs/models.html#deleting
    // updating data in database: https://mongoosejs.com/docs/models.html#updating


});

app.get("/getdata", (req, res, next) => {
    userModel.find({}, function (err, data) {
        if (err) {
            res.send({
                message: "Err " + JSON.stringify(err)
            });
        }
        else if (data) {
            res.send({
                AllData: data
            })
        }
    });
})
app.put("/upde", (req, res, next) => {

    userModel.findByIdAndUpdate({ "uid": req.body.uid }, function (err, data) {
        if (!err) {
            res.send({
                message: "Data Has Been Update",
                status: 200,
            })
        }
        else if (err) {
            res.send({
                message: "Err " + JSON.stringify(err),
                status: 404
            })
        }
    })



})
app.delete("/delete", (req, res, next) => {
    userModel.deleteOne({ uid: req.body.uid }, function (err, data) {
        if (!err) {
            res.send({
                message: "Data Has been Delete",
                status: 200
            })
        } else if (err) {
            res.send({
                message: "Error " + JSON.stringify(err),
                status: 404
            })
        }
    });
    // userModel.findByIdAndDelete(req.body.uid, function (err, data) {
    //     if (err) {
    //         res.send({
    //             message: "Error " + JSON.stringify(err),
    //             status: 404
    //         })
    //     }
    //     else if (data.uid) {
    //         res.send({
    //             message: "Enter This ID Data Delete",
    //             status: 200
    //         })
    //     }
    // })
})



app.listen(PORT, () => {
    console.log("Server is Running :", PORT);
})

