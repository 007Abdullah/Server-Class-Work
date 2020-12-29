// const url = 'https://login-servers.herokuapp.com';
const url = 'http://localhost:5000';



function login() {

    let Emails = document.getElementById("lemail").value;
    let Passwords = document.getElementById("lpassword").value;

    const Http = new XMLHttpRequest();

    Http.open("POST", url + "/login");
    Http.setRequestHeader("Content-Type", "application/json");

    Http.send(JSON.stringify({
        email: Emails,
        password: Passwords
    }));

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {
            let JSONres = JSON.parse(Http.responseText)
            if (JSONres.status === 200) {
                alert(JSONres.message);
                window.location.href = "./Dashboard.html"

            }
            else {
                alert(JSONres.message);
            }

        }


    }


    return false;
}


function addPost() {
    var addTitle = document.getElementById('addTitle').value;
    var addDescription = document.getElementById('addDescription').value;
    var post = {
        title: addTitle,
        description: addDescription
    }
    document.getElementById('addTitle').value = "";
    document.getElementById('addDescription').value = "";
    const Http = new XMLHttpRequest();
    Http.open("POST", url + "/dashboard");
    Http.setRequestHeader("Content-Type", "application/json");

    Http.send(JSON.stringify(post));

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {
            let jsonRes = JSON.parse(Http.responseText)
            alert(jsonRes.message)
            let html = "";
            jsonRes.post.forEach(function (element, index) {
                html += `<div class="card border my-3 col-md-12" >
            <div class="card-body mr-5">
            <h2 id="title">${element.title}</h2>
            <span id="date">${element.date}</span>
            <p id="descrip">${element.description}</p>
            <button class="btn btn-primary" style="background-color: #c18f59; border-color: #c18f59;" id="index" onclic="del(this.id)">Delete
            Post</button>
            </div>
            </div>`
            });
            var posts = document.getElementById('posts');
            posts.innerHTML = html;
        }
    }
    return false;
}


const admin = () => {
    const Http = new XMLHttpRequest();
    // var url = "http://localhost:5000/getPosts";
    Http.open("GET", url + "/getPosts");
    Http.send();

    Http.onreadystatechange = (e) => {
        let jsonRes = JSON.parse(Http.responseText);
        console.log(jsonRes);
        let html = "";
        jsonRes.forEach(function (element, index) {
            html += `<div class="card border my-3 col-md-12">
            <div class="card-body mr-5">
            <h2 id="title">${element.title}</h2>
            <span id="date">${element.date}</span>
            <p id="descrip">${element.description}</p>
            <button class="btn btn-primary" style="background-color: #c18f59;
            border-color: #c18f59;" id="${index}" onclick="del(this.id)">Delete
            Post</button>
            </div>
            </div>`
        });
        var posts = document.getElementById('posts');
        posts.innerHTML = html;
    }
}

function del(index) {
    const Http = new XMLHttpRequest();
    console.log(index)
    // var url = "http://localhost:5000/del";
    Http.open("POST", url + "/del");
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify({
        i: index
    }));
    Http.onreadystatechange = (e) => {
        let jsonRes = JSON.parse(Http.responseText)
        console.log(jsonRes)
        // console.warn(xhr.responseText)
    }
    admin();
}

function loadPost(){
    const Http = new XMLHttpRequest();
    Http.open("GET", url+"/getPosts");
    Http.send();

    Http.onreadystatechange = (e) => {

        let jsonRes = JSON.parse(Http.responseText)
        console.log(jsonRes);
        let html = "";

        jsonRes.forEach(function (element, index) {
            html += `<div class="col-md-12 blog-post">
            <div class="post-title">
            <h1 id="posttitle">${element.title}</h1>
            <span id="date">${element.date}</span>
            <p id="descrip">${element.description}</p>
            </div>
            </div>`
        });
        var blogposts = document.getElementById('blogposts');
        blogposts.innerHTML = html;
    }
}
