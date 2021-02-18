function DataModel(n){
  this.eolLabels=[
      "recycle",
      "repairable",
      "longevity",
      "hackable",
      "waste"
  ];

  var possibleNames=shuffleArray([
    "fig bush",
    "skunk candle",
    "box of cool",
    "fun sandwich",
    "lab coat",
    "super lemon",
    "sunday pants",
    "library mug",
    "welcome hug",
    "small giant"
  ]);

  this.data={
    products:[]
  };

  for(var i=0; i<n; i++){
    this.data.products.push(new Product(possibleNames[i]));
  }

  function Product(name){
    this.name=name;
    var recycle=random();
    var repairable=random();
    var longevity=random();
    var hackable=random();
    var waste=random();
    var circularity=(recycle+repairable+longevity+hackable)/4 - waste;
    this.eolOptions={
      recycle: recycle,
      repairable: repairable,
      longevity: longevity,
      hackable: hackable,
      waste: waste,
    };
    this.circularity=circularity;

    this.harms={
      extraction: random(),
      emmisions: random(),
      waste: random(),
      bio: random(),
      human: random()
    }
  }

}

function shuffleArray(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
