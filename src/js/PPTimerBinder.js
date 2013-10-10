
// Binds to a display element, start and stop button
// Expects 3 HTML elements to be defined as follows:
//
//   idPrefix + "Display"
//   idPrefix + "Start"
//
function PPTimerBinder(idPrefix) {
  this.displayElementID = idPrefix + "Display";
  this.startButtonID = idPrefix + "Start";

  this.started = false;
  this.isBound = false;
  
  var that = this;
  var initBinder = function() { that.init(); };
  PPUtils.bind("load", window, initBinder );
}

PPTimerBinder.prototype.init = function () {
  this.displayElement = $(this.displayElementID);

  var that = this;
  var buttonBinder = function() {  that.buttonAction(); };
  PPUtils.bind("click", $(this.startButtonID), buttonBinder );
  
  if ( this.delegate ) {
    this.delegate.setDisplayElement(that.displayElement);
  }
  this.isBound = true;

  // http://codebase.es/riffwave/
  // create random sound with riffwave.js  TODO -- create custom sounds dynamically
  var data = []; // just an array
  for (var i=0; i<10000; i++) data[i] = Math.round(255 * Math.random());
  var wave = new RIFFWAVE(data); // create the wave file
  this.audio = new Audio(wave.dataURI); // create the HTML5 audio element


};

PPTimerBinder.prototype.buttonAction = function () {

  // play because of user action in ios
  this.play();

  if ( this.delegate && this.started == false ) {
    this.delegate.start();
    $(this.startButtonID).value = "Stop";
    this.started = true;
    return;
  }

  if ( this.delegate && this.started == true ) {
      this.delegate.stop();
      $(this.startButtonID).value = "Start";
      this.started = false;
  }

};


PPTimerBinder.prototype.setDelegate = function (delegate) {
  this.delegate = delegate;
  if ( this.isBound ) {
    this.delegate.setDisplayElement(this.displayElement);
  }
};

PPTimerBinder.prototype.play = function () {
    this.audio.currentTime=0;
    this.audio.play();
};