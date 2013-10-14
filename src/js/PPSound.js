function PPSound() {}

PPSound.generateStaticSound = function ( ) {
  var data = [];
  for (var i=0; i<10000; i++) data[i] = Math.round(255 * Math.random());
  var wave = new RIFFWAVE(data);
  return new Audio(wave.dataURI);
};

PPSound.sineSound = function () {
  var sine = []; for (var i=0; i<10000; i++) sine[i] = 128+Math.round(127*Math.sin(i/5));
  var wave = new RIFFWAVE(sine);
  return new Audio(wave.dataURI);

};

PPSound.alienSpaceShip = function () {
  var effect = []; for (var i=0; i<35000; i++) effect[i] = 64+Math.round(32*(Math.cos(i*i/2000)+Math.sin(i*i/4000)));
  var wave = new RIFFWAVE();
  wave.header.sampleRate = 22000;
  wave.Make(effect);
  return new Audio(wave.dataURI);
};

PPSound.stereoTest = function () {

  var wave = new RIFFWAVE();
  wave.header.sampleRate = 22000;
  wave.header.numChannels = 2;
  wave.header.bitsPerSample = 16;
  var i = 0;
  var stereo = [];
  while (i<100000) {
    stereo[i++] = 0;
    stereo[i++] = 0x8000+Math.round(0x7fff*Math.sin(i/25));
  }
  while (i<200000) {
    stereo[i++] = 0x8000+Math.round(0x7fff*Math.sin(i/100));
    stereo[i++] = 0;
  }
  wave.Make(stereo);
  return new Audio(wave.dataURI);

};