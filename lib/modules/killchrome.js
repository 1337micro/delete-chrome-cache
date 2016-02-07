'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.killchrome = undefined;

var _tasklist = require('./tasklist.js');

var process = require('process');

function killchrome() {

  var parseTasklist = function parseTasklist(sTasks) {
    var aTasks = sTasks.split('\n');
    aTasks.forEach(function (curr, i, aTasks) {
      aTasks[i] = curr.substr(10, curr.indexOf('Console') - 11).trim();
    });
    var aPids = aTasks;
    return aPids;
  };

  var kill = function kill(resolve, reject) {
    console.log("killing chrome instances.");
    var aPids = parseTasklist((0, _tasklist.tasklist)());
    aPids.forEach(function (curr, i, aPids) {
      if (curr) process.kill(curr);
    });
  };

  var checkIfKilled = function checkIfKilled() {
    var result = true;
    if (parseTasklist((0, _tasklist.tasklist)()).includes("chrome")) result = false;
    return result;
  };

  return new Promise(function (resolve, reject) {
    kill();
    setTimeout(function () {
      return checkIfKilled ? resolve() : reject();
    }, 3000);
  });
}

exports.killchrome = killchrome;