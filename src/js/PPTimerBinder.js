
// Binds to a display element, start and stop button
// Expects 3 HTML elements to be defined as follows:
//
//   idPrefix + "Display"
//   idPrefix + "Start"
//   idPrefix + "Stop"
//
function PPTimerBinder(idPrefix) {
  this.displayElementID = idPrefix + "Display";
  this.startButtonID = idPrefix + "Start";
  this.stopButtonID = idPrefix + "Stop";
  
  this.isBound = false;
  
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
  
  if ( this.delegate ) {
    this.delegate.setDisplayElement(that.displayElement);
  }
  this.isBound = true;
}

PPTimerBinder.prototype.start = function () {
  if ( this.delegate ) { 
    this.delegate.start();
  }
}

PPTimerBinder.prototype.stop = function () { 
  if ( this.delegate ) {
    this.delegate.stop();
  }
}

PPTimerBinder.prototype.setDelegate = function (delegate) {
  this.delegate = delegate;
  if ( this.isBound ) {
    this.delegate.setDisplayElement(this.displayElement);
  }
}