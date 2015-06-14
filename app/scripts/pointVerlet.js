// pointVerlet.js
// movement using Verlet Integration

'use strict';

class Point {
  
  constructor(positionVector = {x: 0, y: 0}, velocityVector = {x: 0, y: 0}, accelVector = {x: 0, y: 0 }) {
    this.radius = 0;
    this.x = positionVector.x;
    this.y = positionVector.y;
    this.oldx = positionVector.x - velocityVector.x;
    this.oldy = positionVector.y - velocityVector.y;
    this.ddx = accelVector.x;
    this.ddy = accelVector.y;
    this.sketch = null;
    this.bounce = 0.99;
    this.friction = 0.98;
    this.color = '#ddd';
  }


  setColor(color) {
    this.color = color;
  }

  setSketch(sketch) {
    this.sketch = sketch;
  }

  update() {
    let dx = (this.x - this.oldx + this.ddx)*this.friction;
    let dy = (this.y - this.oldy + this.ddy)*this.friction;

    // update old x and y
    this.oldx = this.x;
    this.oldy = this.y;
    this.x = this.x + dx;
    this.y = this.y + dy;

    // correct if bounce
    if (this.x > this.sketch.width) {
      this.x = this.sketch.width;
      this.oldx = this.x + dx * this.bounce;
    }
    if (this.x < 0) {
      this.x = 0;
      this.oldx = this.x + dx * this.bounce;
    }
    if (this.y > this.sketch.height) {
      this.y = this.sketch.height;
      this.oldy = this.y + dy * this.bounce;
    }
    if (this.y < 0) {
      this.y = 0;
      this.oldy = this.y + dy * this.bounce;
    }

  }

  render() {
    this.sketch.fill(this.color);
    this.sketch.stroke(this.color);
    this.sketch.line(this.x, this.y, this.oldx, this.oldy);
    this.sketch.ellipse(this.x, this.y, this.radius, this.radius);
  }

}

module.exports = Point;