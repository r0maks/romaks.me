var w = 1000;
var rainDrops = [];

function setup() {
    createCanvas(w, 750);

}

function draw() {

    background(30);
    generateDrops();
}

function generateDrops(){
    
    stroke(230);
    // start with 100 drops
    for(var i=0; i<30; i++) {

        var x1 = random(0, w-1);
        var x2 = x1+1;
        var y1 = 1;
        var y2 = 5;
        rainDrops.push(line(x1, y1, x2, y2));

    }
    rainDrops = [];

}

function Drop() {
  this.x = random(width);
  this.y = random(-500, -50);
  this.z = random(0, 20);
  this.len = map(this.z, 0, 20, 10, 20);
  this.yspeed = map(this.z, 0, 20, 1, 20);

}


