'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function recursiveDeleteDir(sPath) {
  //sPath is the path to the directory
  //path is the nodejs library
  var path = require('path');
  var fs = require('fs');
  /*
  const dirContainsOnlyEmptyDirectories = (sPath) => {
    fs.readdir(sPath, (err, aFiles) => {
    });
  }
  */
  fs.readdir(sPath, function (err, aFiles) {
    aFiles.forEach(function (curr, index) {
      var absFilePath = path.join(sPath, curr);
      var oFileStats = fs.statSync(absFilePath);
      if (oFileStats.isDirectory()) {
        if (fs.readdirSync(absFilePath).length === 0) fs.rmdir(absFilePath);else recursiveDeleteDir(absFilePath);
      } else if (oFileStats.isFile()) fs.unlink(absFilePath);
    });
  });
}

exports.rmdir = recursiveDeleteDir;