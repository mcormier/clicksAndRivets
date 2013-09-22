
// ------------------------------------------------------------------------------------
// The clock can either be bound to html elements or not bound
//
// new PPClock( "idPrefix" );
//
// new PPClock();
function PPClock( idPrefix) {

  this.running = false;
  this.id = null;
  this.countDownClock = false;

  var that = this;
  this.runAction = function() {  that.updateClock(); };

  if (idPrefix != undefined) {
  
   // bind to HTML elements after the page has been initialized.
   var timerBinder = new PPTimerBinder(idPrefix);
   timerBinder.setDelegate(this);
  }

}

PPClock.prototype.init = function () {
    if ( this.countDownClock ) {
      this.displayElement.innerHTML = PPClock.format(this.countDownAmount);
    }
};

PPClock.prototype.setDisplayElement = function (element) {
  this.displayElement = element;
};

PPClock.prototype.setCountDown = function (amount) {
  this.countDownClock = true;
  this.countDownAmount = amount;
};


PPClock.prototype.setTimeLimit = function (timeLimit) {
  PPUtils.log("TODO - implement setTimeLimit");
};

PPClock.prototype.start = function () {
   if ( this.running ) {
      PPUtils.log("Can't start, already running");
     return;
   }

   this.startTime = new Date();

   var toRun = this.runAction;
   this.id = window.setInterval( toRun , 1000 );
   this.running = true;
};


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

   this.displayElement.innerHTML = PPClock.format(seconds);
   
   if ( this.countDownClock && seconds == 0 ) {
     this.stop();
   }
   
};


// PPClock Static methods
// ----------------------------------------------
// Formats seconds t
// 69 --> 1:09 
PPClock.format = function (secondsValue) {
  var minutes = Math.floor(secondsValue / 60);
  var seconds = secondsValue % 60;
  
  if ( seconds < 10 && minutes > 0) {
    seconds = "0" + seconds;
  }
  if ( minutes > 0 ) {
    return minutes + ":" + seconds;
  } else {
    return seconds;
  }
};
