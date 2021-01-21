function ProductData(numTypes, numProductsPerType, numScores, numHarms){
  this.prodData=[];

  for(var j=0; j<numTypes; j++){
    var typeProductData=[];
    for(var i=0; i<numProductsPerType; i++){
      var scores=[];
      for(var k=0; k<numScores; k++){
        scores.push(floor(random(10))/10);
      }
      var harms=[];
      for(var k=0; k<numHarms; k++){
        harms.push(floor(random(10))/10);
      }
      typeProductData.push({
        scores:scores,
        harms:harms
      });
    }
    this.prodData.push(typeProductData);
  }
  console.log(this.prodData);
}

var simpleprodData=[
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
