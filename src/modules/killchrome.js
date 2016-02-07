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
      process.kill(curr);
   });

   while (checkIfKilled() == false){
     console.log("killing chrome instances...")
   }

}

export {killchrome as killchrome};
