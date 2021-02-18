var feature;

function setup() {
  createCanvas(600, 400);
  feature=new Feature(300,350,-PI*0.45,200,75);
}

function draw() {
  background(120);
  feature.run();
}

function mousePressed() {
feature.click();
}

function Feature(x,y,a,l,s){
  flower=new FeatureFlower(x,y,a,l,s);

  this.click=function(){
    flower.toggle();
  };

  this.run=function(){
    flower.run();
    flower.show();
  };
}

function FeatureFlower(rx,ry,ra,ml,ms){
  var grow=0;
  var expand=0;
  var growRate=0.025;
  var expandRate=0.05;
  var growOn=false;
  var expandOn=false;
  var relX=relY=0;
  var hover=false;

  this.toggle=function(){
    growOn=!growOn;
  };

  this.run=function(){
    if(growOn){
      if(grow<1){
        grow+=growRate;
      } else if(grow>0){
        if(expand>0){
          expand-=expandRate;
        } else {
          grow-=growRate;
        }
      }
    }
    if(expandOn && grow>=0.99){
      if(expand<1){
        expand+=expandRate;
      } else if(expand>0){
        expand-=expandRate;
      }
    }
    relX=cos(ra)*grow*ml;
    relY=sin(ra)*grow*ml;
    flowerS=ms*0.1+expand*0.9;
    hover=dist(mouseX, mouseY,rx+relX, ry+relY)<flowerS/2;
    expandOn=hover;
  };

  this.show=function(){
    push();
    stroke(255);
    noFill();
    if(hover){
      fill(255,100);
    }
    translate(rx,ry);
    line(0,0,relX,relY);
    translate(relX, relY);
    ellipse(0,0,flowerS);
    pop();
  }
}
