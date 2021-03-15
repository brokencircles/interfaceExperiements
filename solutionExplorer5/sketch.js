// var displayFont="Homemade Apple";
// var displayFont="Barriecito";

// var selector, solution;
// var loadedData;
// var explorer;
// var offsetRef=0;

// var productImage=[];
var productData=pd;
var pes;
// var productAspects=["materials","manufacture","useful life", "hackable", "repairable", "reuse", "retained value","price"];


function preload(){
  // loadedData=loadJSON('data.json');
  // productImage[0]=loadImage('images/duck.png');
  // productImage[1]=loadImage('images/tinkebuCow.png');
  // productImage[2]=loadImage('images/bunny.png');
}

function setup() {
  createCanvas(windowWidth, windowWidth*8/16);
  pes=new ProductExplorerSketch(pd, width, height);
  // offsetRef=height/2;
  // explorer=new Explorer(height/2, height/2, height*0.1);

}

function draw() {
  colorMode(RGB);
  background(220);
  // explorer.run();
  // explorer.show();
  pes.run();
}

function mousePressed(){
  pes.click();
}

function ProductExplorerSketch(pd,cw,ch){
  // var displayFont="Homemade Apple";
  var displayFont="Barriecito";
  var explorer;
  var offsetRef=0;
  offsetRef=height/2;
  explorer=new Explorer(height/2, height/2, height*0.1);

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
    var offsetA=-PI*0.25;
    var origin=createVector(x,y);
    var currentOffset=createVector(0,0);
    var targetOffset=createVector(0,0);
    var currentA=0;
    var targetA=0;
    var rot=0;//PI/500;
    var currentScale=1;
    var targetScale=1.2;
    var productOptions=[];
    var aStep=TWO_PI/n;
    var hover=false;
    var productRevealed=false;

    var ringVerts=[];
    var numVerts=50;
    var noiseFactor=0.2;
    var ease=14;

    var ringAStep=TWO_PI/numVerts;
    for(var i=0; i<numVerts*3; i++){
      var vx=x+cos(i*ringAStep)*s*2;
      var vy=y+sin(i*ringAStep)*s*2;
      var nv=noise(i*s/1000+vx*s/1000,vy*s/1000)-0.5;
      vx=x+cos(i*ringAStep)*s*(0.9+nv*0.2)*2;
      vy=x+sin(i*ringAStep)*s*(0.9+nv*0.2)*2;
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
        targetOffset=createVector(0,0);
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
          targetOffset=createVector(cos(offsetA)*selected.l, sin(offsetA)*selected.l).mult(-1);
          targetA=-selected.a;
          targetScale=4;
        }
      }
    }

    this.run=function(){
      productRevealed=false;
      var diffScl=targetScale-currentScale;
      if(abs(diffScl)>0.01){
        currentScale+=diffScl/ease;
      } else {
        currentScale=targetScale;
      }
      productRevealed=targetScale==4 && abs(diffScl)<0.5;
      var diff=p5.Vector.sub(targetOffset,currentOffset);
      if(diff.mag()>0.01){
        currentOffset.add(diff.mult(0.05));
      }
      var diffA=wrapAtPi(targetA-currentA);
      if(abs(diffA)>0.001){
        currentA+=diffA/ease;//=(currentA+TWO_PI+diffA/20)%TWO_PI;
      } else {
        currentA=targetA;
      }
      hover=dist(mouseX, mouseY,transform(origin.x+currentOffset.x,offsetRef,currentScale),transform(origin.y+currentOffset.y,height/2,currentScale))<s*currentScale;
    };

    function wrapAtPi(a){
      if(a>=PI) return -TWO_PI+a;
      if(a<-PI) return TWO_PI+a;
      return a;
    }

    this.show=function(){
      push();
      translate(offsetRef, height/2);
      scale(currentScale);
      translate(-offsetRef, -height/2);

      var hovered=false;
      fill(hover?200:140);
      noStroke();
      ellipse(origin.x+currentOffset.x,origin.y+currentOffset.y,s*2);
      stroke(40,160);
      strokeWeight(s*0.05);
      noFill();
      beginShape();
      ringVerts.forEach(function(rv){
        vertex(rv.x, rv.y);
      });
      endShape(CLOSE);
      fill(hover?0:255);
      noStroke();
      textFont(displayFont);
      textSize(s/1);
      textAlign(CENTER, CENTER);
      text('toy',origin.x+currentOffset.x,origin.y+currentOffset.y);
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
      pop();
    };




    function ExploreProduct(id,origin,a,l,s,n){
      this.isSelected=false;
      var productExplorer=new ProductExplorer(s*2);
      this.origin=origin;
      this.a=a;
      this.l=l;
      this.currX=this.origin.x+cos(this.a)*this.l;
      this.currY=this.origin.y+sin(this.a)*this.l;
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
        this.currX=this.origin.x+cos(givenA+this.a)*this.l;
        this.currY=this.origin.y+sin(givenA+this.a)*this.l;
        this.hover=dist(mouseX, mouseY, transform(this.currX, offsetRef,scl), transform(this.currY,height/2,scl))<s*scl/2;
        var diffA=targetA-currentA;
        if(abs(diffA)>0.001){
          currentA+=diffA/ease;
        } else {
          currentA=targetA;
        }
      };

      this.show=function(givenA, scl){
        colorMode(RGB);
        push();
        stroke(255);
        strokeWeight(s*0.1);
        translate(this.currX, this.currY);
        fill(200,180);
        noStroke();
        ellipse(0,0,s*2);
        fill(this.hover?80:200);
        ellipse(0,0,s);
        fill(this.hover?0:255);
        textFont('arial');
        textAlign(CENTER, CENTER);
        textSize(s/2);
        text(id,0,0);
        pop();
        productExplorer.show(this.currX, this.currY, scl, productRevealed, this.isSelected, this.hover);
      };
    }


    function ProductExplorer(s){
      var x0=0,y0=0,s0=s,x1=0,y1=0,w1=s/2,h1=s/2;
      var vrs=[];
      var numVals=8;
      ox=x0;
      oy=y0;
      colorMode(HSB);
      var aStep=TWO_PI/numVals;
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
        loadImage(productImagePath, function(img){
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
        colorMode(HSB);
        blendMode(BLEND);
        var md=dist(mouseX, mouseY, ox,oy);
        var ma=atan2(mouseY-oy, mouseX-ox);
        ma+=PI/2;
        if(ma<0){
          ma=TWO_PI+ma;
        }
        if(productRevealed && isSelected){
          fill(0,0,80,0.7);
          noStroke();
          rectMode(CORNER);
          rect(x1-s*0.1,y1-s*0.1,s*0.8,s*0.7);
        }

        blendMode(MULTIPLY);
        vrs.forEach(function(vr){
          vr.showVals();
        });
        blendMode(BLEND);
        if(productImage){
          imageMode(CENTER);
          image(productImage,x0,y0,s0/3,s0/3);
        }
        vrs.forEach(function(vr){
          vr.run(x0,y0,x1,y1,mouseX,mouseY,ma,md,scl, productRevealed, isSelected);

          vr.showFixtures();
        });
        if(productData && (hover || (productRevealed && isSelected))){
          fill(0,180);
          noStroke();
          textFont(displayFont);
          textSize(s0/6);
          textAlign(CENTER,CENTER);
          text(productData.productName,x1,y1-s0/2);
        }
        colorMode(RGB);

      };
    }

    function ValueRing(id,rel,x,y,s,a,aStep,label,x1,y1,l1){
      var val=0;//random();
      var r=s/2;
      var c=r*0.55;
      var er=r+r*val;
      var mr=r*2;
      var cHue=rel*360;
      var nxOff=random(10);
      var nyOff=random(10);
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
          var n=noise(nxOff+i/10,y1)-0.5;
          vertsLine.push({x:i*l1/pointsPerSeg, y:y1+drift*n});
        }

        for(var i=0; i<pointsPerSeg; i++){
          var px=bezierPoint(r,r,c,0,i/pointsPerSeg);
          var py=bezierPoint(0,c,r,r,i/pointsPerSeg);
          verts.push({x:px, y:py});
        }
        for(var i=0; i<pointsPerSeg; i++){
          var px=bezierPoint(0,-c,-r,-r,i/pointsPerSeg);
          var py=bezierPoint(r,r,c,0,i/pointsPerSeg);
          verts.push({x:px, y:py});
        }
        for(var i=0; i<pointsPerSeg; i++){
          var px=bezierPoint(-r,-r,-c,0,i/pointsPerSeg);
          var py=bezierPoint(0,-c,-er,-er,i/pointsPerSeg);
          verts.push({x:px, y:py});
        }
        for(var i=0; i<pointsPerSeg; i++){
          var px=bezierPoint(0,c,r,r,i/pointsPerSeg);
          var py=bezierPoint(-er,-er,-c,0,i/pointsPerSeg);
          verts.push({x:px, y:py});
        }
        verts.forEach(function(v){
          var nx=noise(nxOff+v.x/(10*noiseStep),v.y/(10*noiseStep))-0.5;
          var ny=noise(nyOff+v.x/(8*noiseStep),v.y/(7*noiseStep))-0.5;
          v.x+=nx*drift;
          v.y+=ny*drift;
        });
        var aStep=TWO_PI/pointsPerSeg;
        var ir=r*0.9;
        for(var i=0; i<pointsPerSeg; i++){
          var px=x+cos(i*aStep)*ir;
          var py=y+sin(i*aStep)*ir;
          var n=noise(nxOff+px/noiseStep, nyOff+py/noiseStep-0.5);
          px=cos(TWO_PI-i*aStep)*ir*(0.9+0.2*n);
          py=sin(TWO_PI-i*aStep)*ir*(0.9+0.2*n);
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
        textFont(displayFont);
        if(productRevealed && isSelected){
          push();
          translate(x1,y1);
          stroke(0,0,10);
          strokeWeight(s*0.01);
          noFill();
          beginShape();
          vertsLine.forEach(function(v,i){
            if(i/pointsPerSeg>=val){
              vertex(v.x, v.y);
            }
          });
          endShape();
          noStroke();
          fill(0,0,0);
          noStroke();
          textAlign(LEFT, CENTER);
          textSize(s*0.1);
          text(nf(val*5,1,1),vertsLine[vertsLine.length-1].x+s*0.1, vertsLine[0].y);
          textSize(s*0.08);
          text(label,vertsLine[0].x, vertsLine[0].y-s*0.05);
          pop();
        }
        push();
        translate(x,y);
        rotate(a);
        stroke(cHue,40,60);
        strokeWeight(s*(hover?0.02:0.005));
        noFill();
        beginShape();
        vertex(r,0);
        bezierVertex(r,c, c,r, 0,r);
        bezierVertex(-c,r ,-r,c, -r,0);
        bezierVertex(-r,-c, -c,-mr, 0,-mr);
        bezierVertex(c,-mr, r,-c, r,0);
        endShape();
        noStroke();
        fill(0,0,0);
        noStroke();
        if(hover && productRevealed && isSelected){
          textAlign(CENTER, CENTER);
          textSize(s*0.1);
          text(nf(val*5,1,1),0,-r*1.7);
          textSize(s*0.08);
          text(label,0,-r*1.4);
        }

        pop();
        factoids.forEach(function(factoid){
          factoid.run(productRevealed && isSelected && hover);
          factoid.show(x,y);
        });


      };

      this.showVals=function(){

        if(productRevealed && isSelected){
          push();
          translate(x,y);
          rotate(a);
          noStroke();
          fill(cHue,70,hover?100:80,hover?1:0.3);

          beginShape();
          verts.forEach(function(v){
            vertex(v.x, v.y);
          });
          beginContour();
          iVerts.forEach(function(iv){
            vertex(iv.x, iv.y);
          });
          endContour();
          endShape();

          pop();
          push();
          translate(x1,y1);
          stroke(cHue,hover?70:50,hover?100:70,1);
          strokeWeight(s*(hover?0.1:0.06));
          noFill();
          beginShape();
          vertsLine.forEach(function(v,i){
            if(i/pointsPerSeg<val){
              vertex(v.x, v.y);
            }
          });
          endShape();
          pop();
        }
      };

    }

    function Factoid(x,y,s,relR,a,fact){
      var r=s/2+relR*s/2;
      var unfurl=0;
      var ufRate=0.2;
      var vertsLine=[];
      var nxOff=random(10);
      var drift=s*0.1;
      textFont(displayFont);
      textSize(s*0.07);
      var tw=textWidth(fact);
      var l=s*0.5+tw*1.5;//s*1.5;
      var pointsPerSeg=floor(10*l/s*3);

      var aDriftRange=0.4;
      var aDrift=0;
      var aDriftRate=random(30,100);

      for(var i=0; i<pointsPerSeg; i++){
        var n=noise(nxOff+i/10,y)-0.5;
        vertsLine.push({x:i*l/pointsPerSeg, y:0+drift*n});
      }

      this.run=function(hover){
        if(unfurl>0){
          aDrift=(noise(nxOff+0-frameCount/50)-0.5)*aDriftRange;
          for(var i=0; i<pointsPerSeg; i++){
            var n=noise(nxOff+i/10-frameCount/50,y)-0.5;
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
        push();
        translate(x,y);
        rotate(-PI/2+a);
        translate(r,0);
        if(unfurl>0){
          stroke(0,0,20,0.7);
          noFill();
          strokeWeight(s*0.15);
          strokeCap(SQUARE);
          rotate(-a+PI/2-PI/20+aDrift);
          scale(unfurl,1);
          beginShape();
          vertsLine.forEach(function(v){
            vertex(v.x, v.y);
          });
          endShape();
          noStroke();
          fill(0,0,100);
          textFont(displayFont);
          textSize(s*0.07);
          textAlign(LEFT,CENTER);
          text(fact,s*0.2,0);
        }
        pop();
      };
    }
  }
}
