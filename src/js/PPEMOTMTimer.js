// Stub for Every minute on the minute clock
function PPEmotmTimer (idPrefix ) {
  this.startTimer = new PPTimer();
  this.startTimer.setCountDown(10);

  this.workoutTimer = new PPTimer();
  
  this.currentTimer = this.startTimer;
  
  this.sound = new Audio('sound/short1.wav');

  var that = this;

  this.startTimer.runAction = function () { that.startingDisplay(); };
  this.workoutTimer.runAction = function () { that.display(); };

  var timerBinder = new PPTimerBinder(idPrefix);
  timerBinder.setDelegate(this);  
}


PPEmotmTimer.prototype.init = PPTimer.prototype.init;
PPEmotmTimer.prototype.setDisplayElement = PPTimer.prototype.setDisplayElement;


PPEmotmTimer.prototype.start = function () {
   this.currentTimer.start();
};

PPEmotmTimer.prototype.stop = function () {
  this.currentTimer.stop();
};


PPEmotmTimer.prototype.startingDisplay = function () {
   var currValue = this.currentTimer.currentValue();
   
   this.displayElement.innerHTML = PPTimer.format(currValue);
   
   if ( currValue == 0 ) {
      //play start sound
      this.sound.play();
      this.currentTimer.stop();
      this.currentTimer = this.workoutTimer;
      this.workoutTimer.start();
   }
};

PPEmotmTimer.prototype.display = function () {
  var currValue = this.workoutTimer.currentValue();
  var currStringValue = PPTimer.format(currValue);

  if ( currValue % 60 == 0 ) {
    this.sound.play();
  }

  this.displayElement.innerHTML = currStringValue;
  
  
};