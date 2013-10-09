
// Binds to a display element, start and stop button
// Expects 3 HTML elements to be defined as follows:
//
//   idPrefix + "Display"
//   idPrefix + "Start"
//   idPrefix + "Stop"
//
function PPTimerBinder(idPrefix) {
  this.displayElementID = idPrefix + "Display";
  this.startButtonID = idPrefix + "Start";
  this.soundID = idPrefix + "Sound";

  this.soundLoaded = false;

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
  this.sound = $(this.soundID);
};

PPTimerBinder.prototype.buttonAction = function () {

    if ( this.soundLoaded == false ) {
        this.sound.load();
        this.soundLoaded = true;
    }

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
    this.sound.currentTime=0;
    this.sound.load();
    this.sound.play();
};