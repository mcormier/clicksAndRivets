// Stub for Every minute on the minute clock
function PPEmotmClock (idPrefix ) {
  this.startClock = new PPClock();
  this.startClock.setCountDown(10);

  this.workoutClock = new PPClock();
  
  this.currentClock = this.startClock;
  
  this.sound = new Audio('sound/short1.wav');

  var that = this;

  this.startClock.runAction = function () { that.startingDisplay(); };
  this.workoutClock.runAction = function () { that.display(); };

  var timerBinder = new PPTimerBinder(idPrefix);
  timerBinder.setDelegate(this);  
}


PPEmotmClock.prototype.init = PPClock.prototype.init;
PPEmotmClock.prototype.setDisplayElement = PPClock.prototype.setDisplayElement;


PPEmotmClock.prototype.start = function () {
   this.currentClock.start();
};

PPEmotmClock.prototype.stop = function () {
  this.currentClock.stop();
};


PPEmotmClock.prototype.startingDisplay = function () {
   var currValue = this.currentClock.currentValue();
   
   this.displayElement.innerHTML = PPClock.format(currValue);
   
   if ( currValue == 0 ) {
      //play start sound
      this.sound.play();
      this.currentClock.stop();
      this.currentClock = this.workoutClock;
      this.workoutClock.start();
   }
};

PPEmotmClock.prototype.display = function () {
  var currValue = this.workoutClock.currentValue();
  var currStringValue = PPClock.format(currValue);

  if ( currValue % 60 == 0 ) {
    this.sound.play();
  }

  this.displayElement.innerHTML = currStringValue;
  
  
};