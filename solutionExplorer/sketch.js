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

function Explorer(x,y,s){
  var n=3;
  var offsetA=-PI*0.25;
  var origin=createVector(x,y);
  var currentOffset=createVector(0,0);
  var targetOffset=createVector(0,0);
  var currentA=0;
  var rot=0;//PI/500;
  var currentScale=1;
  var productOptions=[];
  var aStep=TWO_PI/n;
  for(var i=0; i<n; i++){
    productOptions.push(new ExploreProduct(i,p5.Vector.add(origin,currentOffset), currentA+offsetA+i*aStep,s*2,s*0.5));
  }

  this.click=function(){
    var selected=null;
    productOptions.forEach(function(option,i){
      if(option.hover){
        selected=option;
      }
    });
    if(selected){
      targetOffset=p5.Vector.sub(createVector(selected.currX,selected.currY),currentOffset).mult(-1);
    }
  }

  this.show=function(){
    var diff=p5.Vector.sub(targetOffset,currentOffset);
    // console.log(diff.mag());
    if(diff.mag()>0.001){
      currentOffset.add(diff.mult(0.05));
    }
    var hovered=false;
    productOptions.forEach(function(option,i){
      option.show()
      if(option.hover){
        hovered=true;
      }
      option.origin=p5.Vector.add(origin,currentOffset);
      option.a=currentA+offsetA+i*aStep;
      option.l=s*2;
    });
    if(!hovered){
      currentA+=rot;
    }
    fill(255,100);
    noStroke();
    ellipse(origin.x,origin.y,s);
    // currentA+=rot;
  };

  function ExploreProduct(id,origin,a,l,s){
    this.origin=origin;
    this.a=a;
    this.l=l;
    this.currX=this.origin.x+cos(this.a)*this.l;
    this.currY=this.origin.y+sin(this.a)*this.l;
    this.hover=false;
    // console.log(currX, currY);

    this.show=function(){
      this.currX=this.origin.x+cos(this.a)*this.l;
      this.currY=this.origin.y+sin(this.a)*this.l;
      this.hover=dist(mouseX, mouseY, this.currX, this.currY)<s/2;
      push();
      stroke(255);
      line(this.origin.x, this.origin.y, this.currX, this.currY);
      translate(this.currX, this.currY);
      fill(this.hover?200:80);
      ellipse(0,0,s);
      fill(this.hover?0:255);
      textAlign(CENTER, CENTER);
      textSize(s/2);
      text(id,0,0);
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
