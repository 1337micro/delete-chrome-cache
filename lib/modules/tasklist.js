'use strict';
/**
  * Windows tasklist nodejs module
  * Get a list of Pids of the processes that are running
  * @param {string} sProcessName? - Filter. If provided, only return the Pids of processes running with this name
  * @return {array} aTasks - an array strings containing the Pids of the running processes or of the processes with the name sProcessName
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});
function tasklist(sProcessName) {
  var child_process = require('child_process');
  var oBufferTasks = child_process.execSync('tasklist /FI "IMAGENAME eq chrome.exe"', {}, function (error, stdout, stderr) {
    sTasks = stdout;
  });
  return oBufferTasks.toString();
}

exports.tasklist = tasklist;