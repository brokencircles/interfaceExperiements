var ground;

function setup() {
  createCanvas(500,500);
  colorMode(HSB);
  ground=new Ground(100,100,300,100);
}

function draw() {
  background(0,0,20);
  ground.run(mouseY/height);
  ground.show();
}

function mousePressed(){
  ground.grab();
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
