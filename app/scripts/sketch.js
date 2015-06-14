// sketch.js
/*jshint newcap: false */

'use strict';
let p5 = require('p5');
let $ = require('jquery');
let Point = require('./pointVerlet');
//let PointEuler = require('./point');

let config = {
  canvasWrapper: '.canvas-wrapper'
};

let points = [];

function mySketch(s){

  function createRandomPoints(n, initPosition) {

    n = n || 1;

    initPosition = initPosition || {
      x: 0.15 * s.width ,
      y: 0.25 * s.height
    }; 

    let hueStart = s.random(0,255);
    let hueStop = s.random(0,255);
    for (let i = 0; i < n; i++) {

      // randomize initial point settings
      let initVelocity = {
        x: s.random(-20,20),
        y: s.random(-20,20)
      };
      let initAccel = {
        x: 0,
        y: 0.4
      };
      let hue = s.random(hueStart, hueStop);
      let color = [hue, 30, 255];

      // setup point
      let p = new Point(initPosition, initVelocity, initAccel);
      p.setColor(color);
      p.setSketch(s);
      points.push(p);
    }
  }

  s.setup = function (){

    let $canvasWrapper = $(config.canvasWrapper);

    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);

    // modes
    s.ellipseMode(s.RADIUS);
    s.colorMode(s.HSB);
    s.fill(0);

    createRandomPoints(500);

  };

  s.draw = function() {
    for (let i = 0, len = points.length; i < len; i++) {
      points[i].update();
      points[i].render();
    }
  };

  s.mousePressed = function() {
    let positionVector = {x: s.mouseX, y: s.mouseY};
    points = [];
    createRandomPoints(500, positionVector);
  };

  s.keyTyped = function() {
    points = [];
    s.clear();
  };

  s.windowResized = function() {
    let $canvasWrapper = $(config.canvasWrapper),
        w = $canvasWrapper.innerWidth(),
        h = $canvasWrapper.height();

    // put in canvasWrapper
    s.resizeCanvas(w,h-3);

  };

}



function init() {
  return new p5(mySketch);
}

module.exports = {
  init
};