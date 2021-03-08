var pd=new ProductData();
pd.loadDataFile("data.json");

function ProductData(){
  this.data={};
  this.dataHasLoaded=false;

  this.loadDataFile=function(filename){
    fetch(filename)
    .then(response => response.json())
    .then(json => console.log(json))
    .then(()=>this.dataHasLoaded=true);
  }

}
