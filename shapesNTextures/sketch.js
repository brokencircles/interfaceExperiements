var textures=[];
var shapeBlanks=[];
var blankNames=['3-quarters3x','body3x','fan3x','ring3x','arch3x'];
var shapes=[];
var numTextures=9;
var numShapes=50;

function preload(){
  for(var i=0; i<blankNames.length; i++){
    shapeBlanks.push(loadImage('assets/'+blankNames[i]+'.png'));
  }
  for(var i=0; i<numTextures; i++){
    textures.push(loadImage('assets/tx'+i+'.png'));
  }
}

function setup() {
  createCanvas(500,500);
  // shape=new Shape(shapeBlank,texture);
  // shape.applyTexture(texture);
  background(40);
}

function draw() {
  background(230);
  if(shapes.length<numShapes && random(10)<1){
    shapes.push(new Shape(random(shapeBlanks), random(textures),random(width),-10));
  }
  // image(texture,0,0);
  // image(shapeBlank,50,50);
  for(var i=shapes.length-1; i>=0; i--){
    if(shapes[i].run()){
      shapes[i].show();
    } else {
      shapes.splice(i,1);
    }
  }
  // shape.show(random(width),random(height),random(0.1,0.5));
  // shape.show(mouseX, mouseY,1);
}

function Shape(shIm,newTexture,x,y){
  var fall=random(0.5,2);
  var scl=random(0.1,0.5);
  var a=0;
  var rot=random(-PI/50,PI/50);
  var texture=createGraphics(shIm.width, shIm.height);
  // texture.background(235,135,0);
  texture.image(newTexture,0,0);
  var shape=texture.get();
  shape.mask(shIm);

  this.run=function(){
    y+=fall;
    a+=rot;
    return y<height;
  };

  // this.applyTexture=function(newTexture){
  //   texture.image(newTexture,0,0);
  //   var shape=texture.get();
  //   shape.mask(shIm);
  // };

  this.show=function(){
    push();
    translate(x,y);
    rotate(a);
    scale(scl);
    imageMode(CENTER);
    image(shape,0,0);
    pop();
  };
}
