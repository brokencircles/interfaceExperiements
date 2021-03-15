function SketchProduct(sketch, param, divName){
    //sketch is the p5 instance passed in
    //param is the parameter picked up from the dive attribute to give some control over how this instance runs

    var cnv, cnvBounds, canvStart, canvEnd;
    var cnvX, cnvY, cnvW, cnvH;
    var cnvAspect=2/1;
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
      setupCanvas(); //works out optimal x,y,w,h based on available window size, aspect and cnvHMax
      console.log(cnvW+" "+ cnvH);
      cnv=sketch.createCanvas(cnvW, cnvH);
      cnv.parent(divName);
      setupCanvasPost();
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
      var dw=myDiv.width;
      var dh=myDiv.height;
      dh=dw*3/4;
      console.log(dw,dh);

      if(true){
      //   if(sketch.windowWidth<sketch.windowHeight*cnvAspect){
      //     cnvW=sketch.windowWidth;
      //     cnvH=cnvW/cnvAspect;
      //     cnvX=0;
      //     cnvY=(sketch.windowHeight-cnvH)/2;
      //   } else {
      //     cnvH=sketch.windowHeight;
      //     cnvW=cnvH*cnvAspect;
      //     cnvX=(sketch.windowWidth-cnvW)/2;
      //     cnvY=0;
      //   }
      //   if(cnvH>cnvHMax){
      //     cnvY=(cnvH-cnvHMax)/2;
      //     cnvH=cnvHMax;
      //     cnvW=cnvH*cnvAspect;
      //     cnvX=(sketch.windowWidth-cnvW)/2;
      //   }

        if(dw<dh*cnvAspect){
          cnvW=dw;
          cnvH=cnvW/cnvAspect;
          cnvX=0;
          cnvY=(dh-cnvH)/2;
        } else {
          cnvH=dh;
          cnvW=cnvH*cnvAspect;
          cnvX=(dw-cnvW)/2;
          cnvY=0;
        }

        if(cnvH>cnvHMax){
          cnvY=(cnvH-cnvHMax)/2;
          cnvH=cnvHMax;
          cnvW=cnvH*cnvAspect;
          cnvX=(dw-cnvW)/2;
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
    var productData=pd; //where are we getting pd from? global? how do we know?
    var pes;

    this.choice=-1;
    var choiceNum=-1;

    this.setup=function(choice) {
      // this.choice=choice;
      // choiceNum=parseInt(this.choice,10);
      pes=new ProductExplorerSketch(sketch, pd, cnvW, cnvH);
    };

    this.draw=function(need) {
      sketch.colorMode(sketch.RGB);
      sketch.background(220);
      // explorer.run();
      // explorer.show();
      pes.run();
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
        pes.click();
      }
    };



  }

function ProductExplorerSketch(sketch, pd,cw,ch){
  // var displayFont="Homemade Apple";
  var displayFont="Barriecito";
  var explorer;
  var offsetRef=0;
  offsetRef=ch/2;
  explorer=new Explorer(ch/2, ch/2, ch*0.1);

  this.run=function(){
    explorer.run();
    explorer.show();
  };

  this.click=function(){
    explorer.click();
  };


  function transform(scalar,origin,scl){
    return (scalar-origin)*scl+origin;
  }

  function Explorer(x,y,s){
    var n=3;
    var offsetA=-sketch.PI*0.25;
    var origin=sketch.createVector(x,y);
    var currentOffset=sketch.createVector(0,0);
    var targetOffset=sketch.createVector(0,0);
    var currentA=0;
    var targetA=0;
    var rot=0;//PI/500;
    var currentScale=1;
    var targetScale=1.2;
    var productOptions=[];
    var aStep=sketch.TWO_PI/n;
    var hover=false;
    var productRevealed=false;

    var ringVerts=[];
    var numVerts=50;
    var noiseFactor=0.2;
    var ease=14;

    var ringAStep=sketch.TWO_PI/numVerts;
    for(var i=0; i<numVerts*3; i++){
      var vx=x+sketch.cos(i*ringAStep)*s*2;
      var vy=y+sketch.sin(i*ringAStep)*s*2;
      var nv=sketch.noise(i*s/1000+vx*s/1000,vy*s/1000)-0.5;
      vx=x+sketch.cos(i*ringAStep)*s*(0.9+nv*0.2)*2;
      vy=x+sketch.sin(i*ringAStep)*s*(0.9+nv*0.2)*2;
      ringVerts.push({x:vx, y:vy});
    }
    var loadedImages=0;
    for(var i=0; i<n; i++){
      var p=new ExploreProduct(i,p5.Vector.add(origin,currentOffset), i*aStep,s*2,s*1,8);
      p.assignProduct(pd.data.productData[i],"images/"+pd.data.productData[i].imageFile+".png");
      productOptions.push(p);
    }

    this.click=function(){
      var selected=null;
      if(hover){
        targetOffset=sketch.createVector(0,0);
        targetA=0;
        targetScale=1.2;
        productOptions.forEach(function(option,i){
          option.isSelected=false;
        });
      } else {
        productOptions.forEach(function(option,i){
          // option.isSelected=false;
          option.click();
          if(option.hover){
            selected=option;
            option.isSelected=true;
          }
        });

        if(selected){
          targetOffset=sketch.createVector(sketch.cos(offsetA)*selected.l, sketch.sin(offsetA)*selected.l).mult(-1);
          targetA=-selected.a;
          targetScale=4;
        }
      }
    }

    this.run=function(){
      productRevealed=false;
      var diffScl=targetScale-currentScale;
      if(sketch.abs(diffScl)>0.01){
        currentScale+=diffScl/ease;
      } else {
        currentScale=targetScale;
      }
      productRevealed=targetScale==4 && sketch.abs(diffScl)<0.5;
      var diff=p5.Vector.sub(targetOffset,currentOffset);
      if(diff.mag()>0.01){
        currentOffset.add(diff.mult(0.05));
      }
      var diffA=wrapAtPi(targetA-currentA);
      if(sketch.abs(diffA)>0.001){
        currentA+=diffA/ease;//=(currentA+TWO_PI+diffA/20)%TWO_PI;
      } else {
        currentA=targetA;
      }
      hover=sketch.dist(sketch.mouseX, sketch.mouseY,transform(origin.x+currentOffset.x,offsetRef,currentScale),transform(origin.y+currentOffset.y,ch/2,currentScale))<s*currentScale;
    };

    function wrapAtPi(a){
      if(a>=sketch.PI) return -sketch.TWO_PI+a;
      if(a<-sketch.PI) return sketch.TWO_PI+a;
      return a;
    }

    this.show=function(){
      sketch.push();
      sketch.translate(offsetRef, ch/2);
      sketch.scale(currentScale);
      sketch.translate(-offsetRef, -ch/2);

      var hovered=false;
      sketch.fill(hover?200:140);
      sketch.noStroke();
      sketch.ellipse(origin.x+currentOffset.x,origin.y+currentOffset.y,s*2);
      sketch.stroke(40,160);
      sketch.strokeWeight(s*0.05);
      sketch.noFill();
      sketch.beginShape();
      ringVerts.forEach(function(rv){
        sketch.vertex(rv.x, rv.y);
      });
      sketch.endShape(sketch.CLOSE);
      sketch.fill(hover?0:255);
      sketch.noStroke();
      sketch.textFont(displayFont);
      sketch.textSize(s/1);
      sketch.textAlign(sketch.CENTER, sketch.CENTER);
      sketch.text('toy',origin.x+currentOffset.x,origin.y+currentOffset.y);
      productOptions.forEach(function(option,i){
        option.run(currentA+offsetA, currentScale, productRevealed);
        option.show(currentA+offsetA, currentScale);
        if(option.hover){
          hovered=true;
        }
        option.origin=p5.Vector.add(origin,currentOffset);
      });
      if(!hovered){
        currentA+=rot;
      }
      sketch.pop();
    };




    function ExploreProduct(id,origin,a,l,s,n){
      this.isSelected=false;
      var productExplorer=new ProductExplorer(s*2);
      this.origin=origin;
      this.a=a;
      this.l=l;
      this.currX=this.origin.x+sketch.cos(this.a)*this.l;
      this.currY=this.origin.y+sketch.sin(this.a)*this.l;
      this.hover=false;
      this.aspectHover=false;
      var self=this;
      var currentA=0;
      var targetA=0;
      var productRevealed=false;

      this.assignProduct=function(productData, productImage){
        productExplorer.assignProduct(productData,productImage);
      }

      this.click=function(){
      };

      this.run=function(givenA, scl, revealed){
        productRevealed=revealed;
        this.currX=this.origin.x+sketch.cos(givenA+this.a)*this.l;
        this.currY=this.origin.y+sketch.sin(givenA+this.a)*this.l;
        this.hover=sketch.dist(sketch.mouseX, sketch.mouseY, transform(this.currX, offsetRef,scl), transform(this.currY,ch/2,scl))<s*scl/2;
        var diffA=targetA-currentA;
        if(sketch.abs(diffA)>0.001){
          currentA+=diffA/ease;
        } else {
          currentA=targetA;
        }
      };

      this.show=function(givenA, scl){
        sketch.colorMode(sketch.RGB);
        sketch.push();
        sketch.stroke(255);
        sketch.strokeWeight(s*0.1);
        sketch.translate(this.currX, this.currY);
        sketch.fill(200,180);
        sketch.noStroke();
        sketch.ellipse(0,0,s*2);
        sketch.fill(this.hover?80:200);
        sketch.ellipse(0,0,s);
        sketch.fill(this.hover?0:255);
        sketch.textFont('arial');
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.textSize(s/2);
        sketch.text(id,0,0);
        sketch.pop();
        productExplorer.show(this.currX, this.currY, scl, productRevealed, this.isSelected, this.hover);
      };
    }


    function ProductExplorer(s){
      var x0=0,y0=0,s0=s,x1=0,y1=0,w1=s/2,h1=s/2;
      var vrs=[];
      var numVals=8;
      ox=x0;
      oy=y0;
      sketch.colorMode(sketch.HSB);
      var aStep=sketch.TWO_PI/numVals;
      yStep1=h1/(numVals-1);
      for(var i=0; i<numVals; i++){
        vrs.push(new ValueRing(i, i/numVals,ox, oy,s0/2,(0.5+i)*aStep,aStep,null,x1,y1+i*yStep1,w1));
      }

      var productImagePath=null;
      var productImage=null;
      var productData=null;

      this.assignProduct=function(data,img){
        productImagePath=img;
        productData=data;
        sketch.loadImage(productImagePath, function(img){
          productImage=img;
        });
        var raKeys=Object.keys(productData.ratedAspects);
        raKeys.forEach(function(rak,i){
          vrs[i].assignData(rak,productData.ratedAspects[rak]);
        });
      }

      this.show=function(cx,cy,scl,productRevealed, isSelected, hover){
        ox=x0=cx;
        oy=y0=cy;
        x1=x0+s;
        y1=y0-s/4;
        sketch.colorMode(sketch.HSB);
        sketch.blendMode(sketch.BLEND);
        var md=sketch.dist(sketch.mouseX, sketch.mouseY, ox,oy);
        var ma=sketch.atan2(sketch.mouseY-oy, sketch.mouseX-ox);
        ma+=sketch.PI/2;
        if(ma<0){
          ma=sketch.TWO_PI+ma;
        }
        if(productRevealed && isSelected){
          sketch.fill(0,0,80,0.7);
          sketch.noStroke();
          sketch.rectMode(sketch.CORNER);
          sketch.rect(x1-s*0.1,y1-s*0.1,s*0.8,s*0.7);
        }

        sketch.blendMode(sketch.MULTIPLY);
        vrs.forEach(function(vr){
          vr.showVals();
        });
        sketch.blendMode(sketch.BLEND);
        if(productImage){
          sketch.imageMode(sketch.CENTER);
          sketch.image(productImage,x0,y0,s0/3,s0/3);
        }
        vrs.forEach(function(vr){
          vr.run(x0,y0,x1,y1,sketch.mouseX,sketch.mouseY,ma,md,scl, productRevealed, isSelected);

          vr.showFixtures();
        });
        if(productData && (hover || (productRevealed && isSelected))){
          sketch.fill(0,180);
          sketch.noStroke();
          sketch.textFont(displayFont);
          sketch.textSize(s0/6);
          sketch.textAlign(sketch.CENTER,sketch.CENTER);
          sketch.text(productData.productName,x1,y1-s0/2);
        }
        sketch.colorMode(sketch.RGB);

      };
    }

    function ValueRing(id,rel,x,y,s,a,aStep,label,x1,y1,l1){
      var val=0;//random();
      var r=s/2;
      var c=r*0.55;
      var er=r+r*val;
      var mr=r*2;
      var cHue=rel*360;
      var nxOff=sketch.random(10);
      var nyOff=sketch.random(10);
      var verts=[];
      var iVerts=[];
      var pointsPerSeg=50;
      var drift=s*0.1;
      var noiseStep=s/30;
      var sa=a-aStep*0.45;
      var ea=a+aStep*0.45;
      var hover=false;
      var vertsLine=[];
      var open=0;
      var productRevealed=false;
      var isSelected=false;
      var aspectData=null;

      var factoids=[];

      this.assignData=function(lab,data){
        val=data.rating/5;
        label=lab;
        data.features.forEach(function(f,i){
          if(i<3){
            factoids.push(new Factoid(x,y,s,0.2+i*0.3,sa+aStep*0.1+i*0.4, f));
          }
        });
        buildVerts();
      };

      function buildVerts(){
        er=r+r*val;
        for(var i=0; i<pointsPerSeg; i++){
          var n=sketch.noise(nxOff+i/10,y1)-0.5;
          vertsLine.push({x:i*l1/pointsPerSeg, y:y1+drift*n});
        }

        for(var i=0; i<pointsPerSeg; i++){
          var px=sketch.bezierPoint(r,r,c,0,i/pointsPerSeg);
          var py=sketch.bezierPoint(0,c,r,r,i/pointsPerSeg);
          verts.push({x:px, y:py});
        }
        for(var i=0; i<pointsPerSeg; i++){
          var px=sketch.bezierPoint(0,-c,-r,-r,i/pointsPerSeg);
          var py=sketch.bezierPoint(r,r,c,0,i/pointsPerSeg);
          verts.push({x:px, y:py});
        }
        for(var i=0; i<pointsPerSeg; i++){
          var px=sketch.bezierPoint(-r,-r,-c,0,i/pointsPerSeg);
          var py=sketch.bezierPoint(0,-c,-er,-er,i/pointsPerSeg);
          verts.push({x:px, y:py});
        }
        for(var i=0; i<pointsPerSeg; i++){
          var px=sketch.bezierPoint(0,c,r,r,i/pointsPerSeg);
          var py=sketch.bezierPoint(-er,-er,-c,0,i/pointsPerSeg);
          verts.push({x:px, y:py});
        }
        verts.forEach(function(v){
          var nx=sketch.noise(nxOff+v.x/(10*noiseStep),v.y/(10*noiseStep))-0.5;
          var ny=sketch.noise(nyOff+v.x/(8*noiseStep),v.y/(7*noiseStep))-0.5;
          v.x+=nx*drift;
          v.y+=ny*drift;
        });
        var aStep=sketch.TWO_PI/pointsPerSeg;
        var ir=r*0.9;
        for(var i=0; i<pointsPerSeg; i++){
          var px=x+sketch.cos(i*aStep)*ir;
          var py=y+sketch.sin(i*aStep)*ir;
          var n=sketch.noise(nxOff+px/noiseStep, nyOff+py/noiseStep-0.5);
          px=sketch.cos(sketch.TWO_PI-i*aStep)*ir*(0.9+0.2*n);
          py=sketch.sin(sketch.TWO_PI-i*aStep)*ir*(0.9+0.2*n);
          iVerts.push({x:px, y:py});
        }
      }

      this.run=function(cx,cy,lx,ly,mx,my,ma,md,scl, revealed, selected){
        productRevealed=revealed;
        isSelected=selected;
        x=cx;
        y=cy;
        x1=lx;
        y1=ly;
        var isInR=md>r*scl && md<mr*scl;
        var isInA=(ma>sa && ma<ea);
        hover=isInA && isInR;
      };

      this.showFixtures=function(){
        sketch.textFont(displayFont);
        if(productRevealed && isSelected){
          sketch.push();
          sketch.translate(x1,y1);
          sketch.stroke(0,0,10);
          sketch.strokeWeight(s*0.01);
          sketch.noFill();
          sketch.beginShape();
          vertsLine.forEach(function(v,i){
            if(i/pointsPerSeg>=val){
              sketch.vertex(v.x, v.y);
            }
          });
          sketch.endShape();
          sketch.noStroke();
          sketch.fill(0,0,0);
          sketch.noStroke();
          sketch.textAlign(sketch.LEFT, sketch.CENTER);
          sketch.textSize(s*0.1);
          sketch.text(sketch.nf(val*5,1,1),vertsLine[vertsLine.length-1].x+s*0.1, vertsLine[0].y);
          sketch.textSize(s*0.08);
          sketch.text(label,vertsLine[0].x, vertsLine[0].y-s*0.05);
          sketch.pop();
        }
        sketch.push();
        sketch.translate(x,y);
        sketch.rotate(a);
        sketch.stroke(cHue,40,60);
        sketch.strokeWeight(s*(hover?0.02:0.005));
        sketch.noFill();
        sketch.beginShape();
        sketch.vertex(r,0);
        sketch.bezierVertex(r,c, c,r, 0,r);
        sketch.bezierVertex(-c,r ,-r,c, -r,0);
        sketch.bezierVertex(-r,-c, -c,-mr, 0,-mr);
        sketch.bezierVertex(c,-mr, r,-c, r,0);
        sketch.endShape();
        sketch.noStroke();
        sketch.fill(0,0,0);
        sketch.noStroke();
        if(hover && productRevealed && isSelected){
          sketch.textAlign(sketch.CENTER, sketch.CENTER);
          sketch.textSize(s*0.1);
          sketch.text(sketch.nf(val*5,1,1),0,-r*1.7);
          sketch.textSize(s*0.08);
          sketch.text(label,0,-r*1.4);
        }

        sketch.pop();
        factoids.forEach(function(factoid){
          factoid.run(productRevealed && isSelected && hover);
          factoid.show(x,y);
        });


      };

      this.showVals=function(){

        if(productRevealed && isSelected){
          sketch.push();
          sketch.translate(x,y);
          sketch.rotate(a);
          sketch.noStroke();
          sketch.fill(cHue,70,hover?100:80,hover?1:0.3);

          sketch.beginShape();
          verts.forEach(function(v){
            sketch.vertex(v.x, v.y);
          });
          sketch.beginContour();
          iVerts.forEach(function(iv){
            sketch.vertex(iv.x, iv.y);
          });
          sketch.endContour();
          sketch.endShape();

          sketch.pop();
          sketch.push();
          sketch.translate(x1,y1);
          sketch.stroke(cHue,hover?70:50,hover?100:70,1);
          sketch.strokeWeight(s*(hover?0.1:0.06));
          sketch.noFill();
          sketch.beginShape();
          vertsLine.forEach(function(v,i){
            if(i/pointsPerSeg<val){
              sketch.vertex(v.x, v.y);
            }
          });
          sketch.endShape();
          sketch.pop();
        }
      };

    }

    function Factoid(x,y,s,relR,a,fact){
      var r=s/2+relR*s/2;
      var unfurl=0;
      var ufRate=0.2;
      var vertsLine=[];
      var nxOff=sketch.random(10);
      var drift=s*0.1;
      sketch.textFont(displayFont);
      sketch.textSize(s*0.07);
      var tw=sketch.textWidth(fact);
      var l=s*0.5+tw*1.5;//s*1.5;
      var pointsPerSeg=sketch.floor(10*l/s*3);

      var aDriftRange=0.4;
      var aDrift=0;
      var aDriftRate=sketch.random(30,100);

      for(var i=0; i<pointsPerSeg; i++){
        var n=sketch.noise(nxOff+i/10,y)-0.5;
        vertsLine.push({x:i*l/pointsPerSeg, y:0+drift*n});
      }

      this.run=function(hover){
        if(unfurl>0){
          aDrift=(sketch.noise(nxOff+0-sketch.frameCount/50)-0.5)*aDriftRange;
          for(var i=0; i<pointsPerSeg; i++){
            var n=sketch.noise(nxOff+i/10-sketch.frameCount/50,y)-0.5;
            vertsLine[i]={x:i*l/pointsPerSeg, y:0+drift*n};
          }
        }
        if(hover){
          if(unfurl<1){
            unfurl+=ufRate;
          } else {
            unfurl=1;
          }
        } else {
          if(unfurl>0){
            unfurl-=ufRate*2;
          } else {
            unfurl=0;
          }
        }
      };

      this.show=function(x,y){
        sketch.push();
        sketch.translate(x,y);
        sketch.rotate(-sketch.PI/2+a);
        sketch.translate(r,0);
        if(unfurl>0){
          sketch.stroke(0,0,20,0.7);
          sketch.noFill();
          sketch.strokeWeight(s*0.15);
          sketch.strokeCap(sketch.SQUARE);
          sketch.rotate(-a+sketch.PI/2-sketch.PI/20+aDrift);
          sketch.scale(unfurl,1);
          sketch.beginShape();
          vertsLine.forEach(function(v){
            sketch.vertex(v.x, v.y);
          });
          sketch.endShape();
          sketch.noStroke();
          sketch.fill(0,0,100);
          sketch.textFont(displayFont);
          sketch.textSize(s*0.07);
          sketch.textAlign(sketch.LEFT,sketch.CENTER);
          sketch.text(fact,s*0.2,0);
        }
        sketch.pop();
      };
    }
  }
}
