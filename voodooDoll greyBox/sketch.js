var pv,hs,sPanel,body;
var numProducts=8;
var numAspects=4;
var numHarms=5;
var numScores=3;
var prodDataSet;
var prodData;


function setup() {
  prodDataSet=new ProductData(numAspects,numProducts,numScores,numHarms);
  prodData=prodDataSet.prodData[0];
  createCanvas(800,500);
  body=new Body(150,125,100,numAspects);
  sPanel=new SlidePanel(50,275,200,200,numScores);
  pv=new ProductViewer(300,150,200,200,numProducts);
  hs=new HarmScore(550,150,200);
  pv.loadProducts(prodData);
  // for(var i=0; i<numProducts; i++){
  //   pv.addProduct(200,prodData[i]);
  // }
}

function draw() {
  background(40);
  var prodGroup=body.run(mouseX, mouseY);
  if(prodGroup!==false){
    console.log("selected product group: "+prodGroup);
    prodData=prodDataSet.prodData[prodGroup];
    pv.loadProducts(prodData);
    pv.selectProduct(numProducts);
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
