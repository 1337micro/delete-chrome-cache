'use strict';

var _array_prototypes = require("./modules/array_prototypes.js");

var _killchrome = require("./modules/killchrome.js");

var _recdeldir = require("./modules/recdeldir.js");

require("babel-polyfill");

//import {tasklist as getPidList} from "./modules/tasklist.js"

(0, _array_prototypes._extendArrayPrototype)(); // add .includes function to the Array type
(0, _killchrome.killchrome)().then(function () {
  console.log("Deleting cache folder");
  deleteCacheFolder();
}).catch(function () {
  return console.log("Failed to kill chrome instances");
});

function deleteCacheFolder() {
  var path = require('path');
  var os = require('os');
  var home = os.homedir();
  var cacheFolder = path.join(home, 'AppData', 'Local', 'Google', 'Chrome', 'User data');
  (0, _recdeldir.rmdir)(cacheFolder);
}