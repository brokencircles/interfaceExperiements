var productImage;
var numDataPoints=8;
var productData=[];
var product;
var x0,y0;
var x1,y1;
var xn,yn;
var sc0=1;
var sc1=0.3;
var scn=sc0;
var state={productPos:0};

function preload(){
  productImage=loadImage('images/duck.png');
}

function setup(){
  createCanvas(600,600);
  x0=width/2;
  y0=height/2;
  x1=width*0.25;
  y1=height*0.75;
  xn=x0;
  yn=y0;
  createProductData();
  product=new Product(150);
  product.assignProduct(productData, productImage);
}

function draw(){
  background(40);
  product.show(xn,yn,scn);
  product.run();
  if(state.productPos==0){
    xn+=(x0-xn)/20;
    yn+=(y0-yn)/20;
    scn+=(sc0-scn)/20;
  } else {
    xn+=(x1-xn)/20;
    yn+=(y1-yn)/20;
    scn+=(sc1-scn)/20;
  }
}

function mousePressed(){
  var sel=product.click();
  if(sel>-1){
    state.productPos=(state.productPos+1)%2;
  }
  console.log(sel, state.productPos);
};

function createProductData(){
  for(var i=0; i<numDataPoints; i++){
    productData[i]=random();
  }
}

function Product(s){
  var vis=0;
  var productData=null;
  var productImage=null;
  var open=false;
  var hover=false;
  var x=0,y=0;
  var visualiser=new Visualiser(s*2);

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
    var visSel=visualiser.click();
    if(visSel>-1){

    }
    return visSel;
  }

  this.show=function(gx,gy,scl){
    x=gx;
    y=gy;
    if(productImage){
      push();
      translate(x,y);
      scale(scl);
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
    visualiser.show(x,y,scl,vis);
  };

}

function Visualiser(s){
  var x=0; y=0;
  var data=null;
  var open=false;
  var expanded=0;
  var rRel=0.2;
  var segs=[];

  this.click=function(){
    var sel=-1;
    segs.forEach(function(seg,i){
      if(seg.click()){
        sel=i;
      }
    });
    return sel;
  }

  this.assignData=function(d){
    data=d;
    for(var i=0; i<data.length; i++){
      segs[i]=new VisSeg(i,s,rRel);
    }
  };

  this.show=function(gx,gy,scl,vis){
    x=gx;
    y=gy;
    push();
    translate(x,y);
    scale(scl);
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
      seg.show(x,y,scl);
    });
  };

  function VisSeg(ind,s,rRel){
    var x=0, y=0;
    var scl=1;
    var cHue=200+ind*20;
    var asNow=0.00001;
    var aeNow=0.00001;
    var dvNow=0;
    var visBarTh=s*rRel;
    var visBarDia=s+(rRel*1.1*s);
    var dataBarTh=s*rRel*0.95*dvNow;
    var dataBarDia=s+(rRel*(0.1+dvNow)*s);
    var flowers=new DataFlowers(s*0.5,s*0.75,s*0.02);

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
      this.hover0=mouseA>asNow && mouseA<aeNow && d>s*0.3*scl && d<s*0.5*scl;
      //d>(s-rRel)/2 && d<s/2;
      flowers.run(asNow, aeNow, this.hover0);
    }

    this.click=function(){
      clicked=this.hover0;
      return clicked;
    }

    this.show=function(gx,gy,gscl){
      x=gx;
      y=gy;
      scl=gscl;
      // ae=constrain(ae,0.0001,TWO_PI*0.999);
      colorMode(HSB);
      push();
      translate(x,y);
      scale(scl);
      noFill();
      stroke(cHue,85,this.hover0?90:70,this.hover0?0.9:0.5);
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
      flowers.show(x,y,scl);
    };
  };
}

function DataFlowers(rMin,rMax,s){
  var x=0, y=0;
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

  this.show=function(gx, gy,scl){
    x=gx;
    y=gy;
    if(openness>0.1){
      push();
      translate(x,y);
      scale(scl);
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
        if(openness>0.9){
          text(dp.words,0,0);
        }
        pop();
        rotate(aStep);
      });
      pop();
    }
  }
}
