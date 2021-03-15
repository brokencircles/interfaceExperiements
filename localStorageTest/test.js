var persist=new PersistStore(5);


// checkAndUpdateStatus();

function initialiseStore(){
  persist.init();
  checkAndUpdateStatus();
}

function checkAndUpdateStatus(){
  console.log("check");
  var status=persist.getStorageState();
  document.getElementById("storage-status").innerHTML = (status?"initialised":"empty");
  var vals=persist.getStorage();
  document.getElementById("product-class").innerHTML = vals.productClass;
  document.getElementById("product-in-class").innerHTML = vals.productInClass;
  document.getElementById("story").innerHTML = vals.story;
  document.getElementById("chapter-in-story").innerHTML = vals.chapterInStory;
}

function clearStorage(){
  console.log("clear");
  persist.reset();
  checkAndUpdateStatus();
}

function getValues(){
  console.log(persist.getStorage())
}

function getValuesChangeOne(){
  console.log("pick a random key and change it");
  var cache=persist.getStorage();
  var keys=Object.keys(cache);
  var choice=Math.floor(Math.random()*keys.length);
  cache[keys[choice]]=""+((parseInt(cache[keys[choice]],10)+1)%5);
  persist.updateStorage(cache);
  checkAndUpdateStatus();
}


function changeValues(){
  console.log("change all");
  if(!persist.getStorageState()){
    persist.init();
  } else {
    var vals=persist.getStorage();
    var values=Object.keys(vals);
    values.forEach(function(val){
      vals[val]=""+((parseInt(vals[val],10)+1)%5);
    });
    persist.updateStorage(vals);
  }
  checkAndUpdateStatus();
}
