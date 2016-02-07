'use strict'
const process = require('process');
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1]) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  };
}

const tasklist = () => {
  const child_process = require('child_process');
  let bufferTasks = child_process.execSync('tasklist /FI "IMAGENAME eq chrome.exe"', {}, (error, stdout, stderr) => {sTasks = stdout});
  return bufferTasks.toString();
}

const killchrome = () =>{

  const parseTasklist = (sTasks) => {
    let aTasks = sTasks.split('\n');
    aTasks.forEach((curr, i, aTasks) =>
    {
      aTasks[i] =  curr.substr(10, curr.indexOf('Console') - 11).trim();
     })
    let aPids = aTasks;
    return aPids;
  }

  const checkIfKilled = () => {
    //end
    let result = true;
    setTimeout( () => { if (parseTasklist(tasklist()).includes("chrome")) result = false }, 2000 )
    return result;
  }

  let aPids = parseTasklist(tasklist());
  aPids.forEach((curr, i, aPids) =>
  {
    if(curr)
      process.kill(curr)
   });

   while (checkIfKilled() == false){
     console.log("killing chrome instances...")
   }

}

const deleteCacheFolder = () => {
  const path = require('path');
  const os = require('os')
  const home = os.homedir();
  let cacheFolder = path.join(home, 'AppData', 'Local', 'Google', 'Chrome', 'User data');
  deleteDir(cacheFolder);

  //AppData\Local\Google\Chrome\User Data
}

function deleteDir(sPath) {
  //sPath is the path to the directory
  //path is the nodejs library
  const path = require('path');
  const fs = require('fs');
  fs.readdir(sPath, (err, aFiles) => {

                        aFiles.forEach((curr, index) => {
                          let absFilePath = path.join(sPath, curr);
                          const oFileStats = fs.statSync(absFilePath);
                          if(oFileStats.isDirectory()){
                            if(fs.readdirSync(absFilePath).length === 0)
                              fs.rmdir(absFilePath);
                            else
                              deleteDir(absFilePath)
                          }
                          else if (oFileStats.isFile())
                            fs.unlink(absFilePath);
                        })
  });
}
killchrome()
deleteCacheFolder()
