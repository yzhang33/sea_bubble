//musics
const audio = document.querySelector("#backgroundMusic");
const bubble = document.querySelector("#bubble");

canvas.addEventListener('mousemove',(e)=>{
    if(user.socketId != null){
        user.userData.x=e.pageX;
        user.userData.y=e.pageY;
    }
    audio.volume = 0.5;
    audio.loop = true;
    audio.play();
})

//fire event for cop
window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
      return;
    }
    if(user.userData.identity == "people"){
        return;
    }
    if (event.code === "Space" && user.userData.identity == "cop"){
        // Handle fire
        fire = true;
        bubble.play();
        socket.emit("copFired",{
            copVectorX: user.userData.x,
            copVectorY: user.userData.y,
            fired: fire
        });
        fire = false;
    }
    event.preventDefault();
  }, true);
  
//draw all the image tags
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let bkImage = document.getElementById("bkj");
    ctx.drawImage(bkImage,0,0,canvas.width,canvas.height);
    //render user images
    if(user.userData != undefined ){
        generateImage(user);   
    }
    //render connected user image
    if(users.length > 0){
        users.forEach((u)=>{
            //console.log(u.userData.identity);
            if(u.socketId != user.socketId){
                generateImage(u);
                if(collusion(u,user)){
                    ctx.font = "30px Arial";
                    ctx.fillText(u.userData.name, u.userData.x, u.userData.y);
                }
            } 
        });
    }
    //draw bullets
    bullets.forEach((b)=>{
        generateBullet(b);
    });
    requestAnimationFrame(draw);
}
//***********************************************************
//used to generate image associated
//********************************************************** */ */
function generateImage(u){
    let elementId="";
    if(u.userData.identity == "people"){
        elementId = ""+u.socketId;
    }else{
        elementId = "cop";
    }
    let myImage = document.getElementById(elementId);
    //console.log(myImage.naturalWidth+" "+myImage.naturalHeight);
    myImage.style.width = myImage.naturalWidth/10;
    myImage.style.height = myImage.naturalHeight/10;
    offSetX = myImage.naturalWidth/20;
    offSetY = myImage.naturalHeight/20;
    ctx.drawImage(myImage,u.userData.x-offSetX,u.userData.y-offSetY,myImage.naturalWidth/10,myImage.naturalHeight/10);
}
//***********************************************************
//used to generate bullets 
//********************************************************** */ */
function generateBullet(b){
    //console.log(b);
    ctx.beginPath();
    ctx.arc(b.bulletX, b.bulletY-40, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.lineWidth = 5;
    ctx.strokeStyle = b.color;
    ctx.stroke();
}
//***********************************************************
//collusion detection to display user's name
//********************************************************** */ */
function collusion(u1,u2){
    var d1 = u1.userData.x - u2.userData.x;
    var d2 = u1.userData.y - u2.userData.y;
    var dist = Math.sqrt(d1*d1-d2*d2);
    if(dist < 30){
        return true;
    }
    return false;
}