// point.js

'use strict';

class Point {
  
  constructor(positionVector = {x: 0, y: 0}, velocityVector = {x: 0, y: 0}) {
    this.radius = 3;
    this.x = positionVector.x;
    this.y = positionVector.y;
    this.dx = velocityVector.x;
    this.dy = velocityVector.y;
    this.sketch = null;
  }

  setSketch(sketch) {
    this.sketch = sketch;
  }

  update() {

    // bounce if at edge
    if (this.x > this.sketch.width) {
      this.x = this.sketch.width;
      this.dx *= -1; //reverse direction
    }
    if (this.x < 0) {
      this.x = 0;
      this.dx *= -1;
    }
    if (this.y > this.sketch.height) {
      this.y = this.sketch.height;
      this.dy *= -1;
    }
    if (this.y < 0) {
      this.y = 0;
      this.dy *= -1;
    }

    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
  }

  render() {
    this.sketch.ellipse(this.x, this.y, this.radius, this.radius);
  }

}

module.exports = Point;