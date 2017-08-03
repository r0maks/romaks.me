var w = 1000;
var rainDrops = [];

function setup() {
    createCanvas(w, 750);
    generateDrops();
}

function generateDrops(){
    
    // start with 100 drops
    for (var i = 0; i < 2000; i++) {
        rainDrops[i] = new Drop();
    }

}

function draw() {

    background(20);
    for (var i = 0; i < rainDrops.length; i++) {
        rainDrops[i].fall();
        rainDrops[i].show();
  }
}

function Drop() {
 
    this.x1 = random(0, w-1);
    this.x2 = this.x1+2;
    this.y1 = 1;
    this.y2 = 2;
    this.z = random(0, 20);
    this.yspeed = map(this.z, 0, 20, 1, 20);

    this.show = function(){

        stroke(255, 50, 255);
        line(this.x1, this.y1, this.x2, this.y2);
    }

    this.fall = function() {
        this.y1 = this.y1 + this.yspeed;
        this.y2 = this.y2 + this.yspeed;
        var grav = map(this.z, 0, 20, 0, 0.2);
        this.yspeed = this.yspeed + grav;


        if(this.y1 > height){
            this.y1 = this.y2 = random(-200, -100);
            this.yspeed = map(this.z, 0, 20, 4, 10);
        }
    }

}


