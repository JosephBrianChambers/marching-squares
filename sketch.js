var field;
var rez = 10;
var cols, rows;

function setup() {
  createCanvas(600, 400);
  cols = width / rez;
  rows = height / rez;
  field = make2dArray(cols, rows);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      field[i][j] = random(1);
    }
  }
}

function draw() {
  background(0)

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      stroke(field[i][j] * 255);
      strokeWeight(4);
      point(i * rez, j * rez)
    }
  }
}

function make2dArray(cols, rows) {
  var arr = new Array(cols);

  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }

  return arr
}
