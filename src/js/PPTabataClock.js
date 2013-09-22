/*    
  Default Settings:
  ----------------------------------  
  startup delay = 10 seconds
  Total cycles = 8
  Duration = 20 seconds
  Rest = 10 seconds 

*/


function PPTabataClock( idPrefix ) {
  this.workoutClock = new PPClock();
  this.workoutClock.setCountDown(20);

  this.restClock = new PPClock();
  this.restClock.setCountDown(10);

  this.currentClock = this.workoutClock;

  this.setNumberOfRounds(8);
  this.currentRound = 1;

  var that = this;
  var runBinder = function () { that.display(); };
  this.workoutClock.runAction = runBinder;
  this.restClock.runAction = runBinder;

  this.sound = new Audio('sound/short1.wav');

  var timerBinder = new PPTimerBinder(idPrefix);
  timerBinder.setDelegate(this);  
}

// The power of prototyping … don't extend, just grab what you need.
PPTabataClock.prototype.init = PPClock.prototype.init;
PPTabataClock.prototype.setDisplayElement = PPClock.prototype.setDisplayElement;

PPTabataClock.prototype.start = function () {
   this.currentClock.start();
};

PPTabataClock.prototype.stop = function () {
  this.currentClock.stop();
};

PPTabataClock.prototype.setNumberOfRounds = function (rounds) {
  this.rounds = rounds;
};

PPTabataClock.prototype.swapClocks = function () {    
  this.sound.play();
  
  this.currentClock.stop();
  
  if ( this.currentClock == this.workoutClock ) {
    this.currentClock = this.restClock;  
  } else {
    this.currentClock = this.workoutClock;
    this.currentRound = this.currentRound + 1;
    PPUtils.log("Starting round: " + this.currentRound );
  }
  
  this.currentClock.start();
};

PPTabataClock.prototype.display = function () {
  var currValue = this.currentClock.currentValue();

  this.displayElement.innerHTML = currValue;
  
  if ( currValue == 0 ) {
    this.swapClocks();
  }
  
  if ( this.currentRound > this.rounds ) {
    this.stop();
  }
};