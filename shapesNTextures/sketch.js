var texture;
var shapeBlank;
var shape;

function preload(){
  shapeBlank=loadImage('assets/ring3x.png');
  texture=loadImage('assets/tx3.png');
}

function setup() {
  createCanvas(500,500);
  shape=new Shape(shapeBlank,texture);
  // shape.applyTexture(texture);
  background(40);
}

function draw() {
  // background(40);
  // image(texture,0,0);
  // image(shapeBlank,50,50);
  shape.show(random(width),random(height),random(0.1,0.5));
  shape.show(mouseX, mouseY,1);
}

function Shape(shIm,newTexture){
  var texture=createGraphics(shIm.width, shIm.height);
  // texture.background(235,135,0);
  texture.image(newTexture,0,0);
  var shape=texture.get();
  shape.mask(shIm);

  this.applyTexture=function(newTexture){
    texture.image(newTexture,0,0);
    var shape=texture.get();
    shape.mask(shIm);
  };

  this.show=function(x,y,scl){
    push();
    translate(x,y);
    scale(scl);
    imageMode(CENTER);
    image(shape,0,0);
    pop();
  };
}
