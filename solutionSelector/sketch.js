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

function preload(){
  loadedData=loadJSON('data.json');
}

function setup() {
  createCanvas(500,500);
  console.log(loadedData);
  colorMode(HSB);
  space={
    x:0,
    y:0,
    w:width,
    h:height,
    xFull:width/2,
    yFull:height/2,
    sclFull:1,
    aFull:1,
    xPartial:width*0.05,
    yPartial:height*0.95,
    aPartial:0.1,
    sclPartial:0.2,
  };
  selector=new Selector(space,200,3);
  solution=new Solution(space,200,3);
}

function draw() {
  background(0,0,20);
  if(context==SELECTOR){
    selector.show(FULL);
  } else {
    selector.show(PARTIAL);
  }

  if(context==SELECTOR){
    solution.show(PARTIAL);
  } else {
    solution.show(FULL);
  }
}

function mousePressed(){
  if(context==SELECTOR){
    context=SOLUTION;
  } else {
    context=SELECTOR;
  }
  console.log(context);
}

function Solution(space,sNom,n){
  var aspects=[];
  for(var i=0; i<n; i++){
    aspects.push(new Aspect());
  }

  var aNow=0.1;
  var xNow=0;
  var yNow=0;
  var sclNow=0;
  var ease=20;
  var s=sNom;
  var aTarget=space.aFull;

  this.show=function(exposure){
    if(exposure==FULL){
      xNow+=(space.xFull-xNow)/ease;
      yNow+=(space.yFull-yNow)/ease;
      sclNow+=(space.sclFull-sclNow)/ease;
      aNow+=(aTarget-aNow)/ease;
    }
    if(exposure==PARTIAL){
      xNow+=(space.xPartial-xNow)/ease;
      yNow+=(space.yPartial-yNow)/ease;
      sclNow+=(space.sclPartial-sclNow)/ease;
      aNow+=(aTarget-aNow)/ease;
    }
    push();
    translate(xNow, yNow);
    rotate(aNow*TWO_PI);
    scale(sclNow);
    noStroke();
    fill(0,0,100);
    ellipse(0,0,s);
    for(var i=0; i<n; i++){
      rotate(TWO_PI/n);
      stroke(0,0,100);
      noFill();
      strokeWeight(s*0.09);
      strokeCap(SQUARE);
      arc(0,0,s*1.2,s*1.2,0,0.9*TWO_PI/n);
    }
    pop();
  };

  function Aspect(id,a){
    this.show=function(){

    };

  }
}

function Selector(space,sNom,n){
  var options=[];
  for(var i=0; i<n; i++){
    options.push(new Option());
  }
  var aNow=0.1;
  var xNow=0;
  var yNow=0;
  var sclNow=0;
  var ease=20;
  var s=sNom;
  var aTarget=space.aFull;

  this.show=function(exposure){
    if(exposure==FULL){
      xNow+=(space.xFull-xNow)/ease;
      yNow+=(space.yFull-yNow)/ease;
      sclNow+=(space.sclFull-sclNow)/ease;
      aNow+=(aTarget-aNow)/ease;
    }
    if(exposure==PARTIAL){
      xNow+=(space.xPartial-xNow)/ease;
      yNow+=(space.yPartial-yNow)/ease;
      sclNow+=(space.sclPartial-sclNow)/ease;
      aNow+=(aTarget-aNow)/ease;
    }
    push();
    translate(xNow, yNow);
    rotate(aNow*TWO_PI);
    scale(sclNow);
    noStroke();
    fill(0,0,100);
    ellipse(0,0,s);
    for(var i=0; i<n; i++){
      rotate(TWO_PI/n);
      stroke(0,0,100);
      strokeWeight(s*0.05);
      line(0,0,s,0);
      noStroke();
      fill(0,0,100);
      ellipse(s,0,s*0.25);
    }
    pop();
  };

  function Option(id,a){
    this.show=function(){

    };

  }
}

function Product(){
  var productImage=null;
  var productName="nothing";
  var productData={};

  this.assignProductData=function(name, img, data){
    productName=name;
    productData=data;
    productImage=img;
  };


}
