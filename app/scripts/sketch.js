// sketch.js
/*jshint newcap: false */

'use strict';
let p5 = require('p5');
let $ = require('jquery');
let Point = require('./point');

let config = {
  canvasWrapper: '.canvas-wrapper'
};

let points = [];

function mySketch(s){

  s.setup = function (){

    // create canvas and put in canvasWrapper
    let $canvasWrapper = $(config.canvasWrapper);
    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);

    // modes
    s.ellipseMode(s.RADIUS);
    s.fill(0);

    // setup points
    let initPosition = s.createVector(500, 500),
        initVelocity = s.createVector(20, 10),
        p = new Point(initPosition, initVelocity);
        p.setSketch(s);

    points.push(p);

  };

  s.draw = function() {
    for (let i = 0, len = points.length; i < len; i++) {
      points[i].update();
      points[i].render();
    }
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