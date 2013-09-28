
// A meta-timer composed of two Timers
// Usually one is a short countdown timer,
// i.e. 10 second countdown before starting a 20 minute
//      workout
function PPCompositeTimer(idPrefix, startTimer, mainTimer) {
  this.startTimer = startTimer;
  this.startTimer.setDelegate(this);
  this.mainTimer = mainTimer;
  this.mainTimer.setDelegate(this);

  this.currentTimer = this.startTimer;


  var timerBinder = new PPTimerBinder(idPrefix);
  timerBinder.setDelegate(this);
}

PPCompositeTimer.prototype.setDisplayElement = function (element) {
  this.startTimer.displayElement = element;
  this.mainTimer.displayElement = element;
};


PPCompositeTimer.prototype.start = function () {
  this.currentTimer.start();
};


PPCompositeTimer.prototype.stop = function () {
  this.currentTimer.stop();
};

PPCompositeTimer.prototype.done = function (timer) {

  PPUtils.log("composites done");
  if ( timer == this.startTimer ) {
    this.mainTimer.start();
    this.currentTimer = this.mainTimer;
  }
};