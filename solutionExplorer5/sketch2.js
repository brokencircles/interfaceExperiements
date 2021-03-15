var factoids=[];
var s=100;

function setup(){
  createCanvas(500,500);
  factoids.push(new Factoid(250,250,s,0.5,0, "my small fact"));
  factoids.push(new Factoid(250,250,s,0.5,0.3, "my other fact"));
  factoids.push(new Factoid(250,250,s,0.5,0.5, "not true at all"));
}

function draw(){
  background(220);
  stroke(40);
  noFill();
  ellipse(250,250,s);
  ellipse(250,250,s*2);
  factoids.forEach(function(factoid){
    factoid.run(mouseX>width/2);
    factoid.show();
  })
}

function Factoid(x,y,s,relR,a,fact){
  var r=s/2+relR*s/2;
  var unfurl=0;
  var ufRate=0.05;
  var pointsPerSeg=50;
  var vertsLine=[];
  var nxOff=random(10);
  var drift=s*0.1;
  var l=s*1.5;
  var aDriftRange=0.4;
  var aDrift=0;
  var aDriftRate=random(30,100);

  for(var i=0; i<pointsPerSeg; i++){
    var n=noise(nxOff+i/10,y)-0.5;
    vertsLine.push({x:i*l/pointsPerSeg, y:0+drift*n});
  }

  this.run=function(hover){
    if(unfurl>0){
      aDrift=(noise(nxOff+0-frameCount/50)-0.5)*aDriftRange;
      for(var i=0; i<pointsPerSeg; i++){
        var n=noise(nxOff+i/10-frameCount/50,y)-0.5;
        vertsLine[i]={x:i*l/pointsPerSeg, y:0+drift*n};
      }
    }
    if(hover){
      if(unfurl<1){
        unfurl+=ufRate;
      } else {
        unfurl=1;
      }
    } else {
      if(unfurl>0){
        unfurl-=ufRate*2;
      } else {
        unfurl=0;
      }
    }
  };

  this.show=function(){
    push();
    translate(x,y);
    rotate(a);
    translate(r,0);
    fill(128);
    noStroke();
    ellipse(0,0,s*0.2);
    if(unfurl>0){
      stroke(0,180);
      noFill();
      strokeWeight(s*0.2);
      strokeCap(SQUARE);
      rotate(-a-PI/20+aDrift);
      // line(0,0,l*unfurl,0);
      scale(unfurl,1);
      beginShape();
      vertsLine.forEach(function(v){
        vertex(v.x, v.y);
      });
      endShape();
      noStroke();
      fill(255);
      textFont("Homemade Apple");
      textSize(s*0.1);
      textAlign(LEFT,CENTER);
      text(fact,s*0.2,0);
    }
    pop();
  };
}
