const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { Socket } = require("socket.io");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

/// require
const PORT = process.env.PORT || 5000;

let server = app.listen(PORT, () => {
  console.log("Server đang chay tren cong 5000");
});

var io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
app.set("socketio", io);

let socket_id = []

// io.on("connection", socket => {
//     app.set('socketio', io);
// })

//// https://stackoverflow.com/questions/18856190/use-socket-io-inside-a-express-routes-file

///// https://stackoverflow.com/questions/38511976/how-can-i-export-socket-io-into-other-modules-in-nodejs

io.on("connection", (socket) => {
    console.log('connection')
    socket.on('clientId', (res)=>{
        console.log(socket.id)
        socket_id.push({
            id: res,
            socketID: socket.id
        })
        socket.emit("notification", {
            content: "123456"
        });
        console.log("Hello")

        socket.on('sendNoti', (res)=>{
            console.log("Hello")
            console.log(res)

            let target = socket_id.find(user => user.id == res.idTarget)
            console.log(target)
            socket.to(target.socketID).emit("notification", {
                content: res.messeage
            });
        })

    })
    socket.on("disconnect", () => {
        socket_id = socket_id.filter(user => user.socketID !== socket.id)
    });
});

