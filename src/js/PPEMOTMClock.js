// Stub for Every minute on the minute clock
function PPEmotmClock (displayElementID, startButtonID, stopButtonID ) {
  this.displayElementID = displayElementID;
  this.startButtonID = startButtonID;
  this.stopButtonID = stopButtonID;

  this.startClock = new PPClock();
  this.startClock.setCountDown(10);

  this.workoutClock = new PPClock();
  
  this.sound = new Audio('sound/short1.wav');

  var that = this;  
  var startBinder = function () { that.startingDisplay(); }
  this.startClock.runAction = startBinder;
  
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
   this.startClock.start();
}

PPEmotmClock.prototype.stop = function () {
  this.workoutClock.stop();
}


PPEmotmClock.prototype.startingDisplay = function () {
   var currValue = this.startClock.currentValue();
   
   this.displayElement.innerHTML = PPClock.format(currValue);
   
   if ( currValue == 0 ) {
      //play start sound
      this.sound.play();
      this.workoutClock.start();
   }
}

PPEmotmClock.prototype.display = function () {
  var currValue = this.workoutClock.currentValue();
  var currStringValue = PPClock.format(currValue);

  if ( currValue % 60 == 0 ) {
    this.sound.play();
  }

  this.displayElement.innerHTML = currStringValue;
  
  
}