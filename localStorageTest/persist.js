function PersistStore(n){
  this.vals=[];
  

  
  this.update=function(){
    this.updateStorage();
    console.log(this.vals);
  }
  
  this.reset=function(){
    this.vals=fillArrayWithFalse(n);
    this.updateStorage();
  };
  
  this.updateStorage=function(){
    this.vals.forEach(function(val,i){
      localStorage.setItem(("fragment"+nf(i,2,0)),val?"true":"false");
    });
  };
  
  this.getStorage=function(){
    for(var i=0; i<n; i++){
      var res=localStorage.getItem("fragment"+nf(i,2,0));
      this.vals[i]=res=="true";
      // console.log(res,vals[i]);
    }
  };
  
  this.init=function(){
    if(localStorage.fragmentArray && localStorage.fragmentArray=="thing"){
      this.getStorage();
    } else {
      localStorage.fragmentArray="thing";
      this.vals=fillArrayWithFalse(n);
      this.updateStorage();
    }
    console.log(this.vals);
  }

  this.init();

}

function fillArrayWithFalse(n) {
  var arr = Array.apply(null, Array(n));
  return arr.map(function (x, i) { return false});
}