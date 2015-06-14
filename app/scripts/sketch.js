// sketch.js
/*jshint newcap: false */

'use strict';
let p5 = require('p5');
let $ = require('jquery');

let config = {
  canvasWrapper: '.canvas-wrapper'
};

let pointList = [];

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

  };

  s.draw = function() {
  };

  s.windowResized = function() {
    let $canvasWrapper = $(config.canvasWrapper);

    let w = $canvasWrapper.innerWidth();
    let h = $canvasWrapper.height();

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