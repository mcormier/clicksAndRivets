
// ------------------------------------------------------------------------------------
// The clock can either be bound to html elements or not bound
//
// new PPClock( "TimeDisplay", "buttonStart", "buttonStop" );
//
// new PPClock();
function PPClock(displayElementID, startButtonID, stopButtonID ) {

  this.running = false;
  this.id = null;
  this.countDownClock = false;

  var that = this;
  this.runAction = function() {  that.updateClock(); }

  if (displayElementID != undefined) {
    this.displayElementID = displayElementID;
    this.startButtonID = startButtonID;
    this.stopButtonID = stopButtonID;

    // bind to HTML elements after the page has been initialized.
    var initBinder = function() { that.init(); }
    PPUtils.bind("load", window, initBinder );
  }

}

PPClock.prototype.init = function () {
    this.displayElement = $(this.displayElementID);

    var that = this;
    var startBinder = function() {  that.start(); }
    var stopBinder = function() {  that.stop(); }
    PPUtils.bind("click", $(this.startButtonID), startBinder );
    PPUtils.bind("click", $(this.stopButtonID), stopBinder );

    if ( this.countDownClock ) {
      this.displayElement.innerHTML = this.countDownAmount;
    }
}

PPClock.prototype.setCountDown = function (amount) {
  this.countDownClock = true;
  this.countDownAmount = amount;
  var that = this;
  this.runAction = function() {  that.countDown(); }

}

PPClock.prototype.start = function () {
   if ( this.running ) {
      PPUtils.log("Can't start, already running");
     return;
   }

   this.startTime = new Date();

   var toRun = this.runAction;
   this.id = window.setInterval( toRun , 1000 );
   this.running = true;
}

PPClock.prototype.reset = function () {

}

PPClock.prototype.stop = function () {
    if ( this.running ) {
        var that = this;
        window.clearInterval(that.id);
        this.running = false;
        this.id = null;
    } else {
       PPUtils.log("Can't stop, not running");
    }

}

PPClock.prototype.currentValue = function() {
  var now = new Date();
  var mills = now - this.startTime;
  var seconds = Math.floor(mills / 1000);
  
  if (  this.countDownClock ) {
    return this.countDownAmount - seconds;
  }
  
  return seconds;
}

PPClock.prototype.updateClock = function() {
   var seconds = this.currentValue();

   this.displayElement.innerHTML = seconds;
}

PPClock.prototype.countDown = function() {

   this.displayElement.innerHTML = this.currentValue;

   if ( toDisplay == 0 ) {
     this.stop();
   }
}