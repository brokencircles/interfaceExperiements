function Sketch6(sketch, param, divName){
    //sketch is the p5 instance passed in
    //param is the parameter picked up from the dive attribute to give some control over how this instance runs

    var cnv, cnvBounds, canvStart, canvEnd;
    var cnvX, cnvY, cnvW, cnvH;
    var cnvAspect=1/1;
    var cnvHMax=400;
    var runLocal=true;
    var assetPath="";
    var localAssetPath="./assets/";
    var hostedAssetPath="";
    //end generic vars

    var sketch6MainObject;
      // var scl=0.01;
    var myDiv;
    var currentNeed;
    var currentChoice;
    var currentChoiceNum,prevChoiceNum;

    this.preload=function(){
      console.log('sketch6 preload');
      // sketchPreload();
    }

    this.setup=function(){
      console.log('p5sketch6 setup with param: '+param);
      myDiv=sketch.select("#"+divName);
      currentNeed=myDiv.attribute('data-need');
      currentChoice=myDiv.attribute('data-choice');
      currentChoiceNum=parseInt(currentChoice,10);
      prevChoiceNum=currentChoiceNum;
      console.log('current param: '+currentNeed+" "+'current choice: '+currentChoice);
      //generic setup section
      if(!runLocal){
        assetPath=hostedAssetPath;
      } else {
        assetPath=localAssetPath;
      }
      console.log("!!! "+myDiv.width);
      setupCanvas(); //works out optimal x,y,w,h based on available window size, aspect and cnvHMax
      console.log(cnvW+" "+ cnvH);
      cnv=sketch.createCanvas(cnvW, cnvH);
      cnv.parent(divName);
      setupCanvasPost();
      console.log("!!! "+myDiv.width);

      //end generic setup

      //do other setup
      sketch6MainObject=new Sketch6MainObject(sketch, null);
        sketch6MainObject.setup(currentChoice);
    };

    this.windowResized=function(){
      setupCanvas();
      sketch.resizeCanvas(cnvW, cnvH);
      setupCanvasPost();
      if(sketch6MainObject && sketch5MainObject.windowResized){
        sketch6MainObject.windowResized();
      }
    }

    function setupCanvas(){
      if(true){
        // if(sketch.windowWidth<sketch.windowHeight*cnvAspect){
        //   cnvW=sketch.windowWidth;
        //   cnvH=cnvW/cnvAspect;
        //   cnvX=0;
        //   cnvY=(sketch.windowHeight-cnvH)/2;
        // } else {
        //   cnvH=sketch.windowHeight;
        //   cnvW=cnvH*cnvAspect;
        //   cnvX=(sketch.windowWidth-cnvW)/2;
        //   cnvY=0;
        // }
        // if(cnvH>cnvHMax){
        //   cnvY=(cnvH-cnvHMax)/2;
        //   cnvH=cnvHMax;
        //   cnvW=cnvH*cnvAspect;
        //   cnvX=(sketch.windowWidth-cnvW)/2;
        // }

        if(myDiv.width<myDiv.height*cnvAspect){
          cnvW=myDiv.width;
          cnvH=cnvW/cnvAspect;
          cnvX=0;
          cnvY=(myDiv.height-cnvH)/2;
        } else {
          cnvH=myDiv.height;
          cnvW=cnvH*cnvAspect;
          cnvX=(myDiv.width-cnvW)/2;
          cnvY=0;
        }

        if(cnvH>cnvHMax){
          cnvY=(cnvH-cnvHMax)/2;
          cnvH=cnvHMax;
          cnvW=cnvH*cnvAspect;
          cnvX=(myDiv.width-cnvW)/2;
        }
        cnvX+=cnvW*0.01;
        cnvY+=cnvH*0.01;
        cnvH*=0.98;
        cnvW*=0.98;
      }

    }

    function setupCanvasPost(){
      cnvBounds=cnv.canvas.getBoundingClientRect();
      var yOff=window.pageYOffset;
      canvStart = yOff+cnvBounds.top;
      canvEnd = yOff+cnvBounds.bottom;
    }

    this.draw=function(scrY){
      sketch.background(100,125,150);
      // param=myDiv.attribute('data-param');
      //generic animate-if-in-full-view
      var isInFullView=(canvStart>scrY && canvEnd<scrY+sketch.windowHeight);
      // console.log(scrY+" "+sketch.windowHeight+" "+isInFullView);
      if(sketch.frameCount<10 || isInFullView ){
              sketch6MainObject.draw(currentNeed);
      } else {
        drawNotFullyInView();
      }
    };

    function drawNotFullyInView(){
      sketch.background(255,135,30);
      sketch.translate(sketch.width/2, sketch.height/2);
      sketch.rotate(-0.1);
      var message="scroll until orange area is fully in view to run";
      sketch.textSize(sketch.height/20);
      var mw=sketch.textWidth(message);
      sketch.fill(100);
      sketch.text(message,-mw/2,0);
    }

    this.stop=function(){
      sketch.noLoop();
    };

    this.start=function(){
      sketch.loop();
    };

    this.mouseMoved=function(){
      sketch6MainObject.mouseMoved();
    }

    this.mouseClicked=function(){
      currentNeed=myDiv.attribute('data-need');
      console.log('current need: '+currentNeed);
      sketch6MainObject.mouseClicked();
      currentChoiceNum=sketch6MainObject.choice;
      if(currentChoiceNum!=prevChoiceNum){
        currentChoice=sketch.nf(currentChoiceNum,2,0);
        // myDiv.attribute('data-choice')=currentChoice;
        var effectiveDiv=document.getElementById("p5sketch6");
        effectiveDiv.dataset.choice=currentChoice;
      }
      prevChoiceNum=currentChoiceNum;
    }

    this.mouseDragged=function(){
      // sketch1MainObject.mouseDragged();
    }

    this.keyPressed=function(){
      // sketch1MainObject.keyPressed();
    }

    // function sketchPreload(){
    //   dopreload();
    // }

    // function sketchSetup(){
    //   dosetup();
    // }

    // function sketchDraw(){
    //   retinaRings.draw();
    // }

    // function dosetup(){
    // 	retinaRings=new RetinaSim(blobData, pics, sketch);
    // 	retinaRings.setup();
    // }

    // function dodraw(){
    // 	retinaRings.draw();
    // }

    // function domouseMoved(){
    // 	sketch1MainObject.mouseMoved();
    // }
    //
    // function domouseClicked(){
    // 	retinaRings.mouseClicked();
    // }
    //
    // function domouseDragged(){
    // 	retinaRings.mouseDragged();
    // }
  }


  function Sketch6MainObject(sketch, otherParams){
      var cnvW=sketch.width;
      var cnvH=sketch.height;
    var hover=false;
    var x=cnvW/2,y=cnvH/2,r=cnvH*0.3,s=cnvH*0.25
    var n=4;

    var needCols=[sketch.color(80,150,120),
                  sketch.color(180,50,80),
                  sketch.color(120,80,150),
                  sketch.color(50,180,80),
                  sketch.color(150,120,50),]

    this.choice=-1;
    var choiceNum=-1;
    var choices=[];

    this.setup=function(choice) {
      this.choice=choice;
      choiceNum=parseInt(this.choice,10);
      var aStep=sketch.TWO_PI/n;
      for(var i=0; i<n; i++){
        choices.push(new Choice(x+sketch.cos(i*aStep)*r, y+sketch.sin(i*aStep)*r,s,i));
      }
          // sketch.pixelDensity(1);
      //other setup code
      };

      this.draw=function(need) {
      // hover=sketch.dist(sketch.mouseX, sketch.mouseY,cnvW/2, cnvH/2)<cnvH*0.25;
      var needNum=parseInt(need,10);
      sketch.fill(needCols[needNum]);
      // sketch.fill(80);
      sketch.noStroke();
      sketch.ellipse(x,y,r*3);
      sketch.textSize(s/3);
      sketch.fill(255);
      sketch.textAlign(sketch.CENTER, sketch.CENTER);
      sketch.text("need",x,y-s/8);
      sketch.textSize(s/3);
      sketch.text(need,x,y+s/4);
      choices.forEach(function(choice){
        choice.show();
      });
      // sketch.push();
      // sketch.translate(cnvW/2, cnvH/2);
      // sketch.noStroke();
      // sketch.fill(hover?255:0);
      // sketch.ellipse(0,0,cnvH*0.5);
      // sketch.rotate(-0.05*sketch.frameCount);
      // sketch.textAlign(sketch.CENTER, sketch.CENTER);
      // sketch.textSize(cnvH/15);
      // sketch.fill(hover?0:255);
      // sketch.text("sketch 6",0,-cnvH/15);
      // sketch.text("param "+currentParam,0,0);
      // sketch.text("choice "+this.choice,0,+cnvH/15);
      // sketch.pop();
      //draw code
      };

    this.windowResized=function(){
      cnvW=sketch.width;
        cnvH=sketch.height;
    };


      this.keyPressed=function(){
          // currentPic=(currentPic+1)%pics.length;
          // pic1=pics[currentPic];
          // setPic();
      };

      this.mouseMoved=function(){

      };

      this.mouseClicked=function(){
      if(true){
        var chosen=-1;
        choices.forEach(function(choice){
          if(choice.click()){
            chosen=choice.id;
          }
        });
        // return chosen;
        // console.log(this.choice);
        // choiceNum=parseInt(this.choice,10);
        // choiceNum++;
        choiceNum=chosen;
        this.choice=sketch.nf(choiceNum,2,0);
        console.log("choice: "+this.choice);
      }
      };

    function Choice(x,y,s,id){
      var hover=false;
      this.id=id;

      this.click=function(){
        return hover;
      }

      this.show=function(){
        hover=sketch.dist(sketch.mouseX, sketch.mouseY, x,y)<s/2;
        sketch.fill(hover?0:180);
        sketch.noStroke();
        if(choiceNum==id){
          sketch.stroke(255);
          sketch.strokeWeight(2);
        }
        sketch.ellipse(x,y,s);
        sketch.textSize(s/2);
        sketch.fill(hover?255:0);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text(sketch.nf(id,2,0),x,y);
      };
    }

  }
