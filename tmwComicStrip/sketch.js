var f=[];
var border=25;
var fw=100;
var fh=fw*1.5;
var xp=0;
var rf=[];

function setup() {
  createCanvas(500,500);
  colorMode(HSB);
  f[0]=new Frame(xp+border,border,fw,fh,120);
  f[0].assignRenderer(RenderFrame1);
  rf.push(new RoughFrame(xp+border,border,fw,fh,100,20,20));
  xp+=border+fw;
  f[1]=new Frame(xp+border,border,fw,fh,120);
  f[1].assignRenderer(RenderFrame2);
  f[1].assignRenderer(RenderFrame3);
  f[1].assignRenderer(RenderFrame4);
  xp+=border+fw;
  f[2]=new Frame(xp+border,border+fh/2,fw,fh/2,120);
  f[2].assignRenderer(RenderFrame5);
  // xp+=border+fw;
  f[3]=new Frame(xp+border,border,fw,fh/2,120);
  f[3].assignRenderer(RenderFrame10);
  xp+=border*2+fw;
}

function draw() {
  background(0,0,20);
  fill(0,0,90);
  noStroke();
  rectMode(CORNER);
  rect(0,0,xp,border*2+fh);
  for(var i=0; i<3; i++){
    f[i].run();
  }
  f[3].run(mouseX/width);

  // var res=f[0].run();
  // if(res){
  //   var fi=f[0].get();
  //   image(fi,50,50);
  // } else {
  //   f[0].reset();
  // }
}

function mousePressed(){

}

function RoughFrame(x,y,w,h,n,outer,inner){
  var oVerts=[];
  var iVerts=[];
  var nv=floor(h/(w+h)*n);
  var nh=n-nv;

}

function Frame(x,y,w,h,ttlMax){
  var g=createGraphics(w,h);
  var prevSnap;
  // var renderer=null;
  var renderers=[];
  var currentRenderNum=-1;
  var thisRenderer=null;
  var prevRenderer=null;
  var transitionMax=1;
  var transitionNow=0;

  this.assignRenderer=function(renderFunc){
    renderers.push(new renderFunc(w,h,ttlMax));
    currentRenderNum=0;
    thisRenderer=renderers[currentRenderNum];
  };

  this.reset=function(){
    currentRenderNum=(currentRenderNum+1)%renderers.length;
    prevRenderer=thisRenderer;
    prevSnap=g.get();
    thisRenderer=renderers[currentRenderNum];
    thisRenderer.reset();
    if(renderers.length>1){
      transitionNow=transitionMax;
    }
  };

  this.run=function(val){
    if(transitionNow>0.001){
      transitionNow+=(0-transitionNow)/10;
    } else {
      prevRenderer=null;
    }
    if(thisRenderer!==null){
      // thisRenderer.render(g);
      if(thisRenderer.run(val)){
        thisRenderer.render(g);
        var fi=g.get();
        image(fi,x+w-w*(1-transitionNow),y,w*(1-transitionNow),h);
      } else {
        this.reset();
      }
    }
    if(prevRenderer!==null){
      // thisRenderer.render(g);
      image(prevSnap,x,y,w*(transitionNow),h);
    }
  };

  this.get=function(){
    return g.get();
  };
}

function RenderFrame1(w,h,ttlMax){
  var ttl=ttlMax;
  var x=w/2;
  var y=h/2;
  var r=w/2;

  this.reset=function(){
    ttl=ttlMax;
  };

  this.run=function(){
    ttl--;
    return ttl>0;
  };

  this.render=function(g){
    g.colorMode(HSB);
    g.background(240,60,60);
    r=w*0.71*ttl/ttlMax;
    g.fill(30,70,70);
    g.noStroke();
    g.ellipse(x,y,r*2);
  };
}

function RenderFrame2(w,h,ttlMax){
  var ttl=ttlMax;
  var x=w/2;
  var y=h/2;
  var a=TWO_PI;
  var s=w*0.8;

  this.reset=function(){
    ttl=ttlMax;
  };

  this.run=function(){
    ttl--;
    return ttl>0;
  };

  this.render=function(g){
    g.colorMode(HSB);
    g.background(60,60,60);
    a=TWO_PI*ttl/ttlMax;
    g.push();
    g.translate(x,y);
    g.rotate(a);
    g.fill(320,70,70);
    g.noStroke();
    g.rectMode(CENTER);
    g.rect(0,0,s,s,s*0.1);
    g.pop();
  };
}

function RenderFrame3(w,h,ttlMax){
  var ttl=ttlMax;
  var x=w/2;
  var y=h/2;
  var a=1;

  this.reset=function(){
    ttl=ttlMax;
  };

  this.run=function(){
    ttl--;
    return ttl>0;
  };

  this.render=function(g){
    g.colorMode(HSB);
    g.background(0,40,60);
    a=ttl/ttlMax;
    g.push();
    // g.translate(x,y);
    // g.rotate(a);
    g.fill(180,70,70);
    g.noStroke();
    g.rectMode(CORNER);
    g.rect(0,0,w,h*0.5*ttl/ttlMax);
    g.rect(0,h-h*0.5*ttl/ttlMax,w,h*0.5*ttl/ttlMax);
    g.pop();
  };
}

function RenderFrame4(w,h,ttlMax){
  var ttl=ttlMax;
  var x=w/2;
  var y=h/2;
  var a=TWO_PI;
  var s=w*0.8;

  this.reset=function(){
    ttl=ttlMax;
  };

  this.run=function(){
    ttl--;
    return ttl>0;
  };

  this.render=function(g){
    g.colorMode(HSB);
    g.background(280,60,60);
    a=TWO_PI*ttl/ttlMax;
    g.push();
    g.translate(x,y);
    // g.rotate(a);
    g.fill(160,70,70);
    g.noStroke();
    g.rectMode(CENTER);
    g.rect(0,0,cos(a)*s,sin(a)*s);
    g.pop();
  };
}

function RenderFrame5(w,h,ttlMax){
  var ttl=ttlMax;
  var x=w/2;
  var y=h/2;
  var r=w;

  this.reset=function(){
    ttl=ttlMax;
  };

  this.run=function(){
    ttl--;
    return ttl>0;
  };

  this.render=function(g){
    g.colorMode(HSB);
    g.background(120,60,60);
    r=w*0.71*(1-ttl/ttlMax);
    g.fill(220,70,70);
    g.noStroke();
    g.ellipse(x,y,r*2);
  };
}

function RenderFrame10(w,h,ttlMax){
  var ttl=ttlMax;
  var x=w/2;
  var y=h/2;
  var r=w;
  var puffs=[];
  var maxPuffs=100;

  this.reset=function(){
    ttl=ttlMax;
  };

  this.run=function(val){
    if(puffs.length<maxPuffs && random()<val){
      puffs.push(new Puff(random(w), random(0.3,1)*h,w*0.5,random(h*0.2),random(30,200)));
    }
    // ttl--;
    return true;
  };

  this.render=function(g){
    g.colorMode(HSB);
    g.background(0,0,20);
    for(var i=puffs.length-1; i>=0; i--){
      if(puffs[i].run()){
        puffs[i].show(g);
      } else {
        puffs.splice(i,1);
      }
    }
  };

  function Puff(x,y,maxR,restH,ttlMax){
    var ttl=ttlMax;
    var r=random(0.5,1)*maxR;

    this.run=function(){
      y+=(restH-y)/50;
      ttl--;
      return ttl>0;
    };

    this.show=function(g){
      g.fill(0,0,100,0.5*ttl/ttlMax);
      g.noStroke(0);
      g.ellipse(x,y,2*r*0.2+r*0.8*(1-ttl/ttlMax));
    };
  }
}
