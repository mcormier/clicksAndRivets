
// A meta-timer composed of two Timers
// Usually one is short countdown timer,
// i.e. 10 second countdown before starting a 20 minute
//      workout
function PPCompositeTimer(startTimer, mainTimer) {
  this.startTimer = startTimer;
  this.mainTimer = mainTimer;
}