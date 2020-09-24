function RandomField(randomMax) {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      field[i][j] = floor(random(randomMax));
    }
  }

  this.update = function() {
    return;
  }

  this.render = function() {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        stroke(field[i][j] * 255);
        strokeWeight(rez * 0.15);
        point(i * rez, j * rez)
      }
    }
  }
}
