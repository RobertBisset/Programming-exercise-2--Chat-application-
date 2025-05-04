const express=require("express");
const app=express();
const socket=require("socket.io");

app.use(express.static("static"));

const server=app.listen(4000, ()=>{
    console.log("server listening on 4000")
});
const io=socket(server)

io.on("connection", (socket)=>{
    console.log("user connected")
    socket.on("message",(data)=>{
        io.emit("message", data);
    });
    socket.on("disconnect",()=>{
        console.log("user disconnected");
    });
});