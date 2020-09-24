var field;
var rez = 10;
var cols, rows;
var threshold = 50
var fieldDrawer;

function setup() {
  createCanvas(600, 400);
  cols = 1 + width / rez;
  rows = 1 + height / rez;
  field = make2dArray(cols, rows)
  fieldDrawer = new MetaBallField(5);
  // fieldDrawer = new RandomField(2);
}

function draw() {
  background(127);
  fieldDrawer.update();
  // fieldDrawer.render();

// draw threshold contours:
// as long as iterate over 2D array cols with i, and rows with j,
// can think of canvas (x,y) cell corner coordinates in terms of (i * rez, j * rez) indicies
//
// Each cell's four corner points:
//
//      A (i, j)     B (i+1, j)
//      *------------*
//      |            |
//      |            |
//      |            |
//      |            |
//      *------------*
//      D (i, j+1)   C (i+1, j+1)

  var linePointPairs = [];
  for (var i = 0; i < cols - 1; i++) {
    for (var j = 0; j < rows - 1; j++) {

      var a = field[i][j]
      var b = field[i + 1][j]
      var bx = (i + 1) * rez;
      var by = j * rez;
      var c = field[i + 1][j + 1]
      var d = field[i][j + 1]
      var dx = i * rez;
      var dy = (j + 1) * rez;
      var abInterpolant = linearInterpolateOffset(threshold, dx, bx, a, b);
      var adInterpolant = linearInterpolateOffset(threshold, by, dy, a, d);
      var bcInterpolant = linearInterpolateOffset(threshold, by, dy, b, c);
      var dcInterpolant = linearInterpolateOffset(threshold, dx, bx, d, c);
      var abCoord = [abInterpolant, by];
      var bcCoord = [bx, bcInterpolant];
      var dcCoord = [dcInterpolant, dy];
      var adCoord = [dx, adInterpolant];

      var binaryConfiguration = [a,b,c,d].map(value => value > threshold ? 1 : 0).join('');

      stroke(0)
      strokeWeight(1)
      switch (parseInt(binaryConfiguration, 2)) {
        case 0:
          break;
        case 1:
          line(...adCoord.concat(dcCoord))
          break;
        case 2:
          line(...bcCoord.concat(dcCoord))
          break;
        case 3:
          line(...adCoord.concat(bcCoord))
          break;
        case 4:
          line(...abCoord.concat(bcCoord))
          break;
        case 5:
          line(...abCoord.concat(adCoord))
          line(...bcCoord.concat(dcCoord))
          break;
        case 6:
          line(...abCoord.concat(dcCoord))
          break;
        case 7:
          line(...abCoord.concat(adCoord))
          break;
        case 8:
          line(...abCoord.concat(adCoord))
          break;
        case 9:
          line(...abCoord.concat(dcCoord))
          break;
        case 10:
          line(...abCoord.concat(bcCoord))
          line(...adCoord.concat(dcCoord))
          break;
        case 11:
          line(...abCoord.concat(bcCoord))
          break;
        case 12:
          line(...adCoord.concat(bcCoord))
          break;
        case 13:
          line(...bcCoord.concat(dcCoord))
          break;
        case 14:
          line(...adCoord.concat(dcCoord))
          break;
        case 15:
          break;
      }
    }
  }
}

function make2dArray(cols, rows) {
  var arr = new Array(cols);

  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }

  return arr;
}

function linearInterpolateOffset(threshold, x0, x1, xValue, x1Value) {
  var valueRatio = (threshold - xValue) / (x1Value - xValue);
  return x0 + (x1 - x0) * valueRatio;
}
