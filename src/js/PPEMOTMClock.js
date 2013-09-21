// Stub for Every minute on the minute clock
function PPEmotmClock (displayElementID, startButtonID, stopButtonID ) {
  this.displayElementID = displayElementID;
  this.startButtonID = startButtonID;
  this.stopButtonID = stopButtonID;

  this.startClock = new PPClock();
  this.startClock.setCountDown(10);

  this.workoutClock = new PPClock();
  
  this.currentClock = this.startClock;
  
  this.sound = new Audio('sound/short1.wav');

  var that = this;
  
  var startBinder = function () { that.startingDisplay(); }
  this.startClock.runAction = startBinder;
  
  var runBinder = function () { that.display(); }
  this.workoutClock.runAction = runBinder;

  var initBinder = function() { that.init(); }
  PPUtils.bind("load", window, initBinder );
}


PPEmotmClock.prototype.init = PPClock.prototype.init;


PPEmotmClock.prototype.start = function () {
   this.currentClock.start();
}

PPEmotmClock.prototype.stop = function () {
  this.currentClock.stop();
}


PPEmotmClock.prototype.startingDisplay = function () {
   var currValue = this.currentClock.currentValue();
   
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