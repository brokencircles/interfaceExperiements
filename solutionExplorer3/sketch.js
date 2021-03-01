var productImage;
var productExplorer;

function preload(){
  productImage=loadImage('images/duck.png');
}

function setup(){
  createCanvas(600,350);
  productExplorer=new ProductExplorer(height/2,height/2,height*0.8, height,height*2/7,width*0.3, width*0.3);
  productExplorer.assignProduct(null,productImage);
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

function ProductExplorer(x0,y0,s0,x1,y1,w1,h1){
  var vrs=[];
  var numVals=8;
  ox=x0;
  oy=y0;
  colorMode(HSB);
  var aStep=TWO_PI/numVals;
  for(var i=0; i<numVals; i++){
    vrs.push(new ValueRing(i, i/numVals,ox, oy,s0/2,(0.5+i)*aStep,aStep,"testing"));
  }

  var productImage=null;

  this.assignProduct=function(productData,img){
    productImage=img;
  }

  this.show=function(){
    colorMode(HSB);
    background(0,0,90);
    blendMode(BLEND);
    var md=dist(mouseX, mouseY, ox,oy);
    var ma=atan2(mouseY-oy, mouseX-ox);
    ma+=PI/2;
    if(ma<0){
      ma=TWO_PI+ma;
    }
    vrs.forEach(function(vr){
      vr.run(mouseX,mouseY,ma,md);
      vr.showFixtures();
    });
    blendMode(MULTIPLY);
    vrs.forEach(function(vr){
      vr.showVals();
    });
    blendMode(BLEND);
    colorMode(RGB);
    if(productImage){
      imageMode(CENTER);
      image(productImage,x0,y0,s0/3,s0/3);
    }
  };
}

function ValueRing(id,rel,x,y,s,a,aStep,label){
  var val=random();
  var r=s/2;
  var c=r*0.55;
  var er=r+r*val
  var mr=r*2;
  var cHue=rel*360;
  var nxOff=random(10);
  var nyOff=random(10);
  var verts=[];
  var iVerts=[];
  var pointsPerSeg=50;
  var drift=s*0.1;
  var noiseStep=width/50;
  var sa=a-aStep*0.45;
  var ea=a+aStep*0.45;
  var hover=false;

  for(var i=0; i<pointsPerSeg; i++){
    var px=bezierPoint(r,r,c,0,i/pointsPerSeg);
    var py=bezierPoint(0,c,r,r,i/pointsPerSeg);
    verts.push({x:px, y:py});
  }
  for(var i=0; i<pointsPerSeg; i++){
    var px=bezierPoint(0,-c,-r,-r,i/pointsPerSeg);
    var py=bezierPoint(r,r,c,0,i/pointsPerSeg);
    verts.push({x:px, y:py});
  }
  for(var i=0; i<pointsPerSeg; i++){
    var px=bezierPoint(-r,-r,-c,0,i/pointsPerSeg);
    var py=bezierPoint(0,-c,-er,-er,i/pointsPerSeg);
    verts.push({x:px, y:py});
  }
  for(var i=0; i<pointsPerSeg; i++){
    var px=bezierPoint(0,c,r,r,i/pointsPerSeg);
    var py=bezierPoint(-er,-er,-c,0,i/pointsPerSeg);
    verts.push({x:px, y:py});
  }
  verts.forEach(function(v){
    var nx=noise(nxOff+v.x/(10*noiseStep),v.y/(10*noiseStep))-0.5;
    var ny=noise(nyOff+v.x/(8*noiseStep),v.y/(7*noiseStep))-0.5;
    v.x+=nx*drift;
    v.y+=ny*drift;
  });
  var aStep=TWO_PI/pointsPerSeg;
  var ir=r*0.9;
  for(var i=0; i<pointsPerSeg; i++){
    var px=x+cos(i*aStep)*ir;
    var py=y+sin(i*aStep)*ir;
    var n=noise(nxOff+px/noiseStep, nyOff+py/noiseStep-0.5);
    px=cos(TWO_PI-i*aStep)*ir*(0.9+0.2*n);
    py=sin(TWO_PI-i*aStep)*ir*(0.9+0.2*n);
    iVerts.push({x:px, y:py});
  }

  this.run=function(mx,my,ma,md){
    var isInR=md>r && md<mr;
    var isInA=(ma>sa && ma<ea);
    hover=isInA && isInR;
  };

  this.showFixtures=function(){
    push();
    translate(x,y);
    rotate(a);
    stroke(cHue,40,60);
    strokeWeight(s*(hover?0.02:0.005));
    noFill();
    beginShape();
    vertex(r,0);
    bezierVertex(r,c, c,r, 0,r);
    bezierVertex(-c,r ,-r,c, -r,0);
    bezierVertex(-r,-c, -c,-mr, 0,-mr);
    bezierVertex(c,-mr, r,-c, r,0);
    endShape();
    noStroke();
    fill(0,0,0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(s*0.1);
    text(nf(val*5,1,1),0,-r*1.5);
    textSize(s*0.08);
    text(label,0,-r*1.8);
    pop();
  };

  this.showVals=function(){
    // val=sin(a+frameCount*PI/100)*0.5+0.5;
    // er=r+r*val;
    push();
    translate(x,y);
    rotate(a);
    // stroke(cHue,40,60);
    // strokeWeight(1);
    // noFill();
    // beginShape();
    // vertex(r,0);
    // bezierVertex(r,c, c,r, 0,r);
    // bezierVertex(-c,r ,-r,c, -r,0);
    // bezierVertex(-r,-c, -c,-mr, 0,-mr);
    // bezierVertex(c,-mr, r,-c, r,0);
    // endShape();
    noStroke();
    // strokeWeight(s*0.05);
    fill(cHue,70,hover?100:80,hover?1:0.3);

    beginShape();
    verts.forEach(function(v){
      vertex(v.x, v.y);
    });
    beginContour();
    iVerts.forEach(function(iv){
      vertex(iv.x, iv.y);
    });
    endContour();
    endShape();

    pop();
  };

}
