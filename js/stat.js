'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP_SHADOW = 10;
var GAP = 10;
var TEXT_X = 20;
var TEXT_Y = 35;
var FONT = '16px PT Mono';
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var calculateMaxValue = function (list) {
  var maxValue = list[0];
  for (var i = 0; i < list.length; i++) {
    if (list[i] > maxValue) {
      maxValue = list[i];
    }
  }
  return maxValue;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP_SHADOW, CLOUD_Y + GAP_SHADOW, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white');

  ctx.font = FONT;
  ctx.fillStyle = 'black';
  ctx.textBaseLine = 'top';
  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_X, CLOUD_Y + TEXT_Y);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_X, CLOUD_Y + TEXT_Y + FONT_GAP);


  for (var i = 0; i < names.length; i++) {
    var maxValue = calculateMaxValue(times);
    var barHeight = MAX_BAR_HEIGHT * times[i] / maxValue;

    ctx.fillStyle = 'black';
    ctx.fillText(names[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT + CLOUD_Y - GAP);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT + CLOUD_Y - GAP - FONT_GAP - barHeight - GAP);

    var barColor = 'rgba(0, 0, ' + (Math.random() * 200 + 55) + '1)';
    if (names[i] === 'Вы') {
      barColor = 'rgba(255, 0, 0, 1)';
    }
    ctx. fillStyle = barColor;
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT + CLOUD_Y - GAP - FONT_GAP - barHeight, BAR_WIDTH, barHeight);
  }
};

