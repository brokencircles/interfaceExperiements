
function setup() {
  createCanvas(500,500);
  colorMode(HSB);
}

function draw() {
  background(0,0,20);
  circVis(200,200,150,constrain(map(mouseX,0,width,-1,1),-1,1),1,mouseX, mouseY);
}

function circVis(x,y,r,c,scl,mx,my){
  var hover=dist(mx,my,x,y)<r*scl;

  push();
  translate(x,y);
  noStroke();
  fill(0,0,hover?65:35);
  ellipse(0,0,r*2*scl);
  strokeWeight(r*0.2*scl);
  noFill();
  // console.log(c+1);
  // stroke(0+140*(c+1)*0.5,70,80)
  if(abs(c)<0.0001){
  } else if(c>0){
    // stroke(140,70,80);
    stroke(60+70*(c),70,80)
    // line(0,h*0.4,0,-h*0.8*c);
    arc(0,0,r*2*scl,r*2*scl,0,(c)*TWO_PI);
    push();
    rotate(TWO_PI*c);
    translate(r*scl,0);
    line(0,0,-r*0.2*scl,-r*0.2*scl);
    line(0,0,r*0.2*scl,-r*0.2*scl);
    pop();
  } else {
    stroke(0,70,80);
    line(r*scl,0,r*scl+r*2*scl*c,0);
    // arc(0,0,h*0.8,h*0.8,TWO_PI*c,TWO_PI);
    push();
    // rotate(TWO_PI*c);
    translate(r*scl+r*2*scl*c,0);
    line(0,-r*0.2*scl,0,r*0.2*scl);
    // line(0,0,-h*0.1,h*0.1);
    pop();
  }
  noStroke();
  fill(0,0,100);
  textAlign(CENTER,CENTER);
  textSize(r*0.3*scl);
  text(nf(c*100,1,1)+'%',0,0);
  pop();
}
