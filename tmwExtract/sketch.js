var ground;
var grab;

function setup() {
  createCanvas(500,500);
  colorMode(HSB);
  ground=new Ground(100,400,300,100);
  grab=new Grab(250,100,100,300,100);
}

function draw() {
  background(0,0,20);
  ground.run(mouseY/height);
  ground.show();
  grab.run();
  grab.show();
}

function mousePressed(){
  ground.grab();
  grab.grab();
}

function Ground(x,y,w,h){
  var grabbed=0;
  var n=50;
  var aStep=PI/n;
  var rough=h*0.2;
  var r=grabbed*h*0.9;
  var verts=[];
  for(var i=0; i<n+1; i++){
    verts.push({x:cos(PI-i*aStep)*r, y:sin(PI-i*aStep)*r});
  }

  this.grab=function(){
    if(grabbed<1){
      grabbed+=0.1;
    }
    r=grabbed*h*0.9;
    for(var i=0; i<n+1; i++){
      var nr=noise(i*aStep*10+frameCount)-0.5;
      verts[i].x=cos(PI-i*aStep)*(r*0.9+nr*r*0.2);
      verts[i].y=sin(PI-i*aStep)*(r*0.9+nr*r*0.2);
    }
  };

  this.run=function(){
    // grabbed=rel;
    // r=grabbed*h*0.9;
  };

  this.show=function(){
    push();
    translate(x,y);
    fill(0,0,80);
    beginShape();
    vertex(w,0);
    vertex(w,h);
    vertex(0,h);
    vertex(0,0);
    for(var i=0; i<n+1; i++){
      vertex(w/2+verts[i].x, verts[i].y);
      // vertex(w/2+cos(PI-i*aStep)*r, sin(PI-i*aStep)*r);
    }
    endShape(CLOSE);
    pop();
  };
}

function Grab(x,y,s,vDisp,vDispPlus){
  var open=1;
  var down=0;
  var disp=vDisp;
  var nowPos=0;
  var aG=0;
  var aGRot=PI/100;
  var grabbing=false;
  var grabDrive=0;
  var posDrive=0;

  this.grab=function(){
    grabbing=true;
  };

  this.run=function(){
    posDrive=(-cos(aG)*0.5+0.5);
    nowPos=posDrive*vDisp;
    if(grabbing){
      // nowPos=(-cos(aG)*0.5+1)*vDisp;
      if(aG<TWO_PI){
        aG+=aGRot;
      } else {
        aG=0;
        grabbing=false;
      }
    }
    grabDrive=constrain(posDrive-0.75,0,1)/0.25;
    // console.log(nf(grabDrive,1,2));
  };

  this.show=function(){
    push();
    translate(x,y);
    noStroke();
    fill(0,0,100);
    rectMode(CORNER);
    rect(-s/4,-vDisp+nowPos,s/2,vDisp,s/2);
    translate(0,nowPos);
    rotate(-PI*0.3*grabDrive);
    // rect(0,0,s,s);
    arc(0,0,s*2,s*2,0,PI/2);
    rotate(2*PI*0.3*grabDrive);
    // rect(0,0,-s,s);
    arc(0,0,s*2,s*2,PI/2,PI);
    pop();
  }
}
