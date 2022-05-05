class UserData{
    constructor(userName,settings){
        this.name = userName;
        this.x = Math.floor(settings.defaultCanvasWidth*Math.random()+10);
        this.y = Math.floor(settings.defaultCanvasWidth*Math.random()+10);
        this.radius = settings.defaultSize;
        //generate random identity
        if(settings.copChosen == false){
            var ret = this.getRandomIdentity();
            if(ret == 1){
                settings.copChosen = true;
                this.identity = "cop"
            }else{
                this.identity = "people"
            }
        }else{
            this.identity = "people"
        }
        //appearnce for people
        if(this.identity === "people"){
            this.appearance = this.getRandomAppearance();
        }else{
            this.appearance = -1;
        }
    }

    getRandomIdentity(){
        return Math.floor(Math.random()*2);
    }
    
    getRandomAppearance(){
        return Math.floor(Math.random()*10);
    }
}

module.exports = UserData;