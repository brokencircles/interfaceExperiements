var pv,hs,sPanel,body;
var numProducts=8;



function setup() {
  createCanvas(800,500);
  body=new Body(150,125,100,4);
  sPanel=new SlidePanel(50,275,200,200,3);
  pv=new ProductViewer(300,150,200,200,numProducts);
  hs=new HarmScore(550,150,200);
  for(var i=0; i<numProducts; i++){
    pv.addProduct(200,prodData[i]);
  }
}

function draw() {
  background(40);
  var prodGroup=body.run(mouseX, mouseY);
  if(prodGroup!==false){
    console.log(prodGroup);
  }
  sPanel.run(mouseX, mouseY);
  var vals=sPanel.get();
  if(vals!==false){
    pv.matchProduct(vals);
    var harm=pv.getCurrentProductData().harms;
    hs.update(harm);
  }
  pv.show();
  pv.run();
  hs.show();
  hs.run();
}

function mousePressed(){
  // var np=floor(random(numProducts));
  // pv.selectProduct(np);

  // var randScores=[0,0,0];
  // for(var i=0; i<3; i++){
  //   randScores[i]=floor(random(10))/10;
  // }
  // console.log("random scores: "+randScores);
  // pv.matchProduct(randScores);
  // var harm=pv.getCurrentProductData().harms;
  // hs.update(harm);
}
