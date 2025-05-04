const Socket=io();

const form=document.getElementById("form");
const name=document.getElementById("name");
const message=document.getElementById("message");
const chatroom=document.getElementById("chatroom");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    Socket.emit("message", {
        name:name.value,
        message:message.value
    });
});

Socket.on("message", (data)=>{
    const message_area=document.createElement("p");
    message_area.textContent=`${name.value}:${message.value}`;
    chatroom.appendChild(message_area)
    message.value=""
})