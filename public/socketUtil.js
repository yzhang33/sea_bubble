let roles = ["./assets/fish-02.png",
"./assets/fish-03.png",
"./assets/fish-04.png",
"./assets/fish-05.png",
"./assets/fish1.png",
"./assets/fish2.png",
"./assets/fish3.png",
"./assets/fish4.png",
"./assets/fish5.png"]

//connection to server
let socket = io.connect('http://localhost:8080');
//
let fire = false;

function init(){
    draw();
    socket.emit('init',{
        userName:user.name,
        canvasWidth:canvas.width,
        canvasHeight:canvas.height 
    })
}

socket.on('initReturn',(data)=>{
    user = data.userObject;
    setInterval(()=>{
        socket.emit('tik',{
            xVector:user.userData.x,
            yVector:user.userData.y
        })
    },33);
    
    console.log(user.userData);
    console.log(roles[user.userData.appearance]);
    if(user.userData.identity == "people"){
        //render people assets
        document.querySelector('#images').innerHTML += 
        `<img id=${user.socketId} 
              src=${roles[user.userData.appearance]}
              >`
    }
    //alert message for cop
    if(user.userData.identity == "cop"){
        alert("You are bubble generator!\n"+"Use Space to make bubble.");
    }
})

socket.on('tok',(data)=>{
    users = data.users;
    bullets = data.currentBullets;
    //console.log(bullets);
    //console.log(users)
    users.forEach( (u) =>{
        //console.log(""+u.socketId);
        if(u.socketId != user.socketId && document.getElementById(""+u.socketId) == null){
            document.querySelector('#images').innerHTML += 
            `<img id=${u.socketId} 
                  src=${roles[u.userData.appearance]}
             >`
        }
    })
})