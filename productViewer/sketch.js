var pv;
var numProducts=8;

function setup() {
  createCanvas(500,500);
  pv=new ProductViewer(100,150,200,200,numProducts);
}

function draw() {
  background(40);
  pv.show();
  pv.run();
}

function mousePressed(){
  var np=floor(random(numProducts));
  pv.selectProduct(np);
}

function ProductViewer(x,y,w,h,n){
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

  for(var i=0; i<n; i++){
    products.push(new Product(w));
  }

  this.selectProduct=function(sel){
    currentProduct=sel;
    targetOffset=(sel*w);
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

  function Product(s){
    var frame=createGraphics(s,s);
    var cr=random(75,225);
    var cg=random(75,225);
    var cb=random(75,225);

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
