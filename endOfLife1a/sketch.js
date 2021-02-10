/*TODO
multi purchase
reduce previous purchase, or move up to score board.
keep soem score of harms next to me
represent me
bought ripples die after 10?
consequence ripples continue.
map the data model needed and the kind of data.
*/

var ripples;
var consequences = [];
var purhase;

function setup() {
  createCanvas(600, 400);
  generateConsequences(5);
  ripples = new ConsequenceRipples(0, 0, width, height);
  ripples.addConsequences(consequences);
  purchase = new Purchase(width / 2, height * 0.1, width * 0.1);
}

function draw() {
  background(120);
  ripples.run();
  var harms=ripples.getDeveloped();
  if(harms.length>0){
    purchase.addHarm(harms);
  }
  purchase.run();
  purchase.show();
}

function mousePressed() {
  ripples.cause();
  purchase.buy();
}

function generateConsequences(n) {
  for (var i = 0; i < n; i++) {
    var a = random();
    var r = random();
    var message = "random text about the harm";
    consequences.push({
      a: a,
      r: r,
      message: message
    });
  }
}



function Purchase(x, y, s) {
  var bought = false;
  var harms=[];

  this.addHarm=function(newHarms){
    newHarms.forEach(function(nh){
      harms.push(nh);
    });
    newHarms=[];
  };

  this.run=function(){
    harms.forEach(function(harm,i){
      harm.migrateTo(x+(i+1.5)*s*0.75,y,s/4,s);
      harm.activate(0,0,0);
      harm.show();
    });
    harms.forEach(function(harm) {
      harm.showInfo();
    });
  };

  this.buy = function() {
    bought = true;
  };

  this.show = function() {
    fill(!bought ? 255 : 0);
    noStroke();
    ellipse(x, y, s);
    fill(!bought ? 0 : 255);
    textAlign(CENTER, CENTER);
    textSize(s * 0.2);
    text(!bought ? "BUY" : "bought", x, y);
  }
}

function ConsequenceRipples(x, y, w, h) {
  var obs = [];
  var causeRipples = [];
  var cause = false;
  var causeCount = 0;
  var causeInterval = 80;
  var cx = width / 2;
  var cy = height * 0.1;
  var cr = height * 1.41;
  var cLife = 200;

  this.getDeveloped=function(){
    var res=[];
    for(var i=obs.length-1; i>=0; i--){
      if(obs[i].developed){
        res.push(obs[i]);
        obs.splice(i,1);
      }
    }
    return res;
  }


  this.addConsequences = function(consequences) {
    consequences.forEach(function(cons) {
      obs.push(new Obstacle(cx + cos(PI * 0.25 + cons.a * PI * 0.5) * height * (0.1 + cons.r * 0.8), cy + sin(PI * 0.25 + cons.a * PI * 0.5) * height * (0.1 + cons.r * 0.8), width * 0.02, width * 0.15, random(30, 120), cons.message));
    });
  };

  this.cause = function() {
    cause = true;
    if (cause) {
      causeCount = 0;
    }
  };

  this.run = function() {
    var rBase = h * 0.2;
    var rStep = (h - rBase) / 5;
    noFill();
    strokeWeight(rStep);
    strokeCap(SQUARE);
    for (var i = 0; i < 5; i++) {
      stroke(120 + 10 * (i + 1));
      arc(cx, cy, rBase + (i) * rStep * 2, rBase + (i) * rStep * 2, PI * 0.25, PI * 0.75);
    }
    fill(255);
    noStroke();
    textSize(h * 0.05);
    textAlign(LEFT, BOTTOM);
    push();
    translate(cx, cy);
    rotate(PI * 0.75);
    push();
    translate(rBase, h * 0.01),
    rotate(PI);
    text("now", 0, 0);
    pop();
    push();
    translate(rBase + 4 * rStep, h * 0.01),
    rotate(PI);
    text("future", 0, 0);
    pop();
    rotate(-PI * 0.5);
    push();
    translate(rBase -0.5 * rStep, -h * 0.01),
    rotate(0);
    text("here", 0, 0);
    pop();
    push();
    translate(rBase + 3.5 * rStep, -h * 0.01),
    rotate(0);
    text("far", 0, 0);
    pop();
    pop();
    obs.forEach(function(o) {
      o.show();
      causeRipples.forEach(function(cr) {
        o.activate(cr.x, cr.y, cr.r);
      });
    });
    obs.forEach(function(o) {
      o.showInfo();
    });
    if (cause) {
      if (causeCount % causeInterval == 0) {
        causeRipples.push(new Ripple(cx, cy, cr, cLife));
      }
      causeCount++;

    }
    for (var i = causeRipples.length - 1; i >= 0; i--) {
      if (causeRipples[i].run()) {
        causeRipples[i].show(1);
      } else {
        causeRipples.splice(i, 1);
      }
    }
  };



}

function Obstacle(x, y, r, s, ttv, msg) {
    var threshRel = 1;
    var active = 0;
    var hit = false;
    var ttr = 0;
    var ttrMax = 100;
    var ripple;
    var vis = 0;
    var visInc = 1 / ttv;
    var hover = false;
    var ibox = new InfoBox(x, y, s, msg);
    this.developed=false;

    this.migrateTo=function(tx,ty,tr,ts){
      x+=(tx-x)/20;
      y+=(ty-y)/20;
      s+=(ts-s)/20;
      r+=(tr-r)/20;
    }

    this.activate = function(tx, ty, tr) {
      var d = dist(tx, ty, x, y);
      var ad = d - tr;
      hit = false;
      if (ad < r * threshRel) {
        // active=1-ad/(r*threshRel);
        hit = ad < r && tr < d + r;
      } else {
        // active=0;
      }
      // console.log(hit);
      if (hit) {
        if (vis < 1) {
          vis += visInc;
        } else {
          this.developed=true;
        }
        active += (1 - active) / 3;
        if (!ripple) {
          ripple = new Ripple(x, y, r * 5, 120);
        }
      } else {
        active += (0 - active) / 3;
      }
      if (ripple) {
        if (ripple.run()) {
          ripple.show(vis);
        } else {
          ripple = null;
        }
      }
      hover = dist(mouseX, mouseY, x, y) < r;

    };

    this.showInfo = function() {
      ibox.run((hover && vis>0.99) || (vis<0.99 && vis > 0.6), x,y,s);
      ibox.show();
    };

    this.show = function() {
      fill(255 * active, 255 * (vis - 0.1));
      if(this.developed){
        fill(150,0,230);
      } else
      if (vis > 0.6) {
        fill(100 + 100 * active, 0, 0, 255 * (vis - 0.1));
        if (hover) {
          fill(200, 0, 0);
        }
      }
      noStroke();
      ellipse(x, y, r * 2);
    };


  }

  function InfoBox(x, y, s, msg) {
    var sNow = 0;
    var active = false;
    var xi = x + s * 0.05;
    var yi = y + s * 0.15;
    var wi = s * 0.9;
    var hi = s * 0.9


    this.run = function(active,nx,ny,ns) {
      x+=(nx-x)/20;
      y+=(ny-y)/20;
      s+=(ns-s)/20;
      xi = x + s * 0.05;
      yi = y + s * 0.15;
      wi = s * 0.9;
      hi = s * 0.9

      if (active) {
        sNow += (1 - sNow) / 10;
      } else {
        sNow += (0 - sNow) / 10;
      }
    };

    this.show = function() {
      if(sNow>0.1){
        fill(255);
        stroke(0);
        strokeWeight(2);
        rectMode(CORNER);
        rect(x, y, sNow * s, sNow * s, 0, sNow * s * 0.15, sNow * s * 0.15, sNow * s * 0.15);
        if (sNow > 0.9) {
          noStroke();
          fill(0);
          textAlign(LEFT, TOP);
          textSize(s / 8);
          text(msg, xi, yi, wi, hi);
        }
      }
    };

  }

  function Ripple(x, y, mr, frames) {
    this.x = x;
    this.y = y;
    this.r = 0;
    var step = mr / frames;

    this.run = function() {
      this.r += step;
      return this.r < mr;
    };


    this.show = function(vis) {
      stroke(255, 255 * (1 - this.r / mr));
      strokeWeight(0.25 + (vis) * 1);
      noFill();
      ellipse(x, y, this.r * 2);
    }
  }
