class Bullet{
    constructor(x,y){
        this.bulletX = x;
        this.bulletY = y;
        this.speed = 1;
        this.color = "#" + Math.floor(Math.random()*16777215).toString(16);

    }
    update(){
        this.bulletY -= this.speed;
    }
}

module.exports = Bullet;