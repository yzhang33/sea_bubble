const io=require("../server").io;
//classes
const User = require('./userModel/user')
const UserData = require('./userModel/userData')
const Bullet = require('./bulletModel/bullet')

let settings={
    defaultCanvasWidth:500,
    defaultCanvasHeigh:500,
    defaultSize:6,
    copChosen:false,
    defaultChoice:[0,1,2,3,4,5,6,7,8,9,10]
}

let users = []
let currentBullets=[];
// let tests = [];
// let u1 = new UserData("pete",settings);
// for(var i=0;i<11;i++){
//     tests.push(new UserData("i",settings));
// }
// for(var i=0;i<11;i++){
//     console.log(tests[i]);
// }
// console.log(settings)

//update bullet position 10ms
setInterval(()=>{
    for(var i=0;i<currentBullets.length;i++){
        currentBullets[i].update();
        if(currentBullets[i].bulletY < 0){
            currentBullets.splice(i,1);
        }
    }
},33);

//boardcast data
setInterval(()=>{
    if(users.length > 0){
        io.to('board').emit('tok',{
            users,
            currentBullets
        });
    }
},33);//update users information every 30fps


io.sockets.on('connect',(socket)=>{
    let user = {};
    socket.on('init',(data)=>{
        socket.join('board');
        //update settings
        settings.defaultCanvasWidth = data.canvasWidth;
        settings.defaultCanvasHeigh = data.canvasHeight;

        //init new user data obj
        let userData = new UserData(data.userName, settings);
        user = new User(socket.id,userData);
        users.push(user);
        //testing purpose delete later
        if(users.length == 1){
            user.userData.identity = "cop";
            settings.copChosen = true;
        }
        //
        //send dummy data when connected
        socket.emit('initReturn', {
            userObject:user
        });
        //disconnect
        socket.on('disconnect', function () {
            for(var i = 0;i<user.length;i++){
                if(socket.id == user[i].socketId){
                    user.splice(i,1);
                }
            }
            console.log('socket disconnected : ' + socket.id)
        })
        console.log("new user connected:"+user.userData.name);
    });
    //receiveing user information
    socket.on('tik',(data)=>{
        if(user.socketId != null){
            user.userData.x = data.xVector;
            user.userData.y = data.yVector;
        }
    });
    //receiveing user information
    socket.on('copFired',(data)=>{
        let bullet = {};
        if(user.socketId != null && data.fired == true){
            console.log(data.copVectorX + " " +data.copVectorY)
            bullet = new Bullet(data.copVectorX,data.copVectorY);
            currentBullets.push(bullet);
            console.log("cop fired");
        }
        
    });
})

module.exports = io;