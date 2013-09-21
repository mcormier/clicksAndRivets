/* http://tabatatraining.org/
   https://itunes.apple.com/us/app/tabata-timer/id311712265?mt=8

  startup delay = 10 seconds
  Total cycles = 8
  Duration = 20 seconds
  Rest = 10 seconds 
*/


function PPTabataClock(displayElementID, startButtonID, stopButtonID ) {
  this.displayElementID = displayElementID;
  this.startButtonID = startButtonID;
  this.stopButtonID = stopButtonID;

  this.workoutClock = new PPClock();
  this.workoutClock.setCountDown(20);

  var that = this;
  var runBinder = function () { that.display(); }
  this.workoutClock.runAction = runBinder;



  var initBinder = function() { that.init(); }
  PPUtils.bind("load", window, initBinder );
}

PPTabataClock.prototype.init = function () {
  this.displayElement = $(this.displayElementID);

  var that = this;
  var startBinder = function() {  that.start(); }
  var stopBinder = function() {  that.stop(); }
  PPUtils.bind("click", $(this.stopButtonID), stopBinder );
  PPUtils.bind("click", $(this.startButtonID), startBinder );
}

PPTabataClock.prototype.start = function () {
  PPUtils.log("TODO -- implement start");
   this.workoutClock.start();
}

PPTabataClock.prototype.stop = function () {
  PPUtils.log("TODO -- implement stop");
  this.workoutClock.stop();
}

PPTabataClock.prototype.display = function () {
  this.displayElement.innerHTML = this.workoutClock.currentValue();
}