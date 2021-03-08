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

function changeValues(){
  console.log("randomise");
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
