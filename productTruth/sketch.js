var productImage;
var numDataPoints=8;
var productData=[];
var product;

function preload(){
  productImage=loadImage('images/duck.png');
}

function setup(){
  createCanvas(600,600);
  createProductData();
  product=new Product(300,300,150);
  product.assignProduct(productData, productImage);
}

function draw(){
  background(40);
  product.show();
  product.run();
}

function mousePressed(){
  product.click();
};

function createProductData(){
  for(var i=0; i<numDataPoints; i++){
    productData[i]=random();
  }
}

function Product(x,y,s){
  var vis=0;
  var productData=null;
  var productImage=null;
  var open=false;
  var hover=false;
  var visualiser=new Visualiser(x,y,s*2);

  this.assignProduct=function(prodData,prodImg){
    productData=prodData;
    productImage=prodImg;
    visualiser.assignData(productData);
  };

  this.run=function(){
    var d=dist(x,y,mouseX,mouseY);
    hover=false;
    if(vis<0.05){
      if(d<s*0.1){
        hover=true;
      }
    } else if(vis>0.7){
      if(d<s/2){
        hover=true;
      }
    }
    if(open){
      vis+=(1-vis)/10;
    } else {
      vis+=(0-vis)/10;
    }
  }

  this.click=function(){
    if(hover){
      open=!open;
    }

  }

  this.show=function(){
    if(productImage){
      push();
      translate(x,y);
      noStroke();
      fill(128);
      if(hover){
        fill(255);
      }
      ellipse(0,0,s*0.2);
      // rotate(frameCount*PI/100);
      scale(vis,vis);
      imageMode(CENTER);
      image(productImage,0,0,s,s);
      pop();
    }
    visualiser.show(vis);
  };

}

function Visualiser(x,y,s){
  var data=null;
  var open=false;
  var expanded=0;
  var rRel=0.2;
  var segs=[];



  this.assignData=function(d){
    data=d;
    for(var i=0; i<data.length; i++){
      segs[i]=new VisSeg(i,x,y,s,rRel);
    }
  };

  this.show=function(vis){
    push();
    translate(x,y);
    noFill();
    stroke(128);
    strokeWeight(s*rRel);
    strokeCap(SQUARE);
    ellipse(0,0,s*0.8);
    pop();
    var aRel=vis*TWO_PI/data.length;
    var mouseA=(atan2(mouseY-y,mouseX-x)+TWO_PI)%TWO_PI;
    // fill(255);
    // noStroke();
    // text(mouseA,100,100);
    segs.forEach(function(seg,i){
      seg.run(i*aRel,(i+1)*aRel,data[i],mouseA);
      seg.show();
    });
  };

  function VisSeg(ind,x,y,s,rRel){
    var cHue=200+ind*20;
    var asNow=0.00001;
    var aeNow=0.00001;
    var dvNow=0;
    var visBarTh=s*rRel;
    var visBarDia=s+(rRel*1.1*s);
    var dataBarTh=s*rRel*0.95*dvNow;
    var dataBarDia=s+(rRel*(0.1+dvNow)*s);
    var flowers=new DataFlowers(x,y,s*0.5,s*0.75,s*0.02);

    this.hover0=false;
    this.hover1=false;

    this.run=function(as,ae,dv,mouseA){
      asNow=as;//constrain(as,0.0001,TWO_PI*0.999);
      aeNow=constrain(ae,0.0001,TWO_PI*0.999);
      dvNow=dv;
      visBarTh=s*rRel;
      visBarDia=s+(rRel*1.1*s);
      dataBarTh=s*rRel*0.95*dvNow;
      dataBarDia=s+(rRel*(0.1+dvNow)*s);
      var d=dist(x,y,mouseX, mouseY);
      this.hover0=mouseA>asNow && mouseA<aeNow && d>s*0.3 && d<s*0.5;
      //d>(s-rRel)/2 && d<s/2;
      flowers.run(asNow, aeNow, this.hover0);
    }

    this.show=function(){
      // ae=constrain(ae,0.0001,TWO_PI*0.999);
      colorMode(HSB);
      push();
      translate(x,y);
      noFill();
      stroke(cHue,85,this.hover0?90:70,0.9);
      strokeWeight(s*rRel);
      strokeCap(SQUARE);
      arc(0,0,s*0.8,s*0.8,asNow,aeNow);
      stroke(0,0,20);
      strokeWeight(visBarTh);
      arc(0,0,visBarDia,visBarDia,asNow,aeNow);
      strokeWeight(dataBarTh);
      stroke(cHue,85,this.hover0?90:70,this.hover0?0.8:0.5);
      arc(0,0,dataBarDia,dataBarDia,asNow,aeNow);
      pop();
      colorMode(RGB);
      flowers.show();
    };
  };
}

function DataFlowers(x,y,rMin,rMax,s){
  var rRange=rMax-rMin;
  var dPoints=[];
  var open=false;
  var openness=0;
  var asNow=aeNow=0;
  var aStep=0;

  for(var i=0; i<5; i++){
    dPoints[i]={v:floor(random(100))/100,words:"floob chir dar"};
  }

  this.run=function(as, ae, o){
    asNow=as;
    aeNow=ae;
    aStep=(aeNow-asNow)/(dPoints.length+1);
    // console.log(aeNow,asNow);
    open=o;
    if(open){
      openness+=(1-openness)/10;
    } else {
      openness+=(0-openness)/10;
    }
  };

  this.show=function(){
    if(openness>0.1){
      push();
      translate(x,y);
      rotate(asNow+aStep/2);
      textAlign(LEFT,CENTER);
      textSize(openness*s*2);
      dPoints.forEach(function(dp,i){
        stroke(255);
        fill(40);
        line(rMin,0,rMin+rRange*openness*dp.v,0);
        ellipse(rMin+rRange*openness*dp.v,0,s);
        fill(255);
        noStroke();
        var aHere=asNow+(i+0.5)*aStep;
        push();
        translate(rMin+rRange*openness*dp.v+s,0);
        if(abs(aHere-PI)<PI/2){
          rotate(PI);
          textAlign(RIGHT,CENTER);
        } else {
          textAlign(LEFT,CENTER);
        }
        text(dp.words,0,0);
        pop();
        rotate(aStep);
      });
      pop();
    }
  }
}
