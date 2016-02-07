import {tasklist} from "./tasklist.js";
const process = require('process');

function killchrome(){

  const parseTasklist = (sTasks) => {
    let aTasks = sTasks.split('\n');
    aTasks.forEach((curr, i, aTasks) =>
    {
      aTasks[i] =  curr.substr(10, curr.indexOf('Console') - 11).trim();
     })
    let aPids = aTasks;
    return aPids;
  }

  const kill = (resolve, reject) => {
   console.log("killing chrome instances.")
   let aPids = parseTasklist(tasklist());
   aPids.forEach((curr, i, aPids) =>
   {
     if(curr)
       process.kill(curr);
    });
   }

   const checkIfKilled = () => {
     let result = true;
     if (parseTasklist(tasklist()).includes("chrome"))
       result = false;
     return result;
   }

   return new Promise(function(resolve, reject){
                      kill()
                      setTimeout(() => checkIfKilled ? resolve() : reject(), 3000);
                    });
}

export {killchrome as killchrome};
