// TODO add animation on appearance
const red = 0,
  yellow = 60,
  green = 120,
  turquoise = 180,
  blue = 240,
  pink = 300;

// number of sides weights and skills should be derived from one structure
// change to touple 
function drawSkillChart(ctx, r, Xcenter, Ycenter, maxWeight, labeledWeights) {

  var numberOfSides = labeledWeights.length;
  var outerPolygon = getRegularPolygon(numberOfSides, r + 20, Xcenter, Ycenter);

  var polygon = getRegularPolygon(numberOfSides, r, Xcenter, Ycenter);

  var scalePolygons = getScalePoygons(numberOfSides, r, Xcenter, Ycenter, maxWeight);
  var resizedPolygon = getWeightedRegularPolygon(labeledWeights, maxWeight, polygon, Xcenter, Ycenter)

  drawLabels(ctx, labeledWeights, outerPolygon)

  drawPoly(ctx, polygon);
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 3;
  ctx.stroke();

  for (var i = maxWeight - 1; i > 1; i--) {
    drawPoly(ctx, scalePolygons[i])
    var color = percentToColor(i / maxWeight * 100, red, green);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  drawPoly(ctx, resizedPolygon);
  ctx.fillStyle = "#00BEEF";
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function getScalePoygons(numberOfSides, size, x, y, scales) {
  var scalePolygons = [];
  for (var i = 0; i < scales; i++) {
    var tempSize = size * (i / scales);
    scalePolygons.push(getRegularPolygon(numberOfSides, tempSize, x, y))
  }
  return scalePolygons;
}

function getWeightedRegularPolygon(labeledWeights, maxWeight, poly, x, y) {
  var points = [];
  for (var i = 0; i < poly.length; i++) {
    scaler = labeledWeights[i][1] / maxWeight;
    vec = {
      x: x - poly[i].x,
      y: y - poly[i].y
    };
    scale(vec, scaler);
    vec.x *= -1;
    vec.y *= -1;
    points.push({ x: x + vec.x, y: y + vec.y });
  }
  return points;
}

function getRegularPolygon(numberOfSides, size, x, y) {
  var points = [{
    x: x + size * Math.cos(0),
    y: y + size * Math.sin(0)
  }];

  for (var i = 1; i < numberOfSides; i++) {
    points.push({
      x: x + size * Math.cos(i * 2 * Math.PI / numberOfSides),
      y: y + size * Math.sin(i * 2 * Math.PI / numberOfSides)
    });
  }
  return points;
}

function drawPoly(ctx, polygon) {
  ctx.beginPath();
  ctx.moveTo(polygon[0].x, polygon[0].y);
  for (var i = 1; i < polygon.length; i++) {
    ctx.lineTo(polygon[i].x, polygon[i].y);
  }
  ctx.closePath();
}

function drawLabels(ctx, labeledWeights, coordinates) {
  for (var i = 0; i < labeledWeights.length; i++) {
    ctx.font = "10px Arial";
    ctx.fillText(labeledWeights[i][0],
      coordinates[i].x,
      coordinates[i].y);
  }
}

function scale(v, scaler) {
  v.x *= scaler
  v.y *= scaler
  return v;
}


function percentToColor(percent, start, end) {
  var a = percent / 100,
    b = (end - start) * a,
    c = b + start;

  // Return a CSS HSL string
  return 'hsl(' + c + ', 100%, 50%)';
}