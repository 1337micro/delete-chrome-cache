'use strict'
/**
  * Windows tasklist nodejs module
  * Get a list of Pids of the processes that are running
  * @param {string} sProcessName? - Filter. If provided, only return the Pids of processes running with this name
  * @return {array} aTasks - an array strings containing the Pids of the running processes or of the processes with the name sProcessName
*/
function tasklist(sProcessName) {
  const child_process = require('child_process');
  let oBufferTasks = child_process.execSync('tasklist /FI "IMAGENAME eq chrome.exe"', {}, (error, stdout, stderr) => {sTasks = stdout});
  return oBufferTasks.toString();
}

export {tasklist as tasklist};
