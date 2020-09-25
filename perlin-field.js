function PerlinField(randomMax) {
  this.zoff = 0;

  this.update = function() {
    var xoff = 0;
    this.zoff += 0.0022;

    for (var i = 0; i < cols; i++) {
      var yoff = 0;
      xoff += 0.02

      for (var j = 0; j < rows; j++) {
        field[i][j] = noise(xoff, yoff, this.zoff);
        yoff += 0.02
      }
    }
  }

  this.render = function() {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        stroke(field[i][j] * 255);
        strokeWeight(rez * 0.4);
        point(i * rez, j * rez)
      }
    }
  }
}
