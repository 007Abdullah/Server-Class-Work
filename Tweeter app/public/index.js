
// const url = 'https://realtimetweeter.herokuapp.com';
const url = "http://localhost:5000";
var userPost = document.getElementById("userPost");

let currentUser;
if (localStorage.getItem("currentUser")) {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
}

var socket = io(url);

socket.on('connect', function () {
    console.log("user is connect")
})
function signup() {
    let signupData = {
        name: document.getElementById('txt_name').value,
        fname: document.getElementById('txt_fname').value,
        email: document.getElementById('txt_email').value,
        password: document.getElementById('txt_password').value,
        userPost: [],
    };

    const Http = new XMLHttpRequest();
    Http.open("POST", url + "/signup");
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(signupData));

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {

            // console.log(Http.responseText)
            let jsonRes = JSON.parse(Http.responseText)

            if (jsonRes.status === 200) {
                alert(jsonRes.message);
                window.location.href = "login.html";
            } else {
                alert(jsonRes.message);
            }
        }
    }
    return false;

}

function login() {
    var userEmail = document.getElementById("lemail").value.toLowerCase();
    var password = document.getElementById("lpassword").value

    obj = {
        userEmail: userEmail,
        password: password,
    }
    // console.log(obj);

    const Http = new XMLHttpRequest();

    Http.open("POST", url + "/login");
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(obj));

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {

            // console.log(Http.responseText);
            let jsonRes = JSON.parse(Http.responseText);

            if (jsonRes.status === 200) {
                alert(jsonRes.message);
                localStorage.setItem("currentUser", JSON.stringify(jsonRes.currentUser));
                // console.log(currentUser);
                window.location.href = "tweeter.html";
            }
            else {
                alert(jsonRes.message);
            }
        }
    }
    return false;
}

let logout = () => {
    if (currentUser === null || currentUser === undefined) {
        window.location.href = "index.html";
    }
    else {
        currentUser = null;
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    }

}

function post() {

    let tweetText = document.getElementById("userPost").value;

    const Http = new XMLHttpRequest();
    Http.open("POST", url + "/tweet");
    Http.setRequestHeader("Content-Type", "application/json");

    Http.send(JSON.stringify({
        userName: currentUser.userName,
        tweetText: tweetText,
    }));
    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {
            jsonRes = JSON.parse((Http.responseText));
            console.log("posted success");
        }
    }
}

