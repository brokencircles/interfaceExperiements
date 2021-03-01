var productImage;
var numDPs=5;
var dps=[];


function preload(){
  productImage=loadImage('images/duck.png');
}

function setup(){
  createCanvas(800,250);
  var effWidth=width*0.8;
  var startX=width*0.1;
  var stepX=effWidth/(numDPs-1);
  for(var i=0; i<numDPs; i++){
    dps.push(new DecisionPoint(startX+i*stepX,height*0.5,height*0.2));
  }
}

function draw(){
  background(230);
  dps.forEach(function(dp){
    dp.show();
  });
}

function mousePressed(){

};

// function createProductData(){
//   for(var i=0; i<numDataPoints; i++){
//     productData[i]=random();
//   }
// }

function DecisionPoint(x,y,s){
  this.pos=createVector(x,y);
  var active=false;
  var activity=0;
  var ring;

  this.show=function(){
    var d=dist(x,y,mouseX, mouseY);
    hover=d<s;
    stroke(40);
    noFill();
    if(hover){
      fill(255);
    }
    strokeWeight(s*0.05);
    ellipse(x,y,hover?s:s/2);
  };
}
