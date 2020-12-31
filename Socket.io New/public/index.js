var socket = io("http://localhost:5000/");


socket.on('connect', function () {
    console.log("conneted");
})


socket.on('NOTIFICATION', function () {
    console.log("notification received");
})

socket.on("COMMON_TOPIC", function (messgae) {
    console.log("common topic recived", messgae)
})