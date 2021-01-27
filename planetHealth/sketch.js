var piles=[];
var holes=[];
var hole2;
var pile2;
var emmisions=[];

function setup() {
  createCanvas(500,500);
  // for(var i=0; i<6; i++){
  //   piles.push(new Pile(250,250,i*TWO_PI/6,100,10,50));
  //   holes.push(new Hole(250,250,(i+0.5)*TWO_PI/6,100,10,50));
  // }
  // emmisions.push(new Emmision(250,250,0,100,150,2,50,PI/2));
  hole2=new Hole2(250,250,0,100,PI*0.1,30,20);//ox,oy,a,orad,aMax,maxD,maxLevels
  pile2=new Pile2(250,250,-PI/4,100,PI*0.2,30,20);
}

function draw() {
  background(40);
  fill(0,200,50);
  noStroke();
  ellipse(250,250,200);
  piles.forEach(function(pile){
    pile.show();
    if(random(100)<1){
      pile.grow(10);
    }
    pile.run();
  });
  holes.forEach(function(hole){
    hole.show();
    if(random(100)<1){
      hole.grow(10);
    }
    hole.run();
  });
  emmisions.forEach(function(emmision){
    emmision.show();
    emmision.run();
  });
  if(random(100)<5){
    emmisions.push(new Emmision(250,250,0,100,200,2,50,PI*0.2));
  }
  hole2.show();
  if(random(100)<1){
    hole2.dig();
  }
  pile2.show();
  if(random(100)<1){
    pile2.grow();
  }
}

function Emmision(ox,oy,a,rO,rMax,thMin,thMax,lenMax){
  var r=rO
  var avMax=random(1,4)*PI/800;
  var av=0.01;
  var th=thMin;
  var len=0.01;
  var ttlMax=1000;
  var ease=ttlMax/2;
  var ttl=ttlMax;
  var ttdMax=200;
  var ttd=ttdMax;

  this.run=function(){
    r+=(rMax-r)/(ease/2);
    av+=(avMax-av)/ease;
    len+=(lenMax-len)/(ease*2);
    th+=(thMax-th)/(ease*0.25);
    a+=av;
    if(ttl>0){
      ttl--;
    } else {
      ttd--;
    }

    return ttd>0;
  };

  this.show=function(){
    push();
    translate(ox,oy);
    rotate(a);
    stroke(200,100*ttd/ttdMax);
    strokeWeight(th);
    strokeCap(ROUND);
    noFill();
    arc(0,0,r*2,r*2,0,len);
    pop();
  };
}

function Hole2(ox,oy,a,orad,aMax,maxDepth,maxLevels){
  var levels=[];
  var lTh=maxDepth/maxLevels;
  var depth=lTh*0.5;

  this.dig=function(){
    if(levels.length<maxDepth){
      levels.push(new Level(ox,oy,a,orad-depth,aMax*0.5+0.5*(1-depth/maxDepth),lTh));
      depth++;
    }
    levels.forEach(function(lev){
      lev.dig();
    });
  };

  this.show=function(){
    levels.forEach(function(lev){
      lev.show();
    });
  };

  function Level(ox,oy,a,r,aMax,th){
    var aSpread=aMax*0.1;

    this.dig=function(){
      aSpread+=(aMax-aSpread)/100;
    };

    this.show=function(){
      push();
      translate(ox,oy);
      rotate(a);
      strokeWeight(th);
      stroke(40);
      strokeCap(SQUARE);
      noFill();
      arc(0,0,r*2,r*2,a-aSpread/2,a+aSpread/2);
      pop();
    };
  }
}

function Pile2(ox,oy,a,orad,aMax,maxHeight,maxLevels){
  var levels=[];
  var lTh=maxHeight/maxLevels;
  var pHeight=lTh*0.5;

  this.grow=function(){
    if(levels.length<maxHeight){
      levels.push(new Level(ox,oy,a,orad+pHeight,aMax*0.5+0.5*(1-pHeight/maxHeight),lTh));
      pHeight++;
    }
    levels.forEach(function(lev){
      lev.grow();
    });
  };

  this.show=function(){
    levels.forEach(function(lev){
      lev.show();
    });
  };

  function Level(ox,oy,a,r,aMax,th){
    var aSpread=aMax*0.1;

    this.grow=function(){
      aSpread+=(aMax-aSpread)/100;
    };

    this.show=function(){
      push();
      translate(ox,oy);
      rotate(a);
      strokeWeight(th);
      stroke(235,135,0);
      strokeCap(SQUARE);
      noFill();
      arc(0,0,r*2,r*2,a-aSpread/2,a+aSpread/2);
      pop();
    };
  }
}

function Hole(ox,oy,a,orad,r,n){
  var verts=[];
  var mox=ox+cos(a*orad);
  var moy=oy+sin(a*orad);

  for(var i=0; i<n; i++){
    var aRender=i*PI/n;
    var xOff=(i-n/2)/(n/2);
    var xRel=abs(xOff);
    // console.log(xRel);
    var yRel=1-xRel;
    // var aRel=0;
    // // var r=5;
    // var x=cos(aRender)*r;
    // var y=sin(aRender)*r*(0.5+0.5*yRel);
    var x=xOff*r;
    // console.log(x);
    var y=0;
    verts.push({
      x:x,
      y:y,
      tx:x,
      ty:y,
      // aRel:0,
      // r:r,
      xOff:xOff,
      xRel:xRel,
      yRel:yRel,
      // aRel:aRel
    });

    this.show=function(){
      push();
      translate(ox,oy);
      fill(200,0,0);
      noStroke();
      ellipse(0,0,15);
      rotate(a);
      translate(0,orad);
      stroke(200);
      fill(200,100);
      beginShape();
      verts.forEach(function(v){
        vertex(v.x, v.y);
      });
      endShape();
      pop();
    };

    this.grow=function(grow){
      verts.forEach(function(v,i){
        var n=noise(mox+v.x/10,moy+v.y/1+frameCount/100);
        v.tx+=grow*0.2*v.xOff;
        v.ty-=grow*1*n*v.yRel;
      });
    }
    this.run=function(){
      verts.forEach(function(v,i){
        v.x+=(v.tx-v.x)/10;
        v.y+=(v.ty-v.y)/10;
      });
    };
  }
}

function Pile(ox,oy,a,orad,r,n){
  var verts=[];
  var mox=ox+cos(a*orad);
  var moy=oy+sin(a*orad);

  for(var i=0; i<n; i++){
    var aRender=i*PI/n;
    var xOff=(i-n/2)/(n/2);
    var xRel=abs(xOff);
    // console.log(xRel);
    var yRel=1-xRel;
    // var aRel=0;
    // // var r=5;
    // var x=cos(aRender)*r;
    // var y=sin(aRender)*r*(0.5+0.5*yRel);
    var x=xOff*r;
    // console.log(x);
    var y=0;
    verts.push({
      x:x,
      y:y,
      tx:x,
      ty:y,
      // aRel:0,
      // r:r,
      xOff:xOff,
      xRel:xRel,
      yRel:yRel,
      // aRel:aRel
    });

    this.show=function(){
      push();
      translate(ox,oy);
      fill(200,0,0);
      noStroke();
      ellipse(0,0,15);
      rotate(a);
      translate(0,orad);
      stroke(200);
      fill(200,100);
      beginShape();
      verts.forEach(function(v){
        vertex(v.x, v.y);
      });
      endShape(CLOSE);
      pop();
    };

    this.grow=function(grow){
      verts.forEach(function(v,i){
        var n=noise(mox+v.x/10,moy+v.y/1+frameCount/100);
        v.tx+=grow*0.2*v.xOff;
        v.ty+=grow*1*n*v.yRel;
      });
    }
    this.run=function(){
      verts.forEach(function(v,i){
        v.x+=(v.tx-v.x)/10;
        v.y+=(v.ty-v.y)/10;
      });
    };
  }
}
