function SlidePanel(x,y,w,h,n){
  var sliders=[];
  var vStep=h/(n);
  var vHeight=vStep*0.75;
  var hMargin=w*0.05;
  var hLength=w*0.9;
  var vals=[0,0,0];

  for(var i=0; i<n; i++){
    sliders.push(new Slider(x+hMargin,y+(i+0.5)*vStep-vHeight/2,hLength, vHeight,5));
  }

  this.get=function(){
    var changed=false;

    for(var i=0; i<n; i++){
      if(sliders[i].val !==vals[i]){
        changed=true;
        vals[i]=sliders[i].val;
      }
    }
    var res=changed? vals: false;
    return res;
  }

  this.run=function(mx,my){
    fill(80);
    noStroke();
    rect(x,y,w,h,h*0.1);
    sliders.forEach(function(slider){
      slider.run(mx, my);
      slider.show();
    });
    push();
    translate(x+w/2,y-h*0.1);
    textAlign(CENTER,CENTER);
    fill(255);
    noStroke();
    // stroke(255,200);
    // strokeWeight(1);
    textSize(w*0.125);
    text('preferences',0,0);
    pop();
  };
}

function Slider(x,y,w,h,n){
  this.val=0.5;
  var smoothVal=0;
  var effVal=0;
  var effPos={x:0,y:0};
  var dragging=false;
  var knobR=h*0.375;
  var hover=false;
  var step=1/(n-1);
  var snap=1;

  this.run=function(mx,my){
    hover=dist(mx,my,effPos.x, effPos.y)<knobR;
    effPos.x=x+w*0.1+this.val*w*0.8;
    effPos.y=y+h/2;
    if(mouseIsPressed){
      if(hover){
        dragging=true;
      }
    } else {
      dragging=false;
    }
    if(dragging){
      effPos.x=constrain(mx,x+w*0.1,x+w*0.9);
      this.val=(effPos.x-(x+w*0.1))/(w*0.8);
    }
    snap=2*abs(step/2-this.val%step)*(n-1);
    this.val=round(this.val*(n-1))/(n-1);
    // console.log(snap);
  };

  this.show=function(){
    fill(120);
    noStroke();
    rect(x,y,w,h,h*0.25);
    stroke(40);
    strokeCap(ROUND);
    strokeWeight(h*0.15);
    line(x+w*0.1,y+h/2,x+w*0.9,y+h/2);
    fill(40);
    noStroke();
    for(var i=0; i<n; i++){
      ellipse(x+w*0.1+w*0.8*i*step,y+h/2,h*0.4);
    }
    fill(200);
    if(hover){
      fill(235,135,0);
    }
    noStroke();
    ellipse(effPos.x,effPos.y,knobR*(1.7+0.3*snap));
  }
}
