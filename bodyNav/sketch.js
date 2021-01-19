var body;

function setup() {
  createCanvas(500,500);
  body=new Body(250,250,150,5);
}

function draw() {
  background(40);
  body.run(mouseX, mouseY);
}


function Body(x,y,r,n){
  var segs=[];
  this.selected=-1;

  for(var i=0; i<n; i++){
    segs.push(new Seg(x,y,r,-PI+i*TWO_PI/n,-PI+(i+1)*TWO_PI/n));
  }

  this.run=function(mx,my){
    var sel=-1;
    segs.forEach(function(seg,i){
      if(seg.run(mx,my)){
        sel=i;
      }
      seg.show();
    });
    this.selected=sel;
    return sel;
  }

  function Seg(x,y,r,as,ae){
    var hover=false;
    var scl=1;
    var maxScl=1.2;

    this.run=function(mx,my){
      var a=atan2(my-y, mx-x);
      var d=dist(x,y,mx,my);
      hover=d <r && a>as && a<ae;
      if(hover){
        scl+=(maxScl-scl)/20;
      } else {
        scl+=(1-scl)/20;
      }
      return hover;
    };

    this.show=function(){
      push();
      translate(x,y);
      scale(scl);
      fill(hover?200:120);
      noStroke();
      arc(0,0,r*2,r*2,as,ae);
      pop();
    };
  }
}
