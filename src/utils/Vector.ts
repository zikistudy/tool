export class Vector {
    x: number;
    y: number;
  
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }
  
    static add(vector1:any, vector2:any) {
      return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
    }
    static sub(vector1:any, vector2:any) {
      return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    }
    static clone(vector:any) {
      return new Vector(vector.x, vector.y);
    }
    static fromAngle(theta:any, d:any) {
      return new Vector(d * Math.cos(theta), d * Math.sin(theta));
    }
    clone() {
      return new Vector(this.x, this.y);
    }
    add(vector:any) {
      this.x += vector.x;
      this.y += vector.y;
      return this;
    }
    sub(vector:any) {
      this.x -= vector.x;
      this.y -= vector.y;
      return this;
    }
    mult(scale:any) {
      this.x *= scale;
      this.y *= scale;
      return this;
    }
    div(scale:any) {
      this.x /= scale;
      this.y /= scale;
      return this;
    }
    mag() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    setMag(mag:any) {
      this.normalize();
      this.mult(mag);
      return this;
    }
    normalize() {
      let m = this.mag();
      if (m !== 0) {
        this.div(m);
      }
      return this;
    }
    limit(max:any) {
      if (this.mag() > max) {
        this.normalize();
        this.mult(max);
      }
      return this;
    }
    heading() {
      return -Math.atan2(this.x, this.y);
    }
  }
  