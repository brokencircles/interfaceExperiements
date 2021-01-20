var pv;
var numProducts=8;

var prodData=[
  {
    scores:[0,0.1,0.2],
    harms:[0.1,0.6,0.8,0.2,0.1]
  },
  {
    scores:[0.7,0.5,0.6],
    harms:[0.2,0.3,0.1,0.7,0.9]
  },
  {
    scores:[0.2,0.9,0.4],
    harms:[0.9,0.3,0.8,0.4,0.5]
  },
  {
    scores:[0.8,0,0.5],
    harms:[0.4,0.1,0.7,0.3,0.4]
  },
  {
    scores:[0.6,0.2,0.8],
    harms:[0.2,0.4,0.5,0.8,0.9]
  },
  {
    scores:[0.7,0.1,0.4],
    harms:[0.1,0.1,0.5,0.3,0.4]
  },
  {
    scores:[0.3,0.3,0.6],
    harms:[0.8,0.3,0.3,0.3,0.3]
  },
  {
    scores:[0.9,0.1,0],
    harms:[0.1,0.3,0.6,0.8,0.1]
  }
]

function setup() {
  createCanvas(500,500);
  pv=new ProductViewer(100,150,200,200,numProducts);
  for(var i=0; i<numProducts; i++){
    pv.addProduct(200,prodData[i]);
  }
}

function draw() {
  background(40);
  pv.show();
  pv.run();
}

function mousePressed(){
  // var np=floor(random(numProducts));
  // pv.selectProduct(np);
  var randScores=[0,0,0];
  for(var i=0; i<3; i++){
    randScores[i]=floor(random(10))/10;
  }
  console.log("random scores: "+randScores);
  pv.matchProduct(randScores);
}

function ProductViewer(x,y,w,h){
  var products=[];
  var currentProduct=0;
  var targetOffset=0;
  var currentOffset=0;
  var maskG=createGraphics(width, height);
  maskG.fill(255);
  maskG.noStroke();
  maskG.rect(x,0,w,y);
  maskG.rect(x,y+h,w,height);
  maskG.rect(x-w*0.1,0,w*0.1,height);
  maskG.rect(x+w*1.1,0,w*0.1,height);
  var cover=maskG.get();

  this.matchProduct=function(scores){
    var rms=[];
    var lowRmsVal=1000;
    var lowRmdInd=-1;
    for(var j=0; j<products.length; j++){
      var myRms=0;
      for(var i=0; i<scores.length; i++){
        var diff=scores[i]-products[j].productData.scores[i];
        var dsq=diff*diff;
        myRms+=dsq;
      }
      myRms/=scores.length;
      myRms=sqrt(myRms);
      if(myRms<lowRmsVal){
        lowRmsVal=myRms;
        lowRmdInd=j;
      }
      rms[j]=myRms;
    }
    console.log("closest match = "+lowRmdInd);
    console.log(rms);
    currentProduct=lowRmdInd;
    targetOffset=(lowRmdInd*w);
  };

  // for(var i=0; i<n; i++){
  //   products.push(new Product(w));
  // }

  this.addProduct=function(w,pData){
    products.push(new Product(w,pData));
  };

  this.selectProduct=function(sel){
    currentProduct=sel;
    targetOffset=(sel*w);
    console.log(products[currentProduct].productData);
  };

  this.run=function(){
    currentOffset+=(targetOffset-currentOffset)/20;
  };

  this.show=function(){
    imageMode(CENTER);
    products.forEach(function(p,i){
      image(p.img,x+w/2,y-currentOffset+(i+0.5)*w,w*0.9,w*0.9);
    })
    // image(cover,0,0);
    fill(160);
    noStroke();
    rect(x,0,w,y);
    rect(x,y+h,w,height);
    rect(x-w*0.1,0,w*0.1,height);
    rect(x+w*1,0,w*0.1,height);
  }

  function Product(s,pData){
    var frame=createGraphics(s,s);
    var cr=random(75,225);
    var cg=random(75,225);
    var cb=random(75,225);
    this.productData=pData;

    frame.noStroke();
    frame.fill(200);
    frame.rect(0,0,s,s);
    frame.fill(cr,cg,cb);
    frame.rect(s*0.1,s*0.2,s*0.8,s*0.4);
    frame.fill(40);
    frame.rect(s*0.05,s*0.05,s*0.5,s*0.1);
    for(var i=0; i<3; i++){
      frame.rect(s*0.05,s*(0.65+i*0.1),s*0.9,s*0.05)
    }

    this.img=frame.get();
  }
}
