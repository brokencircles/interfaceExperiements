var pd=new ProductData("data/data.json");
var productCount=0;
var currentProduct=-1;
var initialised=false;

function testLoaded(){
  console.log(pd.dataHasLoaded);
  console.log(pd.data);
  init();
}

function init(){
  if(pd && pd.dataHasLoaded){
    productCount=pd.data.productData.length;
  }
  console.log(productCount);
  initialised=true;
}

// function nextProduct(){
//
// }

function nextProduct(){
  if(!initialised){
    init();
  }
  currentProduct=(currentProduct+1)%productCount;
  var pdd=pd.data.productData[currentProduct];
  document.getElementById("product-class").innerHTML=pdd.class;
  document.getElementById("product-num").innerHTML=currentProduct;
  document.getElementById("product-name").innerHTML=pdd.productName;
  document.getElementById("product-description").innerHTML=pdd.productDescription;

  document.getElementById("aspect-material").innerHTML="material: "+pdd.ratedAspects.material.rating;
  document.getElementById("aspect-manufacture").innerHTML="manufacture: "+pdd.ratedAspects.manufacture.rating;
  document.getElementById("aspect-useful-life").innerHTML="useful life: "+pdd.ratedAspects.usefulLife.rating;
  document.getElementById("aspect-hackable").innerHTML="hackable: "+pdd.ratedAspects.hackable.rating;
  document.getElementById("aspect-repairable").innerHTML="repairable: "+pdd.ratedAspects.repairable.rating;
  document.getElementById("aspect-disposal").innerHTML="disposal: "+pdd.ratedAspects.disposal.rating;
  document.getElementById("aspect-value").innerHTML="value: "+pdd.ratedAspects.value.rating;
  document.getElementById("aspect-social").innerHTML="social: "+pdd.ratedAspects.social.rating;
  // <li id="aspect-material"></li>
  // <li id="aspect-manufacture"></li>
  // <li id="aspect-useful-life"></li>
  // <li id="aspect-hackable"></li>
  // <li id="aspect-repairable"></li>
  // <li id="aspect-disposal"></li>
  // <li id="aspect-value"></li>

  var buildText=pdd.timeline.material.text.join('. ');
  document.getElementById("material-facts").innerHTML=buildText;
  buildText=pdd.timeline.manufacture.text.join('. ');
  document.getElementById("manufacture-facts").innerHTML=buildText;
  buildText=pdd.timeline.distribution.text.join('. ');
  document.getElementById("distribution-facts").innerHTML=buildText;
  buildText=pdd.timeline.hackability.text.join('. ');
  document.getElementById("hackability-facts").innerHTML=buildText;
  buildText=pdd.timeline.repairability.text.join('. ');
  document.getElementById("repairability-facts").innerHTML=buildText;
  buildText=pdd.timeline["useful life"].text.join('. ');
  document.getElementById("useful-life-facts").innerHTML=buildText;
  buildText=pdd.timeline.reuse.text.join('. ');
  document.getElementById("reuse-facts").innerHTML=buildText;
  buildText=pdd.timeline.disposal.text.join('. ');
  document.getElementById("disposal-facts").innerHTML=buildText;
}

function ProductData(filename){
  this.data={};
  this.dataHasLoaded=false;
  loadDataFile(this,filename);

  function loadDataFile(self,filename){
    fetch(filename)
    .then(response => response.json())
    .then(json => self.data=json)
    .then((json)=>{
      self.dataHasLoaded=true;
    });
  }
}
