var productImage;
var productExplorer;

function preload(){
  productImage=loadImage('images/duck.png');
}

function setup(){
  createCanvas(600,350);
  productExplorer=new ProductExplorer(height/2,height/2,height*0.8, height,height*2/7,width*0.3, width*0.3);
}

function draw(){
  background(220);
  productExplorer.show();
}

function mousePressed(){

};

// function createProductData(){
//   for(var i=0; i<numDataPoints; i++){
//     productData[i]=random();
//   }
// }

function ProductExplorer(x,y,s,x1,y1,w1,h1){
  var aspects=[];
  var sMin=s*0.5;
  var sMax=s*1;
  var numAspects=8;
  yStep1=h1/(numAspects-1);
  for(var i=0; i<numAspects; i++){
    aspects.push(new Aspect(i,x,y,sMin/2,sMax/2,i*TWO_PI/numAspects,x1,y1+i*yStep1,w1));
  }

  this.show=function(){
    aspects.forEach(function(aspect){
      aspect.show();
    });

  };
}

function Aspect(id,x,y,sMin, sMax, aPoint,x1,y1,l1){
  this.currentVal=random();
  var sSpan=sMax-sMin;
  var nv=50;
  var verts=[];
  var verts1=[];
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

  for(var i=0; i<nv; i++){
    var n=noise(nOff+i/10,y1)-0.5;
    verts1.push({x:x1+i*l1/nv, y:y1+sSpan*0.2*n});
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
    stroke(10+id*30,250);
    strokeWeight(sMax*0.03);
    noFill();
    beginShape();
    verts1.forEach(function(v){
      vertex(v.x, v.y);
    });
    endShape();
  }
}
