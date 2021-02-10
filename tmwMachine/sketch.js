var machine;

function setup() {
  createCanvas(500,500);
  colorMode(HSB);
  machine=new Machine(100,100,300,100);
}

function draw() {
  background(0,0,20);
  machine.show();
}

function Machine(x,y,w,h){
  var inW=w*0.33;
  var makeW=w*0.34;
  var outW=w*0.33;
  var ttInMax=100;
  var ttIn=ttInMax;
  var ttMakeMax=100;
  var ttMake=ttMakeMax;
  var ttOutMax=100;
  var ttOut=ttOutMax;
  var inBelt=new InBelt(x+0,y+h*0.8,inW,h*0.2, ttInMax);
  var outBelt=new InBelt(x+inW+makeW,y+h*0.8,outW,h*0.2, ttOutMax);
  var maker=new Maker(x+inW,y+0,makeW,h,ttMakeMax);

  this.show=function(){
    push();
    translate(x,y);
    // var shakeX=random(-1,1);
    // var shakeY=random(-1,1);
    noStroke()
    fill(0,0,50,0.5);
    rect(0,h*0.8,inW,h*0.2,h*0.1);
    rect(inW,0,makeW,h,h*0.1);
    rect(inW+makeW,h*0.8,outW,h*0.2,h*0.1);
    pop();
    inBelt.show();
    inBelt.run(mouseIsPressed);
    outBelt.show();
    outBelt.run(mouseIsPressed);
    maker.show();
    maker.run(mouseIsPressed);
  };

  function InBelt(x,y,w,h,ttlMax){
    var ttl=ttlMax;
    var n=floor(w/h);
    var step=(w-h)/(n-1);
    var a=0;
    var rot=PI/50;
    var shakeX=0,shakeY=0;
    var shake=h*0.2;

    this.run=function(running){
      if(running){
        ttl--;
        a+=rot;
        shakeX=random(-shake,shake);
        shakeY=random(-shake,shake);

      } else {
        shakeX=shakeY=0;
      }
      if(ttl<0){
        ttl=ttlMax;
      }
    }

    this.show=function(){

      push();
      translate(x,y);
      translate(shakeX,shakeY);
      fill(0,0,100,0.5);
      noStroke();
      rect(0,0,w,h,h/2);
      fill(0,0,40,0.5);
      for(var i=0; i<n; i++){
        fill(0,0,40,0.5);
        push();
        translate((i)*step+h/2,h/2);
        rotate(a+i*rot*10);
        ellipse(0,0,h);
        fill(0,0,10,0.5);
        arc(0,0,h,h,0,PI/3);
        arc(0,0,h,h,PI,PI+PI/3);
        ellipse(0,0,h/3);
        pop();
      }
      fill(0,20,50);
      rect(w*(1-ttl/ttlMax)-h,-h*2,h*2,h*2);
      pop();
    };
  }
}

function Maker(x,y,w,h,ttlMax){
  var ttl=ttlMax;
  var shakeX=0, shakeY=0;
  var shake=h*0.02;
  var ch=0,cs=0,cb=0;
  var dial=0;

  this.run=function(running){
    if(running){
      ttl--;
      shakeX=random(-shake,shake);
      shakeY=random(-shake,shake);
      ch=noise(frameCount/10)*30;
      cs=random(60,80);
      cb=random(80,100);
      dial=noise(frameCount/10);
    } else {
      shakeX=shakeY=0;
      ch=0;
      cs=0;
      cb=0;
      dial=0;
    }
    if(ttl<0){
      ttl=ttlMax;
    }
  }

  this.show=function(){

    push();
    translate(x,y);
    translate(shakeX,shakeY);
    fill(0,0,60,0.5);
    noStroke();
    rect(0,0,w,h,h*0.1);
    fill(ch,cs,cb);
    rect(w*0.25,h*0.25,w*0.5,h*0.25);
    push();
    translate(w*0.5,h*0.75);
    fill(0,0,100);
    arc(0,0,h*0.2,h*0.2,PI,TWO_PI);
    rotate(dial*PI+PI);
    stroke(0,0,0);
    line(0,0,h*0.1,0);
    pop();
    // fill(0,0,40,0.5);
    // fill(0,20,50);
    // rect(w*(1-ttl/ttlMax)-h,-h*2,h*2,h*2);
    pop();
  };
}
