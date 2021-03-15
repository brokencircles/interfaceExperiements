/*
A Wrapper for a set of localStorage attributes
==============================================
We can just read write to local storage values willy nilly,
but by wrapping them in an object/class, we can be more organised.
It keeps us to a fixed set of object properties, changed in one place.
In particular this gives us one method to read all values, and to
reset them, which can be handy.
The structure of 'cache' is the set of values we have to play with.
Modify/extend it here and only here.
All values are stored as string, but are initialised as a string ("0") as
I assume we will be just using a number as a reference to a product, chapter etc.

To use, declare a variable as an instance of
Use the reset() function to set everything back to a starting state.

To make changes, call getStorage(). Modify the value you want
in the resulting Object, then pass the modified object back to updateStorage().
*/
function PersistStore(n){ //a class to cache values and read/write to local storage
  var cache={
    productClass: "",
    productInClass: "",
    story: "",
    chapterInStory: ""
  };

  // var changed=false;

  // this.didChange=function(){ //check if something changed and reset changed flag regardless
  //   var res=changed;
  //   changed=false;
  //   return res;
  // };

  this.reset=function(){
    if(localStorage.bmcStatus && localStorage.bmcStatus=="initialised"){
      localStorage.removeItem("bmcStatus");
      var storageKeys=Object.keys(cache);
      storageKeys.forEach(function(key){
        localStorage.removeItem(key);
        cache[key]="";
      });
    }
    localStorage.bmcStatus="";
    // this.vals=fillArrayWithFalse(n);
    // this.updateStorage();
  };

  this.updateStorage=function(newCache){
    if(localStorage.bmcStatus && localStorage.bmcStatus=="initialised"){
      cache=newCache;
      var storageKeys=Object.keys(cache);
      storageKeys.forEach(function(key){
        localStorage[key]=cache[key];
      });
      // changed=true;
    }
  };


  this.getStorage=function(){
    if(!(localStorage.bmcStatus && localStorage.bmcStatus=="initialised")){
      this.init();
    }
    return cache;
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
    // changed=true;
    // console.log(cache);
  }

  this.init();

}

// function fillArrayWithFalse(n) {
//   var arr = Array.apply(null, Array(n));
//   return arr.map(function (x, i) { return false});
// }
