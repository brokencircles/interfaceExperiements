var productDataSet=[];

function buildNewProductData(){
  newProdData=new ProductData();
  newProdData.need='toy';
  newProdData.aspects.material=new RatedAspect();
  newProdData.aspects.material.rating=0;
  newProdData.aspects.material.features.push(new Feature('content'));
  newProdData.factuals.push(new FactualAspect())
  productDataSet.push(newProdData);
}

function ProductData(){
  this.need='unassigned';
  this.aspects={
    materials: 'unassigned',
    manufacture: 'unassigned',
    usefulLife: 'unassigned',
    hackable: 'unassigned',
    repairable: 'unassigned',
    reuse: 'unassigned',
    retainedValue: 'unassigned',
    price: 'unassigned'
  }
  this.factuals=[];

}

function RatedAspect(){
  this.rating=0;
  this.features=[];
}

function FactualAspect(){
  this.factType='unassigned';
  this.heading='unassigned';
  this.content='unassigned';
}

function Feature(content){
  this.content=content;
}

"productID": 100001,
"productName": "rubber duck",
"productDescription": "some helpful text description",
"need":"toy",
"ratedAspects":{
  "material": {
    "rating": 1,
    "features":["likes cats","purple","wakes early","loves toast"],
  },
  "manufacture": {
    "rating": 0,
    "features":["likes cats","purple","wakes early","loves toast"]
  },
  "usefulLife": {
    "rating": 2.5,
    "features":["likes cats","purple","wakes early","loves toast"]
  },
  "hackable": {
    "rating": 3,
    "features":["likes cats","purple","wakes early","loves toast"]
  },
  "repairable": {
    "rating": 1,
    "features":["likes cats","purple","wakes early","loves toast"]
  },
  "retainedValue": {
    "rating": 0,
    "features":[]
  },
  "price": {
    "rating": 2,
    "features":["likes cats","purple","wakes early","loves toast"]
  },
}
