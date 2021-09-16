const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const app =express()
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

/// require
const PORT = process.env.PORT || 5000;

let server = app.listen(PORT, () => {
    console.log('Server đang chay tren cong 5000');
});

var io = require('socket.io')(server);

io.on("connection", socket => {
    app.set('socketio', io);
})

app.use("/api/test", (req, res)=>{
    //// https://stackoverflow.com/questions/18856190/use-socket-io-inside-a-express-routes-file
    
    const socket = req.app.get("socket");
    socket.emit(customerId, { test: "something" });
})
