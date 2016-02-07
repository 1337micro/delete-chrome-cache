function recursiveDeleteDir(sPath) {
  //sPath is the path to the directory
  //path is the nodejs library
  const path = require('path');
  const fs = require('fs');
  /*
const dirContainsOnlyEmptyDirectories = (sPath) => {
    fs.readdir(sPath, (err, aFiles) => {
    });
}
*/
  fs.readdir(sPath, (err, aFiles) => {
                        aFiles.forEach((curr, index) => {
                          let absFilePath = path.join(sPath, curr);
                          const oFileStats = fs.statSync(absFilePath);
                          if(oFileStats.isDirectory()){
                            if(fs.readdirSync(absFilePath).length === 0)
                              fs.rmdir(absFilePath);
                            else
                              recursiveDeleteDir(absFilePath)
                          }
                          else if (oFileStats.isFile())
                            fs.unlink(absFilePath);
                        })
  });
}

  export {recursiveDeleteDir as rmdir};
