
// Binds to a display element, start and stop button
// Expects 3 HTML elements to be defined as follows:
//
//   idPrefix + "Display"
//   idPrefix + "Start"
//
function PPTimerBinder(idPrefix) {
  this.displayElementID = idPrefix + "Display";
  this.buttonID = idPrefix + "Button";
  this.soundId = idPrefix + "Sound";

  this.isBound = false;
  this.timerRunning = false;

  var that = this;
  var initBinder = function() { that.init(); };
  PPUtils.bind("load", window, initBinder );
}

PPTimerBinder.prototype.init = function () {
  this.displayElement = $(this.displayElementID);
  this.sound = $(this.soundId);

  if (!this.sound) {
    this.sound = PPSound.generateStaticSound();
  }

  var that = this;
  var buttonBinder = function() {  that.buttonAction(); };
  PPUtils.bind("click", $(this.buttonID), buttonBinder );
  
  if ( this.delegate ) {
    this.delegate.setDisplayElement(that.displayElement);
  }
  this.isBound = true;



};

PPTimerBinder.prototype.buttonAction = function () {
  if ( !this.delegate ) {
    return;
  }

  if (this.timerRunning) {
    this.delegate.stop();
    $(this.buttonID).value = "Start";
  } else {
    this.delegate.start();
    $(this.buttonID).value = "Stop";
  }

  this.timerRunning = !this.timerRunning;

  // load the audio when the user interacts with the start button
  // so that it will work with mobile safari
  if ( !this.soundLoaded) {
    this.sound.load();
    this.delegate.sound = this.sound;
  }

};


PPTimerBinder.prototype.setDelegate = function (delegate) {
  this.delegate = delegate;
  if ( this.isBound ) {
    this.delegate.setDisplayElement(this.displayElement);
  }
};