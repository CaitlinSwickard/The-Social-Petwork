const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000",

    },
});

let users = [];

const addUser = (userId, socketId)=>{
    !users.some((user)=> user.userId === userId) &&
    users.push({userId, socketId});
};

const removeUser = (socketId)=>{
    users = users.filter((user)=>user.socketId !== socketId)
};

const getUser = (userId) =>{
  return  users.find((user)=> user.userId === userId);
};


// when connected 

io.on("connection", (socket)=>{
    console.log("user connected")
});


// take userID and socke Id from user

socket.on("addUser",(userId)=>{
    addUser(userId,socketid);
    io.emit("getUsers",users);
});

// send and get message
socket.on("sendMessage",({serderId, receiverId,text})=>{
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage",{
        serderId,
        text,
    });
});

// when disconnect 
socket.on("disconnect",()=>{
    console.log("user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers",users);
});

