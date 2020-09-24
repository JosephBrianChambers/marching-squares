function MetaBall() {
  this.r = random(20, 100);
  this.pos = createVector(random(width), random(height));
  this.vel = p5.Vector.random2D();

  this.update = function() {
    this.pos.add(this.vel);

    if (this.pos.x > width || this.pos.x < 0) {
      this.vel.x *= -1;
    }

    if (this.pos.y > height || this.pos.y < 0) {
      this.vel.y *= -1;
    }
  }

  this.render = function() {
    noFill();
    stroke(255);
    strokeWeight(1);
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}
