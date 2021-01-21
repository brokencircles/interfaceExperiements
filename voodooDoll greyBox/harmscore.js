function HarmScore(x,y,w){
  var s=0.5*0.5;
  var positions=[
    {x:0.25, y:0.25},
    {x:0.75, y:0.25},
    {x:0.25, y:0.75},
    {x:0.75, y:0.75},
    {x:0.5, y:0.5}
  ]
  var targetScores=[0,0,0,0,0];
  var currentScores=[0,0,0,0,0];
  var changeMax=20;

  this.update=function(newScores){
    for(var i=0; i<5; i++){
      targetScores[i]=newScores[i];
    }
  };

  this.run=function(){
    for(var i=0; i<5; i++){
      currentScores[i]+=(targetScores[i]-currentScores[i])/changeMax;
    }
  }

  this.show=function(){
    push();
    translate(x,y);
    fill(120);
    noStroke();
    rect(0,0,w,w,w*0.1);
    for(var i=0; i<5; i++){
      push();
      translate(positions[i].x*w, positions[i].y*w);
      fill(80);
      ellipse(0,0,(s+0.1)*w);
      fill(255,255-200*currentScores[i],255-200*currentScores[i]);
      noStroke();
      ellipse(0,0,w*(0.05+s)*currentScores[i]);
      pop();
    }
    pop();
    push();
    translate(x+w/2,y-w*0.1);
    textAlign(CENTER,CENTER);
    fill(255);
    noStroke();
    // stroke(255,200);
    // strokeWeight(1);
    textSize(w*0.125);
    text('harms',0,0);
    pop();
  };
}
