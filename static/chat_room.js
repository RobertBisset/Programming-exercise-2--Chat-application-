const Socket=io();

const form=document.getElementById("form");
const name=document.getElementById("name");
const message=document.getElementById("message");
const chatroom=document.getElementById("chatroom");
const user_list_box=document.getElementById("user_list_box")
const form_name=document.getElementById("form_name");
let username=""

Array.from(form.elements).forEach(formElement => formElement.disabled = true);
form.addEventListener("submit", function(e){
    e.preventDefault();
    Socket.emit("message", {
        message:message.value,
        name:username
    });
});

form_name.addEventListener("submit", function(e){
    e.preventDefault();
    Array.from(form.elements).forEach(formElement => formElement.disabled = false);
    Array.from(form_name.elements).forEach(formElement => formElement.disabled = true);
    username=name.value
    Socket.emit("name",{
        name:username
    });
});

Socket.on("message", (data)=>{
    const message_area=document.createElement("p");
    message_area.textContent=`${data.name}:${data.message}`;
    chatroom.appendChild(message_area)
    message.value=""
    window.scrollTo(0, document.body.scrollHeight);
})

Socket.on("user", (data2)=>{
    user_list_box.innerHTML=""
    for (var i=0; i<(data2.length);i++){
        const user_area=document.createElement("p");
        user_area.textContent=data2[i]
        user_list_box.appendChild(user_area)
    };
});