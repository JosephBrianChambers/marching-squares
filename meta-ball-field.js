function MetaBallField(numCircles) {
  this.metaBalls = [];

  for (var i = 0; i < numCircles; i++) {
    this.metaBalls.push(new MetaBall);
  }

  this.update = function() {
    this.updateField();
    this.updateCircles();
  }

  this.render = function() {
    this.renderField();
    this.renderCircles();
  }

  this.updateField = function() {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        var sum = 0;

        for (var k = 0; k < this.metaBalls.length; k++) {
          var distance = dist(i * rez, j * rez, this.metaBalls[k].pos.x, this.metaBalls[k].pos.y);
          sum += (25 * this.metaBalls[k].r) / distance;
        }

        field[i][j] = sum;
      }
    }
  }

  this.updateCircles = function() {
    for (var i = 0; i < this.metaBalls.length; i++) {
      this.metaBalls[i].update();
    }
  }

  this.renderField = function() {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        stroke(field[i][j] * (field[i][j] / 25));
        var weight = Math.min(rez * (field[i][j] / 150), rez * 4)
        strokeWeight(weight);
        point(i * rez, j * rez)
      }
    }
  }

  this.renderCircles = function() {
    for (var i = 0; i < this.metaBalls.length; i++) {
      this.metaBalls[i].render();
    }
  }
}
