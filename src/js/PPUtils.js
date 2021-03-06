"use strict";

function $(id){ return document.getElementById(id); }

function showElement( e ) { e.style.visibility = "visible"; }
function hideElement( e ) { e.style.visibility = "hidden"; }

function PPUtils() {}

PPUtils.log = function ( output ) {
    if (window.console ) {
      console.log(output);
    }
};

PPUtils.objectImplementsMethod = function ( obj, method ) {
  return !(obj == null || !obj[method] || typeof obj[method] !== 'function');
};

PPUtils.objectImplementsMethods = function ( obj, methodArray ) {
  for (var i = 0; i < methodArray.length; i++) {
    if ( PPUtils.objectImplementsMethod(obj, methodArray[i]) == false) {
      return false;
    }
  }
  return true;
};

PPUtils.setElementAttributes = function ( element, attributeArray, valuesArray) {
   for( var i = 0; i < attributeArray.length; i ++ ) {
     element.setAttribute( attributeArray[i], valuesArray[i]);
   }
};

// Returns the callback so that it can be removed later
PPUtils.bindTextField = function(event, element, boundObj, objCallback) {

  var callback = function receive(evt) {
    boundObj[objCallback](element, evt);
  };

  if ( typeof element.addEventListener != "undefined" ) {
    element.addEventListener(event, callback, false);
  } else if ( typeof element.attachEvent != "undefined" ) { // Supports IE < 9
    element.attachEvent(event, callback);
  }

  return callback;
};
PPUtils.bind = function(event, element, callback) {
  if ( typeof element.addEventListener != "undefined" ) {
    element.addEventListener(event, callback, false);
  } else if ( typeof element.attachEvent != "undefined" ) { // Supports IE < 9
    element.attachEvent(event, callback);
  }
};


PPUtils.notifyListeners = function (listenersArray, listenerMethod,value ) {
  for (var i = 0 ; i < listenersArray.length; i++) {
    var obj = listenersArray[i];
    obj[listenerMethod](value);
  }
};