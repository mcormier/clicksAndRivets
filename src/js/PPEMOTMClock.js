// Stub for Every minute on the minute clock
function PPEmotmClock (displayElementID, startButtonID, stopButtonID ) {
  this.displayElementID = displayElementID;
  this.startButtonID = startButtonID;
  this.stopButtonID = stopButtonID;

  // TODO -- create and use a countdown clock
  this.workoutClock = new PPClock();
  
  this.sound = new Audio('sound/short1.wav');

  var that = this;
  var runBinder = function () { that.display(); }
  this.workoutClock.runAction = runBinder;

  var initBinder = function() { that.init(); }
  PPUtils.bind("load", window, initBinder );
}


PPEmotmClock.prototype.init = function () {
  this.displayElement = $(this.displayElementID);

  var that = this;
  var startBinder = function() {  that.start(); }
  var stopBinder = function() {  that.stop(); }
  PPUtils.bind("click", $(this.stopButtonID), stopBinder );
  PPUtils.bind("click", $(this.startButtonID), startBinder );
}

PPEmotmClock.prototype.start = function () {
   this.workoutClock.start();
}

PPEmotmClock.prototype.stop = function () {
  this.workoutClock.stop();
}

PPEmotmClock.prototype.format = function (secondsValue) {
  var minutes = Math.floor(secondsValue / 60);
  var seconds = secondsValue % 60;
  
  if ( seconds < 10 && minutes > 0) {
    seconds = "0" + seconds;
  }
  if ( minutes > 0 ) {
    return minutes + ":" + seconds;
  } else {
    return seconds;
  }
}


PPEmotmClock.prototype.display = function () {
  var currValue = this.workoutClock.currentValue();
  var currStringValue = this.format(currValue);

  if ( currValue % 60 == 0 ) {
    this.sound.play();
  }

  this.displayElement.innerHTML = currStringValue;
  
  
}