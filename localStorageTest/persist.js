function PersistStore(n){
  var cache={
    productClass: "",
    productInClass: "",
    story: "",
    chapterInStory: ""
  };


  this.update=function(){
    this.updateStorage();
    console.log(this.vals);
  }

  this.reset=function(){
    if(localStorage.bmcStatus && localStorage.bmcStatus=="initialised"){
      localStorage.removeItem("bmcStatus");
      var storageKeys=Object.keys(cache);
      storageKeys.forEach(function(key){
        localStorage.removeItem(key);
        cache[key]="";
      });
    }
    // this.vals=fillArrayWithFalse(n);
    // this.updateStorage();
  };

  this.updateStorage=function(newCache){
    cache=newCache;
    var storageKeys=Object.keys(cache);
    storageKeys.forEach(function(key){
      localStorage[key]=cache[key];
    });
  };


  this.getStorage=function(){
    return cache;
    // for(var i=0; i<n; i++){
    //   var res=localStorage.getItem("fragment"+nf(i,2,0));
    //   this.vals[i]=res=="true";
    //   // console.log(res,vals[i]);
    // }
  };

  this.retrieveStorage=function(){
    if(localStorage.bmcStatus && localStorage.bmcStatus=="initialised"){
      var storageKeys=Object.keys(cache);
      storageKeys.forEach(function(key){
        cache[key]=localStorage[key];
      });
    }
  };

  this.getStorageState=function(){
    return localStorage.bmcStatus && localStorage.bmcStatus=="initialised";
  };

  this.init=function(){
    if(localStorage.bmcStatus && localStorage.bmcStatus=="initialised"){
      this.retrieveStorage();
    } else {
      localStorage.bmcStatus="initialised";
      var storageKeys=Object.keys(cache);
      storageKeys.forEach(function(key){
        localStorage[key]="0";
        cache[key]=0;
      });
      // this.vals=fillArrayWithFalse(n);
      // this.updateStorage();
    }
    console.log(cache);
  }

  this.init();

}

function fillArrayWithFalse(n) {
  var arr = Array.apply(null, Array(n));
  return arr.map(function (x, i) { return false});
}
