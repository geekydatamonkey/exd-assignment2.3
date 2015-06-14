// point.js

'use strict';

class Point {
  
  constructor(positionVector = {x: 0, y: 0}, velocityVector = {x: 0, y: 0}, accelVector = {x: 0, y: 0 }) {
    this.radius = 1;
    this.x = positionVector.x;
    this.y = positionVector.y;
    this.dx = velocityVector.x;
    this.dy = velocityVector.y;
    this.ddx = accelVector.x;
    this.ddy = accelVector.y;
    this.sketch = null;
    this.bounce = 0.99;
    this.friction = 0.99;
    this.color = '#eee';
  }

  setSketch(sketch) {
    this.sketch = sketch;
  }

  isAtEdge() {
    return this.x > this.sketch.width || 
      this.x < 0 ||
      this.y > this.sketch.height ||
      this.y < 0;
  }

  bouncePoint() {
    if (this.x > this.sketch.width) {
      this.x = this.sketch.width;
      this.dx *= -1 * this.bounce; //reverse direction
    }
    if (this.x < 0) {
      this.x = 0;
      this.dx *= -1 * this.bounce;
    }
    if (this.y > this.sketch.height) {
      this.y = this.sketch.height;
      this.dy *= -1 * this.bounce;
    }
    if (this.y < 0) {
      this.y = 0;
      this.dy *= -1 * this.bounce;
    }
  }

  update() {

    if (this.isAtEdge()) {
      this.bouncePoint();
      console.log(this);
    }

    this.dy = (this.dy + this.ddy) * this.friction;
    this.dx = (this.dx + this.ddx) * this.friction;
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
  }

  render() {
    this.sketch.fill(this.color);
    this.sketch.ellipse(this.x, this.y, this.radius, this.radius);
  }

}

module.exports = Point;