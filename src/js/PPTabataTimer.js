/*    
  Default Settings:
  ----------------------------------  
  startup delay = 10 seconds
  Total cycles = 8
  Duration = 20 seconds
  Rest = 10 seconds 

*/


function PPTabataTimer( idPrefix ) {
  this.workoutTimer = new PPTimer();
  this.workoutTimer.setCountDown(20);

  this.restTimer = new PPTimer();
  this.restTimer.setCountDown(10);

  this.currentTimer = this.workoutTimer;

  this.setNumberOfRounds(8);
  this.currentRound = 1;

  var that = this;
  var runBinder = function () { that.display(); };
  this.workoutTimer.runAction = runBinder;
  this.restTimer.runAction = runBinder;

  this.sound = new Audio('sound/short1.wav');

  var timerBinder = new PPTimerBinder(idPrefix);
  timerBinder.setDelegate(this);  
}

// The power of prototyping … don't extend, just grab what you need.
PPTabataTimer.prototype.init = PPTimer.prototype.init;
PPTabataTimer.prototype.setDisplayElement = PPTimer.prototype.setDisplayElement;

PPTabataTimer.prototype.start = function () {
   this.currentTimer.start();
};

PPTabataTimer.prototype.stop = function () {
  this.currentTimer.stop();
};

PPTabataTimer.prototype.setNumberOfRounds = function (rounds) {
  this.rounds = rounds;
};

PPTabataTimer.prototype.swapTimers = function () {
  this.sound.play();
  
  this.currentTimer.stop();
  
  if ( this.currentTimer == this.workoutTimer ) {
    this.currentTimer = this.restTimer;
  } else {
    this.currentTimer = this.workoutTimer;
    this.currentRound = this.currentRound + 1;
    PPUtils.log("Starting round: " + this.currentRound );
  }
  
  this.currentTimer.start();
};

PPTabataTimer.prototype.display = function () {
  var currValue = this.currentTimer.currentValue();

  this.displayElement.innerHTML = currValue;

  if ( currValue == 0 ) {
    this.swapTimers();
  }
  
  if ( this.currentRound > this.rounds ) {
    this.stop();
  }
};