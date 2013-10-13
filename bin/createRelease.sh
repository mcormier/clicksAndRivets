#!/usr/bin/bash

SCRIPT_LOCATION=`dirname $0`
cd ${SCRIPT_LOCATION}

if [ ! -d "../release" ]; then
  mkdir ../release
fi
cd ../release

cat ../src/js/PPUtils.js ../src/js/PPTimerBinder.js ../src/js/PPTimer.js ../src/js/PPCompositeTimer.js > clicksandrivets.js

java -jar ../lib/yuicompressor-2.4.8.jar clicksandrivets.js -o clicksandrivets-min.js

rm clicksandrivets.js

cp -r ../src/sound .