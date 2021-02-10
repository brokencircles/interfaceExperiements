var allData;
var products=[];

function setup() {
  createCanvas(500,500);
  allData=new DataModel(5);
  console.log(allData);
  allData.data.products.forEach(function(pd){
    var prod=new Product();
    prod.assignData(pd);
    products.push(prod);
  });
}

function draw() {
  background(40);
  colorMode(HSB);
  products.forEach(function(prod,i){
    prod.show(100,100+i*100,250,1);
  });
}

function Product(){
  var data;
  var cHue=random(280);
  var cSat=random(40,70);
  var cBri=70;
  var hoverCirc=false;

  this.assignData=function(dataIn){
    data=dataIn;
  };

  this.show=function(x,y,wNom,scl){
    var w=wNom;
    var h=w*0.3;
    push();
    translate(x,y);
    scale(scl);
    noStroke();
    fill(0,0,10);
    rectMode(CORNER);
    rect(0,0,w,h);
    fill(cHue,cSat,cBri);
    rect(w*0.05,w*0.1,w*0.1,w*0.1);
    fill(0,0,100);
    textSize(h*0.1);
    textAlign(LEFT,CENTER);
    text(data.name,w*0.2,h*0.5);

    circVis(w*1.2,h*0.5,h*0.4,data.circularity,scl)
    // push();
    // translate(w*1.2,h*0.5);
    // fill(0,0,50);
    // ellipse(0,0,h*0.8);
    // strokeWeight(h*0.1);
    // noFill();
    // stroke(0+140*(data.circularity+1)*0.5,70,80)
    // if(abs(data.circularity)<0.0001){
    // } else if(data.circularity>0){
    //   // stroke(140,70,80);
    //   stroke(0+140*(data.circularity+1)*0.5,70,80)
    //   // line(0,h*0.4,0,-h*0.8*data.circularity);
    //   arc(0,0,h*0.8,h*0.8,0,(data.circularity)*TWO_PI);
    //   push();
    //   rotate(TWO_PI*data.circularity);
    //   translate(h*0.4,0);
    //   line(0,0,-h*0.1,-h*0.1);
    //   line(0,0,h*0.1,-h*0.1);
    //   pop();
    // } else {
    //   stroke(0,70,80);
    //   line(h*0.4,0,h*0.4+h*0.8*data.circularity,0);
    //   // arc(0,0,h*0.8,h*0.8,TWO_PI*data.circularity,TWO_PI);
    //   push();
    //   // rotate(TWO_PI*data.circularity);
    //   translate(h*0.4+h*0.8*data.circularity,0);
    //   line(0,-h*0.1,0,h*0.1);
    //   // line(0,0,-h*0.1,h*0.1);
    //   pop();
    // }
    // noStroke();
    // fill(0,0,100);
    // textAlign(CENTER,CENTER);
    // textSize(h*0.15);
    // text(nf(data.circularity*100,1,1)+'%',0,0);
    // pop();

    var eoi=0;
    translate(w*0.5,h*0.1);
    for(var eo in data.eolOptions){
    // data.eolOptions.forEach(function(eo,i){
      // console.log(eo);
      var hover=mouseX>x+scl*w*0.5 &&
                mouseX<x+scl*w*(0.5+0.5) &&
                mouseY>y+scl*h*0.1+eoi*h*0.2 &&
                mouseY<y+scl*h*0.1+eoi*h*0.2+h*0.15;
      if(hover){
        fill(20,80,100);
      } else {
        fill(0,0,50);
      }
      ellipse(0,0,h*0.15);
      if(hover){
        fill(0,80,100);
      } else {
        fill(0,0,50);
      }
      rectMode(CORNER);
      rect(w*0.1,-h*0.075,w*0.5*data.eolOptions[eo],h*0.15);
      if(hover){
        fill(0,0,100);
        textSize(h*0.1);
        text(eo,w*0.1,0)
      }
      eoi++;
      translate(0,h*0.2);
    };
    pop();
  };
}

function circVis(x,y,r,c,scl){
  var hover=false;

  push();
  translate(x,y);
  fill(0,0,50);
  ellipse(0,0,r*2*scl);
  strokeWeight(r*0.2*scl);
  noFill();
  stroke(0+140*(c+1)*0.5,70,80)
  if(abs(c)<0.0001){
  } else if(c>0){
    // stroke(140,70,80);
    stroke(0+140*(c+1)*0.5,70,80)
    // line(0,h*0.4,0,-h*0.8*c);
    arc(0,0,r*2*scl,r*2*scl,0,(c)*TWO_PI);
    push();
    rotate(TWO_PI*c);
    translate(r*scl,0);
    line(0,0,-r*0.2*scl,-r*0.2*scl);
    line(0,0,r*0.2*scl,-r*0.2*scl);
    pop();
  } else {
    stroke(0,70,80);
    line(r*scl,0,r*scl+r*2*scl*c,0);
    // arc(0,0,h*0.8,h*0.8,TWO_PI*c,TWO_PI);
    push();
    // rotate(TWO_PI*c);
    translate(r*scl+r*2*scl*c,0);
    line(0,-r*0.2*scl,0,r*0.2*scl);
    // line(0,0,-h*0.1,h*0.1);
    pop();
  }
  noStroke();
  fill(0,0,100);
  textAlign(CENTER,CENTER);
  textSize(r*0.3*scl);
  text(nf(c*100,1,1)+'%',0,0);
  pop();
}
