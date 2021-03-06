function Body(x,y,r,n){
  var segs=[];
  this.highlighted=-1;
  this.selected=0;
  var prevSel=0;

  for(var i=0; i<n; i++){
    segs.push(new Seg(x,y,r,-PI+i*TWO_PI/n,-PI+(i+1)*TWO_PI/n,i));
  }
  segs[0].selected=true;

  this.run=function(mx,my){
    var sel=-1;
    segs.forEach(function(seg,i){
      if(seg.run(mx,my)){
        sel=i;
      }
      seg.show();
    });
    prevSel=this.selected;
    this.highlighted=sel;
    this.selected=sel;
    var res=false;
    if(this.selected!=prevSel){
      res=this.selected;
    }
    return res;
  }

  function Seg(x,y,r,as,ae,index){
    var hover=false;
    this.selected=false;
    var scl=1;
    var maxScl=1.2;
    var cHue=30+i*90;

    this.run=function(mx,my){
      var a=atan2(my-y, mx-x);
      var d=dist(x,y,mx,my);
      hover=d <r && a>as && a<ae;
      if(mouseIsPressed){
        if(hover){
          this.selected=true;
        } else {
          if(d<r){
            this.selected=false;
          }
        }
      }
      if(this.selected){
        scl+=(maxScl-scl)/20;
      } else {
        scl+=(1-scl)/20;
      }
      return this.selected;
    };

    this.show=function(){
      push();
      translate(x,y);
      scale(scl);
      colorMode(HSB);
      fill(0,0,50);
      if(hover){
        fill(0,0,80);
      }
      // fill(hover?200:120);
      if(this.selected){
        fill(cHue,70,70);
      }
      noStroke();
      arc(0,0,r*2,r*2,as,ae);
      colorMode(RGB);
      pop();
      push();
      translate(x,y);
      textAlign(CENTER,CENTER);
      fill(0);
      stroke(255);
      strokeWeight(1);
      textSize(r*0.25);
      text('body',0,0);
      pop();
    };
  }
}
