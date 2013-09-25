
// ------------------------------------------------------------------------------------
// The clock can either be bound to html elements or not bound
//
// new PPTimer( "idPrefix" );
//
// new PPTimer();
function PPTimer( idPrefix) {

  this.running = false;
  this.id = null;
  this.countDownTimer = false;

  var that = this;
  this.runAction = function() {  that.update(); };

  if (idPrefix != undefined) {
  
   // bind to HTML elements after the page has been initialized.
   var timerBinder = new PPTimerBinder(idPrefix);
   timerBinder.setDelegate(this);
  }

}

PPTimer.prototype.init = function () {
    if ( this.countDownTimer ) {
      this.displayElement.innerHTML = PPTimer.format(this.countDownAmount);
    }
};

PPTimer.prototype.setDelegate = function(delegate) {
  this.delegate = delegate;
};

PPTimer.prototype.setDisplayElement = function (element) {
  this.displayElement = element;
};

PPTimer.prototype.setCountDown = function (amount) {
  this.countDownTimer = true;
  this.countDownAmount = amount;
};


PPTimer.prototype.setTimeLimit = function (timeLimit) {
  this.timeLimit = timeLimit;
};

PPTimer.prototype.start = function () {
   if ( this.running ) {
      PPUtils.log("Can't start, already running");
     return;
   }

   this.startTime = new Date();

   var toRun = this.runAction;
   this.id = window.setInterval( toRun , 1000 );
   this.running = true;
};


PPTimer.prototype.stop = function () {
    if ( this.running ) {
        var that = this;
        window.clearInterval(that.id);
        this.running = false;
        this.id = null;
    } else {
       PPUtils.log("Can't stop, not running");
    }

};

PPTimer.prototype.done = function () {
  this.stop();
  if (this.delegate ) { this.delegate.done(this); }
};


PPTimer.prototype.currentValue = function() {
  var now = new Date();
  var mills = now - this.startTime;
  var seconds = Math.floor(mills / 1000);
  
  if (  this.countDownTimer ) {
    return this.countDownAmount - seconds;
  }
  
  return seconds;
};

PPTimer.prototype.update = function() {
   var seconds = this.currentValue();

   this.displayElement.innerHTML = PPTimer.format(seconds);

   if ( this.countDownTimer && seconds == 0 ) {
     this.done();
   }

  if ( !this.countDownTimer && seconds >= this.timeLimit ) {
     this.done();
  }

};


// PPTimer Static methods
// ----------------------------------------------
// Formats seconds t
// 69 --> 1:09 
PPTimer.format = function (secondsValue) {
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
