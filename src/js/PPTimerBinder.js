
// Binds to a display element, start and stop button
// Expects 3 HTML elements to be defined as follows:
//
//   rootName + "Display"
//   rootName + "Start"
//   rootName + "Stop"
//
function PPTimerBinder(rootName) {
  this.displayElementID = rootName + "Display";
  this.startButtonID = rootName + "Start";
  this.stopButtonID = rootName + "Stop";
  
  var that = this;
  var initBinder = function() { that.init(); }
  PPUtils.bind("load", window, initBinder );
}

PPTimerBinder.prototype.init = function () {
  this.displayElement = $(this.displayElementID);
  
  var that = this;
  var startBinder = function() {  that.start(); }
  var stopBinder = function() {  that.stop(); }
  PPUtils.bind("click", $(this.startButtonID), startBinder );
  PPUtils.bind("click", $(this.stopButtonID), stopBinder );
}

PPTimerBinder.prototype.start = function () { 
  PPUtils.log("TODO - PPTimerBinder implement start");
}

PPTimerBinder.prototype.stop = function () { 
  PPUtils.log("TODO - PPTimerBinder implement stop");
}