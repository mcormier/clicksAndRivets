function PPSound() {}

PPSound.generateStaticSound = function ( ) {
  var data = [];
  for (var i=0; i<10000; i++) data[i] = Math.round(255 * Math.random());
  var wave = new RIFFWAVE(data);
  return new Audio(wave.dataURI);
};