
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

  var that = this;
  var buttonBinder = function() {  that.buttonAction(); };
  PPUtils.bind("click", $(this.buttonID), buttonBinder );
  
  if ( this.delegate ) {
    this.delegate.setDisplayElement(that.displayElement);
  }
  this.isBound = true;

  // TODO -- if Sound not specified in HTML then create one dynamically.
  // http://codebase.es/riffwave/
  // create random sound with riffwave.js
  //var data = []; // just an array
  //for (var i=0; i<10000; i++) data[i] = Math.round(255 * Math.random());
  //var wave = new RIFFWAVE(data); // create the wave file
  //this.audio = new Audio(wave.dataURI); // create the HTML5 audio element


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