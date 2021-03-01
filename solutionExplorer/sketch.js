const SELECTOR=0;
const SOLUTION=1;
const ASPECT=2;
const FEATURE=3;

const FULL=0;
const PARTIAL=1;
const HIDDEN=2;

var space;

var context=SELECTOR;
var selector, solution;
var loadedData;
var explorer;

function preload(){
  loadedData=loadJSON('data.json');
}

function setup() {
  createCanvas(500,500);
  // console.log(loadedData);
  // colorMode(HSB);
  // space={
  //   x:0,
  //   y:0,
  //   w:width,
  //   h:height,
  //   xFull:width/2,
  //   yFull:height/2,
  //   sclFull:1,
  //   aFull:1,
  //   xPartial:width*0.05,
  //   yPartial:height*0.95,
  //   aPartial:0.1,
  //   sclPartial:0.2,
  // };
  // selector=new Selector(space,200,3);
  // solution=new Solution(space,200,3);
  explorer=new Explorer(width/2, height/2, height*0.1);
}

function draw() {
  // background(0,0,20);
  // if(context==SELECTOR){
  //   selector.show(FULL);
  // } else {
  //   selector.show(PARTIAL);
  // }
  //
  // if(context==SELECTOR){
  //   solution.show(PARTIAL);
  // } else {
  //   solution.show(FULL);
  // }
  background(40);
  explorer.run();
  explorer.show();
}

function mousePressed(){
  // if(context==SELECTOR){
  //   context=SOLUTION;
  // } else {
  //   context=SELECTOR;
  // }
  // console.log(context);
  explorer.click();
}

function transform(scalar,origin,scl){
  // console.log(scalar,(scalar-width/2)/scl+width/2);
  return (scalar-origin)*scl+origin;
}

function Explorer(x,y,s){
  var n=3;
  var offsetA=-PI*0.25;
  var origin=createVector(x,y);
  var currentOffset=createVector(0,0);
  var targetOffset=createVector(0,0);
  var currentA=0;
  var targetA=0;
  var rot=0;//PI/500;
  var currentScale=1;
  var targetScale=1;
  var productOptions=[];
  var aStep=TWO_PI/n;
  var hover=false;

  for(var i=0; i<n; i++){
    productOptions.push(new ExploreProduct(i,p5.Vector.add(origin,currentOffset), i*aStep,s*2,s*1,8));
  }

  this.click=function(){
    var selected=null;
    if(hover){
      targetOffset=createVector(0,0);
      targetA=0;
      targetScale=1;
    } else {
      productOptions.forEach(function(option,i){
        option.click();
        if(option.hover){
          selected=option;
        }
      });

      if(selected){
        targetOffset=createVector(cos(offsetA)*selected.l, sin(offsetA)*selected.l).mult(-1);
        targetA=-selected.a;
        targetScale=4;
        if(selected.aspectHover){
          targetScale=5;
        }
        // console.log(selected.a,currentA)
      }
    }
  }

  this.run=function(){
    var diffScl=targetScale-currentScale;
    if(abs(diffScl)>0.0001){
      currentScale+=diffScl/20;
    }
    var diff=p5.Vector.sub(targetOffset,currentOffset);
    // console.log(diff.mag());
    if(diff.mag()>0.01){
      currentOffset.add(diff.mult(0.05));
    }
    var diffA=targetA-currentA;
    // console.log(diffA);
    if(abs(diffA)>0.00001){
      currentA+=diffA/20;//=(currentA+TWO_PI+diffA/20)%TWO_PI;
    }
    hover=dist(mouseX, mouseY,transform(origin.x+currentOffset.x,width/2,currentScale),transform(origin.y+currentOffset.y,height/2,currentScale))<s*currentScale/2;
  };

  this.show=function(){
    push();
    translate(width/2, height/2);
    scale(currentScale);
    translate(-width/2, -height/2);
    rectMode(CORNER);
    stroke(255,0,0);
    noFill();
    rect(0,0,width,height);


    var hovered=false;
    productOptions.forEach(function(option,i){
      option.run(currentA+offsetA, currentScale);
      option.show(currentA+offsetA, currentScale);
      if(option.hover){
        hovered=true;
      }
      option.origin=p5.Vector.add(origin,currentOffset);
      // option.a=i*aStep;
      // option.l=s*2;
    });
    if(!hovered){
      currentA+=rot;
    }
    fill(hover?255:100);
    noStroke();
    ellipse(origin.x+currentOffset.x,origin.y+currentOffset.y,s);
    // currentA+=rot;
    pop();
  };

  function ExploreProduct(id,origin,a,l,s,n){
    this.origin=origin;
    this.a=a;
    this.l=l;
    this.currX=this.origin.x+cos(this.a)*this.l;
    this.currY=this.origin.y+sin(this.a)*this.l;
    this.hover=false;
    this.aspectHover=false;
    var self=this;
    var currentA=0;
    var targetA=0;
    // console.log(currX, currY);

    var aspects=[];
    var aSpan=TWO_PI/n;
    for (var i=0; i<n; i++){
      aspects.push(new Aspect(i,i*aSpan,aSpan,s));
    }
    console.log(aspects);

    this.click=function(){
      var selected=null;
      this.aspectHover=false;
      aspects.forEach(function(aspect){
        // aspect.show(currentA, self.currX, self.currY, scl, mouseA,d);
        if(aspect.click()){
          selected=aspect;
          self.aspectHover=true;
        }
      });
      if(selected){
        targetA=-selected.a;
      }
    };

    this.run=function(givenA, scl){
      this.currX=this.origin.x+cos(givenA+this.a)*this.l;
      this.currY=this.origin.y+sin(givenA+this.a)*this.l;
      this.hover=dist(mouseX, mouseY, transform(this.currX, width/2,scl), transform(this.currY,height/2,scl))<s*scl/2;
      var diffA=targetA-currentA;
      if(abs(diffA)>0.0001){
        currentA+=diffA/20;
      }
    };

    this.show=function(givenA, scl){
      push();
      stroke(255);
      strokeWeight(s*0.1);
      line(this.origin.x, this.origin.y, this.currX, this.currY);
      translate(this.currX, this.currY);
      fill(this.hover?200:80);
      noStroke();
      ellipse(0,0,s);
      fill(this.hover?0:255);
      textAlign(CENTER, CENTER);
      textSize(s/2);
      text(id,0,0);
      pop();
      mouseA=atan2(mouseY-transform(self.currY,height/2,scl), mouseX-transform(self.currX, width/2,scl));
      if(mouseA<0){
        mouseA=TWO_PI+mouseA;
      }
      var d=dist(mouseX, mouseY, transform(self.currX, width/2,scl), transform(self.currY,height/2,scl));
      stroke(255,0,0);
      strokeWeight(1);
      push();
      translate(self.currX, self.currY);
      rotate(mouseA);
      line(0,0,d/currentScale,0);
      pop();
      aspects.forEach(function(aspect){
        aspect.show(currentA, self.currX, self.currY, scl, mouseA,d);

      });
    };
  }

  function Aspect(id,a,aSpan,s){
    this.a=a;
    var labels=["social","hackable","repairable","material","manufacture","end of life","regenerate","waste"];
    var label=labels[id];
    var sa=0;//-0.48*aSpan;
    var ea=0.96*aSpan;
    var midR=s/2+s*0.125;
    var effR=midR;
    var spanR=s*0.5;
    var hover=false;
    var effScl=0;
    var currentVal=random();
    var cHue=id*50;
    var effVR=0;
    var spanVR=0;

    this.click=function(){
      return(hover);
    };

    this.show=function(givenA,x,y,scl,mouseA, mouseD){
      // var d=dist(mouseX, mouseY, transform(x, width/2,scl), transform(y,height/2,scl));
      // hover=d<s && d>s/2 &&
      // console.log(x,y,midR);
      hover=mouseD<s*scl && mouseD>s*scl/2 && mouseA>(givenA+this.a+TWO_PI+sa)%TWO_PI && mouseA<(givenA+this.a+TWO_PI+ea)%TWO_PI;
      if(hover){
        effScl+=(1-effScl)/10;
      } else {
        effScl+=(0-effScl/10);
      }
      spanR=s*(0.25+0.25*effScl);
      effR=midR+(spanR-s*0.25)/2;
      spanVR=currentVal*spanR;
      effVR=midR+(spanVR-s*0.25)/2;
      push();
      translate(x,y);
      rotate(givenA+this.a);
      noFill();
      strokeCap(SQUARE);
      stroke(160);//(80+id*20,hover?255:160);
      strokeWeight(spanR);
      arc(0,0,effR*2, effR*2, sa, ea);
      colorMode(HSB);
      stroke(cHue,70,80,hover?1:0.5);
      strokeWeight(spanVR);
      arc(0,0,effVR*2, effVR*2, sa, ea);
      colorMode(RGB);
      push();
      rotate(sa+aSpan*0.5);
      translate(effR,0)
      push();
      translate((spanR-s*0.25)/2,0);
      rotate(PI/2);
      textSize(s*0.1*(effScl));
      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      text(label,0,0);
      pop();
      rotate(-(givenA+this.a+sa+aSpan*0.5));
      textSize(s*0.1*(effScl+1));
      fill(255);
      noStroke();
      textAlign(CENTER, CENTER);
      text(nf(currentVal*5,1,1),0,0);

      pop();
      pop();
    };
  }

}

// function Solution(space,sNom,n){
//   var aspects=[];
//   for(var i=0; i<n; i++){
//     aspects.push(new Aspect());
//   }
//
//   var aNow=0.1;
//   var xNow=0;
//   var yNow=0;
//   var sclNow=0;
//   var ease=20;
//   var s=sNom;
//   var aTarget=space.aFull;
//
//   this.show=function(exposure){
//     if(exposure==FULL){
//       xNow+=(space.xFull-xNow)/ease;
//       yNow+=(space.yFull-yNow)/ease;
//       sclNow+=(space.sclFull-sclNow)/ease;
//       aNow+=(aTarget-aNow)/ease;
//     }
//     if(exposure==PARTIAL){
//       xNow+=(space.xPartial-xNow)/ease;
//       yNow+=(space.yPartial-yNow)/ease;
//       sclNow+=(space.sclPartial-sclNow)/ease;
//       aNow+=(aTarget-aNow)/ease;
//     }
//     push();
//     translate(xNow, yNow);
//     rotate(aNow*TWO_PI);
//     scale(sclNow);
//     noStroke();
//     fill(0,0,100);
//     ellipse(0,0,s);
//     for(var i=0; i<n; i++){
//       rotate(TWO_PI/n);
//       stroke(0,0,100);
//       noFill();
//       strokeWeight(s*0.09);
//       strokeCap(SQUARE);
//       arc(0,0,s*1.2,s*1.2,0,0.9*TWO_PI/n);
//     }
//     pop();
//   };
//
//   function Aspect(id,a){
//     this.show=function(){
//
//     };
//
//   }
// }
//
// function Selector(space,sNom,n){
//   var options=[];
//   for(var i=0; i<n; i++){
//     options.push(new Option());
//   }
//   var aNow=0.1;
//   var xNow=0;
//   var yNow=0;
//   var sclNow=0;
//   var ease=20;
//   var s=sNom;
//   var aTarget=space.aFull;
//
//   this.show=function(exposure){
//     if(exposure==FULL){
//       xNow+=(space.xFull-xNow)/ease;
//       yNow+=(space.yFull-yNow)/ease;
//       sclNow+=(space.sclFull-sclNow)/ease;
//       aNow+=(aTarget-aNow)/ease;
//     }
//     if(exposure==PARTIAL){
//       xNow+=(space.xPartial-xNow)/ease;
//       yNow+=(space.yPartial-yNow)/ease;
//       sclNow+=(space.sclPartial-sclNow)/ease;
//       aNow+=(aTarget-aNow)/ease;
//     }
//     push();
//     translate(xNow, yNow);
//     rotate(aNow*TWO_PI);
//     scale(sclNow);
//     noStroke();
//     fill(0,0,100);
//     ellipse(0,0,s);
//     for(var i=0; i<n; i++){
//       rotate(TWO_PI/n);
//       stroke(0,0,100);
//       strokeWeight(s*0.05);
//       line(0,0,s,0);
//       noStroke();
//       fill(0,0,100);
//       ellipse(s,0,s*0.25);
//     }
//     pop();
//   };
//
//   function Option(id,a){
//     this.show=function(){
//
//     };
//
//   }
// }
//
// function Product(){
//   var productImage=null;
//   var productName="nothing";
//   var productData={};
//
//   this.assignProductData=function(name, img, data){
//     productName=name;
//     productData=data;
//     productImage=img;
//   };
//
//
// }
