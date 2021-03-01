var productImage;
var productExplorer;

function preload(){
  productImage=loadImage('images/duck.png');
}

function setup(){
  createCanvas(600,350);
  productExplorer=new ProductExplorer(height/2,height/2,height*0.8);
}

function draw(){
  background(40);
  productExplorer.show();
}

function mousePressed(){

};

// function createProductData(){
//   for(var i=0; i<numDataPoints; i++){
//     productData[i]=random();
//   }
// }

function ProductExplorer(x,y,s){
  var aspects=[];
  var sMin=s*0.5;
  var sMax=s*1;
  var numAspects=8;
  for(var i=0; i<numAspects; i++){
    aspects.push(new Aspect(i,x,y,sMin/2,sMax/2,i*TWO_PI/numAspects));
  }

  this.show=function(){
    aspects.forEach(function(aspect){
      aspect.show();
    });

  };
}

function Aspect(id,x,y,sMin, sMax, aPoint){
  this.currentVal=random();
  var sSpan=sMax-sMin;
  var nv=50;
  var verts=[];
  var aStep=TWO_PI/nv;
  var nOff=random(10);
  var rPoint=sMin+sSpan*(this.currentVal);
  var xPoint=x+cos(aPoint)*rPoint;
  var yPoint=y+sin(aPoint)*rPoint;
  var sPoint=sMax*0.25;
  for(var i=0; i<nv; i++){
    var px=x+cos(i*aStep)*sMin*this.currentVal;
    var py=y+sin(i*aStep)*sMin*this.currentVal;
    var n=noise(px/10,py/10+nOff)-0.5;
    px=x+cos(i*aStep)*(sMin+sSpan*(this.currentVal*0.9+0.2*n));
    py=y+sin(i*aStep)*(sMin+sSpan*(this.currentVal*0.9+0.2*n));
    verts.push({x:px, y:py});
  }

  this.show=function(){
    var d=dist(xPoint,yPoint,mouseX, mouseY);
    hover=d<sPoint/2;
    stroke(10+id*30,180);
    strokeWeight(sMax*0.03);
    noFill();
    beginShape();
    verts.forEach(function(v){
      vertex(v.x, v.y);
    });
    endShape(CLOSE);
    fill(10+id*30,180+hover?100:0);
    noStroke();
    ellipse(xPoint, yPoint,hover?sPoint:sPoint/2);
  }
}
