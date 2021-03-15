var globalSketchLoaded=false;
var globalAssets={};

var P5Preloader=function(sketch){

  sketch.preload=function(){
    if(!globalSketchLoaded){
      globalAssets.textures=[];
      for(var i=0; i<9; i++){
        // globalAssets.textures.push(sketch.loadImage('../assets/tx'+i+'.png'));
      }
      globalSketchLoaded=true;
    }
  };
}

var sketchWrapper=function(sketch){
  console.log("setupSketch running");

  //this.div set by calling program to a suitable div id name
  var myDiv;
  var param, codeID;
  var sketchInstance;
  var readyToRun=false;

  sketch.preload=function(){
    // console.log('sketch preload');
    // dopreload(sketch);
  }


  sketch.setup = function(){
    myDiv=sketch.select("#"+this.div);
    console.log(this.div);
    if(myDiv){
      readyToRun=true;
    }
    if(readyToRun){
      param=myDiv.attribute('data-param');
      code=myDiv.attribute('data-code');
      console.log(code+" "+param);
      sketchInstance=new window[code](sketch, param, this.div);
      sketchInstance.setup();
    }
  }

  this.stop=function(){
    console.log("stop "+code+" "+param);
    sketchInstance.stop();
  };

  this.start=function(){
    sketchInstance.start();
  };

  sketch.draw=function(){
    if(readyToRun){
      scrY=window.scrollY;
      sketchInstance.draw(scrY);
    }
  };

  sketch.windowResized=function(){
    if(sketchInstance && sketchInstance.windowResized){
      sketchInstance.windowResized();
    }
  };

  sketch.mouseMoved=function(){
    if(sketchInstance && sketchInstance.mouseMoved){
      sketchInstance.mouseMoved();
    }
  };

  sketch.mouseClicked=function(){
    if(sketchInstance && sketchInstance.mouseClicked){
      sketchInstance.mouseClicked();
    }
  };

  sketch.mouseDragged=function(){
    if(sketchInstance && sketchInstance.mouseDragged){
      sketchInstance.mouseDragged();
    }
  };

  sketch.keyPressed=function(){
    if(sketchInstance && sketchInstance.keyPressed){
      sketchInstance.keyPressed();
    }
  }

  sketch.touchMoved=function(){
    if(sketchInstance && sketchInstance.touchMoved){
      sketchInstance.touchMoved();
    }
  }

  sketch.touchStarted=function(){
    if(sketchInstance && sketchInstance.touchMoved){
      sketchInstance.touchStarted();
    }
  }

  sketch.touchEnded=function(){
    if(sketchInstance && sketchInstance.touchMoved){
      sketchInstance.touchEnded();
    }
  }
}

var p5Instances=[];



p5Preloader=new p5(P5Preloader);

p5Instances[0] = new p5(sketchWrapper);
p5Instances[0].div='p5sketch6';
// p5Instances[0] = new p5(sketchWrapper);
// p5Instances[0].div='p5sketch1';
// p5Instances[1] = new p5(sketchWrapper);
// p5Instances[1].div='p5sketch2';
// p5Instances[2] = new p5(sketchWrapper);
// p5Instances[2].div='p5sketch3';
// p5Instances[3] = new p5(sketchWrapper);
// p5Instances[3].div='p5sketch4';
// p5Instances[4] = new p5(sketchWrapper);
// p5Instances[4].div='p5sketch5';
// p5Instances[5] = new p5(sketchWrapper);
// p5Instances[5].div='p5sketch6';


var stopAll=function(){
  p5Instances.forEach(function(p5i){
    p5i.noLoop();
  });
};

var startAll=function(){
  p5Instances.forEach(function(p5i){
    p5i.loop();
  });
}
