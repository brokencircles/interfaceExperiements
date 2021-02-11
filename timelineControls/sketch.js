var track0, track1, track2;

function setup() {
  createCanvas(500,500);
  colorMode(HSB);
  track0=new Track(10,60);
  track0.assignTrackData([0,0,1,0,0,0.5,1,1,0.5,0]);
  track1=new Track(10,60);
  track1.assignTrackData([0,1,0,1,0,1,0,1,0,1]);
  track2=new Track(10,60);
  track2.assignTrackData([1,1,0,1,1,0,0,0,0,1]);
}

function draw() {
  background(0,0,20);
  track0.tick();
  track1.tick();
  track2.tick();
  var v0=track0.getVal();
  var v1=track1.getVal();
  var v2=track2.getVal();
  stroke(0,0,100);
  noFill();
  rectMode(CENTER);
  rect(v0*width,200+100*v2,100,100);
  translate(v0*width,200+100*v2+50);
  rotate(v1*TWO_PI);
  fill(0,0,100);
  noStroke();
  arc(0,0,100,100,0,PI*1.5);
}

function mousePressed(){
}

function Track(steps,stepLength){
  var track=[];
  var trackLength=steps*stepLength;
  var currentStep=0;
  var ready=false;

  this.assignTrackData=function(data){
    for(var i=0; i<steps; i++){
      track[i]=data[i%data.length];
    }
    ready=true;
  };

  this.tick=function(){
    currentStep=(currentStep+1)%trackLength;
  };

  this.getVal=function(){
    if(ready){
      var prev=floor(currentStep/stepLength);
      var next=(prev==steps-1?prev:prev+1);
      var lRel=(currentStep%stepLength)/stepLength;
      var v=lerp(track[prev],track[next],lRel);
      // console.log(v)
      return v;
    }
  };
}
