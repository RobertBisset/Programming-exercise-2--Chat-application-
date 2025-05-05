const express=require("express");
const app=express();
const socket=require("socket.io");
const user_list=[]

app.use(express.static("static"));

const server=app.listen(4000, ()=>{
    console.log("server listening on 4000")
});
const io=socket(server)

io.on("connection", (socket)=>{
    console.log("user connected")
    io.emit("message", {name:"Server", message:"user connected"});
    socket.on("name", (data)=>{
        socket.user=data.name
        if (!((user_list).includes(data.name))){
            user_list.push(data.name)
            io.emit("user",user_list);
        }
    })
    socket.on("message",(data)=>{
        io.emit("message", data);
    });
    socket.on("disconnect",()=>{
        console.log(socket.user)
        console.log("user disconnected");
        io.emit("message", {name:"Server", message:"user disconnected"});
        if (user_list.indexOf(socket.user)!=-1){
        user_list.splice(user_list.indexOf(socket.user), 1)}
        io.emit("user",user_list);
    });
});